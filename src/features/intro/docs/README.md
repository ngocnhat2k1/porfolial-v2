# Intro Feature

## Mô tả
Trang chủ (`/`). Cảnh Sài Gòn lúc hoàng hôn nhìn từ ban công lan can bông gió (lấy từ ảnh thật của Nhật), nhân vật minh họa đứng giữa ban công, thẻ tên và một lối vào duy nhất: "Enter my room".

## Nghiệp vụ chính
- Chỉ có một hành động chính trên trang: vào phòng. Các trang khác đã có ở dock dưới đáy.
- Hiệu ứng mở đầu chạy một lần: camera lùi từ thành phố về ban công, nhân vật bước vào, thẻ tên hiện sau cùng. Người bật "giảm chuyển động" thì thấy ngay trạng thái cuối.
- Bấm "Enter my room": trang mới mở ra như cánh cửa (`transitionTypes: ['door']`), nhân vật "đi" từ ban công vào phòng nhờ cùng tên view transition `nhat`.

## Cấu trúc file
| File | Mục đích |
|------|---------|
| `pages/IntroPage.tsx` | Dựng cảnh hai lớp (ban công nhìn ra thành phố, nhân vật) và thẻ tên |
| `pages/IntroPage.module.css` | Vị trí các lớp và chuỗi hiệu ứng mở đầu |

## Luồng dữ liệu
`shared/constants/site` (tên, chức danh, tagline) → `IntroPage`. Ảnh lấy qua `ArtImage` theo tên file trong `docs/ART_PROMPTS.md`; chưa có ảnh thì hiện khung chờ ghi tên file.

## Phụ thuộc
- `shared/components/Scene` — khung 16:9 phủ kín màn hình
- `shared/components/ArtImage` — ảnh minh họa hoặc khung chờ
- `shared/components/MascotTransition` — tên view transition chung với trang phòng
- `shared/components/PageTransition` — hiệu ứng vào/ra trang

## Ghi chú
- Toàn bộ là Server Component, trang không gửi JS riêng nào xuống trình duyệt.
- Trên điện thoại dọc, cảnh bị cắt hai bên và giữ phần giữa (nhân vật), thẻ tên nằm trên cùng.
