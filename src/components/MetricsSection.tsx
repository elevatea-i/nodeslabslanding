"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

function useCountUp(end: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };

    requestAnimationFrame(step);
  }, [start, end, duration]);

  return count;
}

interface MetricProps {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
  start: boolean;
  delay?: number;
}

function Metric({ prefix, value, suffix, label, sublabel, start, delay = 0 }: MetricProps) {
  const count = useCountUp(value, 1500, start);

  return (
    <motion.div
      className="flex flex-col items-center text-center md:items-start md:text-left"
      initial={{ opacity: 0, y: 30 }}
      animate={start ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      <div
        className="leading-none mb-2"
        style={{
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: "-0.04em",
        }}
      >
        {prefix}{count}{suffix}
      </div>
      <p
        className="text-xs font-medium uppercase mb-1"
        style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}
      >
        {label}
      </p>
      {sublabel && (
        <p
          className="text-xs"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {sublabel}
        </p>
      )}
    </motion.div>
  );
}

const MetricsSection: React.FC = () => {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const metrics = language === "es"
    ? [
        { prefix: "+", value: 100, suffix: "", label: "leads calificados", sublabel: undefined },
        { prefix: "", value: 500, suffix: "+", label: "ventas procesadas", sublabel: undefined },
        { prefix: "", value: 95, suffix: "%", label: "tasa de reservas", sublabel: "en negocios de citas" },
        { prefix: "", value: 4, suffix: " seg", label: "tiempo de respuesta", sublabel: undefined },
      ]
    : [
        { prefix: "+", value: 100, suffix: "", label: "qualified leads", sublabel: undefined },
        { prefix: "", value: 500, suffix: "+", label: "sales processed", sublabel: undefined },
        { prefix: "", value: 95, suffix: "%", label: "booking rate", sublabel: "for appointment businesses" },
        { prefix: "", value: 4, suffix: " sec", label: "response time", sublabel: undefined },
      ];

  return (
    <section
      id="metricas"
      className="relative py-8 md:py-12"
      style={{ background: "#0B0D14" }}
      ref={ref}
    >
      <div
        className="mx-auto px-6 md:px-12"
        style={{ maxWidth: "72rem" }}
      >
        <motion.p
          className="text-xs font-medium uppercase mb-6 md:mb-8"
          style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {language === "es" ? "Resultados reales." : "Real results."}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {metrics.map((metric, i) => (
            <Metric
              key={i}
              prefix={metric.prefix}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              sublabel={metric.sublabel}
              start={isInView}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
