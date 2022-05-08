const { Schema } = require("mongoose");

const bookSchema = new Schema({
  BookId: {
    type: String,
    required: true,
  },
  Authors: [
    {
      type: String,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
});

module.exports = bookSchema;
