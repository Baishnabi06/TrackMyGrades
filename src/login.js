document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const toggleTheme = document.getElementById('toggleTheme');

  const DEMO_USER = { username: 'student', password: 'password123' };

  if (toggleTheme) {
    toggleTheme.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'dashboard.html';
      return;
    }
    // Check against registered users in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'dashboard.html';
    } else {
      loginError.classList.remove('hidden');
    }
  });
});
