import { loginMenu } from "../adminlogin/loginMenu.js";
import { baseUrl } from "../urls/url.js";
import { fetchToken } from "../storage/storage.js";
import { displayMessage } from "../message/displayMessage.js";
//Potensiell løsning på url problemet:https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
const token = fetchToken();

if (!token) {
  location.href = "/";
}

loginMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const textarea = document.querySelector("#description");
const checkFeatured = document.querySelector("#label_checkbox");
const price = document.querySelector("#price");
const image = document.querySelector("#uploadurl");
const addButton = document.querySelector(".addproduct_button");

form.addEventListener("submit", addproductForm);

function addproductForm(event) {
  event.preventDefault();

  const titleValue = title.value.trim();
  const textareaValue = textarea.value.trim();
  const priceValue = parseFloat(price.value);
  //const imageValue = image.id;

  const imageValue = image.value.trim();

  if (
    titleValue.length === 0 ||
    textareaValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    imageValue.length === 0
    //FormData.has(imageValue)
  ) {
    return displayMessage("error_message", "Please supply a valid inputs", ".form_message");
  }
  console.log(imageValue);
  addProduct(titleValue, textareaValue, priceValue, imageValue);
}

async function addProduct(title, description, price, image) {
  const url = baseUrl + "products";
  //Hvis man endrer til image_url som property så vises bildet/lenken i strapi men ikke på det produktet som er lagt til  på siden.
  const data = JSON.stringify({ title: title, description: description, price: price, image_url: image });

  const dataOptions = {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(dataOptions);
  try {
    const response = await fetch(url, dataOptions);
    const json = await response.json();
    console.log(json);
    if (json.created_at) {
      displayMessage("success_message", "Product succesfully added", ".form_message");
      form.reset();
    }
  } catch (error) {
    console.log(error.message);
  }
}
