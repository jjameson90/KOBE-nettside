/* KOBE — Modern site interactions
   Built with GSAP + ScrollTrigger + Lenis (loaded via CDN)
   ---------------------------------------------------------- */

(function () {
  "use strict";

  const ready = (fn) =>
    document.readyState !== "loading" ? fn() : document.addEventListener("DOMContentLoaded", fn);

  ready(() => {
    initLoader();
    initLenis();
    initNav();
    initMenu();
    initScrollProgress();
    initCursor();
    initReveals();
    initHero();
    initServices();
    initMagnetic();
    initYear();
    initProjectTilt();
  });

  // -------- Loader --------
  function initLoader() {
    const loader = document.querySelector(".loader");
    if (!loader) return;
    window.addEventListener("load", () => {
      setTimeout(() => loader.classList.add("is-done"), 1100);
    });
    // fallback
    setTimeout(() => loader.classList.add("is-done"), 2200);
  }

  // -------- Smooth scroll (Lenis) --------
  function initLenis() {
    if (!window.Lenis) return;
    const lenis = new window.Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.__lenis = lenis;

    if (window.gsap && window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
      window.gsap.ticker.add((time) => lenis.raf(time * 1000));
      window.gsap.ticker.lagSmoothing(0);
    }

    // anchor scroll via lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        lenis.scrollTo(t, { offset: -80 });
      });
    });
  }

  // -------- Sticky nav --------
  function initNav() {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // -------- Mobile menu --------
  function initMenu() {
    const burger = document.querySelector(".nav__burger");
    const menu = document.querySelector(".menu");
    if (!burger || !menu) return;
    burger.addEventListener("click", () => {
      burger.classList.toggle("is-open");
      menu.classList.toggle("is-open");
      document.body.style.overflow = menu.classList.contains("is-open") ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.classList.remove("is-open");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }

  // -------- Scroll progress --------
  function initScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    window.addEventListener(
      "scroll",
      () => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = pct + "%";
      },
      { passive: true }
    );
  }

  // -------- Custom cursor (desktop only) --------
  function initCursor() {
    if (window.matchMedia("(hover: none)").matches) return;
    const c = document.createElement("div");
    c.className = "cursor";
    document.body.appendChild(c);
    let x = 0, y = 0, tx = 0, ty = 0;
    window.addEventListener("mousemove", (e) => {
      tx = e.clientX; ty = e.clientY;
      c.classList.add("is-active");
    });
    (function tick() {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      c.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    })();
    document.querySelectorAll("a, button, .service, .project, .news__item").forEach((el) => {
      el.addEventListener("mouseenter", () => c.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => c.classList.remove("is-hover"));
    });
  }

  // -------- Scroll reveals --------
  function initReveals() {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    document.querySelectorAll(".fade-up, .reveal, .mask-reveal").forEach((el) => obs.observe(el));
  }

  // -------- Hero headline animation --------
  function initHero() {
    const lines = document.querySelectorAll(".hero__headline .line > span");
    if (!lines.length) return;
    lines.forEach((el, i) => {
      el.style.transition = `transform 1.1s cubic-bezier(0.76, 0, 0.24, 1) ${0.1 + i * 0.12}s`;
    });
    requestAnimationFrame(() => {
      setTimeout(() => {
        lines.forEach((el) => (el.style.transform = "translateY(0)"));
      }, 400);
    });
  }

  // -------- Services expand --------
  function initServices() {
    document.querySelectorAll(".service").forEach((s) => {
      s.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        document.querySelectorAll(".service.is-open").forEach((o) => {
          if (o !== s) o.classList.remove("is-open");
        });
        s.classList.toggle("is-open");
      });
    });
  }

  // -------- Magnetic buttons --------
  function initMagnetic() {
    if (window.matchMedia("(hover: none)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic) || 0.3;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  // -------- Project card tilt --------
  function initProjectTilt() {
    if (window.matchMedia("(hover: none)").matches) return;
    document.querySelectorAll(".project").forEach((p) => {
      const media = p.querySelector(".project__media");
      if (!media) return;
      p.addEventListener("mousemove", (e) => {
        const r = p.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        media.style.transform = `scale(1.04) translate(${px * -16}px, ${py * -16}px)`;
      });
      p.addEventListener("mouseleave", () => {
        media.style.transform = "";
      });
    });
  }

  // -------- Current year --------
  function initYear() {
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }
})();
