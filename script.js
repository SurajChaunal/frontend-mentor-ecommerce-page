const menuContainer = document.querySelector(".menu--container");
const menuOpenBtn = document.querySelector(".menu-icon--open");
const menuCloseBtn = document.querySelector(".menu-icon--close");
const mainNavContainer = document.querySelector(".header__nav");
const cartBtn = document.querySelector(".btn-cart");
const addToCartBtn = document.querySelector(".btn-add-cart");
const cartContainer = document.querySelector(".cart-container");
const cartDescContainer = document.querySelector(".cart-desc");
const productQuantity = document.querySelector(".quantity");
const quantityBtnContainer = document.querySelector(".quantity-btns");
const quantity = document.querySelector(".quantity");
const mainImgContainer = document.querySelector(".main-img-container");
// state and data variables
const product = {
  id: 1,
  name: "Fall Limited Edition Sneakers",
  img: `./images/image-product-1-thumbnail.jpg`,
  price: 125,
  quantity: 0,
};
const imgArray = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];
const state = {
  cart: [],
  imgArray,
  currentImg: 1,
};

// helper function
function updateQuantiy(val) {
  quantity.textContent = +val;
}
function getQuantity(val) {
  return +quantity.textContent;
}

// event handlers
function handleMenuclick(e) {
  if (!e.target.classList.contains("menu-icon")) return;

  document.body.classList.toggle("no-scroll");
  menuCloseBtn.classList.toggle("active");
  menuOpenBtn.classList.toggle("active");
  mainNavContainer.classList.toggle("active");
}
function handleCart(e) {
  cartContainer.classList.toggle("active");
}
function handleEscape(e) {
  if (e.key != "Escape") return;

  if (cartContainer.classList.contains("active"))
    cartContainer.classList.remove("active");
  cartBtn.focus();
}
function renderRow(product) {
  return `
    <div class="cart__product-row" data-id="${product.id}">
      <div class="cart__product-img">
        <img class="cart-thumbnail" src="${product.img}" alt="${
    product.title
  } thumbnail" />
      </div>
      <div class="cart__product-desc">
        <h3 class="cart__product-heading">${product.name}</h3>
        <p class="cart__price-info">
          <span>$${product.price.toFixed(2)} x ${product.quantity}</span>
          <span class="total">$${(product.price * product.quantity).toFixed(
            2
          )}</span>
        </p>
      </div>
      <button class="btn btn-delete">
        <img src="./images/icon-delete.svg" alt="delete icon" class="icon" />
      </button>
    </div>
  `;
}

function renderCheckoutButton() {
  return `<button class="btn-primary btn-checkout">Checkout</button>`;
}
function updateCart(id) {
  const productInfo = state.cart.find((prod) => prod.id === id);
  // const markupRow = renderRow(productInfo);
  const markupBtn = renderCheckoutButton();

  const rowMarkup = state.cart.map((product) => renderRow(product)).join(" ");

  const finalMarkup =
    state.cart.length !== 0
      ? `${rowMarkup} ${markupBtn}`
      : `Your cart is empty`;
  cartDescContainer.innerHTML = ``;

  cartDescContainer.insertAdjacentHTML("beforeend", finalMarkup);
}
function handleAddToCart() {
  // getting quantity from dom
  const quantity = getQuantity();
  if (quantity <= 0) return; // better explicit check

  // Copy product with quantity (avoid mutating original object)
  const newProduct = { ...product, quantity };

  // Find if product already exists
  const existingIndex = state.cart.findIndex((prod) => prod.id === product.id);
  const isNew = existingIndex === -1;

  if (isNew) {
    // Add as new
    state.cart.push(newProduct);
  } else {
    // Update existing
    state.cart[existingIndex].quantity = quantity;
  }
  updateCart(product.id);
}
function handleDelete(e) {
  const delBtn = e.target.closest(".btn-delete");
  if (!delBtn) return;

  const row = delBtn.closest(".cart__product-row");
  const id = row?.dataset?.id;
  if (!id) return;

  // remove from state (or decrease quantity)
  state.cart = state.cart.filter((p) => String(p.id) !== String(id));
  updateCart(); // re-render
}
function handleQuantity(e) {
  const btn = e.target.closest(".btn-quantity");
  const currQuantity = getQuantity();
  if (!btn) return;

  btn.dataset.type === "inc"
    ? updateQuantiy(currQuantity + 1)
    : currQuantity > 0 && updateQuantiy(currQuantity - 1);
}
function updatePhoto() {
  const currImge = state.imgArray[state.currentImg];
  mainImgContainer.style.backgroundImage = `url(${currImge})`;
}

function handleImageChange(e) {
  const btn = e.target.closest(".main-img-btn");
  if (!btn) return;
  //below code for circular implementation
  if (btn.dataset.type === "next") {
    state.currentImg = (state.currentImg + 1) % 4;
  } else {
    state.currentImg = state.currentImg - 1 === 0 ? 3 : state.currentImg - 1;
  }
  updatePhoto();
}

//event listeners
cartDescContainer.addEventListener("click", handleDelete);
menuContainer.addEventListener("click", handleMenuclick);
cartBtn.addEventListener("click", handleCart);
window.addEventListener("keydown", handleEscape);
addToCartBtn.addEventListener("click", handleAddToCart);
quantityBtnContainer.addEventListener("click", handleQuantity);
mainImgContainer.addEventListener("click", handleImageChange);
