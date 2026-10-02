# Resume Feature

## Mô tả
Trang `/resume`: CV một cột, HTML có ngữ nghĩa để hệ thống ATS đọc được. Trên màn hình là tờ giấy viền mực trên nền tường, kèm nút "Print or save as PDF". Khi in ra là trang A4 chữ đen nền trắng.

## Nghiệp vụ chính
- Thứ tự: tên (h1), chức danh, dòng liên hệ (nơi ở, điện thoại, email, website, GitHub, LinkedIn), Summary, Experience, Selected projects (đủ mọi dự án, theo thứ tự dữ liệu), Skills ("Nhóm: a, b, c"), Education, Award, Certificate.
- Dự án có `url` thì hiện địa chỉ trang; không có `url` thì hiện `status`.
- Link web hiển thị chính địa chỉ của nó (bỏ `https://`, `www.`), nên bản in vẫn đọc được link dẫn đi đâu.
- Bản in: A4, lề 14mm, cỡ chữ gốc 9.5pt, bỏ viền, bóng, nền, gạch chân link; mỗi công việc, dự án không bị cắt giữa hai trang; tiêu đề mục không nằm trơ ở cuối trang.

## Cấu trúc file
| File | Mục đích |
|------|---------|
| `pages/ResumePage.tsx` | Trang `/resume`: ghép nội dung và CSS riêng cho bản in |
| `components/ResumeSection.tsx` | Một mục có tiêu đề h2 |
| `components/ResumeEntry.tsx` | Một công việc, dự án hoặc trường: tiêu đề, thời gian, chi tiết, gạch đầu dòng |
| `components/ResumeLink.tsx` | Link có gạch chân trên màn hình, thành chữ thường khi in |
| `components/PrintButton.tsx` | Nút mở hộp thoại in, `window.print()` (Client Component) |
| `index.ts` | Public API: `ResumePage` |

## Luồng dữ liệu
`shared/constants/site` + `@/features/about` (experience, skills, education, award, certificate) + `@/features/projects` (projects) → `ResumePage`. Chỉ import qua `index.ts` của từng feature.

## Phụ thuộc
- `@/features/about`, `@/features/projects` — dữ liệu CV
- `shared/constants/site`
- `shared/components/PageTransition` — hiệu ứng vào/ra trang
- `shared/ui/button` — nút in

## Ghi chú
- CSS in (`@page` và cỡ chữ) là thẻ `<style href precedence>` để React đưa lên `<head>`. React có thể giữ thẻ này sau khi rời trang, nên các luật quan trọng được giới hạn bằng `:has(#resume)` và không ảnh hưởng khi in trang khác.
- Thanh điều hướng của site đã có `print:hidden`, nút in nằm trong khối `print:hidden`.
- Chỉ `PrintButton` là `'use client'`.
