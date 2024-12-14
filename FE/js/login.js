const users = [
    { id: 1, email: 'user_1@test.com', password: 'password' },
    { id: 2, email: 'user_2@test.com', password: 'password' }
  ];
  
  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const user = users.find(u => u.email === email && u.password === password);
  
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login successful!');
      window.location.href = 'index.html';
    } else {
      alert('Invalid email or password.');
    }
  });
  
  // Check if the user is logged in
  function checkLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const loginNav = document.getElementById('login-nav');
    const logoutNav = document.getElementById('logout-nav');
  
    if (loggedInUser) {
      loginNav.style.display = 'none';
      logoutNav.style.display = 'block';
      document.getElementById('user-welcome').innerText = `Welcome, ${loggedInUser.email}`;
    } else {
      loginNav.style.display = 'block';
      logoutNav.style.display = 'none';
    }
  }
  
  // Logout functionality
  function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully.');
    window.location.href = 'login.html';
  }
  
  checkLoginStatus(); // Check login status on page load
  