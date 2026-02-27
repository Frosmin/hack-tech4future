import Navbar from "../../components/Navbar";

// ── datos de módulos ─────────────────────────────────────────────────────────
const modules = [
  {
    id: "mejorar-plan",
    href: "/mejorar-plan",
    emoji: "📄",
    accent: "#38bdf8",
    accentBg: "rgba(56,189,248,0.08)",
    accentBorder: "rgba(56,189,248,0.18)",
    title: "Mejorar mi Planificación",
    desc: "Sube tu planificación actual y la IA detecta áreas de mejora pedagógica, la enriquece con objetivos, indicadores y actividades, y te entrega el documento final en PDF listo para entregar.",
    tags: ["Subir PDF / DOCX", "Análisis IA", "Exportar PDF"],
    available: true,
  },
  {
    id: "preparar-clases",
    href: "/preparar-clases",
    emoji: "🎓",
    accent: "#818cf8",
    accentBg: "rgba(129,140,248,0.08)",
    accentBorder: "rgba(129,140,248,0.18)",
    title: "Preparar mis Clases",
    desc: "Ingresa tus temas y el nivel del curso. Obtén al instante diapositivas, ejercicios prácticos, tareas, estrategias de enseñanza e ideas creativas para que cada clase sea memorable.",
    tags: ["Diapositivas", "Ejercicios", "Estrategias", "Ideas creativas"],
    available: true,
  },
  {
    id: "tareas-alumno",
    href: "#",
    emoji: "🧑‍🎓",
    accent: "#34d399",
    accentBg: "rgba(52,211,153,0.06)",
    accentBorder: "rgba(52,211,153,0.14)",
    title: "Tareas por Alumno",
    desc: "El docente sube el perfil de cada estudiante y la IA genera tareas 100% personalizadas: nivel de dificultad, formato e intereses adaptados a cada uno.",
    tags: ["Perfiles", "Personalización", "Adaptativo"],
    available: false,
  },
  {
    id: "portal-estudiante",
    href: "#",
    emoji: "🖥️",
    accent: "#f59e0b",
    accentBg: "rgba(245,158,11,0.06)",
    accentBorder: "rgba(245,158,11,0.14)",
    title: "Portal del Estudiante",
    desc: "Cada alumno accede a su espacio personal donde la plataforma ya preparó las tareas que la IA personalizó especialmente para él, con seguimiento de progreso.",
    tags: ["Dashboard propio", "Progreso", "Tareas IA"],
    available: false,
  },
];

const steps = [
  { num: "01", label: "Sube tu material", sub: "Plan existente o lista de temas" },
  { num: "02", label: "La IA lo procesa", sub: "Análisis pedagógico profundo" },
  { num: "03", label: "Revisa y ajusta", sub: "Edita con lenguaje natural" },
  { num: "04", label: "Descarga y enseña", sub: "PDF, PPT o comparte directo" },
];

// ── componente de tarjeta ────────────────────────────────────────────────────
function ModuleCard({ mod }) {
  return (
    <a
      href={mod.available ? mod.href : "#"}
      onClick={!mod.available ? (e) => e.preventDefault() : undefined}
      className="group relative flex flex-col rounded-2xl p-6 transition-all duration-300"
      style={{
        background: mod.available ? mod.accentBg : "rgba(255,255,255,0.015)",
        border: `1px solid ${mod.available ? mod.accentBorder : "rgba(255,255,255,0.06)"}`,
        opacity: mod.available ? 1 : 0.5,
        cursor: mod.available ? "pointer" : "default",
        transform: "translateY(0)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
      }}
      onMouseEnter={(e) => {
        if (mod.available) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = `0 20px 60px ${mod.accent}18`;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {!mod.available && (
        <span
          className="absolute top-4 right-4 text-[11px] px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(129,140,248,0.1)",
            border: "1px solid rgba(129,140,248,0.2)",
            color: "#a5b4fc",
          }}
        >
          Próximamente
        </span>
      )}

      {/* icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
        style={{ background: `${mod.accent}18`, border: `1px solid ${mod.accent}25` }}
      >
        {mod.emoji}
      </div>

      <h3
        className="text-white font-bold text-lg mb-2 leading-tight"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {mod.title}
      </h3>

      <p className="text-sm mb-5 flex-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
        {mod.desc}
      </p>

      {/* tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {mod.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {mod.available && (
        <div
          className="flex items-center gap-1.5 text-sm font-semibold transition-gap duration-200"
          style={{ color: mod.accent }}
        >
          Abrir módulo
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 24 24"
            className="group-hover:translate-x-1 transition-transform duration-200"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </a>
  );
}

// ── página home ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050814; }
        .grain::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
        }
      `}</style>

      <div className="grain" style={{ fontFamily: "'DM Sans', sans-serif", background: "#050814", minHeight: "100vh" }}>
        <Navbar />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh", paddingTop: "62px" }}>
          {/* glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute rounded-full"
              style={{
                width: 680,
                height: 400,
                top: "18%",
                left: "50%",
                transform: "translateX(-50%)",
                background: "radial-gradient(ellipse, rgba(56,189,248,0.13) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: 360,
                height: 360,
                top: "30%",
                left: "15%",
                background: "radial-gradient(ellipse, rgba(129,140,248,0.09) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            {/* dot grid */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            {/* badge */}
            <div
              className="inline-flex items-center gap-2 text-sm mb-8 px-4 py-2 rounded-full"
              style={{
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.2)",
                color: "#7dd3fc",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#38bdf8", boxShadow: "0 0 6px #38bdf8", animation: "pulse 2s infinite" }}
              />
              Asistente de planificación para docentes · IA
            </div>

            <h1
              className="font-black leading-none mb-6"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
                color: "white",
                letterSpacing: "-0.03em",
              }}
            >
              Planifica mejor,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                enseña mejor
              </span>
            </h1>

            <p
              className="text-lg mb-10 max-w-xl mx-auto leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              EduPlan AI transforma tu planificación docente con inteligencia artificial — desde mejorar tus planes hasta generar clases completas y tareas personalizadas por alumno.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/register"
                className="px-8 py-3.5 rounded-xl font-semibold text-white text-[15px] transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                  boxShadow: "0 0 40px rgba(56,189,248,0.25)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Empezar gratis
              </a>
              <a
                href="#modulos"
                className="px-8 py-3.5 rounded-xl font-semibold text-[15px] transition-colors"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.6)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                Ver módulos ↓
              </a>
            </div>

            {/* mini stats */}
            <div
              className="mt-16 grid grid-cols-3 gap-6 pt-10"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[
                { v: "4", s: "módulos IA" },
                { v: "10×", s: "más rápido" },
                { v: "100%", s: "personalizado" },
              ].map((x) => (
                <div key={x.s}>
                  <div
                    className="font-black text-3xl text-white"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {x.v}
                  </div>
                  <div className="text-xs mt-0.5 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {x.s}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MÓDULOS ──────────────────────────────────────────────────────── */}
        <section id="modulos" className="py-28 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#38bdf8" }}
              >
                Módulos disponibles
              </p>
              <h2
                className="font-black text-white mb-4"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Todo lo que necesitas en un solo lugar
              </h2>
              <p className="max-w-lg mx-auto text-base" style={{ color: "rgba(255,255,255,0.38)" }}>
                Desde mejorar planes existentes hasta generar contenido de clase completo — cubrimos todo el flujo docente.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {modules.map((m) => (
                <ModuleCard key={m.id} mod={m} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ────────────────────────────────────────────────── */}
        <section
          className="py-24 px-6"
          style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-3"
                style={{ color: "#818cf8" }}
              >
                Proceso
              </p>
              <h2
                className="font-black text-white"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                ¿Cómo funciona?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <div key={s.num} className="relative text-center">
                  {i < steps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-7 left-[55%] w-full h-px"
                      style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.3), transparent)" }}
                    />
                  )}
                  <div
                    className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(56,189,248,0.07)",
                      border: "1px solid rgba(56,189,248,0.18)",
                    }}
                  >
                    <span
                      className="font-black text-base"
                      style={{ fontFamily: "'Syne', sans-serif", color: "#38bdf8" }}
                    >
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold mb-1 text-[15px]">{s.label}</h3>
                  <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-28 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div
              className="rounded-3xl p-12 relative overflow-hidden"
              style={{
                background: "rgba(56,189,248,0.05)",
                border: "1px solid rgba(56,189,248,0.15)",
              }}
            >
              <div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />
              <div className="relative z-10">
                <h2
                  className="font-black text-white mb-4"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  ¿Listo para transformar tus clases?
                </h2>
                <p className="mb-8 text-base" style={{ color: "rgba(255,255,255,0.42)" }}>
                  Únete a los docentes que planifican de forma más inteligente con EduPlan AI.
                </p>
                <a
                  href="/register"
                  className="inline-block px-10 py-4 rounded-xl font-bold text-white text-[15px] transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                    boxShadow: "0 0 50px rgba(56,189,248,0.3)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Comenzar gratis hoy
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer
          className="py-8 px-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <span
              className="font-bold text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Edu<span style={{ color: "#38bdf8" }}>Plan</span>{" "}
              <span style={{ color: "#818cf8" }}>AI</span>
            </span>
            <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              © 2025 EduPlan AI · Hackathon 🚀
            </span>
            <div className="flex gap-5 text-[13px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              {["Términos", "Privacidad", "Contacto"].map((l) => (
                <a key={l} href="#" onMouseEnter={(e) => (e.currentTarget.style.color = "white")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}