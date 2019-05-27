let pg = require('pg');
let client = new pg.Client("postgres://root:root@localhost:5432/test");
client.connect();

module.exports.client = client;