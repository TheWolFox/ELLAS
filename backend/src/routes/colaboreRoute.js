const { Router } = require('express');
const multer = require('multer');
const ColaboreController = require('../controllers/ColaboreController.js');

const colaboreController = new ColaboreController();
const router = Router();

const upload = multer();

router.post('/:nomeTemplate', upload.single('file'), (req, res) => colaboreController.enviaArquivo(req, res));
router.get('/:nomeTemplate', (req, res) => colaboreController.baixaTemplate(req, res));

module.exports = router;
