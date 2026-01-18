if (localStorage.getItem("currentUser")) {
  location.href = "./index.html";
}

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length === 0) {
    alert("No user found");
    return;
  }

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  let existingUser = users.find(
    (user) =>
      user.username === username &&
      user.password === password
  );

  if (existingUser) {
    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    location.href = "./index.html";
  } else {
    alert("Username or password is incorrect");
  }
});
