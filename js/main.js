/* =============================================================
   elmejorelectro.es — main.js
   Vanilla JS, sin dependencias externas
   ============================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------------
     1. STICKY HEADER
     Añade la clase .scrolled cuando el scroll supera 50 px
  ----------------------------------------------------------- */
  const header = document.getElementById('main-header');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial


  /* -----------------------------------------------------------
     2. HAMBURGER MENU (mobile)
  ----------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mainNav      = document.getElementById('main-nav');

  function closeMenu() {
    mainNav.classList.remove('nav-open');
    hamburgerBtn.classList.remove('hamburger-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  hamburgerBtn.addEventListener('click', function () {
    const isOpen = mainNav.classList.contains('nav-open');
    if (isOpen) {
      closeMenu();
    } else {
      mainNav.classList.add('nav-open');
      hamburgerBtn.classList.add('hamburger-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    }
  });

  // Cerrar al pulsar un enlace
  mainNav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar al pulsar fuera del header
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target) && mainNav.classList.contains('nav-open')) {
      closeMenu();
    }
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNav.classList.contains('nav-open')) {
      closeMenu();
      hamburgerBtn.focus();
    }
  });


  /* -----------------------------------------------------------
     3. FAQ ACORDEÓN
     Solo un elemento abierto a la vez
  ----------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var btn    = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', function () {
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Cierra todos los demás
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = null;
          other.classList.remove('faq-active');
        }
      });

      // Alterna el actual
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
        item.classList.remove('faq-active');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        item.classList.add('faq-active');
      }
    });
  });


  /* -----------------------------------------------------------
     4. SMOOTH SCROLL para enlaces ancla internos
     Descuenta la altura del header fijo
  ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var offset   = header ? header.offsetHeight + 16 : 80;
      var top      = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });


  /* -----------------------------------------------------------
     5. AÑO DINÁMICO en el copyright del footer
  ----------------------------------------------------------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* -----------------------------------------------------------
     6. COOKIE BANNER (RGPD básico)
     Guarda la preferencia en localStorage
  ----------------------------------------------------------- */
  var cookieBanner = document.getElementById('cookie-banner');
  var cookieAccept = document.getElementById('cookie-accept');
  var cookieReject = document.getElementById('cookie-reject');

  var COOKIE_KEY = 'elmejorelectro_cookies';

  function hideBanner() {
    cookieBanner.classList.add('cookie-hidden');
    cookieBanner.classList.remove('cookie-visible');
  }

  if (!localStorage.getItem(COOKIE_KEY)) {
    // Aparece tras 1,2 s para no interrumpir la carga
    setTimeout(function () {
      cookieBanner.classList.add('cookie-visible');
    }, 1200);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      localStorage.setItem(COOKIE_KEY, 'accepted');
      hideBanner();
    });
  }

  if (cookieReject) {
    cookieReject.addEventListener('click', function () {
      localStorage.setItem(COOKIE_KEY, 'essential');
      hideBanner();
    });
  }

})();

/* =============================================================
   7. FECHAS DINÁMICAS EN ESPAÑOL
   Inyecta mes, año y fecha de precio actuales en todos los
   elementos marcados con data-date="..." al cargar la página.

   Atributos disponibles:
     data-date="updated"          → "Actualizado junio 2026"
     data-date="month-year-lower" → "junio 2026"
     data-date="month-year"       → "Junio 2026"
     data-date="price-date"       → "20/06/2026"
   ============================================================= */
(function () {
  var MESES = [
    'enero','febrero','marzo','abril','mayo','junio',
    'julio','agosto','septiembre','octubre','noviembre','diciembre'
  ];

  var now      = new Date();
  var year     = now.getFullYear();
  var month    = MESES[now.getMonth()];
  var monthCap = month.charAt(0).toUpperCase() + month.slice(1);
  var day      = String(now.getDate()).padStart(2, '0');
  var monthNum = String(now.getMonth() + 1).padStart(2, '0');

  var MAP = {
    'updated':          'Actualizado ' + month + ' ' + year,
    'month-year':        monthCap + ' ' + year,
    'month-year-lower':  month + ' ' + year,
    'price-date':        day + '/' + monthNum + '/' + year,
    'year':              String(year)
  };

  Object.keys(MAP).forEach(function (key) {
    document.querySelectorAll('[data-date="' + key + '"]').forEach(function (el) {
      el.textContent = MAP[key];
    });
  });
})();
