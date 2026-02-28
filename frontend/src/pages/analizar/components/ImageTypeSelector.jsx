/**
 * Selector del tipo de análisis
 *
 * @param {"skin" | "xray" | null} selected
 * @param {function} onSelect
 */
export default function ImageTypeSelector({ selected, onSelect }) {
  const types = [
    {
      id: "skin",
      label: "Mancha de piel",
      desc: "Lesiones, manchas, nevos, erupciones",
      color: "#0ea5e9",
      bg:
        selected === "skin"
          ? "linear-gradient(135deg,#e0f2fe,#bae6fd)"
          : "rgba(255,255,255,0.8)",
      border: selected === "skin" ? "#7dd3fc" : "#e2e8f0",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="3"
            fill={selected === "skin" ? "#0ea5e9" : "#94a3b8"}
          />
          <circle
            cx="7"
            cy="8"
            r="1.5"
            fill={selected === "skin" ? "#38bdf8" : "#cbd5e1"}
          />
          <circle
            cx="17"
            cy="9"
            r="1"
            fill={selected === "skin" ? "#38bdf8" : "#cbd5e1"}
          />
          <circle
            cx="8"
            cy="16"
            r="1.2"
            fill={selected === "skin" ? "#0ea5e9" : "#cbd5e1"}
          />
          <circle
            cx="16"
            cy="15"
            r="1.8"
            fill={selected === "skin" ? "#0ea5e9" : "#94a3b8"}
            opacity="0.6"
          />
        </svg>
      ),
    },
    {
      id: "xray",
      label: "Radiografía",
      desc: "Tórax, huesos, cráneo, columna",
      color: "#6366f1",
      bg:
        selected === "xray"
          ? "linear-gradient(135deg,#ede9fe,#ddd6fe)"
          : "rgba(255,255,255,0.8)",
      border: selected === "xray" ? "#a5b4fc" : "#e2e8f0",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke={selected === "xray" ? "#6366f1" : "#94a3b8"}
            strokeWidth="1.8"
          />
          <path
            d="M12 8v8M8 12h8"
            stroke={selected === "xray" ? "#6366f1" : "#94a3b8"}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8 16 Q12 10 16 8"
            stroke={selected === "xray" ? "#818cf8" : "#cbd5e1"}
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {types.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className="flex flex-col items-center gap-2 p-5 rounded-2xl border text-center transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: t.bg,
            borderColor: t.border,
            boxShadow:
              selected === t.id
                ? `0 8px 30px ${t.color}22`
                : "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: selected === t.id ? "white" : "#f8fafc",
              boxShadow: selected === t.id ? `0 4px 12px ${t.color}20` : "none",
            }}
          >
            {t.icon}
          </div>
          <span
            className="font-semibold text-sm"
            style={{ color: selected === t.id ? t.color : "#334155" }}
          >
            {t.label}
          </span>
          <span className="text-xs leading-tight" style={{ color: "#94a3b8" }}>
            {t.desc}
          </span>
          {selected === t.id && (
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: t.color, color: "white" }}
            >
              Seleccionado ✓
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
