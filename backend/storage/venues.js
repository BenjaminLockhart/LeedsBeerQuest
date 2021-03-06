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

    async getVenueByCategory(category) {
        const queryString = `
            SELECT
                *
            FROM
                venues
            WHERE
                replace(lower(category), ' ', '') = $1
            ORDER BY
                name DESC, date DESC`;

        const values = [category.toLowerCase().replace(' ', '')];
        return await query(this.pool, queryString, values);
    }

    async getVenueByTags(tags) {
        // Go back and make this query better, it's too vague and not fully correct
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

    async updateVenueByName(name, venueInfoObj) {
        const values = Object.values(venueInfoObj);
        let queryParamString = '';
        let paramIndex = 1;
        for (let key in venueInfoObj) {
            queryParamString += `${key}=$${paramIndex}`;
            paramIndex++;
        }
        const queryString = `
        UPDATE
            venues
        SET ${queryParamString}
        WHERE name='${name}'`;
        
        return await query(this.pool, queryString, values);
    }

    async createVenue(venueInfoObj) {
        const keysToCreate = Object.keys(venueInfoObj).join(',');
        const values = `'${Object.values(venueInfoObj).join('\',\'')}'`;
        const queryString = `
        INSERT INTO
            venues(${keysToCreate})
        VALUES
            (${values})`
        return await query(this.pool, queryString);
    }

    async deleteVenue(name) {
        const queryString = `
            DELETE
            FROM
                venues
            WHERE
                replace(lower(name), ' ', '') = $1`;
        const values = [name.toLowerCase().replace(' ', '')];
        return await query(this.pool, queryString, values);
    }
 };

