document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  const cgpaForm = document.getElementById('cgpaForm');
  const cgpaInput = document.getElementById('cgpaInput');
  const percentageResult = document.getElementById('percentageResult');

  cgpaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cgpa = parseFloat(cgpaInput.value);
    if (!isNaN(cgpa)) {
      const percentage = (cgpa * 9.5).toFixed(2);
      percentageResult.textContent = `Percentage: ${percentage}%`;
    } else {
      percentageResult.textContent = '';
    }
  });

  // Theme 
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
