import { baseUrl } from "./urls/url.js";
import { featuredProducts } from "./products/featured.js";

featuredProducts();

const bannerUrl = baseUrl + "home";

const Container = document.querySelector(".banner_container");

async function bannerimgCall() {
  try {
    const response = await fetch(bannerUrl);
    const json = await response.json();
    console.log(json);
    Container.innerHTML += `
    <div> 
    <img class="herobanner_container" src="http://localhost:1337${json.hero_banner.formats.small.url}" alt="Hero image" /></div>`;
  } catch (error) {
    console.log(error.message, "Testing");
  }
}
bannerimgCall();
