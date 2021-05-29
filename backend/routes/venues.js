const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        if (req.query.name !== undefined) {
            const venue = await req.models.Venues.getVenueByName(req.query.name);
            return res.json(venue);
        }
        if (req.query.category !== undefined) {
            const venues = await req.models.Venues.getVenueByCategory(req.query.category);
            return res.json(venues);
        }
        if (req.query.tags !== undefined) {
            const tags = req.query.tags.split(',');
            const venues = await req.models.Venues.getVenueByTags(tags);
            return res.json(venues);
        }
        const allVenues = await req.models.Venues.getAllVenues();
        return res.json(allVenues);
    } catch (err) {
        return res.status(500).json({success: false, errorCode: 500, message: err.message});
    }
});

router.put('/', async (req, res) => {
    try {
        if (req.query.name !== undefined) {
            let venueUpdateObj = {...req.query};
            delete venueUpdateObj['name'];
            const venue = await req.models.Venues.updateVenueByName(req.query.name, venueUpdateObj);
            return res.json(venue);
        }
        return res.json({message: 'No venue name declared'});
    } catch (err) {
        return res.status(500).json({success: false, errorCode: 500, message: err.message});
    }
});

router.post('/', async (req, res) => {
    try {
        let venueUpdateObj = { ...req.query };
        const venue = await req.models.Venues.createVenue(venueUpdateObj);
        return res.json(venue);
    } catch (err) {
        return res.status(500).json({ success: false, errorCode: 500, message: err.message });
    }
});

router.delete('/', async (req, res) => {
    try {
        if (req.query.name !== undefined) {
            const venue = await req.models.Venues.deleteVenue(req.query.name);
            return res.json(venue);
        }
        return res.json({message: 'No venue name declared'});
    } catch (err) {
        return res.status(500).json({success: false, errorCode: 500, message: err.message});
    }
});

module.exports = router;
