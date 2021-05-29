const {Pool} = require('pg');
const express = require('express');

const { modelHandler } = require('./middleware');
const { venuesRoutes } = require('./routes');

const app = express();
app.use(express.json());

const pool = new Pool({connectionString: 'postgresql://postgres:postgres@localhost:5432/beerdata', connectionTimeoutMillis: 20000 });

pool.on('error', (err, client) => {
    console.error('Error on PG client', err);
});

const handler = modelHandler(pool);

app.get('/', (req, res) => {
    return res.send('API is running');
});

//More routes would be added here if more tables were added
app.use('/venues', handler, venuesRoutes);

app.listen(3000, () => {
    console.log('REST API is running on http://localhost:3000');
})
