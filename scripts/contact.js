import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0GCbTCQU6IJPMxaX5yDqUDSr0LmNIFVM",
    authDomain: "portfolio-shravangoswami.firebaseapp.com",
    projectId: "portfolio-shravangoswami",
    storageBucket: "portfolio-shravangoswami.appspot.com",
    messagingSenderId: "113450623117",
    appId: "1:113450623117:web:130bb39643c4dc7883c2c4",
    measurementId: "G-200C37QZ88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add event listener for form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var message = getInputVal('message');

    // Add the form data to Firestore
    addDoc(collection(db, "messages"), {
        name: name,
        email: email,
        message: message,
        timestamp: new Date()
    })
        .then(() => {
            console.log("Document successfully written to Firestore!");
            // Clear the form after successful submission
            alert("Message sent successfully!");
            document.getElementById('contactForm').reset();
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
});

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}