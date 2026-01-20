const express = require('express');
const router = express.Router();
const { getStatus } = require( '../controllers/statuscontroller');

router.get('/status', getStatus);
router.post('/signup', require('../controllers/authcontroller').register);
router.post('/login', require('../controllers/authcontroller').login);

module.exports = router;
