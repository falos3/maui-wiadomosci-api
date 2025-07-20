const express = require('express');
const app = express();
const fs = require('fs');
const { Octokit } = require("@octokit/rest"); // GitHub API
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Przykład: zapisanie wiadomości do XML
app.post('/send', async (req, res) => {
  const { od, doUser, tresc } = req.body;

  const wiadomosc = {
    Od: od,
    Do: doUser,
    Tresc: tresc,
    Data: new Date().toISOString()
  };

  // TODO: pobierz istniejące wiadomości z GitHuba (plik XML), dodaj nową, zapisz z powrotem

  res.status(200).json({ status: 'OK', wiadomosc });
});
