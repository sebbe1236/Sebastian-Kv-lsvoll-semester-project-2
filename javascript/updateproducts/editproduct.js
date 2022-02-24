import { loginMenu } from "../adminlogin/loginMenu.js";
import { fetchToken } from "../storage/storage.js";
import { displayMessage } from "../message/displayMessage.js";
import { baseUrl } from "../urls/url.js";
import { deleteProduct } from "./deleteproduct.js";

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
    productImage.value = json.image.url;
    inputId.value = json.id;
    console.log(inputId);

    deleteProduct(json.id);

    console.log(productImage);
  } catch (error) {
    console.log(error.message);
  }
}
//||productimageValue.length === 0
individualProduct();

//Kommet til 2:58
form.addEventListener("submit", submitEditForm);
function submitEditForm(event) {
  event.preventDefault();

  const productnameValue = productName.value.trim();
  const productpriceValue = parseFloat(productPrice.price);
  const descriptionValue = productDes.value.trim();
  //const productimageValue = productImage.value.trim();

  if (
    productnameValue.length === 0 ||
    productpriceValue.length === 0 ||
    isNaN(productpriceValue) ||
    descriptionValue.length === 0
  ) {
    return displayMessage("error", "Can not make change, invalid inputs", ".edit_message");
  }
  editProduct(productnameValue, descriptionValue, productpriceValue);
}

async function editProduct(title, price, description, image) {
  const Url = baseUrl + "products/" + id;

  const editData = JSON.stringify({ title: title, price: price, description: description, image: image });
  const token = fetchToken();
  const editOptions = {
    method: "PUT",
    body: editData,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(Url, editOptions);
    const results = await response.json();
    console.log(results);
  } catch (error) {
    console.log(error.message, "faild edit");
  }
}
