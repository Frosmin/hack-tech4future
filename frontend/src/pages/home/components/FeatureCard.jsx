import Card from "../../../components/ui/Card";

/**
 * Tarjeta de funcionalidad principal (piel / radiografía)
 *
 * @param {boolean} hovered
 * @param {function} onMouseEnter
 * @param {function} onMouseLeave
 * @param {"blue" | "indigo"} accentColor
 * @param {React.ReactNode} icon
 * @param {string} iconBg - gradient CSS para el fondo del icono
 * @param {string} title
 * @param {string} description
 * @param {string[]} tags
 * @param {string} ctaText
 * @param {string} ctaColor - color hex del texto CTA
 * @param {function} [onCtaClick]
 */
export default function FeatureCard({
  hovered,
  onMouseEnter,
  onMouseLeave,
  accentColor = "blue",
  icon,
  iconBg,
  title,
  description,
  tags = [],
  ctaText,
  ctaColor,
  onCtaClick,
}) {
  const tagStyle = {
    blue: { background: "rgba(14, 165, 233, 0.08)", color: "#0369a1" },
    indigo: { background: "rgba(99, 102, 241, 0.08)", color: "#4338ca" },
  }[accentColor];

  return (
    <Card
      hovered={hovered}
      accentColor={accentColor}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: iconBg }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5" style={{ color: "#64748b" }}>
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={tagStyle}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onCtaClick}
        className="mt-5 flex items-center gap-1 text-sm font-semibold transition-colors bg-transparent border-none p-0 cursor-pointer"
        style={{ color: ctaColor }}
      >
        {ctaText}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke={ctaColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </Card>
  );
}