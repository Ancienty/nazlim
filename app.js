"use strict";

const password = "1212";
const sessionKey = `nazlim:letter-open:${location.pathname}`;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const gate = document.querySelector("#gate");
const form = document.querySelector("#gate-form");
const passwordField = document.querySelector("#password");
const errorMessage = document.querySelector("#password-error");

function rememberOpenLetter() {
  try {
    sessionStorage.setItem(sessionKey, "yes");
  } catch {
    // The letter can still open when the browser blocks session storage.
  }
}

function wasLetterOpened() {
  try {
    return sessionStorage.getItem(sessionKey) === "yes";
  } catch {
    return false;
  }
}

function renderCounterNumber(element, value, animate) {
  const digits = String(value).padStart(2, "0");

  if (element.children.length !== digits.length) {
    element.replaceChildren(...Array.from(digits, (digit) => {
      const span = document.createElement("span");
      span.textContent = digit;
      return span;
    }));
    return;
  }

  for (const [index, digit] of Array.from(element.children).entries()) {
    if (digit.textContent === digits[index]) continue;

    digit.textContent = digits[index];
    if (animate && digit.animate) {
      digit.animate(
        [{ transform: "translateY(0.35em)", opacity: 0.45 }, { transform: "translateY(0)", opacity: 1 }],
        { duration: 220, easing: "ease-out" },
      );
    }
  }
}

function startCounter() {
  const startTime = Date.parse(document.querySelector(".hero-date time").dateTime);
  const counter = document.querySelector(".counter");
  const days = document.querySelector('[data-counter="days"]');
  const hours = document.querySelector('[data-counter="hours"]');
  const minutes = document.querySelector('[data-counter="minutes"]');
  const seconds = document.querySelector('[data-counter="seconds"]');

  function updateCounter(animateChanges = true) {
    const elapsed = Math.max(0, Math.floor((Date.now() - startTime) / 1000));
    const bounds = counter.getBoundingClientRect();
    const animate = animateChanges && !reducedMotion.matches && !document.hidden
      && bounds.bottom > 0 && bounds.top < window.innerHeight;

    renderCounterNumber(days, Math.floor(elapsed / 86400), animate);
    renderCounterNumber(hours, Math.floor(elapsed / 3600) % 24, animate);
    renderCounterNumber(minutes, Math.floor(elapsed / 60) % 60, animate);
    renderCounterNumber(seconds, elapsed % 60, animate);
  }

  updateCounter(false);
  window.setInterval(updateCounter, 1000);
  document.addEventListener("visibilitychange", () => updateCounter(false));
  window.addEventListener("pageshow", () => updateCounter(false));
}

function enableHeart() {
  const bud = document.querySelector("#peony-bud");
  const heart = document.querySelector("#heart-pop");
  const status = document.querySelector("#heart-status");

  bud.addEventListener("click", () => {
    if (!heart.hidden) return;

    heart.hidden = false;
    status.textContent = "Bir kalp belirdi.";

    window.setTimeout(() => {
      heart.hidden = true;
      status.textContent = "";
    }, reducedMotion.matches ? 900 : 1100);
  });
}

function openLetter(focusTitle) {
  const template = document.querySelector("#letter-template");
  gate.replaceWith(document.importNode(template.content, true));
  template.remove();
  startCounter();
  enableHeart();

  if (focusTitle) {
    document.querySelector(".letter").classList.add("letter-entering");
    window.scrollTo(0, 0);
    document.querySelector("#letter-title").focus({ preventScroll: true });
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (form.inert) return;

  if (passwordField.value !== password) {
    errorMessage.textContent = "Olmadı, bir daha dene. :)";
    passwordField.setAttribute("aria-invalid", "true");
    passwordField.focus();
    passwordField.select();
    return;
  }

  form.inert = true;
  rememberOpenLetter();

  const gateCard = gate.querySelector(".gate-card");
  if (!reducedMotion.matches && gateCard.animate) {
    await gateCard.animate(
      [{ opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(-0.8rem) scale(0.985)" }],
      { duration: 240, easing: "ease-in", fill: "forwards" },
    ).finished.catch(() => {});
  }

  openLetter(true);
});

passwordField.addEventListener("input", () => {
  errorMessage.textContent = "";
  passwordField.removeAttribute("aria-invalid");
});

if (wasLetterOpened()) openLetter(false);
