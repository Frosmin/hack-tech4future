import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAxios } from "../../hooks/axios";

// Componente para la barra de probabilidad
function ConfidenceMeter({ value }) {
  const getColor = (v) => {
    if (v >= 75) return "#16a34a";
    if (v >= 50) return "#d97706";
    return "#dc2626";
  };
  const color = getColor(value);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium" style={{ color: "#64748b" }}>
          Nivel de Certeza (IA)
        </span>
        <span
          className="text-lg font-extrabold"
          style={{ color, fontFamily: "system-ui, sans-serif" }}
        >
          {value}%
        </span>
      </div>
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ background: "#f1f5f9" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}90, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}

// Componente de etiqueta de evolución
function EvolutionBadge({ status }) {
  if (!status) return null;
  const styles = {
    mejora: { bg: "#dcfce7", color: "#16a34a", icon: "📈" },
    empeoramiento: { bg: "#fee2e2", color: "#dc2626", icon: "📉" },
    "sin cambios": { bg: "#f1f5f9", color: "#64748b", icon: "➡️" },
  };
  const s = styles[status.toLowerCase()] || styles["sin cambios"];

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
      style={{ background: s.bg, color: s.color }}
    >
      {s.icon} {status}
    </span>
  );
}

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { request, loading, error } = useAxios();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPatologia = async () => {
      if (!id) return;

      const response = await request({
        method: "GET",
        url: `/protected/patologia/${id}`,
      });

      if (response) {
        const sortedData = { ...response };
        if (sortedData.photos && sortedData.photos.length > 0) {
          sortedData.photos.sort(
            (a, b) =>
              new Date(a.dateTaken || a.CreatedAt) -
              new Date(b.dateTaken || b.CreatedAt)
          );
        }
        setData(sortedData);
      }
    };

    fetchPatologia();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">
          Cargando datos del historial...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="bg-red-50 p-5 rounded-2xl shadow-sm mb-4">
          <span className="text-5xl">⚠️</span>
        </div>
        <b className="text-red-600 text-lg mb-2">
          Error al cargar la información
        </b>
        <p className="text-sm text-slate-500 max-w-md">
          {error.error || error.message || "Patología no encontrada"}
        </p>
      </div>
    );
  }

  if (!data) return null;

  const urgencyStyle = {
    alta: {
      bg: "#fee2e2",
      color: "#dc2626",
      label: "⚠ Gravedad Alta",
      border: "#fecaca",
    },
    moderada: {
      bg: "#fef3c7",
      color: "#d97706",
      label: "⚡ Gravedad Moderada",
      border: "#fde68a",
    },
    baja: {
      bg: "#dcfce7",
      color: "#16a34a",
      label: "✓ Gravedad Baja",
      border: "#bbf7d0",
    },
  }[data.gravity?.toLowerCase()] || {
    bg: "#f1f5f9",
    color: "#64748b",
    label: data.gravity || "Desconocida",
    border: "#e2e8f0",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Fecha desconocida";
    const opts = { day: "numeric", month: "short", year: "numeric" };
    return new Intl.DateTimeFormat("es-ES", opts).format(new Date(dateString));
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(160deg, #f0f9ff 0%, #f8fafc 40%, #f5f3ff 80%, #faf5ff 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20">
        {/* Breadcrumb / back */}
        <button
          onClick={() => navigate("/consultas")}
          className="flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-70 transition-opacity cursor-pointer"
          style={{ color: "#64748b" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver a Mis Consultas
        </button>

        {/* Cabecera */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-8 border shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${urgencyStyle.bg}60, white 60%)`,
            borderColor: urgencyStyle.border,
          }}
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full shadow-sm"
                  style={{
                    background: urgencyStyle.bg,
                    color: urgencyStyle.color,
                    border: `1px solid ${urgencyStyle.border}`,
                  }}
                >
                  {urgencyStyle.label}
                </span>
                <span
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: "#f1f5f9",
                    color: "#64748b",
                  }}
                >
                  📅 {formatDate(data.CreatedAt)}
                </span>
              </div>
              <h1
                className="text-3xl md:text-4xl font-bold leading-tight"
                style={{ color: "#0f172a", letterSpacing: "-0.025em" }}
              >
                {data.title}
              </h1>
              {data.isMedical === false && (
                <p
                  className="text-sm mt-2 font-medium"
                  style={{ color: "#d97706" }}
                >
                  ⚠ La IA no detectó contenido médico en esta imagen.
                </p>
              )}
            </div>
            <button
              onClick={() => navigate("/analizar/" + id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shrink-0"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Subir seguimiento
            </button>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Columna izquierda */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Descripción clínica */}
            <div
              className="rounded-2xl p-6 border bg-white/90 backdrop-blur-md shadow-sm"
              style={{ borderColor: "#e2e8f0" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "#f0f9ff" }}
                >
                  <span className="text-base">📋</span>
                </div>
                <h3
                  className="text-base font-bold"
                  style={{ color: "#0f172a" }}
                >
                  Descripción Clínica
                </h3>
              </div>
              <p
                className="text-sm leading-[1.8]"
                style={{ color: "#475569" }}
              >
                {data.description}
              </p>
            </div>

            {/* Tratamiento */}
            <div
              className="rounded-2xl p-6 border shadow-sm"
              style={{
                background:
                  "linear-gradient(135deg, #f0f9ff 0%, #eff6ff 100%)",
                borderColor: "#bae6fd",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                  style={{
                    background: "white",
                    border: "1px solid #bae6fd",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
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
                </div>
                <div>
                  <p
                    className="text-base font-bold mb-2"
                    style={{ color: "#0369a1" }}
                  >
                    Plan de Tratamiento Recomendado
                  </p>
                  <p
                    className="text-sm leading-[1.8]"
                    style={{ color: "#0c4a6e" }}
                  >
                    {data.treatment}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-6">
            {/* Probabilidad */}
            <div
              className="rounded-2xl p-6 border bg-white/90 backdrop-blur-md shadow-sm"
              style={{ borderColor: "#e2e8f0" }}
            >
              <ConfidenceMeter value={data.provability} />
            </div>

            {/* Compuestos */}
            {data.compuestos && data.compuestos.length > 0 && (
              <div
                className="rounded-2xl p-6 border bg-white/90 backdrop-blur-md shadow-sm flex-1"
                style={{ borderColor: "#e2e8f0" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: "#faf5ff" }}
                  >
                    <span className="text-base">💊</span>
                  </div>
                  <h3
                    className="text-sm font-bold"
                    style={{ color: "#0f172a" }}
                  >
                    Principios Activos
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  {data.compuestos.map((c) => (
                    <div
                      key={c.ID}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-slate-50"
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: "#6366f1" }}
                      />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: "#334155" }}
                      >
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info card */}
            <div
              className="rounded-2xl p-5 border shadow-sm"
              style={{
                background: "linear-gradient(135deg, #fefce8, #fef9c3)",
                borderColor: "#fde68a",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg shrink-0">💡</span>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#92400e" }}
                >
                  <strong>Recuerda:</strong> Este análisis es orientativo. Sube
                  fotos de seguimiento periódicamente para que la IA compare la
                  evolución.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── TIMELINE DE EVOLUCIÓN ── */}
        <div
          className="rounded-2xl border bg-white/90 backdrop-blur-md shadow-sm overflow-hidden"
          style={{ borderColor: "#e2e8f0" }}
        >
          {/* Header del timeline */}
          <div
            className="px-6 md:px-8 py-5 border-b flex items-center justify-between flex-wrap gap-3"
            style={{
              borderColor: "#f1f5f9",
              background:
                "linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)",
            }}
          >
            <div>
              <h2
                className="text-xl font-bold flex items-center gap-2"
                style={{ color: "#0f172a" }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Evolución Fotográfica
              </h2>
              <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>
                {data.photos?.length || 0} registro
                {data.photos?.length !== 1 ? "s" : ""} · De más antiguo a más
                reciente
              </p>
            </div>
            <button
              onClick={() => navigate("/analizar/" + id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border-2 border-dashed hover:bg-sky-50 transition-colors cursor-pointer"
              style={{ borderColor: "#0ea5e9", color: "#0ea5e9" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Añadir registro
            </button>
          </div>

          {/* Contenido del timeline */}
          <div className="px-6 md:px-8 py-8">
            {data.photos && data.photos.length > 0 ? (
              <div className="relative">
                {/* Línea vertical para móvil, horizontal para desktop */}
                <div className="hidden md:block absolute top-6 left-8 right-8 h-0.5 bg-gradient-to-r from-sky-200 via-indigo-200 to-sky-200 rounded-full" />
                <div className="md:hidden absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-sky-200 via-indigo-200 to-sky-200 rounded-full" />

                {/* Grid de fotos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-6">
                  {data.photos.map((photo, index) => {
                    const isFirst = index === 0;
                    const isLast = index === data.photos.length - 1;
                    const dotColor = isLast ? "#0ea5e9" : isFirst ? "#6366f1" : "#cbd5e1";

                    return (
                      <div key={photo.ID} className="relative group">
                        {/* Punto en el timeline */}
                        <div className="flex md:justify-center mb-4 md:mb-6">
                          <div className="relative flex items-center gap-3 md:flex-col md:gap-1">
                            <div
                              className="w-3.5 h-3.5 rounded-full border-[3px] z-10 transition-transform duration-300 group-hover:scale-150 shrink-0"
                              style={{
                                background: "white",
                                borderColor: dotColor,
                                boxShadow: `0 0 0 4px ${dotColor}20`,
                              }}
                            />
                            <span
                              className="text-[10px] font-bold uppercase tracking-wider md:mt-1"
                              style={{ color: dotColor }}
                            >
                              {isFirst
                                ? "Inicio"
                                : isLast
                                ? "Última"
                                : `#${index + 1}`}
                            </span>
                          </div>
                        </div>

                        {/* Tarjeta de la foto */}
                        <div
                          className="rounded-xl overflow-hidden border transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 bg-white ml-10 md:ml-0"
                          style={{ borderColor: "#e2e8f0" }}
                        >
                          <div className="relative overflow-hidden">
                            <img
                              src={photo.photoUrl}
                              alt={`Evolución ${index + 1}`}
                              className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Overlay con fecha */}
                            <div
                              className="absolute bottom-0 left-0 right-0 px-3 py-2"
                              style={{
                                background:
                                  "linear-gradient(transparent, rgba(0,0,0,0.6))",
                              }}
                            >
                              <span className="text-[11px] font-bold text-white">
                                {formatDate(photo.dateTaken || photo.CreatedAt)}
                              </span>
                            </div>
                            {/* Badge de primer/último registro */}
                            {(isFirst || isLast) && (
                              <div
                                className="absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] font-bold backdrop-blur-md"
                                style={{
                                  background: isFirst
                                    ? "rgba(99,102,241,0.85)"
                                    : "rgba(14,165,233,0.85)",
                                  color: "white",
                                }}
                              >
                                {isFirst ? "📌 Original" : "🆕 Reciente"}
                              </div>
                            )}
                          </div>

                          {/* Análisis de evolución (si existe) */}
                          {(photo.evolutionStatus ||
                            photo.analysisSummary) && (
                            <div
                              className="px-3 py-3 border-t"
                              style={{
                                borderColor: "#f1f5f9",
                                background: "#fafbfc",
                              }}
                            >
                              {photo.evolutionStatus && (
                                <div className="mb-1.5">
                                  <EvolutionBadge
                                    status={photo.evolutionStatus}
                                  />
                                </div>
                              )}
                              {photo.analysisSummary && (
                                <p
                                  className="text-[11px] leading-relaxed line-clamp-3"
                                  style={{ color: "#64748b" }}
                                >
                                  {photo.analysisSummary}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Tarjeta para añadir nueva foto */}
                  <div className="relative group">
                    <div className="flex md:justify-center mb-4 md:mb-6">
                      <div className="relative flex items-center gap-3 md:flex-col md:gap-1">
                        <div
                          className="w-3.5 h-3.5 rounded-full border-[3px] border-dashed z-10 shrink-0"
                          style={{
                            background: "white",
                            borderColor: "#cbd5e1",
                          }}
                        />
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider md:mt-1"
                          style={{ color: "#94a3b8" }}
                        >
                          Siguiente
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("/analizar/" + id)}
                      className="w-full h-44 ml-10 md:ml-0 rounded-xl border-2 border-dashed flex flex-col items-center justify-center hover:bg-sky-50/50 hover:border-sky-300 transition-all duration-300 cursor-pointer group"
                      style={{ borderColor: "#cbd5e1" }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: "#f0f9ff" }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#64748b" }}
                      >
                        Nuevo seguimiento
                      </span>
                      <span
                        className="text-[10px] mt-0.5"
                        style={{ color: "#94a3b8" }}
                      >
                        Sube una foto actualizada
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #f0f9ff, #ede9fe)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <span className="text-3xl">📷</span>
                </div>
                <p
                  className="text-base font-bold mb-1"
                  style={{ color: "#0f172a" }}
                >
                  Sin registros de seguimiento
                </p>
                <p
                  className="text-sm mb-6 max-w-sm"
                  style={{ color: "#94a3b8" }}
                >
                  Sube fotos regularmente para que la IA compare y registre la
                  evolución de tu patología.
                </p>
                <button
                  onClick={() => navigate("/analizar/" + id)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                  Subir primera foto de seguimiento
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}