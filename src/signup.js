document.addEventListener('DOMContentLoaded', function () {
  const signupForm = document.getElementById('signupForm');
  const signupError = document.getElementById('signupError');

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if username exists
    if (users.some(u => u.username === username)) {
      signupError.classList.remove('hidden');
      return;
    }
    // Add new user
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    signupError.classList.add('hidden');
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
  });
});
