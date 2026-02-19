const express = require('express');
const router = express.Router();
const { submitForm, getAllForms, updateFormStatus, increaseVisitor, getVisitorCount } =
  require('../controllers/formController');



router.route('/').post(submitForm).get(getAllForms);
router.put('/:id/status', updateFormStatus);

// Visitor Routes

router.get("/visit", increaseVisitor);
router.get("/visit-count", getVisitorCount);


module.exports = router;
