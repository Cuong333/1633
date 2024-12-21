document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      document.getElementById('nav-item-login').style.display = 'none';
      document.getElementById('nav-item-logout').style.display = 'inline';
      document.getElementById('nav-item-logout').addEventListener('click', handleLogout);
    } else {
      document.getElementById('nav-item-login').style.display = 'inline';
      document.getElementById('nav-item-logout').style.display = 'none';
    }
  });
  
  function handleLogout() {
    localStorage.removeItem('user');
    alert('You have logged out.');
    window.location.href = 'login.html';
  }
  