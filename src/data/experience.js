// Newest first, from the CV (Do_Kim_Phong_en.pdf) and the LinkedIn profile. `start` / `end` are
// 'YYYY-MM' (or 'YYYY'); `end: null` means current job. The duration next to the dates is
// worked out at build time.
// Text fields are one string for every language or { en, ja, vi }; `highlights` lists the
// bullet points in the detail dialog. `url` (the company site) adds a "View company" link.
// `place` may be null when it isn't known.
// `projects`: ids from projects.js built in this job (a project that carried on at the next job
// stays under the one where it started); the CV lists them under the job. Product names are
// confidential, so highlights name a project by the kind of product it is (see projects.js).
export const EXPERIENCE = [
  {
    id: 'gmo-financial-holdings',
    start: '2025-09',
    end: null,
    company: { en: 'GMO Financial Holdings', ja: 'GMOフィナンシャルホールディングス', vi: 'GMO Financial Holdings' },
    role: { en: 'Software Engineer', ja: 'ソフトウェアエンジニア', vi: 'Software Engineer' },
    place: { en: 'Tokyo, Japan', ja: '東京', vi: 'Tokyo, Nhật Bản' },
    url: 'https://www.gmofh.com/',
    desc: {
      en: 'Promoted and relocated from Hanoi to the Tokyo headquarters. Flutter apps and Node.js backends for fintech and healthcare services.',
      ja: 'ハノイから東京本社へ昇進・異動。フィンテック・ヘルスケア向けのFlutterアプリとNode.jsバックエンドを担当。',
      vi: 'Được thăng chức và chuyển từ Hà Nội sang trụ sở Tokyo. Làm app Flutter và backend Node.js cho các dịch vụ fintech, y tế.',
    },
    tags: ['Flutter', 'Node.js', 'Shorebird', 'FCM / APNs'],
    projects: ['budgeting-app', 'medical-care-app'],
    highlights: {
      en: [
        'Household budgeting app: built the Flutter app and the Node.js backend APIs through the 2026 launch, including SSO sign-in and account linking for banks, cards, brokerages and e-money.',
        'Online medical care app: built the Flutter app with video consultations on the Amazon Chime SDK, real-time chat and push notifications; released in 2026.',
        'Designed the Git branching and release workflow around Shorebird code push and GitHub Rulesets.',
        'Kept maintaining the coworking space booking app after moving to Tokyo.',
      ],
      ja: [
        '家計簿アプリ：FlutterアプリとNode.jsのバックエンドAPIを開発し、2026年のリリースまで担当。SSOログインや、銀行・カード・証券・電子マネーの口座連携も実装。',
        'オンライン診療アプリ：Amazon Chime SDKによるビデオ診療、リアルタイムチャット、プッシュ通知を備えたFlutterアプリを開発し、2026年にリリース。',
        'Shorebirdのコードプッシュと GitHub Rulesets を前提に、Gitのブランチ運用とリリースフローを設計。',
        '東京へ異動後もコワーキングスペース予約アプリの保守を継続。',
      ],
      vi: [
        'Ứng dụng quản lý chi tiêu gia đình: phát triển app Flutter và backend API Node.js đến khi ra mắt năm 2026, gồm đăng nhập SSO và liên kết tài khoản ngân hàng, thẻ, chứng khoán, ví điện tử.',
        'Ứng dụng khám bệnh trực tuyến: phát triển app Flutter có khám bệnh qua video bằng Amazon Chime SDK, chat thời gian thực và push notification; ra mắt năm 2026.',
        'Thiết kế quy trình phân nhánh Git và phát hành xoay quanh Shorebird code push và GitHub Rulesets.',
        'Tiếp tục bảo trì ứng dụng đặt chỗ coworking sau khi chuyển sang Tokyo.',
      ],
    },
  },
  {
    id: 'gmo-z-com-vietnam',
    start: '2023-11',
    end: '2025-08',
    company: 'GMO-Z.com Financial System Vietnam',
    role: { en: 'Mobile Engineer', ja: 'モバイルエンジニア', vi: 'Mobile Engineer' },
    place: { en: 'Hanoi, Vietnam', ja: 'ハノイ', vi: 'Hà Nội, Việt Nam' },
    url: null,
    desc: {
      en: "iOS, watchOS and Flutter apps for the GMO group's trading and service products in Japan.",
      ja: 'GMOグループの日本向け取引・サービスアプリを、iOS・watchOS・Flutterで開発。',
      vi: 'Phát triển app iOS, watchOS và Flutter cho các sản phẩm giao dịch và dịch vụ của tập đoàn GMO tại Nhật.',
    },
    tags: ['Flutter', 'SwiftUI', 'watchOS', 'UIKit'],
    projects: ['coworking-booking-app', 'multi-asset-trading-app', 'cfd-apple-watch-app', 'fx-trading-app'],
    highlights: {
      en: [
        'Apple Watch app for CFD trading: built it from scratch in SwiftUI, released in 2024.',
        'Multi-asset trading app: developed the Flutter app before its 2025 launch.',
        'Coworking space booking app: built the Flutter app through launch, including card payments.',
        'FX trading app: built an in-app tutorial for first-time traders in UIKit.',
      ],
      ja: [
        'CFD取引のApple Watchアプリ：SwiftUIでゼロから開発し、2024年にリリース。',
        'マルチアセット取引アプリ：2025年のリリースに向けて、Flutterアプリを開発。',
        'コワーキングスペース予約アプリ：カード決済を含め、Flutterアプリをリリースまで開発。',
        'FX取引アプリ：初めてのトレーダー向けのアプリ内チュートリアルをUIKitで実装。',
      ],
      vi: [
        'Ứng dụng Apple Watch giao dịch CFD: xây từ đầu bằng SwiftUI, phát hành năm 2024.',
        'Ứng dụng giao dịch đa tài sản: phát triển app Flutter trước khi ra mắt năm 2025.',
        'Ứng dụng đặt chỗ coworking: phát triển app Flutter đến khi ra mắt, gồm cả thanh toán thẻ.',
        'Ứng dụng giao dịch FX: làm tính năng hướng dẫn trong app cho người mới giao dịch, bằng UIKit.',
      ],
    },
  },
  {
    id: 'hblab',
    start: '2021-09',
    end: '2023-02',
    company: 'HBLAB Group',
    role: { en: 'Software Engineer', ja: 'ソフトウェアエンジニア', vi: 'Software Engineer' },
    place: { en: 'Hanoi, Vietnam', ja: 'ハノイ', vi: 'Hà Nội, Việt Nam' },
    url: null,
    desc: {
      en: 'Back end first, then mobile: React Native and iOS apps for Japanese clients, and a Laravel platform for Vietnamese parents.',
      ja: 'バックエンドからモバイルへ。日本のクライアント向けのReact Native・iOSアプリと、ベトナムの保護者向けLaravelプラットフォームを担当。',
      vi: 'Bắt đầu từ back-end rồi chuyển sang mobile: app React Native, iOS cho khách hàng Nhật và nền tảng Laravel cho phụ huynh Việt Nam.',
    },
    tags: ['React Native', 'Swift', 'Laravel', 'Fastlane'],
    projects: ['poker-club-app', 'movement-rewards-app', 'preschool-review-platform'],
    highlights: {
      en: [
        'Poker club app for the Japanese market (React Native): built features and handled branching, release scope and GitLab CI/CD with Fastlane.',
        'Rewards app for everyday movement (Swift, UIKit): maintained the iOS app and handled client issues directly.',
        'Preschool review platform (Laravel, Swift): back-end APIs, then the iOS app foundation, part-time as a final-year student.',
      ],
      ja: [
        '日本市場向けポーカークラブアプリ（React Native）：機能開発に加え、ブランチ運用・リリース範囲の管理と、FastlaneによるGitLab CI/CDの構築。',
        '移動でポイントがたまるアプリ（Swift、UIKit）：iOSアプリを保守し、クライアントからの課題に直接対応。',
        '幼稚園・保育園の口コミプラットフォーム（Laravel、Swift）：大学最終学年にパートタイムで参加し、バックエンドAPIの開発からiOSアプリの基盤構築まで担当。',
      ],
      vi: [
        'Ứng dụng câu lạc bộ poker cho thị trường Nhật (React Native): phát triển tính năng, kiêm quản lý phân nhánh, phạm vi phát hành và CI/CD GitLab với Fastlane.',
        'Ứng dụng tích điểm khi di chuyển (Swift, UIKit): bảo trì app iOS và xử lý trực tiếp các vấn đề từ khách hàng.',
        'Nền tảng đánh giá trường mầm non (Laravel, Swift): làm API back-end rồi dựng nền tảng app iOS, bán thời gian khi là sinh viên năm cuối.',
      ],
    },
  },
  {
    id: 'tribal-media-house',
    start: '2021-07',
    end: '2021-08',
    company: 'Tribal Media House Technology Lab',
    role: { en: 'Software Engineer Intern', ja: 'ソフトウェアエンジニア（インターン）', vi: 'Thực tập sinh Software Engineer' },
    place: null,
    url: null,
    desc: {
      en: 'Go and Docker work on an Instagram influencer management tool for Japanese companies.',
      ja: '日本企業向けのInstagramインフルエンサー管理ツールを、GoとDockerで開発。',
      vi: 'Làm công cụ quản lý influencer Instagram cho doanh nghiệp Nhật, bằng Go và Docker.',
    },
    tags: ['Go', 'Docker'],
    highlights: {
      en: ["Built the influencer registration feature, creating a new record when an influencer wasn't in the database yet."],
      ja: ['インフルエンサー登録機能を実装（データベースに未登録の場合は新規レコードを作成）。'],
      vi: ['Xây tính năng đăng ký influencer, tạo bản ghi mới khi influencer chưa có trong cơ sở dữ liệu.'],
    },
  },
];
