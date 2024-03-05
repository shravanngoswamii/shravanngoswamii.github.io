// // document.addEventListener("DOMContentLoaded", function() {
// //     // Load JSON data
// //     fetch('scripts/search.json')
// //         .then(response => response.json())
// //         .then(data => {
// //             const searchData = data;

// //             // Search function
// //             function search(query) {
// //                 return searchData.filter(item => {
// //                     return (
// //                         item.title.toLowerCase().includes(query.toLowerCase()) ||
// //                         item.description.toLowerCase().includes(query.toLowerCase())
// //                     );
// //                 });
// //             }

// //             // Display search results
// //             function displaySearchResults(results) {
// //                 const container = document.getElementById('searchResults');
// //                 container.innerHTML = '';
// //                 results.forEach(result => {
// //                     const element = document.createElement('div');
// //                     element.innerHTML = `<a href="${result.url}">${result.title}</a><p>${result.description}</p>`;
// //                     container.appendChild(element);
// //                 });
// //             }

// //             // Trigger search
// //             const searchInput = document.getElementById('searchInput');
// //             searchInput.addEventListener('input', () => {
// //                 const query = searchInput.value;
// //                 const results = search(query);
// //                 displaySearchResults(results);
// //             });
// //         });
// // });

// document.addEventListener("DOMContentLoaded", function() {
//     // Function to filter elements based on search query
//     function filterElements(query) {
//         const elements = document.querySelectorAll('.searchable'); // Assuming elements to be searched have class 'searchable'
//         const results = [];

//         elements.forEach(element => {
//             const textContent = element.textContent.toLowerCase();
//             if (textContent.includes(query.toLowerCase())) {
//                 results.push(element);
//             }
//         });

//         return results;
//     }

//     // Function to display search results
//     function displaySearchResults(results) {
//         const container = document.getElementById('searchResults');
//         container.innerHTML = '';

//         results.forEach(result => {
//             const clone = result.cloneNode(true);
//             container.appendChild(clone);
//         });
//     }

//     // Trigger search
//     const searchInput = document.getElementById('searchInput');
//     searchInput.addEventListener('input', () => {
//         const query = searchInput.value.trim();

//         if (query.length > 0) {
//             const results = filterElements(query);
//             displaySearchResults(results);
//         } else {
//             const container = document.getElementById('searchResults');
//             container.innerHTML = '';
//         }
//     });
// });

