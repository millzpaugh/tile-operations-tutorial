const fs = require('fs');
const path = require('path');
const shaver = require('@mapbox/vtshaver');
const vt = require('@mapbox/vector-tile').VectorTile;
const pbf = require('pbf');
const vtinfo = require('../utils.js').vtinfo;

const buffer1 = fs.readFileSync('tiles/point_1-10-20.mvt');
console.log('Original Buffer 1\n', vtinfo(buffer1));

const filters = new shaver.Filters(shaver.styleToFilters({
    layers: [
      {
        'source-layer':'sf grocery',
        minzoom: 0,
        maxzoom: 5
      }
    ]
}));

const options = {
    filters: filters,  // required
    zoom: 5
};

shaver.shave(buffer1, options, function(err, shavedTile) {
  if (err) throw err;
  fs.writeFileSync('tiles/shaved-points-5-5-12.mvt', shavedTile);
  const outputInfo = vtinfo(shavedTile);
  console.log('output buffer', outputInfo);
});