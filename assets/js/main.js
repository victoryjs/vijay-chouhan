(function () {
  'use strict';

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable — ignore */ }
  }

  /* ---------- Theme toggle ---------- */
  /* Initial theme is already applied by the inline head script (before
     first paint) — here we only wire up the toggle button. */
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      safeSet('theme', next);
    });
  }

  /* ---------- Mobile nav ---------- */
  var hamburger = document.getElementById('hamburger');
  var primaryNav = document.getElementById('primary-nav');

  function closeNav(returnFocus) {
    if (!primaryNav || !hamburger) return;
    primaryNav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    if (returnFocus) hamburger.focus();
  }

  if (hamburger && primaryNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('is-open');
      document.body.classList.toggle('nav-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { closeNav(false); });
    });

    document.addEventListener('click', function (event) {
      if (!primaryNav.contains(event.target) && !hamburger.contains(event.target)) {
        closeNav(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        closeNav(true);
      }
    });
  }

  /* ---------- Active nav link ---------- */
  var currentPage = document.body.getAttribute('data-page');
  if (currentPage) {
    document.querySelectorAll('.navbar__nav a[data-page]').forEach(function (link) {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
