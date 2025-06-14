const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/authcontroller');
const proxyAuth      = require('../middlewares/proxyAuth');

router.post ('/login-google', authController.loginWithGoogle);
router.post ('/login', authController.login);
router.get  ('/admin-only', proxyAuth, (req, res) => {
  res.send('Acceso autorizado solo para administradores');
});

module.exports = router;