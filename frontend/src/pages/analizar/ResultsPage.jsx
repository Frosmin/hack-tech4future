import { useState } from "react";
import FloatingParticle from "../../components/home/FloatingParticle";
import { PARTICLES } from "../../utils/homeData";

// ── Sub-componentes internos ───────────────────────────────────────────────────

function ConfidenceMeter({ value, color }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs" style={{ color: "#94a3b8" }}>
          Confianza del modelo
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

function FindingRow({ label, value, status }) {
  const dot = {
    ok: { color: "#22c55e", bg: "#dcfce7" },
    warn: { color: "#f59e0b", bg: "#fef3c7" },
    neutral: { color: "#94a3b8", bg: "#f1f5f9" },
  }[status] || { color: "#94a3b8", bg: "#f1f5f9" };

  return (
    <div
      className="flex items-start justify-between gap-3 py-3 border-b"
      style={{ borderColor: "#f1f5f9" }}
    >
      <span className="text-sm" style={{ color: "#64748b" }}>
        {label}
      </span>
      <span
        className="text-xs font-medium px-2 py-0.5 rounded-full text-right"
        style={{ background: dot.bg, color: dot.color, whiteSpace: "nowrap" }}
      >
        {value}
      </span>
    </div>
  );
}

function DifferentialBar({ name, probability, color }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm" style={{ color: "#334155" }}>
          {name}
        </span>
        <span className="text-xs font-semibold" style={{ color }}>
          {probability}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "#f1f5f9" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${probability}%`, background: color, opacity: 0.7 }}
        />
      </div>
    </div>
  );
}

function ImageWithRegions({ file, regions = [] }) {
  const url = URL.createObjectURL(file);
  return (
    <div
      className="relative rounded-xl overflow-hidden border"
      style={{ borderColor: "#e2e8f0" }}
    >
      <img
        src={url}
        alt="analizada"
        className="w-full object-cover"
        style={{ maxHeight: 340 }}
      />
      {/* Marcadores de regiones (solo para radiografías) */}
      {regions.map((r, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{
            left: `${r.x}%`,
            top: `${r.y}%`,
            transform: "translate(-50%,-50%)",
          }}
        >
          {/* Pulso */}
          <div
            className="absolute w-10 h-10 rounded-full animate-ping opacity-40"
            style={{ background: "#f59e0b" }}
          />
          {/* Punto central */}
          <div
            className="w-4 h-4 rounded-full border-2 border-white relative z-10"
            style={{
              background: "#f59e0b",
              boxShadow: "0 0 10px rgba(245,158,11,0.6)",
            }}
          />
          {/* Tooltip */}
          <div
            className="absolute bottom-full mb-2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap z-20"
            style={{ background: "rgba(15,23,42,0.85)", color: "white" }}
          >
            {r.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function ResultsPage({ data, onNewAnalysis }) {
  const { files, type, results } = data;
  const [activeImg, setActiveImg] = useState(0);

  const accentColor = type === "skin" ? "#0ea5e9" : "#6366f1";

  const urgencyStyle = {
    alta: { bg: "#fee2e2", color: "#dc2626", label: "Urgencia alta" },
    moderada: { bg: "#fef3c7", color: "#d97706", label: "Urgencia moderada" },
    baja: { bg: "#dcfce7", color: "#16a34a", label: "Sin urgencia inmediata" },
  }[results.urgency] || { bg: "#f1f5f9", color: "#64748b", label: "—" };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#f0f9ff 0%,#e8f4fe 30%,#f5f3ff 70%,#faf5ff 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Textura */}
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
        <a href="/" className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }}
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
          <span className="text-lg font-bold" style={{ color: "#0f172a" }}>
            MediScan<span style={{ color: "#0ea5e9" }}>AI</span>
          </span>
        </a>
        <button
          onClick={onNewAnalysis}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border transition-all duration-200 hover:bg-white"
          style={{ borderColor: "#e2e8f0", color: "#64748b" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Nuevo análisis
        </button>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-4 pb-16">
        {/* Header resultado */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: type === "skin" ? "#e0f2fe" : "#ede9fe",
                  color: type === "skin" ? "#0369a1" : "#4338ca",
                }}
              >
                {type === "skin" ? "Mancha de piel" : "Radiografía"}
              </span>
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
              {results.classification}
            </h1>
          </div>
          <button
            className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Exportar informe
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ── LEFT: Imagen + galería ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Imagen activa */}
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
                IMAGEN ANALIZADA
              </p>
              <ImageWithRegions
                file={files[activeImg]}
                regions={type === "xray" ? results.regions : []}
              />
              {type === "xray" && results.regions?.length > 0 && (
                <p
                  className="text-xs mt-2 text-center"
                  style={{ color: "#f59e0b" }}
                >
                  ● Zona de interés detectada
                </p>
              )}
            </div>

            {/* Galería thumbnails */}
            {files.length > 1 && (
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
                  TODAS LAS IMÁGENES ({files.length})
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {files.map((file, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className="rounded-lg overflow-hidden border-2 transition-all duration-150"
                      style={{
                        borderColor:
                          activeImg === idx ? accentColor : "transparent",
                        aspectRatio: "1/1",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`img-${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Resultados ── */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Confianza + resumen */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "#e2e8f0",
              }}
            >
              <ConfidenceMeter value={results.confidence} color={accentColor} />
              <div className="h-px my-4" style={{ background: "#f1f5f9" }} />
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#475569" }}
              >
                {results.summary}
              </p>
            </div>

            {/* Hallazgos */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "#e2e8f0",
              }}
            >
              <p
                className="text-sm font-bold mb-1"
                style={{ color: "#0f172a" }}
              >
                Hallazgos detectados
              </p>
              <p className="text-xs mb-4" style={{ color: "#94a3b8" }}>
                Análisis por criterios
              </p>
              {results.findings.map((f) => (
                <FindingRow key={f.label} {...f} />
              ))}
            </div>

            {/* Diagnósticos diferenciales */}
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
                Diagnósticos diferenciales
              </p>
              {results.differentials.map((d, i) => (
                <DifferentialBar
                  key={d.name}
                  {...d}
                  color={i === 0 ? accentColor : "#cbd5e1"}
                />
              ))}
            </div>

            {/* Recomendación */}
            <div
              className="rounded-2xl p-5 border flex items-start gap-3"
              style={{
                background: "rgba(240,249,255,0.8)",
                borderColor: "#bae6fd",
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
              <div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "#0369a1" }}
                >
                  Recomendación
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#0369a1" }}
                >
                  {results.recommendation}
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div
              className="rounded-xl p-4 border flex items-start gap-2"
              style={{
                background: "rgba(254,243,199,0.5)",
                borderColor: "#fde68a",
              }}
            >
              <svg
                width="16"
                height="16"
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
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#92400e" }}
              >
                Este análisis es orientativo y no reemplaza el diagnóstico de un
                profesional médico. Consulta siempre a un especialista
                calificado.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
