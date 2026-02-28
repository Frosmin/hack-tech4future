import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import FeatureCard from "./components/FeatureCard";
import StepCard from "./components/StepCard";
import { FEATURE_CARDS, STEPS, STATS } from "../../utils/homeData";
import { useUser } from "../../stores/user.store";
import usePath from "../../stores/path.store";
import { useNavigate } from "react-router";

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

// Icono de pulso médico para el hero
const PulseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

// Icono de escudo para trust badges
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();
  const { updatePath } = usePath();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlUpload = () => {
    if (user) {
      updatePath("/analizar/0");
      navigate("/analizar/0");
    } else {
      updatePath("/login");
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "#f8fafc",
        fontFamily: "'Georgia', serif",
      }}
    >
      <main className="relative z-10 mx-auto pb-8 min-h-dvh">
        {/* ── HERO SECTION ── */}
        <div className="relative w-full min-h-[95dvh] overflow-hidden">
          {/* Fondo con gradiente mesh en lugar de solo imagen */}
          <div className="absolute inset-0">
            {/* Imagen de fondo médica */}
            <div
              className="absolute inset-0 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80')",
              }}
            />
            {/* Overlay gradiente con más profundidad */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(30,41,59,0.75) 40%, rgba(51,65,85,0.7) 70%, rgba(15,23,42,0.85) 100%)",
              }}
            />
            {/* Efecto de brillo sutil */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 20%, rgba(14,165,233,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(99,102,241,0.1) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Partículas / puntos decorativos flotantes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[
              { top: "15%", left: "10%", size: 4, delay: "0s", duration: "3s" },
              { top: "25%", left: "85%", size: 6, delay: "1s", duration: "4s" },
              { top: "60%", left: "5%", size: 5, delay: "0.5s", duration: "3.5s" },
              { top: "70%", left: "90%", size: 3, delay: "2s", duration: "2.5s" },
              { top: "45%", left: "95%", size: 4, delay: "1.5s", duration: "4.5s" },
              { top: "80%", left: "15%", size: 7, delay: "0.8s", duration: "3.2s" },
            ].map((p, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-pulse"
                style={{
                  top: p.top,
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  background: i % 2 === 0 ? "#0ea5e9" : "#818cf8",
                  opacity: 0.3,
                  animationDelay: p.delay,
                  animationDuration: p.duration,
                }}
              />
            ))}
          </div>

          {/* Contenido del hero */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[95dvh] px-6 md:px-12">
            {/* Badge superior */}
            <div
              className="transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-20px)",
              }}
            >
              <span
                className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-semibold border backdrop-blur-md"
                style={{
                  background: "rgba(14,165,233,0.1)",
                  borderColor: "rgba(14,165,233,0.3)",
                  color: "#7dd3fc",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "#0ea5e9" }}
                />
                IA Médica · Análisis Visual Inteligente
              </span>
            </div>

            {/* Título principal */}
            <h1
              className="text-center leading-[1.1] mt-8 mb-6 max-w-4xl transition-all duration-700 ease-out"
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                fontWeight: "700",
                letterSpacing: "-0.03em",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "150ms",
              }}
            >
              <span style={{ color: "#f1f5f9" }}>
                Diagnóstico visual{" "}
              </span>
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                impulsado por IA
              </span>
            </h1>

            {/* Subtítulo */}
            <p
              className="text-center max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 ease-out"
              style={{
                color: "#cbd5e1",
                fontSize: "1.1rem",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "300ms",
              }}
            >
              Sube una imagen médica y obtén un análisis instantáneo.
              Detectamos anomalías en manchas de piel e interpretamos
              radiografías señalando zonas de interés con precisión.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex items-center justify-center gap-4 mb-16 flex-wrap transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transitionDelay: "450ms",
              }}
            >
              <Button
                variant="primary"
                icon={<UploadIcon />}
                onClick={handlUpload}
                className="cursor-pointer"
              >
                Subir imagen médica
              </Button>
              <button
                onClick={() => {
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border backdrop-blur-md hover:bg-white/10 transition-all duration-300 cursor-pointer"
                style={{
                  color: "#cbd5e1",
                  borderColor: "rgba(203,213,225,0.25)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                ¿Cómo funciona?
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            <div
              className="flex items-center justify-center gap-8 flex-wrap transition-all duration-700 ease-out"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "600ms",
              }}
            >
              {[
                { icon: <ClockIcon />, text: "Resultados en < 10s" },
                { icon: <ShieldIcon />, text: "Datos seguros y privados" },
                { icon: <EyeIcon />, text: "Análisis visual preciso" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs font-medium"
                  style={{ color: "#94a3b8" }}
                >
                  <span style={{ color: "#64748b" }}>{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>

            {/* Indicador de scroll */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
              style={{ opacity: 0.4 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── CONTENIDO PRINCIPAL ── */}
        <div className="px-6 md:px-12 lg:px-24 xl:px-32">
          {/* Stats strip con glassmorphism */}
          <div
            className="rounded-2xl p-8 -mt-16 relative z-20 border mb-20"
            style={{
              background: "rgba(255,255,255,0.85)",
              borderColor: "#e2e8f0",
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="relative">
                  <div
                    className="text-3xl font-bold mb-1.5"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: "#64748b" }}
                  >
                    {stat.label}
                  </div>
                  {/* Separador entre stats */}
                  {i < STATS.length - 1 && (
                    <div
                      className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12"
                      style={{ background: "#e2e8f0" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sección de funcionalidades */}
          <div className="mb-24">
            <div className="text-center mb-10">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{
                  background: "#f0f9ff",
                  color: "#0369a1",
                  border: "1px solid #bae6fd",
                }}
              >
                <PulseIcon />
                Modalidades disponibles
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ color: "#0f172a", letterSpacing: "-0.025em" }}
              >
                Análisis inteligente para cada necesidad
              </h2>
              <p
                className="max-w-xl mx-auto"
                style={{ color: "#64748b", fontSize: "1.05rem" }}
              >
                Dos tipos de imagen, un mismo estándar de precisión.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          {/* Cómo funciona */}
          <div id="how-it-works" className="mb-24 scroll-mt-20">
            <div className="text-center mb-10">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{
                  background: "#faf5ff",
                  color: "#7c3aed",
                  border: "1px solid #ddd6fe",
                }}
              >
                Proceso simple
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-3"
                style={{ color: "#0f172a", letterSpacing: "-0.025em" }}
              >
                ¿Cómo funciona?
              </h2>
              <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
                Tres pasos simples para obtener tu análisis
              </p>
            </div>

            {/* Steps con línea conectora */}
            <div className="relative">
              {/* Línea conectora horizontal (solo desktop) */}
              <div
                className="hidden md:block absolute top-14 left-[16%] right-[16%] h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, #0ea5e9 0%, #6366f1 50%, #0ea5e9 100%)",
                  opacity: 0.2,
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STEPS.map((s) => (
                  <StepCard key={s.step} {...s} />
                ))}
              </div>
            </div>
          </div>

          {/* CTA final */}
          <div
            className="rounded-3xl p-10 md:p-14 mb-20 text-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
            }}
          >
            {/* Decoración de fondo */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(99,102,241,0.15) 0%, transparent 50%)",
              }}
            />

            <div className="relative z-10">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2))",
                  border: "1px solid rgba(14,165,233,0.3)",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
              </div>
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: "#f1f5f9", letterSpacing: "-0.025em" }}
              >
                ¿Listo para tu primer análisis?
              </h2>
              <p
                className="max-w-lg mx-auto mb-8"
                style={{ color: "#94a3b8", fontSize: "1.05rem" }}
              >
                Sube una imagen y obtén resultados en segundos. Es rápido,
                seguro y completamente gratuito.
              </p>
              <button
                onClick={handlUpload}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  boxShadow:
                    "0 8px 30px rgba(14,165,233,0.3), 0 4px 12px rgba(99,102,241,0.2)",
                }}
              >
                <UploadIcon />
                Comenzar análisis gratuito
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div
            className="rounded-2xl p-5 mb-12 border flex items-start gap-3"
            style={{
              background: "rgba(254, 243, 199, 0.4)",
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
            <p className="text-sm leading-relaxed" style={{ color: "#92400e" }}>
              <strong>Aviso importante:</strong> MediScanAI es una herramienta
              de apoyo educativa y no reemplaza el diagnóstico de un profesional
              médico. Consulta siempre a un especialista ante cualquier
              preocupación de salud.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}