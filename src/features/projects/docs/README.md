# Projects Feature

## Mô tả
Trang `/work`: các sản phẩm Nhật đã làm. Dự án nổi bật hiện thành hàng lớn, ảnh chụp trang nằm trong khung trình duyệt vẽ viền mực; các dự án còn lại xếp lưới hai cột gọn hơn. Header có hình `char-desk` đứng trên đường kẻ đáy.

## Nghiệp vụ chính
- Dự án có `featured: true` lên đầu thành hàng lớn (h2); còn lại vào mục "More projects" (h3), giữ đúng thứ tự trong `constants/projects.ts`.
- Có `url`: hiện ảnh chụp `public/work/<slug>.jpg` và nút "Visit site" mở tab mới.
- Không có `url` nhưng có `status` (BĐS Thiên Quân): khung trình duyệt trống ghi trạng thái, không ảnh, không link.
- Có `note` (NHAHANG.AI): một dòng chữ viết tay nhỏ dưới loại sản phẩm.
- Chỉ khung của dự án nổi bật mới có bóng `shadow-pop`; khung trong lưới để phẳng.

## Cấu trúc file
| File | Mục đích |
|------|---------|
| `pages/ProjectsPage.tsx` | Trang `/work`: header, các hàng nổi bật, lưới "More projects" |
| `components/FeaturedProject.tsx` | Một dự án nổi bật: ảnh lớn bên cạnh phần chi tiết |
| `components/ProjectTile.tsx` | Một dự án trong lưới: ảnh nhỏ ở trên, chi tiết bên dưới |
| `components/ProjectPreview.tsx` | Khung trình duyệt: ảnh chụp trang, hoặc trạng thái khi chưa public |
| `components/ProjectDetails.tsx` | Loại sản phẩm, ghi chú, mô tả, vai trò và thời gian (`dl`), đầu việc, stack, link |
| `constants/projects.ts` | Dữ liệu dự án, theo thứ tự hiển thị |
| `types/project.ts` | Kiểu `Project` |
| `index.ts` | Public API: `projects`, `Project` |

## Luồng dữ liệu
`constants/projects.ts` → `ProjectsPage` tách nhóm `featured` và phần còn lại → `FeaturedProject` / `ProjectTile` → `ProjectPreview` + `ProjectDetails`. Trang Resume đọc `projects` qua `index.ts`.

## Phụ thuộc
- `shared/components/PageTransition` — hiệu ứng vào/ra trang
- `shared/components/ArtImage` — hình `char-desk`, chưa có ảnh thì hiện khung chờ
- `shared/ui/button` — nút "Visit site"
- `shared/utils/cx`
- `next/image` — ảnh chụp trang

## Ghi chú
- Toàn bộ là Server Component, trang không gửi JS riêng xuống trình duyệt.
- Ảnh chụp: JPG 1440×900, khung cắt tỉ lệ 16:10 từ mép trên (`object-top`). Chưa có file thì trình duyệt hiện alt text.
- Ảnh của dự án nổi bật đầu tiên tải ngay (`loading="eager"`, `fetchPriority="high"`) vì thường là LCP.
