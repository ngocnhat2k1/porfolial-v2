# About Feature

## Mô tả
Trang `/about`: Nhật là ai. Phần đầu có tên, chức danh, tóm tắt, việc đang làm, hình `char-window` và một tấm polaroid ảnh thật. Bên dưới là Experience, Skills, Hobbies và Education and awards.

## Nghiệp vụ chính
- Mọi nội dung lấy từ `shared/constants/site` và `constants/career.ts`, không tự thêm thông tin.
- Experience và Education dùng chung cột nhãn 14rem nên thẳng hàng với nhau từ màn `md` trở lên.
- Skills là lưới bento sáu cột: mỗi nhóm một thẻ pastel (`tint`, `span` trong dữ liệu), icon nhóm mờ ở góc. Nhóm `featured` (Core, Frameworks) hiện ô logo lớn; các nhóm khác hiện chip icon + tên. Hover: thẻ nhấc lên, icon góc xoay về, chip nghiêng.
- Mỗi kỹ năng có icon: logo thương hiệu (`simple-icons`, đúng màu hãng, màu gần đen đổi sang màu mực) hoặc icon nét (`lucide-react`) cho kỹ năng không có logo.
- Nhóm kỹ năng có `learning: true` được viền nét đứt và có ghi chú viết tay "in progress".
- Mỗi sở thích có icon SVG vẽ tay cùng nét mực với hình minh họa (`HobbyIcon`).
- Dữ liệu career còn được trang Resume dùng lại qua `index.ts`.

## Cấu trúc file
| File | Mục đích |
|------|---------|
| `pages/AboutPage.tsx` | Trang `/about`: ghép các phần theo thứ tự |
| `components/AboutHero.tsx` | Tên (h1), chức danh, tóm tắt, `char-window` và polaroid "The real me" |
| `components/ExperienceSection.tsx` | Mỗi công việc một hàng: công ty, vai trò, thời gian bên trái, đầu việc bên phải |
| `components/SkillsSection.tsx` | Lưới bento các nhóm kỹ năng, đánh dấu nhóm đang học |
| `components/SkillIcon.tsx` | Vẽ logo `simple-icons` hoặc icon `lucide-react` của một kỹ năng |
| `types/skill.ts` | Kiểu `Skill`, `SkillGroup` |
| `components/HobbiesSection.tsx` | Sở thích kèm icon, bên cạnh hình `char-guitar` |
| `components/HobbyIcon.tsx` | Bộ icon SVG: guitar, piano, mic, gamepad, android, laptop |
| `components/EducationSection.tsx` | Trường, giải thưởng, chứng chỉ trong một `dl` |
| `constants/career.ts` | Kinh nghiệm, kỹ năng, học vấn, giải thưởng, chứng chỉ, sở thích |
| `index.ts` | Public API: dữ liệu trong `constants/career.ts` |

## Luồng dữ liệu
`constants/career.ts` → từng section đọc thẳng phần dữ liệu của mình → `AboutPage` xếp các section. `HobbyIcon` nhận `name` có kiểu là key của bộ icon, nên `hobbies[].icon` thiếu hình là lỗi lúc typecheck.

## Phụ thuộc
- `shared/constants/site` — tên, chức danh, `summary`, `now`
- `shared/components/PageTransition` — hiệu ứng vào/ra trang
- `shared/components/ArtImage` — hình `char-window`, `char-guitar`
- `shared/utils/cx`
- `simple-icons`, `lucide-react` — icon kỹ năng (render phía server, không thêm JS)
- `next/image` — ảnh thật `public/images/nhat-beach.jpg` (675×900)

## Ghi chú
- Toàn bộ là Server Component, trang không gửi JS riêng xuống trình duyệt.
- Chữ viết tay (`font-hand`) chỉ dùng hai chỗ: chú thích polaroid và ghi chú nhóm kỹ năng đang học.
- Hình `char-window` tải ngay (`eager`) vì nằm trong màn hình đầu.
