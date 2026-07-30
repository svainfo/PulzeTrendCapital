"use client";

interface LogoProps {
  /** Height in px — width scales proportionally */
  height?: number;
  className?: string;
}

/**
 * PulzeTrend Capital — Official SVG Logo
 * ✅ Transparent background — works perfectly on dark navbars
 * ✅ Matches the brand: white P + gold arrow + Pulze/Trend/CAPITAL wordmark
 * ✅ Crisp at all sizes — pure vector, no raster artifacts
 */
export default function Logo({ height = 52, className = "" }: LogoProps) {
  // ViewBox is 280 × 72 (3.89 : 1 ratio)
  const width = Math.round(height * (280 / 72));

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PulzeTrend Capital"
      role="img"
      className={className}
    >
      {/*
        ════════════════════════════════════════
        P  L E T T E R M A R K
        White bold "P" with rectangular bowl cutout.
        fill-rule="evenodd" punches the inner rect
        as a transparent window through the letter.
        ════════════════════════════════════════
      */}
      <path
        fillRule="evenodd"
        fill="white"
        d={`
          M 8 2
          L 8 66
          L 22 66
          L 22 42
          L 44 42
          Q 62 42 62 22
          Q 62 2 44 2
          Z
          M 22 14
          L 42 14
          Q 50 14 50 22
          Q 50 30 42 30
          L 22 30
          Z
        `}
      />

      {/*
        Small navy → white triangle notch at bottom of bowl
        (where the arrow passes through the P — signature brand detail)
      */}
      <polygon points="22,38 30,30 22,30" fill="rgba(255,255,255,0.15)" />

      {/*
        ════════════════════════════════════════
        G O L D   T R E N D   A R R O W
        Sweeps from lower-left through the P gap,
        curves upward and exits top-right with arrowhead.
        ════════════════════════════════════════
      */}
      {/* Curved sweep line */}
      <path
        d="M 4 70 C 16 54 28 36 46 16"
        stroke="#D4AF37"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Straight shaft to arrowhead */}
      <path
        d="M 46 16 L 60 3"
        stroke="#D4AF37"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Solid arrowhead triangle */}
      <polygon
        points="60,3  48,9  54,18"
        fill="#D4AF37"
      />

      {/*
        ════════════════════════════════════════
        W O R D M A R K   L I N E   1
        "Pulze" white  +  "Trend" gold
        ════════════════════════════════════════
      */}
      <text
        x="78"
        y="38"
        fontFamily="Poppins, system-ui, sans-serif"
        fontWeight="700"
        fontSize="28"
        fill="white"
        letterSpacing="-0.5"
      >
        Pulze
      </text>

      {/* Narrow gap between words */}
      <text
        x="164"
        y="38"
        fontFamily="Poppins, system-ui, sans-serif"
        fontWeight="700"
        fontSize="28"
        fill="#D4AF37"
        letterSpacing="-0.5"
      >
        Trend
      </text>

      {/*
        ════════════════════════════════════════
        W O R D M A R K   L I N E   2
        ——  CAPITAL  ——  in gold
        ════════════════════════════════════════
      */}
      {/* Left decorative dash */}
      <line
        x1="78" y1="51"
        x2="107" y2="51"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* CAPITAL */}
      <text
        x="113"
        y="58"
        fontFamily="Poppins, system-ui, sans-serif"
        fontWeight="600"
        fontSize="12"
        fill="#D4AF37"
        letterSpacing="4.5"
      >
        CAPITAL
      </text>
      {/* Right decorative dash */}
      <line
        x1="204" y1="51"
        x2="232" y2="51"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
