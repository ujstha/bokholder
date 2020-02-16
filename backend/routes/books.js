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

module.exports = router;
