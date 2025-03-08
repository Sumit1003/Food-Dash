// Sample menu data
const menuData = [
    {
        id: 1,
        name: 'Classic Burger',
        category: 'burgers',
        price: 8.99,
        description: 'Juicy beef patty with fresh lettuce, tomatoes, and our special sauce',
        image: 'assets/burger.jpeg',
        status: 'active',
        rating: 4.8,
        reviews: 170,
        options: ['Add cheese +₹1', 'Add bacon +₹1.50', 'Double patty +$3']
    },
    {
        id: 2,
        name: 'Pepperoni Pizza',
        category: 'pizza',
        price: 12.99,
        description: 'Classic pizza with extra cheese and premium pepperoni slices',
        image: 'assets/pizza.jpg',
        status: 'active',
        rating: 4.9,
        reviews: 246,
        options: ['Small (10")', 'Medium (12")', 'Large (14")']
    },
    {
        id: 3,
        name: 'Veg Wings',
        category: 'wings',
        price: 10.99,
        description: 'Crispy wings tossed in spicy buffalo sauce with blue cheese dip',
        image: 'assets/Wings.png',
        status: 'active',
        rating: 4.7,
        reviews: 196,
        options: ['Mild', 'Medium', 'Hot', 'Extra Hot']
    },
    {
        id: 4,
        name: 'French Fries',
        category: 'sides',
        price: 3.99,
        description: 'Crispy golden fries seasoned with our special blend of spices',
        image: 'assets/french_fries.jpeg',
        status: 'active',
        rating: 4.6,
        reviews: 152,
        options: ['Regular', 'Large', 'Add cheese +₹1']
    },
    {
        id: 5,
        name: 'Chocolate Milkshake',
        category: 'drinks',
        price: 4.99,
        description: 'Rich and creamy chocolate milkshake topped with whipped cream',
        image: 'assets/milkshake.jpeg',
        status: 'active',
        rating: 4.8,
        reviews: 120,
        options: ['Regular', 'Large +₹1', 'Add whipped cream']
    },
    {
        id: 6,
        name: 'Veggie Burger',
        category: 'burgers',
        price: 7.99,
        description: 'Plant-based patty with fresh vegetables and vegan mayo',
        image: 'assets/veggie-burger.jpg',
        status: 'active',
        rating: 4.5,
        reviews: 85,
        options: ['Add vegan cheese +₹1', 'Add avocado +₹1.50']
    },
    {
        id: 7,
        name: 'Margherita Pizza',
        category: 'pizza',
        price: 11.99,
        description: 'Classic Italian pizza with tomato sauce, mozzarella, and fresh basil',
        image: 'img/margherita.avif',
        status: 'active',
        rating: 4.7,
        reviews: 178,
        options: ['Small (10")', 'Medium (12")', 'Large (14")']
    },
    {
        id: 8,
        name: 'Garlic Parmesan Wings',
        category: 'wings',
        price: 11.99,
        description: 'Crispy wings tossed in garlic parmesan sauce',
        image: 'assets/garlic-wings.avif',
        status: 'active',
        rating: 4.8,
        reviews: 132,
        options: ['Regular', 'Large +$3']
    },
    {
        id: 9,
        name: 'Onion Rings',
        category: 'sides',
        price: 4.49,
        description: 'Crispy battered onion rings served with dipping sauce',
        image: 'assets/onion-rings.webp',
        status: 'active',
        rating: 4.5,
        reviews: 98,
        options: ['Regular', 'Large +₹1.50']
    },
    {
        id: 10,
        name: 'Strawberry Cheesecake',
        category: 'desserts',
        price: 5.99,
        description: 'Creamy cheesecake topped with fresh strawberry sauce',
        image: 'assets/cheesecake.jpg',
        status: 'active',
        rating: 4.9,
        reviews: 210,
        options: ['Add whipped cream', 'Add extra strawberry sauce']
    },
    {
        id: 11,
        name: 'Iced Coffee',
        category: 'drinks',
        price: 3.49,
        description: 'Chilled coffee served over ice with your choice of flavor',
        image: 'assets/iced-coffee.jpg',
        status: 'inactive',
        rating: 4.6,
        reviews: 75,
        options: ['Vanilla', 'Caramel', 'Hazelnut', 'Add whipped cream']
    },
    {
        id: 12,
        name: 'Chocolate Brownie',
        category: 'desserts',
        price: 4.99,
        description: 'Warm chocolate brownie served with vanilla ice cream',
        image: 'assets/brownie.jpeg',
        status: 'active',
        rating: 4.8,
        reviews: 156,
        options: ['Add extra ice cream +₹1', 'Add chocolate sauce']
    }
];

// DOM elements
const menuGrid = document.getElementById('menuGrid');
const menuSearch = document.getElementById('menuSearch');
const categoryTabs = document.querySelectorAll('.category-tab');
const filterBtn = document.getElementById('filterBtn');
const filterDropdown = document.getElementById('filterDropdown');
const clearFiltersBtn = document.getElementById('clearFilters');
const applyFiltersBtn = document.getElementById('applyFilters');
const addItemBtn = document.getElementById('addItemBtn');
const itemModal = document.getElementById('itemModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveItemBtn = document.getElementById('saveItemBtn');
const itemForm = document.getElementById('itemForm');
const modalTitle = document.getElementById('modalTitle');
const optionsContainer = document.getElementById('optionsContainer');
const addOptionBtn = document.getElementById('addOptionBtn');

// Current filters
let currentCategory = 'all';
let currentFilters = {
    categories: ['burgers', 'pizza', 'wings', 'sides', 'drinks', 'desserts'],
    status: ['active']
};
let currentSearchTerm = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Render menu items
    renderMenuItems();

    // Add event listeners
    menuSearch.addEventListener('input', handleSearch);

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.getAttribute('data-category');
            renderMenuItems();
        });
    });

    filterBtn.addEventListener('click', toggleFilterDropdown);
    clearFiltersBtn.addEventListener('click', clearFilters);
    applyFiltersBtn.addEventListener('click', applyFilters);
    addItemBtn.addEventListener('click', openAddItemModal);
    closeModal.addEventListener('click', closeItemModal);
    cancelBtn.addEventListener('click', closeItemModal);
    saveItemBtn.addEventListener('click', saveItem);
    addOptionBtn.addEventListener('click', addOption);

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
            filterDropdown.classList.remove('show');
        }
    });
});

// Render menu items based on current filters
function renderMenuItems() {
    // Clear the grid
    menuGrid.innerHTML = '';

    // Filter items
    const filteredItems = menuData.filter(item => {
        // Category filter
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;

        // Status and category filters from dropdown
        const matchesFilters =
            currentFilters.categories.includes(item.category) &&
            currentFilters.status.includes(item.status);

        // Search filter
        const matchesSearch =
            item.name.toLowerCase().includes(currentSearchTerm) ||
            item.description.toLowerCase().includes(currentSearchTerm);

        return matchesCategory && matchesFilters && matchesSearch;
    });

    // Render items
    filteredItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';

        menuItem.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image.replace('img/', 'assets/')}" alt="${item.name}">
                <div class="menu-item-category">${capitalizeFirstLetter(item.category)}</div>
                <div class="menu-item-status ${item.status}">${capitalizeFirstLetter(item.status)}</div>
            </div>
            <div class="menu-item-details">
                <div class="menu-item-header">
                    <div>
                        <div class="menu-item-name">${item.name}</div>
                        <div class="menu-item-rating">
                            <i class="fas fa-star"></i> ${item.rating} (${item.reviews})
                        </div>
                    </div>
                    <div class="menu-item-price">₹${item.price.toFixed(2)}</div>
                </div>
                <div class="menu-item-description">${item.description}</div>
                <div class="menu-item-actions">
                    <div class="menu-item-options">
                        ${item.options.length > 0 ? `<i class="fas fa-list-ul"></i> ${item.options.length} options` : 'No options'}
                    </div>
                    <div class="menu-item-actions-buttons">
                        <button class="action-btn edit" data-id="${item.id}" title="Edit Item">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" data-id="${item.id}" title="Delete Item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

        menuGrid.appendChild(menuItem);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.getAttribute('data-id'));
            openEditItemModal(itemId);
        });
    });

    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = parseInt(btn.getAttribute('data-id'));
            deleteItem(itemId);
        });
    });

    // Show message if no items found
    if (filteredItems.length === 0) {
        menuGrid.innerHTML = `
            <div class="no-items-message">
                <i class="fas fa-search"></i>
                <p>No menu items found. Try adjusting your filters or search term.</p>
                <button class="btn btn-primary" id="resetFiltersBtn">Reset Filters</button>
            </div>
        `;

        document.getElementById('resetFiltersBtn').addEventListener('click', () => {
            clearFilters();
            currentCategory = 'all';
            currentSearchTerm = '';
            menuSearch.value = '';
            categoryTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('data-category') === 'all') {
                    tab.classList.add('active');
                }
            });
            renderMenuItems();
        });
    }
}

// Handle search input
function handleSearch() {
    currentSearchTerm = menuSearch.value.toLowerCase();
    renderMenuItems();
}

// Toggle filter dropdown
function toggleFilterDropdown() {
    filterDropdown.classList.toggle('show');
}

// Clear filters
function clearFilters() {
    // Reset checkboxes
    document.querySelectorAll('#filterDropdown input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.value === 'active' || checkbox.getAttribute('value').match(/burgers|pizza|wings|sides|drinks|desserts/)) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }
    });

    // Reset filter state
    currentFilters = {
        categories: ['burgers', 'pizza', 'wings', 'sides', 'drinks', 'desserts'],
        status: ['active']
    };

    // Close dropdown
    filterDropdown.classList.remove('show');

    // Re-render items
    renderMenuItems();
}

// Apply filters
function applyFilters() {
    // Get selected categories
    const selectedCategories = [];
    document.querySelectorAll('#filterDropdown input[value="burgers"], #filterDropdown input[value="pizza"], #filterDropdown input[value="wings"], #filterDropdown input[value="sides"], #filterDropdown input[value="drinks"], #filterDropdown input[value="desserts"]').forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(checkbox.value);
        }
    });

    // Get selected status
    const selectedStatus = [];
    document.querySelectorAll('#filterDropdown input[value="active"], #filterDropdown input[value="inactive"]').forEach(checkbox => {
        if (checkbox.checked) {
            selectedStatus.push(checkbox.value);
        }
    });

    // Update filters
    currentFilters = {
        categories: selectedCategories,
        status: selectedStatus
    };

    // Close dropdown
    filterDropdown.classList.remove('show');

    // Re-render items
    renderMenuItems();
}

// Open add item modal
function openAddItemModal() {
    modalTitle.textContent = 'Add New Item';
    itemForm.reset();
    document.getElementById('itemId').value = '';

    // Clear options
    optionsContainer.innerHTML = '';

    // Show modal
    itemModal.style.display = 'block';
}

// Open edit item modal
function openEditItemModal(itemId) {
    const item = menuData.find(item => item.id === itemId);

    if (item) {
        modalTitle.textContent = 'Edit Item';

        // Fill form fields
        document.getElementById('itemId').value = item.id;
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemCategory').value = item.category;
        document.getElementById('itemPrice').value = item.price;
        document.getElementById('itemDescription').value = item.description;
        document.getElementById('itemImage').value = item.image;
        document.getElementById('itemStatus').value = item.status;

        // Add options
        optionsContainer.innerHTML = '';
        item.options.forEach(option => {
            addOption(option);
        });

        // Show modal
        itemModal.style.display = 'block';
    }
}

// Close item modal
function closeItemModal() {
    itemModal.style.display = 'none';
}

// Save item
function saveItem() {
    // Validate form
    if (!itemForm.checkValidity()) {
        itemForm.reportValidity();
        return;
    }

    // Get form values
    const itemId = document.getElementById('itemId').value;
    const name = document.getElementById('itemName').value;
    const category = document.getElementById('itemCategory').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const description = document.getElementById('itemDescription').value;
    const image = document.getElementById('itemImage').value || 'img/placeholder.jpg';
    const status = document.getElementById('itemStatus').value;

    // Get options
    const options = [];
    document.querySelectorAll('.option-item input').forEach(input => {
        if (input.value.trim()) {
            options.push(input.value.trim());
        }
    });

    if (itemId) {
        // Edit existing item
        const index = menuData.findIndex(item => item.id === parseInt(itemId));

        if (index !== -1) {
            menuData[index] = {
                ...menuData[index],
                name,
                category,
                price,
                description,
                image,
                status,
                options
            };

            showNotification(`Item "${name}" has been updated`);
        }
    } else {
        // Add new item
        const newItem = {
            id: menuData.length > 0 ? Math.max(...menuData.map(item => item.id)) + 1 : 1,
            name,
            category,
            price,
            description,
            image,
            status,
            options,
            rating: 0,
            reviews: 0
        };

        menuData.push(newItem);
        showNotification(`Item "${name}" has been added`);
    }

    // Close modal and re-render items
    closeItemModal();
    renderMenuItems();
}

// Delete item
function deleteItem(itemId) {
    const item = menuData.find(item => item.id === itemId);

    if (item && confirm(`Are you sure you want to delete "${item.name}"?`)) {
        const index = menuData.findIndex(item => item.id === itemId);

        if (index !== -1) {
            menuData.splice(index, 1);
            showNotification(`Item "${item.name}" has been deleted`);
            renderMenuItems();
        }
    }
}

// Add option
function addOption(value = '') {
    const optionItem = document.createElement('div');
    optionItem.className = 'option-item';

    optionItem.innerHTML = `
        <input type="text" placeholder="Option (e.g. 'Add cheese +₹1')" value="${value}">
        <button type="button" class="remove-option-btn">
            <i class="fas fa-times"></i>
        </button>
    `;

    optionsContainer.appendChild(optionItem);

    // Add event listener to remove button
    optionItem.querySelector('.remove-option-btn').addEventListener('click', () => {
        optionsContainer.removeChild(optionItem);
    });
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles if not already added
if (!document.querySelector('style#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--success-color);
            color: white;
            padding: 1rem;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .no-items-message {
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
        }
        
        .no-items-message i {
            font-size: 3rem;
            color: var(--gray-400);
            margin-bottom: 1rem;
        }
        
        .no-items-message p {
            color: var(--gray-600);
            margin-bottom: 1.5rem;
        }
    `;
    document.head.appendChild(style);
}