---
layout: default
title: Integrating Leaflet with Events
permalink: /14-events-popups
prevch: /13-bootstrap
nextch: /15-go-live
---

The “Could Be” Project is coming along nicely, as is, I hope, your own
project. In between chapters, I added some code so that the poem would load
inside `#poem` using the same technique for the tabs. We’ll be working with
that a bit in this chapter, as this chapter is devoted to integrating Leaflet
with the rest of the page. In my own wireframing for the “Could Be” Project
that I mentioned in the [previous chapter](/13-bootstrap), I wanted it to be
the case that when the user clicks on a place in the poem, that has the map zoom to
that place and also reveals the tab holding the information for that place.

There are a few ways to do this, but I will choose one that is a bit more
involved, so that you can see other applications of jQuery.

<section id="adding-links">
## Adding links to the poem

We have the text of the poem appearing inside `#poem`, but it’s “plain”
text--it has no markup or `<a>` tags. How can we tell jQuery to wrap the place
names in tags? Start with just one example, “Hastings Street”:

```javascript
$.ajax({
  url: "https://the-javascripting-english-major.org/examples/markdown/poem.md",
  success: function(poem){
    let html;
    html = md.render(poem);
    $("#poem").html(html);
    // The above is the same as the $.ajax() call in the prev. ch.
    $("#poem").html(function(_, oldHtml){
      let newHtml;
      newHtml = oldHtml.replace(/Hastings Street/g, "<a href='#' data-place='hastings-street'>Hastings Street</a>");
      return newHtml;
    });
  }
});
```

Those added five lines are doing quite a bit, so I’ll walk through them
step-by-step:

1. `$("#poem")`: Select `#poem`.
1. `.html(`: Use the `.html()` method on the selected content. Recall that
   `.html()` by itself *gets* the HTML. `.html("string")` *sets* the HTML. Now
   we see that `.html(function())` *manipulates* the HTML.
1. `.function(_, oldHtml){`: The anonymous function inside the `.html()`
   method inherits two variables, an index value I am calling `_`, and the
   “old” HTML, which I am calling `oldHtml`. I won’t use `_`. I’m only
   interested in `oldHtml`.
1. Define a `newHtml` variable and assign it to the result of:
1. `oldHtml.replace(`: Strings have a `.replace()` method, that lets us
   replace part of the string with a new string.
1. `/Hastings Street/g,`: A **regular expression** (more below) that basically
   means “every instance of ‘Hastings Street.’”
1. `"<a href='#' data-tab='hastings-street'>Hastings Street</a>"`: The
   replacement string. Notice the addition of a `data-tab` attribute I’ll be
   using later.
1. `return`: Return the result of `newHtml`.

Everything here should familiar to you, except for that regular expression.
Regular expressions are ways of matching string patterns that are common in
programming languages. The syntax is complex, but, as a result, “regexes” are
extremely powerful.[^regex] For the sake of this course, you only need to know
that:

1. Regular expressions are bounded by `/` on each side.
2. A `g` at the end of a regex means to match *every* occurrence of the
   pattern.
3. To use a variable in a regex, you have to define and assign the regex, as
   we’ll see below.

The code as it is works perfectly for “Hastings Street,” but, of course, we
have five places. Let’s create an array that we can loop over, then:

```javascript
  let placesArray;
  placesArray = [
    {text: "Hastings Street", tab: "hastings-street", html: "Hastings Street"},
    {text: "18th & Vine", tab: "eighteenth-and-vine", html: "18th &amp; Vine"},
```

*Wait a minute!* This looks familiar. Didn’t we do this already back in [Chapter
11](/11-geojson/)? Yes, we did. That means we can use that `couldBeFeatures`
   array of `Object`s again here. And now the point of the
   `.html` property I added back then becomes clear; to create an “&“ in HTML, you have to type
   `&amp;`.

The loop:

```javascript
$.ajax({
  url: "https://the-javascripting-english-major.org/examples/markdown/poem.md",
  success: function(poem){
    // Read in the poem.
    let html;
    // Use the Markdown-it renderer I defined last chapter.
    html = md.render(poem);
    $("#poem").html(html);
    // Once the poem is in, start the loop.
    couldBeFeatures.forEach(function(feature){
      $("#poem").html(function(_, oldHtml){
        let regex, newHtml;
        // Assign the the regex the value of feature.html and the 
        // flag “g”. This is the equivalent to /Hastings Street/g.
        regex = RegExp(feature.html, "g");
        // Fill in newHtml with the properties from the couldBeFeatures.
        newHtml = "<a href='#' data-tab='" + feature.tab + "'>" + feature.html + "</a>";
        // Return the newHtml wherever `replace()` finds the value
        // of regex.
        return oldHtml.replace(regex, newHtml);
      });
    });
  }
});
```

Hopefully, this helps you see how looping over an array objects provides yet
even more functionality.

Again, this is a slightly contrived example, and it depends on the fact that
the place names are all unique in that the regular expressions **only** match
the place names. If we had a place called “Could,” we’d be out of luck,
because there would be no easy way to tell if “Could” referred to a place or
was a regular word starting a line. Nevertheless, now you know how to
manipulate HTML, in addition to getting and setting it. With the links on the
page, though, we should make them do something.

</section>
<section id="responding-to-clicks">
## Making the links respond to clicks

You already know about jQuery’s `$("").click()` method, so building the basics
of making the links in the poem respond to clicks should be straightforward:

```javascript
$("#poem a").click(function(){
  // Do something when you click.
});
```

The jQuery selector `"#poem a"` means “every instance of an `<a>` tag inside
`#poem`. Any other `<a>` tags on the web page remain
unaffected. As for doing something, there are two new methods to introduce
here, one from Bootstrap, and one from Leaflet.

### Using Bootstrap to reveal a tab

In Bootstrap, the `.tab("show")` method can show a tab. Getting the proper
selector in jQuery is a bit trickier, but this works for the “Hastings Street”
tab:

```javascript
$("#nav-tabs a[href='#hastings-street']").tab("show");
```

The selector is telling jQuery to select the `<a>` tag within the entity with
the id `nav-tabs` that has the `href` property of `#hastings-street`. So that
works for Hastings Street, but what about for all the places? This is why I
added the `data-tab` data attribute above. We can replace the code with:

```javascript
$("#nav-tabs a[href='#" + $( this ).data("tab") + "']").tab("show");
```

Now whenever the user clicks on a link in the poem, the corresponding tab
opens under the map.

### Changing map state with a click

This one is a bit trickier, and to get it to work, we need to add two more
data attributes for each `<a>` tag in `#poem`, a `data-lat` and a `data-lng`.
Time to return to the loop above:

```javascript
$.ajax({
  url: "https://the-javascripting-english-major.org/examples/markdown/poem.md",
  success: function(poem){
    // Read in the poem.
    let html;
    // Use the Markdown-it renderer I defined last chapter.
    html = md.render(poem);
    $("#poem").html(html);
    // Once the poem is in, start the loop.
    couldBeFeatures.forEach(function(feature){
      $("#poem").html(function(_, oldHtml){
        // Define two new variables, lat and lng.
        let regex, newHtml;
        // Assign the the regex the value of feature.html and the 
        // flag “g”. This is the equivalent to /Hastings Street/g.
        regex = RegExp(feature.html, "g");
        // Fill in newHtml with the properties from the couldBeFeatures.
        newHtml = "<a href='#' data-tab='" + 
          feature.tab + 
          "' data-lat='" +
          feature.latLng.lat +
          "' data-lng='" +
          feature.latLng.lng +
          "'>" + feature.html + "</a>";
        // Return the newHtml wherever `replace()` finds the value
        // of regex.
        return oldHtml.replace(regex, newHtml);
      });
    });
  }
});
```

Now there are three data attributes, and we can harvest the latitude and
longitude for our `$().click()` callback:


```javascript
$("#poem a").click(function(){
  let tab, lat, lng;
  tab = $( this ).data("tab");
  $("#nav-tabs a[href='#" + tab + "']").tab("show");
  lat = $( this ).data("lat");
  lng = $( this ).data("lng");
  map.panTo([lat, lng]);
});
```

That is certainly a mouthful, and despite how confusing this is, this is
probably the easiest way to do this. The first draft of this chapter had a far
more complex process, because I had not thought to create the
`couldBeFeatures` array. Then the second draft was still confusing because I
did not think to use `data-lat` and `data-lng` to get coordinates in the
links. But programming is like that. There are many ways to get to the
destination, and sometimes it takes time to figure out which is the most
elegant.

</section>
<section id="popups">
## Involved Leaflet popups

Back when I [introduced Leaflet](/10-leaflet), you created a simple popup for
a marker. Because the popups are `<div>`s in their own right, it is possible
to put a lot of HTML inside of them. Here, we’ll make use of the other
properties in the GeoJSON file to create a popup that displays the lines in
which the place is mentioned and provides a link to the appropriate Wikipedia
article. To do so, we create some HTML called `popupContent` and add that when
defining the Leaflet markers. Adding the name and the link to Wikipedia is easy:

```javascript
// This is from what I added to could-be.js back in Chapter 11
couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
  let popupContent;
  popupContent = "<h4>" + feature.name + "</h4>";
  popupContent = popupContent + "Read about " + feature.name + " on <a href='"+ feature.wikipedia + "'>Wikipedia</a>.";
  return L.marker(feature.latLng).bindPopup(popupContent);
  })
);
```

The `.bindPopup()` method takes a string of HTML for the marker’s popup. The
lines are a bit more complex because sometimes a place is only mentioned on
one line, and sometimes it’s mentioned on more than one:

```javascript
couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
  let popupContent, lines;
  popupContent = "<h4>" + feature.name + "</h4>";
  if (feature.lines.length > 1){
    lines = "lines " + feature.lines.join(" and ");
  } else {
    lines = "line " + feature.lines[0];
  }
  popupContent = popupContent + feature.name + " is mentioned on " + lines + ".<br />";
  popupContent = popupContent + "Read about " + feature.name + " on <a href='"+ feature.wikipedia + "'>Wikipedia</a>.";
  return L.marker(feature.latLng).bindPopup(popupContent);
  });
);
```

Of course, if a place were mentioned three times, then we’d have something
like “mentioned on lines 1 and 3 and 5.” It’d be possible to use regular
expressions to turn that into “lines 1, 3, and 5,” but that can be extra
credit, or something. But you can see that a lot of information can be crammed
into a popup. It’d even be possible to use an `$.ajax()` call to load in a
Markdown document! 

While we’re working with popups, however, I’d like to sneak in one last
change. I’d rather have the markers be tiny circles, and I’d like the circle
to be larger if a place is mentioned more times. In addition to `L.marker`,
Leaflet also offers `L.circleMarker`, which can take an option for a `.radius`
property. And while we’re at it, let’s give the markers a fun color:

```javascript
couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
  let popupContent, lines;
  popupContent = "<h4>" + feature.name + "</h4>";
  if (feature.lines.length > 1){
    lines = "lines " + feature.lines.join(" and ");
  } else {
    lines = "line " + feature.lines[0];
  }
  popupContent = popupContent + feature.name + " is mentioned on " + lines + ".<br />";
  popupContent = popupContent + "Read about " + feature.name + " on <a href='"+ feature.wikipedia + "'>Wikipedia</a>.";
  return L.circleMarker(feature.latLng, { 
    radius: 10 * feature.mentions, 
    color: "#d33682", 
    fillColor: "#d33682" 
    }).bindPopup(popupContent);
  });
);
```

The `.radius` property is multiplied by the `.mentions` property as defined in
the GeoJSON document. This works, but is, incidentally, extremely bad design.
A circle with a radius of 20 (10 &times; 2 mentions) is not twice the size of
a circle of radius 10 (10 &times; 1 mention), because the areas of two circles
are proportional to their radii *squared*. As a result, we’re better off if we
multiply the radius by the *square root* of the mentions, if we want the
circle to be twice as large. Easy enough. Just change the line that assigns
the `.radius` property to:

```javascript
radius: 10 * Math.sqrt(feature.mentions), 
```

</section>
<section id="how-did">
## How did you do that?

This chapter relied a lot on trial and error on my part to make sure
everything worked correctly, so here I’ll mention two valuable suggestions for
when you’re designing your own project.

First, any variable you define globally (not inside a function, for our
purposes) in JavaScript is available in the JavaScript console. For example,
if you look at the [“Could Be” Project for the end of Chapter
14](/examples/could-be14.html), and you open the console on that page, you can
   type:

```javascript
> couldBeFeatures;
//--> [Object, Object, Object, Object, Object]
```

This tells you that `couldBeFeatures` is an array of `Object`s. Similarly,
there’s probably a little disclosure triangle (▶) next to the array that you
can click on that shows the properties for each object. On the other hand:

```javascript
> map;
//--> e {options: Object, _container: <div id="could-be-map">, _leaflet_id: 2, _containerId: 3, _fadeAnimated: true, …}
```

Again, the disclosure triangle will open up the `map` Leaflet `Object` so you
can see all of its properties. Sometimes it’s valuable to dig into those
objects to find places where you can hook into the `Object` to add
interactivity. Even non-global variables can be sent to the console using our
old friend `console.log(variable)`. 

Second, when it comes to styling, it’s possible to drill down the disclosure
triangles on the elements tab to see how, for example, popups are styled. If
you click on one of the markers, so that its popup shows, you can see on the
elements tab a tree of HTML like this:

```html
<div id="could-be-map" …>
  <!-- Everything below is generated by Leaflet -->
  <div class="leaflet-pane leaflet-map-pane" …>
    <div class="leaflet-pane leaflet-tile-pane">…</div>
    <div class="leaflet-pane leaflet-shadow-pane"></div>
    <div class="leaflet-pane leaflet-overlay-pane">…</div>
    <div class="leaflet-pane leaflet-marker-pane"></div>
    <div class="leaflet-pane leaflet-tooltip-pane"></div>
    <div class="leaflet-pane leaflet-popup-pane">
      <div class="leaflet-popup leaflet-zoom-animated"…>
        <div class="leaflet-popup-content-wrapper">
          <div class="leaflet-popup-content">
```

The Leaflet panes are in descending order. The first pane (or layer) is the
tiles. Then the shadows (for markers), then the overlay pane (where our
`circleMarkers` are), then the marker pane, tooltip pane, and, finally, the
popup pane. When a marker is clicked on, Leaflet creates the `.leaflet-popup`
`<div>` and populates it with the popup’s contents. But as you can see, if you
were to style `.leaflet-popup-content` in your `.css` file, you could, say,
change the font of the popups, for example. Or give them a background color
other than white. The popups are just HTML, meaning they react the same styles
you define in your `.css` file as the rest of the page.

As a result, the answer to “How did you do that?” is not only usually “drilled
down into the details,” but also “just like you can.” The details of the
“Could Be” Project are visible to anyone who wants to look at them.
</section>

<section id="exercises">
## Exercises

1. Add interactivity between your page and your map in your project.
1. Create rich popups for your map.
</section>

## Footnotes

[^regex]: Both Haverbeke and Crockford devote entire chapters to regexes. You can use the [Regular Expressions 101](https://regex101.com/) app to test your regexes if you want to learn more, but be sure to pick the JavaScript flavor from the menu on the left.
