// Initialize charts when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Set up date range filter
    const dateRangeSelect = document.getElementById("dateRange");
    const customDateRange = document.getElementById("customDateRange");
    const applyFilterBtn = document.getElementById("applyFilter");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");

    // Set default dates for custom range (last 7 days)
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    startDateInput.valueAsDate = lastWeek;
    endDateInput.valueAsDate = today;

    // Toggle custom date range visibility
    dateRangeSelect.addEventListener("change", () => {
        if (dateRangeSelect.value === "custom") {
            customDateRange.classList.add("active");
        } else {
            customDateRange.classList.remove("active");
        }
    });

    // Apply filter button
    applyFilterBtn.addEventListener("click", () => {
        // In a real app, this would fetch new data based on the selected date range
        // For this demo, we'll just refresh the charts with random data
        initCharts();
    });

    // Period selector for top items
    const periodBtns = document.querySelectorAll(".period-btn");
    periodBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            periodBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            // In a real app, this would update the table data
        });
    });

    // Initialize charts
    initCharts();

    // Add animations to analytics elements
    animateAnalytics();
});

// Initialize all charts
function initCharts() {
    initRevenueChart();
    initCategoriesChart();
    initOrderStatusChart();
}

// Revenue & Orders Chart
function initRevenueChart() {
    const ctx = document.getElementById("revenueChart").getContext("2d");

    // Sample data
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const revenueData = [1200, 1900, 1500, 2000, 2400, 3000, 2500];
    const ordersData = [80, 120, 105, 130, 150, 180, 160];

    // Destroy existing chart if it exists
    if (window.revenueChart) {
        window.revenueChart.destroy();
    }

    // Create new chart
    window.revenueChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Revenue (₹)",
                    data: revenueData,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue("--primary-color").trim(),
                    backgroundColor: "rgba(255, 77, 77, 0.1)",
                    tension: 0.4,
                    fill: true,
                    yAxisID: "y"
                },
                {
                    label: "Orders",
                    data: ordersData,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue("--accent-color").trim(),
                    backgroundColor: "rgba(83, 82, 237, 0.1)",
                    tension: 0.4,
                    fill: true,
                    yAxisID: "y1"
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false
            },
            scales: {
                y: {
                    type: "linear",
                    display: true,
                    position: "left",
                    title: {
                        display: true,
                        text: "Revenue (₹)"
                    }
                },
                y1: {
                    type: "linear",
                    display: true,
                    position: "right",
                    grid: {
                        drawOnChartArea: false
                    },
                    title: {
                        display: true,
                        text: "Orders"
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: "index",
                    intersect: false
                }
            }
        }
    });
}

// Categories Chart
function initCategoriesChart() {
    const ctx = document.getElementById("categoriesChart").getContext("2d");

    // Sample data
    const data = {
        labels: ["Burgers", "Pizza", "Sides", "Drinks", "Desserts"],
        datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
                "#FF4D4D", // Primary color
                "#5352ED", // Accent color
                "#FF6B6B",
                "#48DBFB",
                "#1DD1A1"
            ],
            borderWidth: 0
        }]
    };

    // Destroy existing chart if it exists
    if (window.categoriesChart) {
        window.categoriesChart.destroy();
    }

    // Create new chart
    window.categoriesChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right"
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || "";
                            const value = context.raw || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            },
            cutout: "60%"
        }
    });
}

// Order Status Chart
function initOrderStatusChart() {
    const ctx = document.getElementById("orderStatusChart").getContext("2d");

    // Sample data
    const data = {
        labels: ["Completed", "Preparing", "Pending", "Cancelled"],
        datasets: [{
            data: [65, 20, 10, 5],
            backgroundColor: [
                "#1DD1A1", // Success color
                "#5352ED", // Accent color
                "#FFA502", // Warning color
                "#FF4D4D"  // Danger color
            ],
            borderWidth: 0
        }]
    };

    // Destroy existing chart if it exists
    if (window.orderStatusChart) {
        window.orderStatusChart.destroy();
    }

    // Create new chart
    window.orderStatusChart = new Chart(ctx, {
        type: "pie",
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right"
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || "";
                            const value = context.raw || 0;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });
}

// Add animations to analytics elements
function animateAnalytics() {
    const elements = document.querySelectorAll(".stat-card, .chart-container, .insight-card, .items-table");

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