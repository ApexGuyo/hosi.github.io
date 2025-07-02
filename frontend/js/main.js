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
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const history = document.getElementById('history').value;
  const investigations = document.getElementById('investigations').value;
  const diagnosis = document.getElementById('diagnosis').value;
  const treatment = document.getElementById('treatment').value;
  const instructions = document.getElementById('instructions').value;
  const phone = document.getElementById('phone').value;

  const payload = {
    name, age, gender, history,
    investigations, diagnosis, treatment,
    instructions, phone
  };

  fetch('http://localhost:3000/api/patients/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('status').innerText = data.message;
    })
    .catch(err => {
      document.getElementById('status').innerText = 'Error sending SMS';
    });
}
