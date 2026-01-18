if (localStorage.getItem("currentUser")) {
  location.href = "./index.html";
}

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  let lowerCaseLetter = /[a-z]/;
  let upperCaseLetter = /[A-Z]/;
  let numbers = /[0-9]/;

  if (username.length < 6) {
    alert("Username must be at least 6 characters");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters");
    return;
  }

  if (!lowerCaseLetter.test(password)) {
    alert("Password must contain a lowercase letter");
    return;
  }

  if (!upperCaseLetter.test(password)) {
    alert("Password must contain an uppercase letter");
    return;
  }

  if (!numbers.test(password)) {
    alert("Password must contain a number");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username, password });

  localStorage.setItem("users", JSON.stringify(users));

  alert("User created successfully, please login");
  location.href = "./login.html";
});
