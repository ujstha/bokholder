const experss = require("express");
const router = experss.Router();
const { schemaValidator, Booklist } = require("../models/books");
const { ImageUploader } = require("../image-uploader");
const multer = require("multer");

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
