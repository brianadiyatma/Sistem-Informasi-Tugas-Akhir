const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pengajuanSchema = new Schema({
  judul: {
    type: String,
    required: true,
  },
  persetujuan: {
    type: String,
    required: true,
    default: "pending",
  },
  adminFeedBack: {
    type: String,
    required: false,
  },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Pengajuan", pengajuanSchema);
