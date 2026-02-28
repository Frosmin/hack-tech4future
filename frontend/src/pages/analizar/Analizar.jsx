import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useAxios } from "../../hooks/axios";
import ImageUploadZone from "./components/ImageUploadZone";
import ImageTypeSelector from "./components/ImageTypeSelector";
import FloatingParticle from "../home/components/FloatingParticle";
import { PARTICLES } from "../../utils/homeData";
import ResultsPage from "./ResultsPage";

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

export default function AnalyzePage() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();
  const { request } = useAxios(); // Invocamos tu Custom Hook Axios

  const [files, setFiles] = useState([]);
  const [type, setType] = useState(null); // "skin" | "xray"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estado para guardar la respuesta de Go y pasarla a ResultsPage
  const [analysisResult, setAnalysisResult] = useState(null);

  const canAnalyze = files.length > 0 && type !== null;

  const handleAnalyze = async () => {
    if (!canAnalyze) {
      setError("Selecciona al menos una imagen y el tipo de análisis.");
      return;
    }
    setError("");
    setLoading(true);

    // El backend en Go espera 'image' en el FormData
    const formData = new FormData();
    formData.append("image", files[0]);

    try {
      // Condición: Si existe un id y es numéricamente diferente de "0" -> MODO COMPARACIÓN
      if (id && id !== "0") {
        // 1. Enviamos el FormData al Endpoint de Evolución / Comparación
        const response = await request({
          method: "POST",
          url: `/protected/compararPatologias/${id}`, // <-- Apuntamos a la ruta exacta de tu backend
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response) {
          // Éxito: Pasamos a ResultsPage indicando que es una Comparación Visual
          setAnalysisResult({
            isComparison: true,
            files,
            type,
            results: response,
            id,
          });
        }
      } else {
        // Condición: Es una evaluación nueva. -> MODO NUEVA PATOLOGÍA
        const response = await request({
          method: "POST",
          url: `/protected/chat/image`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response && response.ID) {
          // Éxito: Extraemos el ID recién creado por GORM y redirigimos a su propio Dashboard
          navigate(`/dashboard/${response.ID}`);
        } else if (response) {
          // Fallback por precaución si no trae ID
          setAnalysisResult({ files, type, results: response });
        }
      }
    } catch (err) {
      setError("Ocurrió un problema de red enviando los datos.");
    } finally {
      setLoading(false);
    }
  };

  if (analysisResult) {
    return (
      <ResultsPage
        data={analysisResult}
        onNewAnalysis={() => {
          setAnalysisResult(null);
          setFiles([]);
          setType(null);
        }}
      />
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#dbeafe 0%,#d0e8ff 30%,#e9d5ff 70%,#f3e8ff 100%)",
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
      {PARTICLES.slice(0, 4).map((p, i) => (
        <FloatingParticle key={i} style={{ ...p, position: "absolute" }} />
      ))}

      <main className="relative z-10 max-w-5xl mx-auto px-8 pt-6 pb-16">
        <div className="text-center mb-10">
          <h1
            className="text-4xl mb-2"
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
          <div className="lg:col-span-3 flex flex-col gap-6">
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

          <div className="lg:col-span-2 flex flex-col gap-4 lg:sticky lg:top-8">
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
                Tips para mejores resultados
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
                <strong>Aviso importante:</strong> MediScanAI es una herramienta
                de apoyo educativa y no reemplaza el diagnóstico de un
                profesional médico. Consulta siempre a un especialista ante
                cualquier preocupación de salud.
              </p>
            </div>
          </div>
        </div>
      </main>

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

function generateMockResults(type, files) {
  return {
    ID: 1,
    title:
      type === "skin"
        ? "Tinea pedis interdigital"
        : "Posible anomalía estructural",
    description:
      "Se observa eritema significativo, descamación, maceración y fisuras en los espacios interdigitales... La piel presenta una apariencia blanquecina y agrietada en estas áreas, consistente con una infección fúngica.",
    treatment:
      "Mantener los pies limpios y secos, especialmente entre los dedos. Usar calcetines de algodón que absorban la humedad y cambiarlos regularmente. Aplicar un agente antifúngico tópico en la zona afectada. Evitar el uso de calzado ajustado y compartir artículos personales como toallas o calzado.",
    gravity: "Moderada",
    provability: 95,
    isMedical: true,
    userId: 1,
    compuestos: [
      { ID: 1, name: "Miconazol" },
      { ID: 2, name: "Clotrimazol" },
      { ID: 3, name: "Terbinafina" },
      { ID: 4, name: "Ketoconazol" },
    ],
  };
}
