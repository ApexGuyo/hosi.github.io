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
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const diagnosis = document.getElementById('diagnosis').value;

  fetch('http://localhost:3000/api/patients/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, diagnosis })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('status').innerText = data.message;
    })
    .catch(err => {
      document.getElementById('status').innerText = 'Error sending SMS';
    });
}
