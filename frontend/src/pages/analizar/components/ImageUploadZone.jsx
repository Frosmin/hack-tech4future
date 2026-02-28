import { useRef, useState } from "react";

/**
 * Zona de carga de imágenes
 * Soporta: click para seleccionar, drag & drop, cámara (móvil)
 *
 * @param {File[]} files - archivos actuales
 * @param {function} onFilesChange - callback con nuevo array de File[]
 */
export default function ImageUploadZone({ files = [], onFilesChange }) {
  const inputRef = useRef(null);
  const cameraRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (incoming) => {
    const valid = Array.from(incoming).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (!valid.length) return;
    const merged = [...files, ...valid].slice(0, 1); // máx 6 imágenes
    onFilesChange(merged);
  };

  const removeFile = (idx) => {
    const next = files.filter((_, i) => i !== idx);
    onFilesChange(next);
  };

  // Drag & Drop
  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="w-full">
      {/* ── Drop zone ── */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className="relative w-full rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 select-none"
        style={{
          minHeight: 220,
          borderColor: dragging ? "#0ea5e9" : "#cbd5e1",
          background: dragging
            ? "rgba(14,165,233,0.04)"
            : "rgba(255,255,255,0.7)",
        }}
      >
        {/* Icono central */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200"
          style={{
            background: dragging
              ? "linear-gradient(135deg,#e0f2fe,#bae6fd)"
              : "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
              stroke={dragging ? "#0ea5e9" : "#94a3b8"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="text-center px-6">
          <p className="font-semibold text-sm" style={{ color: "#334155" }}>
            Arrastra tu imagen aquí o{" "}
            <span style={{ color: "#0ea5e9" }}>selecciona un archivo</span>
          </p>
          <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>
            PNG, JPG, WEBP · Máx. 6 imágenes
          </p>
        </div>

        {/* Input oculto – galería */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {/* ── Botón cámara (visible siempre, útil en móvil) ── */}
      <button
        onClick={() => cameraRef.current?.click()}
        className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-all duration-200 hover:bg-sky-50"
        style={{
          borderColor: "#e2e8f0",
          color: "#64748b",
          background: "white",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
            stroke="#0ea5e9"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="4" stroke="#0ea5e9" strokeWidth="1.8" />
        </svg>
        Tomar foto con la cámara
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </button>

      {/* ── Preview de imágenes cargadas ── */}
      {files.length > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-3">
          {files.map((file, idx) => {
            const url = URL.createObjectURL(file);
            return (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden border group"
                style={{ aspectRatio: "1/1", borderColor: "#e2e8f0" }}
              >
                <img
                  src={url}
                  alt={`imagen-${idx}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay con nombre */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs truncate"
                  style={{
                    background: "rgba(15,23,42,0.6)",
                    color: "white",
                    fontSize: "0.65rem",
                  }}
                >
                  {file.name}
                </div>
                {/* Botón eliminar */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  style={{ background: "rgba(239,68,68,0.9)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
