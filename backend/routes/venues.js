const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        if (req.query.name !== undefined) {
            const venue = req.models.Venues.getVenueByName(req.query.name);
            return res.json(venue);
        }
        if (req.query.tags !== undefined) {
            const tags = req.query.tags.split(',');
            const venues = req.models.Venues.getVenueByTags(tags);
            return res.json(venues);
        }
        const allVenues = await req.models.Venues.getAllVenues();
        return res.json(allVenues);
    } catch (err) {
        return res.status(500).json({success: false, errorCode: 500, message: err.message});
    }
});

router.put('/', async (req, res) => {
    //update existing venue info
});

router.post('/', async (req, res) => {
    //add new venue
});

router.delete('/', async (req, res) => {
    //delete venue
})

module.exports = router;