document.addEventListener('DOMContentLoaded', () => {
  // Session check
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
  });

  const toggleTheme = document.getElementById('toggleTheme');
  if (toggleTheme) {
    toggleTheme.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }
});
