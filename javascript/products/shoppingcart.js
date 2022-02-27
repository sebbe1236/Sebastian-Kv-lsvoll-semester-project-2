import { retriveFromStorage } from "../storage/storage.js";
import { saveList } from "../storage/storage.js";
import { listKey } from "../storage/storage.js";
import { loginMenu } from "../adminlogin/loginMenu.js";
loginMenu();
const basketContainer = document.querySelector(".row");

const totalbasketPrice = document.querySelector("#totalprice");
console.log(basketContainer);

basketContent();

function basketContent() {
  try {
    const storageProduct = retriveFromStorage();
    console.log(storageProduct);
    if (storageProduct.length === 0) {
      basketContainer.innerHTML = `<h2>Cart is empty</h2>`;
    } else {
      basketContainer.innerHTML = "";
      storageProduct.forEach((product) => {
        basketContainer.innerHTML += `<div class="col-lg-3 col-md-4 mp-3 p-4 ">
                  <h3>${product.title}</h3>
                  <img class="img-fluid rounded-3" src="http://localhost:1337${product.img}" alt="Sneaker product image" />
                      <h5>Price:${product.price}$</h5>
                      <button data-id="${product.id}" class="removeproduct_btn">Remove from basket</button>
                  </div>
                  
                  `;
      });
    }
    const removeproduct_btn = document.querySelectorAll(".test_container button");
    console.log(removeproduct_btn);

    removeproduct_btn.forEach(function (removeItem) {
      removeItem.addEventListener("click", removeProduct);
    });
    //Annen måte å få lagt til oppdatert pris på:
    // let totalPrice = 0;
    // storageProduct.forEach(function (updateTotal) {
    //   totalPrice += parseInt(updateTotal.price);
    // });

    // totalbasketPrice.innerHTML = `${totalPrice}`;
    //PreviousValue er tallet man har, currentValue er det som plusses på.
    //currentValue er den nye verdien som legges til hvis man legger til et nytt item og plusses på previousvallet.
    const updatePrice = (previousValue, currentValue) => previousValue + currentValue;
    const priceFilter = storageProduct.map((item) => parseFloat(item.price));

    totalbasketPrice.innerHTML = priceFilter.reduce(updatePrice);
  } catch (error) {
    console.log(error.message, "Testing update content");
  }
}

function removeProduct() {
  console.log("test reemove btn");
  const id = this.dataset.id;

  const storageProduct = retriveFromStorage();

  console.log("test");

  const updatedStorage = storageProduct.filter((remove) => {
    if (id !== remove.id) {
      return true;
    }
  });
  saveList(updatedStorage);

  console.log(updatedStorage);
  basketContent();
}
