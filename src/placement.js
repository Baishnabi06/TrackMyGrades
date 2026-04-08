document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  const placementForm = document.getElementById('placementForm');
  const cgpaInput = document.getElementById('cgpaInput');
  const backlogInput = document.getElementById('backlogInput');
  const placementResult = document.getElementById('placementResult');
  const progressBar = document.getElementById('progressBar');

  placementForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cgpa = parseFloat(cgpaInput.value);
    const backlog = backlogInput.value;
    let eligible = cgpa >= 8 && backlog === 'no';
    let probability = 0;
    if (eligible) {
      // Probability: 70% at CGPA 8, 95% at CGPA 10
      probability = Math.round(70 + (cgpa - 8) * 12.5);
      if (probability > 95) probability = 95;
      placementResult.textContent = `Eligible! Placement Probability: ${probability}%`;
      progressBar.style.width = probability + '%';
      progressBar.classList.remove('bg-red-500');
      progressBar.classList.add('bg-green-500');
    } else {
      placementResult.textContent = 'Low chances (Not eligible)';
      progressBar.style.width = '20%';
      progressBar.classList.remove('bg-green-500');
      progressBar.classList.add('bg-red-500');
    }
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
