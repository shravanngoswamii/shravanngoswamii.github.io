const emailLink = document.getElementById('emailLink');
const emailPopup = document.getElementById('emailPopup');
const closeBtn = document.querySelector('.close-btn');
const copyEmailBtn = document.getElementById('copyEmailBtn');
const openMailBtn = document.getElementById('openMailBtn');
const emailAddress = document.getElementById('emailAddress');

// Set your email address here
const myEmail = 'shravanngoswamii@gmail.com';
emailAddress.textContent = myEmail;

emailLink.addEventListener('click', () => {
  emailPopup.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  emailPopup.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === emailPopup) {
    emailPopup.style.display = 'none';
  }
});

copyEmailBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(myEmail)
    .then(() => {
      alert('Email copied to clipboard!');
    })
    .catch((err) => {
      console.error('Failed to copy email: ', err);
    });
});

openMailBtn.addEventListener('click', () => {
  window.location.href = `mailto:${myEmail}`;
});