/* KOBE — Lightweight interactions (no Lenis, no GSAP)
   Optimized for buttery smooth native scroll
   ---------------------------------------------------------- */

(function () {
  "use strict";

  const ready = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  ready(() => {
    initNav();
    initMenu();
    initScrollProgress();
    initReveals();
    initYear();
  });

  function initNav() {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (window.scrollY > 40) nav.classList.add("is-scrolled");
        else nav.classList.remove("is-scrolled");
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMenu() {
    const burger = document.querySelector(".nav__burger");
    const menu = document.querySelector(".menu");
    if (!burger || !menu) return;
    burger.addEventListener("click", () => {
      burger.classList.toggle("is-open");
      menu.classList.toggle("is-open");
      document.body.style.overflow = menu.classList.contains("is-open")
        ? "hidden"
        : "";
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.classList.remove("is-open");
        menu.classList.remove("is-open");
        document.body.style.overflow = "";
      })
    );
  }

  function initScrollProgress() {
    const bar = document.querySelector(".scroll-progress");
    if (!bar) return;
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = pct + "%";
        ticking = false;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
  }

  function initReveals() {
    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".fade-up, .fade-in")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document
      .querySelectorAll(".fade-up, .fade-in")
      .forEach((el) => obs.observe(el));
  }

  function initYear() {
    const y = new Date().getFullYear();
    document
      .querySelectorAll("[data-year]")
      .forEach((el) => (el.textContent = y));
  }
})();
