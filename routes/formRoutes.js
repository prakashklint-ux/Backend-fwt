const express = require('express');
const router = express.Router();
const { submitForm, getAllForms  , getDailyStats} = require('../controllers/formController.js');

router.route('/').post(submitForm).get(getAllForms);
router.get('/stats', getDailyStats);


module.exports = router;