// Initialize settings page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Tab navigation
  const tabLinks = document.querySelectorAll(".settings-nav li");
  const tabContents = document.querySelectorAll(".settings-tab");

  tabLinks.forEach(link => {
    link.addEventListener("click", () => {
      const tabId = link.getAttribute("data-tab");

      // Update active tab link
      tabLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Show selected tab content
      tabContents.forEach(tab => {
        if (tab.id === tabId) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      });
    });
  });

  // Custom date range toggle
  const dateRangeSelect = document.getElementById("dateRange");
  const customDateRange = document.getElementById("customDateRange");

  if (dateRangeSelect && customDateRange) {
    dateRangeSelect.addEventListener("change", () => {
      if (dateRangeSelect.value === "custom") {
        customDateRange.classList.add("active");
      } else {
        customDateRange.classList.remove("active");
      }
    });
  }

  // Logo upload functionality
  const uploadBtn = document.querySelector(".btn-upload");
  const logoUpload = document.getElementById("logoUpload");
  const logoPreview = document.querySelector(".logo-preview");

  if (uploadBtn && logoUpload) {
    uploadBtn.addEventListener("click", () => {
      logoUpload.click();
    });

    logoUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          logoPreview.innerHTML = "";
          logoPreview.style.backgroundImage = `url(${event.target.result})`;
          logoPreview.style.backgroundSize = "cover";
          logoPreview.style.backgroundPosition = "center";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Theme options
  const themeOptions = document.querySelectorAll(".theme-option");

  themeOptions.forEach(option => {
    option.addEventListener("click", () => {
      themeOptions.forEach(o => o.classList.remove("active"));
      option.classList.add("active");

      // In a real app, this would apply the selected theme
      const themeName = option.querySelector("span").textContent.toLowerCase();
      console.log(`Theme changed to: ${themeName}`);
    });
  });

  // Color options
  const colorOptions = document.querySelectorAll(".color-option");

  colorOptions.forEach(option => {
    option.addEventListener("click", () => {
      colorOptions.forEach(o => o.classList.remove("active"));
      option.classList.add("active");

      // In a real app, this would apply the selected color
      const color = option.style.getPropertyValue("--color");
      console.log(`Accent color changed to: ${color}`);
    });
  });

  // Form submission handling
  const forms = document.querySelectorAll(".settings-form");

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show success message
      const formActions = form.querySelector(".form-actions");
      const successMsg = document.createElement("div");
      successMsg.className = "success-message";
      successMsg.textContent = "Changes saved successfully!";
      successMsg.style.color = "var(--success-color)";
      successMsg.style.marginTop = "1rem";

      // Remove existing message if any
      const existingMsg = formActions.querySelector(".success-message");
      if (existingMsg) {
        formActions.removeChild(existingMsg);
      }

      formActions.appendChild(successMsg);

      // Remove message after 3 seconds
      setTimeout(() => {
        if (formActions.contains(successMsg)) {
          formActions.removeChild(successMsg);
        }
      }, 3000);
    });
  });

  // Add payment method button
  const addPaymentBtn = document.querySelector(".btn-add-payment");

  if (addPaymentBtn) {
    addPaymentBtn.addEventListener("click", () => {
      // In a real app, this would open a modal to add a new payment method
      alert("Add payment method functionality would open here");
    });
  }

  // Edit and delete payment buttons
  const editPaymentBtns = document.querySelectorAll(".btn-edit");
  const deletePaymentBtns = document.querySelectorAll(".btn-delete");

  editPaymentBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // In a real app, this would open a modal to edit the payment method
      alert("Edit payment method functionality would open here");
    });
  });

  deletePaymentBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // In a real app, this would show a confirmation dialog
      if (confirm("Are you sure you want to delete this payment method?")) {
        // Delete the payment method
        const paymentMethod = btn.closest(".payment-method");
        paymentMethod.style.opacity = "0";
        setTimeout(() => {
          paymentMethod.remove();
        }, 300);
      }
    });
  });

  // Logout from all devices button
  const logoutAllBtn = document.querySelector(".btn-logout-all");

  if (logoutAllBtn) {
    logoutAllBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout from all devices?")) {
        // In a real app, this would log out all sessions
        alert("You have been logged out from all devices");
        // Redirect to login page
        window.location.href = "index.html";
      }
    });
  }

  // Session logout buttons
  const sessionLogoutBtns = document.querySelectorAll(".btn-logout:not(:disabled)");

  sessionLogoutBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // In a real app, this would terminate the specific session
      const session = btn.closest(".session");
      session.style.opacity = "0";
      setTimeout(() => {
        session.remove();
      }, 300);
    });
  });

  // Add animations to settings elements
  animateSettings();
});

// Add animations to settings elements
function animateSettings() {
  const elements = document.querySelectorAll(".settings-tab.active > *");

  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";

    setTimeout(() => {
      element.style.transition = "all 0.3s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 100 * index);
  });
}