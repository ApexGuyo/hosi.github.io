function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' && password === 'admin123') {
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid login');
  }
}

function addPatient() {
  const data = {
    name: document.getElementById('name').value,
    age: document.getElementById('age').value,
    gender: document.getElementById('gender').value,
    history: document.getElementById('history').value,
    investigations: document.getElementById('investigations').value,
    diagnosis: document.getElementById('diagnosis').value,
    treatment: document.getElementById('treatment').value,
    instructions: document.getElementById('instructions').value,
    phone: document.getElementById('phone').value
  };

  fetch('http://localhost:3000/api/patients/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('status').innerText = data.message;
      loadRecords();
    })
    .catch(() => {
      document.getElementById('status').innerText = 'Error sending SMS';
    });
}

function loadRecords() {
  fetch('http://localhost:3000/api/patients/all')
    .then(res => res.json())
    .then(data => {
      window.allPatients = data;
      renderRecords(data);
    });
}

function renderRecords(data) {
  const container = document.getElementById('records');
  container.innerHTML = data.map(p => `
    <div class="record-card">
      <strong>${p.name} (${p.age}, ${p.gender})</strong><br/>
      Phone: ${p.phone}<br/>
      Diagnosis: ${p.diagnosis}<br/>
      <small>${new Date(p.created_at).toLocaleString()}</small>
    </div>
  `).join('');
}

function filterRecords() {
  const q = document.getElementById('search').value.toLowerCase();
  const filtered = window.allPatients.filter(p =>
    p.name.toLowerCase().includes(q) || p.phone.includes(q)
  );
  renderRecords(filtered);
}

function printSummary() {
  window.print();
}

function downloadPDF() {
  const doc = new window.jspdf.jsPDF();
  const text = document.querySelector('.glass-card').innerText;
  doc.text(text, 10, 10);
  doc.save('patient_summary.pdf');
}

window.onload = loadRecords;
