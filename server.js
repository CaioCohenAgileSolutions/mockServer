// server.js
const express = require('express');
const app = express();
const apiRoutes = require('./routes/api'); // Importa o arquivo de rotas
const cors = require('cors'); // Importar o middleware cors

app.use(cors());

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

// Rotas da API
app.use('/api', apiRoutes);

// Define a porta do servidor
const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
