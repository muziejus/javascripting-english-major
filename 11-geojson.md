---
layout: default
title: Starting a Geographical Data Project
permalink: /11-geojson
---

Typing up the coordinates for the [last homework
assignment](/10-leaflet#exercises) was, I imagine, not a lot of fun. It’s also
silly for me to assert, in the [chapter before last](/9-dataset), that it’s
important to separate data wrangling from programming logic, only to then have you
run them together again. But the data structure for representing geographical
`Object`s in JavaScript, **GeoJSON**, is complex enough to warrant its own
chapter. That is this chapter, and in it we’ll be doing a bit of detective
work on a short poem in order to generate our dataset. This chapter also marks
the beginning of the end of the course, as we’ll be working on this dataset
for the rest of the chapters. We’ve come so far in so short a time.

<section id="could-be">
## Langston Hughes’s “Could Be”

The “final project” for this course is a look at Langston Hughes’s poem,
“Could Be.”[^could-be] The complete text is available at [Song of
America](http://www.songofamerica.net/song/could-be), so I encourage you to
read it there. In 16 lines of poetry, Hughes manages to refer to five
different geographical spaces in the United States, with two of them being
mentioned twice apiece. The places he mentions are:

* Hastings Street
* Lenox Avenue
* 18th & Vine
* 5th & Mound
* Rampart

I was thinking about this poem recently and wondered if mapping it might open
up any sort of new interpretive angles into it. It’s also a good poem for
teaching mapping, because the amount of data is small but important to the
text as a whole. 

Yet in converting a poem into data, a scholar has to at the same time wonder
what that data should look. Remember, data are captured, so what information
should we capture when trying to represent this poem?

</section>
<section id="geographical-data-structure">
## Geographical data structure

For these five locations, clearly I need their names, so I can tell them
apart. I also need their coordinates. In other words, I’m already thinking
about the data in terms of properties. Every `Place` `Object` will have a
`.name` property and a `.coordinates` property. Better: it’ll have both a
`.lat` property for its latitude and a `.lng` property for its longitude. 

What else could I include? How about how many times each place is mentioned?
OK, that’s a `.mentions` property. Then maybe the line number? OK, that’s the
`.line` property. But wait, two places are mentioned twice. How will the
`.line` property work there? Maybe `.line` should be an array, then, or
`.lines`. Finally, if the place has a Wikipedia article related to it, we can
include that link as `.wikipedia`.

A way of thinking about `Object`s and properties that might be a bit more
familiar to you is as rows and columns in a spreadsheet. That is, each row is
its own `Place` `Object`, and each column is a property associated with it. In
fact, that’s what I did for this poem. As we can see, filling in the data is
pretty easy for each property *except* `.lat`, `.lng`, and `.wikipedia`. Those
require some digging.

</section>
<section id="geo-sleuthing">
## Geo-sleuthing

How to fill in those coordinates, though? There’s some immediate low-hanging
fruit, luckily. Lenox Avenue clearly refers to the [avenue that runs through
Harlem](https://en.wikipedia.org/wiki/Lenox_Avenue). Similarly, 18th & Vine is
a [cradle of jazz in Kansas
City](https://en.wikipedia.org/wiki/18th_and_Vine-Downtown_East,_Kansas_City).
Wikipedia even gives coordinates for the latter location, so I put those in
the spreadsheet.

Lenox Avenue, on the other hand, is a long avenue. How can one point capture
all of it? One option would be to draw a line, of course. The other option
would be to arbitrarily select a point on the line. If you feed “Lenox Avenue”
into Google Maps, for example, it makes that arbitrary decision for you and
gives you coordinates between 127th and 128th Streets. That feels about right.

Rampart provides a different obstacle. It’s a reference to [Rampart
Street](https://en.wikipedia.org/wiki/Rampart_Street) in New Orleans, so that
sorts out the `.wikipedia` property, but the coordinates Wikipedia gives are
bonkers. They are for the intersection of St. Philip St. and N Prieur St.,
about ten blocks away from Rampart. As the Wikipedia article notes, the
intersection of Rampart and Canal was a center of African-American life in New
Orleans, and as we’re already seeing, Hughes is referring to various urban
centers of African American life. So, instead, I drop a marker at that
intersection and make note of those coordinates.

Hastings Street was the center of African-American life in Detroit’s [Black
Bottom](https://en.wikipedia.org/wiki/Black_Bottom,_Detroit) neighborhood, but
there’s a problem. The street doesn’t really exist anymore, having been
cleared away to make space for Interstate 75. I looked up old maps of Detroit
and deduced the latitude and longitude for Hastings Street that way. 

5th & Mound is trickier still. It, too, doesn’t exist anymore, the
intersection having been destroyed to make way, again, for Interstate 75.
Nevertheless, 5th & Mound had been part of Cincinnati’s Kenyon-Barr
neighborhood, which was part of the [West
End](https://en.wikipedia.org/wiki/West_End,_Cincinnati), which remains the
most African-American area in the city. Not much is available about this
neighborhood online, but the Cincinnati History Library and Archives provides
a [search
tool](http://library.cincymuseum.org/starweb/photos/servlet.starweb?path=photos/photo-session.web)
that lets the user browse their Kenyon Barr Collection, which features a
series of creepy photos of the neighborhood, taken as the city was preparing
to raze it to the ground. As *Cincinnati Magazine* notes, [25,737 people lived
in
Kenyon-Barr](http://www.cincinnatimagazine.com/citywiseblog/lost-city-kenyon-barr-queensgate/)
when the city demolished it. Either way, Mound Street still exists, as does
5th, but they no longer intersect. I extrapolated their intersection and added
those coordinates to the dataset.

The completed dataset, small as it is, is [available as a Google Sheets
document](https://docs.google.com/spreadsheets/d/1u3rlflUa6q4wAQMtqwh_-WYM2J2RIB8id4yzRNxojSM/edit?usp=sharing).
Building out the data in a spreadsheet made the data entry straightforward,
but, unfortunately, Leaflet can’t simply read a spreadsheet. We need an
intermediate step.

</section>
<section id="geojson-format">

## The GeoJSON format

You learned about JSON when working with Chaucer’s General Prologue back in
[Chapter 9](/9-dataset). A subset of it, [GeoJSON](http://geojson.org/), is a
handy way to describe geographical data, one that Leaflet understands. In
fact, we can describe our Hastings Street point in GeoJSON like this:

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-83.0370, 42.3340]
  },
  "properties": {
    "name": "Hastings Street",
    "mentions": 2,
    "lines": [1, 13],
    "wikipedia": "https://en.wikipedia.org/wiki/Black_Bottom,_Detroit"
  }
}
```

Our point is a `Feature` `Object` in GeoJSON. Notice, however, that the
coordinates are flipped. Instead of `[lat, lng]`, like in Leaflet, the
coordinates here are `[lng, lat]`. Instead of having an endless list of
potential properties, the `Feature` `Object` has three, a `.type`, a
`.geometry`, and its own `.properties` `Object`. That `Object`’s properties are
where we can stash our own properties like `.wikipedia`. I made the `.lines`
property an array by enclosing it in brackets.

With as small a dataset as the one we have for “Could Be,” generating a
GeoJSON file “by hand” would not be too difficult. However, there are online
tools that convert spreadsheets to GeoJSON. [Convert
CSV](http://www.convertcsv.com/csv-to-geojson.htm), for example, lets you even
paste in the data you copy from a spreadsheet. In the second step, you note
whether the first row is column headers (typically yes), and in the third
step, you mark which two columns feature latitudes and longitudes. 

The result is available [here](/could-be.geo.json). As you can see, the
`Feature` `Object`s are collected into an array that is the `.features` property
of a `FeatureCollection` `Object`. 
</section>

<section id="geojson-in-leaflet">
## GeoJSON in Leaflet

It’s time to start putting all this into a real project. Create a file in your
project in Atom, called `could-be.html`, and paste in this basic structure:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>“Could Be,” by Langston Hughes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
   crossorigin=""/>
    <link rel="stylesheet" href="leaflet.css" />
  </head>
  <body>
    <div class="container">
      <h1>“Could Be,” by Langston Hughes</h1>
      <div id="could-be-map" class="map"></div>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js" integrity="sha512-lInM/apFSqyy1o6s89K4iQUKg6ppXEgsVxT35HbzUupEVRh2Eu9Wdl4tHj7dZO0s1uvplcYGmt3498TtHq+log==" crossorigin=""></script>
    <script src="could-be.js"></script>
  </body>
</html>
```

This is identical to the `leaflet.html`, except the content is a bit
different, and it’s loading `could-be.js` instead of `leaflet.js`.
Furthermore, the map’s `<div>` is called `#could-be-map`.

Set up `could-be.js` similarly to `leaflet.js`:

```javascript
let map, tileLayer;
map = L.map("could-be-map");
tileLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
              attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://carto.com/attribution'>CARTO</a>",
              subdomains: "abcd",
              maxZoom: 18
            }).addTo(map);
map.setView([40.730833, -73.9975], 16);
```

Save and open `could-be.html` in the browser. If the map appears, go ahead and
commit. You can load the GeoJSON just like we loaded regular JSON, using the
jQuery `$.getJSON()` method. Now, Leaflet offers an `L.geoJSON()` method that
would make adding the GeoJSON one line of code. But, trust me on this, it will
be easier to do a bit of extra work here and avoid using that method. Instead,
we'll create an array of `object`s, `couldBeFeatures`, where each `object` has
the properties of each of the GeoJSON features. So, add to
`could-be.js`:

```javascript
// Define the features array.
let couldBeFeatures;
$.getJSON("http://the-javascripting-english-major.org/could-be.geo.json", function(data){
  // Define the Leaflet layer.
  let couldBeLayer;
  // Iterate over the .features property of the GeoJSON object to
  // extract every feature and add it to couldBeFeatures, with
  // certain properties, as noted
  couldBeFeatures = data.features.map(function(feature){
    return {
      name: feature.properties.name,
      mentions: feature.properties.mentions,
      lines: feature.properties.lines,
      wikipedia: feature.properties.wikipedia,
      // Create an L.latLng object out of the GeoJSON coordinates.
      // Remember that in GeoJSON, the coordinates are reversed
      // (longitude, then latitude).
      latLng: L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
    };
  });
  // Now create a Leaflet feature group made up of markers for each
  // object in couldBeFeatures.
  couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
    return L.marker(feature.latLng);
    })
  )
  // Add the layer to the map.
  couldBeLayer.addTo(map);
  // Redraw the map so that all the markers are visible.
  map.fitBounds(couldBeLayer.getBounds());
  // Zoom out one level to give some padding.
  map.zoomOut(1);
});
```

Notice that, except for the  definition, all of the Leaflet work is happening
inside the callback function, because `$.getJSON()` is async.[^global-layer] I
also introduce three new methods here.  `.getBounds()` returns the bounding
box that contains the entirety of a layer, in this case our `couldBeLayer`. 
That is fed as a parameter to `.fitBounds()`, which changes the map `Object`’s
state to a new zoom level and center coordinate. Then I use the map `Object`’s
`.zoomOut()` method to zoom out a smidge to make all the markers appear on the
map. `couldBeLayer`, in the meantime, is a Leaflet feature group `Object`, as
it is made up of several markers.

Save and reload. Your map should now show the whole United States and feature
five markers, one over New York, one over Cincinnati, one over Kansas City,
one over Detroit, and one over New Orleans. Otherwise, catch up with the work
I have done [over here](/examples/couldbe11.html) to see what the project
looks like.
</section>

<section id="exercises">
## Exercises

1. Design the data structure of your own final project and begin collecting
   data for it in a spreadsheet.
1. Create new HTML and JavaScript documents for your project and get your own
   personal GeoJSON data, or at least as much as you have, plotted.

## Footnotes

[^could-be]: Alba Newmann Holmes introduced me to this poem when presenting a paper, “‘Could Be’: Langston Hughes as Situationist Cartographer,” at a special session I convened at the [MLA Convention in 2015](https://moacir.com/talks/mla-15-geocritical-explorations-inside-the-text/).

[^global-layer]: `couldBeFeatures` is defined outside of the `.getJSON()` method. Defined the way it is, it has “global” scope, meaning that it will be available in later functions, as we’ll see in [Chapter 14](/14-events-popups).
