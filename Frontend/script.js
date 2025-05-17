// API URL from environment
const API_URL = "http://localhost:3000/api";

// Show/hide forms
window.showForm = function (formType) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabs = document.querySelectorAll(".tab-btn");

  if (formType === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    tabs[0].classList.add("active");
    tabs[1].classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    tabs[0].classList.remove("active");
    tabs[1].classList.add("active");
  }
};

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const messageElement = document.getElementById("loginMessage");

  try {
    console.log("Attempting login...");
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response received:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    if (response.ok) {
      messageElement.style.color = "green";
      messageElement.textContent = `Welcome back, ${data.username}!`;
    } else {
      messageElement.style.color = "red";
      messageElement.textContent = data.message || "Login failed";
    }
  } catch (error) {
    console.error("Login error:", error);
    messageElement.style.color = "red";
    messageElement.textContent =
      "Error connecting to server. Please check if the server is running.";
  }
});

// Handle registration form submission
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const messageElement = document.getElementById("registerMessage");

    try {
      console.log("Attempting registration...");
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      console.log("Response received:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        messageElement.style.color = "green";
        messageElement.textContent = "Registration successful! Please login.";
        // Clear form
        document.getElementById("registerForm").reset();
        // Switch to login form
        showForm("login");
      } else {
        messageElement.style.color = "red";
        messageElement.textContent = data.message || "Registration failed";
      }
    } catch (error) {
      console.error("Registration error:", error);
      messageElement.style.color = "red";
      messageElement.textContent =
        "Error connecting to server. Please check if the server is running.";
    }
  });
