const express = require('express');
const router = express.Router();
const { getStatus } = require( '../controllers/statuscontroller');

router.get('/status', getStatus);
router.post('/signup', require('../controllers/authcontroller').register);

module.exports = router;
