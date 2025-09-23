const menuContainer = document.querySelector(".menu--container");
const menuOpenBtn = document.querySelector(".menu-icon--open");
const menuCloseBtn = document.querySelector(".menu-icon--close");
const mainNavContainer = document.querySelector(".header__nav");

function handleMenuclick(e) {
  if (!e.target.classList.contains("menu-icon")) return;

  document.body.classList.toggle("no-scroll");
  menuCloseBtn.classList.toggle("active");
  menuOpenBtn.classList.toggle("active");
  mainNavContainer.classList.toggle("active");
}
console.log(menuContainer);
menuContainer.addEventListener("click", handleMenuclick);
