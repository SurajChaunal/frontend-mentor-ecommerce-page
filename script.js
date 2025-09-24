const menuContainer = document.querySelector(".menu--container");
const menuOpenBtn = document.querySelector(".menu-icon--open");
const menuCloseBtn = document.querySelector(".menu-icon--close");
const mainNavContainer = document.querySelector(".header__nav");
const addToCartBtn = document.querySelector(".btn-cart");
const cartContainer = document.querySelector(".cart-container");

function handleMenuclick(e) {
  if (!e.target.classList.contains("menu-icon")) return;

  document.body.classList.toggle("no-scroll");
  menuCloseBtn.classList.toggle("active");
  menuOpenBtn.classList.toggle("active");
  mainNavContainer.classList.toggle("active");
}
function handleAddToCart(e) {
  cartContainer.classList.toggle("active");
}
function handleEscape(e) {
  if (e.key != "Escape") return;

  if (cartContainer.classList.contains("active"))
    cartContainer.classList.remove("active");
  addToCartBtn.focus();
}
menuContainer.addEventListener("click", handleMenuclick);
addToCartBtn.addEventListener("click", handleAddToCart);
window.addEventListener("keydown", handleEscape);
