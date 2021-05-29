'use strict'

const query = async function(pool, queryString, values) {
    const client = await pool.connect();
	let result = [];
	try {
		result = await client.query(queryString, values);
	} catch (e) {
		throw e;
	} finally {
		await client.release();
	}
	return result.rows;
};

module.exports = class {
    constructor(pool) {
        this.pool = pool;
        this.client = null;
    }

    async getAllVenues() {
        const queryString = `
            SELECT
                *
            FROM
                venues
            ORDER BY
                name DESC, date DESC`;
        const values = [];
        return await query(this.pool, queryString, values);
    }

    async getVenueByName(name) {
        const client = await this.pool.connect();
        const queryString = `
            SELECT
                *
            FROM
                venues
            WHERE
                replace(lower(name), ' ', '') = $1
            ORDER BY
                name DESC, date DESC`;

        const values = [name.toLowerCase().replace(' ', '')];
        return await query(this.pool, queryString, values);
    }

    async getVenueByTags(tags) {
        const client = await this.pool.connect();
        const queryString = `
            SELECT
                *
            FROM
                venues
            WHERE
                tags like $1
            ORDER BY
                name DESC, date DESC`;
        
        const tagsString = tags.toString().replace('[', '(').replace(']', ')');
        const values = [tagsString];
        return await query(this.pool, queryString, values);
    }

    async updateVenue(venueInfoObj) {

    }

    async createVenue(venueInfoObj) {

    }

    async deleteVenue(name) {

    }
 };
 