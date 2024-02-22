// APP REQUIREMENTS AND EXPORTS FOR USER SIGN IN TO WORK
const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;
