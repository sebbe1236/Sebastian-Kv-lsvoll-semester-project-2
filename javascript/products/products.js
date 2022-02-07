import { baseUrl } from "../urls/url.js";

const productsUrl = baseUrl + "products";

const productsContainer = document.querySelector(".row");

async function productsCall() {
  try {
    const response = await fetch(productsUrl);
    const json = await response.json();
    searchProduct(json);
    renderProducts(json);
  } catch (error) {
    console.log(error.message, "Dette er products calln");
  }
}
productsCall();

function renderProducts(json) {
  try {
    productsContainer.innerHTML = "";
    json.forEach((products) => {
      productsContainer.innerHTML += `
      
        <div class="col-lg-3 col-md-2 p-5 text-center">
        <a a href="singelproduct.html?id=${products.id}">
        <h3>${products.title}</h3> 
        <img class="img-fluid rounded-3" src="http://localhost:1337${products.image.url}" alt="Sneaker product image" />
        <h5>Price:${products.price}$</h5> </a>
        </div>
        
        
        `;
    });
  } catch (error) {
    console.log(error.message);
  }
}

function searchProduct(productSearch) {
  const searchField = document.querySelector("#textinput");

  searchField.onkeyup = function (event) {
    const SearchValue = event.target.value.trim().toLowerCase();

    const filteredProduct = productSearch.filter((product) => {
      if (product.title.toLowerCase().includes(SearchValue)) {
        return true;
      }
    });
    renderProducts(filteredProduct);
    console.log(filteredProduct);
  };
}
