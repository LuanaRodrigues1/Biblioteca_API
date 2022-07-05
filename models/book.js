const mongoose = require('mongoose');

// Criar uma tabela no banco de dados
const book = mongoose.model('book', {
   bookname: String,
   autor: String
})

module.exports = book;