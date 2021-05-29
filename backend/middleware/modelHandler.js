const Venues = require('./venues');
const VenuesStorage = require('../storage/venues');

const modelHandler = function(pool) {
    const venuesStorage = new VenuesStorage(pool);

    return (req, _, next) => {
        req.models = {};
        //More routes would be added here if more tables were added
        req.models.Venues = Venues(venuesStorage);

        return next();
    };
};

module.exports = modelHandler;