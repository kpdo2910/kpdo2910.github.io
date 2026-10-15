// The About page sections besides experience (that one is in experience.js).
// Text fields are one string for every language or { en, ja, vi }. Empty fields stay hidden.

// "Programming languages", as listed in the CV (TypeScript from the LinkedIn top skills).
// `icon`: a file in src/assets/skills/ — Simple Icons v16.35.0 (https://simpleicons.org,
// CC0-1.0), downloaded from https://cdn.jsdelivr.net/npm/simple-icons@16.35.0/icons/<icon>.svg.
// They are the languages' trademarks, shown only to name them. `glyph` uses a plain icon from
// Icon.astro instead (SQL has no logo). With neither, the card has no logo.
export const SKILLS = [
  { name: 'Dart', icon: 'dart', note: { en: 'Flutter apps', ja: 'Flutterアプリ', vi: 'Ứng dụng Flutter' } },
  { name: 'Swift', icon: 'swift', note: { en: 'iOS & watchOS', ja: 'iOS・watchOS', vi: 'iOS & watchOS' } },
  {
    name: 'TypeScript',
    icon: 'typescript',
    note: { en: 'Node.js backends', ja: 'Node.jsバックエンド', vi: 'Backend Node.js' },
  },
  {
    name: 'JavaScript',
    icon: 'javascript',
    note: { en: 'React Native, Node.js', ja: 'React Native・Node.js', vi: 'React Native, Node.js' },
  },
  { name: 'PHP', icon: 'php', note: { en: 'Laravel', ja: 'Laravel', vi: 'Laravel' } },
  { name: 'Go', icon: 'go', note: { en: 'Back-end services', ja: 'バックエンド', vi: 'Dịch vụ back-end' } },
  { name: 'SQL', glyph: 'database', note: { en: 'Databases', ja: 'データベース', vi: 'Cơ sở dữ liệu' } },
];

// Newest first. `start` / `end`: 'YYYY' or 'YYYY-MM'; null hides the dates. `degree`, `note`
// optional. Vietnamese names: without diacritics in `en`, in katakana in `ja`.
const HANOI = { en: 'Hanoi, Vietnam', ja: 'ハノイ', vi: 'Hà Nội, Việt Nam' };

export const EDUCATION = [
  {
    school: {
      en: 'Hanoi University of Science and Technology',
      ja: 'ハノイ工科大学',
      vi: 'Đại học Bách khoa Hà Nội',
    },
    degree: {
      en: "Engineer's degree · Information Technology",
      ja: '情報技術（エンジニア学位）',
      vi: 'Kỹ sư Công nghệ Thông tin',
    },
    place: HANOI,
    start: '2017',
    end: '2022',
  },
  {
    school: { en: 'Ngoc Tao High School', ja: 'ゴックタオ高等学校', vi: 'Trường Trung học phổ thông Ngọc Tảo' },
    place: HANOI,
    start: '2014',
    end: '2017',
  },
  {
    school: {
      en: 'Lien Hiep Lower Secondary School',
      ja: 'リエンヒエップ中学校',
      vi: 'Trường Trung học cơ sở Liên Hiệp',
    },
    place: HANOI,
    start: '2010',
    end: '2014',
  },
  {
    school: { en: 'Lien Hiep Primary School', ja: 'リエンヒエップ小学校', vi: 'Trường Tiểu học Liên Hiệp' },
    place: HANOI,
    start: '2005',
    end: '2010',
  },
];

// Newest first. `date`: 'YYYY-MM' or 'YYYY'. `issuer`, `note` optional. `url` adds a
// "View credential" link.
export const CERTIFICATES = [
  {
    name: {
      en: 'Japanese Language NAT-TEST — Level 3 (3Q)',
      ja: '日本語NAT-TEST 3級',
      vi: 'Japanese Language NAT-TEST — Cấp 3 (3Q)',
    },
    issuer: { en: 'NAT-TEST', ja: '日本語NAT-TEST', vi: 'NAT-TEST' },
    date: '2023-08',
    note: { en: 'Equivalent to JLPT N3', ja: 'JLPT N3相当', vi: 'Tương đương JLPT N3' },
    url: null,
  },
  {
    name: {
      en: 'Fundamental IT Engineer Certificate (FE)',
      ja: '基本情報技術者（FE）',
      vi: 'Chứng chỉ Kỹ sư CNTT Cơ bản (FE)',
    },
    issuer: null,
    date: '2020',
    note: null,
    url: null,
  },
];

// Only on the CV (src/pages/[...locale]/cv.astro), from the skills list in the CV.
export const FRAMEWORKS = ['Flutter', 'React Native', 'SwiftUI', 'UIKit', 'Laravel', 'Node.js'];
export const TOOLS = [
  'Fastlane',
  'Shorebird',
  'GitHub Actions',
  'GitLab CI/CD',
  'DeployGate',
  'Docker',
  'Postman',
  'Figma',
  'Backlog',
  'Jira',
];
export const LANGUAGES = [
  {
    name: { en: 'Vietnamese', ja: 'ベトナム語', vi: 'Tiếng Việt' },
    level: { en: 'Native', ja: 'ネイティブ', vi: 'Bản ngữ' },
  },
  {
    name: { en: 'Japanese', ja: '日本語', vi: 'Tiếng Nhật' },
    level: { en: 'N3 level (NAT-TEST Level 3)', ja: 'N3相当（NAT-TEST 3級）', vi: 'Trình độ N3 (NAT-TEST cấp 3)' },
  },
  {
    name: { en: 'English', ja: '英語', vi: 'Tiếng Anh' },
    level: { en: 'Reading technical documentation', ja: '技術文書の読解', vi: 'Đọc tài liệu kỹ thuật' },
  },
];
