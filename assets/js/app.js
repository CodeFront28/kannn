if (window.location.pathname.endsWith("/index.html")) {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname.replace(/index\.html$/, "")
  );
}

// ----------------- УСТАНОВКА ТАЙМЕРА НИЖЕ -----------------
const deadline = new Date("2025-03-15T00:00:00").getTime();
// ----------------- УСТАНОВКА ТАЙМЕРА ВЫШЕ -----------------

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".navbar");
  const header = document.querySelector(".header");
  const headerContainer = document.querySelector(".header__container");

  const copy = document.querySelector(".copy");
  const address = document.querySelector(".address");

  const hideButton = document.getElementById("hideButton");
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");
  const muteButton = document.getElementById("muteButton");
  const audio = document.getElementById("myAudio");

  audio.muted = false;

  burger.addEventListener("click", function () {
    navMenu.classList.toggle("mobile");
    header.classList.toggle("mobile");
    headerContainer.classList.toggle("mobile");
  });

  headerContainer.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("mobile");
      header.classList.remove("mobile");
      headerContainer.classList.remove("mobile");
    });
  });

  copy.addEventListener("click", () => {
    const textToCopy = address.textContent;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Текст успешно скопирован!");
      })
      .catch((error) => {
        console.error("Ошибка копирования текста: ", error);
      });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const { hash } = new URL(anchor.href);
    if (!hash) return;
    const element = document.querySelector(hash);
    if (!element) return;

    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth", inline: "start" });
    });
  });

  hideButton.addEventListener("click", function () {
    audio.play();

    preloader.style.opacity = 0;
    setTimeout(function () {
      preloader.style.display = "none";
      content.style.display = "block";
    }, 500);
  });

  muteButton.addEventListener("click", function () {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? "Sound: off" : "Sound: on";
  });

  function updateCountdown() {
    const timerDeadline = deadline;
    const now = new Date().getTime();
    const timeLeft = deadline - now;
    if (timeLeft <= 0) {
      document.getElementById("days1").textContent = "0";
      document.getElementById("days2").textContent = "0";
      document.getElementById("hours1").textContent = "0";
      document.getElementById("hours2").textContent = "0";
      document.getElementById("minutes1").textContent = "0";
      document.getElementById("minutes2").textContent = "0";
      document.getElementById("seconds1").textContent = "0";
      document.getElementById("seconds2").textContent = "0";
      return;
    }
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    const daysStr = String(days).padStart(2, "0");
    const hoursStr = String(hours).padStart(2, "0");
    const minutesStr = String(minutes).padStart(2, "0");
    const secondsStr = String(seconds).padStart(2, "0");

    document.getElementById("days1").textContent = daysStr[0];
    document.getElementById("days2").textContent = daysStr[1];
    document.getElementById("hours1").textContent = hoursStr[0];
    document.getElementById("hours2").textContent = hoursStr[1];
    document.getElementById("minutes1").textContent = minutesStr[0];
    document.getElementById("minutes2").textContent = minutesStr[1];
    document.getElementById("seconds1").textContent = secondsStr[0];
    document.getElementById("seconds2").textContent = secondsStr[1];
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
