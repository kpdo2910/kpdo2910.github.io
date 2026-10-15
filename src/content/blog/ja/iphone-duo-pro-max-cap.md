---
title: 'Pro Maxより大きくしない：iPhone専用のFlutterアプリをiPhone Duoに対応させる'
summary: 'iPhone専用・縦画面固定のFlutterアプリを、タブレット用レイアウトを作らずにiPhone Duoへ対応させました。スケールをiPhone Pro Maxで頭打ちにし、高さでも制限し、サイズをキャッシュしている箇所を洗い出した話です。'
lead: 'iPadに一度も対応したことのないアプリを、タブレット用のレイアウトを1つも作らずにAppleの折りたたみ端末で動かした方法。'
date: 2026-10-15
tags: ['flutter', 'ios']
---

## TL;DR

- 私たちのFlutterアプリはiPhone専用で、縦画面に固定しています。すべての画面は幅360ptのキャンバスでデザインされ、`flutter_screenutil`で`画面幅 / 360`の倍率に拡大縮小しています。
- iOS 27 SDKでビルドすると、アプリはiPhone Duoで全画面表示されます。開いた状態では縦で1.86倍、横で2.64倍のスケールになり、閉じた状態では縦向きのステータスバーにコンテンツが重なりました。
- 新しいフォームファクタ向けにデザインするのではなく、Duoを既にリリースしている最大の画面に当てはめます。**UIはiPhone Pro Max（1.22倍）より大きくならず**、レイアウトがiPhone SEより「背の低い」比率になることもありません。
- 既存のスマホには、仕組み上まったく影響しません。補正がかかるのは、幅が450ptを超える画面か、左右にセーフエリアがある画面だけです。
- 本当に手間がかかったのは、その後に続く細かな修正の数々でした。折りたたみ端末ではスケール係数が実行中に変わるため、スケール後の値をキャッシュしていた箇所がすべてバグになりました。

## 出発点：幅のことを考える必要がなかったアプリ

私たちはFlutterで家計簿アプリを開発しています。iOSでは最初からiPhone専用（`TARGETED_DEVICE_FAMILY = 1`）で、縦画面に固定しています。

デザインは360 × 844のキャンバスで作られていて、[`flutter_screenutil`](https://pub.dev/packages/flutter_screenutil)が小さな拡張を通して、すべてを画面幅に比例して拡大縮小します。

```dart
extension DoubleScreenUtilExt on num {
  double get res => w; // デザイン単位 → pt。幅に比例してスケール
  double get resFont => sp.clamp(toDouble(), toDouble() * 2); // フォント：1〜2倍
}
```

つまり`16.res`は、幅360ptの画面では16pt、幅440ptのiPhone Pro Maxでは約19.6ptになります。対応しているスマホは320pt（初代iPhone SE、または拡大表示）から448dp（AndroidのPixel Pro XL）まであり、スケールは0.89倍から1.24倍の間に収まります。私たちのデザインは、ずっとこの範囲の中で使われてきました。

> **後で効いてくる細かい点：フォントも幅に合わせてスケールします。** `ScreenUtilInit`には`enableScaleText: () => false`を渡していますが、flutter_screenutil 5.9.xの`.sp`は`fontSizeResolver`を経由し、そのデフォルトは`FontSizeResolvers.width`です。そのため`.sp`は`enableScaleText`ではなく`enableScaleWH`に従います。幅のスケールに手を加えれば、テキストにも同じことが起きます。

## iPhone Duoで起きたこと

iPhone Duoには、5.4インチの外側ディスプレイと7.6インチの内側ディスプレイがあります。iOS 27 SDKでビルドしたところ、アプリはどちらのディスプレイでも全画面で動くようになりました。iOS 27.1シミュレータで計測した結果がこちらです。

| 状態 | ウィンドウ（pt） | セーフエリア（`viewPadding`） | スケール（倍） |
|---|---|---|---|
| 閉じた状態 | 466 × 678 | 右84、下34 | 1.29 |
| 開いた状態・縦 | 669 × 951 | 上82、下34 | 1.86 |
| 開いた状態・横 | 951 × 669 | 右84、下34 | 2.64 |

それぞれの状態で起きたこと：

- **閉じた状態：** ステータスバーが右端に沿って縦に表示されます。`SafeArea`のない画面は、その下に描画されました。`SafeArea`のある画面は466pt用にスケールされたのに382ptしか使えず、はみ出しました。
- **開いた状態・縦：** すべてが巨大になりました。
- **開いた状態・横：** 内側ディスプレイでは縦画面固定が効かず、2.64倍のレイアウトは高さ669ptに収まりません。

```text
閉じた状態（幅466pt）
┌────────────────────────────┬─────┐
│                            │  ▌  │
│           382pt            │  ▌  │ ← 縦向きのステータスバー
│                            │  ▌  │   （右のセーフエリア：84pt）
│                            │     │
└────────────────────────────┴─────┘
  ↑ コンテンツ領域
```

しかもDuoは、どのスマホとも違い、アプリの実行中にこれらの状態を行き来します。

## 最初の試み：スケーリングを切る

最初の修正は1行だけでした。`enableScaleWH: () => false`です。これでDuoでUIが巨大化することはなくなりました。しかし、ほとんどのスマホは360ptのキャンバスより幅が広く、1倍より大きいスケールで動いていました。iPhone 16なら1.09倍、Pro Maxなら1.22倍です。スケーリングを切るとそれらがすべて縮み、フォントも幅のスケールに従うのでテキストも縮みます。Pro Maxのユーザーから見れば、アップデートした途端にアプリ全体が18%小さくなるわけです。この変更は取り消しました。

## なぜアダプティブレイアウトにしないのか

教科書どおりの解決策はアダプティブデザインです。ブレークポイント、2ペインの画面、場合によってはナビゲーションレール。iPadアプリならそれが正解です。しかし私たちにとっては、タブレットをターゲットにしたことが一度もないアプリで、1つの新しい端末のためにすべての画面をデザインし直すことを意味しました。それが終わるまで対応を止めておきたくはありませんでした。

## アイデア：Duoを大きなiPhoneとして扱う

Duoで何か新しい見せ方をしたいわけではありません。既にリリースしてテスト済みの見た目になってくれればいいのです。これまでリリースしてきた中で最大の画面はiPhone Pro Maxで、幅440pt、スケール1.22倍です。そこで1つ目のルールはこうなります。

> **UIをiPhone Pro Maxでの表示より大きくスケールしない。**

これだけでは足りません。Duoは横向きのときと閉じたときに、高さが*低い*からです。高さ956ptのPro Maxに収まる1.22倍のレイアウトは、使える高さが635ptしかなければ収まりません。そこで2つ目のルールとして、スケールを高さでも制限します。基準には、対応している中でも特に背の低いスマホの1つであるiPhone SE（第2・第3世代）を使います。セーフエリアは375 × 647ptです。

> **iPhone SEより背の低い比率にはしない。**

SEの幅375ptで高さ647ptに収まるものは、スケール幅をH × 375 / 647にすれば、高さH ptにも収まります。（これは幅基準の単位でサイズを決めているものすべてに当てはまります。`.h`はこれまでどおり実際の高さでスケールします。）

まとめると、次のようになります。

```text
contentWidth = screenWidth  − leftSafeArea − rightSafeArea
usableHeight = screenHeight − topSafeArea  − bottomSafeArea

scaleWidth = min(contentWidth, 440, usableHeight × 375 / 647)
scale      = scaleWidth / 360
```

さらに、既存のスマホで何も変わらないように、条件を1つ加えます。

> **左右のセーフエリアがなく、画面幅が450pt以下なら、何も変えない。**

なぜ440ではなく450なのか。Pixel 8 Pro、9 Pro XL、10 Pro XLは、デフォルトの表示サイズで幅448dpです。しきい値を440にすると、これらの端末で表示が縮んでしまいます。

Duoでは次のようになります。

| 状態 | コンテンツ幅 | スケール幅 | 制限の要因 | スケール（倍）：変更前 → 変更後 |
|---|---|---|---|---|
| 閉じた状態 | 382 | 373 | 高さ | 1.29 → **1.04** |
| 開いた状態・縦 | 669 | 440 | Pro Maxの上限 | 1.86 → **1.22** |
| 開いた状態・横 | 867 | 368 | 高さ | 2.64 → **1.02** |

3つとも、既存のスマホがカバーしている範囲（0.89〜1.24倍）に収まります。

この方法が*しない*ことにも注目してください。アプリを幅440ptの列に閉じ込めてレターボックス表示するわけではありません。レイアウトにはコンテンツ幅がそのまま与えられます。伸びるもの（リスト、アプリバー、シート）は画面全体を使い、固定サイズのものはPro Maxのサイズになります。開いたディスプレイで得られるのは、大きなボタンではなく、広いスペースです。

## 実装

部品は3つで、すべてウィジェットツリーの最上部に置きます。そのため、アプリの残りの部分はこの仕組みの存在を知る必要がありません。

```text
AppScreenUtilInit                 ← 大きさを決める（.resのスケール）
└── MaterialApp.router
    └── builder: AppContentFrame  ← 配置を決める（コンテンツ領域）
        └── Navigator             ← すべてのページ、ダイアログ、ボトムシート
```

### 1. `AppLayoutMetrics`：`MediaQueryData`の純粋関数

```dart
@immutable
class AppLayoutMetrics {
  // プライベートコンストラクタとフィールドは省略：
  // insetLeft, insetRight, contentWidth, scaleWidth, isAdjusted

  factory AppLayoutMetrics.fromMediaQuery(MediaQueryData data) {
    final size = data.size;
    final insets = data.viewPadding;
    final hasSideInsets = insets.left > 0 || insets.right > 0;

    // 左右のインセットがないスマホ：ウィンドウをそのまま使う。
    if (size.isEmpty ||
        (!hasSideInsets && size.width <= DeviceConstants.maxMobileWidth)) {
      return AppLayoutMetrics._(
        insetLeft: 0,
        insetRight: 0,
        contentWidth: size.width,
        scaleWidth: size.width,
        isAdjusted: false,
      );
    }

    final contentWidth = math.max(0.0, size.width - insets.left - insets.right);
    final usableHeight = math.max(
      0.0,
      size.height - insets.top - insets.bottom,
    );
    // iPhone SE（セーフエリア375 × 647）より背の低い比率にしない。
    final heightBoundWidth =
        usableHeight *
        DeviceConstants.scaleReferenceSafeWidth /
        DeviceConstants.scaleReferenceSafeHeight;

    return AppLayoutMetrics._(
      insetLeft: insets.left,
      insetRight: insets.right,
      contentWidth: contentWidth,
      scaleWidth: math.min(
        contentWidth,
        math.min(DeviceConstants.maxScaleWidth, heightBoundWidth), // 440
      ),
      isAdjusted: true,
    );
  }

  /// サイズが変わったとき、またはサイズは同じでスケール幅だけが
  /// 変わったとき（インセットが遅れて届いた場合）に再構築する。
  static bool shouldRebuildScale(MediaQueryData old, MediaQueryData data) {
    return old.size != data.size ||
        AppLayoutMetrics.fromMediaQuery(old).scaleWidth !=
            AppLayoutMetrics.fromMediaQuery(data).scaleWidth;
  }
}
```

`padding`ではなく`viewPadding`を読みます。キーボードが開くと`padding.bottom`は0になるので、`padding`から計算したスケールは、キーボードが表示されるたびに変わり、アプリ全体のレイアウトがやり直されてしまいます。また純粋関数なので、テストの大半はここで行います。

### 2. `AppScreenUtilInit`：誰かが読む前にスケールを上書きする

`ScreenUtilInit.build`は`ScreenUtil.configure(data: <実際のウィンドウ>)`を呼んでから、`builder`を呼びます。`ScreenUtil`はシングルトンなので、builderの先頭でウィンドウ幅を`scaleWidth`に置き換えてもう一度`configure`を呼べば、その値がすべての子孫に適用されます。

```dart
class AppScreenUtilInit extends StatelessWidget {
  const AppScreenUtilInit({required this.builder, super.key});

  final WidgetBuilder builder;

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      enableScaleWH: () => true,
      enableScaleText: () => false,
      designSize: const Size(
        DeviceConstants.designWidth, // 360
        DeviceConstants.designHeight, // 844
      ),
      rebuildFactor: AppLayoutMetrics.shouldRebuildScale,
      builder: (context, _) {
        // ScreenUtilInit自身と同じく、Viewから読む。
        // MediaQuery.ofだと、キーボードが動くたびにアプリ全体が再構築される。
        final data = MediaQueryData.fromView(View.of(context));
        final metrics = AppLayoutMetrics.fromMediaQuery(data);
        if (metrics.isAdjusted) {
          ScreenUtil.configure(
            data: data.copyWith(
              size: Size(metrics.scaleWidth, data.size.height),
            ),
          );
        }
        return builder(context);
      },
    );
  }
}
```

ここには、あまり自明でない点が2つあります。

- **`MediaQuery.of(context)`を使わない。** ここはアプリのルートです。ここで`MediaQuery`に依存すると、キーボードが開閉するたびにすべてが再構築されます。
- **独自の`rebuildFactor`。** `ScreenUtilInit`は`rebuildFactor(old, new)`がtrueを返したときだけサブツリーを再構築し、デフォルトの`RebuildFactors.size`はサイズしか比較しません。端末を折りたたんだとき、新しいサイズと新しい左右のインセットが同時に届くとは限りません。サイズだけを見るルールでは、インセットが届く前に計算したスケールがそのまま残ってしまいます。

副作用が1つあります。上書きした後の`ScreenUtil().screenWidth`は、実際の幅ではなくスケール幅を返します。私たちは使っていませんが、使っている場合は気をつけてください。

### 3. `AppContentFrame`：コンテンツ領域を切り出す

これは`MaterialApp.router`の`builder`に置くので、`Navigator`と、そこにプッシュされるすべてを包みます。

```dart
@override
Widget build(BuildContext context) {
  final data = MediaQuery.of(context);
  final theme = Theme.of(context);
  final metrics = AppLayoutMetrics.fromMediaQuery(data);
  final hasSideInsets = metrics.insetLeft > 0 || metrics.insetRight > 0;

  // 調整してもしなくても同じ構造にする。構造が変わると
  // Navigatorが作り直され、ナビゲーションスタックが失われる。
  return DecoratedBox(
    decoration: hasSideInsets
        ? BoxDecoration(color: context.colorTheme.background)
        : const BoxDecoration(),
    child: Padding(
      padding: EdgeInsets.only(
        left: metrics.insetLeft,
        right: metrics.insetRight,
      ),
      child: MediaQuery(
        data: metrics.isAdjusted
            ? data
                  .removeViewPadding(removeLeft: true, removeRight: true)
                  .copyWith(size: Size(metrics.contentWidth, data.size.height))
            : data,
        child: Theme(
          data: metrics.isAdjusted
              ? _themeWithPhoneDialogWidth(context, theme, metrics)
              : theme,
          child: child,
        ),
      ),
    ),
  );
}
```

- **左右のセーフエリアは、アプリ全体で一度だけ処理します。** 子孫が受け取る`MediaQuery`は、`size`がコンテンツ領域で、左右の`padding`と`viewPadding`が0です。既存のコード（`SafeArea`、`MediaQuery.sizeOf(context).width`、全幅のレイアウト）は、幅の狭いスマホで動いているかのように振る舞い、`SafeArea`のない画面もステータスバーの下に描画されなくなります。
- **ツリーの形は変えません。** 調整が要らないときは`return child;`としたくなります。しかし調整は、アプリの実行中にオンにもオフにもなります（たとえばSplit Viewに入ったとき）。`Navigator`より上のウィジェットの型が変わると、Flutterはそのサブツリーを破棄し、ユーザーのナビゲーションスタックも一緒に消えます。そこで常に同じ`DecoratedBox → Padding → MediaQuery → Theme`のチェーンを組み、値だけを変えています。
- **ダイアログの幅はスマホの幅を上限にします。** 私たちのダイアログコンポーネントは中身を`IntrinsicHeight`で包んでいて、これはダイアログに許される最大幅で中身を測ります。669ptの画面では、その幅は中身が実際にレイアウトされる幅よりはるかに広いので、テキストは実際に折り返される行数より少なく測られ、ダイアログの高さが足りなくなります。そこで、スマホでダイアログが得る幅を上限にしています。

```dart
/// Materialのデフォルトのダイアログ最小幅。
static const _dialogMinWidth = 280.0;

ThemeData _themeWithPhoneDialogWidth(
  BuildContext context,
  ThemeData theme,
  AppLayoutMetrics metrics,
) {
  final maxWidth = metrics.scaleWidth - context.spacingTheme.lg * 2;
  return theme.copyWith(
    dialogTheme: theme.dialogTheme.copyWith(
      constraints: BoxConstraints(
        // 背の低い画面ではmaxWidthが280を下回ることがあり、
        // minがmaxを超えてはならない。
        minWidth: math.min(_dialogMinWidth, maxWidth),
        maxWidth: maxWidth,
      ),
    ),
  );
}
```

この`math.min`は欠かせません。背の低いウィンドウ（たとえば横向きで端末を閉じた直後）では、`maxWidth`が280を下回ることがあります。不正な`BoxConstraints`は、単に無視されるわけではありません。`BoxConstraints.==`は制約が有効であることをassertし、`ThemeData`の等価比較は最終的にその制約を比較します。デバッグビルドでは、画面全体が赤くなります。

全体のつなぎ込みはこうなります。

```dart
AppScreenUtilInit(
  builder: (context) => MaterialApp.router(
    routerConfig: router,
    builder: (context, child) => AppContentFrame(child: child!),
  ),
);
```

## 細かな修正の数々：スケールはもう定数ではない

スマホでは、`1.res`はプロセスが生きている間ずっと固定です。Duoでは、ユーザーが端末を閉じたり、開いたり、回転させたりするたびに変わります。そのとき`ScreenUtilInit`がツリーを再構築対象にするので、`build`の中で計算しているものは問題ありません。一度計算して保持しているものは、すべてバグになります。見つかったのは次のとおりです。

1. **`static final`のサイズ。** `static final _tabHeight = 48.res;`は一度だけ、初めて読まれた時点のスケールで評価されます。修正：`static double get _tabHeight => 48.res;`
2. **フィールド初期化子。** `State`のフィールド初期化子で作っていた、`32.res`のアイコンのリスト。修正：getterにする。
3. **サイズから決まる不変のパラメータを持つコントローラ。** バナーのカルーセルは、画面幅から`PageController`を一度だけ作っていました。`viewportFraction`はfinalなので、比率が変わったらコントローラを作り直し、現在のページを引き継ぎ、古いコントローラはフレームの後で破棄するようにしました。

   ```dart
   @override
   void didChangeDependencies() {
     super.didChangeDependencies();
     final pageWidth = MediaQuery.sizeOf(context).width;
     final viewportFraction = (pageWidth - _sideMargin * 2) / pageWidth;
     final oldController = _pageController;
     if (oldController?.viewportFraction == viewportFraction) {
       return;
     }
     final currentPage = oldController != null && oldController.hasClients
         ? oldController.page?.round()
         : null;
     _pageController = PageController(
       viewportFraction: viewportFraction,
       initialPage: currentPage ?? 0,
     );
     if (oldController != null) {
       // 新しいPageViewに引き継がれてから破棄する。
       WidgetsBinding.instance.addPostFrameCallback(
         (_) => oldController.dispose(),
       );
     }
   }
   ```

   私たちの無限ページビューは最初に渡されたコントローラを持ち続けるので、`ObjectKey(_pageController)`をキーにして、新しいコントローラで作り直されるようにもしています。
4. **キャッシュした計測値。** 独自の数字キーボードは自身の高さをキャッシュし、追加のボトムインセットとして公開しています。今は`didChangeDependencies`の中で、post-frameコールバックを使って測り直しています。公開すると祖先に通知が飛び、それはビルド中には行えないからです。
5. **オーバーレイの位置決め。** コーチマークのオーバーレイは、`initState`で`localToGlobal(Offset.zero)`を使ってレイアウトを一度だけ計算していました。今はサイズが変わるたびに再計算し、`ancestor:`も渡しています。コンテンツ領域が画面の左端から始まるとは限らなくなったからです。（例外は、本当に画面座標が必要なAPIで、たとえば共有シートの`sharePositionOrigin`です。）
6. **ルート作成時に取り込んだ値。** 全画面のボトムシートは`createRoute`で親の`viewPadding`をコピーしていたので、端末を閉じると古い値のままになっていました。今はシートのbuilderの中で読んでいます。またMaterial 3はデフォルトでボトムシートの幅を640ptに制限するので、全画面のシートには`constraints: const BoxConstraints()`を渡しています。
7. **縮まないテキスト。** `.resFont`は1倍を下回らないので、幅360ptより狭いウィンドウ（たとえばSplit View）では、ボックスは縮んでもテキストは縮みません。そのせいでチャートのラベルがはみ出しました。`Flexible`と`FittedBox(fit: BoxFit.scaleDown)`で包むと、収まらないときだけ縮むようになります。
8. **スクロールしない画面での、幅から決まる高さ。** 取引を1枚ずつカードで確認していくカードスワイプの画面があり、スクロールせずに1画面に収まるようになっています。アクションボタンは幅から高さが決まるので、幅の広い画面ではボタンが高くなり、この画面の主役であるカードを圧迫していました。今はボタンの幅をスマホの幅で頭打ちにし、空いた高さの分だけカードを大きくしています。ただし拡大率は、画面幅がスマホの幅の何倍あるかを上限にしています。

一般的なルールはコードの隣にある仕様書に書いたので、誰も同じことを再発見する必要はありません。

- `MediaQuery.sizeOf(context).width`は画面幅ではなく、コンテンツ幅。
- `.res`の値を`static final`やフィールドに保存しない。getterを使うか、`build`の中で計算する。
- `localToGlobal`でオーバーレイの位置を決めるときは`ancestor`を渡す。
- スクロールしない画面では、幅から決まる要素をスマホの幅で頭打ちにし、高さはメインのコンテンツに回す。

1つ目の種類を自分のコードベースで手早く探すには、次のコマンドが使えます。独自の拡張があれば、リストに加えてください（私たちの場合は`res`）。

```bash
grep -rnE 'static (late )?final .*[0-9]\.(w|h|r|sp)([^A-Za-z0-9_]|$)' lib/
```

複数行にわたる初期化子や、`initState`で計算した値は見つけられませんが、手始めにはなります。

## 実機なしでのテスト

この作業はiPhone Duoの発売前に行ったので、ほぼすべてを、Duoのウィンドウを模したウィジェットテストでカバーしています。

```dart
const _pixelRatio = 3.0;

void _setWindow(
  WidgetTester tester,
  Size size, {
  FakeViewPadding padding = const FakeViewPadding(),
}) {
  tester.view.devicePixelRatio = _pixelRatio;
  tester.view.physicalSize = size * _pixelRatio;
  // FakeViewPaddingは物理ピクセル単位。
  tester.view.padding = padding;
  tester.view.viewPadding = padding;
  addTearDown(tester.view.reset);
}

testWidgets('scales to fit inside the side inset on iPhone Duo (closed)', (
  tester,
) async {
  _setWindow(
    tester,
    const Size(466, 678),
    padding: const FakeViewPadding(
      right: 84 * _pixelRatio,
      bottom: 34 * _pixelRatio,
    ),
  );
  late double width;
  late double height;

  await tester.pumpWidget(
    AppScreenUtilInit(
      // ScaleProbeはbuildメソッドから360.resと844.hを報告する。
      builder: (_) => ScaleProbe(
        onBuild: (w, h) {
          width = w;
          height = h;
        },
      ),
    ),
  );

  // 高さで制限される：382ptのコンテンツ幅より狭い。
  expect(width, closeTo(644 * 375 / 647, 0.001));
  // 高さのスケールは変わらない。
  expect(height, closeTo(678, 0.001));
});
```

特に役に立ったテストは次のとおりです。

- **既存のスマホでは完全に素通り。** スマホの一覧表（初代と第3世代のiPhone SE、iPhone 16、iPhone Pro Max、一般的なAndroidスマホ、幅448dpのPixel Pro XL、どのスマホより狭いSplit Viewのウィンドウ）で、メトリクスが元のウィンドウと一致することを確認します。安心してリリースできるのは、このテストのおかげです。
- **境界値。** 左右のインセットなしで幅450ptならスマホ。451ptならスマホではない。
- **キーボードでスケールが変わらない。**
- **サイズより後に届くインセット。** サイズを`pump`し、次にインセットを`pump`して、スケールが追従することを確認します。
- **閉じたり回転したりしても、ナビゲーションの状態が残る。** iPhoneのサイズから始めて、閉じた状態 → 開いた状態 → 横向き → 閉じた状態と切り替え、ページの`State`が一度だけ作られ、同じオブジェクトのままであることを確認します。
- **細かな修正1つにつき、回帰テスト1つ。** カルーセルのコントローラは幅が変わったときだけ作り直される、キーボードが開いている間もキーボードのインセットが更新される、横向きでもダイアログが中身に合った高さになる、などです。

## 結果とトレードオフ

- **既存のスマホは何も変わりません。** 条件によってメトリクスは素通りになり、端末の一覧表がそれを保証します。
- **iPhone Duoは3つの状態すべてで1.02〜1.22倍に収まります。** 既存のスマホがカバーしている範囲の内側で、ステータスバーの下に描画されるものもありません。
- **このトレードオフは意図的なものです。** 開いたディスプレイで見せるのは、タブレットのUIではなく、広くなったスマホのUIです。Duoのユーザーが無視できない割合になれば、アダプティブレイアウトに投資する価値が出てきます。そのとき、この仕組みが安定した土台になります。
- **Duo専用の処理は何もありません。** ルールは左右のセーフエリアがあるか、幅が450ptを超えると発動するので、それより広いAndroidのタブレットや折りたたみ端末も同じ扱いになり、左側のインセットも右側と同じように処理されます。（当初は、端末を180°回転させるとDuoのステータスバーが左に移ると思っていました。実際は右のままです。それでも両側に対応しています。）
- **注意：** この記事のiPhone Duoの数値は、すべてiOS 27.1シミュレータで計測したものです。実機でも改めて確認する予定です。

## 学んだこと

1. スマホにしかリリースしたことがないなら、最大のスマホこそが、テスト済みで動作が分かっている構成です。新しい端末はその先へ外挿せず、そこに収めましょう。
2. スケールは幅だけでなく高さでも制限しましょう。基準には、既に対応している背の低いスマホを使います。
3. 調整はツリーの最上部で、スケールは1か所、コンテンツ領域は別の1か所で行いましょう。そうすれば、アプリの残りの部分は何も知らずに済みます。
4. 既存の端末では「何もしない」経路が確実に何もしないことを証明できるようにし、端末の一覧表としてテストで固定しましょう。
5. 折りたたみ端末では、スケールは変数です。それをキャッシュしているものをすべて探し出しましょう。

---

*バージョン：Flutter 3.41.8、flutter_screenutil 5.9.3、iOS 27.1シミュレータ*
