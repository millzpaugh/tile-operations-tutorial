var composite = require('@mapbox/vtcomposite');
var fs = require('fs');
var path = require('path');
var mvtFixtures = require('@mapbox/mvt-fixtures');
var vtinfo = require('../utils.js').vtinfo;

//composite - two tiles, each with one feature, same zoom, no buffer 
// look at the tiles in mvt-cruncher
const buffer1 = fs.readFileSync('tiles/point_1-10-20.mvt');
//two points at 10,10 and 20,20
const buffer2 = fs.readFileSync('tiles/point_1-1000-2000.mvt');
//two points at 1000,1000 and 2000,2000

//composite - two tiles, each with one feature, different zoom, no buffer 
console.log('Original Buffer 1\n', vtinfo(buffer1));
console.log('Original Buffer 2\n', vtinfo(buffer2));

const tiles = [
  {buffer: buffer1, z:5, x:5, y:12},
  {buffer: buffer2, z:5, x:5, y:12}
];

const zxy= { z: 5, x: 5, y: 12}

composite(tiles, zxy, {}, (err, vtBuffer) => {
  // const outputInfo = vtinfo(vtBuffer);
  // fs.writeFileSync('tiles/points_composited.mvt', vtBuffer);
  // console.log('output buffer', outputInfo);
});


