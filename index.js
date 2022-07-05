// Configuração inicial 
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Forma de ler JSON
app.use(
   express.urlencoded({
      extended: true,
   })
);
app.use(express.json());

// Rotas da API
const bookRoutes = require('./routes/bookRoutes');

app.use('/books', bookRoutes);

// Entregar uma porta
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
   .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fkxcihc.mongodb.net/?retryWrites=true&w=majority`)
   .then(() => {
      console.log("Ligado na porta 3000");
      app.listen(3000);
   })
   .catch((err) => console.log(err))