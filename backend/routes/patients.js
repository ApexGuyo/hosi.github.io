const express = require('express');
const router = express.Router();
const db = require('../db');
const africastalking = require('africastalking')({
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
});
const sms = africastalking.SMS;

router.post('/add', (req, res) => {
  const { name, phone, diagnosis } = req.body;

  // Save to DB
  const query = 'INSERT INTO patients (name, phone, diagnosis) VALUES (?, ?, ?)';
  db.query(query, [name, phone, diagnosis], async (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // Send SMS
    const message = `Patient ${name}, diagnosis: ${diagnosis}`;
    try {
      await sms.send({ to: [`+${phone}`], message });
      res.json({ message: 'Patient saved and SMS sent.' });
    } catch (smsError) {
      console.error(smsError);
      res.status(500).json({ error: 'Saved, but SMS failed.' });
    }
  });
});

module.exports = router;
