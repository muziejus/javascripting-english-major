---
layout: default
title: Geographical Data
permalink: /11-geojson
---

Typing up the coordinates for the [last homework
assignment](/10-leaflet#exercises) was, I imagine, not a lot of fun. It’s also
silly for me to assert, in the [previous chapter](/9-dataset), that it’s
important to separate data wrangling from programming logic, only to then have you
run them together again. But the data structure for representing geographical
objects in JavaScript, **GeoJSON**, is complex enough to warrant its own
chapter. That is this chapter, and in it we’ll be doing a bit of detective
work on a short poem in order to generate our data set.

<section id="could-be">
## Langston Hughes’s “Could Be”

In this chapter, we’ll be working with Langston Hughes’s poem, “Could
Be.”[^could-be] The
complete text is available at [Song of
America](http://www.songofamerica.net/song/could-be), so I encourage you to
read it there. One thing jumps out at me when I look at it, namely that Hughes
refers to geographical spaces in seven out of 16 lines of poetry, repeating
two of them. The five distinct places are:

* Hastings Street
* Lenox Avenue
* 18th & Vine
* 5th & Mound
* Rampart

When thing about this poem recently, I decided to try and map these five
locations and see if anything came of the mapping. Thus began a bit of
literary investigation. But first, I have to ask myself (as do you, when
building your own geographical dataset), what that dataset will contain,
precisely?

</section>
<section id="geographical-data-sctructure">
## Geographical data structure

For these five locations, clearly I need their names, so I can tell them
apart. I also need their coordinates. In other words, I’m already thinking
about the data in terms of properties. Every `Place` object will have a
`.name` property and a `.coordinates` property. Better: it’ll have both a
`.lat` property for its latitude and a `.lng` property for its longitude. 

What else could I include? How about how many times each place is mentioned?
OK, that’s a `.mentions` property. Then maybe the line number? OK, that’s the
`.line` property. But wait, two places are mentioned twice. How will the
`.line` property work there? Maybe `.line` should be an array, then, or
`.lines`. Finally, if the place has a Wikipedia article related to it, we can
include that link as `.wikipedia`.

A way of thinking about objects and properties that might be a bit more
familiar to you is as rows and columns in a spreadsheet. That is, each row is
its own `Place` object, and each column is a property associated with it. In
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

GeoJSON is a subset of the JSON we used when working with Chaucer’s General
Prologue



</section>
<section id="exercises">
## Exercises


## Footnotes

[^could-be]: Alba Newmann Holmes introduced me to this poem when presenting a paper, “‘Could Be’: Langston Hughes as Situationist Cartographer,” at a special session I convened at the [MLA Convention in 2015](https://moacir.com/talks/mla-15-geocritical-explorations-inside-the-text/).
