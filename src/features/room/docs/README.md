# Room Feature

## Mô tả
Trang `/room`: căn phòng vẽ tay của Nhật, đóng vai trò menu chính. Mỗi đồ vật dẫn tới một nội dung hoặc phản ứng tại chỗ, thể hiện đúng con người Nhật: góc làm việc vẽ theo setup thật (màn hình + đèn treo, 2 loa, MIDI keyboard, bàn phím cơ, MacBook), điện thoại Android chơi game, guitar, micro, cúp Employee of the Year 2025, ảnh thật trong khung.

## Nghiệp vụ chính
- **Đồ vật dẫn trang:** màn hình trên bàn (gõ dần vài dòng code) → `/work`, đèn neon `</>` → GitHub, bảng ghim kỹ năng → `/resume`, khung ảnh → `/about`, ô thư → `/contact`, GitHub/LinkedIn mở tab mới, cửa sổ → quay lại ban công (`/`).
- **Đồ vật phản ứng tại chỗ:** MIDI keyboard trên bàn phát nốt theo chỗ bấm (thang ngũ cung C, bấm lung tung vẫn nghe hay); guitar gảy hợp âm G; điện thoại rung; micro ngân nga một đoạn nhạc; cúp kêu "ting" và bắn confetti; mèo kêu meo.
- **Hover = Nhật bình luận:** rê chuột vào điện thoại, cúp, micro, guitar, vịt, mèo, màn hình, khung ảnh, đồng hồ hay từng tờ note kỹ năng là bong bóng hiện câu tương ứng (`useSayOnHover`; màn hình cảm ứng thì chạm vào).
- **Hover = đồ vật cử động (CSS):** cây lắc lá, neon chớp, điện thoại rung + chấm thông báo, cúp có vệt sáng lướt (mask theo hình cúp), micro tỏa vòng sóng âm, guitar rung, khung ảnh nghiêng, note nhấc lên, màn hình lật qua ảnh các dự án nổi bật, mèo thức dậy và vẫy đuôi (2 khung hình xen kẽ).
- **Công tắc đèn:** tắt đèn thì tường và đồ vật tối lại, cửa sổ chuyển cảnh đêm (`obj-window-night`), neon/màn hình/ánh trăng tỏa sáng (`.glow`, blend `screen`); công tắc phát sáng nhẹ để luôn tìm thấy.
- **Đồng hồ treo tường:** kim chạy theo giờ thật ở Sài Gòn (`Asia/Ho_Chi_Minh`), kim chỉ hiện sau khi trình duyệt biết giờ.
- **Vịt cao su:** bấm vào mở ô "kể bug cho vịt", gửi đi thì vịt đáp "Quack." và Nhật chốt một câu. Không gửi dữ liệu đi đâu cả.
- **Nhân vật:** tới nơi thì chào; rê chuột vào thì vẫy tay và nói câu tiếp theo theo vòng (màn hình cảm ứng: chạm vào, vẫy 2,4 giây). Ảnh vẫy tay được đặt chồng khít lên ảnh đứng theo hộp `over` trong manifest.
- Nội dung câu nói chỉ lấy từ profile và danh sách dự án (sở thích, giải thưởng, kỹ năng dùng ở dự án nào), không bịa thêm; câu về đồ vật trong phòng (mèo, đèn) không khẳng định gì về Nhật.
- Bàn phím: mọi đồ vật đều Tab tới được; ở piano, Enter/Space đi lên dần theo thang âm.

## Cấu trúc file
| File | Mục đích |
|------|---------|
| `pages/RoomPage.tsx` | Trang: metadata, khung cảnh, provider |
| `components/RoomScene.tsx` | Ghép cảnh từ sau ra trước (Server Component) |
| `components/RoomDecor.tsx` | Phần tĩnh vẽ bằng code (server): `Area` (vùng % trong một ảnh), màn hình gõ code + ảnh dự án (`CodeScreen`), đèn neon, khung ảnh, ô mạng xã hội |
| `components/RoomGadgets.tsx` | Phần tương tác nhỏ (client): `SayOnHover`, note kỹ năng, công tắc đèn, đồng hồ giờ Sài Gòn, vịt cao su |
| `components/LinkHotspot.tsx` | Đồ vật dẫn trang, kèm nhãn khi hover/focus |
| `components/ActionHotspot.tsx` | Đồ vật phản ứng tại chỗ (client): hover nói, bấm phát âm thanh; cúp bắn confetti |
| `components/PianoKeys.tsx` | Mặt phím vô hình phủ lên MIDI keyboard, phát nốt theo vị trí bấm (client) |
| `components/Mascot.tsx` | Nhân vật: đổi tư thế, bong bóng lời thoại (client) |
| `components/RoomProvider.tsx` | Context client: câu đang nói + nhạc cụ |
| `components/Room.module.css` | Toàn bộ style của phòng, gồm bức tường dài vẽ bằng CSS (`.wall`); đơn vị `cqw` co giãn theo cảnh |
| `constants/placements.ts` | Vị trí từng đồ vật (% của cảnh 16:9), tỉ lệ ảnh, và vùng màn hình/phím đo trên ảnh bàn (`deskArea`) |
| `constants/lines.ts` | Lời thoại (hover, sau khi bấm, đèn, đồng hồ) và kỹ năng trên bảng ghim kèm câu nói |
| `domain/music.ts` | Âm thanh Web Audio: tần số nốt, piano, guitar Karplus–Strong, tiếng vịt, mèo, rung điện thoại, giọng ngân nga |
| `domain/music.test.mjs` | Test cho phần ánh xạ vị trí → nốt (`npm test`) |
| `hooks/useSynth.ts` | Tạo AudioContext ở lần bấm đầu, trả về `playPiano`, `strumGuitar` |

## Luồng dữ liệu
`RoomPage` → `RoomProvider` (client) bọc cảnh → `RoomScene` (server) render ảnh + hotspot. Hotspot client gọi `useRoom()` → `say()` cập nhật bong bóng của `Mascot`, hoặc `playPiano()`/`strumGuitar()` → `useSynth` → `domain/music`.

## Phụ thuộc
- `shared/components/Scene`, `ArtImage`, `MascotTransition`, `PageTransition`
- `shared/constants/site` — link GitHub, LinkedIn

## Ghi chú
- Chỉ những phần cần tương tác mới là Client Component; nền và đồ vật tĩnh render ở server, ảnh truyền vào `Mascot` dưới dạng props (`standing`, `waving`).
- Âm thanh chỉ phát khi người dùng bấm, không tự phát.
- Tường là một mặt phẳng dài vẽ bằng CSS (tường, len chân tường, sàn ván gỗ, vân sơn, quầng nắng quanh cửa sổ), nên phủ được mọi bề rộng màn hình và đồ treo luôn thẳng. Mọi thứ khác là ảnh AI riêng, nét.
- Cảnh luôn hiện trọn chiều cao: màn hình hẹp bị cắt hai bên, điện thoại dọc thì vuốt ngang (lúc vào tự cuộn tới nhân vật).
- Đổi ảnh bàn thì đo lại `deskArea` (màn hình, dải phím) theo % của ảnh mới.
- Trạng thái thay thế (Nhật vẫy tay, cửa sổ đêm, mèo thức) là ảnh AI *sửa* từ ảnh gốc trên cùng canvas; `npm run art` ghi vị trí chồng vào manifest (`OVERLAYS`), component dùng `overlayStyle()` + class `.over`. Ảnh nào AI vẽ lệch thì hiệu chỉnh bằng `REALIGN` trong `scripts/process-art.mjs`.
