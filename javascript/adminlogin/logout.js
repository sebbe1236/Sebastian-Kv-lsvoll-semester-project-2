import { clearUserkey } from "../storage/storage.js";
import { clearUsertaken } from "../storage/storage.js";

export function logoutButton() {
  const button = document.querySelector("#logout");
  if (button) {
    button.onclick = function () {
      const doLogout = confirm("do you want to log out?");

      if (doLogout) {
        clearUserkey();
        clearUsertaken();
        location.href = "/";
      }
    };
  }
}
