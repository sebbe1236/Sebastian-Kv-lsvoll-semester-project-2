import { fetchUsername } from "../storage/storage.js";

import { logoutButton } from "./logout.js";

export function loginMenu() {
  //const { pathname } = document.location;

  const logContainer = document.querySelector(".shoppingbasket_container");

  const userName = fetchUsername();
  console.log(userName);

  let authenticationLink = `<a href="login.html">Login</a>`;

  if (userName) {
    authenticationLink = `<button id="logout">logout ${userName}</button>
                          <a href="addproduct.html">Add Product</a>
                          <a href="editproduct.html">Edit Products</a>
    `;
  }

  logContainer.innerHTML += `<div class="menu">
                            ${authenticationLink}</div>
  `;
  logoutButton();
}
//endre auth link til login html for å koomme seg tilbake til login siden.
