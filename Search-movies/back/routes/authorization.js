const router = require('express').Router();
const { createUser, loginUser } = require('../controllers/users');
const { loginCelebrate, createUserCelebrate } = require('../validation/auth');

router.post('/signup', createUserCelebrate, createUser);
router.post('/signin', loginCelebrate, loginUser);

module.exports = router;
