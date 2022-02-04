import { retriveFromStorage } from "../storage/storage.js";
import { saveList } from "../storage/storage.js";
import { listKey } from "../storage/storage.js";
const basketContainer = document.querySelector(".row");
console.log(basketContainer);
const storageProduct = retriveFromStorage();
console.log(storageProduct);
if (storageProduct.length === 0) {
  basketContainer.innerHTML += `<h2>Cart is empty</h2>`;
}

function updateContent() {
  try {
    basketContainer.innerHTML = "";
    storageProduct.forEach((product) => {
      basketContainer.innerHTML += `<div class="col-lg-3 col-md-2">
                <h3>${product.title}</h3>
                <img class="img-fluid" src="http://localhost:1337${product.img}" alt="Sneaker product image" />
                    <h5>Price:${product.price}$</h5>
                    <button data-id="${product.id}" class="removeproduct_btn"  >Remove from basket</button>
                </div>
                
                `;
    });
  } catch (error) {
    console.log(error.message, "Testing update content");
  }
}
updateContent();
const removeproduct_btn = document.querySelectorAll(".test_container button");

removeproduct_btn.forEach(function (removeItem) {
  removeItem.addEventListener("click", removeProduct);
});

function removeProduct() {
  console.log("test reemove btn");
  const id = this.dataset.id;

  let storageProduct = retriveFromStorage();
  console.log(retriveFromStorage);
  console.log("test");
  //Denne endrer ingenting basicly
  storageProduct = storageProduct.filter((remove) => {
    if (id !== remove.id) {
      return true;
    }
  });
  updateContent();

  // Fjerner fra storage men updater ikke HTML: //const storageProduct = retriveFromStorage();
  //const removeItem = storageProduct.filter((item) => item.id !== id);
  //saveList(removeItem);
}

//
