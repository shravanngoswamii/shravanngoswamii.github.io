// Theme Change Feature
// Function to toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');

    // Update favicon based on the theme
    const favicon = document.getElementById('favicon');
    if (body.classList.contains('light-theme')) {
        favicon.href = '../assets/LightModeAssets/favicon-light.png';
    } else {
        favicon.href = '../assets/DarkModeAssets/favicon-dark.png';
    }

    // Store theme preference in localStorage
    const isLightTheme = body.classList.contains('light-theme');
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
}

// Function to load theme preference from localStorage
function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    }
    // Ensure favicon matches the loaded theme
    updateFavicon(theme);
}

// Function to update the favicon based on the theme
function updateFavicon(theme) {
    const favicon = document.getElementById('favicon');
    if (theme === 'light') {
        favicon.href = '../assets/LightModeAssets/favicon-light.png';
    } else {
        favicon.href = '../assets/DarkModeAssets/favicon-dark.png';
    }
}

// Event listener for theme button click
document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.querySelector('.theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Load theme preference when the page is loaded
    loadTheme();
});



// Search Box Working
function search() {
    // Get the input value
    var searchText = document.getElementById("searchInput").value.toLowerCase();

    // Get all the home cards
    var homeCards = document.querySelectorAll(".home-card");

    // Loop through each home card  
    homeCards.forEach(function (card) {
        // Get the text content of the card
        var cardText = card.textContent.toLowerCase();

        // If the card text contains the search text, display the card, otherwise hide it
        if (cardText.includes(searchText)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

// Add an event listener to the search input field
document.getElementById("searchInput").addEventListener("input", search);