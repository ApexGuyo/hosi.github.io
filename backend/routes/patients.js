const express = require('express');
const router = express.Router();
const db = require('../db');
const africastalking = require('africastalking')({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});
const sms = africastalking.SMS;

router.post('/add', async (req, res) => {
  const {
    name, age, gender, history,
    investigations, diagnosis, treatment,
    instructions, phone
  } = req.body;

  const insertQuery = `
    INSERT INTO patients (name, age, gender, history, investigations, diagnosis, treatment, instructions, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [name, age, gender, history, investigations, diagnosis, treatment, instructions, phone];

  db.query(insertQuery, values, async (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    const smsMessage = `
Hello ${name}, your visit summary:
Diagnosis: ${diagnosis}
Treatment: ${treatment}
Instructions: ${instructions}
- Hospital Team
    `.trim();

    try {
      await sms.send({
        to: [`+${phone}`],
        message: smsMessage
      });

      res.json({ message: 'Patient saved & SMS sent.' });
    } catch (smsError) {
      console.error('SMS error:', smsError);
      res.status(500).json({ message: 'Saved, but failed to send SMS.' });
    }
  });
});

module.exports = router;
