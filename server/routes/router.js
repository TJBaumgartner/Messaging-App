var express = require('express');
var router = express.Router();
const user = require('../controllers/user');
const message = require('../controllers/message');
const authenticate = require('../controllers/authenticate');

router.post("/user/create", user.sign_up_post);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.post("/token", user.refresh)
router.get("/user/list", authenticate, user.allUsers)

router.get("/user/:id/message",authenticate, message.message);
router.post("/message/send",authenticate, message.messageSend);

module.exports = router;
