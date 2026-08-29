/**
 * Iconos de servicios, SVG inline en capas (guia-animaciones-energia, Opcion B).
 * Lenguaje visual compartido: tubos 3D redondeados, gradiente marfil -> durazno
 * -> coral, glow coral interno, fondo transparente. viewBox 600x480 (4:3).
 *
 * Partes animables marcadas con clase (las anima services.tsx via GSAP):
 *   .ai-orbit / .ai-core / .ai-electron  — orbita atomo
 *   .arch-hub / .arch-node / .arch-link  — malla de nodos
 *   .dev-caret                           — cursor de codigo
 */

type IconProps = React.SVGProps<SVGSVGElement>;

const CORAL_GLOW = "#ff5a43";

export function DevelopmentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 600 480" fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id="dev-tube" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6df" />
          <stop offset="0.5" stopColor="#ffdcc0" />
          <stop offset="1" stopColor="#ff9c81" />
        </linearGradient>
        <filter id="dev-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>

      {/* halo tenue */}
      <g filter="url(#dev-glow)" opacity="0.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M342 118 L448 240 L342 362" stroke={CORAL_GLOW} strokeWidth="46" />
        <path d="M258 118 L152 240 L258 362" stroke={CORAL_GLOW} strokeWidth="46" />
        <path d="M322 152 L278 328" stroke={CORAL_GLOW} strokeWidth="40" />
      </g>

      {/* chevron > (derecha) */}
      <path d="M342 118 L448 240 L342 362" stroke="url(#dev-tube)" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M342 118 L448 240 L342 362" stroke="#fffbea" strokeOpacity="0.4" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" transform="translate(-3 -6)" />

      {/* chevron < (izquierda) */}
      <path d="M258 118 L152 240 L258 362" stroke="url(#dev-tube)" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M258 118 L152 240 L258 362" stroke="#fffbea" strokeOpacity="0.4" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" transform="translate(-3 -6)" />

      {/* slash central: motivo </> */}
      <path className="dev-caret" d="M322 152 L278 328" stroke="#ffd9c8" strokeWidth="30" strokeLinecap="round" />
      <path className="dev-caret" d="M322 152 L278 328" stroke="#fffbea" strokeOpacity="0.35" strokeWidth="8" strokeLinecap="round" transform="translate(-3 -6)" />
    </svg>
  );
}

export function ArchitectureIcon(props: IconProps) {
  const nodes = [
    { cx: 138, cy: 150, r: 33 },
    { cx: 476, cy: 156, r: 30 },
    { cx: 452, cy: 358, r: 27 },
    { cx: 172, cy: 360, r: 30 },
  ];
  return (
    <svg viewBox="0 0 600 480" fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id="arch-tube" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6df" />
          <stop offset="0.55" stopColor="#ffd9bd" />
          <stop offset="1" stopColor="#ff9578" />
        </linearGradient>
        <radialGradient id="arch-sphere" cx="0.36" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#fff8e6" />
          <stop offset="0.4" stopColor="#ffd8bd" />
          <stop offset="0.74" stopColor="#ff9270" />
          <stop offset="1" stopColor="#ef5744" />
        </radialGradient>
        <filter id="arch-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* enlaces hub -> nodo */}
      <g fill="none" strokeLinecap="round">
        <g stroke={CORAL_GLOW} strokeWidth="30" opacity="0.35" filter="url(#arch-glow)">
          <path d="M300 240 Q 210 168 138 150" />
          <path d="M300 240 Q 402 180 476 156" />
          <path d="M300 240 Q 404 300 452 358" />
          <path d="M300 240 Q 220 316 172 360" />
        </g>
        <g stroke="url(#arch-tube)" strokeWidth="19">
          <path className="arch-link" d="M300 240 Q 210 168 138 150" />
          <path className="arch-link" d="M300 240 Q 402 180 476 156" />
          <path className="arch-link" d="M300 240 Q 404 300 452 358" />
          <path className="arch-link" d="M300 240 Q 220 316 172 360" />
        </g>
        {/* enlaces nodo <-> nodo: integracion */}
        <g stroke="url(#arch-tube)" strokeWidth="12" opacity="0.7">
          <path d="M138 150 Q 118 262 172 360" />
          <path d="M476 156 Q 506 260 452 358" />
        </g>
      </g>

      {/* nodos exteriores */}
      {nodes.map((n, i) => (
        <g className="arch-node" key={i}>
          <circle cx={n.cx} cy={n.cy} r={n.r + 8} fill={CORAL_GLOW} opacity="0.38" filter="url(#arch-glow)" />
          <circle cx={n.cx} cy={n.cy} r={n.r} fill="url(#arch-sphere)" />
          <ellipse cx={n.cx - n.r * 0.32} cy={n.cy - n.r * 0.36} rx={n.r * 0.42} ry={n.r * 0.3} fill="#fff8e6" opacity="0.55" />
        </g>
      ))}

      {/* hub central: el punto de integracion */}
      <g className="arch-hub">
        <circle cx="300" cy="240" r="76" fill={CORAL_GLOW} opacity="0.5" filter="url(#arch-glow)" />
        <circle cx="300" cy="240" r="52" fill="url(#arch-sphere)" />
        <ellipse cx="282" cy="220" rx="22" ry="15" fill="#fff8e6" opacity="0.6" />
      </g>
    </svg>
  );
}

export function AiIcon(props: IconProps) {
  const orbits = [0, 60, 120];
  return (
    <svg viewBox="0 0 600 480" fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id="ai-tube" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6df" />
          <stop offset="0.5" stopColor="#ffdcc0" />
          <stop offset="1" stopColor="#ff9c81" />
        </linearGradient>
        <radialGradient id="ai-core" cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#fff8e6" />
          <stop offset="0.36" stopColor="#ffd6bb" />
          <stop offset="0.7" stopColor="#ff8f6d" />
          <stop offset="1" stopColor="#ec5341" />
        </radialGradient>
        <filter id="ai-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* orbitas (cada una con su electron) */}
      {orbits.map((deg) => (
        <g className="ai-orbit" key={deg} transform={`rotate(${deg} 300 240)`}>
          <ellipse cx="300" cy="240" rx="182" ry="66" stroke="url(#ai-tube)" strokeWidth="12" />
          <g className="ai-electron">
            <circle cx="482" cy="240" r="18" fill={CORAL_GLOW} opacity="0.45" filter="url(#ai-glow)" />
            <circle cx="482" cy="240" r="13" fill="url(#ai-core)" />
          </g>
        </g>
      ))}

      {/* nucleo (metaball) por encima */}
      <g className="ai-core">
        <circle cx="300" cy="240" r="66" fill={CORAL_GLOW} opacity="0.55" filter="url(#ai-glow)" />
        <circle cx="300" cy="240" r="46" fill="url(#ai-core)" />
        <circle cx="320" cy="222" r="23" fill="url(#ai-core)" />
        <ellipse cx="286" cy="223" rx="16" ry="11" fill="#fff8e6" opacity="0.6" />
      </g>
    </svg>
  );
}
