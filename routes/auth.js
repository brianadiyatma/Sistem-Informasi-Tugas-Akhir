const router = require("express").Router();
const authCont = require("../controllers/auth");

router.post("/daftar", authCont.daftar);
router.post("/login", authCont.login);

module.exports = router;
