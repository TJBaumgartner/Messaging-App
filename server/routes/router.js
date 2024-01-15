var express = require('express');
var router = express.Router();
const user = require('../controllers/user');
const message = require('../controllers/message');
const authenticate = require('../controllers/authenticate');

router.post("/user/create", user.sign_up_post);
router.post("/login", user.login);
router.post("/logout", user.logout);
// router.get("/test",authenticate, user.test);
router.post("/token", user.refresh)
router.get("/user/list", authenticate, user.allUsers)
module.exports = router;
