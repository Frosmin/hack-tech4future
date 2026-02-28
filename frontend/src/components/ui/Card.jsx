/**
 * Card base reutilizable con hover effect
 *
 * @param {React.ReactNode} children
 * @param {boolean} [hovered]
 * @param {"blue" | "indigo"} [accentColor]
 * @param {function} [onMouseEnter]
 * @param {function} [onMouseLeave]
 * @param {string} [className]
 */
export default function Card({
  children,
  hovered = false,
  accentColor = "blue",
  onMouseEnter,
  onMouseLeave,
  className = "",
}) {
  const accent = {
    blue: {
      border: hovered ? "#7dd3fc" : "#e2e8f0",
      shadow: hovered
        ? "0 20px 60px rgba(14,165,233,0.15)"
        : "0 4px 20px rgba(0,0,0,0.06)",
      decorative: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
    },
    indigo: {
      border: hovered ? "#a5b4fc" : "#e2e8f0",
      shadow: hovered
        ? "0 20px 60px rgba(99,102,241,0.15)"
        : "0 4px 20px rgba(0,0,0,0.06)",
      decorative: "linear-gradient(135deg, #6366f1, #818cf8)",
    },
  }[accentColor];

  return (
    <div
      className={`relative rounded-2xl p-8 cursor-pointer transition-all duration-300 border overflow-hidden ${className}`}
      style={{
        background: hovered ? "white" : "rgba(255,255,255,0.7)",
        borderColor: accent.border,
        boxShadow: accent.shadow,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Decorative circle top-right */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 pointer-events-none"
        style={{ background: accent.decorative }}
      />
      {children}
    </div>
  );
}
