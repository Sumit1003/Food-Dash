// Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  // If not logged in and trying to access dashboard, redirect to Index
  if (
    isLoggedIn !== "true" &&
    !window.location.pathname.includes("index.html") &&
    !window.location.pathname.includes("register.html") &&
    !window.location.pathname.includes("index.html")
  ) {
    window.location.href = "index.html"
  }

  // Set current date
  const currentDateElement = document.getElementById("currentDate")
  if (currentDateElement) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const currentDate = new Date().toLocaleDateString("en-US", options)
    currentDateElement.textContent = currentDate
  }

  // Set user initials in avatar
  const userAvatar = document.querySelector(".user-avatar span")
  if (userAvatar) {
    const userName = localStorage.getItem("userName") || "User"
    const initials = userName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
    userAvatar.textContent = initials
  }

  // Set user name and email in dropdown
  const userNameElement = document.querySelector(".user-info h4")
  const userEmailElement = document.querySelector(".user-info p")

  if (userNameElement && userEmailElement) {
    userNameElement.textContent = localStorage.getItem("userName") || "User"
    userEmailElement.textContent = localStorage.getItem("userEmail") || "user@example.com"
  }
})

// Toggle sidebar
const sidebarToggle = document.getElementById("sidebarToggle")
const sidebar = document.querySelector(".sidebar")

if (sidebarToggle) {
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("expanded")
  })
}

// Toggle user dropdown
const userMenuToggle = document.getElementById("userMenuToggle")
const userDropdown = document.getElementById("userDropdown")

if (userMenuToggle) {
  userMenuToggle.addEventListener("click", () => {
    userDropdown.classList.toggle("active")
  })

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!userMenuToggle.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.remove("active")
    }
  })
}

// Logout functionality
const logoutBtn = document.getElementById("logoutBtn")
const logoutBtnDropdown = document.getElementById("logoutBtnDropdown")

const handleLogout = () => {
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userName")
  localStorage.removeItem("userEmail")
  window.location.href = "index.html"
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", handleLogout)
}

if (logoutBtnDropdown) {
  logoutBtnDropdown.addEventListener("click", handleLogout)
}

// Add animations to dashboard elements
const animateDashboard = () => {
  const elements = document.querySelectorAll(".stat-card, .order-item, .food-item")

  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"

    setTimeout(() => {
      element.style.transition = "all 0.3s ease"
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, 100 * index)
  })
}

// Initialize dashboard animations
animateDashboard()

