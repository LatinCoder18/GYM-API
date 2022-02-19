const { Router } = require('express');
const router = Router();

// Not Found Route
router.get('*', (req, res, next) => {
    res.status(404).json({ msg: "Route not found" })
});



module.exports = router;
