import { useState } from "react";
import ImageUploadZone from "./components/ImageUploadZone";
import ImageTypeSelector from "./components/ImageTypeSelector";
import FloatingParticle from "../home/components/FloatingParticle";
import { PARTICLES } from "../../utils/homeData";

const SpinnerIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    className="animate-spin"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="white"
      strokeWidth="3"
      strokeDasharray="60"
      strokeDashoffset="20"
      strokeLinecap="round"
    />
  </svg>
);

const ScanIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 9V5a2 2 0 012-2h4M3 15v4a2 2 0 002 2h4M21 9V5a2 2 0 00-2-2h-4M21 15v4a2 2 0 01-2 2h-4"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M7 12h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function AnalyzePage({ onResults }) {
  const [files, setFiles] = useState([]);
  const [type, setType] = useState(null); // "skin" | "xray"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canAnalyze = files.length > 0 && type !== null;

  const handleAnalyze = async () => {
    if (!canAnalyze) {
      setError("Selecciona al menos una imagen y el tipo de análisis.");
      return;
    }
    setError("");
    setLoading(true);

    // Simula llamada a IA (~2s) — aquí conectarás tu API real
    await new Promise((r) => setTimeout(r, 2200));

    // Mock de resultados — reemplaza con la respuesta real de tu API
    const mockResults = generateMockResults(type, files);
    setLoading(false);
    onResults({ files, type, results: mockResults });
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
      {/* Textura */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {PARTICLES.slice(0, 4).map((p, i) => (
        <FloatingParticle key={i} style={{ ...p, position: "absolute" }} />
      ))}

      {/* CONTENIDO */}
      <main className="relative z-10 max-w-5xl mx-auto px-8 pt-6 pb-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: "#0f172a", letterSpacing: "-0.02em" }}
          >
            Analiza tu imagen
          </h1>
          <p style={{ color: "#64748b" }}>
            Sube una o varias imágenes, elige el tipo y deja que la IA haga el
            resto
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* ── LEFT: Upload + tipo ── */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Sección tipo */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.8)",
                borderColor: "#e2e8f0",
              }}
            >
              <p
                className="text-sm font-semibold mb-4"
                style={{ color: "#334155" }}
              >
                1 · ¿Qué tipo de imagen vas a subir?
              </p>
              <ImageTypeSelector selected={type} onSelect={setType} />
            </div>

            {/* Sección upload */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.8)",
                borderColor: "#e2e8f0",
              }}
            >
              <p
                className="text-sm font-semibold mb-4"
                style={{ color: "#334155" }}
              >
                2 · Sube tus imágenes
              </p>
              <ImageUploadZone files={files} onFilesChange={setFiles} />
            </div>
          </div>

          {/* ── RIGHT: Resumen + acción ── */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:sticky lg:top-8">
            {/* Resumen */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "#e2e8f0",
              }}
            >
              <p
                className="text-sm font-semibold mb-4"
                style={{ color: "#334155" }}
              >
                Resumen del análisis
              </p>

              {/* Tipo */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs" style={{ color: "#94a3b8" }}>
                  Tipo
                </span>
                {type ? (
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: type === "skin" ? "#e0f2fe" : "#ede9fe",
                      color: type === "skin" ? "#0369a1" : "#4338ca",
                    }}
                  >
                    {type === "skin" ? "Mancha de piel" : "Radiografía"}
                  </span>
                ) : (
                  <span className="text-xs" style={{ color: "#cbd5e1" }}>
                    Sin seleccionar
                  </span>
                )}
              </div>

              {/* Imágenes */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs" style={{ color: "#94a3b8" }}>
                  Imágenes
                </span>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: files.length > 0 ? "#dcfce7" : "#f1f5f9",
                    color: files.length > 0 ? "#166534" : "#94a3b8",
                  }}
                >
                  {files.length > 0
                    ? `${files.length} cargada${files.length > 1 ? "s" : ""}`
                    : "Ninguna"}
                </span>
              </div>

              {/* Separador */}
              <div className="h-px mb-5" style={{ background: "#f1f5f9" }} />

              {/* Error */}
              {error && (
                <p
                  className="text-xs mb-4 text-center"
                  style={{ color: "#ef4444" }}
                >
                  {error}
                </p>
              )}

              {/* Botón analizar */}
              <button
                onClick={handleAnalyze}
                disabled={!canAnalyze || loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-200"
                style={{
                  background:
                    canAnalyze && !loading
                      ? "linear-gradient(135deg,#0ea5e9,#6366f1)"
                      : "#e2e8f0",
                  color: canAnalyze && !loading ? "white" : "#94a3b8",
                  cursor: canAnalyze && !loading ? "pointer" : "not-allowed",
                  boxShadow:
                    canAnalyze && !loading
                      ? "0 8px 25px rgba(14,165,233,0.3)"
                      : "none",
                }}
              >
                {loading ? <SpinnerIcon /> : <ScanIcon />}
                {loading ? "Analizando..." : "Analizar con IA"}
              </button>

              {/* Loading progress */}
              {loading && (
                <div className="mt-4">
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "#f1f5f9" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg,#0ea5e9,#6366f1)",
                        animation: "progress 2.2s ease-in-out forwards",
                        width: "0%",
                      }}
                    />
                  </div>
                  <p
                    className="text-xs text-center mt-2"
                    style={{ color: "#94a3b8" }}
                  >
                    Procesando imagen con el modelo...
                  </p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: "rgba(254,243,199,0.5)",
                borderColor: "#fde68a",
              }}
            >
              <p
                className="text-xs font-semibold mb-2"
                style={{ color: "#92400e" }}
              >
                💡 Tips para mejores resultados
              </p>
              <ul
                className="text-xs leading-relaxed space-y-1"
                style={{ color: "#b45309" }}
              >
                <li>• Imagen nítida y bien iluminada</li>
                <li>• Centra la zona de interés</li>
                <li>• Evita sombras o reflejos</li>
                <li>• En radiografías: usa la imagen original</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Animación barra de progreso */}
      <style>{`
        @keyframes progress {
          0%   { width: 0% }
          60%  { width: 75% }
          100% { width: 95% }
        }
      `}</style>
    </div>
  );
}

// ── Mock generator (reemplazar con API real) ──────────────────────────────────
function generateMockResults(type, files) {
  if (type === "skin") {
    return {
      classification: "Posible nevo displásico",
      confidence: 78,
      urgency: "moderada",
      urgencyColor: "#f59e0b",
      summary:
        "Se detectaron características asiméttricas y variación de color que sugieren seguimiento dermatológico. No se observan signos claros de malignidad, aunque se recomienda evaluación presencial.",
      findings: [
        { label: "Asimetría", value: "Presente", status: "warn" },
        { label: "Borde", value: "Irregular en sector NE", status: "warn" },
        { label: "Color", value: "Variación marrón/rosado", status: "warn" },
        { label: "Diámetro", value: "Estimado > 6mm", status: "warn" },
        {
          label: "Evolución",
          value: "No evaluable (imagen estática)",
          status: "neutral",
        },
      ],
      differentials: [
        { name: "Nevo displásico", probability: 78 },
        { name: "Melanoma in situ", probability: 14 },
        { name: "Queratosis seborreica", probability: 8 },
      ],
      recommendation:
        "Consultar con dermatólogo en los próximos 2–4 semanas para evaluación clínica y posible dermatoscopia.",
    };
  }

  return {
    classification: "Radiografía de tórax PA",
    confidence: 85,
    urgency: "baja",
    urgencyColor: "#22c55e",
    summary:
      "Campos pulmonares sin opacidades francas. Se aprecia leve aumento de la trama broncovascular en base derecha que podría corresponder a cambios inflamatorios leves o variante normal.",
    findings: [
      {
        label: "Campos pulmonares",
        value: "Sin opacidades mayores",
        status: "ok",
      },
      {
        label: "Silueta cardíaca",
        value: "Tamaño normal (ICT < 0.5)",
        status: "ok",
      },
      {
        label: "Ángulos costofrénicos",
        value: "Libres bilateralmente",
        status: "ok",
      },
      {
        label: "Trama vascular",
        value: "Incremento leve en base derecha",
        status: "warn",
      },
      {
        label: "Mediastino",
        value: "Centrado, sin ensanchamiento",
        status: "ok",
      },
    ],
    differentials: [
      { name: "Estudio normal con variante", probability: 60 },
      { name: "Bronquitis / cambios inflamatorios", probability: 30 },
      { name: "Neumonía incipiente", probability: 10 },
    ],
    regions: [
      {
        label: "Zona de interés",
        description: "Base derecha con trama aumentada",
        x: 62,
        y: 58,
      },
    ],
    recommendation:
      "Correlacionar con clínica del paciente. Si presenta sintomatología respiratoria, solicitar control radiológico en 4–6 semanas.",
  };
}
