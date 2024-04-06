// Theme Change Feature
// Function to toggle between light and dark themes
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');

    // Update favicon based on the theme
    updateFavicon(body.classList.contains('light-theme') ? 'light' : 'dark');

    // Store theme preference in localStorage
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');

    // Log current theme
    logTheme();
}

// Function to load theme preference from localStorage
function loadTheme() {
    let theme = localStorage.getItem('theme');
    console.log('Stored Theme:', theme);
    // Check if theme preference is stored or not
    if (theme === null) {
        // If no preference is set, use the browser's theme
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Apply the theme based on the stored preference
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }

    // Ensure favicon matches the loaded theme
    updateFavicon(theme);

    // Log current theme
    logTheme();
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

// Function to log the current theme and browser's theme
function logTheme() {
    const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    console.log('Browser Theme:', browserTheme);
    console.log('Current Theme:', document.body.classList.contains('light-theme') ? 'light' : 'dark');
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