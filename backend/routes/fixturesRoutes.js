// Import required libraries and modules
const express = require('express');
const router = express.Router();
// Import required controllers
const fixturesController = require('../controllers/fixturesController');
const healthController = require('../controllers/healthController');
const usageController = require('../controllers/usageController');

// Route endpoints to FIXTURE controllers
router.get('/', fixturesController.getAllFixtures);
router.post('/', fixturesController.postFixture);

// Route endpoints to HEALTH controllers (register BEFORE the generic id route so
// literal paths like /health don't get captured as an :id value)
router.get('/health', healthController.getAllHealth);
router.get('/health/:fixture_id', healthController.getHealthById);
router.post('/health', healthController.postHealth);
router.put('/health/:fixture_id', healthController.updateHealth);
router.delete('/health/:fixture_id', healthController.deleteHealth);

// Route endpoints to USAGE controllers
router.get('/usage', usageController.getAllUsage);
router.get('/usage/:fixture_id', usageController.getUsageById);
router.post('/usage', usageController.postUsage);
router.put('/usage/:fixture_id', usageController.updateUsage);
router.delete('/usage/:fixture_id', usageController.deleteUsage);

// FIXTURE ID routes (numeric validation happens inside controllers)
router.get('/:id', fixturesController.getFixtureById);
router.put('/:id', fixturesController.updateFixture);
router.delete('/:id', fixturesController.deleteFixture);

// Export the router

module.exports = router;