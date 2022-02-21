const { response } = require("./app");

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

const addNewPosts = (request, response) => {
  const huntName = request.body.huntName;
  const postName = request.body.huntLocations.post_name;
  const postRadius = request.body.huntLocations.radius;
  const postHint = request.body.huntLocations.hint;
  const postCoordinatesLat = request.body.huntLocations.coordinates.lat;
  const postCoordinatesLng = request.body.huntLocations.coordinates.lng;
  const postIndex = request.body.huntLocations.index;
  let huntId = "";

  console.log("TEST");

  pool.query(
    "SELECT hunt_id FROM hunts WHERE hunt_name = $1", [huntName],
    (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows)
      huntId = results.rows[0]
    }
  )

  huntId = parseInt(huntId);

  pool.query(
    "INSERT INTO locations (hunt_id, post_id, post_name, lat, lng, radius, hint) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
    [huntId, postIndex, postName, postCoordinatesLat, postCoordinatesLng, postRadius, postHint],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send("Posts added")
    }
  )
}

module.exports = {
  getAllHunts,
  getAllLocationsFromHunt,
  getHunt,
  createNewHunt,
  addNewPosts,
};
