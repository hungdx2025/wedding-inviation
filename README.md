# Thiệp cưới online — Xuân Hưng ❤ Hà Du (18.10.2026)

Web tĩnh thuần HTML/CSS/JS, **không cần cài đặt gì**, chạy được trên cả điện thoại và máy tính.

## Chạy thử

Mở thẳng file `index.html` bằng trình duyệt là xem được ngay.
Nếu muốn giống môi trường thật (để video/nhạc chạy ổn định):

```bash
# Python có sẵn trên đa số máy
python -m http.server 5500
# rồi mở http://localhost:5500
```

---

## Bạn cần điền / thay những gì

### 1. Mở `js/config.js` — đây là file duy nhất cần sửa

Các chỗ có dấu `⚠️ CẦN ĐIỀN`:

| Mục | Nội dung còn thiếu |
|---|---|
| `events[0].time` | Giờ đón khách của **Bữa cơm thân mật** ngày 17.10 (đang để `__ giờ __`) |
| `gifts[]` | Tên ngân hàng + số tài khoản cô dâu / chú rể |

Những thông tin đã lấy sẵn từ 2 tấm thiệp giấy (không cần sửa):

- **Cô dâu & chú rể:** Xuân Hưng (sinh 28/08) & Hà Du (sinh 05/02) — chỉ hiện ngày/tháng, không hiện năm
- **Bữa cơm thân mật (nhà gái):** Thứ Bảy 17.10.2026 — 08/09 Bính Ngọ
- **Lễ Vu Quy (nhà gái):** Chủ Nhật 18.10.2026 — **9 giờ 30** — 09/09 Bính Ngọ
- **Lễ Thành Hôn (nhà trai):** Chủ Nhật 18.10.2026 — **10 giờ 30** — 09/09 Bính Ngọ
  (đồng hồ đếm ngược và nút *Lưu vào lịch* đều đã khớp mốc 10h30 ngày 18.10.2026)
- **Nhà trai:** Ông Đỗ Xuân Vỹ – Bà Nguyễn Thị Thông ·
  Thôn Bùi, TP. Phủ Lý, Tỉnh Hà Nam *(cũ)* → Phường Liêm Tuyền, Tỉnh Ninh Bình *(mới)*
- **Nhà gái:** Ông Trịnh Xuân Đệ – Bà Nguyễn Thị Thu ·
  Thôn Kim Long Nội, Xã Hoàng Long, Huyện Phú Xuyên, TP. Hà Nội *(cũ)* →
  Thôn Hoàng Long, Xã Phượng Dực, TP. Hà Nội *(mới)*

### 2. Thay ảnh, nhạc, video

| Thay gì | Bỏ file vào | Ghi chú |
|---|---|---|
| Ảnh cô dâu / chú rể | `assets/images/couple/` | ảnh vuông, ~800×800 |
| 6 ảnh cưới | `assets/images/gallery/` | ảnh dọc 3:4 đẹp nhất, nén < 400 KB/ảnh |
| Nhạc nền | `assets/music/nhac-nen.mp3` | nên cắt 60–120 giây, < 3 MB |
| Video ngắn | `assets/video/wedding-clip.mp4` | H.264/MP4, 15–40 giây, < 20 MB |
| Mã QR | `assets/qr/` | chụp QR từ app ngân hàng |

Sau khi thay, sửa lại đuôi file trong `config.js` (ví dụ `01.svg` → `01.jpg`).

### 3. Mã QR — 2 cách

- **Cách A (khuyên dùng):** lưu ảnh QR từ app ngân hàng vào `assets/qr/chu-re.png`,
  rồi đặt `qrImage: "assets/qr/chu-re.png"`.
- **Cách B:** để `qrImage: ""` và điền `bankId` + `accountNo` — web tự sinh mã VietQR
  (cần có mạng khi xem thiệp).

### 4. Bản đồ

Mục `map` trong `config.js` đã gắn sẵn vị trí nhà trai (Thôn Bùi, Trịnh Xá, TP. Phủ Lý).
Muốn đổi sang điểm khác:

1. Google Maps → tìm địa điểm → **Chia sẻ** → **Nhúng bản đồ** → copy phần trong `src="..."`
   (chỉ lấy đường link, không lấy cả thẻ `<iframe>`) → dán vào `map.embedSrc`
2. Sửa `map.lat` / `map.lng` cho khớp (lấy bằng cách bấm chuột phải lên điểm đó trên Google Maps),
   vì nút *Chỉ đường* dùng toạ độ để dẫn đúng nhà thay vì chỉ ra giữa xã
3. Không muốn hiện bản đồ: đặt `map.show = false`

---

## Có sẵn những gì

- Màn **mở thiệp** với nơ hồng, mở xong mới bật nhạc (tránh bị trình duyệt chặn autoplay)
- **Nhạc nền** có nút bật/tắt nổi, tự dừng khi chuyển tab hoặc khi phát video
- **Cánh hoa rơi** vẽ bằng canvas, tự giảm số lượng trên điện thoại
- Hiệu ứng **hiện dần khi cuộn**, tim đập, nơ đung đưa, pháo tim khi mở thiệp
- Thông tin **cô dâu / chú rể**: ngày sinh, cha mẹ, **địa chỉ cũ + địa chỉ mới**
- **3 mốc sự kiện** (Bữa cơm thân mật · Lễ Vu Quy · Lễ Thành Hôn): giờ, thứ, ngày dương, ngày âm, nơi tổ chức, nút **chỉ đường Google Maps**
- **Bản đồ Google Maps nhúng** vị trí nhà trai + nút *Chỉ đường* dẫn thẳng tới toạ độ (20.53194, 105.97881)
- **Đồng hồ đếm ngược** + nút **lưu vào lịch** (tải file `.ics`)
- **Album ảnh** có lightbox: bấm, dùng phím ←/→, vuốt trên điện thoại
- **Video** có nút play riêng, báo rõ nếu chưa có file
- **Hộp mừng cưới**: QR + nút sao chép số tài khoản
- Nút **chia sẻ** thiệp, thẻ Open Graph để gửi Zalo/Messenger hiện đẹp
- Responsive mobile + desktop, hỗ trợ **in ra PDF**, tôn trọng chế độ *giảm chuyển động*

## Đưa lên mạng (miễn phí)

Kéo cả thư mục này thả vào [netlify.com/drop](https://app.netlify.com/drop) là có link gửi khách.
Hoặc dùng GitHub Pages / Vercel — vì là web tĩnh nên host nào cũng chạy.

## Cấu trúc

```
index.html          khung thiệp
css/style.css       toàn bộ giao diện + hiệu ứng
js/config.js        ★ DỮ LIỆU — chỉ cần sửa file này
js/main.js          render + tương tác
assets/             ảnh, nhạc, video, QR
```
