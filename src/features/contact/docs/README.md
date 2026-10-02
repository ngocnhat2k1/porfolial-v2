# Contact Feature

## Mô tả
Trang `/contact`: một lời mời gửi email, địa chỉ email cỡ lớn kèm nút "Copy email", link LinkedIn và GitHub, nơi ở và múi giờ. Không có form liên hệ.

## Nghiệp vụ chính
- Email là link `mailto:`; nút "Copy email" chép địa chỉ vào clipboard.
- Chép xong, vùng `role="status"` hiện "Copied" trong 2 giây (trình đọc màn hình cũng đọc).
- Trình duyệt chặn clipboard (trang không HTTPS, bị từ chối quyền): bôi đen sẵn địa chỉ để người dùng tự Ctrl/Cmd+C, trạng thái báo "Email selected".
- LinkedIn, GitHub mở tab mới.
- Không hứa hẹn thời gian phản hồi hay tình trạng sẵn sàng nhận việc.

## Cấu trúc file
| File | Mục đích |
|------|---------|
| `pages/ContactPage.tsx` | Trang `/contact` (Server Component) |
| `components/CopyEmailButton.tsx` | Nút chép email và vùng trạng thái (Client Component) |
| `index.ts` | Public API: `ContactPage` |

## Luồng dữ liệu
`shared/constants/site` (email, linkedin, github, location, timezone) → `ContactPage` → `CopyEmailButton` nhận `email` và `textId` (id của link email, dùng để bôi đen khi không chép được).

## Phụ thuộc
- `shared/constants/site`
- `shared/components/PageTransition` — hiệu ứng vào/ra trang
- `shared/ui/button` — nút "Copy email", nút LinkedIn, GitHub

## Ghi chú
- Chỉ `CopyEmailButton` là `'use client'`; phần còn lại render trên server.
- Hẹn giờ 2 giây được đặt lại mỗi lần bấm, nên bấm liên tục vẫn hiện đủ 2 giây sau lần cuối.
