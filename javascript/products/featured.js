import { baseUrl } from "../urls/url.js";

const featuredUrl = baseUrl + "products?featured_eq=true";
const featuredProduct = document.querySelector(".row");

export async function featuredProducts() {
  try {
    const response = await fetch(featuredUrl);
    const json = await response.json();

    json.forEach((featured) => {
      featuredProduct.innerHTML += `
      <div class="col-lg-4 col-md-3 p-3 text-center">
      <a href="singelproduct.html?id=${featured.id}">
      <h3>${featured.title}</h3>
      <img class="img-fluid rounded-3" src="http://localhost:1337${featured.image.url}" alt="featured product image" /></a>
      </div>
      `;
    });
    console.log(json);
  } catch (error) {
    console.log(error.message, "Henter featured for framsida. ");
  }
}
