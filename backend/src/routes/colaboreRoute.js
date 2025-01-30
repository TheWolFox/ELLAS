const { Router } = require('express');
const multer = require('multer');
const ColaboreController = require('../controllers/ColaboreController.js');

const colaboreController = new ColaboreController();
const router = Router();

const upload = multer();

router.post('/', upload.single('file'), (req, res) => colaboreController.enviaArquivo(req, res));

module.exports = router;
