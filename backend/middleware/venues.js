const validParams = {
    name: { update: false},
    category: { update: true},
    url: { update: true},
    date: { update: false},
    excerpt: { update: true},
    thumbnail: { update: true },
    lat: { update: true },
    lng: { update: true },
    address: { update: true },
    phone: { update: true },
    twitter: { update: true },
    // I don't think it would make sense to update the ratings this way.
    // ideally there would be some other dataset that tracks the total
    // number of reviews, and aggregates new ratings based on that.
    stars_beer: { update: false },
    stars_atmosphere: { update: false },
    stars_amenities: { update: false },
    stars_value: { update: false },
    tags: { update: true }
};

const VenuesModel = (venuesStorage) => {
    return {
        async getAllVenues(){
            return await venuesStorage.getAllVenues();
        },
        async getVenueByName(name){
            return await venuesStorage.getVenueByName(name);
        },
        async getVenueByCategory(category){
            return await venuesStorage.getVenueByCategory(category);
        },
        async getVenueByTags(tags){
            return await venuesStorage.getVenueByTags(tags);
        },
        async updateVenueByName(name, venueInfoObj) {
            for (let key in venueInfoObj) {
                if (validParams[key] === undefined) {
                    throw Error(`Invalid request - ${key} not recognized`);
                }
                if (validParams[key].update === false) {
                    throw Error(`${key} cannot be altered once created`);
                }
            }
            return await venuesStorage.updateVenueByName(name, venueInfoObj);
        },
        async createVenue(venueInfoObj) {
            for (let key in venueInfoObj) {
                if (validParams[key] === undefined) {
                    throw Error(`Invalid request - ${key} not recognized`);
                }
            }
            return await venuesStorage.createVenue(venueInfoObj);
        },
        async deleteVenue(name) {
            return await venuesStorage.deleteVenue(name);
        },
    }
};

module.exports = VenuesModel;