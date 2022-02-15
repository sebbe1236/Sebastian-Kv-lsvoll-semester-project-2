import { baseUrl } from "../urls/url.js";
import { displayMessage } from "../message/displayMessage.js";
import { savingToken } from "../storage/storage.js";
import { saveUsers } from "../storage/storage.js";
import { loginMenu } from "./loginMenu.js";
loginMenu();

const loginButton = document.querySelector(".login_btn");

const form = document.querySelector("form");
const emailUsername = document.querySelector(".email");
const password = document.querySelector(".password");
const message = document.querySelector(".message");

form.addEventListener("submit", sendForm);
console.log(form);
//Validation form som kjører sjekk om det som er i inputs er riktig
function sendForm(event) {
  event.preventDefault();
  console.log(event.preventDefault);
  message.innerHTML = "";
  console.log(message);
  const emailusernameValue = emailUsername.value.trim();
  const passwordValue = password.value.trim();

  if (emailusernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("Error", "Please fill out the email and password fields", ".message");
  }
  logIn(emailusernameValue, passwordValue);
}

async function logIn(username, password) {
  const url = baseUrl + "auth/local";

  const rawData = JSON.stringify({ identifier: username, password: password });
  console.log(rawData);
  const options = {
    method: "POST",
    body: rawData,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    if (json.user) {
      message.innerHTML += `<div>Login succesful</div>`;
      displayMessage("success", "login succesful", ".message");
      savingToken(json.jwt);
      saveUsers(json.user);

      //location.href = "/";
    }

    if (json.error) {
      displayMessage("warning", "wrong login creddentials ", ".message");
    }
  } catch (error) {
    console.log(error.message, "Error message");
  }
}
