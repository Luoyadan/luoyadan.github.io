(function () {
  function wrapIndex(i, n) {
    return ((i % n) + n) % n;
  }

  function initCoverflow(root) {
    var track = root.querySelector("[data-travel-track]");
    var cards = Array.prototype.slice.call(root.querySelectorAll("[data-travel-card]"));
    var dotsWrap = root.querySelector("[data-travel-dots]");
    var prevBtn = root.querySelector("[data-travel-prev]");
    var nextBtn = root.querySelector("[data-travel-next]");
    if (!track || cards.length === 0) return;

    var index = 0;
    var autoTimer = null;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cards.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "travel-coverflow__dot";
      dot.setAttribute("aria-label", "Go to photo " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
        restartAuto();
      });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.querySelectorAll(".travel-coverflow__dot"));

    function render() {
      var n = cards.length;
      cards.forEach(function (card, i) {
        var offset = i - index;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;

        var abs = Math.abs(offset);
        var x = offset * 42;
        var z = -abs * 160;
        var rotY = offset * -38;
        var scale = Math.max(0.58, 1 - abs * 0.12);
        var opacity = abs > 2.5 ? 0 : Math.max(0.25, 1 - abs * 0.28);
        var blur = abs === 0 ? 0 : Math.min(2.5, abs * 0.9);

        card.classList.toggle("is-active", offset === 0);
        card.style.zIndex = String(100 - Math.round(abs * 10));
        card.style.opacity = String(opacity);
        card.style.filter = blur ? "blur(" + blur + "px)" : "none";
        card.style.transform =
          "translate(-50%, -50%) translateX(" +
          x +
          "%) translateZ(" +
          z +
          "px) rotateY(" +
          rotY +
          "deg) scale(" +
          scale +
          ")";
        card.setAttribute("aria-hidden", offset === 0 ? "false" : "true");
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
      });
    }

    function goTo(i) {
      index = wrapIndex(i, cards.length);
      render();
    }

    function next() {
      goTo(index + 1);
    }

    function prev() {
      goTo(index - 1);
    }

    function stopAuto() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    function restartAuto() {
      stopAuto();
      if (reduceMotion || cards.length < 2) return;
      autoTimer = setInterval(next, 4200);
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAuto(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAuto(); });

    var startX = 0;
    var dragging = false;
    track.addEventListener("pointerdown", function (e) {
      dragging = true;
      startX = e.clientX;
      track.setPointerCapture(e.pointerId);
      stopAuto();
    });
    track.addEventListener("pointerup", function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) next();
        else prev();
      }
      restartAuto();
    });
    track.addEventListener("pointercancel", function () {
      dragging = false;
      restartAuto();
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        prev();
        restartAuto();
      } else if (e.key === "ArrowRight") {
        next();
        restartAuto();
      }
    });
    root.tabIndex = 0;

    render();
    restartAuto();
  }

  function boot() {
    document.querySelectorAll("[data-travel-coverflow]").forEach(initCoverflow);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
