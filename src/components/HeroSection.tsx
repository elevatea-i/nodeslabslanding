"use client";

import { motion, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { trackCTAClick } from "@/lib/analytics";

const container: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function HeroSection() {
  const { t } = useLanguage();
  const router = useRouter();

  return (
    <section
      id="inicio"
      role="banner"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0B0D14" }}
    >
      <motion.div
        className="relative z-20 flex flex-col justify-end min-h-screen pb-20 md:pb-28 px-6 md:px-12"
        style={{ maxWidth: "72rem", margin: "0 auto", width: "100%" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="text-xs font-medium uppercase mb-5"
          style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}
        >
        </motion.p>

        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold mb-6"
          style={{
            color: "#FFFFFF",
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            maxWidth: "48rem",
          }}
        >
          {t('hero.labHeadline')}
        </motion.h1>

        <motion.p
          variants={item}
          className="text-base md:text-lg mb-8"
          style={{
            color: "rgba(255,255,255,0.55)",
            lineHeight: "1.6",
            maxWidth: "36rem",
          }}
        >
          {t('hero.labSubtitle')}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <button
            onClick={() => { trackCTAClick('hero'); router.push('/contact'); }}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors duration-200"
            style={{
              borderRadius: "9999px",
              backgroundColor: "#FFFFFF",
              color: "#0B0D14",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#F0F0F0")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#FFFFFF")
            }
          >
            {t('hero.labCta1')}
          </button>
          <a
            href="/#metricas"
            onClick={(e) => { e.preventDefault(); document.getElementById('metricas')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors duration-200"
            style={{
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.7)";
              (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.5)";
            }}
          >
            {t('hero.labCta2')}
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8"
        >
          <span
            className="flex items-center gap-2 text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
          </span>
          <span
            className="flex items-center gap-2 text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
