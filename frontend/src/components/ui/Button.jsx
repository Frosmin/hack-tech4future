/**
 * Button component reutilizable
 *
 * @param {"primary" | "secondary"} variant
 * @param {React.ReactNode} children
 * @param {React.ReactNode} [icon] - ícono a la izquierda
 * @param {React.ReactNode} [iconRight] - ícono a la derecha
 * @param {function} [onClick]
 * @param {string} [className]
 */
export default function Button({
  variant = "primary",
  children,
  icon,
  iconRight,
  onClick,
  className = "",
  ...props
}) {
  const base =
    "flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5";

  const variants = {
    primary: "text-white shadow-lg hover:shadow-xl",
    secondary: "border hover:bg-gray-50",
  };

  const primaryStyle = {
    background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
  };

  const secondaryStyle = {
    borderColor: "#cbd5e1",
    color: "#334155",
    background: "white",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      style={variant === "primary" ? primaryStyle : secondaryStyle}
      {...props}
    >
      {icon && icon}
      {children}
      {iconRight && iconRight}
    </button>
  );
}
