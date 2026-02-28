/**
 * Partícula flotante decorativa
 * @param {object} style - estilos inline (width, height, background, top, left, animationDuration)
 */
export default function FloatingParticle({ style }) {
  return (
    <div
      className="absolute rounded-full opacity-20 animate-pulse"
      style={style}
    />
  );
}