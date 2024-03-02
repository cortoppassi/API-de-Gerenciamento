const express = require("express");
const router = express.Router();
const adminConstroller = require("../controllers/adminController");
const auth = require("../middleware/auth");

router.post("/login", adminConstroller.loginAdministrador);
router.post("/addAdm", auth, adminConstroller.criarAdministrador);
router.get("/listAdm", auth, adminConstroller.listarAdministrador);
router.delete("/delAdm/:id", auth, adminConstroller.deletarAdminitrador);

module.exports = router;