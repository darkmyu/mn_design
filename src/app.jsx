const DarkModeCtx = React.createContext({ dark: false, setDark: () => {} });
function useDarkMode() { return React.useContext(DarkModeCtx); }
function DarkModeProvider({ children }) {
  const [dark, setDark] = React.useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : '';
  }, [dark]);
  return <DarkModeCtx.Provider value={{ dark, setDark }}>{children}</DarkModeCtx.Provider>;
}

const W = 360;
const H = 760;

function Phone({ children }) {
  const { dark } = useDarkMode();
  return <div className="ph" data-theme={dark ? 'dark' : undefined}>{children}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// [있음] 온보딩 2단계 — 반려동물 정보 (이름 → 품종 → 생년월일 → 성별)
// ─────────────────────────────────────────────────────────────────────────────
const DOG_BREEDS = ['골든리트리버','래브라도 리트리버','말티즈','토이푸들','시바이누','웰시코기','비숑프리제','포메라니안','치와와','닥스훈트','보더콜리','시베리안허스키','프렌치불독','진돗개','삽살개','기타'];
const CAT_BREEDS = ['코리안숏헤어','러시안블루','페르시안','먼치킨','스코티시폴드','터키시앙고라','샴','벵갈','메인쿤','아비시니안','브리티시숏헤어','노르웨이숲','기타'];

/* 공용 껍데기 */
function PetInfoShell({ subStep, total = 5, children, onNext, canNext, nextLabel = '다음' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>
      {/* 헤더 */}
      <div style={{ padding: '14px 20px 8px' }}>
        <div style={{ height: 4, background: 'var(--color-surface-track)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '66%', height: '100%', background: PawColors.brand, borderRadius: 999 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-subtle)', letterSpacing: '0.02em' }}>STEP 2 / 3</span>
          <div style={{ display: 'flex', gap: 5 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} style={{
                width: i < subStep ? 18 : 6, height: 6, borderRadius: 999,
                background: i < subStep ? PawColors.brand : 'var(--color-border-strong)',
                transition: 'all .2s',
              }} />
            ))}
          </div>
        </div>
      </div>
      {/* 본문 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {children}
      </div>
      {/* 하단 버튼 */}
      <div style={{ padding: '12px 20px 28px', borderTop: '1px solid var(--color-border-default)', background: PawColors.surface }}>
        <PawButton full size="lg" disabled={!canNext}>{nextLabel}</PawButton>
      </div>
    </div>
  );
}

/* ── 2-1: 이름 ── */
function PetInfoStep1_Name() {
  const [petName, setPetName] = React.useState('몽이');
  return (
    <PetInfoShell subStep={1} canNext={petName.length >= 1}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px 40px' }}>
        <div style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--color-text-subtle)', marginBottom: 10 }}>반려동물 이름</div>
        <h1 style={{ margin: '0 0 32px', font: '800 24px/1.35 var(--font-sans)', letterSpacing: '-0.024em', color: 'var(--color-text-strong)' }}>
          우리 아이의 이름은 뭔가요?
        </h1>
        <div style={{ position: 'relative' }}>
          <input
            value={petName} onChange={e => setPetName(e.target.value)} maxLength={20}
            style={{
              width: '100%', height: 56, padding: '0 50px 0 18px',
              background: 'var(--color-bg-muted)',
              border: `2px solid ${petName.length >= 1 ? PawColors.brand : 'transparent'}`,
              borderRadius: 16, outline: 'none', boxSizing: 'border-box',
              font: '600 16px/1 var(--font-sans)', color: 'var(--color-text-strong)',
              transition: 'border-color .12s',
            }}
          />
          {petName.length >= 1 && (
            <span style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
              <PawIcon name="circle-check-fill" size={22} color={PawColors.brand} />
            </span>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6, font: '500 11px/1 var(--font-sans)', color: petName.length >= 1 ? PawColors.brand : 'var(--color-text-placeholder)' }}>
          {petName.length}/20
        </div>
      </div>
    </PetInfoShell>
  );
}

/* ── 2-2: 품종 ── */
function PetInfoStep2_Breed() {
  const [species, setSpecies] = React.useState('dog');
  const [breed, setBreed] = React.useState('');
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const breeds = species === 'dog' ? DOG_BREEDS : CAT_BREEDS;

  return (
    <PetInfoShell subStep={2} canNext={!!breed}>
      <div style={{ padding: '20px 24px 0', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--color-text-subtle)', marginBottom: 10 }}>품종</div>
        <h1 style={{ margin: '0 0 28px', font: '800 24px/1.35 var(--font-sans)', letterSpacing: '-0.024em', color: 'var(--color-text-strong)' }}>
          어떤 친구인가요?
        </h1>

        {/* 종 선택 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[{ id: 'dog', label: '강아지', emoji: '🐶' }, { id: 'cat', label: '고양이', emoji: '🐱' }].map(s => {
            const on = species === s.id;
            return (
              <button key={s.id} onClick={() => { setSpecies(s.id); setBreed(''); }} style={{
                padding: '20px 0', borderRadius: 18, cursor: 'pointer',
                background: on ? PawColors.brandSoft : 'var(--color-bg-muted)',
                border: `2px solid ${on ? PawColors.brand : 'transparent'}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                transition: 'all .12s',
              }}>
                <span style={{ font: '40px/1 -apple-system, "Segoe UI Emoji"' }}>{s.emoji}</span>
                <span style={{ font: `${on ? 800 : 700} 14px/1 var(--font-sans)`, color: on ? PawColors.brandInk : 'var(--color-text-strong)' }}>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* 품종 선택 버튼 */}
        <button onClick={() => setSheetOpen(true)} style={{
          width: '100%', height: 56, padding: '0 18px',
          background: breed ? PawColors.brandSoft : 'var(--color-bg-muted)',
          border: `2px solid ${breed ? PawColors.brand : 'transparent'}`,
          borderRadius: 16, cursor: 'pointer', boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all .12s',
        }}>
          <span style={{ font: `${breed ? 700 : 500} 16px/1 var(--font-sans)`, color: breed ? PawColors.brandInk : 'var(--color-text-placeholder)' }}>
            {breed || '품종을 선택해주세요'}
          </span>
          {breed
            ? <PawIcon name="circle-check-fill" size={22} color={PawColors.brand} />
            : <PawIcon name="chevron-down" size={18} color="var(--color-text-subtle)" />}
        </button>
      </div>

      {/* 품종 바텀시트 */}
      {sheetOpen && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
          <div onClick={() => setSheetOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: PawColors.surface, borderRadius: '20px 20px 0 0', maxHeight: '70%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--color-border-strong)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 12px' }}>
              <span style={{ font: '800 17px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.018em' }}>
                {species === 'dog' ? '강아지' : '고양이'} 품종 선택
              </span>
              <PawIconBtn name="close" iconSize={18} onClick={() => setSheetOpen(false)} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 20px' }}>
              {breeds.map(b => (
                <button key={b} onClick={() => { setBreed(b); setSheetOpen(false); }} style={{
                  width: '100%', padding: '14px 16px', borderRadius: 12, border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: breed === b ? PawColors.brandSoft : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  font: `${breed === b ? 700 : 500} 15px/1 var(--font-sans)`,
                  color: breed === b ? PawColors.brandInk : 'var(--color-text-default)',
                  letterSpacing: '-0.01em',
                }}>
                  {b}
                  {breed === b && <PawIcon name="check" size={18} color={PawColors.brand} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </PetInfoShell>
  );
}

/* ── 휠 피커 컬럼 (생년월일 공유) ── */
function WheelPickerCol({ items, value, onChange, suffix }) {
  const ITEM_H = 44;
  const ref = React.useRef(null);
  const { dark } = useDarkMode();
  const bg = dark ? '#1B1C1E' : '#ffffff';

  // 시트 열릴 때 현재 선택값으로 즉시 스크롤
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const idx = Math.max(0, items.indexOf(value));
    ref.current.scrollTop = idx * ITEM_H;
  }, []);

  const handleScroll = () => {
    if (!ref.current) return;
    const idx = Math.round(ref.current.scrollTop / ITEM_H);
    const next = items[Math.max(0, Math.min(items.length - 1, idx))];
    if (next !== value) onChange(next);
  };

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      {/* 위 페이드 */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: ITEM_H * 2, background: `linear-gradient(to bottom, ${bg} 30%, ${bg}00)`, pointerEvents: 'none', zIndex: 2 }} />
      {/* 아래 페이드 */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: ITEM_H * 2, background: `linear-gradient(to top, ${bg} 30%, ${bg}00)`, pointerEvents: 'none', zIndex: 2 }} />
      <div
        ref={ref}
        onScroll={handleScroll}
        style={{ height: ITEM_H * 5, overflowY: 'scroll', scrollSnapType: 'y mandatory', scrollbarWidth: 'none' }}
      >
        <div style={{ height: ITEM_H * 2 }} />
        {items.map(item => {
          const sel = item === value;
          return (
            <div key={item} style={{
              height: ITEM_H,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              scrollSnapAlign: 'center',
              font: `${sel ? 700 : 400} 18px/1 var(--font-sans)`,
              color: sel ? 'var(--color-text-strong)' : 'var(--color-text-placeholder)',
              letterSpacing: '-0.012em',
              userSelect: 'none',
            }}>
              {item}{suffix}
            </div>
          );
        })}
        <div style={{ height: ITEM_H * 2 }} />
      </div>
    </div>
  );
}

/* ── 2-3: 생년월일 ── */
function PetInfoStep3_Birth() {
  const [year, setYear]   = React.useState('');
  const [month, setMonth] = React.useState('');
  const [day, setDay]     = React.useState('');
  const [open, setOpen]   = React.useState(false);

  const YEARS  = Array.from({ length: 37 }, (_, i) => String(2026 - i));
  const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const dayCount = (year && month) ? new Date(Number(year), Number(month), 0).getDate() : 31;
  const DAYS = Array.from({ length: dayCount }, (_, i) => String(i + 1));

  const ok = !!year && !!month && !!day;

  const handleOpen = () => {
    // 처음 열 때 기본값 세팅 (스크롤 기준점)
    if (!year)  setYear('2020');
    if (!month) setMonth('1');
    if (!day)   setDay('1');
    setOpen(true);
  };

  const handleMonthChange = v => {
    setMonth(v);
    const maxDay = new Date(Number(year) || 2000, Number(v), 0).getDate();
    if (day && Number(day) > maxDay) setDay(String(maxDay));
  };

  return (
    <PetInfoShell subStep={3} canNext={ok}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px 40px' }}>
        <div style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--color-text-subtle)', marginBottom: 10 }}>생년월일</div>
        <h1 style={{ margin: '0 0 32px', font: '800 24px/1.35 var(--font-sans)', letterSpacing: '-0.024em', color: 'var(--color-text-strong)' }}>
          언제 태어났나요?
        </h1>

        {/* 날짜 선택 버튼 — 하나로 통합 */}
        <button onClick={handleOpen} style={{
          width: '100%', height: 56, padding: '0 18px',
          background: ok ? PawColors.brandSoft : 'var(--color-bg-muted)',
          border: `2px solid ${ok ? PawColors.brand : 'transparent'}`,
          borderRadius: 16, cursor: 'pointer', boxSizing: 'border-box',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'all .12s',
        }}>
          <span style={{ font: `${ok ? 700 : 500} 16px/1 var(--font-sans)`, color: ok ? PawColors.brandInk : 'var(--color-text-placeholder)' }}>
            {ok ? `${year}년 ${month}월 ${day}일` : '생년월일 선택'}
          </span>
          {ok
            ? <PawIcon name="circle-check-fill" size={22} color={PawColors.brand} />
            : <PawIcon name="chevron-down" size={18} color="var(--color-text-subtle)" />}
        </button>

        {/* 미리보기 */}
        {ok && (
          <div style={{ marginTop: 16, padding: '14px 16px', background: PawColors.brandSoft, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, font: '700 14px/1 var(--font-sans)', color: PawColors.brandInk }}>
            <span>🎂</span><span>{year}년 {month}월 {day}일</span>
          </div>
        )}
      </div>

      {/* 휠 피커 바텀시트 */}
      {open && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
          <div onClick={() => setOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: PawColors.surface, borderRadius: '20px 20px 0 0' }}>
            {/* 핸들 */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--color-border-strong)' }} />
            </div>
            {/* 헤더 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 12px' }}>
              <span style={{ font: '700 16px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.015em' }}>생년월일 선택</span>
              <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', font: '700 15px/1 var(--font-sans)', color: PawColors.brand, padding: '4px 0' }}>완료</button>
            </div>

            {/* 휠 컬럼 3개 */}
            <div style={{ position: 'relative', display: 'flex', padding: '0 20px 40px' }}>
              {/* 중앙 선택 하이라이트 */}
              <div style={{
                position: 'absolute', top: 44 * 2, left: 20, right: 20, height: 44,
                background: 'var(--color-bg-muted)', borderRadius: 12,
                pointerEvents: 'none', zIndex: 1,
              }} />
              <WheelPickerCol items={YEARS}  value={year}  onChange={setYear}         suffix="년" />
              <WheelPickerCol items={MONTHS} value={month} onChange={handleMonthChange} suffix="월" />
              <WheelPickerCol items={DAYS}   value={day}   onChange={setDay}           suffix="일" />
            </div>
          </div>
        </div>
      )}
    </PetInfoShell>
  );
}

/* ── 2-4: 성별 ── */
function PetInfoStep4_Gender() {
  const [gender, setGender] = React.useState(null);
  const options = [
    { id: 'male',   label: '남아', desc: '수컷이에요', accent: 'var(--color-gender-male)', soft: 'var(--color-gender-male-surface)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="14" r="6"/><line x1="14.9" y1="9.1" x2="21" y2="3"/><polyline points="17 3 21 3 21 7"/>
        </svg>
      )},
    { id: 'female', label: '여아', desc: '암컷이에요', accent: 'var(--color-gender-female)', soft: 'var(--color-gender-female-surface)',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6"/><line x1="12" y1="14" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/>
        </svg>
      )},
  ];
  return (
    <PetInfoShell subStep={4} canNext={!!gender}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px 40px' }}>
        <div style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--color-text-subtle)', marginBottom: 10 }}>성별</div>
        <h1 style={{ margin: '0 0 32px', font: '800 24px/1.35 var(--font-sans)', letterSpacing: '-0.024em', color: 'var(--color-text-strong)' }}>
          성별이 무엇인가요?
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {options.map(g => {
            const on = gender === g.id;
            return (
              <button key={g.id} onClick={() => setGender(g.id)} style={{
                width: '100%', padding: '18px 20px',
                borderRadius: 20, cursor: 'pointer',
                background: on ? g.soft : 'var(--color-bg-muted)',
                border: `2px solid ${on ? g.accent : 'transparent'}`,
                display: 'flex', alignItems: 'center', gap: 16,
                transition: 'all .15s', textAlign: 'left',
              }}>
                {/* 아이콘 박스 */}
                <span style={{
                  width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                  background: on ? g.accent : PawColors.surface,
                  border: `1.5px solid ${on ? 'transparent' : 'var(--color-border-default)'}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: on ? '#fff' : g.accent,
                  boxShadow: on ? `0 4px 14px ${g.accent}44` : 'none',
                  transition: 'all .15s',
                }}>{g.icon}</span>
                {/* 텍스트 */}
                <div style={{ flex: 1 }}>
                  <div style={{ font: '800 18px/1 var(--font-sans)', letterSpacing: '-0.018em', color: 'var(--color-text-strong)' }}>{g.label}</div>
                  <div style={{ font: '500 13px/1 var(--font-sans)', color: 'var(--color-text-subtle)', marginTop: 5 }}>{g.desc}</div>
                </div>
                {/* 라디오 */}
                <span style={{
                  width: 22, height: 22, borderRadius: 999, flexShrink: 0,
                  border: `2px solid ${on ? g.accent : 'var(--color-border-default)'}`,
                  background: on ? g.accent : 'transparent',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all .15s',
                }}>
                  {on && <span style={{ width: 8, height: 8, borderRadius: 999, background: PawColors.surface }} />}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </PetInfoShell>
  );
}

/* ── 2-5: 사진 업로드 + 정보 확인 (통합) ── */
function PetInfoStep5_Photo() {
  const [picked, setPicked] = React.useState(false);
  const rows = [
    { label: '이름',    value: '몽이' },
    { label: '품종',    value: '강아지 · 골든리트리버' },
    { label: '생년월일', value: '2022년 3월 15일' },
    { label: '성별',    value: '남아' },
  ];
  const EditIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-placeholder)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
  return (
    <PetInfoShell subStep={5} canNext={true} nextLabel="등록 완료">
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 32px' }}>
        <div style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--color-text-subtle)', marginBottom: 10 }}>최종 확인</div>
        <h1 style={{ margin: '0 0 24px', font: '800 24px/1.35 var(--font-sans)', letterSpacing: '-0.024em', color: 'var(--color-text-strong)' }}>
          정보를 확인해주세요
        </h1>

        {/* 프로필 카드 */}
        <div style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid var(--color-border-default)' }}>

          {/* 사진 업로드 + 이름 헤더 */}
          <div style={{ padding: '24px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, background: PawColors.brandSoft }}>
            <button onClick={() => setPicked(p => !p)} style={{
              width: 88, height: 88, borderRadius: '50%', cursor: 'pointer',
              background: picked ? PawColors.brand : '#fff',
              border: `2.5px dashed ${picked ? 'transparent' : PawColors.brand}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
              boxShadow: '0 4px 14px rgba(0,0,0,0.10)',
              transition: 'all .15s', position: 'relative',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={picked ? '#fff' : PawColors.brand} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span style={{ font: `600 10px/1 var(--font-sans)`, color: picked ? '#fff' : PawColors.brand }}>
                {picked ? '변경' : '사진 추가'}
              </span>
            </button>
            <div style={{ font: '800 18px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--color-text-strong)' }}>
              몽이
            </div>
            <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-placeholder)' }}>
              사진은 선택사항이에요
            </div>
          </div>

          {/* 정보 목록 */}
          <div style={{ background: PawColors.surface }}>
            {rows.map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', padding: '14px 20px',
                borderBottom: i < rows.length - 1 ? '1px solid var(--color-border-default)' : 'none',
              }}>
                <span style={{ width: 72, font: '500 13px/1 var(--font-sans)', color: 'var(--color-text-subtle)', flexShrink: 0 }}>
                  {row.label}
                </span>
                <span style={{ flex: 1, font: '600 15px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.01em' }}>
                  {row.value}
                </span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 2px', display: 'flex', alignItems: 'center' }}>
                  <EditIcon />
                </button>
              </div>
            ))}
          </div>
        </div>

        <p style={{ margin: '14px 0 0', font: '500 12px/1.5 var(--font-sans)', color: 'var(--color-text-placeholder)', textAlign: 'center' }}>
          등록 후에도 프로필에서 수정할 수 있어요
        </p>
      </div>
    </PetInfoShell>
  );
}

// 구버전 단일 컴포넌트 — 더 이상 사용 안 함
function OnboardingPetInfo() {
  const [species, setSpecies] = React.useState('dog');
  const [breed, setBreed] = React.useState('');
  const [petName, setPetName] = React.useState('');
  const [gender, setGender] = React.useState(null);
  const [birthYear, setBirthYear] = React.useState('');
  const [birthMonth, setBirthMonth] = React.useState('');
  const [birthDay, setBirthDay] = React.useState('');
  const [sheetOpen, setSheetOpen] = React.useState(false);

  const breeds = species === 'dog' ? DOG_BREEDS : CAT_BREEDS;
  const birthdateOk = birthYear.length === 4 && birthMonth.length >= 1 && birthDay.length >= 1;
  const canNext = breed && petName.length >= 1 && gender && birthdateOk;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface, position: 'relative' }}>

      {/* 진행 바 */}
      <div style={{ padding: '14px 20px 8px' }}>
        <div style={{ height: 4, background: 'var(--color-surface-track)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '66%', height: '100%', background: PawColors.brand, borderRadius: 999 }} />
        </div>
        <div style={{ font: '500 11px/1.4 var(--font-sans)', color: 'var(--color-text-subtle)', marginTop: 8, letterSpacing: '0.02em' }}>STEP 2 / 3</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 20px' }}>
        <h1 style={{ margin: 0, font: '800 24px/1.35 var(--font-sans)', letterSpacing: '-0.024em', color: 'var(--color-text-strong)' }}>
          반려동물을 소개해줘요
        </h1>
        <p style={{ margin: '8px 0 0', font: '500 14px/1.5 var(--font-sans)', color: 'var(--color-text-subtle)', letterSpacing: '-0.005em' }}>
          나중에 프로필에서 언제든 수정할 수 있어요
        </p>

        {/* 프로필 사진 (선택) */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 28px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 88, height: 88, borderRadius: 999,
              background: 'var(--color-surface-default)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              font: '44px/1 -apple-system, "Segoe UI Emoji"',
            }}>
              {species === 'dog' ? '🐕' : '🐈'}
            </div>
            <button style={{
              position: 'absolute', right: 0, bottom: 0,
              width: 28, height: 28, borderRadius: 999,
              background: PawColors.brand, color: '#fff',
              border: '2.5px solid #fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(255,107,61,0.35)',
            }}>
              <PawIcon name="plus" size={14} />
            </button>
            <span style={{
              position: 'absolute', top: -6, right: -6,
              font: '500 10px/1 var(--font-sans)', color: 'var(--color-text-placeholder)',
              background: 'var(--color-surface-default)', borderRadius: 999,
              padding: '3px 6px',
            }}>선택</span>
          </div>
        </div>

        {/* 동물 종 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>
            동물 종 <span style={{ color: PawColors.brand }}>*</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{ id: 'dog', label: '강아지', emoji: '🐶' }, { id: 'cat', label: '고양이', emoji: '🐱' }].map(s => {
              const on = species === s.id;
              return (
                <button key={s.id} onClick={() => { setSpecies(s.id); setBreed(''); }} style={{
                  padding: '18px 0', borderRadius: 16, cursor: 'pointer',
                  background: on ? PawColors.brandSoft : 'var(--color-bg-muted)',
                  border: `2px solid ${on ? PawColors.brand : 'transparent'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  transition: 'all .12s',
                }}>
                  <span style={{ font: '36px/1 -apple-system, "Segoe UI Emoji"' }}>{s.emoji}</span>
                  <span style={{ font: `${on ? 800 : 700} 14px/1 var(--font-sans)`, color: on ? PawColors.brandInk : 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 품종 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>
            품종 <span style={{ color: PawColors.brand }}>*</span>
          </label>
          <button onClick={() => setSheetOpen(true)} style={{
            width: '100%', height: 52, padding: '0 14px',
            background: 'var(--color-bg-muted)',
            border: `1.5px solid ${breed ? PawColors.brand : 'transparent'}`,
            borderRadius: 14, cursor: 'pointer', boxSizing: 'border-box',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            transition: 'border-color .12s',
          }}>
            <span style={{ font: `${breed ? 600 : 500} 15px/1 var(--font-sans)`, color: breed ? 'var(--color-text-strong)' : 'var(--color-text-placeholder)' }}>
              {breed || '품종을 선택해주세요'}
            </span>
            <PawIcon name="chevron-down" size={16} color="var(--color-text-subtle)" />
          </button>
        </div>

        {/* 이름 */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>
              이름 <span style={{ color: PawColors.brand }}>*</span>
            </label>
            <span style={{ font: '500 11px/1 var(--font-sans)', color: petName.length > 0 ? PawColors.brand : 'var(--color-text-placeholder)' }}>{petName.length}/20</span>
          </div>
          <input
            value={petName} onChange={e => setPetName(e.target.value)} maxLength={20}
            style={{
              width: '100%', height: 52, padding: '0 14px',
              background: 'var(--color-bg-muted)',
              border: `1.5px solid ${petName.length >= 1 ? PawColors.brand : 'transparent'}`,
              borderRadius: 14, outline: 'none', boxSizing: 'border-box',
              font: '500 15px/1 var(--font-sans)', color: 'var(--color-text-strong)',
              transition: 'border-color .12s',
            }}
          />
        </div>

        {/* 성별 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>
            성별 <span style={{ color: PawColors.brand }}>*</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[{ id: 'male', label: '남아', emoji: '♂' }, { id: 'female', label: '여아', emoji: '♀' }].map(g => {
              const on = gender === g.id;
              return (
                <button key={g.id} onClick={() => setGender(g.id)} style={{
                  height: 52, borderRadius: 14, cursor: 'pointer', border: 'none',
                  background: on ? 'var(--color-text-strong)' : 'var(--color-bg-muted)',
                  color: on ? '#fff' : 'var(--color-text-default)',
                  font: `${on ? 700 : 600} 15px/1 var(--font-sans)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  transition: 'all .12s',
                }}>
                  <span style={{ font: '16px/1 -apple-system, "Segoe UI Emoji"' }}>{g.emoji}</span>
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 생년월일 */}
        <div style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', marginBottom: 8, font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>
            생년월일 <span style={{ color: PawColors.brand }}>*</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8 }}>
            {[
              { val: birthYear, set: setBirthYear, ph: 'YYYY', max: 4 },
              { val: birthMonth, set: setBirthMonth, ph: 'MM', max: 2 },
              { val: birthDay, set: setBirthDay, ph: 'DD', max: 2 },
            ].map((f, i) => (
              <input key={i}
                value={f.val}
                onChange={e => f.set(e.target.value.replace(/\D/g, '').slice(0, f.max))}
                placeholder={f.ph}
                maxLength={f.max}
                inputMode="numeric"
                style={{
                  height: 52, padding: '0 14px', textAlign: 'center',
                  background: 'var(--color-bg-muted)',
                  border: `1.5px solid ${f.val.length === f.max ? PawColors.brand : 'transparent'}`,
                  borderRadius: 14, outline: 'none', boxSizing: 'border-box',
                  font: '600 15px/1 var(--font-sans)', color: 'var(--color-text-strong)',
                  transition: 'border-color .12s',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div style={{ padding: '12px 20px 28px', borderTop: '1px solid var(--color-border-default)', background: PawColors.surface }}>
        <PawButton full size="lg" disabled={!canNext}>몽냥 시작하기</PawButton>
      </div>

      {/* 품종 선택 바텀시트 */}
      {sheetOpen && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 20 }}>
          {/* 딤 */}
          <div onClick={() => setSheetOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          {/* 시트 */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: PawColors.surface, borderRadius: '20px 20px 0 0',
            maxHeight: '72%', display: 'flex', flexDirection: 'column',
          }}>
            {/* 핸들 */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
              <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--color-border-strong)' }} />
            </div>
            {/* 헤더 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 20px 12px' }}>
              <span style={{ font: '800 17px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.018em' }}>
                {species === 'dog' ? '강아지' : '고양이'} 품종 선택
              </span>
              <PawIconBtn name="close" iconSize={18} onClick={() => setSheetOpen(false)} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 20px' }}>
              {breeds.map(b => (
                <button key={b} onClick={() => { setBreed(b); setSheetOpen(false); }} style={{
                  width: '100%', padding: '14px 16px', borderRadius: 12,
                  background: breed === b ? PawColors.brandSoft : 'transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  font: `${breed === b ? 700 : 500} 15px/1 var(--font-sans)`,
                  color: breed === b ? PawColors.brandInk : 'var(--color-text-default)',
                  letterSpacing: '-0.01em',
                  transition: 'background .1s',
                }}>
                  {b}
                  {breed === b && <PawIcon name="check" size={18} color={PawColors.brand} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// [없음] 온보딩 2단계 — 프로필 설정 (사진 · 닉네임 · 고유명)
// ─────────────────────────────────────────────────────────────────────────────
function OnboardingNoPetProfile() {
  const [nickname, setNickname] = React.useState('');
  const [handle, setHandle] = React.useState('');
  const nicknameValid = nickname.length === 0 || /^[가-힣a-zA-Z0-9 ]+$/.test(nickname);
  const nicknameOk = nickname.length >= 2 && nicknameValid;
  const handleOk = handle.length >= 2 && /^[a-z0-9._-]+$/.test(handle);
  const canNext = nicknameOk && handleOk;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>

      {/* 진행 바 */}
      <div style={{ padding: '14px 20px 8px' }}>
        <div style={{ height: 4, background: 'var(--color-surface-track)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '66%', height: '100%', background: PawColors.brand, borderRadius: 999 }} />
        </div>
        <div style={{ font: '500 11px/1.4 var(--font-sans)', color: 'var(--color-text-subtle)', marginTop: 8, letterSpacing: '0.02em' }}>STEP 2 / 3</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 20px' }}>
        <h1 style={{
          margin: 0,
          font: '800 24px/1.35 var(--font-sans)',
          letterSpacing: '-0.024em',
          color: 'var(--color-text-strong)',
        }}>프로필을 입력해주세요</h1>
        <p style={{
          margin: '8px 0 0',
          font: '500 14px/1.5 var(--font-sans)',
          color: 'var(--color-text-subtle)',
          letterSpacing: '-0.005em',
        }}>나중에 설정에서 언제든 바꿀 수 있어요</p>

        {/* 프로필 사진 */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '28px 0 32px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 96, height: 96, borderRadius: 999,
              background: 'var(--color-surface-default)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <PawIcon name="person" size={44} color="var(--color-icon-default)" />
            </div>
            <button style={{
              position: 'absolute', right: 0, bottom: 0,
              width: 32, height: 32, borderRadius: 999,
              background: PawColors.brand, color: '#fff',
              border: '2.5px solid #fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 4px 10px rgba(255,107,61,0.35)',
            }}>
              <PawIcon name="plus" size={16} />
            </button>
          </div>
        </div>

        {/* 닉네임 */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
            <label style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>이름</label>
            <span style={{ font: '500 11px/1 var(--font-sans)', color: nicknameOk ? PawColors.brand : 'var(--color-text-placeholder)' }}>
              {nickname.length}/30
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder=""
              maxLength={30}
              style={{
                width: '100%', height: 56, padding: '0 44px 0 14px',
                background: 'var(--color-bg-muted)',
                border: `2px solid ${nicknameOk ? PawColors.brand : nickname.length > 0 && !nicknameValid ? 'var(--color-status-error)' : 'transparent'}`,
                borderRadius: 16, outline: 'none', boxSizing: 'border-box',
                font: '600 16px/1 var(--font-sans)', color: 'var(--color-text-strong)',
                transition: 'border-color .12s',
              }}
            />
            {nicknameOk && (
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>
                <PawIcon name="circle-check-fill" size={20} color={PawColors.brand} />
              </span>
            )}
          </div>
          {nickname.length > 0 && !nicknameValid && (
            <div style={{ marginTop: 5, font: '500 11px/1.4 var(--font-sans)', color: 'var(--color-status-error)' }}>
              한글, 영문, 숫자만 사용이 가능해요.
            </div>
          )}
        </div>

        {/* 고유명 (핸들) */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
            <label style={{ font: '700 13px/1 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>
              고유명
            </label>
            <span style={{ font: '500 11px/1 var(--font-sans)', color: handleOk ? PawColors.brand : 'var(--color-text-placeholder)' }}>
              {handle.length}/30
            </span>
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              font: '600 16px/1 var(--font-sans)', color: 'var(--color-text-subtle)',
              pointerEvents: 'none',
            }}>@</span>
            <input
              value={handle}
              onChange={e => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
              placeholder=""
              maxLength={30}
              style={{
                width: '100%', height: 56, padding: '0 44px 0 30px',
                background: 'var(--color-bg-muted)',
                border: `2px solid ${handleOk ? PawColors.brand : handle.length > 0 && !handleOk ? 'var(--color-status-error)' : 'transparent'}`,
                borderRadius: 16, outline: 'none', boxSizing: 'border-box',
                font: '600 16px/1 var(--font-sans)', color: 'var(--color-text-strong)',
                letterSpacing: '0.005em',
                transition: 'border-color .12s',
              }}
            />
            {handleOk && (
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>
                <PawIcon name="circle-check-fill" size={20} color={PawColors.brand} />
              </span>
            )}
          </div>
          {handle.length > 0 && !handleOk && (
            <div style={{ marginTop: 5, font: '500 11px/1.4 var(--font-sans)', color: 'var(--color-status-error)' }}>
              영문 소문자, 숫자, _(밑줄), -(하이픈), .(점)만 사용할 수 있어요
            </div>
          )}
        </div>

        {/* 미리보기 카드 */}
        <div style={{
            padding: '14px 16px', borderRadius: 16,
            background: 'var(--color-bg-muted)',
            display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid var(--color-border-default)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 999,
              background: 'var(--color-border-strong)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <PawIcon name="person" size={22} color="var(--color-icon-default)" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ font: '700 14px/1.2 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.012em' }}>
                {nickname || '몽냥'}
              </div>
              <div style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', marginTop: 3 }}>
                @{handle || 'mongnyang'}
              </div>
            </div>
            <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-placeholder)' }}>미리보기</div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div style={{ padding: '12px 20px 28px', borderTop: '1px solid var(--color-border-default)', background: PawColors.surface }}>
        <PawButton full size="lg" disabled={!canNext}>
          몽냥 시작하기
        </PawButton>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 온보딩 1단계 — 반려동물이 있나요?
// ─────────────────────────────────────────────────────────────────────────────
function OnboardingHasPet() {
  const [selected, setSelected] = React.useState(null); // 'yes' | 'no'
  const { dark } = useDarkMode();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>

      {/* 진행 바 */}
      <div style={{ padding: '14px 20px 8px' }}>
        <div style={{ height: 4, background: 'var(--color-surface-track)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '33%', height: '100%', background: PawColors.brand, borderRadius: 999 }} />
        </div>
        <div style={{ font: '500 11px/1.4 var(--font-sans)', color: 'var(--color-text-subtle)', marginTop: 8, letterSpacing: '0.02em' }}>STEP 1 / 3</div>
      </div>

      {/* 본문 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px 20px 0', overflowY: 'auto' }}>
        <h1 style={{
          margin: 0,
          font: '800 24px/1.35 var(--font-sans)',
          letterSpacing: '-0.024em',
          color: 'var(--color-text-strong)',
        }}>지금 반려동물과<br/>함께하고 계신가요?</h1>
        <p style={{
          margin: '8px 0 0',
          font: '500 14px/1.5 var(--font-sans)',
          color: 'var(--color-text-subtle)',
          letterSpacing: '-0.005em',
        }}>맞춤 피드와 추천을 위해 확인해요</p>

        {/* 선택 카드 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 28 }}>

          {/* 있어요 */}
          <button onClick={() => setSelected('yes')} style={{
            width: '100%', padding: '22px 20px',
            background: selected === 'yes' ? PawColors.brandSoft : 'var(--color-bg-muted)',
            border: `2px solid ${selected === 'yes' ? PawColors.brand : 'transparent'}`,
            borderRadius: 20, cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 16,
            transition: 'all .12s ease-out',
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 18, flexShrink: 0,
              background: selected === 'yes' ? PawColors.brand : 'var(--color-surface-track)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background .12s',
            }}>
              <span style={{ fontSize: 32, lineHeight: 1, filter: (dark || selected === 'yes') ? 'brightness(0) invert(1)' : 'none' }}>🐾</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                font: '800 17px/1.2 var(--font-sans)',
                letterSpacing: '-0.018em',
                color: selected === 'yes' ? PawColors.brandInk : 'var(--color-text-strong)',
              }}>네, 있어요!</div>
              <div style={{
                font: '500 13px/1.4 var(--font-sans)',
                color: selected === 'yes' ? PawColors.brand : 'var(--color-text-subtle)',
                marginTop: 4,
              }}>반려동물 정보를 등록하고<br/>맞춤 피드를 받아요</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: 999, flexShrink: 0,
              background: selected === 'yes' ? PawColors.brand : PawColors.surface,
              border: `2px solid ${selected === 'yes' ? PawColors.brand : 'var(--color-border-subtle)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .12s',
            }}>
              {selected === 'yes' && <PawIcon name="check" size={12} color="#fff" />}
            </div>
          </button>

          {/* 없어요 */}
          <button onClick={() => setSelected('no')} style={{
            width: '100%', padding: '22px 20px',
            background: selected === 'no' ? 'var(--color-bg-muted)' : 'var(--color-bg-muted)',
            border: `2px solid ${selected === 'no' ? 'var(--color-text-strong)' : 'transparent'}`,
            borderRadius: 20, cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 16,
            transition: 'all .12s ease-out',
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 18, flexShrink: 0,
              background: selected === 'no' ? 'var(--color-border-strong)' : 'var(--color-surface-track)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              font: '32px/1 -apple-system, "Segoe UI Emoji"',
              transition: 'background .12s',
            }}>🔍</div>
            <div style={{ flex: 1 }}>
              <div style={{
                font: '800 17px/1.2 var(--font-sans)',
                letterSpacing: '-0.018em',
                color: 'var(--color-text-strong)',
              }}>아직 없어요</div>
              <div style={{
                font: '500 13px/1.4 var(--font-sans)',
                color: 'var(--color-text-subtle)',
                marginTop: 4,
              }}>닉네임 설정 후<br/>다양한 동물 사진을 구경해요</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: 999, flexShrink: 0,
              background: selected === 'no' ? 'var(--color-text-strong)' : PawColors.surface,
              border: `2px solid ${selected === 'no' ? 'var(--color-text-strong)' : 'var(--color-border-default)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .12s',
            }}>
              {selected === 'no' && <PawIcon name="check" size={12} color={PawColors.surface} />}
            </div>
          </button>
        </div>

        {/* 나중에 등록 안내 */}
        {selected === 'no' && (
          <div style={{
            marginTop: 16, padding: '12px 14px',
            background: 'var(--color-bg-muted)', borderRadius: 12,
            display: 'flex', alignItems: 'flex-start', gap: 8,
          }}>
            <PawIcon name="circle-info-fill" size={16} color="var(--color-text-placeholder)" style={{ marginTop: 1, flexShrink: 0 }} />
            <p style={{ margin: 0, font: '500 12px/1.5 var(--font-sans)', color: 'var(--color-text-subtle)' }}>
              나중에 반려동물이 생기면 프로필에서<br/>언제든지 등록할 수 있어요
            </p>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div style={{ padding: '12px 20px 28px', borderTop: '1px solid var(--color-border-default)', background: PawColors.surface }}>
        <PawButton full size="lg" disabled={!selected}>
          {selected === 'yes' ? '반려동물 정보 입력하기' : selected === 'no' ? '프로필 정보 입력하기' : '선택해 주세요'}
        </PawButton>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// 이용약관 · 개인정보처리방침
// ─────────────────────────────────────────────────────────────────────────────
function LegalSection({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ font: '700 14px/1.3 var(--font-sans)', color: 'var(--color-text-strong)', letterSpacing: '-0.01em', marginBottom: 8 }}>{title}</div>
      <div style={{ font: '400 13px/1.7 var(--font-sans)', color: 'var(--color-text-default)', letterSpacing: '-0.005em' }}>{children}</div>
    </div>
  );
}

function TermsScreen() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>
      <PawTopBar variant="title" title="이용약관" onBack={() => {}} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 48px' }}>
        <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', marginBottom: 24 }}>
          시행일: 2025년 1월 1일 · 최종 수정: 2025년 3월 15일
        </div>

        <LegalSection title="제1조 (목적)">
          이 약관은 몽냥(이하 "회사")이 제공하는 반려동물 사진 공유 서비스 "몽냥"(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
        </LegalSection>

        <LegalSection title="제2조 (정의)">
          ① "서비스"란 회사가 제공하는 반려동물 사진 업로드, 공유, 커뮤니티 기능 일체를 의미합니다.{'\n'}
          ② "회원"이란 본 약관에 동의하고 서비스 이용 계약을 체결한 자를 말합니다.{'\n'}
          ③ "콘텐츠"란 회원이 서비스 내에 게시한 사진, 텍스트, 댓글 등 일체의 정보를 말합니다.
        </LegalSection>

        <LegalSection title="제3조 (회원가입 및 이용계약)">
          ① 이용자는 소셜 계정(카카오, 네이버, 구글, 애플)을 통해 회원가입을 신청할 수 있습니다.{'\n'}
          ② 회사는 다음 각 호에 해당하는 신청에 대하여 승낙하지 않을 수 있습니다.{'\n\n'}
          1. 타인의 명의를 도용한 경우{'\n'}
          2. 허위 정보를 기재한 경우{'\n'}
          3. 14세 미만인 경우{'\n'}
          4. 기타 이용 신청 요건을 충족하지 못한 경우
        </LegalSection>

        <LegalSection title="제4조 (서비스 이용)">
          ① 서비스 이용은 회사의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다.{'\n'}
          ② 회사는 시스템 정기점검, 증설 및 교체, 서비스 개선을 위해 사전 공지 후 서비스를 일시 중단할 수 있습니다.
        </LegalSection>

        <LegalSection title="제5조 (금지행위)">
          회원은 다음 각 호의 행위를 해서는 안 됩니다.{'\n\n'}
          1. 타인의 개인정보 수집·저장·공개하는 행위{'\n'}
          2. 동물 학대, 혐오 콘텐츠 게시{'\n'}
          3. 스팸·광고성 콘텐츠 반복 게시{'\n'}
          4. 서비스를 이용한 불법 영업 행위{'\n'}
          5. 회사의 사전 허락 없이 서비스를 크롤링·스크래핑하는 행위
        </LegalSection>

        <LegalSection title="제6조 (콘텐츠 정책)">
          ① 회원이 업로드한 콘텐츠의 저작권은 해당 회원에게 귀속됩니다.{'\n'}
          ② 회원은 서비스 내 노출 및 운영 개선을 위해 회사에 비독점적 라이선스를 허여하는 것에 동의합니다.{'\n'}
          ③ 약관 위반 콘텐츠는 사전 통보 없이 삭제될 수 있으며, 반복 위반 시 계정이 정지될 수 있습니다.
        </LegalSection>

        <LegalSection title="제7조 (면책사항)">
          ① 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력으로 인한 서비스 장애에 대해 책임을 지지 않습니다.{'\n'}
          ② 회사는 회원 간 서비스 이용으로 발생하는 분쟁에 개입하지 않으며, 이에 대한 결과를 책임지지 않습니다.
        </LegalSection>

        <LegalSection title="제8조 (준거법 및 관할법원)">
          이 약관은 대한민국 법률에 따라 규율되며, 서비스 이용과 관련한 분쟁은 서울중앙지방법원을 전속적 관할 법원으로 합니다.
        </LegalSection>
      </div>
    </div>
  );
}

function PrivacyScreen() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.surface }}>
      <PawTopBar variant="title" title="개인정보처리방침" onBack={() => {}} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 48px' }}>
        <div style={{ font: '500 11px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', marginBottom: 24 }}>
          시행일: 2025년 1월 1일 · 최종 수정: 2025년 3월 15일
        </div>

        <div style={{ padding: '14px 16px', background: PawColors.brandSoft, borderRadius: 14, marginBottom: 24, font: '500 12px/1.6 var(--font-sans)', color: PawColors.brandInk }}>
          몽냥은 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」에 따라 아래와 같이 개인정보처리방침을 수립·공개합니다.
        </div>

        <LegalSection title="1. 수집하는 개인정보 항목">
          <span style={{ fontWeight: 600 }}>필수 항목</span>{'\n'}
          · 소셜 로그인 정보(이름, 이메일, 프로필 사진, 고유 식별자){'\n'}
          · 서비스 내 닉네임, 고유명{'\n\n'}
          <span style={{ fontWeight: 600 }}>선택 항목</span>{'\n'}
          · 반려동물 정보(이름, 종, 품종, 생년월일, 성별, 사진){'\n'}
          · 프로필 사진{'\n\n'}
          <span style={{ fontWeight: 600 }}>자동 수집 항목</span>{'\n'}
          · 기기 정보(OS, 앱 버전), 접속 로그, IP 주소, 서비스 이용 기록
        </LegalSection>

        <LegalSection title="2. 개인정보 수집 및 이용 목적">
          · 회원 식별 및 서비스 제공{'\n'}
          · 콘텐츠 추천 및 피드 개인화{'\n'}
          · 서비스 품질 개선 및 통계 분석{'\n'}
          · 불법·부정 이용 방지 및 계정 보호{'\n'}
          · 공지사항·이벤트 안내(마케팅 수신 동의 시)
        </LegalSection>

        <LegalSection title="3. 개인정보 보유 및 이용 기간">
          · 회원 탈퇴 시 즉시 삭제 (단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 보관){'\n'}
          · 전자상거래 분쟁 기록: 3년{'\n'}
          · 접속 로그: 3개월{'\n'}
          · 계정 정지 처리 내역: 1년
        </LegalSection>

        <LegalSection title="4. 개인정보의 제3자 제공">
          회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.{'\n\n'}
          · 이용자가 사전에 동의한 경우{'\n'}
          · 법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차에 따른 경우
        </LegalSection>

        <LegalSection title="5. 이용자의 권리">
          이용자는 언제든지 아래 권리를 행사할 수 있습니다.{'\n\n'}
          · 개인정보 열람 요청{'\n'}
          · 오류 정정 요청{'\n'}
          · 삭제 요청 (단, 법령에 따라 보존 의무가 있는 경우 제외){'\n'}
          · 처리 정지 요청{'\n\n'}
          권리 행사는 앱 내 설정 → 계정 관리 또는 고객센터를 통해 가능합니다.
        </LegalSection>

        <LegalSection title="6. 개인정보 보호책임자">
          · 성명: 몽냥 개인정보보호팀{'\n'}
          · 이메일: privacy@mongnyang.kr{'\n'}
          · 고객센터: 앱 내 설정 → 고객센터
        </LegalSection>
      </div>
    </div>
  );
}

// 초기 진입 로그인 화면
// ─────────────────────────────────────────────────────────────────────────────
function WelcomeScreen() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: PawColors.brandSoft,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* 배경 장식 원 */}
      <div style={{
        position: 'absolute', top: -120, right: -80,
        width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,61,0.12) 0%, rgba(255,107,61,0) 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 180, left: -100,
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,176,102,0.15) 0%, rgba(255,176,102,0) 70%)',
        pointerEvents: 'none',
      }} />

      {/* 상단 타이틀 영역 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        <div style={{
          font: '900 56px/1 var(--font-sans)',
          letterSpacing: '-0.04em',
          color: 'var(--color-text-strong)',
          display: 'flex', alignItems: 'baseline', gap: 2,
        }}>
          몽냥<span style={{ color: PawColors.brand }}>.</span>
        </div>
      </div>

      {/* 하단 로그인 영역 */}
      <div style={{
        padding: '24px 24px 40px',
        background: PawColors.surface,
        borderTop: '1px solid var(--color-border-default)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <div style={{
          textAlign: 'center', marginBottom: 4,
          font: '600 13px/1 var(--font-sans)',
          color: 'var(--color-text-subtle)',
          letterSpacing: '-0.005em',
        }}>소셜 계정으로 바로 시작하기</div>

        {/* 카카오 */}
        <button style={{
          width: '100%', height: 52, borderRadius: 14, border: 'none', cursor: 'pointer',
          background: 'var(--color-social-kakao)', color: '#191600',
          font: '700 15px/1 var(--font-sans)', letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          position: 'relative',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C5.58 2 2 4.91 2 8.5c0 2.28 1.46 4.28 3.67 5.47L4.8 17.1a.3.3 0 0 0 .43.35l3.9-2.56c.28.03.57.05.87.05 4.42 0 8-2.91 8-6.5S14.42 2 10 2Z" fill="#191600"/>
          </svg>
          카카오로 시작하기
        </button>

        {/* 네이버 */}
        <button style={{
          width: '100%', height: 52, borderRadius: 14, border: 'none', cursor: 'pointer',
          background: 'var(--color-social-naver)', color: '#fff',
          font: '700 15px/1 var(--font-sans)', letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M11.4 10.38 8.26 5H5v10h3.6V9.62L11.74 15H15V5h-3.6v5.38Z" fill="white"/>
          </svg>
          네이버로 시작하기
        </button>

        {/* 구글 */}
        <button style={{
          width: '100%', height: 52, borderRadius: 14, cursor: 'pointer',
          background: 'var(--color-social-google)', color: '#3C4043',
          border: '1.5px solid var(--color-border-subtle)',
          font: '700 15px/1 var(--font-sans)', letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.79h5.4a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.74 3-4.3 3-7.31Z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 4.97-.9 6.63-2.44l-3.24-2.51c-.9.6-2.04.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H1.07v2.6A10 10 0 0 0 10 20Z" fill="#34A853"/>
            <path d="M4.41 11.89A6.02 6.02 0 0 1 4.1 10c0-.65.11-1.28.31-1.89V5.51H1.07A10 10 0 0 0 0 10c0 1.61.39 3.14 1.07 4.49l3.34-2.6Z" fill="#FBBC04"/>
            <path d="M10 3.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C14.96.9 12.7 0 10 0A10 10 0 0 0 1.07 5.51l3.34 2.6C5.2 5.74 7.4 3.98 10 3.98Z" fill="#EA4335"/>
          </svg>
          Google로 시작하기
        </button>

        {/* 애플 */}
        <button style={{
          width: '100%', height: 52, borderRadius: 14, border: 'none', cursor: 'pointer',
          background: 'var(--color-social-apple)', color: '#fff',
          font: '700 15px/1 var(--font-sans)', letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <svg width="18" height="22" viewBox="0 0 18 22" fill="white">
            <path d="M14.98 11.7c-.02-2.34 1.91-3.47 2-3.53-1.1-1.6-2.8-1.82-3.4-1.84-1.44-.15-2.82.85-3.55.85-.73 0-1.85-.83-3.05-.81C5.22 6.4 3.5 7.44 2.55 9.06c-1.92 3.32-.49 8.22 1.37 10.91.92 1.32 2 2.8 3.42 2.74 1.38-.05 1.9-.88 3.56-.88 1.66 0 2.14.88 3.6.85 1.48-.02 2.41-1.34 3.31-2.67a12.3 12.3 0 0 0 1.5-3.07c-.04-.02-2.88-1.1-2.9-4.34ZM13.47 4.3c.76-.93 1.28-2.21 1.14-3.5-1.1.05-2.44.74-3.23 1.65-.71.82-1.33 2.13-1.16 3.38 1.22.1 2.47-.62 3.25-1.53Z"/>
          </svg>
          Apple로 시작하기
        </button>

        {/* 비로그인 구경하기 */}
        <button style={{
          width: '100%', height: 48, borderRadius: 14, border: 'none', cursor: 'pointer',
          background: 'transparent', color: 'var(--color-text-subtle)',
          font: '600 14px/1 var(--font-sans)', letterSpacing: '-0.005em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          marginTop: 2,
        }}>
          로그인 없이 구경하기
          <PawIcon name="chevron-right" size={14} color="var(--color-text-subtle)" />
        </button>

        <p style={{
          margin: '2px 0 0', textAlign: 'center',
          font: '500 11px/1.5 var(--font-sans)',
          color: 'var(--color-text-placeholder)',
        }}>
          시작하면 <span style={{ textDecoration: 'underline' }}>이용약관</span> 및 <span style={{ textDecoration: 'underline' }}>개인정보처리방침</span>에 동의한 것으로 간주해요
        </p>
      </div>
    </div>
  );
}

function PhotoDetailScreen({ photo, onBack }) {
  const { USERS } = PETS_DATA;
  const p = photo || PETS_DATA.PHOTOS[0];
  const author = USERS[0];
  const { dark } = useDarkMode();

  const [liked, setLiked] = React.useState(false);
  const [following, setFollowing] = React.useState(false);
  const [kbOpen, setKbOpen] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [replyTarget, setReplyTarget] = React.useState(null);
  const [menuComment, setMenuComment] = React.useState(null);
  const [editTarget, setEditTarget] = React.useState(null);

  const KB_H = 258;
  const INPUT_H = 52;
  const REPLY_H = 36;

  const COMMENTS = [
    { id: 'c1', user: '치즈맘',    text: '너무 귀여워요 🥹',              time: '방금',   likes: 4,
      replies: [
        { id: 'r1a', user: '코기집사',  text: '저도 완전 공감 ㅠㅠ',                        time: '1분 전',  likes: 1 },
        { id: 'r1b', user: '치즈맘',   text: '@코기집사 그죠?? 진짜 찰랑찰랑 😍',          time: '2분 전',  likes: 0 },
        { id: 'r1c', user: '몽냥집사', text: '산책 같이 가요!! 🐾',                         time: '3분 전',  likes: 2 },
      ]
    },
    { id: 'c2', user: 'reptile.kr', text: '진짜 너무 예쁘다',             time: '5분 전', likes: 7,
      replies: [
        { id: 'r2a', user: '몽냥집사', text: '골든은 항상 옳아요 🐕',                       time: '6분 전',  likes: 3 },
      ]
    },
    { id: 'c3', user: '코기집사',  text: '우리 애기랑 완전 닮았다 ㅠ',    time: '10분 전', likes: 12, replies: [] },
    { id: 'cm', user: '몽이아빠', text: '다들 감사해요 🙏 이 날 진짜 날씨가 완벽했어요!', time: '12분 전', likes: 6, replies: [], mine: true },
    { id: 'c4', user: '몽냥집사',  text: '털이 왜이렇게 찰랑찰랑해요',    time: '15분 전', likes: 5,
      replies: [
        { id: 'r4a', user: '치즈맘',   text: '브러싱 자주 해줘서 그런가봐요',               time: '16분 전', likes: 1 },
        { id: 'r4b', user: '몽냥집사', text: '@치즈맘 아 그렇군요!! 저도 해봐야겠다',       time: '17분 전', likes: 0 },
      ]
    },
    { id: 'c5', user: '치즈맘',    text: '사진 찍는 실력도 대단하세요 📸', time: '22분 전', likes: 8, replies: [] },
  ];

  const totalCount = COMMENTS.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);
  const [expandedReplies, setExpandedReplies] = React.useState(new Set(['c1']));
  const toggleReplies = id => setExpandedReplies(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const KB_ROWS = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['⇧','z','x','c','v','b','n','m','⌫'],
  ];
  const kbBg  = dark ? '#1C1C1E' : '#AAB4C0';
  const keyBg = dark ? '#3D3D3F' : '#FFFFFF';
  const keyClr = dark ? '#FFFFFF' : '#000000';

  return (
    <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', background: PawColors.surface }}>

      <PawTopBar variant="title" title="" onBack={onBack || (() => {})} right={
        <PawIconBtn name="more" iconSize={22} />
      } />

      {/* ── 스크롤 영역 ── */}
      <div
        onClick={() => kbOpen && setKbOpen(false)}
        style={{ flex: 1, overflowY: 'auto', paddingBottom: kbOpen ? KB_H + INPUT_H + (replyTarget || editTarget ? REPLY_H : 0) : INPUT_H + (replyTarget || editTarget ? REPLY_H : 0) }}
      >
        {/* 사진 */}
        <PawPhoto uid={p.uid} w={600} h={Math.round(600 / p.ar)} fav={p.fav} radius={0} />

        {/* 유저 행 */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: 10, borderBottom: `1px solid ${PawColors.lineSoft}` }}>
          <PawAvatar name={author.real} size={36} ring />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '700 14px/1 var(--font-sans)', color: PawColors.labelStrong, letterSpacing: '-0.01em' }}>{author.handle}</div>
            <div style={{ font: '400 11px/1 var(--font-sans)', color: PawColors.labelHint, marginTop: 2 }}>{p.breed}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); setFollowing(f => !f); }} style={{
            height: 30, padding: '0 14px', borderRadius: 999,
            background: following ? PawColors.surface : PawColors.brand,
            color: following ? PawColors.labelStrong : '#fff',
            border: following ? `1px solid var(--color-border-default)` : 'none',
            font: '700 12px/1 var(--font-sans)', cursor: 'pointer',
          }}>{following ? '팔로잉' : '팔로우'}</button>
        </div>

        {/* 액션 바 */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', gap: 4 }}>
          <button onClick={e => { e.stopPropagation(); setLiked(l => !l); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 8px' }}>
            <PawIcon name={liked ? 'heart-fill' : 'heart'} size={24} color={liked ? PawColors.brand : PawColors.labelStrong} />
            <span style={{ font: '600 13px/1 var(--font-sans)', color: PawColors.labelStrong }}>{p.likes + (liked ? 1 : 0)}</span>
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 8px' }}>
            <PawIcon name="bubble" size={24} color={PawColors.labelStrong} />
            <span style={{ font: '600 13px/1 var(--font-sans)', color: PawColors.labelStrong }}>{COMMENTS.length}</span>
          </button>
          <div style={{ flex: 1 }} />
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}>
            <PawIcon name="share" size={24} color={PawColors.labelStrong} />
          </button>
        </div>

        {/* 캡션 */}
        <div style={{ padding: '0 16px 14px' }}>
          <span style={{ font: '700 13px/1.5 var(--font-sans)', color: PawColors.labelStrong }}>{author.handle} </span>
          <span style={{ font: '400 13px/1.5 var(--font-sans)', color: PawColors.label }}>
            오늘도 {p.pet}이랑 산책 다녀왔어요 🐾 날씨가 너무 좋아서 평소보다 두 배 걸었더니 얘가 집에 오자마자 쓰러졌어요 😂
          </span>
          <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {['#골든리트리버', `#${p.pet}`, '#반려동물', '#강아지산책'].map(tag => (
              <span key={tag} style={{ font: '500 12px/1 var(--font-sans)', color: PawColors.brandInk }}>{tag}</span>
            ))}
          </div>
          <div style={{ font: '400 11px/1 var(--font-sans)', color: PawColors.labelHint, marginTop: 8 }}>2025년 6월 10일</div>
        </div>

        <PawDivider />

        {/* ── 댓글 전체 목록 ── */}
        <div style={{ padding: '12px 16px 0' }}>
          <span style={{ font: '600 13px/1 var(--font-sans)', color: PawColors.labelStrong }}>댓글 {totalCount}개</span>

          {COMMENTS.map(c => (
            <div key={c.id} style={{ marginTop: 16 }}>

              {/* 댓글 */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <PawAvatar name={c.user} size={30} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 3 }}>
                    <span style={{ font: '700 13px/1 var(--font-sans)', color: PawColors.labelStrong }}>{c.user}</span>
                    <span style={{ font: '400 11px/1 var(--font-sans)', color: PawColors.labelHint }}>{c.time}</span>
                  </div>
                  <span style={{ font: '400 13px/1.5 var(--font-sans)', color: PawColors.label }}>{c.text}</span>
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <button onClick={e => { e.stopPropagation(); setReplyTarget({ user: c.user, text: c.text }); setKbOpen(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: '500 12px/1 var(--font-sans)', color: PawColors.labelHint }}>답글 달기</button>
                  </div>
                </div>
                <button onClick={e => { e.stopPropagation(); setMenuComment(c); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1px 0', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <PawIcon name="more-vertical" size={16} color={PawColors.labelHint} />
                </button>
              </div>

              {/* 답글 펼치기 버튼 */}
              {c.replies?.length > 0 && (
                <button onClick={() => toggleReplies(c.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0 0 40px',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <div style={{ width: 20, height: 1, background: PawColors.labelHint }} />
                  <span style={{ font: '600 12px/1 var(--font-sans)', color: PawColors.labelHint }}>
                    {expandedReplies.has(c.id) ? '답글 숨기기' : `답글 ${c.replies.length}개 보기`}
                  </span>
                </button>
              )}

              {/* 답글 목록 */}
              {expandedReplies.has(c.id) && c.replies?.map(r => (
                <div key={r.id} style={{ paddingLeft: 40, marginTop: 12 }}>

                  {/* 답글 */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <PawAvatar name={r.user} size={24} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 3 }}>
                        <span style={{ font: '700 12px/1 var(--font-sans)', color: PawColors.labelStrong }}>{r.user}</span>
                        <span style={{ font: '400 11px/1 var(--font-sans)', color: PawColors.labelHint }}>{r.time}</span>
                      </div>
                      <span style={{ font: '400 13px/1.5 var(--font-sans)', color: PawColors.label }}>
                        {r.text.startsWith('@') && (
                          <span style={{ color: PawColors.brandInk, fontWeight: 600 }}>{r.text.split(' ')[0]} </span>
                        )}
                        {r.text.startsWith('@') ? r.text.slice(r.text.indexOf(' ') + 1) : r.text}
                      </span>
                      <div style={{ marginTop: 5, display: 'flex', gap: 14 }}>
                        <button onClick={e => { e.stopPropagation(); setReplyTarget({ user: r.user, text: r.text }); setKbOpen(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: '500 12px/1 var(--font-sans)', color: PawColors.labelHint }}>답글 달기</button>
                      </div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setMenuComment(r); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1px 0', display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
                      <PawIcon name="more-vertical" size={14} color={PawColors.labelHint} />
                    </button>
                  </div>

                </div>
              ))}

            </div>
          ))}
          <div style={{ height: 12 }} />
        </div>
      </div>

      {/* ── 댓글 입력 바 래퍼 (하단 고정, 키보드와 함께 올라감) ── */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        bottom: kbOpen ? KB_H : 0,
        transition: 'bottom 0.25s cubic-bezier(0.4,0,0.2,1)',
        zIndex: 20,
      }}>
        {/* 답글 / 수정 대상 표시 */}
        {(replyTarget || editTarget) && (
          <div style={{
            background: 'var(--color-bg-subtle)',
            borderTop: `1px solid var(--color-border-subtle)`,
            padding: '0 12px 0 16px',
            height: REPLY_H,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {editTarget ? (<>
              <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--color-text-subtle)', flexShrink: 0 }}>수정 중</span>
              <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>· {editTarget.text}</span>
              <button onClick={() => { setEditTarget(null); setCommentText(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0 4px', flexShrink: 0, font: '400 18px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', lineHeight: 1 }}>×</button>
            </>) : (<>
              <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--color-text-subtle)', flexShrink: 0 }}>@{replyTarget.user}</span>
              <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>에게 답글 · {replyTarget.text}</span>
              <button onClick={() => setReplyTarget(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0 4px', flexShrink: 0, font: '400 18px/1 var(--font-sans)', color: 'var(--color-text-placeholder)', lineHeight: 1 }}>×</button>
            </>)}
          </div>
        )}

        {/* 입력 바 */}
        <div style={{
          background: PawColors.surface,
          borderTop: `1px solid ${PawColors.lineSoft}`,
          display: 'flex', alignItems: 'center',
          padding: '8px 12px', gap: 10, height: INPUT_H,
        }}>
          <PawAvatar name="김지원" size={28} />
          <div onClick={e => { e.stopPropagation(); setKbOpen(true); }} style={{
            flex: 1, height: 36, borderRadius: 999,
            background: PawColors.bg,
            border: `1px solid var(--color-border-default)`,
            display: 'flex', alignItems: 'center', padding: '0 14px',
            font: '400 13px/1 var(--font-sans)',
            color: commentText ? PawColors.labelStrong : PawColors.labelHint,
            cursor: 'text',
          }}>{commentText || (editTarget ? '댓글을 수정하세요...' : replyTarget ? `@${replyTarget.user}에게 답글...` : '댓글 달기...')}</div>
          {kbOpen && (
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px', flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}>
              <PawIcon name="send" size={22} color={PawColors.brand} />
            </button>
          )}
        </div>
      </div>

      {/* ── 시뮬레이션 키보드 ── */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height: kbOpen ? KB_H : 0,
        overflow: 'hidden',
        transition: 'height 0.25s cubic-bezier(0.4,0,0.2,1)',
        background: kbBg, zIndex: 19,
      }}>
        <div style={{ padding: '8px 4px 0', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {KB_ROWS.map((row, ri) => (
            <div key={ri} style={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
              {row.map(k => (
                <button key={k} onClick={() => {
                  if (k === '⌫') setCommentText(t => t.slice(0, -1));
                  else if (k !== '⇧') setCommentText(t => t + k);
                }} style={{
                  height: 42,
                  flex: k === '⇧' || k === '⌫' ? '0 0 42px' : 1,
                  maxWidth: 36,
                  borderRadius: 5, border: 'none', cursor: 'pointer',
                  background: k === '⇧' || k === '⌫' ? (dark ? '#545456' : '#AEB7C0') : keyBg,
                  color: k === '⇧' || k === '⌫' ? (dark ? '#fff' : '#000') : keyClr,
                  font: `500 ${k === '⇧' || k === '⌫' ? 13 : 16}px/1 var(--font-sans)`,
                  boxShadow: dark ? 'none' : '0 1px 0 rgba(0,0,0,0.3)',
                }}>{k}</button>
              ))}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 5, padding: '0 4px' }}>
            {[{ label: '한/영', w: 68 }, { label: 'space', flex: 1 }, { label: 'return', w: 88 }].map(k => (
              <button key={k.label} onClick={() => k.label === 'space' && setCommentText(t => t + ' ')} style={{
                height: 42, borderRadius: 5, border: 'none', cursor: 'pointer',
                background: keyBg, color: keyClr,
                font: '400 13px/1 var(--font-sans)',
                width: k.w, flex: k.flex,
                boxShadow: dark ? 'none' : '0 1px 0 rgba(0,0,0,0.3)',
              }}>{k.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 내 댓글 액션 시트 ── */}
      {menuComment && (
        <div onClick={() => setMenuComment(null)} style={{
          position: 'absolute', inset: 0, zIndex: 60,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: PawColors.surface,
            borderRadius: '16px 16px 0 0',
            paddingBottom: 24,
            overflow: 'hidden',
          }}>
            {/* 핸들 */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--color-surface-track)', margin: '10px auto 4px' }} />

            {menuComment?.mine ? (<>
              <button onClick={() => { setEditTarget(menuComment); setCommentText(menuComment.text); setMenuComment(null); setKbOpen(true); }} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PawColors.label} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                <span style={{ font: '400 15px/1 var(--font-sans)', color: PawColors.labelStrong }}>수정하기</span>
              </button>
              <button style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <PawIcon name="trash" size={20} color='var(--color-status-error)' />
                <span style={{ font: '400 15px/1 var(--font-sans)', color: 'var(--color-status-error)' }}>삭제하기</span>
              </button>
            </>) : (<>
              <button style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <PawIcon name="person" size={20} color={PawColors.label} />
                <span style={{ font: '400 15px/1 var(--font-sans)', color: PawColors.labelStrong }}>프로필 보기</span>
              </button>
              <button style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={PawColors.label} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
                <span style={{ font: '400 15px/1 var(--font-sans)', color: PawColors.labelStrong }}>신고하기</span>
              </button>
              <button style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-status-error)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                </svg>
                <span style={{ font: '400 15px/1 var(--font-sans)', color: 'var(--color-status-error)' }}>차단하기</span>
              </button>
            </>)}

          </div>
        </div>
      )}

    </div>
  );
}

function HomeScreen() {
  const { PHOTOS } = PETS_DATA;
  const [liked, setLiked] = React.useState(new Set());
  const [detail, setDetail] = React.useState(null);

  const toggleLike = id => setLiked(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  if (detail) {
    return <PhotoDetailScreen photo={detail} onBack={() => setDetail(null)} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.bg }}>

      {/* TopBar */}
      <PawTopBar variant="home" right={
        <div style={{ display: 'flex', paddingRight: 4 }}>
          <PawIconBtn name="search" iconSize={22} />
          <PawIconBtn name="bell" iconSize={22} />
        </div>
      } />

      {/* 스크롤 영역 */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <PawMasonry items={PHOTOS} onTap={setDetail} onLike={toggleLike} likedSet={liked} gap={6} bare />
        <div style={{ height: 16 }} />
      </div>

      {/* TabBar */}
      <PawTabBar active="home" />
    </div>
  );
}

function MyScreen({ emptyPets, emptyPhotos }) {
  const { PHOTOS, MY_PETS } = PETS_DATA;
  const [liked, setLiked] = React.useState(new Set());
  const [tab, setTab] = React.useState('mine');

  const toggleLike = id => setLiked(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const likedPhotos = PHOTOS.filter(p => liked.has(p.id));
  const feedPhotos = emptyPhotos ? [] : (tab === 'mine' ? PHOTOS.slice(0, 12) : likedPhotos);
  const pets = emptyPets ? [] : MY_PETS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.bg }}>

      {/* TopBar */}
      <PawTopBar variant="title" title="MY" right={
        <PawIconBtn name="setting" iconSize={22} />
      } />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* ── 프로필 섹션 ── */}
        <div style={{ background: PawColors.surface, padding: '20px 20px 16px' }}>

          {/* 아바타 + 통계 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14 }}>
            <PawAvatar name="김지원" size={72} ring />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around' }}>
              {[
                { label: '게시물', val: '47' },
                { label: '팔로워', val: '12.4K' },
                { label: '팔로잉', val: '284' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ font: '800 18px/1 var(--font-sans)', letterSpacing: '-0.02em', color: PawColors.labelStrong }}>{s.val}</div>
                  <div style={{ font: '500 11px/1 var(--font-sans)', color: PawColors.labelHint, marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 이름 + 핸들 + 바이오 */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ font: '700 15px/1.3 var(--font-sans)', letterSpacing: '-0.01em', color: PawColors.labelStrong }}>몽이아빠 🐕</div>
            <div style={{ font: '500 12px/1 var(--font-sans)', color: PawColors.labelHint, marginTop: 2 }}>@mongi_dad</div>
            <div style={{ font: '400 13px/1.5 var(--font-sans)', color: PawColors.label, marginTop: 8 }}>
              골든 몽이 &amp; 코숏 버터와 함께 🐾<br/>
              서울 마포구 · 반려동물 라이프 기록 중
            </div>
          </div>

          {/* 프로필 편집 */}
          <PawButton variant="secondary" full>프로필 편집</PawButton>
        </div>

        {/* ── 반려동물 카드 ── */}
        <div style={{ background: PawColors.surface, borderTop: `1px solid ${PawColors.lineSoft}`, padding: '16px 0 20px' }}>
          <div style={{ padding: '0 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ font: '700 14px/1 var(--font-sans)', letterSpacing: '-0.01em', color: PawColors.labelStrong }}>나의 반려동물</span>
            {!emptyPets && <span style={{ font: '500 12px/1 var(--font-sans)', color: PawColors.labelHint }}>{pets.length}마리</span>}
          </div>
          {emptyPets ? (
            <div style={{ padding: '4px 20px 4px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 999, flexShrink: 0,
                border: `2px dashed var(--color-border-default)`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PawIcon name="plus" size={22} color={PawColors.labelHint} />
              </div>
              <div>
                <div style={{ font: '600 14px/1.3 var(--font-sans)', color: PawColors.labelStrong, marginBottom: 3 }}>반려동물을 추가해보세요</div>
                <div style={{ font: '400 12px/1.4 var(--font-sans)', color: PawColors.labelHint }}>소중한 반려동물의 프로필을 만들어요</div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px 4px', scrollbarWidth: 'none' }}>
              {pets.map(pet => (
                <div key={pet.id} style={{
                  flexShrink: 0, width: 80,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                  cursor: 'pointer',
                }}>
                  <PetGlyph pet={pet} size={56} ring />
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ font: '700 13px/1 var(--font-sans)', color: PawColors.labelStrong, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pet.name}</div>
                    <div style={{ font: '500 10px/1 var(--font-sans)', color: PawColors.labelHint, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pet.age}</div>
                  </div>
                </div>
              ))}
              <div style={{ flexShrink: 0, width: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, border: `2px dashed var(--color-border-default)`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PawIcon name="plus" size={22} color={PawColors.labelHint} />
                </div>
                <div style={{ font: '500 12px/1 var(--font-sans)', color: PawColors.labelHint }}>추가</div>
              </div>
            </div>
          )}
        </div>

        {/* ── 탭 (내 사진 / 좋아요) ── */}
        <div style={{
          display: 'flex',
          background: PawColors.surface,
          borderTop: `1px solid ${PawColors.lineSoft}`,
          borderBottom: `1px solid ${PawColors.lineSoft}`,
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          {[
            { id: 'mine', label: '내 사진' },
            { id: 'liked', label: '좋아요' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, height: 44, background: 'transparent', border: 'none',
              cursor: 'pointer',
              font: `${tab === t.id ? 700 : 500} 14px/1 var(--font-sans)`,
              letterSpacing: '-0.01em',
              color: tab === t.id ? PawColors.labelStrong : PawColors.labelHint,
              borderBottom: tab === t.id ? `2px solid ${PawColors.labelStrong}` : '2px solid transparent',
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── Masonry 사진 그리드 ── */}
        <div style={{ paddingTop: 12 }}>
          {feedPhotos.length > 0 ? (
            <PawMasonry items={feedPhotos} onLike={toggleLike} likedSet={liked} gap={6} bare />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 20px', gap: 10 }}>
              <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--color-bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                <PawIcon name="image" size={28} color={PawColors.labelHint} />
              </div>
              <span style={{ font: '700 15px/1.3 var(--font-sans)', color: PawColors.labelStrong }}>
                {tab === 'liked' ? '좋아요한 사진이 없어요' : '아직 게시물이 없어요'}
              </span>
              <span style={{ font: '400 13px/1.5 var(--font-sans)', color: PawColors.labelHint, textAlign: 'center' }}>
                {tab === 'liked' ? '마음에 드는 사진에 좋아요를 눌러보세요' : '첫 번째 사진을 올려보세요'}
              </span>
              {tab === 'mine' && <PawButton variant="soft" style={{ marginTop: 8 }}>사진 올리기</PawButton>}
            </div>
          )}
          <div style={{ height: 16 }} />
        </div>

      </div>

      {/* TabBar */}
      <PawTabBar active="me" />
    </div>
  );
}

function OtherUserProfileScreen({ emptyPets, emptyPhotos }) {
  const { PHOTOS } = PETS_DATA;
  const [following, setFollowing] = React.useState(true);
  const [tab, setTab] = React.useState('mine');
  const [liked, setLiked] = React.useState(new Set());

  const toggleLike = id => setLiked(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const user = { handle: '코기집사', real: '박민호', followers: '38.2K', following: '512', posts: emptyPhotos ? '0' : '183', mutual: true };
  const allPets = [
    { id: 'cp1', name: '식빵이', breed: '웰시코기', age: '3살 1개월', color: '#e6c89c', emoji: '🐕' },
    { id: 'cp2', name: '고구마', breed: '웰시코기', age: '1살 4개월', color: '#e0b896', emoji: '🐕' },
  ];
  const userPets = emptyPets ? [] : allPets;

  const feedPhotos = emptyPhotos ? [] : (tab === 'mine' ? PHOTOS.filter(p => p.species === 'dog') : PHOTOS.filter(p => liked.has(p.id)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.bg }}>

      {/* TopBar */}
      <PawTopBar variant="title" title={`@${user.handle}`} onBack={() => {}} right={
        <PawIconBtn name="more" iconSize={22} />
      } />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* ── 프로필 섹션 ── */}
        <div style={{ background: PawColors.surface, padding: '20px 20px 16px' }}>

          {/* 아바타 + 통계 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 14 }}>
            <PawAvatar name={user.real} size={72} ring={user.mutual} />
            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around' }}>
              {[
                { label: '게시물', val: user.posts },
                { label: '팔로워', val: user.followers },
                { label: '팔로잉', val: user.following },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ font: '800 18px/1 var(--font-sans)', letterSpacing: '-0.02em', color: PawColors.labelStrong }}>{s.val}</div>
                  <div style={{ font: '500 11px/1 var(--font-sans)', color: PawColors.labelHint, marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 이름 + 핸들 + 바이오 */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ font: '700 15px/1.3 var(--font-sans)', letterSpacing: '-0.01em', color: PawColors.labelStrong }}>{user.handle} 🐕</span>
              {user.mutual && (
                <span style={{
                  fontSize: 10, fontWeight: 700, lineHeight: 1,
                  padding: '3px 6px', borderRadius: 999,
                  background: PawColors.brandSoft, color: PawColors.brandInk,
                  letterSpacing: '-0.005em',
                }}>맞팔</span>
              )}
            </div>
            <div style={{ font: '500 12px/1 var(--font-sans)', color: PawColors.labelHint, marginTop: 2 }}>@cogi_jipsа</div>
            <div style={{ font: '400 13px/1.5 var(--font-sans)', color: PawColors.label, marginTop: 8 }}>
              웰시코기 식빵이 &amp; 고구마 아빠 🐾<br/>
              경기 판교 · 코기 정보 공유 채널
            </div>
          </div>

          {/* 액션 버튼 */}
          <button
            onClick={() => setFollowing(f => !f)}
            style={{
              width: '100%', height: 44, borderRadius: 12,
              background: following ? PawColors.surface : PawColors.brand,
              color: following ? PawColors.labelStrong : '#fff',
              border: following ? `1px solid var(--color-border-default)` : 'none',
              font: '700 14px/1 var(--font-sans)', letterSpacing: '-0.005em',
              cursor: 'pointer',
              transition: 'background .12s, color .12s',
            }}
          >{following ? '팔로잉 ✓' : '팔로우'}</button>
        </div>

        {/* ── 반려동물 카드 ── */}
        {!emptyPets ? (
          <div style={{ background: PawColors.surface, borderTop: `1px solid ${PawColors.lineSoft}`, padding: '16px 0 20px' }}>
            <div style={{ padding: '0 20px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ font: '700 14px/1 var(--font-sans)', letterSpacing: '-0.01em', color: PawColors.labelStrong }}>반려동물</span>
              <span style={{ font: '500 12px/1 var(--font-sans)', color: PawColors.labelHint }}>{userPets.length}마리</span>
            </div>
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 20px 4px', scrollbarWidth: 'none' }}>
              {userPets.map(pet => (
                <div key={pet.id} style={{ flexShrink: 0, width: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                  <PetGlyph pet={pet} size={56} />
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{ font: '700 13px/1 var(--font-sans)', color: PawColors.labelStrong, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pet.name}</div>
                    <div style={{ font: '500 10px/1 var(--font-sans)', color: PawColors.labelHint, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pet.age}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* ── 탭 (사진 / 태그됨) ── */}
        <div style={{
          display: 'flex',
          background: PawColors.surface,
          borderTop: `1px solid ${PawColors.lineSoft}`,
          borderBottom: `1px solid ${PawColors.lineSoft}`,
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          {[
            { id: 'mine', label: '사진' },
            { id: 'tagged', label: '태그됨' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, height: 44, background: 'transparent', border: 'none',
              cursor: 'pointer',
              font: `${tab === t.id ? 700 : 500} 14px/1 var(--font-sans)`,
              letterSpacing: '-0.01em',
              color: tab === t.id ? PawColors.labelStrong : PawColors.labelHint,
              borderBottom: tab === t.id ? `2px solid ${PawColors.labelStrong}` : '2px solid transparent',
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── Masonry 사진 그리드 ── */}
        <div style={{ paddingTop: 12 }}>
          {feedPhotos.length > 0 ? (
            <PawMasonry items={feedPhotos} onLike={toggleLike} likedSet={liked} gap={6} bare />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 20px', gap: 10 }}>
              <div style={{ width: 64, height: 64, borderRadius: 999, background: 'var(--color-bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
                <PawIcon name="image" size={28} color={PawColors.labelHint} />
              </div>
              <span style={{ font: '700 15px/1.3 var(--font-sans)', color: PawColors.labelStrong }}>아직 게시물이 없어요</span>
              <span style={{ font: '400 13px/1.5 var(--font-sans)', color: PawColors.labelHint, textAlign: 'center' }}>
                {tab === 'mine' ? '아직 올린 사진이 없어요' : '태그된 사진이 없어요'}
              </span>
            </div>
          )}
          <div style={{ height: 16 }} />
        </div>

      </div>

    </div>
  );
}

function MyGuestScreen() {
  const { dark, setDark } = useDarkMode();
  const settingsItems = [
    { label: '공지사항',        icon: 'bell' },
    { label: '고객센터',        icon: 'bubble' },
    { label: '이용약관',        icon: 'document' },
    { label: '개인정보처리방침', icon: 'lock' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.bg }}>

      <PawTopBar variant="title" title="MY" />

      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* ── 로그인 유도 블록 ── */}
        <div style={{
          background: PawColors.surface, padding: '20px',
          display: 'flex', alignItems: 'center', gap: 16,
          cursor: 'pointer',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 999, flexShrink: 0,
            background: 'var(--color-bg-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PawIcon name="person" size={32} color={PawColors.labelHint} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ font: '700 16px/1.3 var(--font-sans)', color: PawColors.labelStrong, marginBottom: 4 }}>
              로그인 / 회원가입
            </div>
            <div style={{ font: '400 13px/1.4 var(--font-sans)', color: PawColors.labelHint }}>
              반려동물의 일상을 기록해 보세요
            </div>
          </div>
          <PawIcon name="chevron-right" size={20} color={PawColors.labelHint} />
        </div>

        {/* ── 화면 ── */}
        <div style={{ background: PawColors.surface, marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 52, gap: 14 }}>
            <PawIcon name="eye" size={20} color={PawColors.labelHint} />
            <span style={{ flex: 1, font: '500 15px/1 var(--font-sans)', letterSpacing: '-0.01em', color: PawColors.labelStrong }}>다크 모드</span>
            <div onClick={() => setDark(d => !d)} style={{
              width: 46, height: 26, borderRadius: 999, flexShrink: 0,
              background: dark ? PawColors.brand : 'var(--color-surface-track)',
              position: 'relative', cursor: 'pointer', transition: 'background .2s',
            }}>
              <div style={{
                position: 'absolute', top: 3, left: dark ? 23 : 3,
                width: 20, height: 20, borderRadius: 999,
                background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                transition: 'left .2s',
              }} />
            </div>
          </div>
        </div>

        {/* ── 앱 정보 / 설정 리스트 ── */}
        <div style={{ background: PawColors.surface, marginTop: 8 }}>
          {settingsItems.map((item, i) => (
            <React.Fragment key={item.label}>
              <div style={{
                display: 'flex', alignItems: 'center',
                padding: '0 20px', height: 52, gap: 14,
                cursor: 'pointer',
              }}>
                <PawIcon name={item.icon} size={20} color={PawColors.labelHint} />
                <span style={{ flex: 1, font: '500 15px/1 var(--font-sans)', letterSpacing: '-0.01em', color: PawColors.labelStrong }}>{item.label}</span>
                <PawIcon name="chevron-right" size={18} color={PawColors.labelHint} />
              </div>
              {i < settingsItems.length - 1 && <PawDivider inset={54} />}
            </React.Fragment>
          ))}
        </div>

        {/* 앱 버전 */}
        <div style={{ padding: '20px 20px 8px', textAlign: 'center' }}>
          <span style={{ font: '400 12px/1 var(--font-sans)', color: PawColors.labelHint }}>몽냥 버전 1.0.0</span>
        </div>

      </div>

      <PawTabBar active="me" />
    </div>
  );
}
function SettingsScreen() {
  const [noti, setNoti] = React.useState({ like: true, comment: true, follow: false });
  const { dark, setDark } = useDarkMode();

  function Toggle({ on, onToggle }) {
    return (
      <div onClick={onToggle} style={{
        width: 46, height: 26, borderRadius: 999, flexShrink: 0,
        background: on ? PawColors.brand : 'var(--color-surface-track)',
        position: 'relative', cursor: 'pointer',
        transition: 'background .2s',
      }}>
        <div style={{
          position: 'absolute', top: 3,
          left: on ? 23 : 3,
          width: 20, height: 20, borderRadius: 999,
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'left .2s',
        }} />
      </div>
    );
  }

  function SectionHeader({ label }) {
    return (
      <div style={{ padding: '20px 20px 6px' }}>
        <span style={{ font: '600 12px/1 var(--font-sans)', letterSpacing: '0.04em', color: PawColors.labelHint, textTransform: 'uppercase' }}>{label}</span>
      </div>
    );
  }

  function SettingRow({ icon, label, right, danger, onTap }) {
    return (
      <div onClick={onTap} style={{
        display: 'flex', alignItems: 'center',
        padding: '0 20px', height: 52, gap: 14,
        cursor: onTap ? 'pointer' : 'default',
      }}>
        {icon ? <PawIcon name={icon} size={20} color={danger ? 'var(--color-status-error)' : PawColors.labelHint} /> : <div style={{ width: 20, flexShrink: 0 }} />}
        <span style={{
          flex: 1,
          font: '500 15px/1 var(--font-sans)', letterSpacing: '-0.01em',
          color: danger ? 'var(--color-status-error)' : PawColors.labelStrong,
        }}>{label}</span>
        {right}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: PawColors.bg }}>

      <PawTopBar variant="title" title="설정" onBack={() => {}} />

      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* ── 알림 ── */}
        <SectionHeader label="알림" />
        <div style={{ background: PawColors.surface }}>
          <SettingRow icon="heart" label="좋아요 알림" right={
            <Toggle on={noti.like} onToggle={() => setNoti(n => ({ ...n, like: !n.like }))} />
          } />
          <PawDivider inset={54} />
          <SettingRow icon="bubble" label="댓글 알림" right={
            <Toggle on={noti.comment} onToggle={() => setNoti(n => ({ ...n, comment: !n.comment }))} />
          } />
          <PawDivider inset={54} />
          <SettingRow icon="person" label="팔로우 알림" right={
            <Toggle on={noti.follow} onToggle={() => setNoti(n => ({ ...n, follow: !n.follow }))} />
          } />
        </div>

        {/* ── 화면 ── */}
        <SectionHeader label="화면" />
        <div style={{ background: PawColors.surface }}>
          <SettingRow icon="eye" label="다크 모드" right={
            <Toggle on={dark} onToggle={() => setDark(d => !d)} />
          } />
        </div>

        {/* ── 앱 정보 ── */}
        <SectionHeader label="앱 정보" />
        <div style={{ background: PawColors.surface }}>
          {[
            { icon: 'bell',     label: '공지사항' },
            { icon: 'bubble',   label: '고객센터' },
            { icon: 'document', label: '이용약관' },
            { icon: 'lock',     label: '개인정보처리방침' },
          ].map((item, i, arr) => (
            <React.Fragment key={item.label}>
              <SettingRow icon={item.icon} label={item.label} onTap={() => {}} right={
                <PawIcon name="chevron-right" size={18} color={PawColors.labelHint} />
              } />
              {i < arr.length - 1 && <PawDivider inset={54} />}
            </React.Fragment>
          ))}
          <PawDivider inset={54} />
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 52, gap: 14 }}>
            <PawIcon name="info" size={20} color={PawColors.labelHint} />
            <span style={{ flex: 1, font: '500 15px/1 var(--font-sans)', color: PawColors.labelStrong }}>앱 버전</span>
            <span style={{ font: '400 14px/1 var(--font-sans)', color: PawColors.labelHint }}>1.0.0</span>
          </div>
        </div>

        {/* ── 계정 ── */}
        <SectionHeader label="계정" />
        <div style={{ background: PawColors.surface }}>
          {/* 연결된 소셜 계정 */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: 52, gap: 14 }}>
            <div style={{
              width: 20, height: 20, borderRadius: 6, flexShrink: 0,
              background: 'var(--color-social-kakao)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              font: '800 11px/1 var(--font-sans)', color: 'rgba(0,0,0,0.85)',
            }}>K</div>
            <span style={{ flex: 1, font: '500 15px/1 var(--font-sans)', color: PawColors.labelStrong }}>연결된 계정</span>
            <span style={{ font: '400 13px/1 var(--font-sans)', color: PawColors.labelHint }}>카카오</span>
          </div>
          <PawDivider inset={54} />
          <SettingRow icon="exit" label="로그아웃" onTap={() => {}} right={
            <PawIcon name="chevron-right" size={18} color={PawColors.labelHint} />
          } />
          <PawDivider inset={54} />
          <SettingRow label="회원탈퇴" onTap={() => {}} right={
            <PawIcon name="chevron-right" size={18} color={PawColors.labelHint} />
          } />
        </div>

        <div style={{ height: 32 }} />
      </div>

    </div>
  );
}

// ── DS Primitive color scales ────────────────────────────────────────
const DS_PRIMITIVE_SCALES = [
  { name: 'Common',  hue: 'common',  swatches: [
    { step: 50,  hex: '#FFFFFF', light: true }, { step: 900, hex: '#000000' },
  ]},
  { name: 'Neutral', hue: 'neutral', swatches: [
    { step: 50,  hex: '#F7F7F7', light: true }, { step: 100, hex: '#DCDCDC', light: true },
    { step: 200, hex: '#C4C4C4', light: true }, { step: 300, hex: '#B0B0B0', light: true },
    { step: 400, hex: '#9B9B9B' },              { step: 500, hex: '#737373' },
    { step: 600, hex: '#5C5C5C' },              { step: 700, hex: '#474747' },
    { step: 800, hex: '#2A2A2A' },              { step: 900, hex: '#171717' },
  ]},
  { name: 'Slate',   hue: 'slate',   swatches: [
    { step: 50,  hex: '#F8FAFC', light: true }, { step: 100, hex: '#F1F5F9', light: true },
    { step: 200, hex: '#E2E8F0', light: true }, { step: 300, hex: '#CBD5E1', light: true },
    { step: 400, hex: '#94A3B8' },              { step: 500, hex: '#64748B' },
    { step: 600, hex: '#475569' },              { step: 700, hex: '#334155' },
    { step: 800, hex: '#1E293B' },              { step: 900, hex: '#0F172A' },
  ]},
  { name: 'Gray',    hue: 'gray',    swatches: [
    { step: 50,  hex: '#F9FAFB', light: true }, { step: 100, hex: '#F3F4F6', light: true },
    { step: 200, hex: '#E5E7EB', light: true }, { step: 300, hex: '#D1D5DB', light: true },
    { step: 400, hex: '#9CA3AF' },              { step: 500, hex: '#6B7280' },
    { step: 600, hex: '#4B5563' },              { step: 700, hex: '#374151' },
    { step: 800, hex: '#1F2937' },              { step: 900, hex: '#111827' },
  ]},
  { name: 'Zinc',    hue: 'zinc',    swatches: [
    { step: 50,  hex: '#FAFAFA', light: true }, { step: 100, hex: '#F4F4F5', light: true },
    { step: 200, hex: '#E4E4E7', light: true }, { step: 300, hex: '#D4D4D8', light: true },
    { step: 400, hex: '#A1A1AA' },              { step: 500, hex: '#71717A' },
    { step: 600, hex: '#52525B' },              { step: 700, hex: '#3F3F46' },
    { step: 800, hex: '#27272A' },              { step: 900, hex: '#18181B' },
  ]},
  { name: 'Red',     hue: 'red',     swatches: [
    { step: 50,  hex: '#FFFAFA', light: true }, { step: 100, hex: '#FEECEC', light: true },
    { step: 200, hex: '#FED5D5', light: true }, { step: 300, hex: '#FFB5B5', light: true },
    { step: 400, hex: '#FF8C8C', light: true }, { step: 500, hex: '#FF6363' },
    { step: 600, hex: '#FF4242' },              { step: 700, hex: '#E52222' },
    { step: 800, hex: '#B20C0C' },              { step: 900, hex: '#3B0101' },
  ]},
  { name: 'Rose',    hue: 'rose',    swatches: [
    { step: 50,  hex: '#FFF5F6', light: true }, { step: 100, hex: '#FFE4E6', light: true },
    { step: 200, hex: '#FECDD3', light: true }, { step: 300, hex: '#FDA4AF', light: true },
    { step: 400, hex: '#FB7185', light: true }, { step: 500, hex: '#F43F5E' },
    { step: 600, hex: '#E11D48' },              { step: 700, hex: '#BE123C' },
    { step: 800, hex: '#9F1239' },              { step: 900, hex: '#7B1133' },
  ]},
  { name: 'Coral',   hue: 'coral',   swatches: [
    { step: 50,  hex: '#FFFAF7', light: true }, { step: 100, hex: '#FEEEE5', light: true },
    { step: 200, hex: '#FEDBC6', light: true }, { step: 300, hex: '#FFC09C', light: true },
    { step: 400, hex: '#FF9C63', light: true }, { step: 500, hex: '#FF7B2E' },
    { step: 600, hex: '#FF5E00' },              { step: 700, hex: '#CC4B00' },
    { step: 800, hex: '#943600' },              { step: 900, hex: '#2E1100' },
  ]},
  { name: 'Orange',  hue: 'orange',  swatches: [
    { step: 50,  hex: '#FFFCF7', light: true }, { step: 100, hex: '#FEF4E6', light: true },
    { step: 200, hex: '#FEE6C6', light: true }, { step: 300, hex: '#FFD49C', light: true },
    { step: 400, hex: '#FFC06E', light: true }, { step: 500, hex: '#FFA938' },
    { step: 600, hex: '#FF9200' },              { step: 700, hex: '#D17600' },
    { step: 800, hex: '#9C5800' },              { step: 900, hex: '#361E00' },
  ]},
  { name: 'Yellow',  hue: 'yellow',  swatches: [
    { step: 50,  hex: '#FEFEF3', light: true }, { step: 100, hex: '#FEF9C3', light: true },
    { step: 200, hex: '#FEF08A', light: true }, { step: 300, hex: '#FDE047', light: true },
    { step: 400, hex: '#FACC15', light: true }, { step: 500, hex: '#EAB308', light: true },
    { step: 600, hex: '#CA8A04' },              { step: 700, hex: '#A16207' },
    { step: 800, hex: '#854D0E' },              { step: 900, hex: '#60360F' },
  ]},
  { name: 'Lime',    hue: 'lime',    swatches: [
    { step: 50,  hex: '#F8FFF2', light: true }, { step: 100, hex: '#E6FFD4', light: true },
    { step: 200, hex: '#CCFCA9', light: true }, { step: 300, hex: '#AEF779', light: true },
    { step: 400, hex: '#88F03E', light: true }, { step: 500, hex: '#6BE016' },
    { step: 600, hex: '#58CF04' },              { step: 700, hex: '#48AD00' },
    { step: 800, hex: '#347D00' },              { step: 900, hex: '#112900' },
  ]},
  { name: 'Green',   hue: 'green',   swatches: [
    { step: 50,  hex: '#F2FFF6', light: true }, { step: 100, hex: '#D9FFE6', light: true },
    { step: 200, hex: '#ACFCC7', light: true }, { step: 300, hex: '#7DF5A5', light: true },
    { step: 400, hex: '#49E57D', light: true }, { step: 500, hex: '#1ED45A' },
    { step: 600, hex: '#00BF40' },              { step: 700, hex: '#009632' },
    { step: 800, hex: '#006E25' },              { step: 900, hex: '#00240C' },
  ]},
  { name: 'Cyan',    hue: 'cyan',    swatches: [
    { step: 50,  hex: '#F7FEFF', light: true }, { step: 100, hex: '#DEFAFF', light: true },
    { step: 200, hex: '#B5F4FF', light: true }, { step: 300, hex: '#8AEDFF', light: true },
    { step: 400, hex: '#57DFF7', light: true }, { step: 500, hex: '#28D0ED' },
    { step: 600, hex: '#00BDDE' },              { step: 700, hex: '#0098B2' },
    { step: 800, hex: '#006F82' },              { step: 900, hex: '#00252B' },
  ]},
  { name: 'Blue',    hue: 'blue',    swatches: [
    { step: 50,  hex: '#F7FBFF', light: true }, { step: 100, hex: '#EAF2FE', light: true },
    { step: 200, hex: '#C9DEFE', light: true }, { step: 300, hex: '#9EC5FF', light: true },
    { step: 400, hex: '#69A5FF' },              { step: 500, hex: '#1A75FF' },
    { step: 600, hex: '#0066FF' },              { step: 700, hex: '#0054D1' },
    { step: 800, hex: '#003E9C' },              { step: 900, hex: '#001536' },
  ]},
  { name: 'Violet',  hue: 'violet',  swatches: [
    { step: 50,  hex: '#FBFAFF', light: true }, { step: 100, hex: '#F0ECFE', light: true },
    { step: 200, hex: '#DBD3FE', light: true }, { step: 300, hex: '#C0B0FF', light: true },
    { step: 400, hex: '#9E86FC', light: true }, { step: 500, hex: '#7D5EF7' },
    { step: 600, hex: '#6541F2' },              { step: 700, hex: '#4F29E5' },
    { step: 800, hex: '#23098F' },              { step: 900, hex: '#11024D' },
  ]},
  { name: 'Purple',  hue: 'purple',  swatches: [
    { step: 50,  hex: '#FEFBFF', light: true }, { step: 100, hex: '#F9EDFF', light: true },
    { step: 200, hex: '#F2D6FF', light: true }, { step: 300, hex: '#E9BAFF', light: true },
    { step: 400, hex: '#DE96FF', light: true }, { step: 500, hex: '#D478FF' },
    { step: 600, hex: '#CB59FF' },              { step: 700, hex: '#AD36E3' },
    { step: 800, hex: '#861CB8' },              { step: 900, hex: '#290247' },
  ]},
  { name: 'Pink',    hue: 'pink',    swatches: [
    { step: 50,  hex: '#FFFAFE', light: true }, { step: 100, hex: '#FEECFB', light: true },
    { step: 200, hex: '#FED3F7', light: true }, { step: 300, hex: '#FFB8F3', light: true },
    { step: 400, hex: '#FF94ED', light: true }, { step: 500, hex: '#FA73E3' },
    { step: 600, hex: '#F553DA' },              { step: 700, hex: '#D331B8' },
    { step: 800, hex: '#A81690' },              { step: 900, hex: '#3D0133' },
  ]},
];

const DS_SEMANTIC_TOKENS = [
  { category: 'Brand', tokens: [
    { name: '--color-brand-primary', lightHex: '#FF7B2E', darkHex: '#FF7B2E' },
    { name: '--color-brand-subtle',  lightHex: '#FEEEE5', darkHex: '#2E1100', lightBorder: true },
    { name: '--color-brand-accent',  lightHex: '#943600', darkHex: '#FFC09C' },
  ]},
  { category: 'Text', tokens: [
    { name: '--color-text-strong',      lightHex: '#000000', darkHex: '#E4E4E7' },
    { name: '--color-text-default',     lightHex: '#27272A', darkHex: '#D4D4D8' },
    { name: '--color-text-subtle',      lightHex: '#9B9B9B', darkHex: '#9B9B9B' },
    { name: '--color-text-placeholder', lightHex: '#D4D4D8', darkHex: '#52525B', lightBorder: true },
    { name: '--color-text-disabled',    lightHex: '#E4E4E7', darkHex: '#3F3F46', lightBorder: true },
  ]},
  { category: 'Icon', tokens: [
    { name: '--color-icon-default', lightHex: '#9B9B9B', darkHex: '#71717A' },
  ]},
  { category: 'Background', tokens: [
    { name: '--color-bg-default',      lightHex: '#FFFFFF', darkHex: '#18181B', lightBorder: true },
    { name: '--color-bg-subtle',       lightHex: '#F7F7F7', darkHex: '#27272A', lightBorder: true },
    { name: '--color-bg-muted',        lightHex: '#F4F4F5', darkHex: '#27272A', lightBorder: true },
    { name: '--color-surface-default', lightHex: '#E4E4E7', darkHex: '#3F3F46', lightBorder: true },
    { name: '--color-surface-track',   lightHex: '#D4D4D8', darkHex: '#3F3F46', lightBorder: true },
  ]},
  { category: 'Border', tokens: [
    { name: '--color-border-default', lightHex: '#E4E4E7', darkHex: '#3F3F46', lightBorder: true },
    { name: '--color-border-subtle',  lightHex: '#E4E4E7', darkHex: '#3F3F46', lightBorder: true },
    { name: '--color-border-strong',  lightHex: '#D4D4D8', darkHex: '#3F3F46', lightBorder: true },
  ]},
  { category: 'Status', tokens: [
    { name: '--color-status-info',    lightHex: '#0066FF', darkHex: '#69A5FF' },
    { name: '--color-status-error',   lightHex: '#FF4242', darkHex: '#FF6363' },
    { name: '--color-status-success', lightHex: '#00BF40', darkHex: '#00BF40' },
    { name: '--color-status-warning', lightHex: '#FFA938', darkHex: '#FFA938' },
  ]},
  { category: 'Social', tokens: [
    { name: '--color-social-kakao',  lightHex: '#FEE500', darkHex: '#FEE500', lightBorder: true, darkBorder: true },
    { name: '--color-social-naver',  lightHex: '#03C75A', darkHex: '#03C75A' },
    { name: '--color-social-google', lightHex: '#FFFFFF', darkHex: '#FFFFFF', lightBorder: true, darkBorder: true },
    { name: '--color-social-apple',  lightHex: '#000000', darkHex: '#000000' },
  ]},
  { category: 'Gender', tokens: [
    { name: '--color-gender-male',           lightHex: '#69A5FF', darkHex: '#69A5FF' },
    { name: '--color-gender-male-surface',   lightHex: '#EAF2FE', darkHex: '#00252B', lightBorder: true },
    { name: '--color-gender-female',         lightHex: '#FA73E3', darkHex: '#FA73E3' },
    { name: '--color-gender-female-surface', lightHex: '#FEECFB', darkHex: '#3D0133', lightBorder: true },
  ]},
];

const DS_TYPE_SCALE = [
  { group: 'Display', items: [
    { name: 'Display 1', size: 40, weight: 900, lh: 1.2,   letter: '-0.04em',  sample: '함께 성장하는 반려생활' },
    { name: 'Display 2', size: 32, weight: 800, lh: 1.25,  letter: '-0.03em',  sample: '함께 성장하는 반려생활' },
  ]},
  { group: 'Title', items: [
    { name: 'Title 1', size: 24, weight: 700, lh: 1.3,   letter: '-0.02em',  sample: '반려동물 등록하기' },
    { name: 'Title 2', size: 20, weight: 700, lh: 1.35,  letter: '-0.015em', sample: '반려동물 등록하기' },
    { name: 'Title 3', size: 18, weight: 700, lh: 1.4,   letter: '-0.01em',  sample: '반려동물 등록하기' },
  ]},
  { group: 'Heading', items: [
    { name: 'Heading 1', size: 16, weight: 700, lh: 1.5, letter: '-0.01em', sample: '골든리트리버 · 2살 3개월' },
    { name: 'Heading 2', size: 15, weight: 600, lh: 1.5, letter: '0',       sample: '골든리트리버 · 2살 3개월' },
  ]},
  { group: 'Body', items: [
    { name: 'Body 1', size: 16, weight: 400, lh: 1.6, letter: '0', sample: '우리 몽이가 오늘 처음으로 산책을 나갔어요. 날씨가 너무 좋아서 함께 오래 걸었습니다.' },
    { name: 'Body 2', size: 14, weight: 400, lh: 1.6, letter: '0', sample: '우리 몽이가 오늘 처음으로 산책을 나갔어요. 날씨가 너무 좋아서 함께 오래 걸었습니다.' },
  ]},
  { group: 'Label', items: [
    { name: 'Label 1', size: 14, weight: 600, lh: 1.4, letter: '0',      sample: '팔로우 · 댓글 달기' },
    { name: 'Label 2', size: 12, weight: 600, lh: 1.4, letter: '0.01em', sample: '팔로우 · 댓글 달기' },
  ]},
  { group: 'Caption', items: [
    { name: 'Caption 1', size: 12, weight: 500, lh: 1.334, letter: '0.025em', sample: '2분 전 · 팔로워 1.2K' },
    { name: 'Caption 2', size: 11, weight: 500, lh: 1.273, letter: '0.031em', sample: '2분 전 · 팔로워 1.2K' },
  ]},
];

function DSColor({ colorTab, setColorTab }) {
  const border     = 'var(--color-border-default)';
  const rowBorder  = 'var(--color-bg-muted)';
  const textStrong = 'var(--color-text-strong)';
  const textSubtle = 'var(--color-text-subtle)';
  const MONO = '"SF Mono","JetBrains Mono",monospace';

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ font: '800 28px/1 var(--font-sans)', letterSpacing: '-0.03em', color: textStrong, marginBottom: 8 }}>Color</div>
        <p style={{ font: '400 14px/1.6 var(--font-sans)', color: textSubtle, margin: 0 }}>
          Primitive 색상 스케일과 디자인에서 직접 사용하는 Semantic 토큰
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', marginBottom: 32, borderBottom: `1px solid ${border}` }}>
        {['primitive', 'semantic'].map(t => (
          <button key={t} onClick={() => setColorTab(t)} style={{
            padding: '8px 20px', border: 'none', cursor: 'pointer', background: 'transparent',
            font: `${colorTab === t ? '600' : '400'} 13px/1 var(--font-sans)`,
            color: colorTab === t ? 'var(--color-brand-primary)' : textSubtle,
            borderBottom: colorTab === t ? '2px solid var(--color-brand-primary)' : '2px solid transparent',
            marginBottom: -1, transition: 'color .15s',
          }}>
            {t === 'primitive' ? 'Primitive' : 'Semantic'}
          </button>
        ))}
      </div>

      {colorTab === 'primitive' && (
        <div>
          {DS_PRIMITIVE_SCALES.map(scale => (
            <div key={scale.name} style={{ marginBottom: 0, paddingBottom: 20, paddingTop: 20, borderBottom: `1px solid ${rowBorder}`, display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ width: 100, flexShrink: 0 }}>
                <div style={{ font: '600 12px/1.3 var(--font-sans)', color: textStrong }}>{scale.name}</div>
                <div style={{ font: '400 10px/1.4 var(--font-sans)', color: textSubtle, marginTop: 3 }}>{scale.hue}</div>
              </div>
              <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 2 }}>
                {scale.swatches.map(s => (
                  <div key={s.step} style={{ flexShrink: 0, textAlign: 'center', width: 48 }}>
                    <div style={{
                      width: 48, height: 36, borderRadius: 6,
                      background: s.hex,
                      border: s.light ? `1px solid ${border}` : 'none',
                    }} />
                    <div style={{ marginTop: 4, font: '500 9px/1 var(--font-sans)', color: textSubtle, whiteSpace: 'nowrap' }}>{s.step}</div>
                    <div style={{ marginTop: 3, font: `400 8px/1 ${MONO}`, color: textSubtle, opacity: 0.75, whiteSpace: 'nowrap' }}>{s.hex}</div>
                    {s.badge && <div style={{ font: '600 8px/1 var(--font-sans)', color: 'var(--color-brand-primary)', marginTop: 2 }}>{s.badge}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {colorTab === 'semantic' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, paddingLeft: 216 }}>
            <div style={{ width: 152, font: '600 10px/1 var(--font-sans)', letterSpacing: '0.08em', textTransform: 'uppercase', color: textSubtle }}>Light</div>
            <div style={{ width: 152, font: '600 10px/1 var(--font-sans)', letterSpacing: '0.08em', textTransform: 'uppercase', color: textSubtle }}>Dark</div>
          </div>
          {DS_SEMANTIC_TOKENS.map(cat => (
            <div key={cat.category} style={{ marginBottom: 28 }}>
              <div style={{ font: '700 10px/1 var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', color: textSubtle, padding: '8px 0', marginBottom: 4, borderBottom: `1px solid ${border}` }}>
                {cat.category}
              </div>
              {cat.tokens.map(tok => (
                <div key={tok.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0', borderBottom: `1px solid ${rowBorder}` }}>
                  <div style={{ width: 200, flexShrink: 0, font: `500 11px/1.3 ${MONO}`, color: textStrong, letterSpacing: '0.01em' }}>
                    {tok.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 152 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, flexShrink: 0, background: tok.lightHex, border: tok.lightBorder ? `1px solid ${border}` : 'none' }} />
                    <span style={{ font: `400 11px/1 ${MONO}`, color: textSubtle }}>{tok.lightHex}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: 152 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 6, flexShrink: 0, background: tok.darkHex, border: tok.darkBorder ? `1px solid ${border}` : 'none' }} />
                    <span style={{ font: `400 11px/1 ${MONO}`, color: textSubtle }}>{tok.darkHex}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DSTypography() {
  const border     = 'var(--color-border-default)';
  const rowBorder  = 'var(--color-bg-muted)';
  const textStrong = 'var(--color-text-strong)';
  const textSubtle = 'var(--color-text-subtle)';
  const MONO = '"SF Mono","JetBrains Mono",monospace';

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ font: '800 28px/1 var(--font-sans)', letterSpacing: '-0.03em', color: textStrong, marginBottom: 8 }}>Typography</div>
        <p style={{ font: '400 14px/1.6 var(--font-sans)', color: textSubtle, margin: 0 }}>
          Wanted Sans Variable 기반 타입 스케일 · <span style={{ font: `400 13px/1 ${MONO}` }}>var(--font-sans)</span>
        </p>
      </div>
      {DS_TYPE_SCALE.map(group => (
        <div key={group.group} style={{ marginBottom: 40 }}>
          <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', color: textSubtle, marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid ${border}` }}>
            {group.group}
          </div>
          {group.items.map(item => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'baseline', gap: 32, padding: '16px 0', borderBottom: `1px solid ${rowBorder}` }}>
              <div style={{ width: 140, flexShrink: 0 }}>
                <div style={{ font: '600 12px/1 var(--font-sans)', color: textStrong, marginBottom: 6 }}>{item.name}</div>
                <div style={{ font: `400 10px/1.6 ${MONO}`, color: textSubtle }}>
                  {item.size}px · {item.weight} · {item.lh}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-sans)', fontSize: item.size, fontWeight: item.weight, lineHeight: item.lh, letterSpacing: item.letter, color: textStrong, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: item.size >= 18 ? 'nowrap' : 'normal' }}>
                {item.sample}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function MongnyangDesignSystem() {
  const [nav, setNav] = React.useState('color');
  const [colorTab, setColorTab] = React.useState('primitive');

  const bg           = 'var(--color-bg-default)';
  const sidebarBg    = 'var(--color-bg-subtle)';
  const border       = 'var(--color-border-default)';
  const textStrong   = 'var(--color-text-strong)';
  const textSubtle   = 'var(--color-text-subtle)';
  const activeItemBg = 'var(--color-bg-muted)';

  const NAV_ITEMS = [
    { group: 'Foundation', items: [
      { id: 'color', label: 'Color' },
    ]},
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', paddingTop: 48, boxSizing: 'border-box', background: bg }}>
      {/* Sidebar */}
      <aside style={{ width: 200, flexShrink: 0, background: sidebarBg, borderRight: `1px solid ${border}`, overflowY: 'auto', padding: '20px 0' }}>
        {NAV_ITEMS.map(g => (
          <div key={g.group}>
            <div style={{ padding: '6px 16px 8px', font: '700 10px/1 var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase', color: textSubtle }}>
              {g.group}
            </div>
            {g.items.map(item => (
              <button key={item.id} onClick={() => setNav(item.id)} style={{
                display: 'block', width: 'calc(100% - 16px)', margin: '0 8px 2px',
                padding: '8px 10px', textAlign: 'left', border: 'none', cursor: 'pointer',
                borderRadius: 6,
                background: nav === item.id ? activeItemBg : 'transparent',
                color: nav === item.id ? textStrong : textSubtle,
                font: `${nav === item.id ? '600' : '400'} 13px/1.2 var(--font-sans)`,
              }}>{item.label}</button>
            ))}
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '40px 56px 80px', background: bg }}>
        {nav === 'color' && <DSColor colorTab={colorTab} setColorTab={setColorTab} />}
      </main>
    </div>
  );
}

function AppInner() {
  const { dark, setDark } = useDarkMode();
  const [page, setPage] = React.useState(() => localStorage.getItem('mn-page') || 'canvas');
  const handleSetPage = (id) => { setPage(id); localStorage.setItem('mn-page', id); };

  const topBg       = 'var(--color-bg-default)';
  const topBorder   = 'var(--color-border-default)';
  const textStrong  = 'var(--color-text-strong)';
  const textSubtle  = 'var(--color-text-subtle)';
  const activeTabBg = 'var(--color-bg-muted)';

  return (
    <>
      {/* ── 상단 네비게이션 바 ── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 48, zIndex: 9999,
        background: topBg, borderBottom: `1px solid ${topBorder}`,
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12,
      }}>
        {/* 로고 */}
        <span style={{ font: '900 16px/1 var(--font-sans)', letterSpacing: '-0.04em', color: textStrong, flexShrink: 0 }}>
          몽냥<span style={{ color: 'var(--color-brand-primary)' }}>.</span>
        </span>
        <div style={{ width: 1, height: 16, background: topBorder, flexShrink: 0 }} />

        {/* 페이지 탭 */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[['canvas', '디자인 화면'], ['system', '디자인 시스템']].map(([id, label]) => (
            <button key={id} onClick={() => handleSetPage(id)} style={{
              height: 30, padding: '0 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
              background: page === id ? activeTabBg : 'transparent',
              color: page === id ? textStrong : textSubtle,
              font: `${page === id ? '600' : '400'} 12px/1 var(--font-sans)`,
              transition: 'all .15s',
            }}>{label}</button>
          ))}
        </div>

        {/* 스페이서 */}
        <div style={{ flex: 1 }} />

        {/* 다크 모드 토글 */}
        <button onClick={() => setDark(d => !d)} style={{
          height: 30, padding: '0 12px', borderRadius: 999, border: `1px solid ${topBorder}`,
          background: 'transparent', color: textStrong,
          font: '500 12px/1 var(--font-sans)', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ fontSize: 13 }}>{dark ? '☀' : '☾'}</span>
          <span>{dark ? '라이트' : '다크'}</span>
        </button>
      </div>

      {/* ── 페이지 콘텐츠 ── */}
      {page === 'system' ? (
        <MongnyangDesignSystem />
      ) : (
      <DesignCanvas style={{ height: 'calc(100vh - 48px)', marginTop: 48 }}>
      <div data-dc-group style={{ display: 'flex', flexDirection: 'row', gap: 80, alignItems: 'flex-start' }}>

        {/* ── 전체 온보딩 플로우 ──────────────────────────── */}
        <div data-dc-group style={{ display: 'flex', flexDirection: 'column' }}>

          {/* 행 1: 로그인 */}
          <DCSection id="welcome-login" title="① 로그인"
            subtitle="소셜 로그인(카카오·네이버·구글·애플) · 로그인 없이 구경 · 약관 링크">
            <DCArtboard id="welcome-1" label="S01 · 로그인" width={W} height={H}>
              <Phone><WelcomeScreen /></Phone>
            </DCArtboard>
            <DCArtboard id="welcome-terms" label="S02 · 이용약관" width={W} height={H}>
              <Phone><TermsScreen /></Phone>
            </DCArtboard>
            <DCArtboard id="welcome-privacy" label="S03 · 개인정보처리방침" width={W} height={H}>
              <Phone><PrivacyScreen /></Phone>
            </DCArtboard>
          </DCSection>

          <DCFlowArrow mt={8} mb={8} branches={[
            { label: '소셜 로그인 탭', color: '#FF6B3D', note: '이용약관·개인정보방침은 로그인 화면에서 진입' },
          ]} />

          {/* 행 2: 온보딩 1단계 */}
          <DCSection id="welcome-step1" title="② 온보딩 1단계 · 반려동물 유무"
            subtitle="반려동물 있음 → 반려동물 정보 입력 / 없음 → 프로필 설정">
            <DCArtboard id="welcome-2" label="S04 · 반려동물 유무 선택" width={W} height={H}>
              <Phone><OnboardingHasPet /></Phone>
            </DCArtboard>
          </DCSection>

          <DCFlowArrow mt={8} mb={8} branches={[
            { label: '반려동물 있음 →', color: '#FF6B3D' },
            { label: '← 반려동물 없음', color: '#6B7280' },
          ]} />

          {/* 행 3-A: [있음] 반려동물 정보 입력 */}
          <DCSection id="welcome-step2a" title="③-A  [있음] 반려동물 정보 입력"
            subtitle="이름 → 품종 → 생년월일 → 성별 순으로 4단계 입력">
            <DCArtboard id="welcome-3a-1" label="S05 · 이름" width={W} height={H}>
              <Phone><PetInfoStep1_Name /></Phone>
            </DCArtboard>
            <DCArtboard id="welcome-3a-2" label="S06 · 품종" width={W} height={H}>
              <Phone><PetInfoStep2_Breed /></Phone>
            </DCArtboard>
            <DCArtboard id="welcome-3a-3" label="S07 · 생년월일" width={W} height={H}>
              <Phone><PetInfoStep3_Birth /></Phone>
            </DCArtboard>
            <DCArtboard id="welcome-3a-4" label="S08 · 성별" width={W} height={H}>
              <Phone><PetInfoStep4_Gender /></Phone>
            </DCArtboard>
            <DCArtboard id="welcome-3a-5" label="S09 · 사진 업로드 · 정보 확인" width={W} height={H}>
              <Phone><PetInfoStep5_Photo /></Phone>
            </DCArtboard>
          </DCSection>

          {/* 행 3-B: [없음] 프로필 설정 */}
          <DCSection id="welcome-step2b" title="③-B  [없음] 프로필 설정"
            subtitle="이름 · 고유명 입력 후 가입 완료">
            <DCArtboard id="welcome-3b" label="S10 · 프로필 설정" width={W} height={H}>
              <Phone><OnboardingNoPetProfile /></Phone>
            </DCArtboard>
          </DCSection>

          <DCFlowArrow mt={8} mb={8} branches={[
            { label: '온보딩 완료 → 홈 진입', color: '#FF6B3D' },
          ]} />

          {/* 행 4: 홈 피드 */}
          <DCSection id="home-feed" title="④ 홈 피드"
            subtitle="Masonry 피드 · 사진 탭 → 상세 · 댓글 아이콘 탭 → 바텀 시트">
            <DCArtboard id="home-1" label="S11 · 홈 피드" width={W} height={H}>
              <Phone><HomeScreen /></Phone>
            </DCArtboard>
            <DCArtboard id="home-2" label="S16 · 사진 상세" width={W} height={H}>
              <Phone><PhotoDetailScreen /></Phone>
            </DCArtboard>
          </DCSection>

          <DCSection id="my-profile-me" title="⑤-A MY 프로필 (로그인)"
            subtitle="기본 · 반려동물 없음 · 사진 없음">
            <DCArtboard id="my-1" label="S12 · MY 프로필" width={W} height={H}>
              <Phone><MyScreen /></Phone>
            </DCArtboard>
            <DCArtboard id="my-1b" label="S12-B · 반려동물 없음" width={W} height={H}>
              <Phone><MyScreen emptyPets /></Phone>
            </DCArtboard>
            <DCArtboard id="my-1c" label="S12-C · 사진 없음" width={W} height={H}>
              <Phone><MyScreen emptyPhotos /></Phone>
            </DCArtboard>
          </DCSection>

          <DCSection id="my-profile-other" title="⑤-B 타유저 프로필"
            subtitle="기본 · 반려동물 없음 · 사진 없음">
            <DCArtboard id="my-2" label="S13 · 타유저 프로필" width={W} height={H}>
              <Phone><OtherUserProfileScreen /></Phone>
            </DCArtboard>
            <DCArtboard id="my-2b" label="S13-B · 반려동물 없음" width={W} height={H}>
              <Phone><OtherUserProfileScreen emptyPets /></Phone>
            </DCArtboard>
            <DCArtboard id="my-2c" label="S13-C · 사진 없음" width={W} height={H}>
              <Phone><OtherUserProfileScreen emptyPhotos /></Phone>
            </DCArtboard>
          </DCSection>

          <DCSection id="my-profile-etc" title="⑤-C 비로그인 · 설정"
            subtitle="MY 탭 비로그인 진입 · 설정 화면">
            <DCArtboard id="my-3" label="S14 · MY (비로그인)" width={W} height={H}>
              <Phone><MyGuestScreen /></Phone>
            </DCArtboard>
            <DCArtboard id="my-4" label="S15 · 설정" width={W} height={H}>
              <Phone><SettingsScreen /></Phone>
            </DCArtboard>
          </DCSection>

        </div>
      </div>
    </DesignCanvas>
      )}
    </>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppInner />
    </DarkModeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
