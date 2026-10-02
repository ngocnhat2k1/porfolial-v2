# Projects Feature

## Mô tả
Trang `/work`: mọi sản phẩm Nhật đã làm từ 2023. Bố cục theo quhu.info.vn/work: ba thẻ nổi bật lớn ở đầu, bên dưới là các nhóm (Storefronts, Learning platforms, SaaS/ERP, AI and automation) mỗi nhóm một lưới bốn cột thẻ pastel nhỏ. Header có hình `char-desk` đứng trên đường kẻ đáy.

## Nghiệp vụ chính
- Dự án `featured: true` (Cinestar, Bachlong, Khanh Hung) lên đầu, thẻ lớn có thêm vai trò và stack. Phòng (`room/RoomDecor`) cũng lấy nhóm này để chiếu trên màn hình máy tính.
- Các dự án còn lại vào nhóm theo `category`, giữ đúng thứ tự trong `constants/projects.ts`. Màu nền thẻ xoay vòng sáu token pastel (`bg-mint`, `bg-butter`…).
- Thẻ chỉ hiện loại sản phẩm, năm (rút từ `period`), ảnh, tên và một câu mô tả. Đầu việc chi tiết (`points`) chỉ hiện ở trang Resume.
- Có `url`: hiện ảnh `public/work/<slug>.jpg`, cả thẻ là link mở tab mới (link ở tên được kéo phủ thẻ). Hover/focus: thẻ nhấc lên, nghiêng nhẹ, ảnh zoom, sticker "visit ↗" bật ra ở góc.
- Không có `url`: khung kẻ sọc với icon của nhóm và `status` ("Not launched yet", "Internal, behind login"…).
- Có `note` (NHAHANG.AI): một dòng chữ viết tay dưới tên.

## Nguồn dữ liệu
- Dự án có `points` lấy từ `CV-automation/profile/master-profile.md`, có `role`, và được Resume dùng (Resume lọc `projects.filter(p => p.points)`).
- Các dự án còn lại lấy từ lịch sử git trong `~/Desktop/Mona` (10/2026): `period` = commit đầu đến commit cuối của Nhật, mô tả là về sản phẩm, KHÔNG ghi vai trò khi chưa xác nhận. Golang luôn ghi "AI-assisted".

## Cấu trúc file
| File | Mục đích |
|------|---------|
| `pages/ProjectsPage.tsx` | Trang `/work`: header, ba thẻ nổi bật, các nhóm |
| `components/ProjectCard.tsx` | Một thẻ pastel (nhỏ hoặc `featured`), link phủ thẻ, sticker hover |
| `components/ProjectPreview.tsx` | Khung ảnh viền mực, hoặc icon + trạng thái khi chưa public |
| `constants/projects.ts` | `categories` (thứ tự, tiêu đề, icon) và dữ liệu dự án |
| `types/project.ts` | Kiểu `Project`, `ProjectCategory` |
| `index.ts` | Public API: `projects`, `Project` |

## Phụ thuộc
- `lucide-react` — icon nhóm cho khung không có ảnh
- `shared/components/ExternalLink`, `PageTransition`, `ArtImage`; `shared/utils/cx`
- `next/image` — ảnh chụp trang

## Ghi chú
- Toàn bộ là Server Component, trang không gửi JS riêng xuống trình duyệt.
- Ảnh chụp: JPG 1440×900, khung 16:10 cắt từ mép trên. Thêm dự án có link thì phải thêm ảnh, thiếu ảnh trình duyệt hiện alt text.
- Ảnh thẻ nổi bật đầu tiên tải ngay (`eager`, `fetchPriority="high"`) vì thường là LCP.
