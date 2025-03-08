// script.js

// Function to display a greeting message based on the time of day
function displayGreeting() {
    const greetingMessage = document.getElementById('greetingMessage');
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning!";
    } else if (currentHour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    greetingMessage.innerText = greeting;
    greetingMessage.style.fontSize = "1.5rem";
    greetingMessage.style.textAlign = "center";
    greetingMessage.style.margin = "20px 0";
}

// Function to handle the exit button click
document.getElementById('exitButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default action of the link
    const confirmation = confirm("Are you sure you want to exit?");
    if (confirmation) {
        // Redirect to the login page or perform any exit action
        window.location.href = "index.html"; // Change this to your desired action
    }
});

// Function to toggle the navigation menu
document.getElementById('menuToggle').addEventListener('click', function () {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
});

// Call the greeting function on page load
displayGreeting();