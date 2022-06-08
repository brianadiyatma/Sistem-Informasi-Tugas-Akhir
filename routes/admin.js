const adminCont = require("../controllers/admin");
const router = require("express").Router();
const isAdmin = require("../middlewares/isAdmin");
const auth = require("../middlewares/auth");

router.get("/get-admin", auth, isAdmin, adminCont.getAllAdmin);
router.get("/get-pengajuan", auth, isAdmin, adminCont.getPengajuan);
router.post("/add-admin", auth, isAdmin, adminCont.addAdmin);
router.post("/activate-user", auth, isAdmin, adminCont.activateUser);
router.post("/approve-pengajuan", auth, isAdmin, adminCont.approvePengajuan);
router.get("/get-user", auth, isAdmin, adminCont.getAllUsers);
router.post("/delete-user", auth, isAdmin, adminCont.deleteUserbyId);
router.post("/delete-pengajuan", auth, isAdmin, adminCont.deletePengajuanbyId);

module.exports = router;
