import { baseUrl } from "../urls/url.js";
import { fetchToken } from "../storage/storage.js";

export function deleteProduct(id) {
  const deleteContainer = document.querySelector(".delete_container");

  deleteContainer.innerHTML = `<button type="button" class="deleteproduct_button">Delete product</button>`;

  const deleteButton = document.querySelector(".deleteproduct_button");

  deleteButton.onclick = async function () {
    console.log(id);

    const deleteWarning = confirm("are you sure you want to delete this product?");
    console.log(deleteWarning);
    if (deleteWarning) {
      const deleteUrl = baseUrl + "products/" + id;
      const token = fetchToken();

      const delOptions = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(deleteUrl, delOptions);
        const results = await response.json();
        console.log(results);
        location.href = "/editproduct.html";
      } catch (error) {
        console.log(error.message);
      }
    }
  };
}
