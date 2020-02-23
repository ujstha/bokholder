const experss = require("express");
const router = experss.Router();
const { schemaValidator, Booklist } = require("../models/books");
const { ImageUploader } = require("../image-uploader");
const multer = require("multer");


//fetching data
router.get("/", async (req, res) => {
  const books = await Booklist.find(req.body.id);
  res.send(books);
});

router.get("/:id", async (req, res) => {
  const book = await Booklist.findOne({
    _id: req.params.id
  });

  res.status(200).send(book);
});

router.get("/book_type/:type", async (req, res) => {
  const book = await Booklist.find({
    type: req.params.type
  });

  if (book && book.length !== 0) {
    res
      .status(200)
      .json({ booklist: book, total_books: book.length, status: 200 });
  } else {
    res.status(404).json({
      msg: `Book with '${req.params.type}' type not found.`,
      status: 404
    });
  }
});

router.get("/book_author/:author", async (req, res) => {
  const book = await Booklist.find({
    author: req.params.author
  });

  if (book && book.length !== 0) {
    res
      .status(200)
      .json({ booklist: book, total_books: book.length, status: 200 });
  } else {
    res.status(404).json({
      msg: `${req.params.author}'s book was not found.`,
      status: 404
    });
  }
});

router.get("/genre/:genre", async (req, res) => {
  const book = await Booklist.find({
    genre: { $regex: req.params.genre }
  });

  if (book && book.length !== 0) {
    res
      .status(200)
      .json({ booklist: book, total_books: book.length, status: 200 });
  } else {
    res.status(404).json({
      msg: `Book with '${req.params.genre}' genre was not found.`,
      status: 404
    });
  }
});

router.get("/search/:search_params/:name", async (req, res) => {
  let book = [];
  if (req.params.search_params === "book_name") {
    book = await Booklist.find({
      book_name: { $regex: req.params.name, $options: "-i" }
    });
  } else if (req.params.search_params === "author") {
    book = await Booklist.find({
      author: { $regex: req.params.name, $options: "-i"  }
    });
  } else if (req.params.search_params === "publisher") {
    book = await Booklist.find({
      publisher: { $regex: req.params.name, $options: "-i"  }
    });
  }
  if (book && book.length !== 0) {
    res
      .status(200)
      .json({ booklist: book, total_books: book.length, status: 200 });
  } else {
    res.status(404).json({
      msg: `0 search results for '${req.params.name}'.`,
      status: 404
    });
  }
});

//adding data
router.post(
  "/",
  multer({}).single("poster"),
  (req, res, next) => {
    ImageUploader(req, res, req.file, next, "post");
  },
  (req, res) => {
    const { error } = schemaValidator(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const booklist = new Booklist({
      book_name: req.body.book_name,
      poster: req.body.poster,
      author: req.body.author,
      genre: req.body.genre,
      publisher: req.body.publisher,
      type: req.body.type,
      isbn: req.body.isbn,
      description: req.body.description,
      released: req.body.released
    });

    booklist.save().then(book =>
      res.json({
        booklist: book,
        msg: `'${req.body.type}' added successfully.`
      })
    );
  }
);

//updating data
router.put(
  "/:id",
  multer({}).single("poster"),
  (req, res, next) => {
    ImageUploader(req, res, req.file, next, "update");
  },
  (req, res) => {
    Booklist.findById(req.params.id, (err, book) => {
      if (!book) res.status(404).json({ Error: "Data not found." });
      else {
        book.book_name = req.body.book_name || book.book_name;
        book.poster = req.body.poster || book.poster;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publisher = req.body.publisher || book.publisher;
        book.type = req.body.type || book.type;
        book.isbn = req.body.isbn || book.isbn;
        book.description = req.body.description || book.description;
        book.released = req.body.released || book.released;

        book
          .save()
          .then(() =>
            res.json({
              booklist: book,
              msg: `'${req.body.type}' updated successfully.`
            })
          )
          .catch(err => res.status(400).json({ Error: err }));
      }
    });
  }
);

//deleting data
router.delete("/:id", async (req, res) => {
  const book = await Booklist.findOne({ _id: req.params.id });
  if (!book) return res.status(404).send("Data not found.");

  await book
    .remove()
    .then(() => res.json({ msg: "Data deleted successfully." }));
});

module.exports = router;
