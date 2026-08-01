// EdgeLantern — minimal vanilla JS, no dependencies.

document.addEventListener("DOMContentLoaded", function () {

  // --- Scroll reveal (respects prefers-reduced-motion via CSS) -----------
  var revealTargets = document.querySelectorAll(
    ".compare-grid, .story-quote, .story-body, .trust-grid, .access-form"
  );

  if ("IntersectionObserver" in window) {
    revealTargets.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Early access form ---------------------------------------------------
  // Submits to Formspree (or any compatible static-form endpoint) via fetch,
  // and confirms success INLINE by resetting the form and showing a small
  // message next to the button — the form itself is never hidden.
  //
  // Note: don't toggle the `hidden` attribute on an element that also has
  // `display: grid/flex` set in CSS — an author stylesheet's `display` rule
  // always beats the browser's built-in `[hidden] { display: none }` rule,
  // so the element silently stays visible. Use a class + opacity/max-height
  // transition instead, as done here.
  var form = document.getElementById("early-access-form");
  var successEl = document.getElementById("form-success");
  var microEl = document.getElementById("form-micro");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Form submission failed");

          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;

          if (microEl) microEl.hidden = true;
          successEl.textContent =
            "Thanks — we've got your request. We'll be in touch within two business days.";
          successEl.classList.add("is-visible");

          // Revert to the normal micro-copy after a few seconds so the form
          // is visibly ready for another submission if needed.
          setTimeout(function () {
            successEl.classList.remove("is-visible");
            if (microEl) microEl.hidden = false;
          }, 6000);
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          alert(
            "Something went wrong sending your request. Please email hello@edgelantern.com directly."
          );
        });
    });
  }
});
