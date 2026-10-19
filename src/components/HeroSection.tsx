"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { trackCTAClick } from "@/lib/analytics";

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
      <div
        className="relative z-20 flex flex-col justify-end min-h-screen pb-20 md:pb-28 px-6 md:px-12"
        style={{ maxWidth: "72rem", margin: "0 auto", width: "100%" }}
      >
        <p
          className="hero-rise text-xs font-medium uppercase mb-5"
          style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", "--i": 0 } as React.CSSProperties}
        >
        </p>

        <h1
          className="hero-rise text-4xl md:text-6xl lg:text-7xl font-semibold mb-6"
          style={{
            color: "#FFFFFF",
            lineHeight: "1.1",
            letterSpacing: "-0.03em",
            maxWidth: "48rem",
            "--i": 1,
          } as React.CSSProperties}
        >
          {t('hero.labHeadline')}
        </h1>

        <p
          className="hero-rise text-base md:text-lg mb-8"
          style={{
            color: "rgba(255,255,255,0.55)",
            lineHeight: "1.6",
            maxWidth: "36rem",
            "--i": 2,
          } as React.CSSProperties}
        >
          {t('hero.labSubtitle')}
        </p>

        <div
          className="hero-rise flex flex-col sm:flex-row gap-3 mb-8"
          style={{ "--i": 3 } as React.CSSProperties}
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
        </div>

        <div
          className="hero-rise flex flex-col sm:flex-row gap-4 sm:gap-8"
          style={{ "--i": 4 } as React.CSSProperties}
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
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
