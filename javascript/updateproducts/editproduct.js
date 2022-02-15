import { loginMenu } from "../adminlogin/loginMenu.js";
import { fetchToken } from "../storage/storage.js";
import { displayMessage } from "../message/displayMessage.js";
import { baseUrl } from "../urls/url.js";

loginMenu();

const queryString = document.location.search;
const param = new URLSearchParams(queryString);
const id = param.get("id");

if (!id) {
  document.location.href = "/";
}

const ProductsUrl = baseUrl + "products/" + id;

const form = document.querySelector("form");
const productName = document.querySelector("#productname");
const productPrice = document.querySelector("#productPrice");
const productDes = document.querySelector("#productDescription");
const productImage = document.querySelector("#newImage");

async function individualProduct() {
  try {
    const response = await fetch(ProductsUrl);
    const json = await response.json();
    console.log(json);
    productName.value = json.title;
    productPrice.value = json.price;
    productDes.value = json.description;
    productImage.value = json.url;
  } catch (error) {
    console.log(error.message);
  }
}

individualProduct();

//Kommet til 2:58
