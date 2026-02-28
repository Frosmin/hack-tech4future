import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import FloatingParticle from "./components/FloatingParticle";
import FeatureCard from "./components/FeatureCard";
import StepCard from "./components/StepCard";
import { PARTICLES, FEATURE_CARDS, STEPS, STATS } from "../../utils/homeData";

const SkinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" fill="#0ea5e9" />
    <path
      d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"
      stroke="#0ea5e9"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="8" r="1.5" fill="#38bdf8" opacity="0.6" />
    <circle cx="16" cy="15" r="1" fill="#38bdf8" opacity="0.5" />
    <circle cx="7" cy="16" r="1.2" fill="#0ea5e9" opacity="0.4" />
  </svg>
);

const XRayIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="#6366f1"
      strokeWidth="1.5"
    />
    <path
      d="M12 8v8M8 12h8"
      stroke="#6366f1"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="8" r="1.5" fill="#818cf8" opacity="0.5" />
    <circle cx="16" cy="16" r="1.5" fill="#818cf8" opacity="0.5" />
    <path
      d="M8 16 Q12 10 16 8"
      stroke="#6366f1"
      strokeWidth="1"
      strokeDasharray="2 2"
    />
  </svg>
);

const CARD_ICONS = { skin: <SkinIcon />, xray: <XRayIcon /> };

// ── Upload icon ───────────────────────────────────────────────────────────────
const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowIcon = ({ color = "currentColor" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M12 5l7 7-7 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0f9ff 0%, #e8f4fe 30%, #f5f3ff 70%, #faf5ff 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Particles */}
      {mounted &&
        PARTICLES.map((p, i) => (
          <FloatingParticle key={i} style={{ ...p, position: "absolute" }} />
        ))}

      {/* Blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, #bae6fd 0%, #c7d2fe 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            MediScan<span style={{ color: "#0ea5e9" }}>AI</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          {["Cómo funciona", "Sobre nosotros"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium transition-colors"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => (e.target.style.color = "#0ea5e9")}
              onMouseLeave={(e) => (e.target.style.color = "#64748b")}
            >
              {link}
            </a>
          ))}
          <Button variant="primary">Iniciar análisis</Button>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              background: "rgba(14, 165, 233, 0.08)",
              borderColor: "rgba(14, 165, 233, 0.25)",
              color: "#0369a1",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#0ea5e9" }}
            />
            Inteligencia Artificial Médica · Hackathon 2025
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center leading-tight mb-6"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            color: "#0f172a",
            fontWeight: "700",
            letterSpacing: "-0.02em",
          }}
        >
          Diagnóstico visual{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            impulsado por IA
          </span>
        </h1>

        <p
          className="text-center max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#475569", fontSize: "1.125rem" }}
        >
          Sube una imagen médica y obtén un análisis instantáneo. Detectamos
          anomalías en manchas de piel e interpretamos radiografías señalando
          zonas de interés de forma clara y precisa.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <Button variant="primary" icon={<UploadIcon />}>
            Subir imagen
          </Button>
          <Button variant="secondary" iconRight={<ArrowIcon />}>
            Ver demo
          </Button>
        </div>

        {/* ── FEATURE CARDS ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {FEATURE_CARDS.map((card) => (
            <FeatureCard
              key={card.id}
              {...card}
              icon={CARD_ICONS[card.id]}
              hovered={hoveredCard === card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>

        {/* ── STATS ──────────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-8 mb-20 border"
          style={{
            background: "rgba(255,255,255,0.6)",
            borderColor: "#e2e8f0",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: "#64748b" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOW IT WORKS ───────────────────────────────────────────────── */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#0f172a" }}>
            ¿Cómo funciona?
          </h2>
          <p style={{ color: "#64748b" }}>
            Tres pasos simples para obtener tu análisis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {STEPS.map((s) => (
            <StepCard key={s.step} {...s} />
          ))}
        </div>

        {/* ── DISCLAIMER ─────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 mb-12 border flex items-start gap-3"
          style={{
            background: "rgba(254, 243, 199, 0.5)",
            borderColor: "#fde68a",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="mt-0.5 shrink-0"
          >
            <path
              d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
              stroke="#d97706"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-sm" style={{ color: "#92400e" }}>
            <strong>Aviso importante:</strong> MediScanAI es una herramienta de
            apoyo educativa y no reemplaza el diagnóstico de un profesional
            médico. Consulta siempre a un especialista ante cualquier
            preocupación de salud.
          </p>
        </div>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        className="relative z-10 border-t py-8"
        style={{ borderColor: "#e2e8f0" }}
      >
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between">
          <span className="text-sm" style={{ color: "#94a3b8" }}>
            © 2025 MediScanAI · Proyecto Hackathon IA
          </span>
          <span className="text-sm" style={{ color: "#94a3b8" }}>
            Hecho con IA · Solo fines educativos
          </span>
        </div>
      </footer>
    </div>
  );
}
