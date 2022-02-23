CREATE TABLE hunts (
  hunt_id SERIAL NOT NULL PRIMARY KEY,
  hunt_name VARCHAR(255) NOT NULL,
  created_at VARCHAR(25),
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
    ('Siris skattejakt', 'Snu deg mot kirka'),
    ('Nydalen rundt', 'Du har runna Nydalen rundt, bra jobba!');

INSERT INTO locations (hunt_id, post_id, post_name, lat, lng, radius, hint)
  VALUES
    (1, 1, 'Iskremkiosken', 59.92332336526023, 10.759029328179851, 10, 'Her spiser vi is hver lørdag'),
    (1, 2, 'Nedre Løkka Cocktailbar', 59.91873465162661, 10.759225892888178, 20, 'Vår første date'),
    (1, 3, 'Sydøst', 59.918115117522866, 10.760538146061307, 20, 'Her spiste vi vår første middag sammen'),
    (1, 4, 'Paviljongen på Birkelunden', 59.92638680325291, 10.760641849133226, 30, 'Her delte vi vårt første kyss'),
    (2, 1, 'Nydalen Bryggeri', 59.950313170793166, 10.76434599639627, 50, 'Lønningspils og quiz hver torsdag'),
    (2, 2, 'BI Nydalen', 59.949107987046006, 10.768578221529944, 100, 'Stedet hvor du kan betale for utdanning og alle går i blazer eller dress'),
    (2, 3, 'Fly Chicken Storo', 59.947482697043675, 10.770985011587864, 20, 'Fritert guilty pleasure-mat dagen derpå'),
    (2, 4, 'Nydalen Postkontor', 59.94714264963904, 10.769047675381874, 30, 'Send en pakke eller fem til en nær venn'),
    (2, 5, 'Kristoffer Aamots bro', 59.94659960206432, 10.765027380498555, 25, 'Nærmeste krysningspunkt over Akerselva'),
    (2, 6, 'SAS Brua', 59.94895696213082, 10.765167863515225, 20, 'Brua med utsikt til Playa del Nydalen, stedet hvor man bader'); 

