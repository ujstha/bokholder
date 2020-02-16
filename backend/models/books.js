const mongoose = require("mongoose");
const joi = require("joi");

const bookSchema = new mongoose.Schema({
  book_name: { type: String },
  poster: { type: String },
  author: { type: String },
  genre: { type: String },
  publisher: { type: String },
  type: { type: String },
  isbn: { type: String },
  description: { type: String },
  released: { type: String },
  createdDate: { type: Date, default: Date.now }
});

function schemaValidator(validData) {
  schema = {
    book_name: joi.string().required(),
    poster: joi.string(),
    author: joi.string().required(),
    genre: joi.string().required(),
    publisher: joi.string().required(),
    type: joi
      .string()
      .valid("book", "novel", "article", "audio book")
      .required(),
    isbn: joi.string().required(),
    description: joi.string(),
    released: joi.string().required()
  };
  return joi.validate(validData, schema);
}

const Booklist = mongoose.model("book", bookSchema);

module.exports = {
  schemaValidator,
  bookSchema,
  Booklist
};
