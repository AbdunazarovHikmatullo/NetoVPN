(function () {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  const trialDialog = document.getElementById("trial-dialog");
  const trialForm = document.getElementById("trial-form");
  const formMsg = document.getElementById("trial-msg");

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll("[data-open-trial]").forEach((btn) => {
    btn.addEventListener("click", () => {
      formMsg.textContent = "";
      formMsg.className = "form-msg";
      trialDialog.showModal();
    });
  });

  document.querySelector("[data-close-trial]").addEventListener("click", () => {
    trialDialog.close();
  });

  trialForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = trialForm.email.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      formMsg.textContent = "Укажите корректный email.";
      formMsg.className = "form-msg err";
      trialForm.email.focus();
      return;
    }

    formMsg.textContent = "Заявка принята. Ссылка на пробный доступ придёт на почту.";
    formMsg.className = "form-msg ok";
    trialForm.reset();
  });
})();
