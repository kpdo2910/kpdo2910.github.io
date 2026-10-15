// Newest first, from the CV (Do_Kim_Phong_en.pdf) and the LinkedIn projects.
// Product names are confidential: a project never shows its name, client or brand names, store or
// web links, version numbers, or the company it was built at. The title says what kind of product
// it is and `summary` what I did. (The CV lists each job's projects through `projects` in
// experience.js.)
// Text fields are one string for every language or { en, ja, vi }.
// - `summary`: the short line on the card. `desc`: one line of context in the dialog.
// - `start` / `end`: 'YYYY-MM'; `end: null` means ongoing. Shown in the dialog.
// - `status`: 'live' | 'in-progress' (badge). `featured`: also shown on the home page.
// Optional, shown in the dialog when present:
// - `highlights`: { en: [...], ja: [...], vi: [...] } bullet points.
// - `links`: buttons at the top of the dialog, only for a project that isn't confidential, e.g.
//     links: [
//       { type: 'web', url: 'https://…' },          // "Website"
//       { type: 'app-store', url: 'https://…' },    // "App Store"
//       { type: 'google-play', url: 'https://…' },  // "Google Play"
//       { label: 'Demo', url: 'https://…' },        // any other link, with its own label
//     ],
export const PROJECTS = [
  {
    id: 'budgeting-app',
    title: { en: 'Household budgeting app', ja: '家計簿アプリ', vi: 'Ứng dụng quản lý chi tiêu gia đình' },
    start: '2026-02',
    end: null,
    summary: {
      en: 'Built the Flutter app and the Node.js backend APIs through launch.',
      ja: 'FlutterアプリとNode.jsのバックエンドAPIをリリースまで開発。',
      vi: 'Phát triển app Flutter và backend API Node.js đến khi ra mắt.',
    },
    desc: {
      en: 'A household budgeting app that links bank, credit card, brokerage and e-money accounts and shows income and spending by category.',
      ja: '銀行・クレジットカード・証券・電子マネーの口座を連携し、収支をカテゴリ別に可視化する家計簿アプリ。',
      vi: 'Ứng dụng quản lý chi tiêu gia đình, liên kết tài khoản ngân hàng, thẻ tín dụng, chứng khoán và ví điện tử để hiển thị thu chi theo danh mục.',
    },
    highlights: {
      en: [
        'Developed the iOS/Android app in Flutter and the backend APIs in Node.js through the 2026 launch, and continue to maintain both.',
        'Integrated sign-in through an in-house OIDC-based SSO (Authorization Code + PKCE).',
        'Built account linking for banks, credit cards, brokerages and e-money services.',
        'Designed the Git branching and release workflow around Shorebird code push and GitHub Rulesets.',
      ],
      ja: [
        'FlutterでiOS/Androidアプリ、Node.jsでバックエンドAPIを開発して2026年のリリースまで担当し、現在も両方を保守。',
        '社内のOIDCベースのSSO（Authorization Code + PKCE）によるログインを組み込み。',
        '銀行・クレジットカード・証券・電子マネーの口座連携機能を実装。',
        'Shorebirdのコードプッシュと GitHub Rulesets を前提に、Gitのブランチ運用とリリースフローを設計。',
      ],
      vi: [
        'Phát triển app iOS/Android bằng Flutter và backend API bằng Node.js đến khi ra mắt năm 2026, và tiếp tục bảo trì cả hai.',
        'Tích hợp đăng nhập qua SSO nội bộ dựa trên OIDC (Authorization Code + PKCE).',
        'Xây tính năng liên kết tài khoản ngân hàng, thẻ tín dụng, chứng khoán và ví điện tử.',
        'Thiết kế quy trình phân nhánh Git và phát hành xoay quanh Shorebird code push và GitHub Rulesets.',
      ],
    },
    tags: ['Flutter', 'Node.js'],
    featured: true,
  },
  {
    id: 'medical-care-app',
    title: { en: 'Online medical care app', ja: 'オンライン診療アプリ', vi: 'Ứng dụng khám bệnh trực tuyến' },
    start: '2025-08',
    end: null,
    summary: {
      en: 'Built the Flutter app, with video consultations, real-time chat and push notifications.',
      ja: 'ビデオ診療・リアルタイムチャット・プッシュ通知を備えたFlutterアプリを開発。',
      vi: 'Phát triển app Flutter có khám qua video, chat thời gian thực và push notification.',
    },
    desc: {
      en: 'An online medical care app where patients find a clinic, see a doctor over video and pay in the app.',
      ja: 'クリニック探しからビデオ通話での診察、支払いまでをアプリ内で完結できるオンライン診療アプリ。',
      vi: 'Ứng dụng khám bệnh trực tuyến: bệnh nhân tìm phòng khám, khám với bác sĩ qua video và thanh toán ngay trong app.',
    },
    highlights: {
      en: [
        'Developed the iOS/Android app in Flutter, released in 2026.',
        'Integrated real-time chat between patients and clinics.',
        'Implemented push notifications end to end: FCM server-side sending and APNs auth key setup for Development and Production.',
      ],
      ja: [
        'FlutterでiOS/Androidアプリを開発し、2026年にリリース。',
        'Amazon Chime SDKでビデオ診療を実装。iOS/AndroidのネイティブSDKをプラットフォームチャネルでFlutterに接続。',
        '患者とクリニック間のリアルタイムチャットを実装。',
        'プッシュ通知を一貫して実装：サーバーサイドのFCM送信と、開発・本番環境のAPNs認証キー設定。',
      ],
      vi: [
        'Phát triển app iOS/Android bằng Flutter, ra mắt năm 2026.',
        'Tích hợp khám bệnh qua video bằng Amazon Chime SDK, nối SDK native iOS/Android vào Flutter qua platform channel.',
        'Tích hợp chat thời gian thực giữa bệnh nhân và phòng khám.',
        'Triển khai push notification trọn vẹn: gửi FCM phía server và cấu hình APNs auth key cho Development và Production.',
      ],
    },
    tags: ['Flutter', 'FCM / APNs'],
  },
  {
    id: 'coworking-booking-app',
    title: { en: 'Coworking space booking app', ja: 'コワーキングスペース予約アプリ', vi: 'Ứng dụng đặt chỗ coworking' },
    start: '2025-01',
    end: null,
    summary: {
      en: 'Built the Flutter app through launch, including map search and card payments.',
      ja: '地図検索やカード決済を含め、Flutterアプリをリリースまで開発。',
      vi: 'Phát triển app Flutter đến khi ra mắt, gồm tìm kiếm trên bản đồ và thanh toán thẻ.',
    },
    desc: {
      en: 'An app for finding and booking coworking and rental spaces on a map, with QR code check-in.',
      ja: '地図からコワーキングスペースやレンタルスペースを探して予約し、QRコードでチェックインできるアプリ。',
      vi: 'Ứng dụng tìm và đặt chỗ coworking, không gian cho thuê trên bản đồ, check-in bằng mã QR.',
    },
    highlights: {
      en: [
        'Developed the iOS/Android app in Flutter through its launch and have maintained it since.',
        'Integrated a card payment gateway into the booking checkout, with card details tokenized by the gateway so they never reach our own backend.',
        'Optimized map search with marker clustering, keeping panning and zooming smooth.',
      ],
      ja: [
        'FlutterでiOS/Androidアプリをリリースまで開発し、その後も保守を継続。',
        '予約の決済にカード決済サービスを組み込み、カード情報は決済サービス側でトークン化して自社バックエンドに渡らない構成に。',
        'マーカーのクラスタリングで地図検索を最適化し、移動・ズームを軽快に。',
      ],
      vi: [
        'Phát triển app iOS/Android bằng Flutter đến khi ra mắt và bảo trì từ đó.',
        'Tích hợp cổng thanh toán thẻ vào bước đặt chỗ; thông tin thẻ được cổng thanh toán token hoá nên không đi qua backend của mình.',
        'Tối ưu tìm kiếm trên bản đồ bằng gom cụm marker, giữ thao tác kéo và zoom mượt mà.',
      ],
    },
    tags: ['Flutter'],
  },
  {
    id: 'multi-asset-trading-app',
    title: { en: 'Multi-asset trading app', ja: 'マルチアセット取引アプリ', vi: 'Ứng dụng giao dịch đa tài sản' },
    start: '2024-07',
    end: '2024-12',
    summary: {
      en: 'Developed the Flutter app during its initial development phase.',
      ja: '初期開発フェーズでFlutterアプリの開発を担当。',
      vi: 'Làm app Flutter trong giai đoạn phát triển ban đầu.',
    },
    desc: {
      en: 'A trading app for FX, stock indices and commodities, with real-time charts and ordering straight from the chart.',
      ja: 'リアルタイムチャートやチャートからの注文に対応した、FX・株価指数・商品の取引アプリ。',
      vi: 'Ứng dụng giao dịch FX, chỉ số chứng khoán và hàng hoá, có biểu đồ thời gian thực và đặt lệnh ngay trên biểu đồ.',
    },
    highlights: {
      en: [
        'Developed the iOS/Android app in Flutter during its initial development phase, ahead of its 2025 launch.',
        'Optimized chart rendering for real-time price updates to keep scrolling and zooming smooth.',
      ],
      ja: [
        '2025年のリリースに先立つ初期開発フェーズで、FlutterによるiOS/Androidアプリ開発を担当。',
        'リアルタイム価格のチャート描画を最適化し、スクロールやズームを滑らかに。',
      ],
      vi: [
        'Phát triển app iOS/Android bằng Flutter trong giai đoạn phát triển ban đầu, trước khi ra mắt năm 2025.',
        'Tối ưu hiển thị biểu đồ khi giá cập nhật theo thời gian thực, giữ thao tác cuộn và zoom mượt mà.',
      ],
    },
    tags: ['Flutter'],
  },
  {
    id: 'cfd-apple-watch-app',
    title: { en: 'Apple Watch app for CFD trading', ja: 'CFD取引のApple Watchアプリ', vi: 'Ứng dụng Apple Watch giao dịch CFD' },
    start: '2024-01',
    end: '2024-06',
    summary: {
      en: 'Built the watchOS app from scratch in SwiftUI.',
      ja: 'watchOSアプリをSwiftUIでゼロから開発。',
      vi: 'Xây app watchOS từ đầu bằng SwiftUI.',
    },
    desc: {
      en: 'The Apple Watch version of a CFD trading app, for checking rates, charts and buying power and placing orders from the wrist.',
      ja: 'レート・チャート・取引余力の確認や注文をウォッチから行える、CFD取引アプリのApple Watch版。',
      vi: 'Phiên bản Apple Watch của một app giao dịch CFD: xem tỷ giá, biểu đồ, sức mua và đặt lệnh ngay trên đồng hồ.',
    },
    highlights: {
      en: [
        'Built the watchOS app from scratch with SwiftUI: rates, charts, buying power, economic calendar and order placement from the watch.',
        'Developed iPhone–Watch communication with WatchConnectivity, syncing account data from the iPhone app.',
        'Released in 2024.',
      ],
      ja: [
        'SwiftUIでwatchOSアプリをゼロから構築：レート、チャート、取引余力、経済指標カレンダー、ウォッチからの注文。',
        'WatchConnectivityでiPhoneとWatchの通信を実装し、iPhoneアプリから口座データを同期。',
        '2024年にリリース。',
      ],
      vi: [
        'Xây app watchOS từ đầu bằng SwiftUI: tỷ giá, biểu đồ, sức mua, lịch kinh tế và đặt lệnh ngay trên đồng hồ.',
        'Làm phần giao tiếp iPhone – Watch bằng WatchConnectivity, đồng bộ dữ liệu tài khoản từ app iPhone.',
        'Phát hành năm 2024.',
      ],
    },
    tags: ['watchOS', 'SwiftUI', 'Swift'],
    featured: true,
  },
  {
    id: 'fx-trading-app',
    title: { en: 'FX trading app (iOS)', ja: 'FX取引アプリ (iOS)', vi: 'Ứng dụng giao dịch FX (iOS)' },
    start: '2023-11',
    end: '2023-12',
    summary: {
      en: 'Built an in-app tutorial for first-time traders in UIKit.',
      ja: '初めてのトレーダー向けのアプリ内チュートリアルをUIKitで実装。',
      vi: 'Làm tính năng hướng dẫn trong app cho người mới giao dịch, bằng UIKit.',
    },
    desc: {
      en: 'An FX trading app with real-time rates, advanced charts and ordering straight from the chart.',
      ja: 'リアルタイムのレート、高機能チャート、チャートからの直接注文を備えたFX取引アプリ。',
      vi: 'Ứng dụng giao dịch FX có tỷ giá thời gian thực, biểu đồ nâng cao và đặt lệnh ngay trên biểu đồ.',
    },
    highlights: {
      en: ["Developed an in-app tutorial that guides first-time traders through the app's core functions, shipped in 2024."],
      ja: ['初めてのトレーダーに主要機能を案内するアプリ内チュートリアルを開発し、2024年にリリース。'],
      vi: ['Phát triển tính năng hướng dẫn trong app giúp người mới làm quen các chức năng chính, phát hành năm 2024.'],
    },
    tags: ['Swift', 'UIKit'],
  },
  {
    id: 'poker-club-app',
    title: { en: 'Poker club app', ja: 'ポーカークラブ向けアプリ', vi: 'Ứng dụng cho câu lạc bộ poker' },
    start: '2022-09',
    end: '2023-02',
    summary: {
      en: 'Built features in React Native and set up GitLab CI/CD.',
      ja: 'React Nativeでの機能開発と、GitLab CI/CDの構築。',
      vi: 'Phát triển tính năng bằng React Native và dựng CI/CD trên GitLab.',
    },
    desc: {
      en: 'A mobile app for poker players in Japan, designed to make visiting and playing at poker clubs more convenient.',
      ja: 'ポーカークラブへの来店やプレイをより便利にする、日本のポーカープレイヤー向けモバイルアプリ。',
      vi: 'Ứng dụng mobile cho người chơi poker tại Nhật, giúp việc đến và chơi ở các câu lạc bộ poker tiện hơn.',
    },
    highlights: {
      en: [
        'Implemented features for the user-facing app from specifications, including a custom points-by-day graph built with react-native-svg (no chart library) and animated views with PanResponder.',
        'Fixed notification issues and reviewed code.',
        "Managed the mobile repository's branching strategy and release scope.",
        'Set up GitLab runners and CI/CD for dev and staging, with Fastlane and DeployGate.',
      ],
      ja: [
        '仕様書に沿ってユーザー向けアプリの機能を実装。react-native-svgで日別ポイントのグラフを自作（チャートライブラリ不使用）し、PanResponderでアニメーションするビューも作成。',
        '通知まわりの不具合修正とコードレビューを担当。',
        'モバイルリポジトリのブランチ戦略とリリース範囲を管理。',
        'dev・staging向けにGitLab RunnerとCI/CDを構築（Fastlane、DeployGate）。',
      ],
      vi: [
        'Hiện thực tính năng cho app phía người dùng theo đặc tả, gồm biểu đồ điểm theo ngày tự vẽ bằng react-native-svg (không dùng thư viện chart) và các view có animation bằng PanResponder.',
        'Sửa lỗi thông báo và review code.',
        'Quản lý chiến lược phân nhánh và phạm vi phát hành của repo mobile.',
        'Dựng GitLab runner và CI/CD cho dev và staging, với Fastlane và DeployGate.',
      ],
    },
    tags: ['React Native', 'TypeScript', 'Redux-Saga'],
  },
  {
    id: 'movement-rewards-app',
    title: { en: 'Rewards app for everyday movement', ja: '移動でポイントがたまるアプリ', vi: 'Ứng dụng tích điểm khi di chuyển' },
    start: '2022-09',
    end: '2023-02',
    summary: {
      en: 'Maintained the iOS app and built new features.',
      ja: 'iOSアプリの保守と新機能の開発。',
      vi: 'Bảo trì app iOS và phát triển tính năng mới.',
    },
    desc: {
      en: 'A rewards app that gives users points for everyday movement, such as walking, cycling, driving and taking the train.',
      ja: '徒歩・自転車・車・電車など、日々の移動でポイントがたまるアプリ。',
      vi: 'Ứng dụng tặng điểm cho việc di chuyển hằng ngày như đi bộ, đạp xe, lái xe hay đi tàu.',
    },
    highlights: {
      en: [
        'Maintained the iOS app, resolving issues raised directly by the client and implementing requested updates.',
        "Built a custom home dashboard cell showing today's movement data.",
        'Added deep links and dynamic links; built custom popups and sliders.',
      ],
      ja: [
        'iOSアプリを保守し、クライアントから直接寄せられた課題の解決や、要望に応じた改修を担当。',
        '当日の移動データを表示するホーム画面のダッシュボードセルを実装。',
        'ディープリンク・ダイナミックリンクを追加し、カスタムのポップアップやスライダーを作成。',
      ],
      vi: [
        'Bảo trì app iOS, xử lý các vấn đề khách hàng báo trực tiếp và triển khai các thay đổi theo yêu cầu.',
        'Làm cell dashboard ở màn hình chính hiển thị dữ liệu di chuyển trong ngày.',
        'Thêm deep link và dynamic link; làm popup và slider tuỳ biến.',
      ],
    },
    tags: ['Swift', 'UIKit'],
  },
  {
    id: 'preschool-review-platform',
    title: { en: 'Preschool review platform', ja: '幼稚園・保育園の口コミプラットフォーム', vi: 'Nền tảng đánh giá trường mầm non' },
    start: '2021-09',
    end: '2022-08',
    summary: {
      en: 'Built backend APIs in Laravel and set up the iOS project foundation.',
      ja: 'LaravelでのバックエンドAPI開発と、iOSプロジェクトの基盤構築。',
      vi: 'Xây backend API bằng Laravel và dựng nền tảng cho dự án iOS.',
    },
    desc: {
      en: 'Preschool review and comparison platform for Vietnamese parents. Worked on it part-time as a final-year student.',
      ja: 'ベトナムの保護者向けの、幼稚園・保育園の口コミ・比較プラットフォーム。大学最終学年にパートタイムで参加。',
      vi: 'Nền tảng đánh giá và so sánh trường mầm non cho phụ huynh Việt Nam. Mình làm bán thời gian khi là sinh viên năm cuối.',
    },
    highlights: {
      en: [
        'Backend: built a Facebook post management API for school owners and automated API documentation generation.',
        'iOS: set up the project foundation and shared utilities.',
      ],
      ja: [
        'バックエンド：学校向けのFacebook投稿管理APIと、APIドキュメントの自動生成を実装。',
        'iOS：プロジェクトの基盤と共通ユーティリティを構築。',
      ],
      vi: [
        'Backend: xây API quản lý bài đăng Facebook cho chủ trường và tự động sinh tài liệu API.',
        'iOS: dựng nền tảng dự án và các tiện ích dùng chung.',
      ],
    },
    tags: ['Laravel', 'Swift', 'SwiftUI'],
  },
];
