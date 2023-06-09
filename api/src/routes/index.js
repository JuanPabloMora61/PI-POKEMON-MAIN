const { Router } = require('express');
const morgan = require('morgan')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllPoke } = require('../controllers/getAllPoke');
const { getPokeById } = require('../controllers/getPokeById');
const {getAllTypes} = require('../controllers/getAllTypes');
const { getPokeByName } = require('../controllers/getPokeByName');
const { postPoke } = require('../controllers/postPoke')


const router = Router();

router.use(morgan('dev'));

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemon",  getAllPoke);

router.get("/pokemon/:id", getPokeById);

router.get("/pokemon/name", getPokeByName);

router.post("/pokemon", postPoke);

router.get("/types", getAllTypes);

module.exports = router;
