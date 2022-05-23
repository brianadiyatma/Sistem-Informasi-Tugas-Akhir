const userCont = require("../controllers/user.js");
const router = require("express").Router();

router.post("/pengajuan", userCont.addPengajuan);
router.get("/pengajuan", userCont.getPengajuan);

module.exports = router;
