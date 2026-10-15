---
title: 'Never bigger than a Pro Max: fitting an iPhone-only Flutter app onto the iPhone Duo'
summary: 'Our Flutter app is iPhone-only and portrait-only. Instead of designing tablet layouts for the iPhone Duo, we cap its scale at an iPhone Pro Max, bound it by height, and hunt down everything that cached a size.'
lead: "How we made an app that has never supported iPad work on Apple's foldable, without designing a single tablet layout."
date: 2026-10-15
tags: ['flutter', 'ios']
---

## TL;DR

- Our Flutter app is iPhone-only and portrait-only. Every screen is designed on a 360pt-wide canvas and scaled with `flutter_screenutil` by `screen width / 360`.
- Built with the iOS 27 SDK, the app runs full screen on the iPhone Duo. Unfolded, that meant a 1.86× scale in portrait and 2.64× in landscape. Folded, content collided with the vertical status bar.
- Instead of designing for a new form factor, we map the Duo onto the largest screen we already ship on: **the UI never scales beyond an iPhone Pro Max (1.22×)**, and the layout never gets "squatter" than an iPhone SE.
- Existing phones are left alone by construction. The correction only kicks in for screens wider than 450pt or with left/right safe areas.
- The bigger job was the long tail. On a foldable the scale factor changes at runtime, so every place that cached a scaled value became a bug.

## The starting point: an app that never had to think about width

We build a household-budgeting app in Flutter. On iOS it has always been iPhone-only (`TARGETED_DEVICE_FAMILY = 1`) and locked to portrait.

Designs are drawn on a 360 × 844 canvas, and [`flutter_screenutil`](https://pub.dev/packages/flutter_screenutil) scales everything in proportion to the screen width, through a small extension:

```dart
extension DoubleScreenUtilExt on num {
  double get res => w; // design units → points, scaled by width
  double get resFont => sp.clamp(toDouble(), toDouble() * 2); // fonts: 1×–2×
}
```

So `16.res` is 16pt on a 360pt-wide screen and about 19.6pt on a 440pt-wide iPhone Pro Max. Across the phones we support, from 320pt (iPhone SE 1st gen, or Display Zoom) to 448dp (Pixel Pro XL on Android), that's a scale between 0.89× and 1.24×. That's the range our designs have always lived in.

> **A detail that matters later: fonts scale with the width too.** We pass `enableScaleText: () => false` to `ScreenUtilInit`, but in flutter_screenutil 5.9.x `.sp` goes through `fontSizeResolver`, which defaults to `FontSizeResolvers.width`. So `.sp` follows `enableScaleWH`, not `enableScaleText`. Whatever you do to the width scale, you also do to your text.

## What the iPhone Duo did to it

The iPhone Duo has a 5.4-inch outer display and a 7.6-inch inner display. Once we built with the iOS 27 SDK, our app ran full screen on both. This is what we measured on the iOS 27.1 simulator:

| State | Window (pt) | Safe area (`viewPadding`) | Scale |
|---|---|---|---|
| Folded | 466 × 678 | right 84, bottom 34 | 1.29× |
| Unfolded, portrait | 669 × 951 | top 82, bottom 34 | 1.86× |
| Unfolded, landscape | 951 × 669 | right 84, bottom 34 | 2.64× |

What went wrong in each state:

- **Folded:** the status bar runs vertically down the right edge. Screens without a `SafeArea` drew under it. Screens with one were scaled for 466pt but only had 382pt, so they overflowed.
- **Unfolded, portrait:** everything was enormous.
- **Unfolded, landscape:** our portrait lock doesn't hold on the inner display, and a 2.64× layout doesn't fit in 669pt of height.

```text
Folded, 466pt wide
┌────────────────────────────┬─────┐
│                            │  ▌  │
│   content area: 382pt      │  ▌  │ ← vertical status bar
│                            │  ▌  │   (right safe area: 84pt)
│                            │     │
└────────────────────────────┴─────┘
```

And unlike any phone, the Duo moves between these states while the app is running.

## First attempt: turn scaling off

Our first fix was a one-liner: `enableScaleWH: () => false`. That stopped the UI from blowing up on the Duo. But most phones are wider than our 360pt canvas, so they had been running above 1×: an iPhone 16 at 1.09×, a Pro Max at 1.22×. Turning scaling off shrank all of them, text included, because fonts follow the width scale. A Pro Max user would have seen the whole app get 18% smaller after an update. We reverted it.

## Why not adaptive layouts?

The textbook fix is adaptive design: breakpoints, two-pane screens, maybe a navigation rail. For an iPad app, that's the right call. For us it meant redesigning every screen for one new device, in an app that has never had a tablet target. We didn't want to block on that.

## The idea: treat the Duo as a big iPhone

We don't need the Duo to look good in some new way. We need it to look like something we've already shipped and tested. The biggest thing we've shipped on is the iPhone Pro Max: 440pt wide, a 1.22× scale. So the first rule is:

> **Never scale the UI beyond what an iPhone Pro Max shows.**

That isn't enough on its own, because the Duo is also *short*, in landscape and when folded. A 1.22× layout that fits a 956pt-tall Pro Max won't fit in 635pt of usable height. So the second rule bounds the scale by height. As the reference we use the iPhone SE (2nd/3rd gen), one of the squattest phones we support, with a 375 × 647pt safe area:

> **Never be squatter than an iPhone SE.**

Anything that fits in the SE's 647pt of height at its 375pt width also fits in H points of height at a scale width of H × 375 / 647. (That holds for anything sized in width-based units. `.h` still scales with the real height, as it always did.)

Together:

```text
contentWidth = screenWidth  − leftSafeArea − rightSafeArea
usableHeight = screenHeight − topSafeArea  − bottomSafeArea

scaleWidth = min(contentWidth, 440, usableHeight × 375 / 647)
scale      = scaleWidth / 360
```

Plus one gate, so nothing changes for existing phones:

> **If there are no left/right safe areas and the screen is at most 450pt wide, change nothing.**

Why 450 and not 440? The Pixel 8 Pro, 9 Pro XL and 10 Pro XL are 448dp wide at their default display size. A 440 threshold would have shrunk them.

On the Duo:

| State | Content width | Scale width | Limited by | Scale: before → after |
|---|---|---|---|---|
| Folded | 382 | 373 | height | 1.29× → **1.04×** |
| Unfolded, portrait | 669 | 440 | Pro Max cap | 1.86× → **1.22×** |
| Unfolded, landscape | 867 | 368 | height | 2.64× → **1.02×** |

All three land inside the range our phones already cover (0.89×–1.24×).

Note what this doesn't do: it doesn't letterbox the app into a 440pt column. The layout still gets the full content width. Anything that stretches (lists, app bars, sheets) uses the whole screen, and anything with a fixed size is Pro Max-sized. On the unfolded display you get more room, not bigger buttons.

## Implementation

There are three pieces, all at the top of the widget tree, so the rest of the app doesn't need to know any of this exists:

```text
AppScreenUtilInit                 ← how big things are (the .res scale)
└── MaterialApp.router
    └── builder: AppContentFrame  ← where things go (the content area)
        └── Navigator             ← every page, dialog and bottom sheet
```

### 1. `AppLayoutMetrics`: a pure function of `MediaQueryData`

```dart
@immutable
class AppLayoutMetrics {
  // Private constructor and fields omitted:
  // insetLeft, insetRight, contentWidth, scaleWidth, isAdjusted.

  factory AppLayoutMetrics.fromMediaQuery(MediaQueryData data) {
    final size = data.size;
    final insets = data.viewPadding;
    final hasSideInsets = insets.left > 0 || insets.right > 0;

    // Phones without side insets: use the window as is.
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
    // Never squatter than an iPhone SE (375 × 647 safe area).
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

  /// Rebuild when the size changes, or when the scale width changes
  /// without a size change (insets that arrive late).
  static bool shouldRebuildScale(MediaQueryData old, MediaQueryData data) {
    return old.size != data.size ||
        AppLayoutMetrics.fromMediaQuery(old).scaleWidth !=
            AppLayoutMetrics.fromMediaQuery(data).scaleWidth;
  }
}
```

It reads `viewPadding`, not `padding`. When the keyboard opens, `padding.bottom` drops to 0, so a scale computed from `padding` would change, and re-lay out the entire app, every time the keyboard appears. And because it's pure, this is where most of the testing happens.

### 2. `AppScreenUtilInit`: override the scale before anyone reads it

`ScreenUtilInit.build` calls `ScreenUtil.configure(data: <the real window>)` and then calls your `builder`. `ScreenUtil` is a singleton, so calling `configure` again at the top of the builder, with the window width replaced by `scaleWidth`, wins for every descendant:

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
        // Read from the View, as ScreenUtilInit itself does.
        // MediaQuery.of would rebuild the whole app whenever the keyboard moves.
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

Two points here are less obvious:

- **No `MediaQuery.of(context)`.** This is the root of the app. Depending on `MediaQuery` here would rebuild everything whenever the keyboard opens or closes.
- **A custom `rebuildFactor`.** `ScreenUtilInit` only rebuilds its subtree when `rebuildFactor(old, new)` returns true, and the default, `RebuildFactors.size`, only compares sizes. When the device folds, the new size and the new side inset don't necessarily arrive together. With a size-only rule, the scale computed before the inset arrived would stick.

One side effect: after the override, `ScreenUtil().screenWidth` returns the scale width rather than the real width. We don't use it. If you do, keep that in mind.

### 3. `AppContentFrame`: carve out the content area

This goes in `MaterialApp.router`'s `builder`, so it wraps the `Navigator` and everything pushed onto it:

```dart
@override
Widget build(BuildContext context) {
  final data = MediaQuery.of(context);
  final theme = Theme.of(context);
  final metrics = AppLayoutMetrics.fromMediaQuery(data);
  final hasSideInsets = metrics.insetLeft > 0 || metrics.insetRight > 0;

  // Same structure whether or not we adjust. Changing it would recreate
  // the Navigator and throw away the navigation stack.
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

- **The side safe areas are handled once, for the whole app.** Descendants get a `MediaQuery` whose `size` is the content area and whose left/right `padding` and `viewPadding` are zero. Existing code (`SafeArea`, `MediaQuery.sizeOf(context).width`, full-width layouts) behaves as if it were running on a narrower phone, and screens without a `SafeArea` no longer draw under the status bar.
- **The tree shape never changes.** It's tempting to `return child;` when there's nothing to adjust. But the adjustment can switch on and off while the app is running (when it goes into Split View, for instance). If the widgets above the `Navigator` change type, Flutter discards that subtree, and the user's navigation stack goes with it. So we always build the same `DecoratedBox → Padding → MediaQuery → Theme` chain and only vary the values.
- **Dialogs are capped at a phone's width.** Our dialog component wraps its content in `IntrinsicHeight`, which measures the content at the dialog's maximum allowed width. On a 669pt screen that's far wider than the width the content actually lays out at, so the text is measured as fewer lines than it really wraps to, and the dialog comes out too short. So we cap it at the width a dialog gets on a phone:

```dart
/// Material's default minimum Dialog width.
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
        // On a short screen maxWidth can drop below 280,
        // and min must never exceed max.
        minWidth: math.min(_dialogMinWidth, maxWidth),
        maxWidth: maxWidth,
      ),
    ),
  );
}
```

That `math.min` is load-bearing. On a short window (for example, right after folding the device in landscape), `maxWidth` can drop below 280. An invalid `BoxConstraints` isn't simply ignored: `BoxConstraints.==` asserts that it's valid, and `ThemeData` equality ends up comparing it. In debug builds, the whole screen goes red.

Wiring it all up:

```dart
AppScreenUtilInit(
  builder: (context) => MaterialApp.router(
    routerConfig: router,
    builder: (context, child) => AppContentFrame(child: child!),
  ),
);
```

## The long tail: the scale is no longer a constant

On a phone, `1.res` is fixed for the lifetime of the process. On the Duo it changes every time the user folds, unfolds or rotates the device. `ScreenUtilInit` marks the tree for rebuild when that happens, so anything computed in `build` is fine. Anything computed once and kept is now a bug. This is what we found:

1. **`static final` sizes.** `static final _tabHeight = 48.res;` is evaluated once, at whatever the scale was the first time it was read. Fix: `static double get _tabHeight => 48.res;`
2. **Field initializers.** A list of `32.res` icons built in a `State`'s field initializer. Fix: a getter.
3. **Controllers with immutable, size-derived parameters.** Our banner carousel created its `PageController` from the screen width, once. `viewportFraction` is final, so we now recreate the controller when the fraction changes, keep the current page, and dispose of the old controller after the frame:

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
       // Dispose of it once the new PageView has taken over.
       WidgetsBinding.instance.addPostFrameCallback(
         (_) => oldController.dispose(),
       );
     }
   }
   ```

   Our infinite page view holds on to the first controller it's given, so we also key it with `ObjectKey(_pageController)` to make it start over with the new one.
4. **Cached measurements.** Our custom numeric keyboard caches its height and publishes it as an extra bottom inset. It now re-measures in `didChangeDependencies`, inside a post-frame callback, because publishing notifies an ancestor and that can't happen during build.
5. **Overlay positioning.** A coach-mark overlay computed its layout once, in `initState`, using `localToGlobal(Offset.zero)`. It now recomputes when the size changes, and it passes `ancestor:`, because the content area no longer has to start at the left edge of the screen. (The exception is APIs that really do want screen coordinates, such as the share sheet's `sharePositionOrigin`.)
6. **Values captured when a route is created.** Our full-screen bottom sheet copied the parent's `viewPadding` in `createRoute`, which goes stale after a fold. It's now read inside the sheet's builder. Material 3 also caps bottom sheets at 640pt wide by default, so for a full-screen sheet we pass `constraints: const BoxConstraints()`.
7. **Text that won't shrink.** `.resFont` never goes below 1×, so in a window narrower than 360pt (Split View, for example), boxes shrink but text doesn't. A chart label overflowed. Wrapping it in `Flexible` and `FittedBox(fit: BoxFit.scaleDown)` shrinks it only when it doesn't fit.
8. **Width-driven heights on non-scrolling screens.** We have a card-swipe screen where users go through their transactions one card at a time, and it fits on one screen without scrolling. Its action buttons get their height from their width, so on a wide screen they grew taller and squeezed the card, which is the one thing the screen is about. We now cap the buttons at phone width and let the card grow into the freed height, by at most the ratio by which the screen is wider than a phone.

We wrote the general rules into the spec that lives next to the code, so nobody has to rediscover them:

- `MediaQuery.sizeOf(context).width` is the content width, not the screen width.
- Never store `.res` values in `static final`s or fields. Use getters, or compute them in `build`.
- When positioning overlays with `localToGlobal`, pass `ancestor`.
- On non-scrolling screens, cap width-driven elements at phone width and give the height to the main content.

Here's a quick way to find the first kind in your own codebase. Add your own extensions to the list (ours is `res`):

```bash
grep -rnE 'static (late )?final .*[0-9]\.(w|h|r|sp)([^A-Za-z0-9_]|$)' lib/
```

It won't catch multi-line initializers or values computed in `initState`, but it's a start.

## Testing without the device

We did this work before the iPhone Duo shipped, so almost everything is covered by widget tests that fake its windows:

```dart
const _pixelRatio = 3.0;

void _setWindow(
  WidgetTester tester,
  Size size, {
  FakeViewPadding padding = const FakeViewPadding(),
}) {
  tester.view.devicePixelRatio = _pixelRatio;
  tester.view.physicalSize = size * _pixelRatio;
  // FakeViewPadding is in physical pixels.
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
      // ScaleProbe reports 360.res and 844.h from its build method.
      builder: (_) => ScaleProbe(
        onBuild: (w, h) {
          width = w;
          height = h;
        },
      ),
    ),
  );

  // Limited by height: narrower than the 382pt content width.
  expect(width, closeTo(644 * 375 / 647, 0.001));
  // The height scale is unchanged.
  expect(height, closeTo(678, 0.001));
});
```

The tests that earned their keep:

- **Existing phones are a pure passthrough.** A table of phones (iPhone SE 1st and 3rd gen, iPhone 16, iPhone Pro Max, a typical Android phone, a 448dp Pixel Pro XL, and a Split View window narrower than any phone) asserts that the metrics equal the raw window. This is the test that lets you ship without fear.
- **Boundaries.** 450pt wide without side insets is a phone. 451pt is not.
- **The keyboard doesn't change the scale.**
- **Insets that arrive after the size.** Pump a size, then the inset, and expect the scale to follow.
- **Navigation state survives folding and rotating.** Start at an iPhone size, go folded → unfolded → landscape → folded, and check that the page's `State` was created once and is still the same object.
- **One regression test per long-tail fix.** The carousel controller is recreated only when the width changes, the keyboard inset updates while the keyboard is open, a dialog fits its content in landscape, and so on.

## Results and trade-offs

- **Existing phones are unchanged.** The gate makes the metrics a passthrough, and the device table pins that down.
- **The iPhone Duo stays within 1.02×–1.22× in all three states.** That's inside the range our phones already cover, and nothing draws under the status bar.
- **The trade-off is deliberate.** On the unfolded display we show a phone UI with more room, not a tablet UI. If the Duo becomes a meaningful share of our users, adaptive layouts will be worth the investment, and this gives us a stable base to build them on.
- **Nothing here is Duo-specific.** The rule triggers on side safe areas or on a width over 450, so Android tablets and foldables wider than that get the same treatment, and an inset on the left is handled like one on the right. (We first assumed the Duo's status bar would flip to the left when the device is rotated 180°. It stays on the right. We handle both sides anyway.)
- **Caveat:** every iPhone Duo number in this post comes from the iOS 27.1 simulator. We'll check them again on real hardware.

## Takeaways

1. If you've only ever shipped on phones, your largest phone is a tested, known-good configuration. Clamp new devices to it instead of extrapolating past it.
2. Bound the scale by height as well as width, using a squat phone you already support as the reference.
3. Make the adjustment at the top of the tree, the scale in one place and the content area in another, so the rest of the app doesn't need to know.
4. Make the no-op path provably a no-op for existing devices, and pin it down with a table of devices in your tests.
5. On a foldable, the scale is a variable. Hunt down everything that caches it.

---

*Versions: Flutter 3.41.8, flutter_screenutil 5.9.3, iOS 27.1 simulator.*
