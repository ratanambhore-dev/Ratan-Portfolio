/* Tiranex Task 1 - Accessible interactions */
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const form = document.querySelector("#contact-form");
  if (!form) return;

  const fields = {
    name: {
      input: document.querySelector("#name"),
      error: document.querySelector("#name-error"),
      message: "Please enter your full name."
    },
    email: {
      input: document.querySelector("#email"),
      error: document.querySelector("#email-error"),
      message: "Please enter a valid email address."
    },
    message: {
      input: document.querySelector("#message"),
      error: document.querySelector("#message-error"),
      message: "Please enter a message."
    }
  };

  function setError(field, message) {
    field.error.textContent = message;
    field.input.setAttribute("aria-invalid", "true");
  }

  function clearError(field) {
    field.error.textContent = "";
    field.input.removeAttribute("aria-invalid");
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    let valid = true;

    Object.values(fields).forEach(field => clearError(field));

    if (!fields.name.input.value.trim()) {
      setError(fields.name, fields.name.message);
      valid = false;
    }

    const email = fields.email.input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(fields.email, fields.email.message);
      valid = false;
    }

    if (!fields.message.input.value.trim()) {
      setError(fields.message, fields.message.message);
      valid = false;
    }

    const status = document.querySelector("#form-status");

    if (!valid) {
      status.textContent = "Please correct the highlighted fields.";
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    status.textContent = "Thank you! Your message has been validated successfully.";
    form.reset();
  });
});
