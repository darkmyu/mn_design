// data.jsx — mock pet photos, users, pets

// Unsplash pet photo IDs — width is supplied per use site
const PHOTOS = [
  { id: 'p01', uid: '1583337130417-3346a1be7dee', species: 'dog',   breed: '골든리트리버',  pet: '몽이',   ar: 0.75, likes: 142, fav: '#f4dab3' },
  { id: 'p02', uid: '1574144611937-0df059b5ef3e', species: 'cat',   breed: '코리안숏헤어',  pet: '치즈',   ar: 1.25, likes: 88,  fav: '#f5c781' },
  { id: 'p03', uid: '1543466835-00a7907e9de1',    species: 'dog',   breed: '골든리트리버',  pet: '버터',   ar: 0.66, likes: 312, fav: '#e8c89c' },
  { id: 'p04', uid: '1561948955-570b270e7c36',    species: 'cat',   breed: '러시안블루',    pet: '구름',   ar: 1.0,  likes: 56,  fav: '#dde2e8' },
  { id: 'p05', uid: '1604848698030-c434ba08ece1', species: 'rep',   breed: '레오파드게코',  pet: '모카',   ar: 1.5,  likes: 24,  fav: '#e2c89a' },
  { id: 'p06', uid: '1450778869180-41d0601e046e', species: 'dog',   breed: '래브라도',      pet: '코코',   ar: 0.75, likes: 201, fav: '#d4c1a8' },
  { id: 'p07', uid: '1592194996308-7b43878e84a6', species: 'cat',   breed: '코리안숏헤어',  pet: '루나',   ar: 0.66, likes: 167, fav: '#c9b08a' },
  { id: 'p08', uid: '1583511655826-05700d52f4d9', species: 'dog',   breed: '말티즈',        pet: '뽀삐',   ar: 1.0,  likes: 99,  fav: '#f0e6d8' },
  { id: 'p09', uid: '1547721064-da6cfb341d50',    species: 'rab',   breed: '네덜란드드워프',pet: '당근',   ar: 1.25, likes: 412, fav: '#d8c8a8' },
  { id: 'p10', uid: '1517849845537-4d257902454a', species: 'dog',   breed: '웰시코기',      pet: '식빵',   ar: 0.66, likes: 845, fav: '#e6c89c' },
  { id: 'p11', uid: '1576201836106-db1758fd1c97', species: 'cat',   breed: '먼치킨',        pet: '땅콩',   ar: 0.75, likes: 233, fav: '#e8d9c1' },
  { id: 'p12', uid: '1544568100-847a948585b9',    species: 'bir',   breed: '회색앵무',      pet: '하늘',   ar: 1.0,  likes: 78,  fav: '#c9d2da' },
  { id: 'p13', uid: '1535268647677-300dbf3d78d1', species: 'dog',   breed: '비숑',          pet: '뭉치',   ar: 0.66, likes: 521, fav: '#f0e8de' },
  { id: 'p14', uid: '1452857297128-d9c29adba80b', species: 'cat',   breed: '터키시앙고라',  pet: '솜이',   ar: 0.75, likes: 122, fav: '#e8e0d2' },
  { id: 'p15', uid: '1601758228041-f3b2795255f1', species: 'dog',   breed: '시바',          pet: '단풍',   ar: 0.66, likes: 367, fav: '#e0b896' },
  { id: 'p16', uid: '1521247913-d2a6c5e8e85d',    species: 'rep',   breed: '러시안육지거북',pet: '바위',   ar: 1.0,  likes: 31,  fav: '#bfb697' },
];

// 12-species grid for onboarding
const SPECIES = [
  { id: 'dog',  name: '강아지',   sub: 'Dog',     count: '2.1M',   icon: '🐕' },
  { id: 'cat',  name: '고양이',   sub: 'Cat',     count: '1.8M',   icon: '🐈' },
  { id: 'rab',  name: '토끼',     sub: 'Rabbit',  count: '38K',    icon: '🐇' },
  { id: 'ham',  name: '햄스터',   sub: 'Hamster', count: '54K',    icon: '🐹' },
  { id: 'bir',  name: '앵무새',   sub: 'Bird',    count: '22K',    icon: '🦜' },
  { id: 'rep',  name: '파충류',   sub: 'Reptile', count: '11K',    icon: '🦎' },
  { id: 'fis',  name: '물고기',   sub: 'Fish',    count: '14K',    icon: '🐠' },
  { id: 'fer',  name: '페럿',     sub: 'Ferret',  count: '4.2K',   icon: '🦦' },
  { id: 'gui',  name: '기니피그', sub: 'Guinea',  count: '7.8K',   icon: '🐹' },
  { id: 'sna',  name: '뱀',       sub: 'Snake',   count: '3.1K',   icon: '🐍' },
  { id: 'tur',  name: '거북',     sub: 'Turtle',  count: '5.6K',   icon: '🐢' },
  { id: 'etc',  name: '기타',     sub: 'Other',   count: '—',      icon: '🐾' },
];

// User-facing pets (one user owns 2)
const MY_PETS = [
  { id: 'mongi', name: '몽이',  species: 'dog', breed: '골든리트리버',  age: '2살 3개월', born: '2024.02.10', color: '#f0c894', emoji: '🐕' },
  { id: 'butter',name: '버터',  species: 'cat', breed: '코리안숏헤어',  age: '1살 7개월', born: '2024.10.04', color: '#f5c781', emoji: '🐈' },
];

// Timeline months for 몽이 — 12 months, each with cover + photo count
const TIMELINE = [
  { ym: '2024.02', label: '입양',     cover: '1583337130417-3346a1be7dee', count:  6, milestone: '입양 첫날' },
  { ym: '2024.03', label: '2개월',    cover: '1583511655826-05700d52f4d9', count: 14, milestone: '첫 산책' },
  { ym: '2024.04', label: '3개월',    cover: '1535268647677-300dbf3d78d1', count: 21, milestone: '첫 예방접종' },
  { ym: '2024.05', label: '4개월',    cover: '1450778869180-41d0601e046e', count: 18, milestone: null },
  { ym: '2024.06', label: '여름',     cover: '1543466835-00a7907e9de1',    count: 32, milestone: '첫 바다' },
  { ym: '2024.07', label: '6개월',    cover: '1601758228041-f3b2795255f1', count: 24, milestone: '중성화' },
  { ym: '2024.08', label: '8월',      cover: '1517849845537-4d257902454a', count: 27, milestone: null },
  { ym: '2024.09', label: '가을',     cover: '1592194996308-7b43878e84a6', count: 19, milestone: null },
  { ym: '2024.10', label: '돌잔치',   cover: '1583337130417-3346a1be7dee', count: 41, milestone: '생일' },
  { ym: '2024.11', label: '11월',     cover: '1452857297128-d9c29adba80b', count: 16, milestone: null },
  { ym: '2024.12', label: '첫눈',     cover: '1576201836106-db1758fd1c97', count: 22, milestone: '첫눈' },
  { ym: '2025.01', label: '새해',     cover: '1583511655826-05700d52f4d9', count: 11, milestone: null },
];

// Authors
const USERS = [
  { id: 'u1', handle: '몽이아빠',   real: '김지원',   pets: ['골든리트리버'], followers: '12.4K', mutual: true,  rec: '같은 종 보호자' },
  { id: 'u2', handle: '치즈맘',     real: '이서연',   pets: ['코숏'],         followers: '4.8K',  mutual: false, rec: '같은 동네' },
  { id: 'u3', handle: '코기집사',   real: '박민호',   pets: ['웰시코기'],     followers: '38.2K', mutual: true,  rec: '같은 품종' },
  { id: 'u4', handle: 'reptile.kr', real: '정수아',   pets: ['레오파드게코'], followers: '2.1K',  mutual: false, rec: '같은 종' },
  { id: 'u5', handle: '몽냥집사',   real: '최가람',   pets: ['시바', '먼치킨'], followers: '6.4K', mutual: true,  rec: '관심 품종' },
];

Object.assign(window, { PETS_DATA: { PHOTOS, SPECIES, MY_PETS, TIMELINE, USERS } });

