// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navMenu = document.querySelector("nav ul")

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    mobileMenuBtn.classList.toggle("active")
  })
}

// Intersection Observer for animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".feature-card, .food-card, .about-content, .about-image, .contact-container",
  )

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  elements.forEach((element) => {
    observer.observe(element)
  })
}

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  animateOnScroll()
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      })

      // Close mobile menu if open
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active")
        mobileMenuBtn.classList.remove("active")
      }
    }
  })
})

// Form validation for contact form
const contactForm = document.querySelector(".contact-form form")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simple validation
    let valid = true
    const inputs = contactForm.querySelectorAll("input, textarea")

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        valid = false
        input.classList.add("error")
      } else {
        input.classList.remove("error")
      }
    })

    if (valid) {
      // Show success message
      const successMessage = document.createElement("div")
      successMessage.className = "success-message"
      successMessage.textContent = "Your message has been sent successfully!"

      contactForm.innerHTML = ""
      contactForm.appendChild(successMessage)
    }
  })
}

