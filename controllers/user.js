const Pengajuan = require("../models/pengajuan");

exports.addPengajuan = (req, res) => {
  const { judul } = req.body;
  const pengajuan = new Pengajuan({
    judul,
    user: req.user._id,
  });
  pengajuan.save().then((result) => {
    res.status(201).json({
      message: "Pengajuan berhasil dibuat",
      pengajuan: result,
    });
  });
};

exports.getPengajuan = (req, res) => {
  //get pengajuan with pagination
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;

  Pengajuan.find({ user: req.user._id })
    .skip(currentPage * pageSize)
    .limit(pageSize)
    .then((documents) => {
      Pengajuan.countDocuments()
        .then((count) => {
          res.status(200).json({
            message: "Data Pengajuan Berhasil Didapatkan",
            pengajuan: documents,
            maxPengajuan: count,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error dalam pengambilan data",
            error: err,
          });
        });
    });
};

exports.getRepository = (req, res, next) => {
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;
  Repository.find()
    .skip(currentPage * pageSize)
    .limit(pageSize)
    .then((documents) => {
      Repository.countDocuments()
        .then((count) => {
          res.status(200).json({
            message: "Data Repository Berhasil Didapatkan",
            repository: documents,
            maxRepository: count,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Error dalam pengambilan data",
            error: err,
          });
        });
    });
};
