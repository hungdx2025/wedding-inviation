/* =============================================================
 *  THIỆP CƯỚI ONLINE — FILE CẤU HÌNH DUY NHẤT
 *  Mọi thông tin hiển thị trên web đều lấy từ file này.
 *  Bạn chỉ cần sửa file này, KHÔNG cần đụng vào HTML/CSS/JS khác.
 *  Những dòng có ghi  // ⚠️ CẦN ĐIỀN  là chỗ còn thiếu dữ liệu.
 * ============================================================= */

window.WEDDING_CONFIG = {

  /* ---------- 1. THÔNG TIN CHUNG ---------- */
  site: {
    browserTitle: "Xuân Hưng ❤ Hà Du | 18.10.2026",
    monogramLeft: "H",
    monogramRight: "D",
    hashtag: "#XuanHung_HaDu",
    coverNote: "Trân trọng kính mời",
    coverGuestLine: "Tới dự bữa cơm thân mật mừng lễ thành hôn của hai chúng tôi",
    openButton: "Mở thiệp mời",
  },

  /* ---------- 2. NHẠC NỀN ---------- */
  music: {
    src: "assets/music/AnhNangCuaAnh4MB.mp3",
    volume: 0.45,
    playOnOpen: true,                    // tự phát khi bấm "Mở thiệp mời"
  },

  /* ---------- 3. CÔ DÂU & CHÚ RỂ ---------- */
  couple: {
    groom: {
      role: "Chú rể",
      fullName: "Đỗ Xuân Hưng",
      shortName: "Xuân Hưng",
      birthday: "28/08",                  // chỉ hiện ngày/tháng, không hiện năm sinh
      photo: "assets/images/couple/chuRe.jpg",
      photoPosition: "50% 8%",            // canh khung ảnh tròn sao cho lấy đúng mặt
      father: "Ông Đỗ Xuân Vỹ",
      mother: "Bà Nguyễn Thị Thông",
      addressOld: "Thôn Bùi, TP. Phủ Lý, Tỉnh Hà Nam",
      addressNew: "Phường Liêm Tuyền, Tỉnh Ninh Bình",
      quote: "Cảm ơn em đã đến, và ở lại.",
      phone: "",                          // ví dụ "0912345678" — để trống sẽ ẩn nút gọi
    },
    bride: {
      role: "Cô dâu",
      fullName: "Trịnh Hà Du",
      shortName: "Hà Du",
      birthday: "05/02",                  // chỉ hiện ngày/tháng, không hiện năm sinh
      photo: "assets/images/couple/coDau.jpg",
      photoPosition: "50% 5%",
      father: "Ông Trịnh Xuân Đệ",
      mother: "Bà Nguyễn Thị Thu",
      addressOld: "Thôn Kim Long Nội, Xã Hoàng Long, Huyện Phú Xuyên, TP. Hà Nội",
      addressNew: "Thôn Hoàng Long, Xã Phượng Dực, TP. Hà Nội",
      quote: "Chặng đường phía trước, có anh là đủ.",
      phone: "",
    },
  },

  /* ---------- 4. CÁC NGHI LỄ ---------- */
  events: [
    {
      key: "tiec-nha-gai",
      name: "Bữa Cơm Thân Mật",
      icon: "cups",
      time: "16 giờ 00",
      weekday: "Thứ Bảy",
      date: "17.10.2026",
      lunar: "Tức ngày 08 tháng 09 năm Bính Ngọ",
      host: "Tư gia nhà gái",
      addressOld: "Thôn Kim Long Nội, Xã Hoàng Long, Huyện Phú Xuyên, TP. Hà Nội",
      addressNew: "Thôn Hoàng Long, Xã Phượng Dực, TP. Hà Nội",
      mapQuery: "Thôn Kim Long Nội, Xã Hoàng Long, Phú Xuyên, Hà Nội",
      note: "Rất hân hạnh được đón tiếp!",
    },
    {
      key: "tiec-nha-trai",
      name: "Bữa Cơm Thân Mật",
      icon: "cups",
      time: "10 giờ 30",
      weekday: "Chủ Nhật",
      date: "18.10.2026",
      lunar: "Tức ngày 09 tháng 09 năm Bính Ngọ",
      host: "Tư gia nhà trai",
      addressOld: "Thôn Bùi, TP. Phủ Lý, Tỉnh Hà Nam",
      addressNew: "Phường Liêm Tuyền, Tỉnh Ninh Bình",
      mapQuery: "Thôn Bùi, Trịnh Xá, TP. Phủ Lý, Ninh Bình",
      lat: 20.5319381,
      lng: 105.9788146,
      note: "Rất hân hạnh được đón tiếp!",
    },
    {
      key: "vu-quy",
      name: "Lễ Vu Quy",
      icon: "tray",
      time: "8 giờ 00",
      weekday: "Chủ Nhật",
      date: "18.10.2026",
      lunar: "Tức ngày 09 tháng 09 năm Bính Ngọ",
      host: "Tư gia nhà gái",
      addressOld: "Thôn Kim Long Nội, Xã Hoàng Long, Huyện Phú Xuyên, TP. Hà Nội",
      addressNew: "Thôn Hoàng Long, Xã Phượng Dực, TP. Hà Nội",
      mapQuery: "Thôn Kim Long Nội, Xã Hoàng Long, Phú Xuyên, Hà Nội",
      note: "Rất hân hạnh được đón tiếp!",
    },
    {
      key: "thanh-hon",
      name: "Lễ Thành Hôn",
      icon: "rings",
      time: "10 giờ 00",
      weekday: "Chủ Nhật",
      date: "18.10.2026",
      lunar: "Tức ngày 09 tháng 09 năm Bính Ngọ",
      host: "Tư gia nhà trai",
      addressOld: "Thôn Bùi, TP. Phủ Lý, Tỉnh Hà Nam",
      addressNew: "Phường Liêm Tuyền, Tỉnh Ninh Bình",
      mapQuery: "Thôn Bùi, Trịnh Xá, TP. Phủ Lý, Ninh Bình",
      lat: 20.5319381,                    // toạ độ nhà trai — nút chỉ đường sẽ dẫn đúng điểm này
      lng: 105.9788146,
      note: "Sự hiện diện của Quý vị là niềm vinh hạnh cho gia đình chúng tôi!",
    },
  ],

  /* ---------- 4B. BẢN ĐỒ NHÀ TRAI ----------
   * embedSrc: lấy từ Google Maps → Chia sẻ → Nhúng bản đồ → copy phần src="..."
   * (chỉ copy đường link bên trong src, không cần cả thẻ iframe)
   */
  map: {
    show: true,
    title: "Đường tới nhà",
    subtitle: "Tư gia nhà trai — nơi tổ chức Lễ Thành Hôn",
    placeName: "Thôn Bùi, Trịnh Xá, TP. Phủ Lý, Ninh Bình",
    lat: 20.5319381,
    lng: 105.9788146,
    embedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1993.1807307555018!2d105.97881455807367!3d20.531938142810976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135c5532acfb719%3A0x90a2c9302f554f3a!2zdGjDtG4gQsO5aSwgVHLhu4tuaCBYw6EsIFRwLiBQaOG7pyBMw70sIE5pbmggQsOsbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1790094694755!5m2!1svi!2s",
    note: "Bấm “Chỉ đường” để mở Google Maps dẫn thẳng tới nhà.",
  },

  /* ---------- 5. ĐỒNG HỒ ĐẾM NGƯỢC ---------- */
  countdown: {
    target: "2026-10-18T10:00:00+07:00", // khớp giờ Lễ Thành Hôn
    label: "Đếm ngược tới ngày chung đôi",
    doneText: "Hôm nay là ngày hạnh phúc của chúng mình!",
  },

  /* ---------- 6. ALBUM ẢNH CƯỚI ---------- */
  gallery: [
    { src: "assets/images/albumAnhCuoi/01.jpg", caption: "Áo dài đỏ, chữ Hỷ trăm năm" },
    { src: "assets/images/albumAnhCuoi/02.jpg", caption: "Nghiêng vành nón, trao nhau nụ cười" },
    { src: "assets/images/albumAnhCuoi/03.jpg", caption: "Chạm trán dưới ánh hoàng hôn" },
    { src: "assets/images/albumAnhCuoi/04.jpg", caption: "Trao nhau lời thề nguyện" },
    { src: "assets/images/albumAnhCuoi/05.jpg", caption: "Khoảnh khắc của riêng hai đứa" },
    { src: "assets/images/albumAnhCuoi/06.jpg", caption: "Từ nay có nhau" },
    { src: "assets/images/albumAnhCuoi/07.jpg", caption: "Cứ vui như thế, cả đời bên nhau" },
    { src: "assets/images/albumAnhCuoi/08.jpg", caption: "Ánh mắt chỉ dành cho nhau" },
    { src: "assets/images/albumAnhCuoi/09.jpg", caption: "Nụ hôn dưới nắng chiều" },
  ],

  /* ---------- 7. VIDEO NGẮN ---------- */
  video: {
    src: "assets/video/wedding-clip.mp4", // đặt file mp4 của bạn vào đây
    poster: "assets/images/gallery/01.svg",
    title: "Một thước phim nhỏ của chúng mình",
    subtitle: "Bấm để xem — nhớ bật loa nhé!",
  },

  /* ---------- 8. MỪNG CƯỚI (QR CODE) ----------
   * Có 2 cách hiển thị mã QR:
   *  (A) Dùng ảnh QR có sẵn: chụp/tải QR từ app ngân hàng, lưu vào assets/qr/
   *      rồi điền vào "qrImage".
   *  (B) Tự sinh VietQR: để qrImage = "" và điền bankId + accountNo.
   *      Danh sách bankId: vietcombank, techcombank, mbbank, bidv, vietinbank,
   *      acb, tpbank, vpbank, sacombank, agribank, vib, hdbank, ocb, msb, scb...
   */
  gifts: [
    {
      owner: "Chú rể",
      name: "Đỗ Xuân Hưng",
      bankName: "BIDV – PGD Đức Giang",
      bankId: "bidv",
      accountNo: "1510861924",
      accountName: "DO XUAN HUNG",
      qrImage: "assets/qr/chu-re.jpg",    // ảnh QR thật, hoặc để "" để tự sinh VietQR
    },
    {
      owner: "Cô dâu",
      name: "Trịnh Hà Du",
      bankName: "TPBank",
      bankId: "tpbank",
      accountNo: "00389145001",
      accountName: "TRINH HA DU",
      qrImage: "assets/qr/co-dau.jpg",
    },
  ],

  /* ---------- 9. LỜI CẢM ƠN ---------- */
  thanks: {
    heading: "Cảm ơn Quý vị",
    lines: [
      "Sự hiện diện của Quý vị là niềm vinh hạnh cho gia đình chúng tôi.",
      "Xin chân thành cảm ơn!",
    ],
  },

  /* ---------- 10. HIỆU ỨNG ---------- */
  effects: {
    petals: true,        // cánh hoa rơi
    petalCount: 26,      // giảm xuống nếu máy yếu
    heartsOnOpen: true,  // pháo hoa trái tim khi mở thiệp
  },
};
