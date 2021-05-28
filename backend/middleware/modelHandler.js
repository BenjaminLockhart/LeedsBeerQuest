const Venues = require('./venues');
const VenuesStorage = require('../storage/venues');

const modelHandler = function(pool) {
    const venuesStorage = new VenuesStorage(pool);
    
    return (req, _, next) => {
        req.models = {};
        req.models.Venues = Venues(venuesStorage);

        return next();
    };
};

module.exports = modelHandler;