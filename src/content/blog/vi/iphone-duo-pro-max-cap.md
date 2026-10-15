---
title: 'Không bao giờ to hơn Pro Max: đưa app Flutter chỉ dành cho iPhone lên iPhone Duo'
summary: 'App Flutter của chúng tôi chỉ chạy trên iPhone và khoá màn hình dọc. Thay vì thiết kế layout tablet cho iPhone Duo, chúng tôi giới hạn tỉ lệ scale ở mức iPhone Pro Max, chặn thêm theo chiều cao, rồi lùng ra mọi chỗ đang cache kích thước.'
lead: 'Cách chúng tôi đưa một app chưa từng hỗ trợ iPad lên chiếc máy gập của Apple mà không phải thiết kế một layout tablet nào.'
date: 2026-10-15
tags: ['flutter', 'ios']
---

## TL;DR

- App Flutter của chúng tôi chỉ dành cho iPhone và chỉ chạy ở chiều dọc. Mọi màn hình được thiết kế trên canvas rộng 360pt và được scale bằng `flutter_screenutil` theo tỉ lệ `chiều rộng màn hình / 360`.
- Khi build bằng iOS 27 SDK, app chạy toàn màn hình trên iPhone Duo. Lúc mở máy ra, tỉ lệ scale là 1.86× ở chiều dọc và 2.64× ở chiều ngang. Lúc gập lại, nội dung đè lên thanh trạng thái nằm dọc.
- Thay vì thiết kế cho một form factor mới, chúng tôi quy Duo về màn hình lớn nhất mà app đã chạy: **UI không bao giờ scale vượt quá iPhone Pro Max (1.22×)**, và layout không bao giờ "lùn" hơn iPhone SE.
- Các điện thoại hiện có được giữ nguyên, nhờ chính cách thiết kế. Phần điều chỉnh chỉ có tác dụng với màn hình rộng hơn 450pt hoặc có safe area bên trái/phải.
- Phần việc lớn hơn nằm ở loạt chỗ lặt vặt phía sau. Trên máy gập, hệ số scale thay đổi ngay khi app đang chạy, nên mọi chỗ cache một giá trị đã scale đều thành bug.

## Điểm xuất phát: một app chưa bao giờ phải nghĩ đến chiều rộng

Chúng tôi làm một app quản lý chi tiêu gia đình bằng Flutter. Trên iOS, app từ trước đến nay chỉ dành cho iPhone (`TARGETED_DEVICE_FAMILY = 1`) và khoá ở chiều dọc.

Thiết kế được vẽ trên canvas 360 × 844, và [`flutter_screenutil`](https://pub.dev/packages/flutter_screenutil) scale mọi thứ theo tỉ lệ với chiều rộng màn hình, thông qua một extension nhỏ:

```dart
extension DoubleScreenUtilExt on num {
  double get res => w; // đơn vị thiết kế → point, scale theo chiều rộng
  double get resFont => sp.clamp(toDouble(), toDouble() * 2); // font: 1×–2×
}
```

Như vậy `16.res` là 16pt trên màn hình rộng 360pt và khoảng 19.6pt trên iPhone Pro Max rộng 440pt. Trên các điện thoại chúng tôi hỗ trợ, từ 320pt (iPhone SE thế hệ 1, hoặc khi bật Thu phóng màn hình) đến 448dp (Pixel Pro XL trên Android), tỉ lệ scale nằm trong khoảng 0.89× đến 1.24×. Thiết kế của chúng tôi xưa nay luôn nằm trong khoảng đó.

> **Một chi tiết sẽ quan trọng về sau: font cũng scale theo chiều rộng.** Chúng tôi truyền `enableScaleText: () => false` cho `ScreenUtilInit`, nhưng trong flutter_screenutil 5.9.x, `.sp` đi qua `fontSizeResolver`, mà mặc định của nó là `FontSizeResolvers.width`. Vì vậy `.sp` đi theo `enableScaleWH`, chứ không theo `enableScaleText`. Bạn làm gì với tỉ lệ scale theo chiều rộng thì chữ cũng chịu y như vậy.

## iPhone Duo đã làm gì với nó

iPhone Duo có màn hình ngoài 5.4 inch và màn hình trong 7.6 inch. Khi build bằng iOS 27 SDK, app của chúng tôi chạy toàn màn hình trên cả hai. Đây là những gì chúng tôi đo được trên simulator iOS 27.1:

| Trạng thái | Cửa sổ (pt) | Safe area (`viewPadding`) | Tỉ lệ |
|---|---|---|---|
| Gập | 466 × 678 | phải 84, dưới 34 | 1.29× |
| Mở, dọc | 669 × 951 | trên 82, dưới 34 | 1.86× |
| Mở, ngang | 951 × 669 | phải 84, dưới 34 | 2.64× |

Vấn đề ở từng trạng thái:

- **Gập:** thanh trạng thái chạy dọc theo cạnh phải. Màn hình nào không có `SafeArea` thì vẽ đè xuống dưới nó. Màn hình có `SafeArea` thì được scale cho 466pt nhưng chỉ có 382pt, nên bị tràn.
- **Mở, dọc:** mọi thứ to khổng lồ.
- **Mở, ngang:** khoá chiều dọc không có tác dụng trên màn hình trong, và layout 2.64× không vừa trong 669pt chiều cao.

```text
Gập, rộng 466pt
┌────────────────────────────┬─────┐
│                            │  ▌  │
│   vùng nội dung: 382pt     │  ▌  │ ← thanh trạng thái nằm dọc
│                            │  ▌  │   (safe area bên phải: 84pt)
│                            │     │
└────────────────────────────┴─────┘
```

Và khác với mọi điện thoại, Duo chuyển qua lại giữa các trạng thái này ngay trong lúc app đang chạy.

## Thử lần đầu: tắt scale

Cách sửa đầu tiên chỉ có một dòng: `enableScaleWH: () => false`. Nhờ vậy UI không còn phình to trên Duo. Nhưng phần lớn điện thoại rộng hơn canvas 360pt của chúng tôi, nên từ trước đến giờ chúng đều chạy ở tỉ lệ trên 1×: iPhone 16 là 1.09×, Pro Max là 1.22×. Tắt scale làm tất cả chúng nhỏ lại, kể cả chữ, vì font đi theo tỉ lệ chiều rộng. Người dùng Pro Max sẽ thấy cả app nhỏ đi 18% sau một bản cập nhật. Chúng tôi đã revert thay đổi đó.

## Sao không làm adaptive layout?

Cách sửa theo sách giáo khoa là adaptive design: breakpoint, màn hình hai pane, có thể thêm navigation rail. Với một app iPad, đó là lựa chọn đúng. Với chúng tôi, nó đồng nghĩa với việc thiết kế lại mọi màn hình chỉ vì một thiết bị mới, trong một app chưa từng nhắm đến tablet. Chúng tôi không muốn phải đợi việc đó xong mới hỗ trợ được Duo.

## Ý tưởng: coi Duo là một chiếc iPhone lớn

Chúng tôi không cần Duo trông đẹp theo một kiểu mới nào đó. Chúng tôi cần nó trông giống thứ đã phát hành và đã test. Màn hình lớn nhất mà app từng chạy là iPhone Pro Max: rộng 440pt, tỉ lệ 1.22×. Vậy quy tắc đầu tiên là:

> **Không bao giờ scale UI vượt quá những gì iPhone Pro Max hiển thị.**

Chừng đó chưa đủ, vì Duo còn *lùn*, khi xoay ngang và khi gập. Một layout 1.22× vừa với chiếc Pro Max cao 956pt sẽ không vừa trong 635pt chiều cao sử dụng được. Vì vậy quy tắc thứ hai giới hạn tỉ lệ theo chiều cao. Làm mốc, chúng tôi dùng iPhone SE (thế hệ 2/3), một trong những điện thoại lùn nhất mà chúng tôi hỗ trợ, với safe area 375 × 647pt:

> **Không bao giờ lùn hơn iPhone SE.**

Thứ gì vừa trong 647pt chiều cao của SE ở chiều rộng 375pt thì cũng vừa trong H point chiều cao khi chiều rộng scale là H × 375 / 647. (Điều này đúng với mọi thứ có kích thước tính bằng đơn vị theo chiều rộng. `.h` vẫn scale theo chiều cao thật, như trước giờ.)

Gộp lại:

```text
contentWidth = screenWidth  − leftSafeArea − rightSafeArea
usableHeight = screenHeight − topSafeArea  − bottomSafeArea

scaleWidth = min(contentWidth, 440, usableHeight × 375 / 647)
scale      = scaleWidth / 360
```

Thêm một điều kiện chặn, để không có gì thay đổi trên các điện thoại hiện có:

> **Nếu không có safe area bên trái/phải và màn hình rộng không quá 450pt, không thay đổi gì cả.**

Tại sao là 450 mà không phải 440? Pixel 8 Pro, 9 Pro XL và 10 Pro XL rộng 448dp ở kích thước hiển thị mặc định. Ngưỡng 440 sẽ làm chúng bị thu nhỏ.

Trên Duo:

| Trạng thái | Chiều rộng nội dung | Chiều rộng scale | Bị giới hạn bởi | Tỉ lệ: trước → sau |
|---|---|---|---|---|
| Gập | 382 | 373 | chiều cao | 1.29× → **1.04×** |
| Mở, dọc | 669 | 440 | trần Pro Max | 1.86× → **1.22×** |
| Mở, ngang | 867 | 368 | chiều cao | 2.64× → **1.02×** |

Cả ba đều rơi vào khoảng mà các điện thoại của chúng tôi đã bao phủ (0.89×–1.24×).

Lưu ý những gì cách này *không* làm: nó không ép app vào một cột rộng 440pt kiểu letterbox. Layout vẫn nhận đủ chiều rộng nội dung. Những thứ co giãn (danh sách, app bar, sheet) dùng toàn bộ màn hình, còn những thứ có kích thước cố định thì mang kích thước của Pro Max. Trên màn hình mở, bạn có thêm không gian, chứ không phải nút to hơn.

## Triển khai

Có ba phần, tất cả nằm ở đỉnh cây widget, nên phần còn lại của app không cần biết những thứ này tồn tại:

```text
AppScreenUtilInit                 ← mọi thứ to cỡ nào (tỉ lệ .res)
└── MaterialApp.router
    └── builder: AppContentFrame  ← mọi thứ nằm ở đâu (vùng nội dung)
        └── Navigator             ← mọi trang, dialog và bottom sheet
```

### 1. `AppLayoutMetrics`: một hàm thuần của `MediaQueryData`

```dart
@immutable
class AppLayoutMetrics {
  // Bỏ qua constructor private và các field:
  // insetLeft, insetRight, contentWidth, scaleWidth, isAdjusted.

  factory AppLayoutMetrics.fromMediaQuery(MediaQueryData data) {
    final size = data.size;
    final insets = data.viewPadding;
    final hasSideInsets = insets.left > 0 || insets.right > 0;

    // Điện thoại không có inset hai bên: dùng nguyên cửa sổ.
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
    // Không bao giờ lùn hơn iPhone SE (safe area 375 × 647).
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

  /// Rebuild khi kích thước thay đổi, hoặc khi chiều rộng scale thay đổi
  /// mà kích thước không đổi (inset đến muộn).
  static bool shouldRebuildScale(MediaQueryData old, MediaQueryData data) {
    return old.size != data.size ||
        AppLayoutMetrics.fromMediaQuery(old).scaleWidth !=
            AppLayoutMetrics.fromMediaQuery(data).scaleWidth;
  }
}
```

Nó đọc `viewPadding`, không phải `padding`. Khi bàn phím mở, `padding.bottom` về 0, nên một tỉ lệ tính từ `padding` sẽ thay đổi, và kéo theo layout lại toàn bộ app, mỗi lần bàn phím xuất hiện. Và vì là hàm thuần, đây là nơi diễn ra phần lớn việc test.

### 2. `AppScreenUtilInit`: ghi đè tỉ lệ trước khi ai kịp đọc

`ScreenUtilInit.build` gọi `ScreenUtil.configure(data: <cửa sổ thật>)` rồi mới gọi `builder` của bạn. `ScreenUtil` là singleton, nên gọi `configure` thêm một lần nữa ở đầu builder, với chiều rộng cửa sổ được thay bằng `scaleWidth`, sẽ có hiệu lực với mọi widget con:

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
        // Đọc từ View, giống như chính ScreenUtilInit.
        // MediaQuery.of sẽ rebuild cả app mỗi khi bàn phím di chuyển.
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

Có hai điểm ít hiển nhiên hơn:

- **Không dùng `MediaQuery.of(context)`.** Đây là gốc của app. Phụ thuộc vào `MediaQuery` ở đây sẽ rebuild mọi thứ mỗi khi bàn phím mở hoặc đóng.
- **Một `rebuildFactor` tự viết.** `ScreenUtilInit` chỉ rebuild cây con khi `rebuildFactor(old, new)` trả về true, và mặc định `RebuildFactors.size` chỉ so sánh kích thước. Khi máy gập lại, kích thước mới và inset hai bên mới không nhất thiết đến cùng lúc. Với quy tắc chỉ xét kích thước, tỉ lệ được tính trước khi inset đến sẽ bị giữ nguyên luôn.

Một tác dụng phụ: sau khi ghi đè, `ScreenUtil().screenWidth` trả về chiều rộng scale thay vì chiều rộng thật. Chúng tôi không dùng nó. Nếu bạn có dùng, hãy lưu ý điều này.

### 3. `AppContentFrame`: khoét ra vùng nội dung

Phần này đặt trong `builder` của `MaterialApp.router`, nên nó bọc `Navigator` và mọi thứ được push lên đó:

```dart
@override
Widget build(BuildContext context) {
  final data = MediaQuery.of(context);
  final theme = Theme.of(context);
  final metrics = AppLayoutMetrics.fromMediaQuery(data);
  final hasSideInsets = metrics.insetLeft > 0 || metrics.insetRight > 0;

  // Cấu trúc giống nhau dù có điều chỉnh hay không. Đổi cấu trúc
  // sẽ tạo lại Navigator và làm mất navigation stack.
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

- **Safe area hai bên được xử lý một lần, cho cả app.** Widget con nhận một `MediaQuery` có `size` là vùng nội dung, còn `padding` và `viewPadding` trái/phải bằng 0. Code hiện có (`SafeArea`, `MediaQuery.sizeOf(context).width`, layout full chiều rộng) hoạt động như thể đang chạy trên một điện thoại hẹp hơn, và các màn hình không có `SafeArea` không còn vẽ xuống dưới thanh trạng thái.
- **Hình dạng cây không bao giờ thay đổi.** Rất dễ muốn `return child;` khi không có gì cần điều chỉnh. Nhưng việc điều chỉnh có thể bật tắt ngay khi app đang chạy (chẳng hạn khi vào Split View). Nếu các widget phía trên `Navigator` đổi kiểu, Flutter sẽ bỏ cây con đó, và navigation stack của người dùng cũng mất theo. Vì vậy chúng tôi luôn dựng cùng một chuỗi `DecoratedBox → Padding → MediaQuery → Theme` và chỉ thay đổi giá trị.
- **Dialog được giới hạn ở chiều rộng của điện thoại.** Component dialog của chúng tôi bọc nội dung trong `IntrinsicHeight`, vốn đo nội dung ở chiều rộng tối đa cho phép của dialog. Trên màn hình 669pt, chiều rộng đó lớn hơn nhiều so với chiều rộng mà nội dung thực sự được layout, nên chữ bị đo thành ít dòng hơn số dòng nó thật sự xuống, và dialog bị thấp quá. Vì vậy chúng tôi giới hạn nó ở chiều rộng mà dialog có trên điện thoại:

```dart
/// Chiều rộng tối thiểu mặc định của Dialog trong Material.
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
        // Trên màn hình lùn, maxWidth có thể xuống dưới 280,
        // và min không bao giờ được vượt quá max.
        minWidth: math.min(_dialogMinWidth, maxWidth),
        maxWidth: maxWidth,
      ),
    ),
  );
}
```

Cái `math.min` đó không thể thiếu. Trên một cửa sổ lùn (ví dụ ngay sau khi gập máy ở chiều ngang), `maxWidth` có thể xuống dưới 280. Một `BoxConstraints` không hợp lệ không chỉ đơn giản bị bỏ qua: `BoxConstraints.==` assert rằng nó hợp lệ, và phép so sánh bằng của `ThemeData` rốt cuộc sẽ so sánh tới nó. Ở bản debug, cả màn hình chuyển sang màu đỏ.

Nối tất cả lại:

```dart
AppScreenUtilInit(
  builder: (context) => MaterialApp.router(
    routerConfig: router,
    builder: (context, child) => AppContentFrame(child: child!),
  ),
);
```

## Những chỗ lặt vặt: tỉ lệ scale không còn là hằng số

Trên điện thoại, `1.res` cố định suốt vòng đời của process. Trên Duo, nó thay đổi mỗi khi người dùng gập, mở hoặc xoay máy. Khi đó `ScreenUtilInit` đánh dấu cây cần rebuild, nên những gì tính trong `build` đều ổn. Còn những gì tính một lần rồi giữ lại thì giờ là bug. Đây là những gì chúng tôi tìm thấy:

1. **Kích thước `static final`.** `static final _tabHeight = 48.res;` chỉ được tính một lần, theo tỉ lệ tại thời điểm nó được đọc lần đầu. Cách sửa: `static double get _tabHeight => 48.res;`
2. **Field initializer.** Một danh sách icon `32.res` được tạo trong field initializer của một `State`. Cách sửa: dùng getter.
3. **Controller có tham số bất biến phụ thuộc vào kích thước.** Carousel banner của chúng tôi tạo `PageController` từ chiều rộng màn hình, đúng một lần. `viewportFraction` là final, nên giờ chúng tôi tạo lại controller khi fraction thay đổi, giữ lại trang hiện tại, và dispose controller cũ sau frame:

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
       // Dispose khi PageView mới đã tiếp quản.
       WidgetsBinding.instance.addPostFrameCallback(
         (_) => oldController.dispose(),
       );
     }
   }
   ```

   Page view vô hạn của chúng tôi giữ controller đầu tiên được truyền vào, nên chúng tôi còn gắn key `ObjectKey(_pageController)` để nó khởi tạo lại với controller mới.
4. **Số đo được cache.** Bàn phím số tự làm của chúng tôi cache chiều cao của nó và công bố chiều cao đó như một inset dưới bổ sung. Giờ nó đo lại trong `didChangeDependencies`, bên trong một post-frame callback, vì việc công bố sẽ thông báo cho một widget tổ tiên, và điều đó không được phép xảy ra trong lúc build.
5. **Định vị overlay.** Một overlay coach mark tính layout một lần trong `initState`, bằng `localToGlobal(Offset.zero)`. Giờ nó tính lại khi kích thước thay đổi, và truyền thêm `ancestor:`, vì vùng nội dung không còn nhất thiết bắt đầu từ mép trái màn hình. (Ngoại lệ là những API thật sự cần toạ độ màn hình, như `sharePositionOrigin` của share sheet.)
6. **Giá trị bị chụp lại lúc tạo route.** Bottom sheet toàn màn hình của chúng tôi copy `viewPadding` của widget cha trong `createRoute`, và giá trị đó bị cũ sau khi gập máy. Giờ nó được đọc bên trong builder của sheet. Material 3 cũng mặc định giới hạn bottom sheet ở chiều rộng 640pt, nên với sheet toàn màn hình, chúng tôi truyền `constraints: const BoxConstraints()`.
7. **Chữ không chịu nhỏ lại.** `.resFont` không bao giờ xuống dưới 1×, nên trong một cửa sổ hẹp hơn 360pt (ví dụ Split View), các khối thu nhỏ còn chữ thì không. Một label của biểu đồ bị tràn. Bọc nó trong `Flexible` và `FittedBox(fit: BoxFit.scaleDown)` thì chữ chỉ thu nhỏ khi không vừa.
8. **Chiều cao suy ra từ chiều rộng trên màn hình không cuộn.** Chúng tôi có một màn hình vuốt thẻ, nơi người dùng xem lần lượt từng giao dịch trên từng thẻ, và màn hình này vừa khít mà không cần cuộn. Các nút hành động lấy chiều cao từ chiều rộng, nên trên màn hình rộng chúng cao lên và chèn ép tấm thẻ, vốn là thứ duy nhất màn hình này xoay quanh. Giờ chúng tôi giới hạn các nút ở chiều rộng điện thoại và để tấm thẻ lớn lên vào phần chiều cao được giải phóng, tối đa bằng tỉ lệ mà màn hình rộng hơn điện thoại.

Chúng tôi viết các quy tắc chung vào spec nằm cạnh code, để không ai phải tự khám phá lại:

- `MediaQuery.sizeOf(context).width` là chiều rộng vùng nội dung, không phải chiều rộng màn hình.
- Không bao giờ lưu giá trị `.res` trong `static final` hay field. Dùng getter, hoặc tính trong `build`.
- Khi định vị overlay bằng `localToGlobal`, hãy truyền `ancestor`.
- Trên màn hình không cuộn, giới hạn các phần tử có kích thước theo chiều rộng ở chiều rộng điện thoại, và nhường chiều cao cho nội dung chính.

Đây là một cách nhanh để tìm loại đầu tiên trong codebase của bạn. Hãy thêm các extension của riêng bạn vào danh sách (của chúng tôi là `res`):

```bash
grep -rnE 'static (late )?final .*[0-9]\.(w|h|r|sp)([^A-Za-z0-9_]|$)' lib/
```

Nó không bắt được initializer viết trên nhiều dòng hay giá trị tính trong `initState`, nhưng là một điểm khởi đầu.

## Test khi chưa có máy

Chúng tôi làm việc này trước khi iPhone Duo ra mắt, nên gần như mọi thứ được phủ bằng widget test giả lập các cửa sổ của nó:

```dart
const _pixelRatio = 3.0;

void _setWindow(
  WidgetTester tester,
  Size size, {
  FakeViewPadding padding = const FakeViewPadding(),
}) {
  tester.view.devicePixelRatio = _pixelRatio;
  tester.view.physicalSize = size * _pixelRatio;
  // FakeViewPadding tính bằng pixel vật lý.
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
      // ScaleProbe báo về 360.res và 844.h từ hàm build của nó.
      builder: (_) => ScaleProbe(
        onBuild: (w, h) {
          width = w;
          height = h;
        },
      ),
    ),
  );

  // Bị giới hạn bởi chiều cao: hẹp hơn chiều rộng nội dung 382pt.
  expect(width, closeTo(644 * 375 / 647, 0.001));
  // Tỉ lệ theo chiều cao không đổi.
  expect(height, closeTo(678, 0.001));
});
```

Những test đáng giá nhất:

- **Điện thoại hiện có được giữ nguyên hoàn toàn.** Một bảng các điện thoại (iPhone SE thế hệ 1 và 3, iPhone 16, iPhone Pro Max, một điện thoại Android phổ biến, Pixel Pro XL 448dp, và một cửa sổ Split View hẹp hơn mọi điện thoại) khẳng định rằng metrics bằng đúng cửa sổ gốc. Đây là test giúp bạn yên tâm release.
- **Giá trị biên.** Rộng 450pt và không có inset hai bên là điện thoại. 451pt thì không.
- **Bàn phím không làm thay đổi tỉ lệ.**
- **Inset đến sau kích thước.** Pump kích thước trước, rồi đến inset, và kỳ vọng tỉ lệ cập nhật theo.
- **Trạng thái điều hướng còn nguyên khi gập và xoay.** Bắt đầu ở kích thước iPhone, đi qua gập → mở → ngang → gập, và kiểm tra rằng `State` của trang chỉ được tạo một lần và vẫn là cùng một object.
- **Mỗi chỗ sửa lặt vặt có một regression test.** Controller của carousel chỉ được tạo lại khi chiều rộng thay đổi, inset của bàn phím được cập nhật khi bàn phím đang mở, dialog vừa với nội dung ở chiều ngang, v.v.

## Kết quả và đánh đổi

- **Điện thoại hiện có không thay đổi.** Điều kiện chặn khiến metrics chỉ trả về nguyên giá trị gốc, và bảng thiết bị khoá chặt điều đó.
- **iPhone Duo nằm trong khoảng 1.02×–1.22× ở cả ba trạng thái.** Khoảng này nằm trong phạm vi mà các điện thoại của chúng tôi đã bao phủ, và không còn gì vẽ xuống dưới thanh trạng thái.
- **Đánh đổi này là có chủ đích.** Trên màn hình mở, chúng tôi hiển thị UI điện thoại với nhiều không gian hơn, chứ không phải UI tablet. Nếu Duo chiếm một tỉ lệ người dùng đáng kể, adaptive layout sẽ đáng để đầu tư, và cách làm này cho chúng tôi một nền tảng ổn định để xây tiếp.
- **Không có gì ở đây dành riêng cho Duo.** Quy tắc kích hoạt khi có safe area hai bên hoặc khi chiều rộng trên 450, nên tablet và máy gập Android rộng hơn mức đó cũng được xử lý tương tự, và inset bên trái được xử lý giống inset bên phải. (Ban đầu chúng tôi tưởng thanh trạng thái của Duo sẽ lật sang trái khi xoay máy 180°. Nó vẫn ở bên phải. Dù vậy chúng tôi vẫn xử lý cả hai bên.)
- **Lưu ý:** mọi con số về iPhone Duo trong bài này đều lấy từ simulator iOS 27.1. Chúng tôi sẽ kiểm tra lại trên máy thật.

## Bài học rút ra

1. Nếu bạn mới chỉ phát hành trên điện thoại, chiếc điện thoại lớn nhất của bạn là một cấu hình đã được test và chắc chắn chạy tốt. Hãy kẹp thiết bị mới về đó thay vì ngoại suy vượt quá nó.
2. Giới hạn tỉ lệ scale theo cả chiều cao lẫn chiều rộng, lấy một điện thoại lùn mà bạn đã hỗ trợ làm mốc.
3. Điều chỉnh ở đỉnh cây, tỉ lệ scale ở một chỗ và vùng nội dung ở một chỗ khác, để phần còn lại của app không cần biết gì.
4. Làm cho nhánh "không làm gì" trên thiết bị hiện có thật sự không làm gì, chứng minh được, và khoá nó lại bằng một bảng thiết bị trong test.
5. Trên máy gập, tỉ lệ scale là một biến số. Hãy lùng ra mọi thứ đang cache nó.

---

*Phiên bản: Flutter 3.41.8, flutter_screenutil 5.9.3, simulator iOS 27.1.*
