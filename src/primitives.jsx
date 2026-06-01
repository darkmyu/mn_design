// kit.jsx — Pawlog (몽냥) UI kit
// Adapted from Wanted mobile kit-shared, tuned for the pet-photo app context.

const PawColors = {
  bg:          'var(--color-bg-subtle)',
  surface:     'var(--color-bg-default)',
  line:        'var(--color-border-subtle)',
  lineSoft:    'var(--color-border-default)',
  label:       'var(--color-text-default)',
  labelStrong: 'var(--color-text-strong)',
  labelHint:   'var(--color-text-placeholder)',
  labelDis:    'var(--color-text-disabled)',
  brand:       'var(--color-brand-default)',
  brandSoft:   'var(--color-brand-subtle)',
  brandInk:    'var(--color-brand-strong)',
};

const ICON_PATH = '../assets/icons/';

function PawIcon({ name, size = 24, color, style }) {
  return (
    <span style={{
      display: 'inline-block',
      width: size, height: size,
      backgroundColor: color || 'currentColor',
      WebkitMask: `url(${ICON_PATH}${name}.svg) center / contain no-repeat`,
      mask: `url(${ICON_PATH}${name}.svg) center / contain no-repeat`,
      flexShrink: 0,
      ...style,
    }} />
  );
}

function PawButton({ variant = 'primary', size = 'md', icon, iconTrailing, full, disabled, onClick, children, style }) {
  const sizes = {
    sm: { h: 32, px: 14, font: 13, radius: 999 },
    md: { h: 44, px: 18, font: 14, radius: 12 },
    lg: { h: 52, px: 22, font: 15, radius: 14 },
  };
  const s = sizes[size];
  const variants = {
    primary:   { bg: PawColors.brand,    color: '#fff',                   border: 'none' },
    primaryDark:{bg: PawColors.labelStrong,color:'#fff',                  border: 'none' },
    secondary: { bg: PawColors.surface,  color: PawColors.label,          border: `1px solid ${PawColors.line}` },
    tertiary:  { bg: 'transparent',      color: PawColors.label,          border: 'none' },
    soft:      { bg: PawColors.brandSoft,color: PawColors.brand,          border: 'none' },
  };
  const v = variants[variant];
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        height: s.h, padding: `0 ${s.px}px`, borderRadius: s.radius,
        background: disabled ? 'var(--color-bg-subtle)' : v.bg,
        color: disabled ? PawColors.labelDis : v.color,
        border: v.border,
        font: `700 ${s.font}px/1 var(--font-sans)`,
        letterSpacing: '-0.005em',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: full ? '100%' : 'auto',
        transition: 'background-color .12s ease-out, color .12s ease-out, transform .08s',
        ...style,
      }}
    >
      {icon && <PawIcon name={icon} size={s.font + 4} />}
      {children}
      {iconTrailing && <PawIcon name={iconTrailing} size={s.font + 4} />}
    </button>
  );
}

function PawIconBtn({ name, size = 40, iconSize = 22, color, onClick, ariaLabel, style }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: size, height: size, borderRadius: 999,
        background: 'transparent', border: 'none',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: color || PawColors.label,
        cursor: 'pointer',
        ...style,
      }}
    >
      <PawIcon name={name} size={iconSize} />
    </button>
  );
}

function PawChip({ tone = 'neutral', selected, leadingDot, leadingIcon, children, onClick, size = 'md' }) {
  const sizes = { sm: { h: 24, px: 8, font: 11 }, md: { h: 28, px: 10, font: 12 }, lg: { h: 32, px: 12, font: 13 } };
  const sz = sizes[size];
  const tones = {
    neutral:  { bg: 'var(--color-bg-subtle)',  fg: PawColors.label, border: 'none' },
    outline:  { bg: PawColors.surface, fg: PawColors.label, border: `1px solid ${PawColors.line}` },
    brand:    { bg: PawColors.brand, fg: '#fff', border: 'none' },
    brandSoft:{ bg: PawColors.brandSoft, fg: PawColors.brand, border: 'none' },
    dark:     { bg: PawColors.labelStrong, fg: '#fff', border: 'none' },
    glass:    { bg: 'rgba(0,0,0,0.5)', fg: '#fff', border: 'none' },
  };
  const t = selected ? tones.dark : tones[tone];
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        height: sz.h, padding: `0 ${sz.px}px`, borderRadius: 999,
        background: t.bg, color: t.fg, border: t.border,
        font: `600 ${sz.font}px/1 var(--font-sans)`,
        cursor: onClick ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.005em',
      }}
    >
      {leadingDot && <span style={{ width: 6, height: 6, borderRadius: 50, background: 'currentColor' }} />}
      {leadingIcon && <PawIcon name={leadingIcon} size={sz.font + 2} />}
      {children}
    </span>
  );
}

function PawAvatar({ src, name = '?', size = 40, square, ring, ringColor }) {
  const init = name.trim().slice(0, 1).toUpperCase();
  const colors = ['#FF6B3D', '#00BF40', '#FF9E2C', '#6541F2', '#E846CD', '#0098B2'];
  const hue = colors[(name.charCodeAt(0) || 65) % colors.length];
  const box = (
    src ? (
      <div style={{ width: size, height: size, borderRadius: square ? 12 : 999, overflow: 'hidden', background: 'var(--color-surface-track)', flexShrink: 0 }}>
        <img src={src} width={size} height={size} style={{ display: 'block', objectFit: 'cover' }} />
      </div>
    ) : (
      <div style={{
        width: size, height: size,
        borderRadius: square ? 12 : 999,
        background: hue, color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        font: `700 ${size * 0.42}px/1 var(--font-sans)`,
        flexShrink: 0,
      }}>{init}</div>
    )
  );
  if (ring) {
    return (
      <div style={{
        padding: 2,
        borderRadius: square ? 14 : 999,
        background: ringColor || `conic-gradient(${PawColors.brand}, #FFB066, ${PawColors.brand})`,
        display: 'inline-flex',
      }}>
        <div style={{ padding: 1.5, background: PawColors.surface, borderRadius: square ? 12 : 999, display: 'inline-flex' }}>
          {box}
        </div>
      </div>
    );
  }
  return box;
}

// Pet emoji avatar — for pet profiles (no real photo, soft circle bg)
function PetGlyph({ pet, size = 44, ring }) {
  const wrap = (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: pet.color || '#FFE6CF',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
      font: `${size * 0.5}px/1 -apple-system, "Segoe UI Emoji"`,
    }}>{pet.emoji}</div>
  );
  if (!ring) return wrap;
  return (
    <div style={{
      padding: 2, borderRadius: 999,
      background: `conic-gradient(${PawColors.brand}, #FFB066, ${PawColors.brand})`,
      display: 'inline-flex',
    }}>
      <div style={{ padding: 1.5, background: PawColors.surface, borderRadius: 999, display: 'inline-flex' }}>
        {wrap}
      </div>
    </div>
  );
}

function PawDivider({ inset = 0 }) {
  return <div style={{ height: 1, background: PawColors.lineSoft, marginLeft: inset }} />;
}

// PawPhoto — renders a real pet photo from Unsplash, falls back to a colored block
function PawPhoto({ uid, w = 400, h, fav = '#e8d9c1', radius = 12, alt, style }) {
  const url = `https://images.unsplash.com/photo-${uid}?w=${w}&q=80&auto=format&fit=crop`;
  return (
    <div style={{
      width: '100%',
      aspectRatio: h ? `${w}/${h}` : undefined,
      backgroundColor: fav,
      backgroundImage: `url("${url}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: radius,
      ...style,
    }} role="img" aria-label={alt || ''} />
  );
}

if (typeof document !== 'undefined' && !document.getElementById('paw-shimmer-kf')) {
  const st = document.createElement('style');
  st.id = 'paw-shimmer-kf';
  st.textContent = `
    @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    @keyframes paw-pop { 0% { transform: scale(.7); opacity: 0; } 60% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
    @keyframes paw-heart { 0% { transform: scale(.6); opacity: 0 } 30% { opacity: 1 } 100% { transform: scale(1.8); opacity: 0 } }
    @keyframes paw-shimmer-cover { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  `;
  document.head.appendChild(st);
}

Object.assign(window, { PawColors, PawIcon, PawButton, PawIconBtn, PawChip, PawAvatar, PetGlyph, PawDivider, PawPhoto });

