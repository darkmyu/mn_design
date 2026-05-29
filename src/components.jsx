// components.jsx — Pawlog mobile screen primitives: TopBar, TabBar, Masonry

const PAW_STATUS_H = 0; // we'll skip a fake status bar; the artboard owns the chrome

// TopBar — paw flavor of TopNav
//   variant: 'home' | 'title' | 'detail' | 'transparent'
function PawTopBar({ variant = 'home', title, sub, onBack, right, left, dark }) {
  const wrap = {
    display: 'flex', alignItems: 'center', gap: 4,
    padding: '8px 6px',
    height: 52,
    background: variant === 'transparent' ? 'transparent' : 'var(--color-bg-default)',
    borderBottom: variant === 'transparent' ? 'none' : '1px solid var(--color-border-default)',
    color: dark ? '#fff' : 'inherit',
  };
  if (variant === 'home') {
    return (
      <div style={wrap}>
        <span style={{
          padding: '0 12px',
          font: '900 22px/1 var(--font-sans)',
          letterSpacing: '-0.03em',
          color: 'var(--color-text-strong)',
        }}>몽냥<span style={{color:'var(--color-brand-primary)',marginLeft:1}}>.</span></span>
        <div style={{ flex: 1 }} />
        {right}
      </div>
    );
  }
  if (variant === 'transparent') {
    return (
      <div style={wrap}>
        {left || (onBack && <PawIconBtn name="chevron-left" onClick={onBack} color={dark ? '#fff' : undefined} />)}
        <div style={{ flex: 1 }} />
        {right}
      </div>
    );
  }
  // title / detail
  return (
    <div style={wrap}>
      {onBack ? <PawIconBtn name="chevron-left" onClick={onBack} /> : <div style={{ width: 40 }} />}
      <div style={{ flex: 1, textAlign: 'center', overflow: 'hidden' }}>
        {title && <div style={{ font: '700 16px/1.3 var(--font-sans)', letterSpacing: '-0.012em', color: 'var(--color-text-strong)', textOverflow:'ellipsis', overflow:'hidden', whiteSpace:'nowrap' }}>{title}</div>}
        {sub && <div style={{ font: '500 11px/1.2 var(--font-sans)', color: 'var(--color-text-subtle)', marginTop: 2 }}>{sub}</div>}
      </div>
      <div style={{ minWidth: 40, display: 'flex', justifyContent: 'flex-end' }}>{right}</div>
    </div>
  );
}

// TabBar — 5 tabs: 홈 / 발견 / 업로드(center) / 알림 / 마이
function PawTabBar({ active = 'home', onChange, onUpload }) {
  const tabs = [
    { id: 'home',     icon: 'home',    iconOn: 'home-fill',    label: '홈' },
    { id: 'discover', icon: 'search',  iconOn: 'search-thick', label: '검색' },
    { id: 'upload',   icon: 'plus',    iconOn: 'plus',         label: '업로드', center: true },
    { id: 'noti',     icon: 'bubble',  iconOn: 'bubble-fill',  label: '커뮤니티' },
    { id: 'me',       icon: 'person',  iconOn: 'person-fill',  label: 'MY' },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      background: 'var(--color-bg-default)',
      borderTop: '1px solid var(--color-border-default)',
      paddingBottom: 6, paddingTop: 4,
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        if (t.center) {
          return (
            <button key={t.id} onClick={() => onUpload?.()} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: '4px 0 0',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <span style={{
                width: 44, height: 44, borderRadius: 14,
                background: PawColors.brand,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 6px 16px rgba(255,107,61,0.35)',
              }}>
                <PawIcon name="plus" size={23} />
              </span>
            </button>
          );
        }
        return (
          <button key={t.id} onClick={() => onChange?.(t.id)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            padding: '8px 0 4px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: on ? 'var(--color-text-strong)' : 'var(--color-text-subtle)',
            position: 'relative',
          }}>
            <span style={{ position: 'relative' }}>
              <PawIcon name={on ? t.iconOn : t.icon} size={21} />
              {t.badge ? (
                <span style={{
                  position: 'absolute', top: -2, right: -6,
                  minWidth: 14, height: 14, padding: '0 4px', borderRadius: 999,
                  background: PawColors.brand, color: '#fff',
                  font: '700 9px/14px var(--font-sans)', textAlign: 'center',
                }}>{t.badge}</span>
              ) : null}
            </span>
            <span style={{
              font: `${on ? 700 : 500} 10px/1 var(--font-sans)`,
              letterSpacing: '-0.005em',
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// SpeciesTabs — horizontal scroller of species filter chips
function PawSpeciesTabs({ active, onChange, items }) {
  return (
    <div style={{
      display: 'flex', gap: 6, padding: '10px 14px 12px',
      overflowX: 'auto',
      background: 'var(--color-bg-default)',
    }}>
      {items.map(t => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange?.(t.id)} style={{
            background: on ? 'var(--color-text-strong)' : 'var(--color-bg-muted)',
            color: on ? '#fff' : 'var(--color-text-subtle)',
            border: 'none',
            height: 32, padding: '0 14px', borderRadius: 999,
            font: `${on ? 700 : 600} 13px/1 var(--font-sans)`,
            letterSpacing: '-0.005em',
            cursor: 'pointer', whiteSpace: 'nowrap',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            {t.icon && <span style={{ fontSize: 14, lineHeight: 1 }}>{t.icon}</span>}
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

// Masonry — two-column Pinterest-style grid
function PawMasonry({ items, gap = 6, onTap, onLike, likedSet, bare }) {
  // distribute by running column heights
  const cols = [[], []];
  const heights = [0, 0];
  items.forEach((it, i) => {
    const target = heights[0] <= heights[1] ? 0 : 1;
    cols[target].push({ ...it, _i: i });
    heights[target] += 1 / it.ar; // h = 1/ar (relative)
  });
  return (
    <div style={{ display: 'flex', gap, padding: `0 ${gap}px ${gap}px` }}>
      {cols.map((col, ci) => (
        <div key={ci} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap }}>
          {col.map(p => (
            <PhotoTile key={p.id} p={p} onTap={onTap} onLike={onLike} liked={likedSet?.has(p.id)} bare={bare} />
          ))}
        </div>
      ))}
    </div>
  );
}

function PhotoTile({ p, onTap, onLike, liked, bare }) {
  const [burst, setBurst] = React.useState(false);
  const handleDouble = e => {
    e.stopPropagation();
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
    onLike?.(p.id);
  };
  return (
    <div
      onClick={() => onTap?.(p)}
      onDoubleClick={handleDouble}
      style={{
        position: 'relative', cursor: 'pointer',
        borderRadius: 14, overflow: 'hidden',
        background: p.fav,
      }}
    >
      <PawPhoto uid={p.uid} fav={p.fav} radius={0} style={{ aspectRatio: p.ar, borderRadius: 0 }} />
      {/* bottom gradient + meta */}
      {!bare && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          padding: '24px 8px 8px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          color: '#fff',
          font: '600 11px/1 var(--font-sans)',
          letterSpacing: '-0.005em',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <span style={{
              width: 16, height: 16, borderRadius: 999,
              background: p.fav,
              border: '1.5px solid #fff',
              display: 'inline-block',
            }} />
            {p.pet}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            <PawIcon name={liked ? 'heart-fill' : 'heart'} size={12} color={liked ? PawColors.brand : '#fff'} />
            {p.likes + (liked ? 1 : 0)}
          </span>
        </div>
      )}
      {burst && (
        <span style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          color: PawColors.brand,
          animation: 'paw-heart .7s ease-out',
        }}>
          <PawIcon name="heart-fill" size={64} />
        </span>
      )}
    </div>
  );
}

// Section header
function PawSectionHeader({ title, sub, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '14px 16px 10px', gap: 12 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          margin: 0,
          font: '800 17px/1.3 var(--font-sans)',
          letterSpacing: '-0.018em',
          color: 'var(--color-text-strong)',
        }}>{title}</h3>
        {sub && <p style={{
          margin: '2px 0 0',
          font: '500 12px/1.4 var(--font-sans)',
          color: 'var(--color-text-subtle)',
        }}>{sub}</p>}
      </div>
      {action && (
        <button onClick={onAction} style={{
          background: 'transparent', border: 'none',
          color: 'var(--color-text-subtle)',
          font: '600 12px/1 var(--font-sans)',
          display: 'inline-flex', alignItems: 'center', gap: 2, cursor: 'pointer',
        }}>{action}<PawIcon name="chevron-right" size={14} /></button>
      )}
    </div>
  );
}

Object.assign(window, { PawTopBar, PawTabBar, PawSpeciesTabs, PawMasonry, PawSectionHeader, PhotoTile });

