interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: "dark" | "light";
  className?: string;
}

// Recreacion en SVG del isologo de la Residencia La Fabiana:
// tres hojas (lima, verde teal y magenta) sobre un tallo.
export function Logo({
  size = 40,
  showText = true,
  variant = "dark",
  className = "",
}: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-carbon-900";
  const subColor = variant === "light" ? "text-white/70" : "text-carbon-400";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LeafMark size={size} />
      {showText && (
        <div className="leading-none">
          <span className={`block font-display text-lg font-700 tracking-tight ${textColor}`}>
            LA FABIANA
          </span>
          <span className={`block text-[9px] font-medium uppercase tracking-[0.18em] ${subColor}`}>
            Residencia para adultos mayores
          </span>
        </div>
      )}
    </div>
  );
}

export function LeafMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo La Fabiana"
      role="img"
    >
      {/* Hoja lima (superior) */}
      <path
        d="M32 6C20 10 16 22 20 33c10-1 18-9 18-21 0-2-2-5-6-6Z"
        fill="#8cc63f"
      />
      {/* Hoja verde teal (izquierda) */}
      <path
        d="M11 27C9 39 16 49 28 51c2-11-3-21-13-25-2-1-3 0-4 1Z"
        fill="#188066"
      />
      {/* Petalo magenta (derecha) */}
      <path
        d="M52 24c4 10-1 21-12 25-3-10 1-20 9-25 1-1 2-1 3 0Z"
        fill="#c0286a"
      />
      {/* Tallo */}
      <path
        d="M31 30c1 9 1 18 1 27"
        stroke="#166553"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
