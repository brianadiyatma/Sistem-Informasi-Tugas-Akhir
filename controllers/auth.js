const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      error: "Tolong Isi Semua Kolom",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User Tidak Ditemukan" });
      }
      if (user.activation === "pending" || user.activation === "rejected") {
        return res.status(401).json({ error: "User Tidak Aktif" });
      }
      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ error: "Kombinasi Login Salah" });
        }
        const token = jwt.sign(
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.daftar = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Tolong isi semua field",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Please provide a valid email",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "Please provide a password of at least 6 characters",
    });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const newUser = new User({
      name,
      email,
      password,
      activation: "pending",
    });
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        newUser.password = hashedPassword;
        return newUser.save();
      })
      .then((user) => {
        res.status(201).json({
          message: "User created successfully",
          user,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error creating user",
        });
      });
  });
};
