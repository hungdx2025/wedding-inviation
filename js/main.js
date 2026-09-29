/* =============================================================
 *  THIỆP CƯỚI ONLINE — main.js
 *  Không dùng thư viện ngoài. Mọi dữ liệu đọc từ js/config.js
 * ============================================================= */
(function () {
  "use strict";

  var CFG = window.WEDDING_CONFIG || {};
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiện ích ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var toastTimer;
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("is-show"); }, 2400);
  }

  /* ---------- bộ icon SVG ---------- */
  var ICON = {
    cake:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 20h16v-6a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v6Z"/><path d="M12 8V5"/><path d="M12 4.5c.9-.8.3-2.2-.8-2 .8.7.3 1.6.8 2Z" fill="currentColor"/><path d="M4 16c2 1.6 3.4 1.6 5.3 0S13 14.4 15 16s3 1.6 5 0"/></svg>',
    home:  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    users: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 14.4a4.6 4.6 0 0 1 4.5 4.6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h3l1.6 4-2 1.4a12 12 0 0 0 5.9 5.9l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z"/></svg>',
    pin:   '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    tray:  '<svg viewBox="0 0 26 26" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M4 12h18l-1.6 8H5.6L4 12Z"/><path d="M8 12c0-4 2.2-6 5-6s5 2 5 6"/><path d="M13 6V3"/><path d="M10.5 4.2 13 3l2.5 1.2"/></svg>',
    rings: '<svg viewBox="0 0 26 26" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="16" r="6"/><circle cx="17" cy="16" r="6"/><path d="M13.5 5.5 15.5 9h-4l2-3.5Z" fill="currentColor" stroke-linejoin="round"/></svg>',
    cups:  '<svg viewBox="0 0 26 26" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h7l-2.2 6a2.4 2.4 0 0 1-4.6 0L4 4Z"/><path d="M8.7 12.4V21"/><path d="M6 21h5.4"/><path d="M15 4h7l-2.2 6a2.4 2.4 0 0 1-4.6 0L15 4Z"/><path d="M19.7 12.4V21"/><path d="M17 21h5.4"/></svg>',
    play:  '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>'
  };

  /* =============================================================
     1. RENDER — CÔ DÂU & CHÚ RỂ
     ============================================================= */
  function addrBlock(o) {
    return '<span class="addr-tag addr-tag--old">Địa chỉ cũ</span>' + esc(o.addressOld) +
           '<small><span class="addr-tag addr-tag--new">Địa chỉ mới</span>' + esc(o.addressNew) + '</small>';
  }

  function personCard(p) {
    var card = el("article", "person reveal");
    card.setAttribute("data-anim", p.role === "Chú rể" ? "left" : "right");
    card.innerHTML =
      '<div class="person__photo"><img src="' + esc(p.photo) + '" alt="' + esc(p.fullName) + '" loading="lazy" style="object-position:' + esc(p.photoPosition || "center") + '" /></div>' +
      '<span class="person__role">' + esc(p.role) + '</span>' +
      '<h4 class="person__name">' + esc(p.fullName) + '</h4>' +
      '<p class="person__quote">“' + esc(p.quote) + '”</p>' +
      '<dl class="person__facts">' +
        '<div class="fact"><span class="fact__icon">' + ICON.cake + '</span>' +
          '<div><dt>Ngày sinh</dt><dd>' + esc(p.birthday) + '</dd></div></div>' +
        '<div class="fact"><span class="fact__icon">' + ICON.users + '</span>' +
          '<div><dt>Gia đình</dt><dd class="fact__parents">' +
            '<span>' + esc(p.father) + '</span><span>' + esc(p.mother) + '</span>' +
          '</dd></div></div>' +
        '<div class="fact fact--addr"><span class="fact__icon">' + ICON.home + '</span>' +
          '<div><dt>Địa chỉ</dt><dd>' + addrBlock(p) + '</dd></div></div>' +
      '</dl>' +
      (p.phone
        ? '<a class="person__call" href="tel:' + esc(p.phone) + '">' + ICON.phone + 'Gọi ' + esc(p.shortName) + '</a>'
        : '');
    return card;
  }

  function renderCouple() {
    var grid = $("#coupleGrid");
    if (!grid || !CFG.couple) return;
    grid.appendChild(personCard(CFG.couple.groom));
    grid.appendChild(personCard(CFG.couple.bride));
  }

  /* =============================================================
     2. RENDER — SỰ KIỆN
     ============================================================= */
  /* Link chỉ đường: ưu tiên toạ độ (chính xác tuyệt đối), không có thì dùng địa chỉ chữ */
  function directionsUrl(o) {
    if (o && typeof o.lat === "number" && typeof o.lng === "number") {
      return "https://www.google.com/maps/dir/?api=1&destination=" + o.lat + "," + o.lng;
    }
    return "https://www.google.com/maps/search/?api=1&query=" +
           encodeURIComponent((o && (o.mapQuery || o.placeName || o.addressNew || o.addressOld)) || "");
  }

  function renderEvents() {
    var grid = $("#eventsGrid");
    if (!grid || !CFG.events) return;
    CFG.events.forEach(function (ev, i) {
      var card = el("article", "event reveal");
      card.setAttribute("data-anim", ["left", "up", "right"][i % 3]);
      card.style.transitionDelay = Math.min(i * 110, 330) + "ms";
      var mapUrl = directionsUrl(ev);
      card.innerHTML =
        '<div class="event__icon">' + (ICON[ev.icon] || ICON.rings) + '</div>' +
        '<h4 class="event__name">' + esc(ev.name) + '</h4>' +
        '<p class="event__time">Được tổ chức vào hồi <strong>' + esc(ev.time) + '</strong></p>' +
        '<span class="event__weekday">' + esc(ev.weekday) + '</span>' +
        '<p class="event__date">' + esc(ev.date) + '</p>' +
        '<p class="event__lunar">(' + esc(ev.lunar).replace(/^\(|\)$/g, "") + ')</p>' +
        '<span class="event__sep" aria-hidden="true"></span>' +
        '<p class="event__host">Tại: ' + esc(ev.host) + '</p>' +
        '<p class="event__addr">' + esc(ev.addressOld) + '<small>(' + esc(ev.addressNew) + ')</small></p>' +
        '<p class="event__note">' + esc(ev.note) + '</p>' +
        '<a class="event__map" href="' + mapUrl + '" target="_blank" rel="noopener">' + ICON.pin + 'Xem chỉ đường</a>';
      grid.appendChild(card);
    });
  }

  /* =============================================================
     2B. RENDER — BẢN ĐỒ NHÀ TRAI
     ============================================================= */
  function renderMap() {
    var box = $("#mapBox");
    var sec = $("#map");
    var m = CFG.map;
    if (!box || !sec) return;
    if (!m || m.show === false) { sec.remove(); return; }

    if (m.title) $("#mapTitle").textContent = m.title;
    if (m.subtitle) $("#mapSub").textContent = m.subtitle;

    var dirUrl = directionsUrl(m);
    var viewUrl = (typeof m.lat === "number" && typeof m.lng === "number")
      ? "https://www.google.com/maps/search/?api=1&query=" + m.lat + "," + m.lng
      : dirUrl;

    box.innerHTML =
      '<div class="mapbox__frame">' +
        (m.embedSrc
          ? '<iframe src="' + esc(m.embedSrc) + '" loading="lazy" allowfullscreen ' +
            'referrerpolicy="strict-origin-when-cross-origin" ' +
            'title="Bản đồ tới ' + esc(m.placeName || "nơi tổ chức") + '"></iframe>'
          : '<div class="mapbox__missing">Chưa gắn bản đồ.<br />Dán link nhúng Google Maps vào <b>map.embedSrc</b> trong config.js</div>') +
      '</div>' +
      '<div class="mapbox__foot">' +
        '<div>' +
          '<p class="mapbox__place">' + ICON.pin + esc(m.placeName || "") + '</p>' +
          (m.note ? '<p class="mapbox__note">' + esc(m.note) + '</p>' : '') +
        '</div>' +
        '<div class="mapbox__actions">' +
          '<a class="mapbox__btn" href="' + dirUrl + '" target="_blank" rel="noopener">' + ICON.pin + 'Chỉ đường</a>' +
          '<a class="mapbox__btn mapbox__btn--ghost" href="' + viewUrl + '" target="_blank" rel="noopener">Mở Google Maps</a>' +
        '</div>' +
      '</div>';
  }

  /* =============================================================
     3. RENDER — ALBUM ẢNH + LIGHTBOX
     ============================================================= */
  var lbIndex = 0;
  function renderGallery() {
    var grid = $("#galleryGrid");
    if (!grid || !CFG.gallery) return;
    CFG.gallery.forEach(function (img, i) {
      var fig = el("figure", "gallery__item reveal");
      fig.setAttribute("data-anim", "zoom");
      fig.style.transitionDelay = Math.min(i * 70, 420) + "ms";
      fig.innerHTML =
        '<img src="' + esc(img.src) + '" alt="' + esc(img.caption || "Ảnh cưới " + (i + 1)) + '" loading="lazy" />' +
        '<figcaption>' + esc(img.caption || "") + '</figcaption>';
      fig.tabIndex = 0;
      fig.addEventListener("click", function () { openLightbox(i); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(i); }
      });
      grid.appendChild(fig);
    });
  }

  function openLightbox(i) {
    lbIndex = i;
    var item = CFG.gallery[i];
    $("#lbImg").src = item.src;
    $("#lbImg").alt = item.caption || "";
    $("#lbCap").textContent = item.caption || "";
    $("#lightbox").classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    $("#lightbox").classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function stepLightbox(d) {
    if (!CFG.gallery || !CFG.gallery.length) return;
    openLightbox((lbIndex + d + CFG.gallery.length) % CFG.gallery.length);
  }

  function bindLightbox() {
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", function () { stepLightbox(-1); });
    $("#lbNext").addEventListener("click", function () { stepLightbox(1); });
    $("#lightbox").addEventListener("click", function (e) {
      if (e.target === this) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (!$("#lightbox").classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });
    // vuốt trên điện thoại
    var x0 = null;
    var lb = $("#lightbox");
    lb.addEventListener("touchstart", function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }

  /* =============================================================
     4. RENDER — VIDEO
     ============================================================= */
  function renderVideo() {
    var box = $("#videoBox");
    if (!box || !CFG.video) return;
    if (CFG.video.title) $("#videoTitle").textContent = CFG.video.title;
    if (CFG.video.subtitle) $("#videoSub").textContent = CFG.video.subtitle;

    box.innerHTML =
      '<video id="weddingVideo" playsinline preload="metadata" controls ' +
        'poster="' + esc(CFG.video.poster || "") + '">' +
        '<source src="' + esc(CFG.video.src) + '" type="video/mp4" />' +
      '</video>' +
      '<button class="video__play" type="button" aria-label="Phát video"><span>' + ICON.play + '</span></button>';

    var v = $("#weddingVideo", box);
    var btn = $(".video__play", box);

    btn.addEventListener("click", function () {
      var bgm = $("#bgm");
      if (bgm && !bgm.paused) { bgm.pause(); updateMusicBtn(); }   // tránh chồng tiếng
      v.play();
    });
    v.addEventListener("play",  function () { box.classList.add("is-playing"); });
    v.addEventListener("pause", function () { box.classList.remove("is-playing"); });
    v.addEventListener("error", showMissing);
    v.querySelector("source").addEventListener("error", showMissing);

    function showMissing() {
      if ($(".video__missing", box)) return;
      box.classList.add("is-playing");
      box.appendChild(el("div", "video__missing",
        "Chưa có file video.<br />Hãy đặt video của bạn vào <b>" + esc(CFG.video.src) + "</b>"));
    }
  }

  /* =============================================================
     5. RENDER — MỪNG CƯỚI / QR
     ============================================================= */
  function qrSrc(g) {
    if (g.qrImage) return g.qrImage;
    if (g.bankId && g.accountNo) {
      return "https://img.vietqr.io/image/" + encodeURIComponent(g.bankId) + "-" +
             encodeURIComponent(g.accountNo) + "-compact2.png?accountName=" +
             encodeURIComponent(g.accountName || "") + "&addInfo=" + encodeURIComponent("Mung cuoi");
    }
    return "";
  }

  function renderGifts() {
    var grid = $("#giftsGrid");
    if (!grid || !CFG.gifts) return;
    CFG.gifts.forEach(function (g, i) {
      var src = qrSrc(g);
      var card = el("article", "gift reveal");
      card.setAttribute("data-anim", i === 0 ? "left" : "right");
      card.innerHTML =
        '<span class="gift__role">' + esc(g.owner) + '</span>' +
        '<h4 class="gift__name">' + esc(g.name) + '</h4>' +
        '<div class="gift__qr">' +
          (src
            ? '<img src="' + esc(src) + '" alt="Mã QR chuyển khoản của ' + esc(g.name) + '" loading="lazy" />'
            : '<span class="gift__qr-missing">Chưa có mã QR.<br />Thêm ảnh QR vào <b>assets/qr/</b> hoặc điền số tài khoản trong <b>config.js</b></span>') +
        '</div>' +
        '<p class="gift__bank">' + esc(g.bankName) + '</p>' +
        '<p class="gift__acc">' + esc(g.accountNo || "—") + '</p>' +
        '<p class="gift__holder">' + esc(g.accountName) + '</p>' +
        (g.accountNo ? '<button class="gift__copy" type="button">Sao chép số tài khoản</button>' : '');

      var copyBtn = $(".gift__copy", card);
      if (copyBtn) {
        copyBtn.addEventListener("click", function () {
          copyText(g.accountNo, function (ok) {
            toast(ok ? "Đã sao chép số tài khoản" : "Không sao chép được, bạn hãy chép thủ công nhé");
          });
        });
      }
      grid.appendChild(card);
    });
  }

  function copyText(text, cb) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { cb(true); }, function () { cb(false); });
      return;
    }
    var ta = el("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    cb(ok);
  }

  /* =============================================================
     6. RENDER — TEXT TĨNH TỪ CONFIG
     ============================================================= */
  function renderStatic() {
    if (CFG.site) {
      if (CFG.site.browserTitle) document.title = CFG.site.browserTitle;
      if (CFG.site.monogramLeft)  $("#monoLeft").textContent  = CFG.site.monogramLeft;
      if (CFG.site.monogramRight) $("#monoRight").textContent = CFG.site.monogramRight;
      if (CFG.site.hashtag) $("#hashtag").textContent = CFG.site.hashtag;
      if (CFG.site.openButton) $("#openBtn").firstElementChild.textContent = CFG.site.openButton;
    }
    if (CFG.couple) {
      $("#heroGroom").textContent = CFG.couple.groom.shortName;
      $("#heroBride").textContent = CFG.couple.bride.shortName;
    }
    var main = (CFG.events || []).filter(function (e) { return e.key === "thanh-hon"; })[0] || (CFG.events || [])[0];
    if (main) {
      var parts = String(main.date).split(".");
      $("#heroWeekday").textContent = main.weekday;
      $("#heroDay").textContent = parts.length >= 2 ? parts[0] + "." + parts[1] : main.date;
      $("#heroYear").textContent = "Năm " + (parts[2] || "");
      $("#heroLunar").textContent = "(" + String(main.lunar).replace(/^\(|\)$/g, "") + ")";
    }
    if (CFG.countdown && CFG.countdown.label) $("#cdLabel").textContent = CFG.countdown.label;
    if (CFG.thanks) {
      $("#thanksHeading").textContent = CFG.thanks.heading;
      var box = $("#thanksLines");
      (CFG.thanks.lines || []).forEach(function (line) { box.appendChild(el("p", null, esc(line))); });
    }
  }

  /* =============================================================
     7. ĐẾM NGƯỢC
     ============================================================= */
  function initCountdown() {
    if (!CFG.countdown || !CFG.countdown.target) return;
    var target = new Date(CFG.countdown.target).getTime();
    if (isNaN(target)) return;
    var box = $("#countdownBox");
    var cells = { d: $("#cdD"), h: $("#cdH"), m: $("#cdM"), s: $("#cdS") };
    var last = {};

    function pad(n) { return (n < 10 ? "0" : "") + n; }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        box.classList.add("is-done");
        box.textContent = CFG.countdown.doneText || "Hôm nay là ngày hạnh phúc của chúng mình!";
        clearInterval(timer);
        return;
      }
      var s = Math.floor(diff / 1000);
      var val = {
        d: Math.floor(s / 86400),
        h: Math.floor(s / 3600) % 24,
        m: Math.floor(s / 60) % 60,
        s: s % 60
      };
      Object.keys(val).forEach(function (k) {
        if (last[k] === val[k]) return;
        last[k] = val[k];
        cells[k].textContent = k === "d" ? val.d : pad(val[k]);
        var cell = cells[k].parentNode;
        cell.classList.remove("is-tick");
        void cell.offsetWidth;
        if (!reduceMotion) cell.classList.add("is-tick");
      });
    }
    tick();
    var timer = setInterval(tick, 1000);
  }

  /* ---------- lưu vào lịch (.ics) ---------- */
  function initCalendar() {
    var btn = $("#calendarBtn");
    if (!btn || !CFG.countdown) return;
    btn.addEventListener("click", function () {
      var start = new Date(CFG.countdown.target);
      if (isNaN(start.getTime())) { toast("Chưa cấu hình được ngày giờ"); return; }
      var end = new Date(start.getTime() + 3 * 3600 * 1000);
      var fmt = function (d) { return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"; };
      var ev = (CFG.events || []).filter(function (e) { return e.key === "thanh-hon"; })[0] || {};
      var title = "Lễ thành hôn " + CFG.couple.groom.shortName + " & " + CFG.couple.bride.shortName;
      var ics = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Wedding//VN//EN", "BEGIN:VEVENT",
        "UID:" + Date.now() + "@wedding",
        "DTSTAMP:" + fmt(new Date()),
        "DTSTART:" + fmt(start),
        "DTEND:" + fmt(end),
        "SUMMARY:" + title,
        "LOCATION:" + [ev.host, ev.addressOld, ev.addressNew].filter(Boolean).join(", "),
        "DESCRIPTION:" + (ev.note || ""),
        "END:VEVENT", "END:VCALENDAR"
      ].join("\r\n");

      var blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      var a = el("a");
      a.href = URL.createObjectURL(blob);
      a.download = "le-thanh-hon.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      toast("Đã tải file lịch — mở file để thêm vào ứng dụng Lịch");
    });
  }

  /* =============================================================
     8. CHIA SẺ
     ============================================================= */
  function initShare() {
    var btn = $("#shareBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var data = {
        title: document.title,
        text: "Trân trọng kính mời bạn tới dự lễ thành hôn của chúng mình!",
        url: location.href
      };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else {
        copyText(location.href, function (ok) {
          toast(ok ? "Đã sao chép link thiệp" : "Hãy sao chép link trên thanh địa chỉ nhé");
        });
      }
    });
  }

  /* =============================================================
     9. NHẠC NỀN
     ============================================================= */
  var bgm;
  function updateMusicBtn() {
    var btn = $("#musicBtn");
    if (!btn || !bgm) return;
    btn.classList.toggle("is-playing", !bgm.paused);
  }
  function initMusic() {
    bgm = $("#bgm");
    var btn = $("#musicBtn");
    if (!bgm || !CFG.music) return;
    bgm.src = CFG.music.src;
    bgm.volume = typeof CFG.music.volume === "number" ? CFG.music.volume : 0.5;

    btn.addEventListener("click", function () {
      if (bgm.paused) {
        bgm.play().then(updateMusicBtn).catch(function () {
          toast("Chưa tải được nhạc — kiểm tra file " + CFG.music.src);
        });
      } else {
        bgm.pause();
        updateMusicBtn();
      }
    });
    bgm.addEventListener("play", updateMusicBtn);
    bgm.addEventListener("pause", updateMusicBtn);
    bgm.addEventListener("error", function () {
      btn.classList.remove("is-playing");
    });
    // tạm dừng khi rời tab, phát lại khi quay lại
    document.addEventListener("visibilitychange", function () {
      if (!bgm) return;
      if (document.hidden && !bgm.paused) { bgm.pause(); bgm.dataset.resume = "1"; }
      else if (!document.hidden && bgm.dataset.resume === "1") { bgm.dataset.resume = ""; bgm.play().catch(function () {}); }
    });
  }
  function playMusic() {
    if (!bgm || !CFG.music || CFG.music.playOnOpen === false) return;
    bgm.play().then(updateMusicBtn).catch(function () { updateMusicBtn(); });
  }

  /* =============================================================
     10. MỞ THIỆP
     ============================================================= */
  function initCover() {
    var cover = $("#cover");
    var btn = $("#openBtn");
    if (!cover || !btn) return;
    btn.addEventListener("click", function () {
      cover.classList.add("is-open");
      document.body.classList.remove("is-locked");
      $("#musicBtn").classList.add("is-ready");
      playMusic();
      if (CFG.effects && CFG.effects.heartsOnOpen !== false && !reduceMotion) heartBurst();
      setTimeout(function () { cover.style.display = "none"; }, 950);
      window.scrollTo({ top: 0 });
    });
  }

  function heartBurst() {
    var chars = ["❤", "💗", "💕", "🌸", "💖"];
    for (var i = 0; i < 18; i++) {
      (function (i) {
        setTimeout(function () {
          var h = el("span", "heart-burst", chars[i % chars.length]);
          h.style.left = (8 + Math.random() * 84) + "vw";
          h.style.bottom = "-40px";
          h.style.animationDuration = (2.4 + Math.random() * 1.8) + "s";
          document.body.appendChild(h);
          setTimeout(function () { h.remove(); }, 4400);
        }, i * 110);
      })(i);
    }
  }

  /* =============================================================
     11. HIỆU ỨNG HIỆN KHI CUỘN
     ============================================================= */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (n) { io.observe(n); });
  }

  /* =============================================================
     12. CÁNH HOA RƠI (canvas)
     ============================================================= */
  function initPetals() {
    var cv = $("#petals");
    if (!cv || reduceMotion || !CFG.effects || CFG.effects.petals === false) {
      if (cv) cv.style.display = "none";
      return;
    }
    var ctx = cv.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W, H, petals = [];
    var COUNT = CFG.effects.petalCount || 24;
    if (window.innerWidth < 640) COUNT = Math.round(COUNT * 0.6);
    var COLORS = ["#f9c6d8", "#f48fb1", "#fcdce6", "#ef7fa8", "#fbe3ec"];

    function resize() {
      W = cv.width = Math.floor(window.innerWidth * dpr);
      H = cv.height = Math.floor(window.innerHeight * dpr);
      cv.style.width = window.innerWidth + "px";
      cv.style.height = window.innerHeight + "px";
    }

    function make(seedTop) {
      return {
        x: Math.random() * W,
        y: seedTop ? Math.random() * H : -20 * dpr,
        r: (6 + Math.random() * 9) * dpr,
        sp: (0.35 + Math.random() * 0.75) * dpr,
        drift: (Math.random() - 0.5) * 0.8 * dpr,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.025,
        sway: Math.random() * Math.PI * 2,
        alpha: 0.45 + Math.random() * 0.45,
        color: COLORS[(Math.random() * COLORS.length) | 0]
      };
    }

    function draw(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.56, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    var running = true;
    function loop() {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.sway += 0.02;
        p.y += p.sp;
        p.x += p.drift + Math.sin(p.sway) * 0.6 * dpr;
        p.rot += p.vr;
        if (p.y > H + 30 * dpr) petals[i] = make(false);
        if (p.x < -40 * dpr) p.x = W + 30 * dpr;
        if (p.x > W + 40 * dpr) p.x = -30 * dpr;
        draw(p);
      }
      requestAnimationFrame(loop);
    }

    resize();
    for (var i = 0; i < COUNT; i++) petals.push(make(true));
    loop();

    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        resize();
        petals = [];
        for (var i = 0; i < COUNT; i++) petals.push(make(true));
      }, 200);
    });
    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) loop();
    });
  }

  /* =============================================================
     KHỞI ĐỘNG
     ============================================================= */
  function init() {
    renderStatic();
    renderCouple();
    renderEvents();
    renderMap();
    renderGallery();
    renderVideo();
    renderGifts();
    bindLightbox();
    initReveal();
    initCountdown();
    initCalendar();
    initShare();
    initMusic();
    initCover();
    initPetals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
