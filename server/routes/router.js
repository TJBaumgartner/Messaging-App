var express = require('express');
var router = express.Router();
const user = require('../controllers/user');
const message = require('../controllers/message');
const authenticate = require('../controllers/authenticate');

router.post("/user/create", user.sign_up_post)
router.post("/login", user.login)

module.exports = router;
