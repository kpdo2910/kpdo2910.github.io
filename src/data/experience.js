// Newest first, from the CV (Do_Kim_Phong_en.pdf) and the LinkedIn profile. `start` / `end` are
// 'YYYY-MM' (or 'YYYY'); `end: null` means current job. The duration next to the dates is
// worked out at build time.
// Text fields are one string for every language or { en, ja, vi }; `highlights` lists the
// bullet points in the detail dialog. `url` (the company site) adds a "View company" link.
// `place` may be null when it isn't known.
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
    highlights: {
      en: [
        'Kakeibōdo byGMO: built the Flutter app and the Node.js backend APIs through the July 2026 launch, including SSO sign-in and account linking for banks, cards, brokerages and e-money.',
        'GMO Clinic Map: built the Flutter app with video consultations on the Amazon Chime SDK, real-time chat and push notifications; released in July 2026.',
        'Designed the Git branching and release workflow around Shorebird code push and GitHub Rulesets.',
        'Kept maintaining Karabako byGMO after moving to Tokyo.',
      ],
      ja: [
        '家計ボード byGMO：FlutterアプリとNode.jsのバックエンドAPIを開発し、2026年7月のリリースまで担当。SSOログインや、銀行・カード・証券・電子マネーの口座連携も実装。',
        'GMOクリニック・マップ：Amazon Chime SDKによるビデオ診療、リアルタイムチャット、プッシュ通知を備えたFlutterアプリを開発し、2026年7月にリリース。',
        'Shorebirdのコードプッシュと GitHub Rulesets を前提に、Gitのブランチ運用とリリースフローを設計。',
        '東京へ異動後も空箱 byGMOの保守を継続。',
      ],
      vi: [
        'Kakeibōdo byGMO: phát triển app Flutter và backend API Node.js đến khi ra mắt tháng 7/2026, gồm đăng nhập SSO và liên kết tài khoản ngân hàng, thẻ, chứng khoán, ví điện tử.',
        'GMO Clinic Map: phát triển app Flutter có khám bệnh qua video bằng Amazon Chime SDK, chat thời gian thực và push notification; ra mắt tháng 7/2026.',
        'Thiết kế quy trình phân nhánh Git và phát hành xoay quanh Shorebird code push và GitHub Rulesets.',
        'Tiếp tục bảo trì Karabako byGMO sau khi chuyển sang Tokyo.',
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
    highlights: {
      en: [
        'GMO Click CFD: built the Apple Watch app from scratch in SwiftUI, released in June 2024.',
        'GMO Click 365: developed the Flutter trading app before its May 2025 launch.',
        'Karabako byGMO: built the coworking-space booking app through launch, including fincode byGMO payments.',
        'GMO Click FXneo: built an in-app tutorial for first-time traders in UIKit.',
      ],
      ja: [
        'GMO クリック CFD：Apple WatchアプリをSwiftUIでゼロから開発し、2024年6月にリリース。',
        'GMO クリック 365：2025年5月のリリースに向けて、Flutterの取引アプリを開発。',
        '空箱 byGMO：fincode byGMOの決済を含め、コワーキングスペース予約アプリをリリースまで開発。',
        'GMO クリック FXneo：初めてのトレーダー向けのアプリ内チュートリアルをUIKitで実装。',
      ],
      vi: [
        'GMO Click CFD: xây app Apple Watch từ đầu bằng SwiftUI, phát hành tháng 6/2024.',
        'GMO Click 365: phát triển app giao dịch Flutter trước khi ra mắt tháng 5/2025.',
        'Karabako byGMO: phát triển app đặt chỗ coworking đến khi ra mắt, gồm cả thanh toán fincode byGMO.',
        'GMO Click FXneo: làm tính năng hướng dẫn trong app cho người mới giao dịch, bằng UIKit.',
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
    highlights: {
      en: [
        'm Portal App (React Native): features for a poker club app for the Japanese market, plus branching, release scope and GitLab CI/CD with Fastlane.',
        'ANA Pocket (Swift, UIKit): maintained the rewards app and handled client issues directly.',
        'KiddiHub (Laravel, Swift): back-end APIs, then the iOS app foundation, part-time as a final-year student.',
      ],
      ja: [
        'm Portal App（React Native）：日本市場向けポーカークラブアプリの機能開発に加え、ブランチ運用・リリース範囲の管理と、FastlaneによるGitLab CI/CDの構築。',
        'ANA Pocket（Swift、UIKit）：ポイントアプリを保守し、クライアントからの課題に直接対応。',
        'KiddiHub（Laravel、Swift）：大学最終学年にパートタイムで参加し、バックエンドAPIの開発からiOSアプリの基盤構築まで担当。',
      ],
      vi: [
        'm Portal App (React Native): phát triển tính năng cho app câu lạc bộ poker ở thị trường Nhật, kiêm quản lý phân nhánh, phạm vi phát hành và CI/CD GitLab với Fastlane.',
        'ANA Pocket (Swift, UIKit): bảo trì app tích điểm và xử lý trực tiếp các vấn đề từ khách hàng.',
        'KiddiHub (Laravel, Swift): làm API back-end rồi dựng nền tảng app iOS, bán thời gian khi là sinh viên năm cuối.',
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
