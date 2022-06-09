const User = require("../models/User");
const Pengajuan = require("../models/pengajuan");
const validator = require("validator");
const Repository = require("../models/repository");
const bcrypt = require("bcrypt");

exports.getAllUsers = (req, res, next) => {
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;
  User.find({ role: "user" })
    .skip(currentPage * pageSize)
    .limit(pageSize)
    .then((documents) => {
      User.countDocuments().then((count) => {
        res.status(200).json({
          message: "Users fetched successfully",
          users: documents,
          maxUsers: count,
        });
      });
    });
};

exports.activateUser = (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }
  User.findOne({ _id: id }).then((user) => {
    if (user) {
      user.activation = "activated";
      user.save();
      res.status(200).json({
        message: "User berhasil diaktifkan",
      });
    } else {
      res.status(404).json({
        message: "User tidak ditemukan",
      });
    }
  });
};

exports.addAdmin = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Isi semua field",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Email tidak valid",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "Password minimal 6 karakter",
    });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
    }
    const newUser = new User({
      name,
      email,
      password,
      activation: "activated",
      role: "admin",
    });
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        newUser.password = hashedPassword;
        return newUser.save();
      })
      .then((user) => {
        res.status(201).json({
          message: "Admin berhasil ditambahkan",
          user,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Ada kesalahan",
        });
      });
  });
};

exports.getAllAdmin = (req, res, next) => {
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;
  User.find({ role: "admin" })
    .skip(currentPage * pageSize)
    .limit(pageSize)
    .then((documents) => {
      User.countDocuments().then((count) => {
        res.status(200).json({
          message: "Users fetched successfully",
          users: documents,
          maxUsers: count,
        });
      });
    });
};

exports.getPengajuan = (req, res) => {
  //get pengajuan with pagination
  const pageSize = +req.query.pagesize || 20;
  const currentPage = +req.query.page || 0;

  Pengajuan.find()
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

exports.approvePengajuan = (req, res) => {
  const { id, adminFeedback, approval } = req.body;

  Pengajuan.findById(id)
    .then((pengajuan) => {
      pengajuan.persetujuan = approval;
      pengajuan.adminFeedBack = adminFeedback;
      pengajuan.save();
    })
    .then(() => {
      res.status(200).json({
        message: "Pengajuan disetujui",
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
        message: "Gagal menyetujui pengajuan",
      });
    });
};

exports.deleteUserbyId = (req, res, next) => {
  console.log(req.body.id);
  User.findByIdAndDelete(req.body.id)
    .then(() => {
      res.status(200).json({
        message: "Admin berhasil dihapus",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Ada kesalahan",
        error: err,
      });
    });
};

exports.deletePengajuanbyId = (req, res, next) => {
  console.log(req.body.id);
  Pengajuan.findByIdAndDelete(req.body.id)
    .then(() => {
      res.status(200).json({
        message: "Pengajuan berhasil dihapus",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Ada kesalahan",
        error: err,
      });
    });
};

exports.addRepository = (req, res, next) => {
  const { judul, tahun, penulis, deskripsi, pdf } = req.body;
  const user = req.user._id;

  if (!judul || !tahun || !penulis || !deskripsi || !pdf) {
    return res.status(400).json({
      message: "Isi semua field",
    });
  }
  const newRepository = new Repository({
    judul,
    tahun,
    penulis,
    deskripsi,
    pdf,
    user,
  });
  newRepository
    .save()
    .then((repository) => {
      res.status(201).json({
        message: "Repository berhasil ditambahkan",
        repository,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Ada kesalahan",
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
