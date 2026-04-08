document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  const subjectsContainer = document.getElementById('subjectsContainer');
  const addSubjectBtn = document.getElementById('addSubjectBtn');
  const resultForm = document.getElementById('resultForm');
  const sgpaResult = document.getElementById('sgpaResult');

  let subjectCount = 0;
  let subjects = [];

  function addSubjectField() {
    subjectCount++;
    const div = document.createElement('div');
    div.className = 'flex space-x-2';
    div.innerHTML = `
      <input type="text" placeholder="Subject Name" class="flex-1 px-2 py-1 border rounded" required />
      <input type="number" placeholder="Marks" min="0" max="100" class="w-24 px-2 py-1 border rounded" required />
      <button type="button" class="removeSubjectBtn text-red-500"><i class="fas fa-times"></i></button>
    `;
    subjectsContainer.appendChild(div);
    div.querySelector('.removeSubjectBtn').onclick = () => {
      div.remove();
      subjectCount--;
      calculateSGPA();
    };
    div.querySelectorAll('input')[1].addEventListener('input', calculateSGPA);
  }

  addSubjectBtn.addEventListener('click', addSubjectField);

  function calculateSGPA() {
    const subjectDivs = subjectsContainer.querySelectorAll('div');
    let total = 0, fail = false;
    let count = 0;
    subjectDivs.forEach(div => {
      const marks = parseInt(div.querySelectorAll('input')[1].value);
      if (!isNaN(marks)) {
        total += marks;
        count++;
        if (marks < 33) fail = true;
      }
    });
    if (count > 0) {
      const sgpa = (total / (count * 10)).toFixed(2);
      sgpaResult.textContent = fail ? `SGPA: ${sgpa} (Fail)` : `SGPA: ${sgpa}`;
      return sgpa;
    } else {
      sgpaResult.textContent = '';
      return null;
    }
  }

  resultForm.addEventListener('input', calculateSGPA);

  resultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const semester = document.getElementById('semester').value;
    const subjectDivs = subjectsContainer.querySelectorAll('div');
    if (subjectDivs.length === 0) {
      alert('Add at least one subject.');
      return;
    }
    let marksArr = [];
    let fail = false;
    subjectDivs.forEach(div => {
      const name = div.querySelectorAll('input')[0].value.trim();
      const marks = parseInt(div.querySelectorAll('input')[1].value);
      if (marks < 33) fail = true;
      marksArr.push({ name, marks, status: marks < 33 ? 'Fail' : 'Pass' });
    });
    const sgpa = calculateSGPA();
    // Store in localStorage
    let results = JSON.parse(localStorage.getItem('results') || '{}');
    results[`Semester ${semester}`] = { subjects: marksArr, sgpa, fail };
    localStorage.setItem('results', JSON.stringify(results));
    sgpaResult.textContent = fail ? `SGPA: ${sgpa} (Fail)` : `SGPA: ${sgpa} (Saved!)`;
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
