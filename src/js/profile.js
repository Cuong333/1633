document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const profileForm = document.getElementById('profile-form');
  
    // Redirect if not logged in
    if (!loggedInUser) {
      window.location.href = 'login.html';
      return;
    }
  
    // Populate profile data
    function populateProfileData() {
      const userData = JSON.parse(localStorage.getItem('userData')) || {};
      
      document.getElementById('profile-name').textContent = userData.firstName || loggedInUser.name || 'User';
      document.getElementById('profile-email').textContent = loggedInUser.email;
      
      document.getElementById('first-name').value = userData.firstName || '';
      document.getElementById('last-name').value = userData.lastName || '';
      document.getElementById('mobile').value = userData.mobile || '';
      document.getElementById('address').value = userData.address || '';
      document.getElementById('email').value = loggedInUser.email;
    }
  
    // Save profile data
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const userData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        mobile: document.getElementById('mobile').value,
        address: document.getElementById('address').value,
        email: loggedInUser.email
      };
  
      // Save user data to localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
  
      // Update profile name display
      document.getElementById('profile-name').textContent = 
        `${userData.firstName} ${userData.lastName}`.trim();
  
      alert('Profile updated successfully!');
    });
  
    // Initial population of profile data
    populateProfileData();
  });
  
  // Logout function (can be moved to login.js for global use)
  function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userData');
    alert('Logged out successfully.');
    window.location.href = 'login.html';
  }