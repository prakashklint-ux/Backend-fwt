const express = require('express');
const router = express.Router();
const { submitForm, getAllForms, updateFormStatus, getStocks } =
  require('../controllers/formController');

router.route('/').post(submitForm).get(getAllForms);
router.put('/:id/status', updateFormStatus);
router.get('/stocks', getStocks);

module.exports = router;
