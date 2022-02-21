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

const getHunt = (request, response) => {
  pool.query(
    "SELECT * FROM hunts WHERE hunt_id = $1", [request.params.huntid],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
    }
  )
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

const createNewHunt = (request, response) => {
  const huntName = request.body.newHuntName;
  pool.query(
    "INSERT INTO hunts (hunt_name) VALUES ($1)", [huntName],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('Hunt created')
    }
  )
}

module.exports = {
  getAllHunts,
  getAllLocationsFromHunt,
  getHunt,
  createNewHunt
};
