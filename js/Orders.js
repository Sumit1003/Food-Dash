// Sample orders data
const ordersData = [
    {
        id: '#1234',
        customer: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        items: [
            { name: 'Classic Burger', quantity: 2, price: 8.99 },
            { name: 'French Fries', quantity: 1, price: 3.99 },
            { name: 'Coca Cola', quantity: 1, price: 1.99 }
        ],
        total: 23.96,
        date: '2023-02-21 14:30',
        status: 'pending',
        address: '123 Main St, Anytown, AT 12345',
        payment: 'Credit Card (Visa **** 1234)'
    },
    {
        id: '#1233',
        customer: 'Emily Johnson',
        email: 'emily.johnson@example.com',
        phone: '(555) 987-6543',
        items: [
            { name: 'Pepperoni Pizza', quantity: 1, price: 12.99 },
            { name: 'Buffalo Wings', quantity: 2, price: 10.99 },
            { name: 'Sprite', quantity: 2, price: 1.99 }
        ],
        total: 38.95,
        date: '2023-02-21 13:45',
        status: 'preparing',
        address: '456 Oak Ave, Somewhere, SW 67890',
        payment: 'PayPal'
    },
    {
        id: '#1232',
        customer: 'Michael Brown',
        email: 'michael.brown@example.com',
        phone: '(555) 456-7890',
        items: [
            { name: 'Tacos', quantity: 3, price: 2.99 },
            { name: 'Nachos', quantity: 1, price: 5.99 },
            { name: 'Pepsi', quantity: 1, price: 1.99 }
        ],
        total: 16.95,
        date: '2023-02-21 12:15',
        status: 'completed',
        address: '789 Pine Rd, Elsewhere, EW 13579',
        payment: 'Cash on Delivery'
    },
    {
        id: '#1231',
        customer: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        phone: '(555) 789-0123',
        items: [
            { name: 'Veggie Wrap', quantity: 2, price: 7.99 },
            { name: 'Sweet Potato Fries', quantity: 1, price: 4.99 },
            { name: 'Iced Tea', quantity: 2, price: 2.49 }
        ],
        total: 25.95,
        date: '2023-02-21 11:30',
        status: 'completed',
        address: '321 Maple Dr, Nowhere, NW 97531',
        payment: 'Credit Card (Mastercard **** 5678)'
    },
    {
        id: '#1230',
        customer: 'David Lee',
        email: 'david.lee@example.com',
        phone: '(555) 234-5678',
        items: [
            { name: 'Chicken Sandwich', quantity: 1, price: 9.99 },
            { name: 'Onion Rings', quantity: 1, price: 4.49 },
            { name: 'Milkshake', quantity: 1, price: 4.99 }
        ],
        total: 19.47,
        date: '2023-02-21 10:45',
        status: 'cancelled',
        address: '654 Cedar Ln, Anywhere, AW 24680',
        payment: 'Credit Card (Amex **** 9012)'
    },
    {
        id: '#1229',
        customer: 'Jennifer Martinez',
        email: 'jennifer.martinez@example.com',
        phone: '(555) 345-6789',
        items: [
            { name: 'Steak Burrito', quantity: 2, price: 10.99 },
            { name: 'Guacamole', quantity: 1, price: 2.49 },
            { name: 'Lemonade', quantity: 2, price: 2.99 }
        ],
        total: 30.45,
        date: '2023-02-20 19:30',
        status: 'completed',
        address: '987 Birch St, Someplace, SP 86420',
        payment: 'Credit Card (Visa **** 3456)'
    },
    {
        id: '#1228',
        customer: 'Robert Taylor',
        email: 'robert.taylor@example.com',
        phone: '(555) 456-7890',
        items: [
            { name: 'BBQ Ribs', quantity: 1, price: 15.99 },
            { name: 'Coleslaw', quantity: 1, price: 3.49 },
            { name: 'Cornbread', quantity: 2, price: 2.49 },
            { name: 'Root Beer', quantity: 1, price: 1.99 }
        ],
        total: 26.45,
        date: '2023-02-20 18:15',
        status: 'completed',
        address: '159 Walnut Ave, Otherplace, OP 75319',
        payment: 'Cash on Delivery'
    },
    {
        id: '#1227',
        customer: 'Lisa Anderson',
        email: 'lisa.anderson@example.com',
        phone: '(555) 567-8901',
        items: [
            { name: 'Margherita Pizza', quantity: 1, price: 11.99 },
            { name: 'Caesar Salad', quantity: 1, price: 6.99 },
            { name: 'Garlic Bread', quantity: 1, price: 3.99 },
            { name: 'Water', quantity: 2, price: 0.99 }
        ],
        total: 24.95,
        date: '2023-02-20 17:45',
        status: 'completed',
        address: '753 Elm Ct, Lastplace, LP 97531',
        payment: 'PayPal'
    }
];

// Variables for pagination
let currentPage = 1;
const itemsPerPage = 5;
const totalPages = Math.ceil(ordersData.length / itemsPerPage);

// DOM elements
const ordersTableBody = document.getElementById('ordersTableBody');
const currentPageElement = document.getElementById('currentPage');
const totalPagesElement = document.getElementById('totalPages');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const orderDetailsModal = document.getElementById('orderDetailsModal');
const closeModalButton = document.getElementById('closeModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const orderDetailsContent = document.getElementById('orderDetailsContent');
const updateStatusBtn = document.getElementById('updateStatusBtn');
const orderSearch = document.getElementById('orderSearch');
const statusFilter = document.getElementById('statusFilter');
const dateFilter = document.getElementById('dateFilter');
const exportBtn = document.getElementById('exportBtn');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set total pages
    totalPagesElement.textContent = totalPages;

    // Render orders for the first page
    renderOrders();

    // Add event listeners
    prevPageButton.addEventListener('click', goToPreviousPage);
    nextPageButton.addEventListener('click', goToNextPage);
    closeModalButton.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    updateStatusBtn.addEventListener('click', updateOrderStatus);
    orderSearch.addEventListener('input', filterOrders);
    statusFilter.addEventListener('change', filterOrders);
    dateFilter.addEventListener('change', filterOrders);
    exportBtn.addEventListener('click', exportOrders);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === orderDetailsModal) {
            closeModal();
        }
    });
});

// Render orders based on current page and filters
function renderOrders() {
    // Clear the table
    ordersTableBody.innerHTML = '';

    // Get filtered orders
    const filteredOrders = getFilteredOrders();

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredOrders.length);
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    // Render orders
    paginatedOrders.forEach(order => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${formatItems(order.items)}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${formatDate(order.date)}</td>
            <td><span class="order-status ${order.status}">${capitalizeFirstLetter(order.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" data-id="${order.id}" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" data-id="${order.id}" title="Edit Order">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" data-id="${order.id}" title="Delete Order">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;

        ordersTableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.action-btn.view').forEach(btn => {
        btn.addEventListener('click', () => {
            const orderId = btn.getAttribute('data-id');
            openOrderDetails(orderId);
        });
    });

    document.querySelectorAll('.action-btn.edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const orderId = btn.getAttribute('data-id');
            editOrder(orderId);
        });
    });

    document.querySelectorAll('.action-btn.delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const orderId = btn.getAttribute('data-id');
            deleteOrder(orderId);
        });
    });

    // Update pagination buttons
    updatePaginationButtons();
}

// Get filtered orders based on search and filters
function getFilteredOrders() {
    const searchTerm = orderSearch.value.toLowerCase();
    const statusValue = statusFilter.value;
    const dateValue = dateFilter.value;

    return ordersData.filter(order => {
        // Search filter
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm) ||
            order.customer.toLowerCase().includes(searchTerm) ||
            order.items.some(item => item.name.toLowerCase().includes(searchTerm));

        // Status filter
        const matchesStatus = statusValue === 'all' || order.status === statusValue;

        // Date filter
        const orderDate = new Date(order.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());

        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

        let matchesDate = true;

        if (dateValue === 'today') {
            matchesDate = orderDate >= today;
        } else if (dateValue === 'yesterday') {
            matchesDate = orderDate >= yesterday && orderDate < today;
        } else if (dateValue === 'week') {
            matchesDate = orderDate >= weekStart;
        } else if (dateValue === 'month') {
            matchesDate = orderDate >= monthStart;
        }

        return matchesSearch && matchesStatus && matchesDate;
    });
}

// Update pagination buttons based on current page
function updatePaginationButtons() {
    const filteredOrders = getFilteredOrders();
    const totalFilteredPages = Math.ceil(filteredOrders.length / itemsPerPage);

    currentPageElement.textContent = currentPage;
    totalPagesElement.textContent = totalFilteredPages;

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalFilteredPages || totalFilteredPages === 0;
}

// Go to previous page
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderOrders();
    }
}

// Go to next page
function goToNextPage() {
    const filteredOrders = getFilteredOrders();
    const totalFilteredPages = Math.ceil(filteredOrders.length / itemsPerPage);

    if (currentPage < totalFilteredPages) {
        currentPage++;
        renderOrders();
    }
}

// Open order details modal
function openOrderDetails(orderId) {
    const order = ordersData.find(order => order.id === orderId);

    if (order) {
        // Populate modal content
        orderDetailsContent.innerHTML = `
            <div class="order-details-section">
                <h3>Order Information</h3>
                <div class="order-info-grid">
                    <div class="order-info-item">
                        <span class="order-info-label">Order ID:</span> ${order.id}
                    </div>
                    <div class="order-info-item">
                        <span class="order-info-label">Date:</span> ${formatDate(order.date)}
                    </div>
                    <div class="order-info-item">
                        <span class="order-info-label">Status:</span> 
                        <span class="order-status ${order.status}">${capitalizeFirstLetter(order.status)}</span>
                    </div>
                    <div class="order-info-item">
                        <span class="order-info-label">Payment Method:</span> ${order.payment}
                    </div>
                </div>
            </div>
            
            <div class="order-details-section">
                <h3>Customer Information</h3>
                <div class="order-info-grid">
                    <div class="order-info-item">
                        <span class="order-info-label">Name:</span> ${order.customer}
                    </div>
                    <div class="order-info-item">
                        <span class="order-info-label">Email:</span> ${order.email}
                    </div>
                    <div class="order-info-item">
                        <span class="order-info-label">Phone:</span> ${order.phone}
                    </div>
                    <div class="order-info-item">
                        <span class="order-info-label">Address:</span> ${order.address}
                    </div>
                </div>
            </div>
            
            <div class="order-details-section">
                <h3>Order Items</h3>
                <table class="order-items-list">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>$${item.price.toFixed(2)}</td>
                                <td>$${(item.quantity * item.price).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <div class="order-total">
                    <div class="order-total-row">
                        <div class="order-total-label">Subtotal:</div>
                        <div class="order-total-value">$${calculateSubtotal(order.items).toFixed(2)}</div>
                    </div>
                    <div class="order-total-row">
                        <div class="order-total-label">Tax (8%):</div>
                        <div class="order-total-value">$${(calculateSubtotal(order.items) * 0.08).toFixed(2)}</div>
                    </div>
                    <div class="order-total-row">
                        <div class="order-total-label">Delivery Fee:</div>
                        <div class="order-total-value">$2.99</div>
                    </div>
                    <div class="order-total-row">
                        <div class="order-total-label">Grand Total:</div>
                        <div class="order-total-value order-grand-total">$${order.total.toFixed(2)}</div>
                    </div>
                </div>
            </div>
            
            <div class="status-update-section">
                <h3>Update Order Status</h3>
                <div class="status-options">
                    <div class="status-option ${order.status === 'pending' ? 'selected' : ''}" data-status="pending">
                        <i class="fas fa-clock"></i>
                        <span>Pending</span>
                    </div>
                    <div class="status-option ${order.status === 'preparing' ? 'selected' : ''}" data-status="preparing">
                        <i class="fas fa-fire"></i>
                        <span>Preparing</span>
                    </div>
                    <div class="status-option ${order.status === 'completed' ? 'selected' : ''}" data-status="completed">
                        <i class="fas fa-check-circle"></i>
                        <span>Completed</span>
                    </div>
                    <div class="status-option ${order.status === 'cancelled' ? 'selected' : ''}" data-status="cancelled">
                        <i class="fas fa-times-circle"></i>
                        <span>Cancelled</span>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners to status options
        document.querySelectorAll('.status-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.status-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                option.classList.add('selected');
            });
        });

        // Store the order ID in the update button
        updateStatusBtn.setAttribute('data-id', orderId);

        // Show the modal
        orderDetailsModal.style.display = 'block';
    }
}

// Close the modal
function closeModal() {
    orderDetailsModal.style.display = 'none';
}

// Update order status
function updateOrderStatus() {
    const orderId = updateStatusBtn.getAttribute('data-id');
    const selectedStatus = document.querySelector('.status-option.selected').getAttribute('data-status');

    // Find the order and update its status
    const orderIndex = ordersData.findIndex(order => order.id === orderId);

    if (orderIndex !== -1) {
        ordersData[orderIndex].status = selectedStatus;

        // Close the modal and re-render orders
        closeModal();
        renderOrders();

        // Show success message
        showNotification(`Order ${orderId} status updated to ${capitalizeFirstLetter(selectedStatus)}`);
    }
}

// Edit order
function editOrder(orderId) {
    // In a real application, this would open an edit form
    showNotification(`Edit order ${orderId} (Not implemented in this demo)`);
}

// Delete order
function deleteOrder(orderId) {
    if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
        // Find the order index
        const orderIndex = ordersData.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            // Remove the order
            ordersData.splice(orderIndex, 1);

            // Re-render orders
            renderOrders();

            // Show success message
            showNotification(`Order ${orderId} has been deleted`);
        }
    }
}

// Export orders
function exportOrders() {
    // In a real application, this would generate a CSV or PDF
    showNotification('Orders exported successfully (Not implemented in this demo)');
}

// Filter orders based on search and filters
function filterOrders() {
    // Reset to first page when filters change
    currentPage = 1;
    renderOrders();
}

// Helper function to format items for display
function formatItems(items) {
    if (items.length === 0) return 'No items';

    if (items.length === 1) {
        return `${items[0].quantity}x ${items[0].name}`;
    }

    return `${items[0].quantity}x ${items[0].name}, ${items.length - 1} more item(s)`;
}

// Helper function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to calculate subtotal
function calculateSubtotal(items) {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
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

// Add notification styles
const style = document.createElement('style');
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
`;
document.head.appendChild(style);