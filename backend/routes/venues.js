const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allVenues = await req.models.Venues.getAllVenues();
        return res.json(allVenues);
    } catch (err) {
        return res.status(500).json({success: false, errorCode: 500, message: err.message});
    }
});

module.exports = router;