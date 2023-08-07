const express = require('express');
const router = express.Router();
const friendController = require('../../controllers/friendController');

router.post('/:userId/friends/:friendId', friendController.addFriend);

router.delete('/:userId/friends/:friendId', friendController.removeFriend);

module.exports = router;
