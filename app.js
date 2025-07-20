const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Upewnij się, że plik istnieje
if (!fs.existsSync(MESSAGES_FILE)) {
  fs.writeFileSync(MESSAGES_FILE, '[]');
}

// ZAPISZ wiadomość
app.post('/send', (req, res) => {
  const { od, doUser, tresc } = req.body;
  const nowa = { od, doUser, tresc, czas: new Date().toISOString() };

  const dane = JSON.parse(fs.readFileSync(MESSAGES_FILE));
  dane.push(nowa);
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(dane, null, 2));

  res.status(200).json({ status: 'sent' });
});

// ODCZYTAJ wiadomości dla użytkownika
app.get('/messages/:user', (req, res) => {
  const user = req.params.user;
  const dane = JSON.parse(fs.readFileSync(MESSAGES_FILE));
  const dlaUsera = dane.filter(msg => msg.doUser === user);
  res.json(dlaUsera);
});

app.listen(PORT, () => console.log(`API działa na porcie ${PORT}`));
