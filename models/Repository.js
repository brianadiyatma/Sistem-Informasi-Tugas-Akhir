const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RepositorySchema = new Schema({
  judul: {
    type: String,
    required: true,
  },
  tahun: {
    type: Number,
    required: true,
  },
  penulis: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Repository", RepositorySchema);
