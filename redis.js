const { Client } = require("redis-om");

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL;

/* create and open the Redis OM Client */
const client = new Client();

(async () => {
  await client.open(url);
})();

module.exports = client;
