document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
    return;
  }

  const marksheetList = document.getElementById('marksheetList');
  const marksheetDetail = document.getElementById('marksheetDetail');

  function renderList() {
    const results = JSON.parse(localStorage.getItem('results') || '{}');
    marksheetList.innerHTML = '';
    marksheetDetail.innerHTML = '';
    const semesters = Object.keys(results);
    if (semesters.length === 0) {
      marksheetList.innerHTML = '<div class="text-center text-gray-500">No result inserted</div>';
      return;
    }
    semesters.forEach(sem => {
      const btn = document.createElement('button');
      btn.className = 'py-2 px-4 m-2 bg-blue-100 rounded hover:bg-blue-300 transition';
      btn.textContent = sem;
      btn.onclick = () => renderDetail(sem, results[sem]);
      marksheetList.appendChild(btn);
    });
  }

  function renderDetail(sem, data) {
    let html = `<h3 class="text-xl font-bold mb-2">${sem}</h3>`;
    html += '<table class="w-full mb-4"><thead><tr><th>Subject</th><th>Marks</th><th>Status</th></tr></thead><tbody>';
    data.subjects.forEach(sub => {
      html += `<tr><td>${sub.name}</td><td>${sub.marks}</td><td class="${sub.status==='Fail'?'text-red-500':'text-green-600'}">${sub.status}</td></tr>`;
    });
    html += '</tbody></table>';
    html += `<div class="font-semibold">SGPA: ${data.sgpa} ${data.fail ? '(Fail)' : ''}</div>`;
    marksheetDetail.innerHTML = html;
  }

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

  renderList();
});
