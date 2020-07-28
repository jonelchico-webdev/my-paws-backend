const express = require('express');
const router = express.Router();

// const requireAuth = require("../middlewares/requireAuth");

const UserController = require('../controllers/user');
// const PetTypeController = require('../controllers/pet-type');


router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);

// router.get('/breeds', requireAuth, PetTypeController.breeds)

// router.post('/transactions/paid/',  auth.verify,  OrderController.paid)

module.exports = router