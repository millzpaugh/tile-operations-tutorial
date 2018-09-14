const vtquery = require('@mapbox/vtquery');
const fs = require('fs');

const buffer1 = fs.readFileSync('tiles/point_1-10-20.mvt');
//two points at 10,10 and 20,20
const buffer2 = fs.readFileSync('tiles/point_1-1000-2000.mvt');
//two points at 1000,1000 and 2000,2000
const vtinfo = require('../utils.js').vtinfo;


//composite - two tiles, each with one feature, different zoom, no buffer 
console.log('Original Buffer 1\n', vtinfo(buffer1));
console.log('Original Buffer 2\n', vtinfo(buffer2));

const tiles = [
  {buffer: buffer1, z:5, x:5, y:12},
  {buffer: buffer2, z:5, x:5, y:12}
];

const zxy= { z:5, x:5, y:12}

// radius is in meters
const options = {
  radius: 1000000,
  limit: 5,
  geometry: 'point',
  layers: ['sf grocery', 'sf ice cream', 'sf laundry', 'sf gym'],
  dedupe: true
};

vtquery(tiles, [-122.0308, 36.9741], options, function(err, result) {
  if (err) throw err;
  console.log('results', result); // geojson FeatureCollection
});