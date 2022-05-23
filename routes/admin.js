const adminCont = require("../controllers/admin");
const router = require("express").Router();

router.get("/get-admin", adminCont.getAllAdmin);
router.get("/get-pengajuan", adminCont.getPengajuan);
router.post("/add-admin", adminCont.addAdmin);
router.post("/activate-user", adminCont.activateUser);
router.post("/approve-pengajuan", adminCont.approvePengajuan);
router.get("/get-user", adminCont.getAllUsers);

module.exports = router;
