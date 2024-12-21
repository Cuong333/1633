const users = [
  { id: 1, email: 'user_1@test.com', password: 'password' },
  { id: 2, email: 'user_2@test.com', password: 'password' },
  { id: 3, email: 'khoa@test.com', password: 'password' }
];

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('frm-login');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      // Find user by email and password
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Store the user in local storage
        localStorage.setItem('loggedInUser', JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name
        }));
        
        // Redirect to home page
        window.location.href = '../index.html';
      } else {
        // Show error message
        const errorElement = document.getElementById('frm-login-error');
        if (errorElement) {
          errorElement.textContent = 'Invalid email or password.';
        }
      }
    });
  }
});

// Logout function
function logout() {
  localStorage.removeItem('loggedInUser');
  alert('Logged out successfully.');
  window.location.href = 'login.html';
}

// Check login status (can be used across pages)
function checkLoginStatus() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const loginNav = document.getElementById('nav-item-login');
  const logoutNav = document.getElementById('nav-item-logout');
  const userWelcome = document.getElementById('user-welcome');
  const usernameDisplay = document.getElementById('username');
  const profileLink = document.getElementById('profile-link');

  if (loggedInUser) {
    if (userWelcome) userWelcome.classList.remove('d-none');
    if (usernameDisplay) usernameDisplay.textContent = loggedInUser.email;
    if (loginNav) loginNav.classList.add('d-none');
    if (logoutNav) logoutNav.classList.remove('d-none');
    if (profileLink) profileLink.classList.remove('d-none');
  } else {
    if (userWelcome) userWelcome.classList.add('d-none');
    if (loginNav) loginNav.classList.remove('d-none');
    if (logoutNav) logoutNav.classList.add('d-none');
    if (profileLink) profileLink.classList.add('d-none');
  }
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);
window.logout = logout;