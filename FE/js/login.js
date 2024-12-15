const users = [
  { id: 1, email: 'user_1@test.com', password: 'password' },
  { id: 2, email: 'user_2@test.com', password: 'password' },
  { id: 3, email: 'khoa@test.com', password: 'password' }
];

document.getElementById('frm-login').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Find user by email and password
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Store the user in local storage (fixed key)
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Login successful!');

    // Redirect to the home page (ensure path is correct for your setup)
    window.location.href = "/FE/index.html";
  } else {
    // Show error message
    document.getElementById('frm-login-error').innerText = 'Invalid email or password.';
  }
});

// Check if the user is logged in
function checkLoginStatus() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // Fixed key
  const loginNav = document.getElementById('nav-item-login');
  const logoutNav = document.getElementById('nav-item-logout');

  if (loggedInUser) {
    // Hide login link and show logout link
    loginNav.classList.add('d-none');
    logoutNav.classList.remove('d-none');
    document.getElementById('user-welcome').innerText = `Welcome, ${loggedInUser.email}`;
  } else {
    // Show login link and hide logout link
    loginNav.classList.remove('d-none');
    logoutNav.classList.add('d-none');
  }
}

// Logout functionality
function logout() {
  localStorage.removeItem('loggedInUser'); // Fixed key
  alert('Logged out successfully.');
  window.location.href = 'login.html';
}


checkLoginStatus(); // Check login status on page load
