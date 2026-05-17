// h1-screens.jsx — Hypothesis 1: 종 기반 커뮤니티
// Screens: Onboarding species → Discover by species → Community page → Recommend users → Breed tag page

const { PHOTOS: H1_PHOTOS, SPECIES: H1_SPECIES, USERS: H1_USERS } = window.PETS_DATA;

// ─────────────────────────────────────────────────────────────────────────────
// H1.1 — 온보딩: 반려동물 종 선택 (최대 3개)
// ─────────────────────────────────────────────────────────────────────────────
function H1_SpeciesOnboarding() {
  const [picked, setPicked] = React.useState(['dog', 'cat']);
  const toggle = id => setPicked(p =>
    p.includes(id) ? p.filter(x => x !== id) : (p.length < 3 ? [...p, id] : p)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      {/* progress */}
      <div style={{ padding: '14px 20px 8px' }}>
        <div style={{ height: 4, background: 'var(--color-atomic-coolNeutral-95)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '66%', height: '100%', background: PawColors.brand }} />
        </div>
        <div style={{ font: '500 11px/1.4 var(--font-sans)', color: 'var(--label-alternative)', marginTop: 8, letterSpacing: '0.02em' }}>STEP 2 / 3</div>
      </div>

      <div style={{ padding: '12px 20px 20px', flex: 1, overflowY: 'auto' }}>
        <h1 style={{
          margin: 0,
          font: '800 24px/1.32 var(--font-sans)',
          letterSpacing: '-0.024em',
          color: 'var(--label-strong)',
        }}>어떤 친구와<br/>함께 하고 계세요?</h1>
        <p style={{
          margin: '8px 0 0',
          font: '500 14px/1.5 var(--font-sans)',
          color: 'var(--label-alternative)',
          letterSpacing: '-0.005em',
        }}>선택한 종 기반으로 피드와 추천 친구를<br/>맞춤 구성해 드려요. <b style={{color:PawColors.brand}}>최대 3개</b>까지</p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10, marginTop: 22,
        }}>
          {H1_SPECIES.map(sp => {
            const on = picked.includes(sp.id);
            return (
              <button key={sp.id} onClick={() => toggle(sp.id)} style={{
                aspectRatio: '1 / 1.05',
                background: on ? PawColors.brandSoft : 'var(--color-atomic-coolNeutral-98)',
                border: `1.5px solid ${on ? PawColors.brand : 'transparent'}`,
                borderRadius: 16,
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 4, padding: 8, position: 'relative',
                transition: 'all .12s ease-out',
              }}>
                <span style={{ font: '30px/1 -apple-system, "Segoe UI Emoji"' }}>{sp.icon}</span>
                <span style={{
                  font: `${on ? 700 : 600} 13px/1.2 var(--font-sans)`,
                  color: on ? PawColors.brandInk : 'var(--label-strong)',
                  letterSpacing: '-0.012em',
                }}>{sp.name}</span>
                <span style={{
                  font: '500 10px/1 var(--font-sans)',
                  color: on ? PawColors.brand : 'var(--label-assistive)',
                  letterSpacing: '0.02em',
                }}>{sp.count} 보호자</span>
                {on && (
                  <span style={{
                    position: 'absolute', top: 6, right: 6,
                    width: 18, height: 18, borderRadius: 999,
                    background: PawColors.brand, color: '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <PawIcon name="check" size={12} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{
          marginTop: 22, padding: '12px 14px',
          background: 'var(--color-atomic-coolNeutral-98)', borderRadius: 12,
          display: 'flex', alignItems: 'flex-start', gap: 10,
        }}>
          <span style={{ flexShrink:0, width:28, height:28, borderRadius:999, background:PawColors.brandSoft, color:PawColors.brand, display:'inline-flex', alignItems:'center', justifyContent:'center'}}>
            <PawIcon name="sparkle-fill" size={16} />
          </span>
          <p style={{ margin: 0, font: '500 12px/1.5 var(--font-sans)', color: 'var(--label-alternative)' }}>
            희귀동물 보호자라면 <b style={{color:'var(--label-strong)'}}>기타</b>를 선택해 주세요. <br/>
            구체적인 종은 다음 단계에서 등록할 수 있어요.
          </p>
        </div>
      </div>

      <div style={{ padding: '12px 20px 20px', borderTop: '1px solid var(--line-normal-neutral)', background: '#fff' }}>
        <PawButton full size="lg" disabled={picked.length === 0}>
          다음 ({picked.length}/3)
        </PawButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H1.2 — 종별 발견 피드 (Masonry + sticky species tabs)
// ─────────────────────────────────────────────────────────────────────────────
function H1_DiscoverBySpecies() {
  const [tab, setTab] = React.useState('cat');
  const [liked, setLiked] = React.useState(new Set(['p07', 'p11']));
  const toggleLike = id => setLiked(s => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });
  const items = tab === 'all' ? H1_PHOTOS : H1_PHOTOS.filter(p => p.species === tab);

  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'dog', label: '강아지', icon: '🐕' },
    { id: 'cat', label: '고양이', icon: '🐈' },
    { id: 'rab', label: '토끼',   icon: '🐇' },
    { id: 'bir', label: '앵무새', icon: '🦜' },
    { id: 'rep', label: '파충류', icon: '🦎' },
    { id: 'fis', label: '물고기', icon: '🐠' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.bg }}>
      {/* Top */}
      <PawTopBar variant="home" right={
        <>
          <PawIconBtn name="search" />
          <PawIconBtn name="bell" />
        </>
      } />
      {/* Section: 종 탭 */}
      <PawSpeciesTabs items={tabs} active={tab} onChange={setTab} />

      {/* Smart hero banner — explains the algorithmic premise */}
      <div style={{ padding: '6px 12px 0' }}>
        <div style={{
          padding: '12px 14px',
          background: 'linear-gradient(135deg, #FFE9DD 0%, #FFF5D7 100%)',
          borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ font: '24px/1 -apple-system, "Segoe UI Emoji"' }}>🐈</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '700 13px/1.3 var(--font-sans)', color: '#7A2B0F', letterSpacing: '-0.012em' }}>지원님은 고양이 보호자!</div>
            <div style={{ font: '500 11px/1.35 var(--font-sans)', color: '#7A2B0F', opacity: 0.7, marginTop: 1 }}>같은 코숏 보호자 <b>1,234명</b>의 인기 사진</div>
          </div>
          <PawIcon name="chevron-right" size={18} color="#7A2B0F" />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 8 }}>
        <PawMasonry items={items} likedSet={liked} onLike={toggleLike} gap={6} />
        <div style={{ padding: '20px 16px 32px', textAlign: 'center', font: '500 12px/1 var(--font-sans)', color: 'var(--label-assistive)' }}>
          {tab === 'cat' ? '인기 고양이 사진을 더 보려면 당겨주세요' : '여기까지 모두 봤어요'}
        </div>
      </div>

      <PawTabBar active="discover" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H1.3 — 종 커뮤니티 홈 (코리안숏헤어 친구들)
// ─────────────────────────────────────────────────────────────────────────────
function H1_CommunityHome() {
  const [joined, setJoined] = React.useState(true);
  const samplePhotos = H1_PHOTOS.filter(p => p.breed === '코리안숏헤어' || p.species === 'cat').slice(0, 8);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      {/* Header with cover */}
      <div style={{ position: 'relative', height: 168, background: '#F5C781' }}>
        <PawPhoto uid="1592194996308-7b43878e84a6" fav="#c9b08a" radius={0} style={{ aspectRatio: 'auto', height: '100%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <PawTopBar variant="transparent" onBack={() => {}} dark right={<PawIconBtn name="more-vertical" color="#fff" />} />
        </div>
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14, color: '#fff' }}>
          <div style={{ font: '500 11px/1 var(--font-sans)', letterSpacing: '0.04em', opacity: 0.85 }}>BREED · 코리안숏헤어</div>
          <div style={{ font: '800 24px/1.2 var(--font-sans)', letterSpacing: '-0.024em', marginTop: 4 }}>코숏 친구들</div>
        </div>
      </div>

      {/* Stats + join */}
      <div style={{ padding: '14px 16px 12px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid var(--line-normal-neutral)' }}>
        <div style={{ flex: 1, display: 'flex', gap: 14 }}>
          <Stat n="7,234" l="보호자" />
          <Stat n="34.2K" l="사진" />
          <Stat n="6" l="오늘" hot />
        </div>
        <PawButton size="sm" variant={joined ? 'secondary' : 'primary'} onClick={() => setJoined(!joined)}>
          {joined ? '가입됨' : '+ 가입'}
        </PawButton>
      </div>

      {/* Member avatars row */}
      <div style={{ padding: '14px 16px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', marginRight: 6 }}>
          {['이서','최가','김도','윤서','박민'].map((n, i) => (
            <div key={i} style={{ marginLeft: i ? -10 : 0 }}>
              <PawAvatar name={n} size={28} />
            </div>
          ))}
        </div>
        <span style={{ font: '500 12px/1.4 var(--font-sans)', color: 'var(--label-alternative)' }}>
          <b style={{color:'var(--label-strong)'}}>이서연</b>님 외 6명이 오늘 함께해요
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, padding: '8px 12px 0', borderBottom: '1px solid var(--line-normal-neutral)' }}>
        {['인기 사진', '최신', '질문', '보호자'].map((t, i) => {
          const on = i === 0;
          return (
            <div key={t} style={{
              padding: '10px 14px',
              font: `${on ? 700 : 500} 13px/1 var(--font-sans)`,
              color: on ? 'var(--label-strong)' : 'var(--label-alternative)',
              borderBottom: on ? `2px solid ${PawColors.labelStrong}` : '2px solid transparent',
              marginBottom: -1,
            }}>{t}</div>
          );
        })}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 8, background: PawColors.bg }}>
        <PawMasonry items={samplePhotos} gap={6} />
      </div>
    </div>
  );
}
function Stat({ n, l, hot }) {
  return (
    <div>
      <div style={{ font: '800 16px/1 var(--font-sans)', color: 'var(--label-strong)', letterSpacing: '-0.018em' }}>
        {n}
        {hot && <span style={{ color: PawColors.brand, marginLeft: 2 }}>↑</span>}
      </div>
      <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--label-alternative)', marginTop: 4 }}>{l}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H1.4 — 추천 유저 (같은 종 보호자 우선)
// ─────────────────────────────────────────────────────────────────────────────
function H1_SuggestUsers() {
  const [following, setFollowing] = React.useState(new Set(['u3']));
  const toggle = id => setFollowing(s => {
    const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n;
  });

  const buckets = [
    { id: 'same-breed', title: '같은 품종 보호자', sub: '골든리트리버 · 53명', users: H1_USERS.filter(u => u.rec === '같은 품종' || u.pets[0]==='골든리트리버').concat(H1_USERS.slice(0,2)) },
    { id: 'same-species', title: '같은 종 보호자', sub: '강아지 / 고양이', users: H1_USERS.filter(u => u.rec === '같은 종' || u.rec === '같은 종 보호자' || u.rec === '관심 품종') },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <PawTopBar variant="title" title="추천 보호자" onBack={() => {}} />

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Intro */}
        <div style={{ padding: '12px 20px 6px' }}>
          <h2 style={{ margin: 0, font: '800 18px/1.3 var(--font-sans)', letterSpacing:'-0.018em', color:'var(--label-strong)'}}>
            <span style={{color: PawColors.brand}}>몽이</span>와 잘 통할 친구들
          </h2>
          <p style={{ margin: '4px 0 0', font: '500 13px/1.5 var(--font-sans)', color: 'var(--label-alternative)'}}>
            같은 골든리트리버 보호자부터 추천해 드려요
          </p>
        </div>

        {buckets.map(b => (
          <div key={b.id} style={{ marginTop: 16 }}>
            <div style={{ padding: '10px 20px 6px', display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <h4 style={{ margin: 0, font: '700 14px/1.3 var(--font-sans)', color:'var(--label-strong)', letterSpacing:'-0.012em' }}>{b.title}</h4>
              <span style={{ font: '500 11px/1 var(--font-sans)', color:'var(--label-assistive)' }}>{b.sub}</span>
            </div>
            {b.users.map((u, idx) => (
              <UserRow key={u.id+'-'+idx} u={u} following={following.has(u.id)} onToggle={() => toggle(u.id)} />
            ))}
          </div>
        ))}

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

function UserRow({ u, following, onToggle }) {
  return (
    <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <PawAvatar name={u.real} size={44} ring={u.mutual} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ font: '700 14px/1.3 var(--font-sans)', color:'var(--label-strong)', letterSpacing:'-0.012em' }}>{u.handle}</span>
          {u.mutual && <PawChip tone="brandSoft" size="sm">맞팔</PawChip>}
        </div>
        <div style={{ font: '500 12px/1.4 var(--font-sans)', color:'var(--label-alternative)', marginTop: 2 }}>
          <span>{u.pets.join(' · ')}</span>
          <span style={{ margin: '0 4px', color:'var(--label-assistive)' }}>·</span>
          <span>팔로워 {u.followers}</span>
        </div>
      </div>
      <PawButton size="sm" variant={following ? 'secondary' : 'primary'} onClick={onToggle}>
        {following ? '팔로잉' : '팔로우'}
      </PawButton>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// H1.5 — 품종 태그 페이지 (#골든리트리버)
// ─────────────────────────────────────────────────────────────────────────────
function H1_BreedTagPage() {
  const photos = H1_PHOTOS.filter(p => p.species === 'dog');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
      <PawTopBar variant="transparent" onBack={() => {}} right={<><PawIconBtn name="share" /><PawIconBtn name="bookmark" /></>} />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero */}
        <div style={{ padding: '4px 20px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 20,
              background: 'linear-gradient(135deg, #F5C781 0%, #E0A56A 100%)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              font: '34px/1 -apple-system, "Segoe UI Emoji"',
              flexShrink: 0,
            }}>🐕</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--label-assistive)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Breed Tag</div>
              <h1 style={{ margin: '3px 0 4px', font: '800 22px/1.2 var(--font-sans)', letterSpacing: '-0.024em', color: 'var(--label-strong)' }}>
                #골든리트리버
              </h1>
              <div style={{ font: '500 12px/1.4 var(--font-sans)', color: 'var(--label-alternative)' }}>
                Golden Retriever · 대형견 · 미국·영국 원산
              </div>
            </div>
          </div>
          <div style={{
            display: 'flex', gap: 16, marginTop: 18, padding: '12px 14px',
            background: 'var(--color-atomic-coolNeutral-98)', borderRadius: 14,
          }}>
            <Stat n="218K" l="사진" />
            <div style={{ width: 1, background: 'var(--line-normal-neutral)' }} />
            <Stat n="32.4K" l="보호자" />
            <div style={{ width: 1, background: 'var(--line-normal-neutral)' }} />
            <Stat n="+12%" l="이번주" hot />
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            <PawButton variant="primary" size="md" icon="plus" full>이 품종 팔로우</PawButton>
            <PawButton variant="secondary" size="md" icon="bell">알림</PawButton>
          </div>
        </div>

        {/* 인기 보호자 (관련 종 추천) */}
        <PawSectionHeader title="이 품종 인기 보호자" action="모두 보기" />
        <div style={{ display: 'flex', gap: 12, padding: '0 16px 8px', overflowX: 'auto' }}>
          {H1_USERS.slice(0, 5).map(u => (
            <div key={u.id} style={{
              flexShrink: 0, width: 112,
              padding: '14px 10px',
              background: 'var(--color-atomic-coolNeutral-98)', borderRadius: 14,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            }}>
              <PawAvatar name={u.real} size={52} ring />
              <div style={{ font: '700 12px/1.3 var(--font-sans)', color:'var(--label-strong)', textAlign:'center' }}>{u.handle}</div>
              <div style={{ font: '500 11px/1 var(--font-sans)', color:'var(--label-assistive)' }}>팔로워 {u.followers}</div>
              <PawButton size="sm" variant="primaryDark" style={{ height: 28, padding: '0 12px', font: '700 11px/1 var(--font-sans)' }}>팔로우</PawButton>
            </div>
          ))}
        </div>

        {/* 인기 사진 */}
        <PawSectionHeader title="인기 사진" sub="이번 주 좋아요 TOP" />
        <PawMasonry items={photos} gap={6} />

        <div style={{ height: 32 }} />
      </div>
    </div>
  );
}

Object.assign(window, { H1_SpeciesOnboarding, H1_DiscoverBySpecies, H1_CommunityHome, H1_SuggestUsers, H1_BreedTagPage });
