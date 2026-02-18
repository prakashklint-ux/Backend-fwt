const express = require('express');
const router = express.Router();
const { submitForm, getAllForms   ,updateFormStatus , getStocks} = require('../controllers/formController.js');
router.route('/').post(submitForm).get(getAllForms);
// router.get('/stats', getDailyStats);
router.put('/:id/status', updateFormStatus);
router.get("/stocks", getStocks);



module.exports = router;