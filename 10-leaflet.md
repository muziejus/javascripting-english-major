---
layout: default
title: Leaflet
permalink: /10-leaflet
prevch: /9-dataset
nextch: /11-geojson
---

As I wrote in the [previous chapter](/9-dataset), a whole lot happened in it,
but really, the tools were all the same sort of tools we have been using all
course: strings, arrays, `Object`s, a few `.forEach()` method calls and some new
jQuery tricks.  This is important to emphasize: you already have the tools at
your disposal; the trick is to realize what kinds of tools the situation calls
for. The solution to use JSON to feed the whole General Prologue into the page
may have been unexpected, but if you had just repeated making the `line1`
array with a `line2` array all the way up to `line18`, you would have been
doing the same exact thing, just less efficiently.

Most importantly, however, was the added level of conceptual complexity. In
using JSON, you separated out the data (the text of the General Prologue) from
the logic of the program. Our webpage made assumptions about how the data were
organized (a `.lines` property that was an array of arrays of word-`Object`s),
and then you wrote an application around it. When the data structures get more
complex, it becomes more and more important to be confident of the data’s
integrity, and to write around it. You’ll see what I mean now that we are
moving into making JavaScript maps using Leaflet.

<section id="map-structure">
## Map structure

It’s probably a safe assumption that you’ve used a map on a webpage before,
like Google Maps or [OpenStreetMap (OSM)](https://www.openstreetmap.org).
It might help to imagine, abstractly, what’s going on in a web map before we
start building our own.

1. First, a map goes in an HTML **container** that isolates the map from the
   rest of the webpage. We’ll use a generic container, a `<div>`, for this.
1. Next, a map has “the map itself,” which is called the **tile layer** or
   **base layer**. This is a layer of images (assembled like tiles) with roads
   and parks and buildings drawn on them.  Google has a specific style they
   use, and OSM uses a few different ones.  For many uses of web maps, this is
   it. 
1. Above the tile layer can be, however, an **overlay** layer. This provides
   added content, like a **marker** or a **polyline** (a line made up of many
   segments, like driving directions) or even a **polygon**. If you search for
   something in Google Maps, for example, it will draw something on the
   overlay layer to let you know where what you’re looking for is.
1. Above the overlay layer is the **popup** layer. When you click on a marker,
   sometimes a little popup appears. This is typically on a separate layer
   from the marker, so that it appears above it (and the other markerts).
1. Finally, we have the **control** layer. This includes controls
   for zooming in and out and maybe other controls, depending. It’s always on
   the top of all of the layers.

Most of these layers are of the set-it-and-forget-it variety. We’ll be working
mostly with the overlay and popup layers.  The rest provide either usability
(controls) or context (tile layer). In other words, we won’t be redrawing OSM
maps. We’ll be drawing on top of them. 

</section>
<section id="leaflet-tour">

## Tour of Leaflet

[Leaflet.js](http://leafletjs.com) is a JavaScript library for making maps on
the web. Unlike other software for making web maps, like ESRI’s ArcGISOnline
or Google Maps, Leaflet is entirely free and, more importantly, both easier to
use and more permissive of a wide array of customization. Much of this chapter
builds on their [quick start
guide](http://leafletjs.com/examples/quick-start/), but I think I’ll provide
extra context to help you with thinking through your own project.

Leaflet creates an `Object`, `L`, that has a bunch of methods that we can use to
create and manipulate maps. Our map is, itself, an `Object`. The tile layer? A
different `Object`. Markers are `Object`s, polylines are `Object`s, polygons are
`Object`s, popups are `Object`s, and so on. And they have properties and methods,
too. 

### Setting up the HTML 

The best way to show how these `Object`s work, of course, is by making them
work. So let’s get started. In Atom, open up your `index.html` file and add
another link below the one to the Prologue:

```html
<h2><a href="leaflet.html">Leaflet page</a></h2>
```

Save and close `index.html`. Now, create a new document, `leaflet.html`, that
looks like this:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Working with Leaflet</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
   crossorigin=""/>
    <link rel="stylesheet" href="leaflet.css" />
  </head>
  <body>
    <div class="container">
      <h1>Working with Leaflet</h1>
      <div id="first-map" class="map"></div>
      <p>Above, you can see a Leaflet map.</p>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js" integrity="sha512-lInM/apFSqyy1o6s89K4iQUKg6ppXEgsVxT35HbzUupEVRh2Eu9Wdl4tHj7dZO0s1uvplcYGmt3498TtHq+log==" crossorigin=""></script>
    <script src="leaflet.js"></script>
  </body>
</html>
```

In the `<head>`, there are two changes from before. First, the page is also
loading Leaflet’s own CSS files. Second, the page is loading `leaflet.css`.
Unlike in the [example with the General Prologue](/9-dataset), CSS will be
important in this chapter.

In the `<body>`, there is a `<div>` with an id `#first-map` and class `.map`.
That’s where the map will go. And at the bottom, note that the page is loading
Leaflet and a new file, `leaflet.js`. That’s about it for HTML in this
chapter. 

If you save and reload your `index.html` in the browser, the link to
`leaflet.html` will appear. When you click on it, you should see some text,
but no map. Commit. Let’s get to work on getting the map to show.

### Setting up the CSS

Create a new file in Atom called `leaflet.css`. Type in these three lines:

```css
.map {
  height: 400px;
}
```

This means that everything that has a class `.map` should have its `height`
property set to 400 pixels. You can change this number if you like, but the
property must be there. Leaflet’s one demand of CSS is that the map container
have a defined `height`. Save and reload `leaflet.html` in the browser. Now
the line “Above, you can see a Leaflet map.” should be separated from the
`<h1>`, “Working with Leaflet,” by a considerable amount of white space.

### Initializing the Leaflet map

Now create the last file for this chapter in Atom, `leaflet.js`. In it, type:

```javascript
let firstMap;
firstMap = L.map("first-map");
```

`firstMap` is now an `Object` you can use in JavaScript to control the map on the
webpage. Note the syntax. `.map()` is a method that `L` (Leaflet) has that
creates a map in the `<div>` with the id given as the parameter. If you save
everything and reload `leaflet.html` in the browser, you should see a map.

But it will be a boring, gray map. Why? For starters, because you have not loaded a tile
layer. Define a variable `tileLayer` and assign it:

```javascript
let firstMap, tileLayer;
firstMap = L.map("first-map");
tileLayer =
L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
      attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://carto.com/attribution'>CARTO</a>",
      subdomains: "abcd",
      maxZoom: 18
    });
```

The details of the tile layer are not important, but you should note that if
you save and reload, you still get a boring, gray map.[^tilelayer] The tile
layer needs to be added to the map, of course, but then the map also has to be
told what part of the world to show:

```javascript
tileLayer.addTo(firstMap);
firstMap.setView([40.730833, -73.9975], 16);
```

Save and reload. You should now see a map zoomed in on Washington Square Park.
Commit, if that’s the case. Whenever we create an `Object` in Leaflet, be it a
tile layer, marker, or whatever, we have to add it to the map, using
`.addTo()`, a method that all of these `Object`s have. The map itself has a
method, `.setView()`, that takes two parameters: an array of coordinates
(latitude and longitude), and a zoom level. The highest zoom level—which is to
say, the most zoomed in, is 19. We’ll learn about other, similar methods as we
continue. But now the map itself is initialized.

### Adding a marker and popup

With the map zoomed in like this, we can add a marker to [Bobst
Library](https://en.wikipedia.org/wiki/Elmer_Holmes_Bobst_Library). For people
unfamiliar with NYU, this library is on the edge of the park.[^bobst] From the
Wikipedia article, we can get Bobst’s coordinates, 40.729444 and -73.997222.
Initializing a marker is similar to the tile layer:

```javascript
let bobstLibrary;
bobstLibrary = L.marker([40.729444, -73.997222]);
bobstLibrary.addTo(firstMap);
```

Binding a popup to the marker is one more step:

```javascript
bobstLibrary.bindPopup("This is Bobst Library.");
```

When you add those lines to `leaflet.js`, save, and reload, the marker should
appear right over the library. Click on the marker, and the popup appears.
Everything works? Commit.

</section>
<section id="coordinates">

## Coordinates

The [next chapter](/11-geojson) is devoted to building up data sets of
geographical information, but in this chapter, we’ll keep using toy data so
that you get familiar with Leaflet. Both with the marker `Object` and the
`.setView()` method, you saw that Leaflet demanded coordinates. Leaflet
doesn’t know where places are, and it knows nearly nothing about
distances.[^distance] All it knows are latitude and longitude coordinates. In
fact, these are their own `Object` in Leaflet:

```javascript
let bobstCoords;
bobstCoords = L.latLng(40.729444, -73.997222);
firstMap.panTo(bobstCoords);
```

Here, `bobstCoords` becomes a `latLng` `Object`, created by using the
`L.latLng()` method with two parameters, a latitude and a longitude. Note that
`latLng` has a capital “L” in the middle.  Throughout Leaflet, you can either
create `latLng` `Object`s or continue using coordinate arrays like you did
earlier. Now consider the `.panTo()` method at the end. That’s a method that
changes a map, in this case `firstMap`. If you save and reload, you’ll see
that the map is now centered on the library, not the park. If you open the
console and type in:

```javascript
> let eiffelTower;
> eiffelTower = L.latLng(48.858222, 2.2945);
> firstMap.panTo(eiffelTower);
```

You can watch the map swing over to the Eiffel Tower in Paris. 

This much is clear, then, but *finding* coordinates can be tricky when
creating datasets, so here are four tips:

1. The coordinates I have used so far in this chapter come from Wikipedia.
   Many places have coordinates listed in the top right corner of their
   Wikipedia pages. If you click on them, it takes you to a GeoHack page,
   which includes the coordinates in decimal format. Leaflet won’t understand
   coordinates given in arc-minutes and arc-seconds.
1. In Google Maps, if you click on a point, a little window appears at the
   bottom with the address (if it can guess it) and the coordinates.
1. For larger entities, like countries, sometimes they have a single
   coordinate associated with them. You can look that up at
   [GeoNames](http://www.geonames.org), a gazetteer. For France, for example,
   GeoNames gives `[46, 2]`, which is more or less in the middle of
   L’Hexagone. 
1. Converting to decimal degrees can cause errors. You can use sites like
   [LatLong](http://www.latlong.net/degrees-minutes-seconds-to-decimal-degrees)
   to do the conversion, but always do a sanity check afterward, especially
   when you have data on both sides of the Prime Meridian, the antimeridian,
   or the Equator.

Finally, coordinates from Google Maps, when taken out to six significant
digits, give an illusion of precision that is unwarranted. At American
latitudes, the difference between one ten-thousandth of a degree (4 digits) in
longitude is only a few meters. And the difference in latitude is not much
greater, as I’ll show in the next section.

## Beyond the marker

In addition to making markers, Leaflet can also build polylines, polygons, and
circles. The syntax for the first two is identical: you build an array of
coordinates and feed it as a parameter to either the `L.polyline()` or
`L.polygon()` methods. Delete everything pertaining to Bobst Library from
`leaflet.js`, and add:

```javascript
let washingtonSquarePark, washingtonSquareParkMarker;
let tenThousandth, tenThousandthPolygon, thousandth, thousandthPolyline;
washingtonSquarePark = L.latLng(40.730833, -73.9975);
washingtonSquareParkMarker = L.marker(washingtonSquarePark).addTo(firstMap);
tenThousandth = [[40.7307, -73.9976], [40.7307, -73.9974], 
                 [40.7309, -73.9974], [40.7309, -73.9976]];
tenThousandthPolygon = L.polygon(tenThousandth, {
                                  color: "#268bd2",
                                  fillColor: "#fdf6e3"
                                }
                        ).addTo(firstMap);
```

Here you add a marker at the center of Washington Square Park
(`washingtonSquareParkMarker`) and then construct an array of coordinates,
`tenThousandth`, which is a box two ten thousandths of a degree wide and tall,
more or less centered around the marker.
Then you add that to the map. Notice that I’ve collapsed assigning the leaflet
`Object` with the `.addTo()` method. Furthermore, the `.polygon()` method can
take an `options` `Object` parameter as well, and, in this case, I defined the
`tenThousandthPolygon.options.color` property as a shade of blue and the
`.fillColor` property as a light yellow. 

There are also two variables here that are not assigned, but are declared:
`thousandth` and `thousandthPolyline`. Use them so:

```javascript
thousandth = [[washingtonSquarePark.lat + 0.001, washingtonSquarePark.lng + 0.001],
              [washingtonSquarePark.lat + 0.001, washingtonSquarePark.lng - 0.001],
              [washingtonSquarePark.lat - 0.001, washingtonSquarePark.lng - 0.001],
              [washingtonSquarePark.lat - 0.001, washingtonSquarePark.lng + 0.001]];
thousandthPolyline = L.polyline(thousandth, {color: "#d33682"}
                      ).addTo(firstMap);
```

Save and reload, and your Leaflet map should now show both a polygon and three
line segments, or a polyline. Notice how, because I defined
`washingtonSquarePark` as an `L.latLng` `Object`, it now has two properties,
`.lat` and `.lng`, corresponding to its latitude and longitude. This is one
reason to make use of the `L.latLng` `Object` instead of just continuously using
arrays of coordinates. 

Circles are even easier:

```javascript
let circle;
circle = L.circle(washingtonSquarePark, {radius: 100,
                                         color: "#859900",
                                         fillColor: "#cb4b16",
                                         opacity: 0.9,
                                         fillOpacity: 0.25}
          ).addTo(firstMap);
```

The `L.circle.options.radius` property is measured in meters. Note also that
Leaflet provides you with control over the opacity of both the border and the
fill. `L.circle`, `L.polygon`, and `L.polyline` all inherit these options from
the Leaflet `Object` `L.path`, and Leaflet provides a list of [all of that
`Object`’s options](http://leafletjs.com/reference-1.2.0.html#path) that you can
look at to style your lines and polygons as you like. Similarly, there are two
`Object`s I don’t mention that you might like to look up. Instead of
`L.marker`s, you can use
[`L.circleMarker`s](http://leafletjs.com/reference-1.2.0.html#circlemarker) (I
actually prefer them), and there is also a vanilla
[`L.rectangle`](http://leafletjs.com/reference-1.2.0.html#rectangle) `Object`,
similar to what we built for the `tenThousandthPolygon` above. Circlemarkers
will return in a later chapter.

</section>
<section id="exercises">
## Exercises

1. Create two new files, `derive.html` and `derive.js`. Have them include a
   Leaflet map with the two dérives you made for class drawn on them. Or it
   can be two walks you’ve taken, if you’re not in my class. The dérives
   should be different colors. Save, commit, and push to GitHub when you’re
   done.

</section>

## Footnotes

[^tilelayer]: In creating the tile layer, you specify the server from which Leaflet should get its tiles (in this case from `cartocdn.com`), and then add three options. The `attribution` option describes what appears in the bottom corner of the map.

[^bobst]: Bobst is also where most of this course was drafted.

[^distance]: There is a `.distance()` method that will calculate the distance, in meters, between a `LatLng` `Object` and another one passed as the parameter.
