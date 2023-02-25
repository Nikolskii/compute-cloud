const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { updateUserCelebrate } = require('../validation/users');

router.get('/me', getUser);
router.patch('/me', updateUserCelebrate, updateUser);

module.exports = router;
