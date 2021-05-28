'use strict'

module.exports = class {
    constructor(pool) {
        this.pool = pool;
        this.client = null;
    }

    async getAllVenues() {
        const client = await this.pool.connect();
        const queryString = `
            SELECT
                *
            FROM
                venues
            ORDER BY
                name DESC, date DESC`;

        const result = await client.query(queryString);
        await client.release();
        return result.rows;
    }
};