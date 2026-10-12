// Newest first, from the CV (Do_Kim_Phong_en.pdf) and the LinkedIn projects.
// Text fields are one string for every language or { en, ja, vi }. Titles: the Japanese name in
// `ja`; `en` / `vi` use the official Latin name, or romaji when there isn't one (Kakeibōdo).
// - `summary`: the short line on the card. `desc`: the full description in the dialog.
// - `start` / `end`: 'YYYY-MM'; `end: null` means ongoing. Shown in the dialog.
// - `status`: 'live' | 'in-progress' (badge). `featured`: also shown on the home page.
// - `company`: an `id` from experience.js, or a list of ids (oldest first) for a project that
//   carried on at the next job. Shown in the dialog.
// Optional, shown in the dialog when present:
// - `highlights`: { en: [...], ja: [...], vi: [...] } bullet points.
// - `links`: buttons at the top of the dialog, e.g.
//     links: [
//       { type: 'web', url: 'https://…' },          // "Website"
//       { type: 'app-store', url: 'https://…' },    // "App Store"
//       { type: 'google-play', url: 'https://…' },  // "Google Play"
//       { label: 'Demo', url: 'https://…' },        // any other link, with its own label
//     ],
export const PROJECTS = [
  {
    id: 'kakei-board',
    title: { en: 'Kakeibōdo byGMO', ja: '家計ボード byGMO', vi: 'Kakeibōdo byGMO' },
    start: '2026-02',
    end: null,
    summary: {
      en: 'Household budgeting app by GMO One Account.',
      ja: 'GMO One Accountの家計簿アプリ。',
      vi: 'Ứng dụng quản lý chi tiêu gia đình của GMO One Account.',
    },
    desc: {
      en: 'A free household budgeting app by GMO One Account, with every feature available at no cost. It automatically aggregates bank, credit card, brokerage, investment trust and e-money accounts, visualizes income and spending by category with monthly reports, and lets couples manage money together through invite-based partner sharing. Its signature “Uruoi Check” feature lets users sort daily expenses with a simple flick to see which spending brings them the most satisfaction.',
      ja: 'GMO One Accountが提供する、すべての機能を無料で使える家計簿アプリ。銀行・クレジットカード・証券・投資信託・電子マネーの口座を自動で連携し、収支をカテゴリ別に可視化して月間レポートにまとめます。招待制のパートナー共有で、ふたりで家計を管理することもできます。日々の支出をフリックで仕分けて、満足度の高いお金の使い方を確かめられる「うるおいチェック」機能が特徴です。',
      vi: 'Ứng dụng quản lý chi tiêu gia đình miễn phí của GMO One Account, dùng được mọi tính năng mà không mất phí. Ứng dụng tự động liên kết tài khoản ngân hàng, thẻ tín dụng, chứng khoán, chứng chỉ quỹ và ví điện tử, trực quan hoá thu chi theo danh mục kèm báo cáo hằng tháng, và cho phép các cặp đôi cùng quản lý tiền nhờ tính năng chia sẻ với bạn đời qua lời mời. Điểm đặc trưng là “Uruoi Check”: chỉ cần vuốt nhẹ để phân loại các khoản chi hằng ngày và xem khoản nào mang lại sự hài lòng nhất.',
    },
    highlights: {
      en: [
        'Developed the iOS/Android app in Flutter and the backend APIs in Node.js through the July 2026 launch, and continue to maintain both.',
        "Integrated sign-in with the company's OIDC-based SSO (Authorization Code + PKCE).",
        'Built account linking for banks, credit cards, brokerages and e-money services.',
        'Designed the Git branching and release workflow around Shorebird code push and GitHub Rulesets.',
      ],
      ja: [
        'FlutterでiOS/Androidアプリ、Node.jsでバックエンドAPIを開発して2026年7月のリリースまで担当し、現在も両方を保守。',
        '社内のOIDCベースのSSO（Authorization Code + PKCE）によるログインを組み込み。',
        '銀行・クレジットカード・証券・電子マネーの口座連携機能を実装。',
        'Shorebirdのコードプッシュと GitHub Rulesets を前提に、Gitのブランチ運用とリリースフローを設計。',
      ],
      vi: [
        'Phát triển app iOS/Android bằng Flutter và backend API bằng Node.js đến khi ra mắt tháng 7/2026, và tiếp tục bảo trì cả hai.',
        'Tích hợp đăng nhập qua SSO dựa trên OIDC của công ty (Authorization Code + PKCE).',
        'Xây tính năng liên kết tài khoản ngân hàng, thẻ tín dụng, chứng khoán và ví điện tử.',
        'Thiết kế quy trình phân nhánh Git và phát hành xoay quanh Shorebird code push và GitHub Rulesets.',
      ],
    },
    tags: ['Flutter', 'Node.js'],
    company: 'gmo-financial-holdings',
    featured: true,
    links: [
      { type: 'web', url: 'https://kakeibo.1-account.com/' },
      { type: 'app-store', url: 'https://apps.apple.com/jp/app/id6771291118' },
      { type: 'google-play', url: 'https://play.google.com/store/apps/details?id=com.one_account.kakeibo' },
    ],
  },
  {
    id: 'clinic-map',
    title: { en: 'GMO Clinic Map', ja: 'GMOクリニック・マップ', vi: 'GMO Clinic Map' },
    start: '2025-08',
    end: null,
    summary: {
      en: 'Online medical care app by GMO Healthtech.',
      ja: 'GMOヘルステックのオンライン診療アプリ。',
      vi: 'Ứng dụng khám bệnh trực tuyến của GMO Healthtech.',
    },
    desc: {
      en: "GMO Healthtech's online medical care app, covering the full journey from finding a clinic and seeing a doctor online to getting prescriptions delivered at home. Users can see a doctor right away by joining a virtual waiting queue or book an appointment in advance, fill in a pre-consultation questionnaire, attend the consultation via video call, and pay by credit card.",
      ja: 'クリニック探しからオンライン診療、処方薬の自宅配送までをひとつにまとめた、GMOヘルステックのオンライン診療アプリ。順番待ちに並んですぐに受診することも、事前に予約することもでき、問診票の入力、ビデオ通話での診察、クレジットカードでの支払いまでアプリ内で完結します。',
      vi: 'Ứng dụng khám bệnh trực tuyến của GMO Healthtech, bao trọn hành trình từ tìm phòng khám, khám bệnh online đến nhận thuốc theo đơn tại nhà. Người dùng có thể khám ngay bằng cách vào hàng chờ ảo hoặc đặt lịch trước, điền phiếu hỏi bệnh trước khi khám, khám qua video call và thanh toán bằng thẻ tín dụng.',
    },
    highlights: {
      en: [
        'Developed the iOS/Android app in Flutter, released in July 2026.',
        'Integrated video consultations with the Amazon Chime SDK, bridging the native iOS/Android SDKs into Flutter via platform channels.',
        'Integrated real-time chat between patients and clinics.',
        'Implemented push notifications end to end: FCM server-side sending and APNs auth key setup for Development and Production.',
      ],
      ja: [
        'FlutterでiOS/Androidアプリを開発し、2026年7月にリリース。',
        'Amazon Chime SDKでビデオ診療を実装。iOS/AndroidのネイティブSDKをプラットフォームチャネルでFlutterに接続。',
        '患者とクリニック間のリアルタイムチャットを実装。',
        'プッシュ通知を一貫して実装：サーバーサイドのFCM送信と、開発・本番環境のAPNs認証キー設定。',
      ],
      vi: [
        'Phát triển app iOS/Android bằng Flutter, ra mắt tháng 7/2026.',
        'Tích hợp khám bệnh qua video bằng Amazon Chime SDK, nối SDK native iOS/Android vào Flutter qua platform channel.',
        'Tích hợp chat thời gian thực giữa bệnh nhân và phòng khám.',
        'Triển khai push notification trọn vẹn: gửi FCM phía server và cấu hình APNs auth key cho Development và Production.',
      ],
    },
    tags: ['Flutter', 'Amazon Chime SDK', 'FCM / APNs'],
    company: 'gmo-financial-holdings',
    links: [
      { type: 'app-store', url: 'https://apps.apple.com/jp/app/id6776960266' },
      { type: 'google-play', url: 'https://play.google.com/store/apps/details?id=com.gmo_clinic_map.app' },
    ],
  },
  {
    id: 'karabako',
    title: { en: 'Karabako byGMO', ja: '空箱 byGMO', vi: 'Karabako byGMO' },
    start: '2025-01',
    end: null,
    summary: {
      en: 'Coworking and rental space app by GMO Office Support.',
      ja: 'GMOオフィスサポートのレンタルスペース・コワーキング予約アプリ。',
      vi: 'Ứng dụng đặt coworking và không gian cho thuê của GMO Office Support.',
    },
    desc: {
      en: 'A space-sharing app by GMO Office Support for finding and using coworking and rental spaces across Japan. Users can search for spaces on a map, make bookings, or drop in at partner coworking spaces without a reservation and pay by the hour, checking in by scanning a QR code.',
      ja: '全国のコワーキングスペースやレンタルスペースを探して利用できる、GMOオフィスサポートのスペースシェアアプリ。地図からスペースを探して予約できるほか、提携コワーキングスペースなら予約なしでドロップイン利用でき、QRコードを読み取ってチェックインし、時間単位で支払えます。',
      vi: 'Ứng dụng chia sẻ không gian của GMO Office Support để tìm và sử dụng coworking, không gian cho thuê trên khắp Nhật Bản. Người dùng có thể tìm chỗ trên bản đồ và đặt chỗ, hoặc ghé thẳng các coworking đối tác mà không cần đặt trước, trả tiền theo giờ và check-in bằng cách quét mã QR.',
    },
    highlights: {
      en: [
        'Developed the iOS/Android app in Flutter through its launch and have maintained it since, starting at GMO-Z.com Financial System Vietnam and continuing at GMO Financial Holdings.',
        'Integrated fincode byGMO payments into the booking checkout, with card details tokenized by fincode so they never reach our own backend.',
        'Optimized map search with marker clustering, keeping panning and zooming smooth.',
      ],
      ja: [
        'FlutterでiOS/Androidアプリをリリースまで開発し、その後も保守を継続（GMO-Z.com Financial System Vietnamで開始し、GMOフィナンシャルホールディングスで継続）。',
        '予約の決済にfincode byGMOを組み込み、カード情報はfincodeでトークン化して自社バックエンドに渡らない構成に。',
        'マーカーのクラスタリングで地図検索を最適化し、移動・ズームを軽快に。',
      ],
      vi: [
        'Phát triển app iOS/Android bằng Flutter đến khi ra mắt và bảo trì từ đó, bắt đầu tại GMO-Z.com Financial System Vietnam và tiếp tục tại GMO Financial Holdings.',
        'Tích hợp thanh toán fincode byGMO vào bước đặt chỗ; thông tin thẻ được fincode token hoá nên không đi qua backend của mình.',
        'Tối ưu tìm kiếm trên bản đồ bằng gom cụm marker, giữ thao tác kéo và zoom mượt mà.',
      ],
    },
    tags: ['Flutter', 'fincode byGMO'],
    company: ['gmo-z-com-vietnam', 'gmo-financial-holdings'],
    links: [
      { type: 'web', url: 'https://karabako-gmo.com/' },
      { type: 'app-store', url: 'https://apps.apple.com/jp/app/id6744154394' },
      { type: 'google-play', url: 'https://play.google.com/store/apps/details?id=com.karabako_gmo.app' },
    ],
  },
  {
    id: 'click-365',
    title: { en: 'GMO Click 365', ja: 'GMO クリック 365', vi: 'GMO Click 365' },
    start: '2024-07',
    end: '2024-12',
    summary: {
      en: 'Multi-asset trading app by GMO Click Securities.',
      ja: 'GMOクリック証券のマルチアセット取引アプリ。',
      vi: 'Ứng dụng giao dịch đa tài sản của GMO Click Securities.',
    },
    desc: {
      en: "GMO Click Securities' integrated trading app that combines Click 365 (exchange-traded FX) and Click Kabu 365 (exchange-traded margin trading on stock indices such as the Nikkei 225 and Dow, as well as gold and crude oil) in a single app. Features include advanced split-screen charts with technical indicators, one-tap speed ordering from charts, an economic calendar, and instant deposits and withdrawals.",
      ja: '取引所FX「くりっく365」と、日経225やNYダウなどの株価指数、金・原油を対象とした取引所証拠金取引「くりっく株365」をひとつにまとめた、GMOクリック証券の取引アプリ。テクニカル指標付きの分割チャート、チャートからのワンタップのスピード注文、経済指標カレンダー、即時入出金などに対応しています。',
      vi: 'Ứng dụng giao dịch tích hợp của GMO Click Securities, gộp Click 365 (FX trên sàn) và Click Kabu 365 (giao dịch ký quỹ trên sàn với các chỉ số chứng khoán như Nikkei 225, Dow, cùng vàng và dầu thô) vào một app. Có biểu đồ chia màn hình nâng cao kèm chỉ báo kỹ thuật, đặt lệnh nhanh một chạm ngay trên biểu đồ, lịch kinh tế, nạp và rút tiền tức thì.',
    },
    highlights: {
      en: [
        'Developed the iOS/Android app in Flutter during its initial development phase, ahead of its launch in May 2025.',
        'Optimized chart rendering for real-time price updates to keep scrolling and zooming smooth.',
      ],
      ja: [
        '2025年5月のリリースに先立つ初期開発フェーズで、FlutterによるiOS/Androidアプリ開発を担当。',
        'リアルタイム価格のチャート描画を最適化し、スクロールやズームを滑らかに。',
      ],
      vi: [
        'Phát triển app iOS/Android bằng Flutter trong giai đoạn phát triển ban đầu, trước khi ra mắt tháng 5/2025.',
        'Tối ưu hiển thị biểu đồ khi giá cập nhật theo thời gian thực, giữ thao tác cuộn và zoom mượt mà.',
      ],
    },
    tags: ['Flutter'],
    company: 'gmo-z-com-vietnam',
    links: [
      { type: 'web', url: 'https://www.click-sec.com/corp/tool/365_app/' },
      { type: 'app-store', url: 'https://apps.apple.com/jp/app/id6742522864' },
      { type: 'google-play', url: 'https://play.google.com/store/apps/details?id=com.click_sec.gmoclick365' },
    ],
  },
  {
    id: 'click-cfd-apple-watch',
    title: {
      en: 'GMO Click CFD – Apple Watch App',
      ja: 'GMO クリック CFD – Apple Watch App',
      vi: 'GMO Click CFD – Apple Watch App',
    },
    start: '2024-01',
    end: '2024-06',
    summary: {
      en: "A watchOS companion for GMO Click Securities' CFD trading app.",
      ja: 'GMOクリック証券のCFD取引アプリのwatchOSコンパニオン。',
      vi: 'Ứng dụng watchOS đi kèm app giao dịch CFD của GMO Click Securities.',
    },
    desc: {
      en: "Apple Watch app for GMO Click CFD, GMO Click Securities' CFD trading app covering stock indices, commodities such as gold and oil, and foreign stocks. From the watch, users can check their buying power, follow rates and charts for their watchlist and open positions, view the economic calendar, and place orders, including jumping from a notification straight to the chart to trade.",
      ja: '株価指数、金・原油などの商品、外国株を取引できるGMOクリック証券のCFD取引アプリ「GMO クリック CFD」のApple Watch版。ウォッチから取引余力の確認、ウォッチリストや保有ポジションのレート・チャートの確認、経済指標カレンダーの閲覧、注文ができ、通知から直接チャートを開いて取引することもできます。',
      vi: 'App Apple Watch cho GMO Click CFD — ứng dụng giao dịch CFD của GMO Click Securities với chỉ số chứng khoán, hàng hoá như vàng, dầu và cổ phiếu nước ngoài. Ngay trên đồng hồ, người dùng có thể xem sức mua, theo dõi tỷ giá và biểu đồ của danh sách theo dõi và các vị thế đang mở, xem lịch kinh tế và đặt lệnh, kể cả mở thẳng biểu đồ từ thông báo để giao dịch.',
    },
    highlights: {
      en: [
        'Built the watchOS app from scratch with SwiftUI: rates, charts, buying power, economic calendar and order placement from the watch.',
        'Developed iPhone–Watch communication with WatchConnectivity, syncing account data from the iPhone app.',
        'Released in version 2.2.0 (June 2024).',
      ],
      ja: [
        'SwiftUIでwatchOSアプリをゼロから構築：レート、チャート、取引余力、経済指標カレンダー、ウォッチからの注文。',
        'WatchConnectivityでiPhoneとWatchの通信を実装し、iPhoneアプリから口座データを同期。',
        'バージョン2.2.0（2024年6月）でリリース。',
      ],
      vi: [
        'Xây app watchOS từ đầu bằng SwiftUI: tỷ giá, biểu đồ, sức mua, lịch kinh tế và đặt lệnh ngay trên đồng hồ.',
        'Làm phần giao tiếp iPhone – Watch bằng WatchConnectivity, đồng bộ dữ liệu tài khoản từ app iPhone.',
        'Phát hành ở phiên bản 2.2.0 (6/2024).',
      ],
    },
    tags: ['watchOS', 'SwiftUI', 'Swift'],
    company: 'gmo-z-com-vietnam',
    featured: true,
    links: [
      { type: 'web', url: 'https://www.click-sec.com/corp/tool/cfd_app/' },
      { type: 'app-store', url: 'https://apps.apple.com/jp/app/id1542314599' },
    ],
  },
  {
    id: 'click-fxneo',
    title: { en: 'GMO Click FXneo (iOS)', ja: 'GMO クリック FXneo (iOS)', vi: 'GMO Click FXneo (iOS)' },
    start: '2023-11',
    end: '2023-12',
    summary: {
      en: "In-app tutorial for GMO Click Securities' FX trading app.",
      ja: 'GMOクリック証券のFX取引アプリのアプリ内チュートリアル。',
      vi: 'Hướng dẫn trong app cho ứng dụng giao dịch FX của GMO Click Securities.',
    },
    desc: {
      en: "GMO Click Securities' FX trading app for iPhone, Apple Watch and Android, featuring real-time rates, advanced charting with technical indicators and drawing tools, ordering directly from charts, and a demo trading mode that requires no account.",
      ja: 'iPhone・Apple Watch・Androidに対応したGMOクリック証券のFX取引アプリ。リアルタイムのレート、テクニカル指標や描画ツールを備えた高機能チャート、チャートからの直接注文、口座なしで使えるデモ取引モードを搭載。',
      vi: 'Ứng dụng giao dịch FX của GMO Click Securities cho iPhone, Apple Watch và Android, có tỷ giá thời gian thực, biểu đồ nâng cao với chỉ báo kỹ thuật và công cụ vẽ, đặt lệnh trực tiếp trên biểu đồ, và chế độ giao dịch demo không cần tài khoản.',
    },
    highlights: {
      en: ["Developed an in-app tutorial that guides first-time traders through the app's core functions, shipped in version 1.12.0 (January 2024)."],
      ja: ['初めてのトレーダーに主要機能を案内するアプリ内チュートリアルを開発し、バージョン1.12.0（2024年1月）でリリース。'],
      vi: ['Phát triển tính năng hướng dẫn trong app giúp người mới làm quen các chức năng chính, phát hành ở phiên bản 1.12.0 (1/2024).'],
    },
    tags: ['Swift', 'UIKit'],
    company: 'gmo-z-com-vietnam',
    links: [
      { type: 'web', url: 'https://www.click-sec.com/corp/tool/fxneo_app/' },
      { type: 'app-store', url: 'https://apps.apple.com/jp/app/id1436251478' },
    ],
  },
  {
    id: 'mportal',
    title: 'm Portal App',
    start: '2022-09',
    end: '2023-02',
    summary: {
      en: 'App for poker players in Japan.',
      ja: '日本のポーカープレイヤー向けアプリ。',
      vi: 'Ứng dụng cho người chơi poker tại Nhật.',
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
    company: 'hblab',
  },
  {
    id: 'ana-pocket',
    title: 'ANA Pocket (iOS)',
    start: '2022-09',
    end: '2023-02',
    summary: {
      en: "ANA's rewards app for everyday movement.",
      ja: '日々の移動でポイントがたまるANAのアプリ。',
      vi: 'App tích điểm từ việc di chuyển hằng ngày của ANA.',
    },
    desc: {
      en: "ANA's official mobile app that rewards users with points for everyday movement, including walking, cycling, driving, trains and flights. Points can be used for rewards such as ANA miles, partner points and digital coupons, and the app visualizes each trip's transport mode, distance and time.",
      ja: '徒歩・自転車・車・電車・飛行機など、日々の移動でポイントがたまるANAの公式アプリ。ポイントはANAのマイルや提携ポイント、デジタルクーポンなどに交換でき、移動ごとの手段・距離・時間も可視化されます。',
      vi: 'Ứng dụng chính thức của ANA, tặng điểm cho việc di chuyển hằng ngày như đi bộ, đạp xe, lái xe, đi tàu và đi máy bay. Điểm có thể đổi lấy dặm ANA, điểm của đối tác hoặc coupon điện tử, và app hiển thị phương tiện, quãng đường, thời gian của từng chuyến đi.',
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
    company: 'hblab',
    links: [
      { type: 'web', url: 'https://www.ana.co.jp/ja/jp/share/ana-pocket/' },
      { type: 'app-store', url: 'https://apps.apple.com/jp/app/id1598209192' },
    ],
  },
  {
    id: 'kiddihub',
    title: 'KiddiHub',
    start: '2021-09',
    end: '2022-08',
    summary: {
      en: 'Preschool review and comparison platform.',
      ja: '幼稚園・保育園の口コミ・比較プラットフォーム。',
      vi: 'Nền tảng đánh giá và so sánh trường mầm non.',
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
    company: 'hblab',
  },
];
