if (window.location.pathname.endsWith("/index.html")) {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname.replace(/index\.html$/, "")
  );
}

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

  // По умолчанию звук не выключен
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
    // Воспроизведение аудио при клике на кнопку
    audio.play();

    // Плавное скрытие прелоадера и показ основного контента
    preloader.style.opacity = 0;
    setTimeout(function () {
      preloader.style.display = "none";
      content.style.display = "block";
    }, 500);
  });

  muteButton.addEventListener("click", function () {
    // Переключение состояния звука
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? "Sound: off" : "Sound: on";
  });
});
