# Hình minh họa

Toàn bộ hình trên site được tạo bằng **bytedance/seedream-4.5** qua Replicate, tự động bằng script.

## Quy trình

1. Token Replicate nằm trong `.env.local`: `REPLICATE_API_TOKEN=r8_...` (đã gitignore).
2. Tạo ảnh ứng viên: `npm run art:gen -- <tên...> [--n=2]`. Ví dụ `npm run art:gen -- obj-piano --n=2`.
   - Ảnh về `art-raw/candidates/<tên>-<số>.jpg`.
   - Mỗi lượt được ghi vào `art-raw/ledger.json`. Script dừng ở **trần 60 lượt** (`CAP` trong `scripts/art/generate.mjs`).
   - Tài khoản dưới 5 USD credit bị giới hạn 6 lượt/phút, nên script tự giãn ~10 giây giữa các lượt và tự thử lại khi gặp 429.
3. Chọn bản đẹp nhất, chép thành `art-raw/<tên>.jpg`.
4. `npm run art`: tách nền xanh, cắt viền, nén WebP có hash vào `public/art/`, cập nhật `src/shared/art/manifest.json`.
5. Chỉnh vị trí trong phòng ở `src/features/room/constants/placements.ts` nếu cần.

## Prompt

Prompt của từng ảnh nằm trong [`scripts/art/prompts.mjs`](../scripts/art/prompts.mjs), là nguồn duy nhất.

- **Nhân vật:** mọi tư thế dùng `art-raw/char-sheet.jpg` làm mẫu. Mẫu hiện tại là ảnh bạn chọn: dáng cao, mảnh, khoảng 4,5 đầu, nét mặt điềm tĩnh. `char-wave` dùng thêm `char-stand` để giữ cùng khung hình.
- **Đồ vật:** vẽ trên nền xanh lá. Seedream không xuất được nền trong suốt.
- **Cảnh:** `scene-city` (ban công nhìn ra Sài Gòn) là ảnh full khung. Căn phòng không dùng ảnh nền: bức tường dài vẽ bằng CSS, cửa sổ (`obj-window`) và bàn (`obj-desk`, tham chiếu `art-raw/refs/desk-setup.jpg`) là ảnh riêng.

## Tách nền làm gì

Nền xanh do AI vẽ không phẳng: có vệt nắng vàng và bóng đổ. `scripts/process-art.mjs` xử lý như sau:

1. Loang từ mép ảnh qua mọi pixel xanh lá hoặc vàng nắng. Nét viền đậm của hình vẽ chặn lại, nên lá cây bên trong vật được giữ.
2. Đục các mảng cùng màu nền bị kẹp kín bên trong vật, ví dụ giữa chân chữ X của đàn. Riêng vật vốn có màu xanh thì bỏ qua bước này.
3. Giữ vật chính, bỏ mọi mảng chạm mép ảnh (vệt nắng, mảng tường AI tự vẽ thêm) và các đốm vụn nhỏ.
