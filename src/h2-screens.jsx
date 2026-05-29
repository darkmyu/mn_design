// h2-screens.jsx — Hypothesis 2: 성장 타임라인
// Screens: Pet register → Timeline view → Month detail → Then-vs-now compare → Auto-recap card

const { TIMELINE: H2_TIMELINE, MY_PETS: H2_PETS, PHOTOS: H2_PHOTOS } = window.PETS_DATA;

// ─────────────────────────────────────────────────────────────────────────────
// H2.1 — 반려동물 프로필 등록 (이름·종·품종·생일·대표사진)
// ─────────────────────────────────────────────────────────────────────────────
function H2_PetRegister() {
  const [name, setName] = React.useState('몽이');
  const [species, setSpecies] = React.useState('dog');
  const [breed, setBreed] = React.useState('골든리트리버');
  const [bday, setBday] = React.useState('2024.02.10');
  const [gender, setGender] = React.useState('m');

  const speciesOpts = [
    { id: 'dog', name: '강아지', icon: '🐕' },
    { id: 'cat', name: '고양이', icon: '🐈' },
    { id: 'rab', name: '토끼',  icon: '🐇' },
    { id: 'bir', name: '앵무새', icon: '🦜' },
    { id: 'rep', name: '파충류', icon: '🦎' },
    { id: 'etc', name: '기타',  icon: '🐾' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>
      <PawTopBar variant="title" title="반려동물 등록" onBack={() => {}} right={<PawIconBtn name="close" />} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 20px' }}>
        <p style={{ margin: '6px 0 18px', font:'500 13px/1.5 var(--font-sans)', color:'var(--color-text-subtle)' }}>
          등록하면 해당 친구의 <b style={{color:'var(--color-text-strong)'}}>전용 성장 타임라인</b>이 자동으로 시작돼요
        </p>

        {/* Photo upload */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 100, height: 100, borderRadius: 999,
              background: 'linear-gradient(135deg, #FFE6CF 0%, #F5C781 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              font: '54px/1 -apple-system, "Segoe UI Emoji"',
            }}>🐕</div>
            <button style={{
              position: 'absolute', right: -2, bottom: -2,
              width: 32, height: 32, borderRadius: 999,
              background: PawColors.brand, color: '#fff',
              border: '2px solid #fff', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255,107,61,0.3)',
            }}>
              <PawIcon name="plus" size={18} />
            </button>
          </div>
        </div>

        <Field label="이름">
          <input value={name} onChange={e => setName(e.target.value)}
            style={inputStyle()} placeholder="반려동물 이름" />
        </Field>

        <Field label="종">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {speciesOpts.map(o => {
              const on = species === o.id;
              return (
                <button key={o.id} onClick={() => setSpecies(o.id)} style={{
                  padding: '12px 0',
                  background: on ? PawColors.brandSoft : 'var(--color-bg-muted)',
                  border: `1.5px solid ${on ? PawColors.brand : 'transparent'}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}>
                  <span style={{ font: '22px/1 -apple-system, "Segoe UI Emoji"' }}>{o.icon}</span>
                  <span style={{ font: `${on ? 700 : 600} 12px/1 var(--font-sans)`, color: on ? PawColors.brandInk : 'var(--color-text-default)' }}>{o.name}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="품종" right={<span style={{ font:'500 11px/1 var(--font-sans)', color:'var(--color-text-placeholder)' }}>몰라도 OK</span>}>
          <button style={{
            ...inputStyle(), display:'flex', alignItems:'center', justifyContent:'space-between',
            background:PawColors.surface, cursor:'pointer'
          }}>
            <span style={{ color: 'var(--color-text-strong)', font: '600 14px/1 var(--font-sans)' }}>{breed}</span>
            <PawIcon name="chevron-down" size={16} color="var(--color-text-subtle)" />
          </button>
        </Field>

        <Field label="생일">
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              flex: 1,
              ...inputStyle(), display:'flex', alignItems:'center', gap:8,
              background:PawColors.surface, cursor:'pointer'
            }}>
              <PawIcon name="calendar" size={16} color="var(--color-text-subtle)" />
              <span style={{ color: 'var(--color-text-strong)', font: '600 14px/1 var(--font-sans)' }}>{bday}</span>
            </button>
            <button style={{
              padding: '0 14px', height: 48, borderRadius: 12, cursor:'pointer',
              background: 'var(--color-bg-muted)', border:'none',
              font: '600 13px/1 var(--font-sans)', color:'var(--color-text-subtle)',
            }}>입양일</button>
          </div>
        </Field>

        <Field label="성별">
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { id: 'm', label: '수컷' },
              { id: 'f', label: '암컷' },
              { id: '?', label: '비공개' },
            ].map(g => {
              const on = gender === g.id;
              return (
                <button key={g.id} onClick={() => setGender(g.id)} style={{
                  flex: 1, height: 44, borderRadius: 12,
                  background: on ? 'var(--color-text-strong)' : 'var(--color-bg-muted)',
                  color: on ? '#fff' : 'var(--color-text-default)',
                  border: 'none', cursor: 'pointer',
                  font: `${on ? 700 : 600} 13px/1 var(--font-sans)`,
                }}>{g.label}</button>
              );
            })}
          </div>
        </Field>
      </div>

      <div style={{ padding: '12px 20px 20px', borderTop: '1px solid var(--color-border-default)', background: PawColors.surface }}>
        <PawButton full size="lg">타임라인 시작하기</PawButton>
      </div>
    </div>
  );
}

function Field({ label, right, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
        <label style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>{label}</label>
        {right}
      </div>
      {children}
    </div>
  );
}
function inputStyle() {
  return {
    width: '100%', height: 48, padding: '0 14px',
    background: 'var(--color-bg-muted)',
    border: 'none', borderRadius: 12,
    font: '600 14px/1 var(--font-sans)', color: 'var(--color-text-strong)',
    outline: 'none', boxSizing: 'border-box',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// H2.2 — 펫 프로필 (성장 타임라인 메인)
// ─────────────────────────────────────────────────────────────────────────────
function H2_PetTimeline() {
  const [mode, setMode] = React.useState('timeline'); // timeline | grid
  const pet = H2_PETS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>
      <PawTopBar variant="title" title={pet.name} onBack={() => {}} right={<PawIconBtn name="more-horizontal" />} />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Pet header */}
        <div style={{ padding: '8px 20px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <PetGlyph pet={pet} size={72} ring />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h1 style={{ margin: 0, font: '800 22px/1.2 var(--font-sans)', letterSpacing: '-0.024em', color: 'var(--color-text-strong)' }}>{pet.name}</h1>
              <PawChip tone="brandSoft" size="sm">{pet.breed}</PawChip>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, font: '500 12px/1 var(--font-sans)', color: 'var(--color-text-subtle)' }}>
              <span>{pet.age}</span><span>·</span>
              <span>입양 {pet.born}</span>
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
              <span style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)' }}>251 <span style={{ font: '500 11px/1', color: 'var(--color-text-subtle)' }}>장</span></span>
              <span style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)' }}>12 <span style={{ font: '500 11px/1', color: 'var(--color-text-subtle)' }}>개월</span></span>
              <span style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)' }}>3 <span style={{ font: '500 11px/1', color: 'var(--color-text-subtle)' }}>마일스톤</span></span>
            </div>
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6 }}>
          {[{id:'timeline',l:'타임라인',i:'clock'},{id:'grid',l:'사진 격자',i:'menu'}].map(m => {
            const on = mode === m.id;
            return (
              <button key={m.id} onClick={() => setMode(m.id)} style={{
                flex: 1, height: 38, borderRadius: 10,
                background: on ? 'var(--color-text-strong)' : 'var(--color-bg-muted)',
                color: on ? '#fff' : 'var(--color-text-subtle)',
                border: 'none', cursor: 'pointer',
                font: `${on ? 700 : 600} 13px/1 var(--font-sans)`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}><PawIcon name={m.i} size={15} />{m.l}</button>
            );
          })}
        </div>

        {/* Year ribbon */}
        <div style={{ padding: '0 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', letterSpacing: '0.04em' }}>2024 — 2025</div>
            <div style={{ font: '800 20px/1.2 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.018em', marginTop: 4 }}>몽이의 첫 1년</div>
          </div>
          <PawChip tone="brandSoft" size="md" leadingIcon="sparkle-fill">자동 회고</PawChip>
        </div>

        {/* Timeline track */}
        <div style={{ padding: '14px 16px 12px' }}>
          {H2_TIMELINE.map((m, i) => (
            <TimelineRow key={m.ym} m={m} i={i} last={i === H2_TIMELINE.length - 1} />
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

function TimelineRow({ m, i, last }) {
  const milestoneColor = m.milestone ? PawColors.brand : 'var(--color-border-subtle)';
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {/* rail */}
      <div style={{ width: 32, position: 'relative', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
          width: 14, height: 14, borderRadius: 999,
          background: m.milestone ? PawColors.brand : '#fff',
          border: `2px solid ${milestoneColor}`,
          marginTop: 18, zIndex: 1,
        }} />
        {!last && <div style={{ flex: 1, width: 2, background: 'var(--color-border-default)', marginTop: -2 }} />}
      </div>
      {/* card */}
      <div style={{ flex: 1, paddingBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
          <span style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>{m.ym}</span>
          <span style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-subtle)' }}>{m.label}</span>
          {m.milestone && <PawChip tone="brand" size="sm">★ {m.milestone}</PawChip>}
        </div>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 8,
          position: 'relative',
        }}>
          <div style={{ width: 92, height: 116, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
            <PawPhoto uid={m.cover} fav="#d8c8a8" radius={0} style={{ height: '100%', aspectRatio: 'auto' }} />
          </div>
          <div style={{
            flex: 1, height: 116, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: '8px 0',
          }}>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {Array.from({ length: Math.min(4, m.count) }).map((_, k) => (
                <div key={k} style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: ['#FFE6CF','#F5C781','#FFD8B5','#FFEEDD'][k % 4],
                  backgroundImage: `url("https://images.unsplash.com/photo-${H2_PHOTOS[(i+k) % H2_PHOTOS.length].uid}?w=80&q=70&auto=format&fit=crop")`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
              ))}
            </div>
            <div style={{ font: '500 12px/1.3 var(--font-sans)', color: 'var(--color-text-subtle)' }}>
              <b style={{color:'var(--color-text-strong)'}}>{m.count}</b>장 · {m.milestone || '평범한 한 달'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H2.3 — 월별 상세 (2024.06 · 첫 바다)
// ─────────────────────────────────────────────────────────────────────────────
function H2_MonthDetail() {
  const photos = H2_PHOTOS.filter(p => p.species === 'dog').slice(0, 8).concat(H2_PHOTOS.slice(0, 4));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 240, background: '#E0A56A' }}>
        <PawPhoto uid="1543466835-00a7907e9de1" fav="#E0A56A" radius={0} style={{ aspectRatio: 'auto', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <PawTopBar variant="transparent" onBack={() => {}} dark right={<><PawIconBtn name="share" color="#fff" /><PawIconBtn name="more-vertical" color="#fff" /></>} />
        </div>
        <div style={{ position: 'absolute', left: 20, right: 20, bottom: 16, color: '#fff' }}>
          <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: '0.06em', opacity: 0.85, textTransform: 'uppercase' }}>몽이 · 4개월</div>
          <h1 style={{ margin: '6px 0 4px', font: '800 28px/1.15 var(--font-sans)', letterSpacing: '-0.024em' }}>2024년 6월</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '600 13px/1 var(--font-sans)', opacity: 0.95 }}>
            <PawChip tone="brand" size="sm">★ 첫 바다</PawChip>
            <span>32장 · 산책 12회 · 새 친구 3마리</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Story */}
        <div style={{ padding: '18px 20px 8px' }}>
          <h3 style={{ margin: 0, font: '800 17px/1.3 var(--font-sans)', letterSpacing:'-0.018em', color:'var(--color-text-strong)' }}>이번 달의 이야기</h3>
          <p style={{ margin: '8px 0 0', font: '500 14px/1.6 var(--font-sans)', color: 'var(--color-text-default)' }}>
            처음으로 바다를 만난 6월. 발끝이 모래에 닿는 순간 머뭇거리던 표정을 잊을 수 없어요.
            물이 무서워서 바위 뒤에 숨었지만, 결국엔 파도를 따라 달리기 시작했어요. <span style={{color:PawColors.brand,fontWeight:700}}>+ 더 보기</span>
          </p>
        </div>

        {/* Stat strip */}
        <div style={{ display:'flex', gap:8, padding:'12px 20px 6px' }}>
          {[
            { i: 'heart-fill',   l: '받은 좋아요', v: '1.2K' },
            { i: 'bubble-fill',  l: '댓글',        v: '84' },
            { i: 'location',     l: '장소',        v: '6곳' },
          ].map(s => (
            <div key={s.l} style={{ flex:1, padding:'12px 12px', background:'var(--color-bg-muted)', borderRadius:12 }}>
              <PawIcon name={s.i} size={16} color={PawColors.brand} />
              <div style={{ font:'800 18px/1.2 var(--font-sans)', color:'var(--color-text-strong)', marginTop:4, letterSpacing:'-0.018em' }}>{s.v}</div>
              <div style={{ font:'500 11px/1 var(--font-sans)', color:'var(--color-text-subtle)', marginTop:3 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* photos grid 3-col */}
        <PawSectionHeader title="이번 달 사진" sub="32장" action="모두 보기" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, padding: '0 3px 16px' }}>
          {photos.map((p, i) => (
            <div key={i} style={{ aspectRatio: 1, background: p.fav, position: 'relative' }}>
              <PawPhoto uid={p.uid} fav={p.fav} radius={0} style={{ aspectRatio: '1/1' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H2.4 — Then-vs-now 비교 (1년 전 오늘 vs 오늘)
// ─────────────────────────────────────────────────────────────────────────────
function H2_ThenVsNow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.brandSoft }}>
      <PawTopBar variant="title" title="성장 비교" onBack={() => {}} right={<PawIconBtn name="share" />} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 16px 20px' }}>
        <div style={{ textAlign: 'center', padding: '12px 0 18px' }}>
          <PawChip tone="brand" size="md" leadingIcon="sparkle-fill">매일 자동 생성</PawChip>
          <h1 style={{ margin: '12px 0 4px', font: '800 22px/1.2 var(--font-sans)', letterSpacing:'-0.024em', color:'var(--color-text-strong)' }}>
            몽이의 1년 전 오늘
          </h1>
          <p style={{ margin: 0, font: '500 13px/1.5 var(--font-sans)', color: 'var(--color-text-subtle)' }}>
            2025년 5월 17일 → 2026년 5월 17일
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignItems: 'stretch' }}>
          {[
            { label: '1년 전', date: '2025.05.17', sub: '4개월 · 6.4kg', uid: '1583511655826-05700d52f4d9', tone: '#FFEEDD' },
            { label: '오늘',   date: '2026.05.17', sub: '1살 4개월 · 28.2kg', uid: '1543466835-00a7907e9de1', tone: '#FFD8B5' },
          ].map((c, i) => (
            <div key={i} style={{
              background: PawColors.surface, borderRadius: 18, overflow: 'hidden',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: i === 1 ? '0 8px 24px rgba(255,107,61,0.18)' : 'none',
              transform: i === 1 ? 'translateY(-4px)' : 'none',
            }}>
              <div style={{ position: 'relative' }}>
                <PawPhoto uid={c.uid} fav={c.tone} radius={0} style={{ aspectRatio: '3/4' }} />
                <div style={{
                  position: 'absolute', top: 8, left: 8,
                  padding: '4px 10px', borderRadius: 999,
                  background: i === 1 ? PawColors.brand : 'rgba(0,0,0,0.55)',
                  color: '#fff',
                  font: '700 11px/1 var(--font-sans)', letterSpacing: '-0.005em',
                }}>{c.label}</div>
              </div>
              <div style={{ padding: '10px 12px 14px' }}>
                <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-subtle)', letterSpacing: '0.02em' }}>{c.date}</div>
                <div style={{ font: '700 14px/1.3 var(--font-sans)', color: 'var(--color-text-strong)', marginTop: 4, letterSpacing: '-0.012em' }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Growth metrics */}
        <div style={{
          marginTop: 22, padding: 18,
          background: PawColors.surface, borderRadius: 20,
          border: '1px solid var(--color-border-subtle)',
        }}>
          <h4 style={{ margin: 0, font: '800 15px/1.3 var(--font-sans)', color:'var(--color-text-strong)', letterSpacing:'-0.012em' }}>그동안의 변화</h4>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { l: '체중',         f: '6.4 kg',    t: '28.2 kg',   d: '+340%' },
              { l: '키 (어깨)',    f: '32 cm',     t: '58 cm',     d: '+81%' },
              { l: '함께한 산책',  f: '—',         t: '184회',     d: 'NEW' },
              { l: '받은 좋아요',  f: '—',         t: '12.4K',     d: 'NEW' },
            ].map(r => (
              <div key={r.l} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr auto', gap: 8, alignItems: 'center' }}>
                <div style={{ font: '600 12px/1 var(--font-sans)', color: 'var(--color-text-subtle)' }}>{r.l}</div>
                <div style={{ font: '500 13px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', textDecoration: 'line-through' }}>{r.f}</div>
                <div style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)' }}>{r.t}</div>
                <div style={{
                  font: '700 11px/1 var(--font-sans)',
                  color: PawColors.brand,
                  background: PawColors.brandSoft,
                  padding: '4px 8px', borderRadius: 999,
                }}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          <PawButton full size="md" variant="primary" icon="share">SNS에 공유</PawButton>
          <PawButton size="md" variant="secondary" icon="download">저장</PawButton>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H2.5 — AI 자동 회고 카드 ("몽이의 첫 여름")
// ─────────────────────────────────────────────────────────────────────────────
function H2_AutoRecap() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%',
      background: 'linear-gradient(180deg, #2A1810 0%, #5A2B14 100%)',
      color: '#fff',
    }}>
      <PawTopBar variant="transparent" onBack={() => {}} dark right={<PawIconBtn name="close" color="#fff" />} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 20px' }}>
        {/* AI badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)',
            font: '600 11px/1 var(--font-sans)', letterSpacing: '0.04em',
          }}>
            <PawIcon name="sparkle-fill" size={12} color="#FFB066" />
            AI 자동 생성 · 매주 일요일
          </div>
        </div>

        <h1 style={{
          margin: '14px 0 6px', textAlign: 'center',
          font: '800 28px/1.2 var(--font-sans)', letterSpacing: '-0.028em',
        }}>몽이의 첫 여름</h1>
        <p style={{
          margin: 0, textAlign: 'center', opacity: 0.7,
          font: '500 13px/1.5 var(--font-sans)',
        }}>2025.06 — 2025.08 · 78장의 기록</p>

        {/* Recap stack */}
        <div style={{ position: 'relative', height: 360, marginTop: 28 }}>
          {[
            { uid: '1543466835-00a7907e9de1', rot: -6, dx: -34, dy: 36, z: 1 },
            { uid: '1450778869180-41d0601e046e', rot: 4, dx: 14, dy: 18, z: 2 },
            { uid: '1517849845537-4d257902454a', rot: -2, dx: 0, dy: 0, z: 3 },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: c.dy, left: '50%', marginLeft: -110 + c.dx,
              width: 220, padding: 10,
              background: PawColors.surface,
              borderRadius: 14,
              transform: `rotate(${c.rot}deg)`,
              boxShadow: '0 16px 40px rgba(0,0,0,0.45), 0 6px 14px rgba(0,0,0,0.25)',
              zIndex: c.z,
            }}>
              <PawPhoto uid={c.uid} fav="#f0c894" radius={6} style={{ aspectRatio: '3/4' }} />
              {c.z === 3 && (
                <div style={{ padding: '8px 4px 2px', textAlign: 'center' }}>
                  <div style={{
                    font: '600 11px/1 var(--font-sans)',
                    color: '#5A2B14',
                    letterSpacing: '0.02em',
                  }}>2025년 7월 12일</div>
                  <div style={{
                    font: '800 14px/1.3 var(--font-sans)',
                    color: '#2A1810', marginTop: 4,
                    letterSpacing: '-0.012em',
                  }}>첫 바다</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats line */}
        <div style={{
          marginTop: 28,
          padding: '14px 18px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 18,
          display: 'flex', justifyContent: 'space-around', textAlign: 'center',
        }}>
          {[
            { v: '78', l: '사진' },
            { v: '3', l: '마일스톤' },
            { v: '12', l: '장소' },
            { v: '2.1K', l: '받은 ♥' },
          ].map(s => (
            <div key={s.l}>
              <div style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.018em' }}>{s.v}</div>
              <div style={{ font: '500 11px/1 var(--font-sans)', opacity: 0.6, marginTop: 6 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
          <PawButton full size="lg" style={{ background: PawColors.surface, color: '#2A1810' }}>
            전체 회고 보기
          </PawButton>
        </div>
        <button style={{
          width: '100%', height: 44, marginTop: 10,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: '#fff', opacity: 0.7,
          font: '600 13px/1 var(--font-sans)',
        }}>SNS 카드로 공유하기</button>
      </div>
    </div>
  );
}

Object.assign(window, { H2_PetRegister, H2_PetTimeline, H2_MonthDetail, H2_ThenVsNow, H2_AutoRecap });

