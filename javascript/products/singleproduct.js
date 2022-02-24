import { baseUrl } from "../urls/url.js";
import { retriveFromStorage } from "../storage/storage.js";
import { saveList } from "../storage/storage.js";
import { listKey } from "../storage/storage.js";

import { loginMenu } from "../adminlogin/loginMenu.js";
loginMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const singleUrl = baseUrl + "products/" + id;
console.log(id);
const singleproductContainer = document.querySelector(".row");

async function singleProduct() {
  try {
    const productStorage = retriveFromStorage();
    const response = await fetch(singleUrl);
    const json = await response.json();

    console.log(json);
    let cssIconstyle = "fa-shopping-cart";
    const iconChecked = productStorage.find((cartItem) => {
      return parseInt(cartItem.id) === json.id;
    });
    if (iconChecked) {
      cssIconstyle = "fa-cart-plus";
    }

    singleproductContainer.innerHTML += `<div class="col text-center m-3"><h2>${json.title}</h2>
    <img class="img-fluid rounded-3" src="http://localhost:1337${json.image.url}" alt="Sneaker product image" />
    <div><p>${json.description}</p>
    <h5>Price:${json.price}</h5>
    </div>
    <i class="${cssIconstyle} fa" data-id="${json.id}" data-title="${json.title}" data-img="${json.image.url}" data-price="${json.price}"">Add to cart</i>
    </div>`;
  } catch (error) {
    console.log(error.message, "query fetch");
  }
  const cartIcon = document.querySelector(".row i");

  cartIcon.addEventListener("click", addproductBasket);
}

singleProduct();

function addproductBasket() {
  this.classList.toggle("fa-shopping-cart");
  this.classList.toggle("fa-cart-plus");
  const id = this.dataset.id;
  const image = this.dataset.img;

  const price = this.dataset.price;

  const title = this.dataset.title;

  const basketItem = retriveFromStorage();

  const itemSearch = basketItem.find((item) => {
    return item.id === id;
  });
  if (itemSearch === undefined) {
    const objects = { id: id, title: title, img: image, price: price };
    basketItem.push(objects);
    saveList(basketItem);
  } else {
    const itemDelete = basketItem.filter((item) => item.id !== id);
    saveList(itemDelete);
  }
}
