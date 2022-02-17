const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.IS_LOCAL ? undefined : { rejectUnauthorized: false },
});

const getAllHunts = (request, response) => {
  pool.query(
    "SELECT * FROM hunts;",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getAllLocationsFromHunt = (request, response) => {
  pool.query(
    "SELECT * FROM locations WHERE hunt_id = $1;", [request.params.huntid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = {
  getAllHunts,
  getAllLocationsFromHunt
};
