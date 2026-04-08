document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  const sgpaInputs = document.getElementById('sgpaInputs');
  const addSgpaBtn = document.getElementById('addSgpaBtn');
  const sgpaForm = document.getElementById('sgpaForm');
  const cgpaResult = document.getElementById('cgpaResult');

  function addSgpaField() {
    const div = document.createElement('div');
    div.className = 'flex space-x-2';
    div.innerHTML = `
      <input type="number" placeholder="SGPA" min="0" max="10" step="0.01" class="flex-1 px-2 py-1 border rounded" required />
      <button type="button" class="removeSgpaBtn text-red-500"><i class="fas fa-times"></i></button>
    `;
    sgpaInputs.appendChild(div);
    div.querySelector('.removeSgpaBtn').onclick = () => div.remove();
  }

  addSgpaBtn.addEventListener('click', addSgpaField);
  addSgpaField();

  sgpaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const sgpaFields = sgpaInputs.querySelectorAll('input');
    let total = 0, count = 0;
    sgpaFields.forEach(input => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) {
        total += val;
        count++;
      }
    });
    if (count > 0) {
      const cgpa = (total / count).toFixed(2);
      cgpaResult.textContent = `CGPA: ${cgpa}`;
    } else {
      cgpaResult.textContent = '';
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
