// 1. Wczytanie biblioteki express
const express = require('express');

// 2. Tworzymy aplikację
const app = express();

// 3. Port – domyślnie 5000 albo z Render
const PORT = process.env.PORT || 5000;

// 4. Parsujemy dane JSON z żądań POST
app.use(express.json());

// 5. Prosty endpoint POST do odbierania wiadomości
app.post('/message', (req, res) => {
  const { toUser, message } = req.body;

  // 👇 Tu można dodać zapis do pliku, bazy, GitHub itd.
  console.log(`📨 Nowa wiadomość do: ${toUser}, treść: ${message}`);

  // 6. Odpowiedź
  res.status(200).json({ status: 'sent', toUser, message });
});

// 7. Start serwera
app.listen(PORT, () => console.log(`🚀 API działa na porcie ${PORT}`));