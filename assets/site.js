/* Apex Integration — site runtime (multi-page edition)
   Pages are pre-rendered static HTML; this script only adds behavior:
   contact form, email de-obfuscation, mobile menu, footer year, and
   redirects for legacy #/-style URLs. */
(function () {
  'use strict';

  /* ---------- legacy hash-route redirects (#/services -> /services/) ---------- */
  var h = window.location.hash;
  if (h && h.indexOf('#/') === 0) {
    var target = h.slice(2).split('?')[0]; // 'services', 'about', 'contact', ''
    var map = { '': '/', 'services': '/services/', 'about': '/about/', 'contact': '/contact/' };
    if (map.hasOwnProperty(target) && window.location.pathname === '/') {
      window.location.replace(map[target]);
      return;
    }
  }

  /* ---------- email assembled at runtime (anti-scraping) ---------- */
  var EM = ['cs', ['apexintegration', 'ca'].join('.')];
  function emailAddr() { return EM[0] + '\u0040' + EM[1]; }
  var links = document.querySelectorAll('.js-email');
  for (var i = 0; i < links.length; i++) {
    links[i].textContent = emailAddr();
    links[i].setAttribute('href', 'mailto:' + emailAddr());
  }

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- mobile menu ---------- */
  var navLinks = document.getElementById('nav-links');
  var toggle = document.getElementById('nav-toggle');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      this.setAttribute('aria-expanded', open ? 'true' : 'false');
      this.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  /* ---------- contact form ---------- */
  var WEB3FORMS_ACCESS_KEY = 'af2e55fe-abac-423d-996f-924a430fb66d';

  function setFieldError(form, name, msg) {
    var wrap = form.querySelector('[data-field="' + name + '"]');
    if (!wrap) return;
    var err = wrap.querySelector('.field__error');
    if (msg) {
      wrap.classList.add('field--invalid');
      err.textContent = msg;
      err.hidden = false;
    } else {
      wrap.classList.remove('field--invalid');
      err.hidden = true;
    }
  }

  var form = document.getElementById('contact-form');
  if (form) {
    ['name', 'email', 'message'].forEach(function (n) {
      form.elements[n].addEventListener('input', function () { setFieldError(form, n, null); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();
      var ok = true;

      if (!name) { setFieldError(form, 'name', 'Please enter your name.'); ok = false; }
      if (!email) { setFieldError(form, 'email', 'Please enter your email address.'); ok = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError(form, 'email', 'That email address doesn\u2019t look right.'); ok = false; }
      if (!message || message.length < 10) { setFieldError(form, 'message', 'Tell us a little more \u2014 at least a sentence.'); ok = false; }
      if (!ok) return;
      if (form.elements.botcheck.value) return; /* silently drop bots */

      var btn = document.getElementById('form-submit');
      var status = document.getElementById('form-status');
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Sending\u2026';
      status.hidden = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New inquiry from ' + name + ' \u2014 apexintegration.ca',
          from_name: 'Apex Integration website',
          name: name,
          email: email,
          company: form.elements.company.value.trim(),
          service: form.elements.service.value,
          message: message
        })
      }).then(function (res) { return res.json(); }).then(function (data) {
        btn.disabled = false;
        btn.textContent = 'Send message';
        status.hidden = false;
        if (data && data.success) {
          status.className = 'form__status form__status--ok';
          status.setAttribute('role', 'status');
          status.textContent = 'Message sent. An engineer will reply within one business day.';
          form.reset();
        } else {
          status.className = 'form__status form__status--err';
          status.setAttribute('role', 'alert');
          status.textContent = 'The message didn\u2019t go through. Please try again, or email us directly at ' + emailAddr() + '.';
        }
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = 'Send message';
        status.hidden = false;
        status.className = 'form__status form__status--err';
        status.setAttribute('role', 'alert');
        status.textContent = 'The message didn\u2019t go through. Please try again, or email us directly at ' + emailAddr() + '.';
      });
    });
  }
})();
