const router = require('express').Router();
const book = require('../models/book');

// Buscar todos os livros
router.get('/', async (req, res) => { 
   try{
      const books = await book.find();

      res.status(200).json(books);

   } catch (error) {
      res.status(500).json({ erro: error });
   }
});

// Buscar um livro específico
router.get('/:id', async (req, res) => {
   const id = req.params.id;

   try{
      const book_id = await book.findOne({ _id: id });
 
      if (!book_id) {
         res.status(422).json({ message: 'O livro não foi encontrado!'});
         return;
      };

      res.status(200).json(book_id);

   } catch(error) {
      res.status(500).json({ erro: error });
   }
})

// Criar um livro
router.post('/', async (req, res) => {
   const { bookname, autor } = req.body;
 
   const bookdatabase = {
     bookname, 
     autor
   }  
 
   if (!bookname) {
      res.status(422).json({error: 'O nome deve ser informado!'});
      return;
   }

   try {
     await book.create(bookdatabase);
 
     res.status(201).json({ message: 'Livro inserido no sistema com sucesso!' });
   } catch (error) {
     res.status(500).json({ erro: error });
   }
});


// Alterar um determinado livro
router.patch('/:id', async (req, res) => {
   const id = req.params.id;

   const { bookname, autor } = req.body;
 
   const bookdatabase = {
     bookname, 
     autor
   }  

   try {
      const updatedBook = await book.updateOne({ _id: id }, bookdatabase);

      if (updatedBook.matchedCount === 0) {
         res.status(422).json({ message: 'O livro não foi encontrado!'});
         return;
      }
      
      res.status(200).json(bookdatabase);

   } catch (error) {
     res.status(500).json({ erro: error });
   }
});

// Remover um livro
router.delete('/:id', async (req, res) => {
   const id = req.params.id;

   const book_id = await book.findOne({ _id: id });
 
   if (!book_id) {
      res.status(422).json({ message: 'O livro não foi encontrado!'});
      return;
   }

   try{
      await book.deleteOne({ _id: id });

      res.status(200).json({message: 'O livro foi deletado com sucesso!'});

   } catch (error) {
     res.status(500).json({ erro: error });
   }
});

module.exports = router;