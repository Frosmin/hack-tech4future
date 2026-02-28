import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAxios } from "../../hooks/axios";

// Componente para la barra de probabilidad
function ConfidenceMeter({ value }) {
  const color = "#0ea5e9";
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs" style={{ color: "#94a3b8" }}>Nivel de Certeza Inicial (IA)</span>
        <span className="text-sm font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}aa, ${color})` }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { id } = useParams(); 
  const navigate = useNavigate(); // 1. Inicializamos useNavigate
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
          sortedData.photos.sort((a, b) => new Date(a.dateTaken || a.CreatedAt) - new Date(b.dateTaken || b.CreatedAt));
        }
        setData(sortedData);
      }
    };

    fetchPatologia();
    
  }, [id]); 

  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-semibold text-slate-500">Cargando datos del historial...</div>;
  }

 
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <span className="text-4xl shadow-sm rounded-full bg-red-50 p-4 mb-4">⚠️</span>
        <b className="text-red-500 mb-2">Error al cargar la información</b>
        <p className="text-sm text-slate-500">{error.error || error.message || "Patología no encontrada"}</p>
      </div>
    );
  }

  
  if (!data) return null;

  // Estilos de gravedad dinámica
  const urgencyStyle = {
    alta: { bg: "#fee2e2", color: "#dc2626", label: "Gravedad Alta" },
    moderada: { bg: "#fef3c7", color: "#d97706", label: "Gravedad Moderada" },
    baja: { bg: "#dcfce7", color: "#16a34a", label: "Gravedad Baja" },
  }[data.gravity?.toLowerCase()] || { bg: "#f1f5f9", color: "#64748b", label: data.gravity || "Desconocida" };

  // Formato de fecha
  const formatDate = (dateString) => {
    if (!dateString) return "Fecha desconocida";
    const opts = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', opts).format(new Date(dateString));
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#f0f9ff 0%,#e8f4fe 30%,#f5f3ff 70%,#faf5ff 100%)",
        fontFamily: "'Georgia', serif",
      }}
    >
      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-10 pb-16">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full shadow-sm"
                style={{ background: urgencyStyle.bg, color: urgencyStyle.color }}
              >
                {urgencyStyle.label}
              </span>
              <span className="text-xs font-medium" style={{ color: "#64748b" }}>
                Diagnóstico inicial: {formatDate(data.CreatedAt)}
              </span>
            </div>
            <h1 className="text-3xl font-bold" style={{ color: "#0f172a", letterSpacing: "-0.02em" }}>
              {data.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Detalles Izquierda (Descripción y Tratamiento) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="rounded-2xl p-6 border bg-white/80 backdrop-blur-md shadow-sm" style={{ borderColor: "#e2e8f0" }}>
              <p className="text-sm font-bold mb-2 flex items-center gap-2" style={{ color: "#0f172a" }}>
                <span className="text-xl">📋</span> Detalles Clínicos
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{data.description}</p>
            </div>

            <div className="rounded-2xl p-6 border flex items-start gap-4 shadow-sm bg-blue-50/70" style={{ borderColor: "#bae6fd" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner" style={{ background: "white" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                  <path d="M22 4L12 14.01l-3-3" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-md font-bold mb-2" style={{ color: "#0369a1" }}>Plan de Tratamiento Activo</p>
                <p className="text-sm leading-relaxed" style={{ color: "#0369a1" }}>{data.treatment}</p>
              </div>
            </div>
          </div>

          {/* Panel Lateral Derecho (Probabilidad y Compuestos) */}
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl p-6 border bg-white/80 backdrop-blur-md shadow-sm" style={{ borderColor: "#e2e8f0" }}>
              <ConfidenceMeter value={data.provability} />
            </div>

            {data.compuestos && data.compuestos.length > 0 && (
              <div className="rounded-2xl p-6 border bg-white/80 backdrop-blur-md shadow-sm flex-1" style={{ borderColor: "#e2e8f0" }}>
                <p className="text-sm font-bold mb-4" style={{ color: "#0f172a" }}>Principios Activos Sugeridos</p>
                <div className="flex flex-wrap gap-2">
                  {data.compuestos.map((c) => (
                    <span
                      key={c.ID}
                      className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm"
                      style={{ background: "#f8fafc", color: "#334155", border: "1px solid #e2e8f0" }}
                    >
                      💊 {c.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── TIMELINE VISUAL DE MEJORA ── */}
        <div className="rounded-2xl p-6 mx-auto border bg-white/90 backdrop-blur-md shadow-md" style={{ borderColor: "#e2e8f0" }}>
          <h2 className="text-xl font-bold mb-1" style={{ color: "#0f172a" }}>Evolución Fotográfica</h2>
          <p className="text-sm mb-6" style={{ color: "#64748b" }}>Linea de tiempo de la mejora de tu patología (Izquierda: Antiguo → Derecha: Nuevo)</p>

          {data.photos && data.photos.length > 0 ? (
            <div className="relative">
              {/* Linea conectora horizontal */}
              <div className="absolute top-[4.5rem] left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #e2e8f0, #cbd5e1)" }} />
              
              {/* Contenedor flexible scrollable */}
              <div className="overflow-x-auto flex gap-6 pb-4 pt-2 -mx-2 px-2 snap-x">
                {data.photos.map((photo, index) => (
                  <div key={photo.ID} className="relative flex flex-col items-center min-w-[200px] snap-center group">
                    
                    {/* Punto indicador en la linea */}
                    <div className="z-10 w-4 h-4 rounded-full border-4 mb-4 transition-all duration-300 group-hover:scale-125 group-hover:border-sky-500" 
                         style={{ background: "white", borderColor: index === data.photos.length - 1 ? "#0ea5e9" : "#cbd5e1" }} />
                    
                    {/* Tarjeta de imagen */}
                    <div className="rounded-xl overflow-hidden border shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 w-full bg-white" style={{ borderColor: "#e2e8f0" }}>
                      <img 
                        src={photo.photoUrl} 
                        alt={`Evolución ${index + 1}`} 
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3 text-center">
                        <span className="text-xs font-bold block" style={{ color: "#0f172a" }}>
                          {formatDate(photo.dateTaken || photo.CreatedAt)}
                        </span>
                        <span className="text-[10px] mt-1 inline-block" style={{ color: "#94a3b8" }}>
                          {index === 0 ? "Primera toma" : index === data.photos.length - 1 ? "Última toma" : `Registro #${index + 1}`}
                        </span>
                      </div>
                    </div>

                  </div>
                ))}

                {/* Botón "Añadir Nueva Foto" al final del timeline */}
                <div className="relative flex flex-col items-center min-w-[150px] snap-center justify-center">
                  <button 
                    onClick={() => navigate('/analizar')} 
                    className="h-32 w-full mt-8 rounded-xl border-2 border-dashed flex flex-col items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer" 
                    style={{ borderColor: "#cbd5e1" }}
                  >
                    <span className="text-2xl mb-1 text-slate-400">+</span>
                    <span className="text-xs font-semibold text-slate-500">Subir Nueva</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
             <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center">
               <span className="text-4xl mb-3 block opacity-40">📷</span>
               <p className="text-sm font-semibold text-slate-600">Aún no hay fotos de seguimiento.</p>
               <p className="text-xs text-slate-400 mt-1 mb-4">Sube fotos regularmente para registrar tu mejora.</p>
               <button 
                 onClick={() => navigate('/analizar')}
                 className="px-4 py-2 text-xs font-semibold text-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                 style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)" }}
               >
                 Subir nueva foto
               </button>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}