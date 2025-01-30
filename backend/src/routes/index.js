const express = require('express');
const router = express.Router();
const queriesRoute = require('./queriesRoute');
const neo4jRoute = require('./neo4jRoute');
const usuariosRoute = require('./usuariosRoute');
const pessoasRoute = require('./pessoasRoute');
const colaboreRoute = require('./colaboreRoute');

router.use('/queries', queriesRoute);
router.use('/neo4j', neo4jRoute);
router.use('/usuarios', usuariosRoute);
router.use('/pessoas', pessoasRoute);
router.use('/colabore', colaboreRoute);

module.exports = router;
