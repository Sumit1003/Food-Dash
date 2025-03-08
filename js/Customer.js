// Initialize customer page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Toggle action dropdown
    const actionBtns = document.querySelectorAll(".action-btn");

    actionBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            // Close all other dropdowns
            document.querySelectorAll(".action-dropdown").forEach(dropdown => {
                if (dropdown !== btn.nextElementSibling) {
                    dropdown.classList.remove("active");
                }
            });

            // Toggle current dropdown
            const dropdown = btn.nextElementSibling;
            dropdown.classList.toggle("active");
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", () => {
        document.querySelectorAll(".action-dropdown").forEach(dropdown => {
            dropdown.classList.remove("active");
        });
    });

    // Select all customers checkbox
    const selectAllCheckbox = document.getElementById("selectAllCustomers");
    const customerCheckboxes = document.querySelectorAll(".customer-checkbox");

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener("change", () => {
            customerCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });

        // Update select all checkbox when individual checkboxes change
        customerCheckboxes.forEach(checkbox => {
            checkbox.addEventListener("change", () => {
                const allChecked = Array.from(customerCheckboxes).every(cb => cb.checked);
                const someChecked = Array.from(customerCheckboxes).some(cb => cb.checked);

                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
            });
        });
    }

    // Customer search functionality
    const customerSearch = document.getElementById("customerSearch");
    const customerTableBody = document.getElementById("customerTableBody");
    const customerRows = customerTableBody.querySelectorAll("tr");

    if (customerSearch) {
        customerSearch.addEventListener("input", () => {
            const searchTerm = customerSearch.value.toLowerCase();

            customerRows.forEach(row => {
                const customerName = row.querySelector(".customer-name").textContent.toLowerCase();
                const customerEmail = row.querySelector("td:nth-child(3)").textContent.toLowerCase();

                if (customerName.includes(searchTerm) || customerEmail.includes(searchTerm)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }

    // Customer filter functionality
    const customerFilter = document.getElementById("customerFilter");

    if (customerFilter) {
        customerFilter.addEventListener("change", () => {
            const filterValue = customerFilter.value;

            customerRows.forEach(row => {
                if (filterValue === "all") {
                    row.style.display = "";
                    return;
                }

                const statusBadge = row.querySelector(".status-badge");
                const statusText = statusBadge.textContent.toLowerCase();

                if (filterValue === "new" && statusText === "new") {
                    row.style.display = "";
                } else if (filterValue === "repeat" && statusText === "active") {
                    row.style.display = "";
                } else if (filterValue === "vip" && statusText === "vip") {
                    row.style.display = "";
                } else if (filterValue === "inactive" && statusText === "inactive") {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }

    // Customer detail modal
    const viewCustomerBtns = document.querySelectorAll(".view-customer");
    const customerDetailModal = document.getElementById("customerDetailModal");
    const closeModalBtns = document.querySelectorAll(".modal-close, .btn-close-modal");

    viewCustomerBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            customerDetailModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".modal").forEach(modal => {
                modal.classList.remove("active");
            });
            document.body.style.overflow = "";
        });
    });

    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
        document.querySelectorAll(".modal").forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    });

    // Profile tabs
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".profile-tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

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

    // Edit customer button
    const editCustomerBtns = document.querySelectorAll(".edit-customer, .btn-edit-customer");
    const editCustomerModal = document.getElementById("editCustomerModal");

    editCustomerBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            // Hide customer detail modal if open
            if (customerDetailModal) {
                customerDetailModal.classList.remove("active");
            }

            // Show edit customer modal
            editCustomerModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // Add/remove preference fields
    const addPreferenceBtn = document.querySelector(".btn-add-preference");
    const preferencesEditor = document.querySelector(".preferences-editor");

    if (addPreferenceBtn && preferencesEditor) {
        addPreferenceBtn.addEventListener("click", () => {
            const preferenceRow = document.createElement("div");
            preferenceRow.className = "preference-row";
            preferenceRow.innerHTML = `
        <input type="text" placeholder="Preference name">
        <input type="text" placeholder="Value">
        <button type="button" class="btn-remove-preference">
          <i class="fas fa-times"></i>
        </button>
      `;

            // Insert before the add button
            preferencesEditor.insertBefore(preferenceRow, addPreferenceBtn);

            // Add event listener to the new remove button
            const removeBtn = preferenceRow.querySelector(".btn-remove-preference");
            removeBtn.addEventListener("click", () => {
                preferenceRow.remove();
            });
        });

        // Add event listeners to existing remove buttons
        document.querySelectorAll(".btn-remove-preference").forEach(btn => {
            btn.addEventListener("click", () => {
                btn.closest(".preference-row").remove();
            });
        });
    }

    // Save customer form
    const saveCustomerBtn = document.querySelector(".btn-save-customer");
    const customerForm = document.getElementById("customerForm");

    if (saveCustomerBtn && customerForm) {
        saveCustomerBtn.addEventListener("click", () => {
            // In a real app, this would save the form data
            // For this demo, we'll just close the modal
            editCustomerModal.classList.remove("active");
            document.body.style.overflow = "";

            // Show success message
            showNotification("Customer information updated successfully", "success");
        });
    }

    // Delete customer
    const deleteCustomerBtns = document.querySelectorAll(".delete-customer");

    deleteCustomerBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
                // In a real app, this would delete the customer
                // For this demo, we'll just remove the row
                const row = btn.closest("tr");
                row.style.opacity = "0";
                setTimeout(() => {
                    row.remove();
                }, 300);

                // Show success message
                showNotification("Customer deleted successfully", "success");
            }
        });
    });

    // Add customer button
    const addCustomerBtn = document.querySelector(".btn-add-customer");

    if (addCustomerBtn && editCustomerModal) {
        addCustomerBtn.addEventListener("click", () => {
            // Reset form fields for new customer
            const form = editCustomerModal.querySelector("form");
            if (form) {
                form.reset();

                // Update modal title
                const modalTitle = editCustomerModal.querySelector(".modal-header h2");
                if (modalTitle) {
                    modalTitle.textContent = "Add New Customer";
                }

                // Clear preference rows except the first one
                const preferenceRows = form.querySelectorAll(".preference-row");
                preferenceRows.forEach((row, index) => {
                    if (index > 0) {
                        row.remove();
                    } else {
                        // Clear first row inputs
                        row.querySelectorAll("input").forEach(input => {
                            input.value = "";
                        });
                    }
                });
            }

            // Show modal
            editCustomerModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }

    // Export button
    const exportBtn = document.querySelector(".btn-export");

    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            // In a real app, this would export customer data
            // For this demo, we'll just show a notification
            showNotification("Customer data exported successfully", "success");
        });
    }

    // Pagination
    const paginationBtns = document.querySelectorAll(".pagination-btn");

    paginationBtns.forEach(btn => {
        if (!btn.disabled) {
            btn.addEventListener("click", () => {
                // In a real app, this would change the page
                // For this demo, we'll just update the active button
                paginationBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
            });
        }
    });

    // Add animations to customer elements
    animateCustomerElements();
});

// Show notification
function showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">&times;</button>
  `;

    // Add to document
    document.body.appendChild(notification);

    // Add styles
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.backgroundColor = type === "success" ? "#1DD1A1" : "#5352ED";
    notification.style.color = "white";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "4px";
    notification.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    notification.style.display = "flex";
    notification.style.alignItems = "center";
    notification.style.justifyContent = "space-between";
    notification.style.minWidth = "300px";
    notification.style.zIndex = "9999";
    notification.style.animation = "slideInRight 0.3s, fadeOut 0.5s 3s forwards";

    // Add animation keyframes
    const style = document.createElement("style");
    style.innerHTML = `
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
    document.head.appendChild(style);

    // Close button
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.style.background = "transparent";
    closeBtn.style.border = "none";
    closeBtn.style.color = "white";
    closeBtn.style.fontSize = "20px";
    closeBtn.style.cursor = "pointer";

    closeBtn.addEventListener("click", () => {
        notification.remove();
        style.remove();
    });

    // Auto remove after 3.5 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3500);
}

// Add animations to customer elements
function animateCustomerElements() {
    const elements = document.querySelectorAll(".stat-card, .customer-table, .pagination");

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