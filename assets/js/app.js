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
});
