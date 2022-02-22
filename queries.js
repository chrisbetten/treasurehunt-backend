const { response } = require("./app");
const { hunt_id } = require("./hunts");

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
    "SELECT hunt_name FROM hunts WHERE hunt_name = $1", [huntName],
    (error, results) => {
      if (error) {
        throw error
      }
      console.log("Results.rows: ", results.rows[0]);

    if(!results.rows[0]) {
      pool.query(
        "INSERT INTO hunts (hunt_name) VALUES ($1)", [huntName],
        (error, results) => {
          if (error) {
            throw error
          }
          response.status(200).end('Hunt created')
        }
      )
    }
    response.status(409).end('HuntName already taken')
    }
  )
}

async function getHuntIdByName (name) {
  return await pool.query("SELECT hunt_id FROM hunts WHERE hunt_name = $1", [name])
  .then(res => res.rows[0])
}


async function addNewPosts (request, response) {
  console.log(request.body);
  const huntName = request.body.huntName;
  const finalMessage = request.body.finalMessage;

  const hunt_id = await getHuntIdByName(huntName)

  pool.query(
    "UPDATE hunts SET finalmessage = $1 WHERE hunt_id = $2", [finalMessage, hunt_id.hunt_id],
    (error, results) => {
      if (error) {
        throw error
      }
    }
  )

  request.body.huntLocations.forEach(post => {
    pool.query(
      "INSERT INTO locations (hunt_id, post_id, post_name, lat, lng, radius, hint) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
      [hunt_id.hunt_id, post.index, post.post_name, post.coordinates.lat, post.coordinates.lng, post.radius, post.hint],
      (error, results) => {
        if (error) {
          throw error
        }
        response.end("Posts added");
      }
    )
  })
}

module.exports = {
  getAllHunts,
  getAllLocationsFromHunt,
  getHunt,
  createNewHunt,
  addNewPosts,
};
