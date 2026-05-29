// h3-screens.jsx — Hypothesis 3: 1탭 업로드 + AI 자동 태그
// Screens: Home + FAB → Picker → AI analyzing → Confirm → Success

const { PHOTOS: H3_PHOTOS, MY_PETS: H3_PETS } = window.PETS_DATA;

// ─────────────────────────────────────────────────────────────────────────────
// H3.1 — 홈 피드 + 플로팅 업로드 FAB
// ─────────────────────────────────────────────────────────────────────────────
function H3_FeedWithFab() {
  const [liked, setLiked] = React.useState(new Set(['p03', 'p10']));
  const toggle = id => setLiked(s => { const n=new Set(s); n.has(id)?n.delete(id):n.add(id); return n; });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.bg, position: 'relative' }}>
      <PawTopBar variant="home" right={<><PawIconBtn name="search" /><PawIconBtn name="bell" /></>} />

      {/* Filter chips row */}
      <div style={{ display: 'flex', gap: 6, padding: '10px 14px', background: PawColors.surface, borderBottom:'1px solid var(--color-border-default)' }}>
        {[{l:'팔로잉',on:true},{l:'발견'},{l:'내 동네'},{l:'친구 추천'}].map(c => (
          <button key={c.l} style={{
            height: 30, padding: '0 12px', borderRadius: 999,
            background: c.on ? 'var(--color-text-strong)' : 'var(--color-bg-muted)',
            color: c.on ? '#fff' : 'var(--color-text-subtle)',
            border: 'none', cursor: 'pointer',
            font: `${c.on ? 700 : 600} 12px/1 var(--font-sans)`,
          }}>{c.l}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Stories row */}
        <div style={{ display: 'flex', gap: 12, padding: '12px 14px 8px', overflowX: 'auto', background: PawColors.surface }}>
          <StoryCircle name="몽이" active emoji="🐕" color="#FFE6CF" you />
          {[
            { name: '치즈',  emoji: '🐈', color: '#FFE6BD' },
            { name: '단풍',  emoji: '🐕', color: '#FFD4B0' },
            { name: '모카',  emoji: '🦎', color: '#E8E4D0' },
            { name: '구름',  emoji: '🐈', color: '#DDE2E8' },
            { name: '뽀삐',  emoji: '🐕', color: '#FFEEDD' },
            { name: '당근',  emoji: '🐇', color: '#F8DEC0' },
          ].map(s => <StoryCircle key={s.name} {...s} />)}
        </div>

        <PawMasonry items={H3_PHOTOS} likedSet={liked} onLike={toggle} gap={6} />
      </div>

      {/* FAB shown for prototype emphasis (alternative entry alongside tab-bar +) */}
      <div style={{ position: 'absolute', right: 16, bottom: 76, zIndex: 5 }}>
        <button style={{
          width: 56, height: 56, borderRadius: 999,
          background: PawColors.brand, color: '#fff',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(255,107,61,0.45), 0 0 0 3px rgba(255,107,61,0.15)',
        }}>
          <PawIcon name="plus" size={28} />
        </button>
        <div style={{
          position: 'absolute', top: -32, right: 4,
          padding: '5px 10px', borderRadius: 12,
          background: PawColors.labelStrong, color: '#fff',
          font: '700 11px/1 var(--font-sans)', whiteSpace: 'nowrap',
          letterSpacing: '-0.005em',
        }}>1탭 업로드</div>
      </div>

      <PawTabBar active="home" />
    </div>
  );
}
function StoryCircle({ name, emoji, color, active, you }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0 }}>
      <div style={{
        padding: 2.5, borderRadius: 999,
        background: active
          ? `conic-gradient(${PawColors.brand}, #FFB066, ${PawColors.brand})`
          : 'transparent',
      }}>
        <div style={{
          padding: 1.5, background: PawColors.surface, borderRadius: 999,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 999,
            background: color,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            font: '30px/1 -apple-system, "Segoe UI Emoji"',
            position: 'relative',
          }}>
            {emoji}
            {you && (
              <span style={{
                position: 'absolute', right: -2, bottom: -2,
                width: 22, height: 22, borderRadius: 999,
                background: PawColors.brand, color: '#fff',
                border: '2px solid #fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PawIcon name="plus" size={12} />
              </span>
            )}
          </div>
        </div>
      </div>
      <span style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-subtle)' }}>{name}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H3.2 — 사진 선택기 (멀티 셀렉트)
// ─────────────────────────────────────────────────────────────────────────────
function H3_PhotoPicker() {
  const all = H3_PHOTOS.slice(0, 12);
  const [selected, setSelected] = React.useState(['p10', 'p15', 'p03']);
  const toggle = id => setSelected(s =>
    s.includes(id) ? s.filter(x => x !== id) : (s.length < 10 ? [...s, id] : s)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#000', color: '#fff' }}>
      <PawTopBar variant="transparent" onBack={() => {}} dark right={
        <PawButton size="sm" disabled={selected.length === 0}>다음 ({selected.length})</PawButton>
      } />

      {/* Source selector */}
      <div style={{ padding: '8px 16px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <button style={{
          height: 36, padding: '0 14px', borderRadius: 999,
          background: 'rgba(255,255,255,0.1)', color: '#fff',
          border: 'none', cursor: 'pointer',
          font: '700 13px/1 var(--font-sans)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>최근 항목<PawIcon name="chevron-down" size={14} /></button>
        <div style={{ flex: 1 }} />
        <PawIconBtn name="filter" color="#fff" />
      </div>

      {/* Hero preview */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ position: 'relative', aspectRatio: '1/1', margin: '0 16px', borderRadius: 18, overflow: 'hidden', background: '#222' }}>
          <PawPhoto uid="1601758228041-f3b2795255f1" fav="#222" radius={0} style={{ aspectRatio: '1/1' }} />
          {/* multi-select badge */}
          <div style={{
            position: 'absolute', top: 12, right: 12,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 10px', borderRadius: 999,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)',
            color: '#fff', font: '700 12px/1 var(--font-sans)',
          }}>
            <PawIcon name="plus" size={14} />
            {selected.length}장 선택됨
          </div>
        </div>

        {/* Selected strip */}
        {selected.length > 0 && (
          <div style={{ display: 'flex', gap: 6, padding: '12px 16px 4px', overflowX: 'auto' }}>
            {selected.map((id, i) => {
              const p = H3_PHOTOS.find(x => x.id === id);
              return (
                <div key={id} style={{
                  flexShrink: 0, width: 56, height: 56, borderRadius: 10, overflow: 'hidden', position: 'relative',
                  border: '2px solid #fff',
                }}>
                  <PawPhoto uid={p.uid} fav={p.fav} radius={0} style={{ aspectRatio: '1/1' }} />
                  <span style={{
                    position: 'absolute', top: 2, left: 2,
                    width: 18, height: 18, borderRadius: 999,
                    background: PawColors.brand, color: '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    font: '700 10px/1 var(--font-sans)',
                  }}>{i + 1}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, padding: '12px 0 0', background: '#000' }}>
          {all.map(p => {
            const idx = selected.indexOf(p.id);
            const on = idx >= 0;
            return (
              <button key={p.id} onClick={() => toggle(p.id)} style={{
                aspectRatio: '1/1', position: 'relative', cursor: 'pointer',
                border: 'none', padding: 0, background: '#222',
              }}>
                <PawPhoto uid={p.uid} fav={p.fav} radius={0} style={{ aspectRatio: '1/1' }} />
                <span style={{
                  position: 'absolute', top: 6, right: 6,
                  width: 24, height: 24, borderRadius: 999,
                  background: on ? PawColors.brand : 'rgba(0,0,0,0.4)',
                  border: `1.5px solid ${on ? PawColors.brand : '#fff'}`,
                  color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  font: '700 12px/1 var(--font-sans)',
                }}>{on ? idx + 1 : ''}</span>
              </button>
            );
          })}
        </div>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H3.3 — AI 분석 중 화면
// ─────────────────────────────────────────────────────────────────────────────
function H3_AiAnalyzing() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>
      <PawTopBar variant="title" title="태그 분석" onBack={() => {}} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px' }}>
        {/* Sample photo */}
        <div style={{
          position: 'relative', borderRadius: 18, overflow: 'hidden',
          aspectRatio: '3/4', marginBottom: 16,
        }}>
          <PawPhoto uid="1601758228041-f3b2795255f1" fav="#e0b896" radius={0} style={{ aspectRatio: '3/4' }} />
          {/* Scan line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
            overflow: 'hidden', pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute', left: 0, right: 0, height: 80,
              background: 'linear-gradient(180deg, rgba(255,107,61,0) 0%, rgba(255,107,61,0.5) 60%, rgba(255,107,61,0) 100%)',
              animation: 'scanline 1.8s ease-in-out infinite',
            }} />
          </div>
          {/* Detection box */}
          <div style={{
            position: 'absolute', top: '24%', left: '18%', right: '14%', bottom: '32%',
            border: '2px solid #FF6B3D', borderRadius: 10,
          }}>
            <div style={{
              position: 'absolute', top: -28, left: -2,
              padding: '4px 10px', borderRadius: 8, background: 'var(--color-brand-primary)', color: '#fff',
              font: '700 11px/1 var(--font-sans)',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              <PawIcon name="sparkle-fill" size={11} />
              시바 · 92%
            </div>
          </div>
          {/* Brand badge */}
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)',
            color: '#fff', font: '700 12px/1 var(--font-sans)',
          }}>
            <span style={{
              width:6, height:6, borderRadius:999, background:'var(--color-brand-primary)',
              animation: 'paw-pulse 1.2s ease-in-out infinite',
            }} />
            AI 분석 중
          </div>
        </div>

        {/* Detected list */}
        <h3 style={{ margin: 0, font: '800 17px/1.3 var(--font-sans)', letterSpacing:'-0.018em', color:'var(--color-text-strong)' }}>
          이 친구를 인식했어요
        </h3>
        <p style={{ margin: '6px 0 14px', font: '500 13px/1.5 var(--font-sans)', color: 'var(--color-text-subtle)' }}>
          맞으면 자동으로 태그하고, 다르다면 수정할 수 있어요.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <DetectRow species="🐕" name="강아지" sub="Dog" pct={98} primary />
          <DetectRow species="🐕" name="시바 (Shiba)" sub="품종" pct={92} primary />
          <DetectRow species="🌳" name="공원" sub="장소" pct={71} />
          <DetectRow species="☀️" name="햇살" sub="분위기" pct={64} />
        </div>

        {/* Skeleton — more loading */}
        <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--color-bg-muted)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            width: 16, height: 16, borderRadius: 999,
            border: '2px solid var(--color-border-strong)',
            borderTopColor: PawColors.brand,
            animation: 'paw-spin 0.8s linear infinite',
          }} />
          <span style={{ font: '500 12px/1.4 var(--font-sans)', color: 'var(--color-text-subtle)' }}>
            나머지 2장 분석 중... <b style={{color:'var(--color-text-strong)'}}>약 3초</b>
          </span>
        </div>
      </div>

      <div style={{ padding: '12px 16px 18px', borderTop: '1px solid var(--color-border-default)', display: 'flex', gap: 8 }}>
        <PawButton variant="secondary" size="lg">직접 추가</PawButton>
        <PawButton variant="primary" size="lg" full iconTrailing="arrow-right">태그 확정</PawButton>
      </div>

      <style>{`
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(500%); } }
        @keyframes paw-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.6); } }
        @keyframes paw-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
function DetectRow({ species, name, sub, pct, primary }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      background: primary ? PawColors.brandSoft : 'var(--color-bg-muted)',
      borderRadius: 12,
    }}>
      <span style={{
        width: 36, height: 36, borderRadius: 12,
        background: PawColors.surface,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        font: '20px/1 -apple-system, "Segoe UI Emoji"',
      }}>{species}</span>
      <div style={{ flex: 1 }}>
        <div style={{ font: '700 14px/1.2 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>{name}</div>
        <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-subtle)', marginTop: 3 }}>{sub}</div>
      </div>
      <div style={{
        font: '700 12px/1 var(--font-sans)',
        color: primary ? PawColors.brand : 'var(--color-text-subtle)',
        padding: '5px 10px',
        background: primary ? '#fff' : 'transparent',
        borderRadius: 999,
      }}>{pct}%</div>
      <PawIcon name={primary ? 'circle-check-fill' : 'plus'} size={20} color={primary ? PawColors.brand : 'var(--color-text-subtle)'} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H3.4 — 업로드 확정 (자동 태그된 칩 + 펫 선택 + 캡션)
// ─────────────────────────────────────────────────────────────────────────────
function H3_UploadConfirm() {
  const [caption, setCaption] = React.useState('주말 한강공원 산책! 첫 잔디 데뷔 🐾');
  const [tags, setTags] = React.useState([
    { l: '시바', tone: 'brand', x: true },
    { l: '강아지', tone: 'brandSoft', x: true },
    { l: '한강공원', tone: 'neutral', x: true },
  ]);
  const [activePet, setActivePet] = React.useState('mongi');
  const [privacy, setPrivacy] = React.useState('public');
  const removeTag = i => setTags(t => t.filter((_, idx) => idx !== i));

  const pets = H3_PETS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>
      <PawTopBar variant="title" title="새 게시물" onBack={() => {}} right={
        <button style={{ font: '700 14px/1 var(--font-sans)', color: PawColors.brand, background:'transparent', border:'none', padding:'8px 12px', cursor:'pointer' }}>공유</button>
      } />

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px' }}>
        {/* Photo strip */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          {['1601758228041-f3b2795255f1','1517849845537-4d257902454a','1583511666372-62fc211f8377'].map((uid, i) => (
            <div key={i} style={{ position: 'relative', width: 92, height: 116, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <PawPhoto uid={uid} fav="#e0b896" radius={0} style={{ aspectRatio: 'auto', height: '100%' }} />
              {i === 0 && (
                <div style={{
                  position: 'absolute', top: 6, left: 6,
                  padding: '3px 6px', borderRadius: 6,
                  background: PawColors.brand, color: '#fff',
                  font: '700 9px/1 var(--font-sans)',
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                }}>
                  <PawIcon name="sparkle-fill" size={9} /> COVER
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pet picker (which pet is this?) — auto-detected highlighted */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
            <span style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>어떤 친구</span>
            <PawChip tone="brandSoft" size="sm" leadingIcon="sparkle-fill">AI 자동</PawChip>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {pets.map(p => {
              const on = activePet === p.id;
              return (
                <button key={p.id} onClick={() => setActivePet(p.id)} style={{
                  flex: 1, padding: '10px 8px',
                  background: on ? PawColors.brandSoft : 'var(--color-bg-muted)',
                  border: `1.5px solid ${on ? PawColors.brand : 'transparent'}`,
                  borderRadius: 12, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <PetGlyph pet={p} size={36} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ font: `${on ? 700 : 600} 13px/1.2 var(--font-sans)`, color: on ? PawColors.brandInk : 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>{p.name}</div>
                    <div style={{ font: '500 10px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', marginTop: 3 }}>{p.breed}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags — auto-tagged chips */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
            <span style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>태그</span>
            <PawChip tone="brandSoft" size="sm" leadingIcon="sparkle-fill">AI 자동</PawChip>
            <span style={{ flex: 1 }} />
            <button style={{ font:'600 12px/1 var(--font-sans)', color:PawColors.brand, background:'transparent', border:'none', cursor:'pointer' }}>+ 추가</button>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tags.map((t, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '0 4px 0 10px', height: 30,
                background: t.tone === 'brand' ? PawColors.brand : t.tone === 'brandSoft' ? PawColors.brandSoft : 'var(--color-bg-muted)',
                color: t.tone === 'brand' ? '#fff' : t.tone === 'brandSoft' ? PawColors.brand : 'var(--color-text-default)',
                borderRadius: 999,
                font: '700 12px/1 var(--font-sans)',
              }}>
                #{t.l}
                <button onClick={() => removeTag(i)} style={{
                  width: 18, height: 18, borderRadius: 999, border:'none', cursor:'pointer',
                  background: 'transparent', color: 'inherit', opacity: 0.7,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginLeft: 2,
                }}>
                  <PawIcon name="close" size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div style={{ marginTop: 16 }}>
          <div style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em', marginBottom: 8 }}>캡션</div>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'var(--color-bg-muted)',
              border: 'none', borderRadius: 12,
              font: '500 14px/1.5 var(--font-sans)',
              color: 'var(--color-text-strong)',
              outline: 'none', resize: 'none', boxSizing: 'border-box',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', marginTop: 4 }}>
            {caption.length} / 500
          </div>
        </div>

        {/* Privacy */}
        <div style={{ marginTop: 8 }}>
          <div style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em', marginBottom: 8 }}>공개 범위</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { id: 'public',    l: '전체',    i: 'eye' },
              { id: 'followers', l: '팔로워',  i: 'person' },
              { id: 'private',   l: '나만',    i: 'eye-slash' },
            ].map(o => {
              const on = privacy === o.id;
              return (
                <button key={o.id} onClick={() => setPrivacy(o.id)} style={{
                  flex: 1, height: 40, borderRadius: 10, cursor: 'pointer',
                  background: on ? 'var(--color-text-strong)' : 'var(--color-bg-muted)',
                  color: on ? '#fff' : 'var(--color-text-subtle)',
                  border: 'none',
                  font: `${on ? 700 : 600} 12px/1 var(--font-sans)`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                }}>
                  <PawIcon name={o.i} size={14} />
                  {o.l}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H3.5 — 업로드 완료 → 피드 반영 + 토스트
// ─────────────────────────────────────────────────────────────────────────────
function H3_UploadDone() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.bg, position: 'relative' }}>
      <PawTopBar variant="home" right={<><PawIconBtn name="search" /><PawIconBtn name="bell" /></>} />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Stories row */}
        <div style={{ display: 'flex', gap: 12, padding: '12px 14px 8px', overflowX: 'auto', background: PawColors.surface }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, flexShrink:0 }}>
            <div style={{
              padding: 2.5, borderRadius: 999,
              background: `conic-gradient(${PawColors.brand}, #FFB066, ${PawColors.brand})`,
              position: 'relative',
            }}>
              <div style={{ padding: 1.5, background: PawColors.surface, borderRadius: 999 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 999, overflow: 'hidden',
                  position: 'relative',
                }}>
                  <PawPhoto uid="1601758228041-f3b2795255f1" fav="#e0b896" radius={0} style={{ aspectRatio: '1/1' }} />
                  <span style={{
                    position: 'absolute', top: -2, right: -2,
                    width: 18, height: 18, borderRadius: 999,
                    background: PawColors.brand, color: '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #fff',
                  }}>
                    <PawIcon name="check" size={10} />
                  </span>
                </div>
              </div>
            </div>
            <span style={{ font: '700 11px/1 var(--font-sans)', color: PawColors.brand }}>방금 올림</span>
          </div>
          {[
            { name: '치즈', emoji: '🐈', color: '#FFE6BD' },
            { name: '단풍', emoji: '🐕', color: '#FFD4B0' },
            { name: '모카', emoji: '🦎', color: '#E8E4D0' },
            { name: '구름', emoji: '🐈', color: '#DDE2E8' },
            { name: '뽀삐', emoji: '🐕', color: '#FFEEDD' },
          ].map(s => <StoryCircle key={s.name} {...s} />)}
        </div>

        {/* New post card highlighted */}
        <div style={{ padding: '14px 12px 0' }}>
          <div style={{
            padding: 8, borderRadius: 18,
            background: 'linear-gradient(135deg, #FFE9DD 0%, #FFF5D7 100%)',
            border: `1.5px solid ${PawColors.brand}`,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: -10, left: 16,
              padding: '3px 10px', borderRadius: 999,
              background: PawColors.brand, color: '#fff',
              font: '700 10px/1 var(--font-sans)', letterSpacing: '0.04em',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              <PawIcon name="sparkle-fill" size={10} />
              방금 올린 게시물
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 6px 10px' }}>
              <PetGlyph pet={{emoji:'🐕',color:'#FFE6CF'}} size={32} />
              <div style={{ flex: 1 }}>
                <div style={{ font: '700 13px/1.2 var(--font-sans)', color: 'var(--color-text-strong)' }}>몽이 · 한강공원</div>
                <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-subtle)', marginTop: 3 }}>방금 · 시바 · 강아지</div>
              </div>
              <PawIcon name="more-horizontal" size={20} color="var(--color-text-subtle)" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 4, borderRadius: 12, overflow: 'hidden' }}>
              <PawPhoto uid="1601758228041-f3b2795255f1" fav="#e0b896" radius={0} style={{ aspectRatio: '1/1.1' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <PawPhoto uid="1517849845537-4d257902454a" fav="#FFE6CF" radius={0} style={{ aspectRatio: 'auto', height: '50%' }} />
                <PawPhoto uid="1583511666372-62fc211f8377" fav="#FFEEDD" radius={0} style={{ aspectRatio: 'auto', height: '50%' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 4px 6px' }}>
              <PawIcon name="heart" size={22} />
              <PawIcon name="bubble" size={22} />
              <PawIcon name="send" size={22} />
              <div style={{ flex: 1 }} />
              <PawIcon name="bookmark" size={22} />
            </div>
            <div style={{ padding: '0 6px 4px', font: '500 12px/1.4 var(--font-sans)', color: 'var(--color-text-default)' }}>
              <b style={{color:'var(--color-text-strong)'}}>몽이아빠</b> 주말 한강공원 산책! 첫 잔디 데뷔 🐾
            </div>
          </div>
        </div>

        {/* Older posts (peek) */}
        <div style={{ paddingTop: 14 }}>
          <PawMasonry items={H3_PHOTOS.slice(0, 6)} gap={6} />
        </div>
      </div>

      {/* Toast */}
      <div style={{
        position: 'absolute', left: 16, right: 16, bottom: 80,
        padding: '14px 16px',
        background: 'var(--color-text-strong)', color: '#fff',
        borderRadius: 14,
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 10px 32px rgba(0,0,0,0.25)',
        animation: 'paw-pop .35s ease-out',
      }}>
        <span style={{
          width: 28, height: 28, borderRadius: 999,
          background: '#1F8A5B', color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PawIcon name="check" size={16} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ font: '700 13px/1.2 var(--font-sans)' }}>업로드 완료 · 3장</div>
          <div style={{ font: '500 11px/1.4 var(--font-sans)', opacity: 0.75, marginTop: 2 }}>
            <b>32명</b>의 시바 보호자에게 보여졌어요
          </div>
        </div>
        <button style={{
          background:'transparent', border:'none', color:'#fff',
          font:'700 12px/1 var(--font-sans)', cursor:'pointer',
          padding:'8px 4px',
        }}>보기</button>
      </div>

      <PawTabBar active="home" />
    </div>
  );
}

Object.assign(window, { H3_FeedWithFab, H3_PhotoPicker, H3_AiAnalyzing, H3_UploadConfirm, H3_UploadDone });

