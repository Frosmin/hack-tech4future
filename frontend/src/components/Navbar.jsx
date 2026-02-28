import { useState } from "react";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Mejorar Planificación", href: "/mejorar-plan" },
  { label: "Preparar Clases", href: "/preparar-clases" },
  { label: "Tareas por Alumno", href: "/tareas-alumno", badge: "Próximo" },
  { label: "Portal Estudiante", href: "/portal-estudiante", badge: "Próximo" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600&display=swap');
        .nav-link { position: relative; }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          transition: width 0.25s ease;
          border-radius: 2px;
        }
        .nav-link:hover::after { width: 100%; }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "rgba(5, 8, 20, 0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 h-[62px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" />
                <path
                  d="M2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span
              className="text-white text-[17px] font-bold tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Edu<span style={{ color: "#38bdf8" }}>Plan</span>{" "}
              <span style={{ color: "#818cf8" }}>AI</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link flex items-center gap-2 px-3 py-2 text-[13px] transition-colors duration-200"
                style={{ color: link.badge ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.65)" }}
                onClick={link.badge ? (e) => e.preventDefault() : undefined}
              >
                {link.label}
                {link.badge && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(129,140,248,0.12)",
                      border: "1px solid rgba(129,140,248,0.25)",
                      color: "#a5b4fc",
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="/login"
              className="text-[13px] px-4 py-2 rounded-lg transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              className="text-[13px] font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-white"
              style={{
                background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                boxShadow: "0 0 20px rgba(56,189,248,0.2)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Comenzar gratis
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  transform:
                    open
                      ? i === 0
                        ? "translateY(7px) rotate(45deg)"
                        : i === 2
                        ? "translateY(-7px) rotate(-45deg)"
                        : "opacity: 0"
                      : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? "420px" : "0",
            borderTop: open ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}
        >
          <div className="px-5 py-4 flex flex-col gap-1" style={{ background: "rgba(5,8,20,0.97)" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-between px-3 py-3 rounded-xl text-[14px] transition-colors"
                style={{
                  color: link.badge ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.7)",
                  background: "transparent",
                }}
                onClick={(e) => {
                  if (link.badge) e.preventDefault();
                  else setOpen(false);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {link.label}
                {link.badge && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(129,140,248,0.12)",
                      border: "1px solid rgba(129,140,248,0.25)",
                      color: "#a5b4fc",
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </a>
            ))}

            <div
              className="flex flex-col gap-2 pt-3 mt-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <a
                href="/login"
                className="text-center py-2.5 rounded-xl text-[14px]"
                style={{ color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                Iniciar sesión
              </a>
              <a
                href="/register"
                className="text-center py-2.5 rounded-xl text-[14px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)" }}
              >
                Comenzar gratis
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}