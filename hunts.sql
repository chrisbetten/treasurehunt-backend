CREATE TABLE hunts (
  hunt_id SERIAL NOT NULL PRIMARY KEY,
  hunt_name VARCHAR(255) NOT NULL,
  finalMessage VARCHAR(500)
);

CREATE TABLE locations (
  location_id SERIAL NOT NULL PRIMARY KEY,
  hunt_id INT NOT NULL REFERENCES hunts (hunt_id),
  post_id INT,
  post_name VARCHAR(255),
  lat DECIMAL,
  lng DECIMAL,
  radius INT,
  hint VARCHAR(500)
);

INSERT INTO hunts(hunt_name, finalMessage)
  VALUES
    ('Nydalen rundt', 'Du har runna Nydalen rundt, bra jobba!');

INSERT INTO locations (hunt_id, post_id, post_name, lat, lng, radius, hint)
  VALUES
    (1, 1, 'Nydalen Bryggeri', 59.950313170793166, 10.76434599639627, 50, 'Lønningspils og quiz hver torsdag'),
    (1, 2, 'BI Nydalen', 59.949107987046006, 10.768578221529944, 100, 'Stedet hvor du kan betale for utdanning og alle går i blazer eller dress'),
    (1, 3, 'Fly Chicken Storo', 59.947482697043675, 10.770985011587864, 20, 'Fritert guilty pleasure-mat dagen derpå'),
    (1, 4, 'Nydalen Postkontor', 59.94714264963904, 10.769047675381874, 30, 'Send en pakke eller fem til en nær venn'),
    (1, 5, 'Kristoffer Aamots bro', 59.94659960206432, 10.765027380498555, 25, 'Nærmeste krysningspunkt over Akerselva'),
    (1, 6, 'SAS Brua', 59.94895696213082, 10.765167863515225, 20, 'Brua med utsikt til Playa del Nydalen, stedet hvor man bader'); 

