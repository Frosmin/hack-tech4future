/**
 * Tarjeta de paso numerado para la sección "Cómo funciona"
 *
 * @param {string} step - número como string, e.g. "01"
 * @param {string} title
 * @param {string} description
 * @param {string} color - color hex del número
 */
export default function StepCard({ step, title, description, color }) {
  return (
    <div
      className="rounded-2xl p-7 border transition-all duration-200 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.7)",
        borderColor: "#e2e8f0",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="text-5xl font-bold mb-4 leading-none"
        style={{ color, fontFamily: "'Georgia', serif", opacity: 0.15 }}
      >
        {step}
      </div>
      <h4
        className="font-bold text-lg mb-2"
        style={{ color: "#0f172a", fontFamily: "'Georgia', serif" }}
      >
        {title}
      </h4>
      <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
        {description}
      </p>
    </div>
  );
}
