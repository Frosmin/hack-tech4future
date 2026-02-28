import { useState } from "react";
import { useNavigate } from "react-router"; // <-- Importamos usar rutas
import FloatingParticle from "../home/components/FloatingParticle";
import { PARTICLES } from "../../utils/homeData";

// ── Sub-componentes internos ───────────────────────────────────────────────────

function ConfidenceMeter({ value, color }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs" style={{ color: "#94a3b8" }}>
          Nivel de Certeza (IA)
        </span>
        <span className="text-sm font-bold" style={{ color }}>
          {value}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "#f1f5f9" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function ResultsPage({ data, onNewAnalysis }) {
  const { files, type, results, isComparison, id } = data;
  const [activeImg, setActiveImg] = useState(0);
  const navigate = useNavigate(); // <-- Inicializamos navegación

  const accentColor = type === "skin" ? "#0ea5e9" : "#6366f1";

  // =========================================================================
  // MODO COMPARACIÓN (Evolución de un registro existente)
  // =========================================================================
  if (isComparison) {
    const { nuevaFoto, oldPhotoUrl, patologiaTitle } = results;
    const isImprovement = nuevaFoto?.evolutionStatus === "Mejora";
    const isWorse = nuevaFoto?.evolutionStatus === "Empeoramiento";

    // Paletas dinámicas por evolución IA
    const statusColor = isImprovement
      ? "#16a34a"
      : isWorse
        ? "#dc2626"
        : "#475569";
    const statusBg = isImprovement
      ? "#dcfce7"
      : isWorse
        ? "#fee2e2"
        : "#f1f5f9";

    return (
      <div
        className="min-h-screen relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,#f0f9ff 0%,#e8f4fe 30%,#f5f3ff 70%,#faf5ff 100%)",
          fontFamily: "'Georgia', serif",
        }}
      >
        {/* Navbar para salir y volver al seguimiento */}
        <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
          <a href="/" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }}
            >
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-lg font-bold" style={{ color: "#0f172a" }}>
              Derm<span style={{ color: "#0ea5e9" }}>Encyclopedia</span>
            </span>
          </a>
          <button
            onClick={() => navigate(`/dashboard/${id}`)}
            className="text-sm font-bold px-4 py-2 rounded-full border bg-white transition hover:-translate-y-0.5 shadow-sm"
          >
            Volver al Historial
          </button>
        </nav>

        <main className="relative z-10 max-w-5xl mx-auto px-8 pt-4 pb-16">
          <div className="text-center mb-10">
            <span
              className="text-xs font-bold px-4 py-1.5 rounded-full shadow-sm mb-3 inline-block"
              style={{ background: statusBg, color: statusColor }}
            >
              Comparativa Evolutiva por IA
            </span>
            <h1
              className="text-3xl font-bold"
              style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
            >
              {patologiaTitle}
            </h1>
            <p className="mt-2 text-slate-500">
              Compara tu fotografía anterior con la captura más reciente del día
              de hoy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LADO IZQUIERDO: Las dos imágenes juntas */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col">
                <span className="text-xs tracking-wider font-bold text-slate-400 mb-2 truncate text-center">
                  FOTO ANTERIOR
                </span>
                <div
                  className="rounded-xl overflow-hidden border-2 shadow-sm"
                  style={{ borderColor: "#e2e8f0" }}
                >
                  <img
                    src={oldPhotoUrl}
                    alt="Anterior"
                    className="w-full h-[18rem] object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col relative top-4">
                <span className="text-xs tracking-wider font-bold text-sky-500 mb-2 truncate text-center">
                  NUEVA CAPTURA
                </span>
                <div
                  className="rounded-xl overflow-hidden border-4 shadow-lg shadow-sky-100"
                  style={{ borderColor: "#38bdf8" }}
                >
                  <img
                    src={URL.createObjectURL(files[0])}
                    alt="Actual"
                    className="w-full h-[18rem] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* LADO DERECHO: El Veredicto de la IA */}
            <div className="flex flex-col gap-5 mt-4">
              <div
                className="rounded-2xl p-6 border bg-white/90 backdrop-blur-sm shadow-md"
                style={{ borderColor: "#e2e8f0" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="px-5 py-2.5 rounded-xl text-lg font-bold shadow-sm border"
                    style={{
                      background: statusBg,
                      color: statusColor,
                      borderColor: statusColor,
                    }}
                  >
                    {nuevaFoto?.evolutionStatus || "No determinado"}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <p
                    className="text-[0.95rem] leading-relaxed font-medium"
                    style={{ color: "#475569" }}
                  >
                    "{nuevaFoto?.analysisSummary}"
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate(`/dashboard/${id}`)}
                className="w-full py-4 rounded-2xl text-sm justify-center flex items-center gap-2 font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                }}
              >
                Continuar hacia el seguimiento completo ↗
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================================
  // MODO CREACIÓN NORMAL (El layout tradicional de ResultsPage)
  // =========================================================================
  // Mapeamos el string "gravity" que viene del backend a los colores
  const urgencyStyle = {
    alta: { bg: "#fee2e2", color: "#dc2626", label: "Gravedad Alta" },
    moderada: { bg: "#fef3c7", color: "#d97706", label: "Gravedad Moderada" },
    baja: { bg: "#dcfce7", color: "#16a34a", label: "Gravedad Baja" },
  }[results.gravity?.toLowerCase()] || {
    bg: "#f1f5f9",
    color: "#64748b",
    label: results.gravity || "Desconocida",
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#f0f9ff 0%,#e8f4fe 30%,#f5f3ff 70%,#faf5ff 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {PARTICLES.slice(0, 3).map((p, i) => (
        <FloatingParticle key={i} style={{ ...p, position: "absolute" }} />
      ))}

      {/* NAV */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <button
          onClick={onNewAnalysis}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200 hover:bg-white"
          style={{ borderColor: "#e2e8f0", color: "#64748b" }}
        >
          Nuevo análisis
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-4 pb-16">
        {/* Aviso si isMedical es falso */}
        {results.isMedical === false && (
          <div
            className="rounded-xl p-4 border flex items-center gap-3 mb-6"
            style={{ background: "#fee2e2", borderColor: "#f87171" }}
          >
            <span className="text-xl">⚠️</span>
            <p className="text-sm" style={{ color: "#991b1b" }}>
              <strong>Aviso:</strong> La IA ha determinado que esta imagen no
              parece ser de carácter médico. Los resultados a continuación
              pueden no ser precisos.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: urgencyStyle.bg,
                  color: urgencyStyle.color,
                }}
              >
                {urgencyStyle.label}
              </span>
            </div>
            <h1
              className="text-3xl font-bold"
              style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
            >
              {results.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── LEFT: Imagen ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div
              className="rounded-2xl p-4 border"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "#e2e8f0",
              }}
            >
              <p
                className="text-xs font-semibold mb-3"
                style={{ color: "#94a3b8" }}
              >
                IMAGEN EVALUADA
              </p>
              <div
                className="relative rounded-xl overflow-hidden border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <img
                  src={URL.createObjectURL(files[activeImg])}
                  alt="analizada"
                  className="w-full object-cover"
                  style={{ maxHeight: 340 }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Data del Backend ── */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Confianza */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "#e2e8f0",
              }}
            >
              <ConfidenceMeter
                value={results.provability}
                color={accentColor}
              />
            </div>

            {/* Descripción (Description) */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "#e2e8f0",
              }}
            >
              <p
                className="text-sm font-bold mb-2"
                style={{ color: "#0f172a" }}
              >
                Descripción Clínica
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#475569" }}
              >
                {results.description}
              </p>
            </div>

            {/* Tratamiento Recomendado */}
            <div
              className="rounded-2xl p-6 border flex items-start gap-4 shadow-sm"
              style={{
                background: "rgba(240,249,255,0.8)",
                borderColor: "#bae6fd",
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#e0f2fe" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 11.08V12a10 10 0 11-5.93-9.14"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 4L12 14.01l-3-3"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="text-sm font-bold mb-1"
                  style={{ color: "#0369a1" }}
                >
                  Tratamiento Sugerido
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#0369a1" }}
                >
                  {results.treatment}
                </p>
              </div>
            </div>

            {/* Compuestos / Medicamentos */}
            {results.compuestos && results.compuestos.length > 0 && (
              <div
                className="rounded-2xl p-6 border"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderColor: "#e2e8f0",
                }}
              >
                <p
                  className="text-sm font-bold mb-4"
                  style={{ color: "#0f172a" }}
                >
                  Principios Activos Identificados
                </p>
                <div className="flex flex-wrap gap-2">
                  {results.compuestos.map((c) => (
                    <span
                      key={c.ID}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
                      style={{
                        background: "white",
                        color: "#334155",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.02)",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          stroke="#94a3b8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
