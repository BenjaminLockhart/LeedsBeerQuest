const VenuesModel = (venuesStorage) => {
    return {
        async getAllVenues(){
            return await venuesStorage.getAllVenues();
        }
    }
};

module.exports = VenuesModel;