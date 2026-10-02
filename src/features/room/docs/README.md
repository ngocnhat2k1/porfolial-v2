# Room Feature

## Mô tả
Trang `/room`: căn phòng vẽ tay của Nhật, đóng vai trò menu chính. Mỗi đồ vật dẫn tới một nội dung hoặc phản ứng tại chỗ, thể hiện đúng con người Nhật: góc làm việc vẽ theo setup thật (màn hình + đèn treo, 2 loa, MIDI keyboard, bàn phím cơ, MacBook), điện thoại Android chơi game, guitar, micro, cúp Employee of the Year 2025, ảnh thật trong khung.

## Nghiệp vụ chính
- **Đồ vật dẫn trang:** màn hình trên bàn → `/work`, bảng ghim kỹ năng → `/resume`, khung ảnh → `/about`, ô thư → `/contact`, GitHub/LinkedIn mở tab mới, cửa sổ → quay lại ban công (`/`).
- **Đồ vật phản ứng tại chỗ:** MIDI keyboard trên bàn phát nốt theo chỗ bấm (thang ngũ cung C, bấm lung tung vẫn nghe hay); guitar gảy hợp âm G; micro, điện thoại, cúp làm nhân vật nói một câu.
- **Nhân vật:** tới nơi thì chào; bấm vào thì vẫy tay và nói câu tiếp theo theo vòng.
- Nội dung câu nói chỉ lấy từ profile (sở thích, giải thưởng), không bịa thêm.
- Bàn phím: mọi đồ vật đều Tab tới được; ở piano, Enter/Space đi lên dần theo thang âm.

## Cấu trúc file
| File | Mục đích |
|------|---------|
| `pages/RoomPage.tsx` | Trang: metadata, khung cảnh, provider |
| `components/RoomScene.tsx` | Ghép cảnh từ sau ra trước (Server Component) |
| `components/RoomDecor.tsx` | Phần vẽ bằng code: giấy note kỹ năng, `Area` (vùng % trong một ảnh), chữ chạy trên màn hình, khung ảnh, ô mạng xã hội |
| `components/LinkHotspot.tsx` | Đồ vật dẫn trang, kèm nhãn khi hover/focus |
| `components/ActionHotspot.tsx` | Đồ vật phản ứng tại chỗ (client) |
| `components/PianoKeys.tsx` | Mặt phím vô hình phủ lên MIDI keyboard, phát nốt theo vị trí bấm (client) |
| `components/Mascot.tsx` | Nhân vật: đổi tư thế, bong bóng lời thoại (client) |
| `components/RoomProvider.tsx` | Context client: câu đang nói + nhạc cụ |
| `components/Room.module.css` | Toàn bộ style của phòng, gồm bức tường dài vẽ bằng CSS (`.wall`); đơn vị `cqw` co giãn theo cảnh |
| `constants/placements.ts` | Vị trí từng đồ vật (% của cảnh 16:9), tỉ lệ ảnh, và vùng màn hình/phím đo trên ảnh bàn (`deskArea`) |
| `constants/lines.ts` | Lời thoại và danh sách kỹ năng trên bảng ghim |
| `domain/music.ts` | Nhạc cụ Web Audio: tần số nốt, piano, guitar Karplus–Strong |
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
