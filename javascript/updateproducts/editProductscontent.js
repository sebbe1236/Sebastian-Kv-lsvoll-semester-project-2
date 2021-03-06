import { loginMenu } from "../adminlogin/loginMenu.js";
import { baseUrl } from "../urls/url.js";

loginMenu();

const contentContainer = document.querySelector(".row");

const editProductsUrl = baseUrl + "products";

async function editProductsContent() {
  try {
    const response = await fetch(editProductsUrl);
    const json = await response.json();
    console.log(json);
    json.forEach((productsforedit) => {
      let image = "";

      if (productsforedit.image !== null) {
        image = `<img class="img-fluid rounded-3" src="http://localhost:1337${productsforedit.image.url}" alt="Sneaker product image" />`;
      } else if (productsforedit.image_url !== null) {
        image = `<img class="img-fluid rounded-3" src="${productsforedit.image_url}" alt="Sneaker product image" />`;
      }

      contentContainer.innerHTML += ` <div class="col-lg-3 col-md-4 p-5 text-center">
       <a href="editsingleproduct.html?id=${productsforedit.id}">
       <h3>${productsforedit.title}</h3> 
      

      ${image}
      
        
       <h5>Price:${productsforedit.price}$</h5> 
       <button>Edit this product</button> </a>
       </div>`;
    });
  } catch (error) {
    console.log(error.message);
  }
}

editProductsContent();
