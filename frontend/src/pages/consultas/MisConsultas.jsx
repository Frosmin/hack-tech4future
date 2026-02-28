import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAxios } from '../../hooks/axios';

const MisConsultas = () => {
  const [list, setList] = useState([]);
  const { request, loading, error } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const result = await request({
        method: "GET",
        url: "/protected/misPatologias",
      });

      if (result) {
        setList(result);
      }
    };
    getData();
  }, []);

  const getGravityStyle = (gravity) => {
    if (!gravity) return { bg: "#f1f5f9", text: "#64748b", label: "Desconocida" };
    switch (gravity.toLowerCase()) {
      case 'alta': return { bg: "#fee2e2", text: "#dc2626", label: "Gravedad Alta" };
      case 'moderada': return { bg: "#fef3c7", text: "#d97706", label: "Gravedad Moderada" };
      case 'baja': return { bg: "#dcfce7", text: "#16a34a", label: "Gravedad Baja" };
      default: return { bg: "#f1f5f9", text: "#64748b", label: gravity };
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium font-sans">Cargando tus consultas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <span className="text-5xl mb-4">⚠️</span>
        <h2 className="text-red-500 font-bold text-xl mb-2">Ups, ocurrió un error</h2>
        <p className="text-slate-500">{error.message || "No se pudo cargar el historial"}</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 px-6 lg:px-12"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2 font-serif">
            Histórico de Consultas
          </h1>
          <p className="text-slate-500">
            Revisa el diagnóstico de IA y la evolución de todas tus patologías registradas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Tarjeta especial para Agregar Nueva Consulta */}
          <div 
            onClick={() => navigate('/analizar/0')}
            className="cursor-pointer bg-white rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[16rem] hover:bg-blue-50 hover:border-blue-400 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
            <h3 className="font-bold text-slate-700 text-lg">Nueva Análisis</h3>
            <p className="text-sm text-slate-400 mt-1 px-4 text-center">Inicia un diagnóstico con la IA</p>
          </div>

          {/* Listado de consultas existentes */}
          {list?.map((item) => {
            const gravStyle = getGravityStyle(item.gravity);
            
            return (
              <div 
                key={item.id}
                onClick={() => navigate(`/dashboard/${item.id}`)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="h-44 overflow-hidden relative bg-slate-100">
                  {item.Image ? (
                    <img 
                      src={item.Image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">📷</div>
                  )}
                  {/* Etiqueta de gravedad flotante */}
                  <div 
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-md bg-white/90"
                    style={{ color: gravStyle.text }}
                  >
                    {gravStyle.label}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-800 text-lg mb-1 leading-tight line-clamp-2" style={{ fontFamily: "'Georgia', serif" }}>
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    <span>Ver detalle completo</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MisConsultas;