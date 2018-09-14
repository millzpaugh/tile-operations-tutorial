const fs = require('fs');
const path = require('path');
const shaver = require('@mapbox/vtshaver');
const vt = require('@mapbox/vector-tile').VectorTile;
const pbf = require('pbf');
const vtinfo = require('../utils.js').vtinfo;
const vtvalidate = require('@mapbox/vtvalidate');

const buffer1 = fs.readFileSync('tiles/point_1-10-20.mvt');

// Pass in protocol buffer (uncompressed)
vtvalidate.isValid(buffer1, function(err, result) {
  if (err) throw err;

  // returns string that specifies why the tile is invalid
  console.log('result', result); // 'Missing geometry field in feature (spec 4.2)'
});