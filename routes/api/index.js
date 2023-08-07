const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');
const friendRoutes = require('./friendRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', reactionRoutes);
router.use('/friends', friendRoutes);

module.exports = router;
