// Import required libraries and modules
const express = require('express');
const router = express.Router();
// Import required controllers
const fixturesController = require('../controllers/fixturesController');

// Route endpoints to controller functions
router.get('/', fixturesController.getAllFixtures);
router.get('/:id', fixturesController.getFixtureById);

module.exports = router;