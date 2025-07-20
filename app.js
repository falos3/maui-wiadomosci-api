const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Główna trasa do odbierania wiadomości
app.post('/message', (req, res) => {
  const { od, doUser, tresc } = req.body;

  if (!od || !doUser || !tresc) {
    return res.status(400).json({ error: 'Brakuje danych (od, doUser lub tresc)' });
  }

  console.log(`📩 Wiadomość od: ${od} do: ${doUser}`);
  console.log(`✉️ Treść: ${tresc}`);

  // Tu można np. zapisać do pliku, Firebase, GitHub XML itd.
  res.status(200).json({ status: 'sent', od, doUser, tresc });
});

// Start serwera
app.listen(PORT, () => {
  console.log(`✅ API działa na porcie ${PORT}`);
});
