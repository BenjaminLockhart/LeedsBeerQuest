const VenuesModel = (venuesStorage) => {
    return {
        async getAllVenues(){
            return await venuesStorage.getAllVenues();
        },
        async getVenueByName(name){
            return await venuesStorage.getVenueByName(name);
        },
        async getVenueByTags(tags){
            return await venuesStorage.getVenueByTags(tags);
        },
        async updateVenue(venueInfoObj) {
            //validate params here?
            return await venuesStorage.updateVenue(venueInfoObj);
        },
        async createVenue(venueInfoObj) {
            //validate params here?
            return await venuesStorage.createVenue(venueInfoObj);
        },
        async deleteVenue(name) {
            return await venuesStorage.deleteVenue(name);
        },
    }
};

module.exports = VenuesModel;