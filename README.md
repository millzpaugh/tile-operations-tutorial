# Tile Operations Tutorial 

# Tile Operations: What is Compositing? 

Compositing is a tool to combine multiple vector tiles into a single tile. Compositing allows a user to: 

- **Merge tiles.** Merges 2 or more tiles into a single tile at the same zoom level. 
- **Overzoom tiles.** Displays data at a higher zoom level than that the tileset max zoom. 
- **Clip tiles.** Clips the extraneous portion of a tile that’s been overzoomed. 


## Compositing: Merging 2+ Tiles

Let’s say you have two tilesets - `amillzpaugh.norcal`  and `amillzpaugh.socal`. tiles at zoom level `5` - `santacruz.mvt` & `losangeles.mvt`. Each tile contains a single point that corresponds to one of the two cities. You could generate a single tile, `sc_plus_la.mvt` that contains both points by compositing the two tiles. 

Both tiles have a min zoom of 0 and a max zoom of 5. 

## Source Tiles

`santacruz.mvt` - single point 

![](https://d2mxuefqeaa7sj.cloudfront.net/s_04E22B61D71C1B99F8EBA3C41F5DDF0F28DDD0F66171831E6A32600C9DBCD6E9_1531946395305_sc.png)













`losangeles.mvt` - single point 

![](https://d2mxuefqeaa7sj.cloudfront.net/s_04E22B61D71C1B99F8EBA3C41F5DDF0F28DDD0F66171831E6A32600C9DBCD6E9_1531946414805_la.png)













## Output Tile

**Composited Tile:** `santa_cruz_plus_la-5-5-12.mvt`


![](https://d2mxuefqeaa7sj.cloudfront.net/s_04E22B61D71C1B99F8EBA3C41F5DDF0F28DDD0F66171831E6A32600C9DBCD6E9_1531946439263_scla.png)













`**vtcomposite**` **code:** 


    const santaCruzBuffer = fs.readFileSync('/santacruz.mvt');
    const losAngelesBuffer = fs.readFileSync('/losangeles.mvt');
    
    const tiles = [
      {buffer: santaCruzBuffer, z:5, x:5, y:12},
      {buffer: losAngelesBuffer, z:5, x:5, y:12}
    ];
    
    const zxy = {z:5, x:5, y:12};
    
    composite(tiles, zxy, {}, (err, vtBuffer) => {
      fs.writeFileSync('/santa_cruz_plus_la-5-5-12.mvt', vtBuffer);
    });


## Let’s composite our own tiles! 


1. `git clone vtlibs-tutorial` & run `npm install` 


2. Navigate to `tiles/point_1-10-20.mvt`


3. Open mvt-cruncher https://mapbox.github.io/mvt-cruncher/html/mvt2svg.html


4. Drag and drop the tile into the box. You should see two points! 


5. Navigate to `tiles/point_1-1000-2000.mvt`


6. Drag and drop the tile into the box. You should see three points! (*They are small*)

These are two tiles with two points! We are going to **composite** these tiles to create a single tile. 


7. Navigate to `composite/1-composite-points.js` in your text editor. This script will take the two tiles you’ve viewed and `**composite**`, or combine, them into one tile. 

Run the script `node composite/1-composite-points.js`. What do you see? 

You should see metadata about the Vector Tile.


    Original Buffer 1
     VectorTile {
      layers: 
       { 'sf ice cream': 
          VectorTileLayer {
            version: 2,
            name: 'sf ice cream',
            extent: 4096,
            length: 1,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] },
         'sf grocery': 
          VectorTileLayer {
            version: 2,
            name: 'sf grocery',
            extent: 4096,
            length: 2,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] } } }
    Original Buffer 2
     VectorTile {
      layers: 
       { 'sf gym': 
          VectorTileLayer {
            version: 2,
            name: 'sf gym',
            extent: 4096,
            length: 1,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] },
         'sf laundry': 
          VectorTileLayer {
            version: 2,
            name: 'sf laundry',
            extent: 4096,
            length: 1,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] } } }

This is metadata about the two tiles. Each tile has two layers with a single point in each layer. If we composite the tile, we will have a single tile with **4 layers and 4 points.** 


8. Uncomment L26 - L28. 
9. Run the script again -  `node composite/1-composite-points.js`

You should see an `Output Buffer` log, which contains metadata about the composited tile. 


    output buffer VectorTile {
      layers: 
       { 'sf ice cream': 
          VectorTileLayer {
            version: 2,
            name: 'sf ice cream',
            extent: 4096,
            length: 1,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] },
         'sf grocery': 
          VectorTileLayer {
            version: 2,
            name: 'sf grocery',
            extent: 4096,
            length: 2,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] },
         'sf gym': 
          VectorTileLayer {
            version: 2,
            name: 'sf gym',
            extent: 4096,
            length: 1,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] },
         'sf laundry': 
          VectorTileLayer {
            version: 2,
            name: 'sf laundry',
            extent: 4096,
            length: 1,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] } } }


10. Navigate to `tiles/points_composited.mvt` and drag & drop into mvt-cruncher. 

You should see a tile with 5 points! We’ve composited our two tiles into one - Yay! 

## Compositing: Overzooming & Clipping Tiles
![](https://d2mxuefqeaa7sj.cloudfront.net/s_04E22B61D71C1B99F8EBA3C41F5DDF0F28DDD0F66171831E6A32600C9DBCD6E9_1531946439263_scla.png)


Let’s say we want to display our composited tile: `santa_cruz_plus_la-5-5-12.mvt` at `z6`. 

We know that as zoom levels increase, each tile divides into four smaller tiles. We can calculate each the `zxy` of the z6 tiles using the formula outlined below. There are also libraries, such as [*mapbox/tilebelt*](http://github.com/mapbox/tilebelt) that calculate the parent or children tiles for you, as well as other tile math calculations.



If the `zxy` is `5/5/12`, the `z6` children tiles are located at: 

| z, 2x, 2y
**6/10/24**     | z, 2x + 1, 2y
**6/11/24**     |
| ------------------------- | ----------------------------- |
| z, 2x, 2y +1 
**6/10/25** | z, 2x + 1, 2y + 1
**6/11/25** |


`**vtcomposite**` **code:** 


    const santaCruzAndLABuffer = fs.readFileSync('/santa_cruz_plus_la-5-5-12.mvt');
    
    const tiles = [
      {buffer: santaCruzAndLABuffer, z:5, x:5, y:12}
    ];
    
    //map request 
    const zxy = {z:6, x:10, y:24};
    
    composite(tiles, zxy, {}, (err, vtBuffer) => {
      fs.writeFileSync('/santa_cruz_plus_la-6-10-24.mvt', vtBuffer);
    });

In this example, the tile being requested is at z6, but our source tile is a z5 tile. Remember! Our tiles have a min zoom of 0 and a max zoom of 5. We don’t have tiles available at z6. In this scenario, we must **overzoom**. 

Each zoom level scales geometries by a power of 2. Thus, you can calculate coordinates at each zoom level knowing the original geometry and the (over)zoom factor. 

In this scenario, our zoom factor is 1. (`zoom 6 - zoom 5 = zoom scale of 1`) 


      // original geometry = Santa Cruz tile coordinate at 5/5/12
      const originalGeometry = {x:637, y:1865};
      let x = originalGeometry.x;
      let y = originalGeometry.y;
      
      //increasing geometry size by a zoom factor of 1 
      const zoom_factor = 1; 
      
      const scale = Math.pow(2,zoom_factor); //1 << 1 
      
      //scale x and y geometries by the zoom_factor 
      let xScale = x*scale;
      let yScale = y*scale;
      
      //divide the scaled geometries by the tile extent (4096) to see the point moves to another tile 
      let xtileOffset = Math.floor(xScale/4096);
      let ytileOffset = Math.floor(yScale/4096);
      
      //subtract the difference between the x and y tileoffsets. 
      let xOffset = xScale - (xtileOffset * 4096);
      let yOffset = yScale - (ytileOffset * 4096);  
    
      //the xOffset and yOffset will be the x,y point at z6


Based off these equations, we know that resulting `(x,y)` point geometries for Santa Cruz and Los Angeles overzoomed at `z6` are: 


    Santa Cruz point = [1274, 3730] at zxy 6/10/24
    Los Angeles point = [90, 2318] at zxy 6/10/25


## Clipping

Wait a second…! Los Angeles isn’t the tile we requested - `{z:6, x:10, y:24}` at `z6`…it’s in `{z:6, x:10, y:25}`. 

That means we need to **clip** the overzoomed geometries to only include the point(s) we need for tile  `{z:6, x:10, y:24}`. Since Santa Cruz is the only geometry in `{z:6, x:10, y:24}`, we **clip** extraneous data, which means we clip any geometries that are not included in the `z6` tile, but *are* included in the parent tile that’s been overzoomed - see ya Los Angeles! 


## Ok…Let’s composite AND overzoom! 


1. Let’s add tilebelt to our project! 

`npm install tilebelt --save` 

`touch tilebelt.js` 

Add the following code to the file. 


    var tilebelt = require('@mapbox/tilebelt');
    
    var tile = [5,12,5] // x,y,z
    
    console.log(tilebelt.tileToGeoJSON(tile));
    console.log(JSON.stringify(tilebelt.getChildren(tile), null,2));


2. Run `node tilebelt.js` to see the children tiles `z/x/y`. 

You’ll see the same table output listed above, in an array! 


3. Now, go to [mapsam.com](http://mapsam.com/map/)


4. Type `5/5/12` in the `zxy` form field 


5. Zoom in on that tile until you reach `z6` 

Congrats! You see the same `zxy` that tilebelt generated for us! 


6. Navigate to `composite/2-overzoom-points.js` 


7. Change L24 so `const zxy= { z: 6, x: 10, y: 24}`. Uncomment L26 - L28 and run `node composite/2-overzoom-points.js`


8. View the output tile `points_composited_overzoomed.mvt` in mvt-cruncher. 

There are only 4 points! Why? 

The z6 tile requested only contains 1/4 of the original z5 tile. The area of `5/5/12` tile that doesn’t overlap with `6/10/24` is **clipped**, because we don’t care about the data that isn’t part of our tile request! 


## Tile Buffers  

In compositing, we have the opportunity to use tile buffers to clip data that is outside the tile we requested. 


1. Change L26 to include a `{buffer_size:4090}` param as an arg in the `composite` function. 


    composite(tiles, zxy, {buffer_size:4090}, (err, vtBuffer) => {
      const outputInfo = vtinfo(vtBuffer);
      fs.writeFileSync('tiles/points_composited_overzoomed.mvt', vtBuffer);
      console.log('output buffer', outputInfo);
    });


2. Run `node composite/2-overzoom-points.js`


3. View the output tile in mvt-cruncher 

It has 5 points! (There’s a one allllll the way over there in the right hand corner!) 


# Tile Operations - What is Shaving? 

Shaving is simply removing layer(s) from a tile at various zoom levels. If there are layers that are not used at specified zoom levels, then we can remove - or shave - those layers from a tile. 


1. `npm install @mapbox/vtshaver` `--``save` 


1. Run `node shave/1-shave.js`.  

What output do you see? You should see an “original” single tile buffer - two layers with three features. 


    Original Buffer 1
     VectorTile {
      layers: 
       { 'sf ice cream': 
          VectorTileLayer {
            version: 2,
            name: 'sf ice cream',
            extent: 4096,
            length: 1,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] },
         'sf grocery': 
          VectorTileLayer {
            version: 2,
            name: 'sf grocery',
            extent: 4096,
            length: 2,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] } } }


The output buffer has “shaved” all layers except `sf grocery`, because we’ve `styledtoFilters`. 


    output buffer VectorTile {
      layers: 
       { 'sf grocery': 
          VectorTileLayer {
            version: 2,
            name: 'sf grocery',
            extent: 4096,
            length: 2,
            _pbf: [Object],
            _keys: [Object],
            _values: [Object],
            _features: [Object] } } }


2. Change the `options` zoom value to `6`. What happens? 

We return an empty tile because we’ve specified that the style filter only goes up to `z5`. 


    output buffer VectorTile { layers: {} }

**So…why do we shave tiles?** 
So tiles are smaller and travel faster to our maps! 


# Tile Operations - What is querying? 

Querying tiles. Figure out what geometries is close to a specific  `lat/long`. 


1. `npm install @mapbox/vtshaver --save` 


2. Run `node query/1-query.js` 

What output do you see? 

All 5 point features are within 1mil meters from the Santa Cruz - at long/lat, `-122.0308, 36.9741`. 

    results { type: 'FeatureCollection',
      features: 
       [ { type: 'Feature',
           id: 1,
           geometry: [Object],
           properties: [Object] },
         { type: 'Feature',
           id: 2,
           geometry: [Object],
           properties: [Object] },
         { type: 'Feature',
           id: 2,
           geometry: [Object],
           properties: [Object] },
         { type: 'Feature',
           id: 1,
           geometry: [Object],
           properties: [Object] },
         { type: 'Feature',
           id: 3,
           geometry: [Object],
           properties: [Object] } ] }


3. Change the radius to `500000`. How many features are returned? 

You should see 4 features! 


4. Remove `sf ice cream` from the layers list. How many features are returned? 

You should see 3 features! 


5. Change `zxy` to  `const zxy= { z: 6, x: 10, y: 24}`. What happens? 
# Tile Operations - How do we validate tiles? 

We want to be able to know if tiles are valid! We can check using the `vtvalidate` library. 


1. `npm install @mapbox/vtvalidate --save`


2. Run `node validate/validate.js`

We’re validating that the same tile we’ve been using throughout this tutorial `tiles/point_1-10-20.mvt` is valid…guess what! It is. 


3. Change `buffer1` so it reads `tiles/invalid.mvt`

This tile is invalid and we see a new message. 😛 

`result unknown geometry type`





