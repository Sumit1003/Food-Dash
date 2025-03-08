// Toggle password visibility
const togglePasswordButtons = document.querySelectorAll(".toggle-password")

togglePasswordButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const passwordInput = button.previousElementSibling

    if (passwordInput.type === "password") {
      passwordInput.type = "text"
      button.classList.remove("fa-eye")
      button.classList.add("fa-eye-slash")
    } else {
      passwordInput.type = "password"
      button.classList.remove("fa-eye-slash")
      button.classList.add("fa-eye")
    }
  })
})

// Form validation
const loginForm = document.getElementById("loginForm")
const registerForm = document.getElementById("registerForm")

// Login form validation
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const emailError = document.getElementById("emailError")
    const passwordError = document.getElementById("passwordError")

    let isValid = true

    // Reset errors
    emailError.style.display = "none"
    passwordError.style.display = "none"

    // Email validation
    if (!email.value.trim()) {
      emailError.textContent = "Email is required"
      emailError.style.display = "block"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      emailError.textContent = "Please enter a valid email address"
      emailError.style.display = "block"
      isValid = false
    }

    // Password validation
    if (!password.value.trim()) {
      passwordError.textContent = "Password is required"
      passwordError.style.display = "block"
      isValid = false
    }

    if (isValid) {
      // Store user info in localStorage for demo purposes
      // In a real application, this would be handled by a server
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email.value)
      localStorage.setItem("userName", email.value.split("@")[0])

      // Redirect to dashboard
      window.location.href = "dashboard.html"
    }
  })
}

// Register form validation
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const fullName = document.getElementById("fullName")
    const email = document.getElementById("email")
    const phone = document.getElementById("phone")
    const password = document.getElementById("password")
    const confirmPassword = document.getElementById("confirmPassword")
    const terms = document.getElementById("terms")

    const nameError = document.getElementById("nameError")
    const emailError = document.getElementById("emailError")
    const phoneError = document.getElementById("phoneError")
    const passwordError = document.getElementById("passwordError")
    const confirmPasswordError = document.getElementById("confirmPasswordError")

    let isValid = true

    // Reset errors
    nameError.style.display = "none"
    emailError.style.display = "none"
    phoneError.style.display = "none"
    passwordError.style.display = "none"
    confirmPasswordError.style.display = "none"

    // Name validation
    if (!fullName.value.trim()) {
      nameError.textContent = "Full name is required"
      nameError.style.display = "block"
      isValid = false
    }

    // Email validation
    if (!email.value.trim()) {
      emailError.textContent = "Email is required"
      emailError.style.display = "block"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
      emailError.textContent = "Please enter a valid email address"
      emailError.style.display = "block"
      isValid = false
    }

    // Phone validation
    if (!phone.value.trim()) {
      phoneError.textContent = "Phone number is required"
      phoneError.style.display = "block"
      isValid = false
    }

    // Password validation
    if (!password.value.trim()) {
      passwordError.textContent = "Password is required"
      passwordError.style.display = "block"
      isValid = false
    } else if (password.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters"
      passwordError.style.display = "block"
      isValid = false
    }

    // Confirm password validation
    if (password.value !== confirmPassword.value) {
      confirmPasswordError.textContent = "Passwords do not match"
      confirmPasswordError.style.display = "block"
      isValid = false
    }

    // Terms validation
    if (!terms.checked) {
      isValid = false
      alert("Please agree to the Terms of Service and Privacy Policy")
    }

    if (isValid) {
      // Store user info in localStorage for demo purposes
      // In a real application, this would be handled by a server
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email.value)
      localStorage.setItem("userName", fullName.value)

      // Redirect to dashboard
      window.location.href = "dashboard.html"
    }
  })
}

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  // If on login or register page and already logged in, redirect to dashboard
  if (
    isLoggedIn === "true" &&
    (window.location.pathname.includes("index.html") || window.location.pathname.includes("register.html"))
  ) {
    window.location.href = "dashboard.html"
  }
})

