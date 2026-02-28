/**
 * Datos de partículas flotantes decorativas para el Home
 */
export const PARTICLES = [
  {
    width: 6,
    height: 6,
    background: "#0ea5e9",
    top: "15%",
    left: "8%",
    animationDuration: "3s",
  },
  {
    width: 10,
    height: 10,
    background: "#6366f1",
    top: "70%",
    left: "5%",
    animationDuration: "4s",
  },
  {
    width: 4,
    height: 4,
    background: "#0ea5e9",
    top: "40%",
    left: "92%",
    animationDuration: "2.5s",
  },
  {
    width: 8,
    height: 8,
    background: "#6366f1",
    top: "85%",
    left: "88%",
    animationDuration: "3.5s",
  },
  {
    width: 5,
    height: 5,
    background: "#0ea5e9",
    top: "25%",
    left: "95%",
    animationDuration: "4.5s",
  },
  {
    width: 7,
    height: 7,
    background: "#6366f1",
    top: "55%",
    left: "3%",
    animationDuration: "2s",
  },
];

/**
 * Datos de las tarjetas de funcionalidad principal
 */
export const FEATURE_CARDS = [
  {
    id: "skin",
    accentColor: "blue",
    iconBg: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
    title: "Análisis de manchas cutáneas",
    description:
      "Detecta y clasifica lesiones dérmicas. Obtén posibles diagnósticos diferenciales, nivel de urgencia sugerido y recomendaciones de seguimiento.",
    tags: ["Melanoma", "Dermatitis", "Psoriasis", "Manchas benignas"],
    ctaText: "Analizar imagen cutánea",
    ctaColor: "#0ea5e9",
  },
  {
    id: "xray",
    accentColor: "indigo",
    iconBg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
    title: "Interpretación de radiografías",
    description:
      "Identifica regiones de interés en la imagen. La IA señala zonas con posibles irregularidades y describe qué podría indicar cada hallazgo.",
    tags: ["Tórax", "Huesos", "Cráneo", "Columna vertebral"],
    ctaText: "Analizar radiografía",
    ctaColor: "#6366f1",
  },
];

/**
 * Datos de los pasos de "Cómo funciona"
 */
export const STEPS = [
  {
    step: "01",
    title: "Sube tu imagen",
    description:
      "Arrastra o selecciona una foto de la mancha de piel o radiografía desde tu dispositivo.",
    color: "#0ea5e9",
  },
  {
    step: "02",
    title: "La IA analiza",
    description:
      "Nuestro modelo identifica el tipo de imagen y procesa cada detalle visual en segundos.",
    color: "#6366f1",
  },
  {
    step: "03",
    title: "Recibe el informe",
    description:
      "Obtén posibles diagnósticos, zonas marcadas de interés y recomendaciones claras.",
    color: "#0ea5e9",
  },
];

/**
 * Estadísticas del strip de stats
 */
export const STATS = [
  { value: "< 10s", label: "Tiempo de análisis", color: "#0ea5e9" },
  { value: "2 tipos", label: "Modalidades de imagen", color: "#6366f1" },
  { value: "IA médica", label: "Modelo especializado", color: "#0ea5e9" },
];
