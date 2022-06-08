const userCont = require("../controllers/user.js");
const router = require("express").Router();
const isAuth = require("../middlewares/auth.js");

router.post("/pengajuan", isAuth, userCont.addPengajuan);
router.get("/pengajuan", isAuth, userCont.getPengajuan);

module.exports = router;
