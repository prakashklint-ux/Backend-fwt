const express = require('express');
const router = express.Router();
const { submitForm, getAllForms, updateFormStatus,  } =
  require('../controllers/formController');

router.route('/').post(submitForm).get(getAllForms);
router.put('/:id/status', updateFormStatus);


module.exports = router;
