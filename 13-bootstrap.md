---
layout: default
title: Bootstrap Layout and Content
permalink: /13-bootstrap
---

In this chapter, I will present some of how Bootstrap handles layout, which
will let you conceive of how you want your project to look and present the
content you are creating.

<section id="wireframing">
## Wireframing

Web designers typically undergo a step called **wireframing**, which involves
drawing what the layout or structure of a web page should be. This helps
determine how the information is presented and how the various bits of
information interact. Because this entanglement of information is the center
of wireframing, there is no focus on fonts or colors or graphics. 

Wireframing, in short, is a way of forcing the web author to answer the
questions regarding what they want their website to do. What do they want
their users to do. What kind of information do they want to expose. 

For the “Could Be” project, there are three clear containers of information
that I want to present to the user. The first is the poem itself, in an
interactive format. The second is the map, showing the five locations
mentioned in the poem. And the third is a container showing the information I
have researched on each location, perhaps with a picture.

The ideal user in my imagination reads the poem and clicks on a place. The map
then zooms to that place, and the container fills with information about that
location. But I also want the user to be able to click through the places
without having to click on the poem.

In my head, the best way to achieve this is by having the poem on one side of
the page, and having the map atop the location information container, which
has a navigation bar atop it listing all five locations.  Bootstrap, luckily,
has tools to help us visualize a simple structure like what is in my head

</section>
<section id="bootstrap-grid">
## The Bootstrap grid

Grids help organize visual content. When items on the page (including a
webpage) do not line up, the page can be confusing and tiring to read. In
Bootstrap, when a `<div>` has the `row` class, it triggers Bootstrap’s [grid
system](https://v4-alpha.getbootstrap.com/layout/grid/), which generates a
that is twelve columns wide, leaving us to distribute those columns as we
like. 

The great part about Bootstrap’s grid is that it can be resized depending on
the width of the browser. For example, what might be two columns on a laptop
or tablet may appear as just one column (with both columns stacked atop each
other) on a smartphone. 

Each column in Bootstrap is typically also a `<div>` with a class that uses a
`col-sz-n` syntax. Here, `sz` refers to the **breakpoint**, meaning at what
size do the columns start spreading out. The breakpoints can be `sm` (phones
that are in landscape mode), `md` (tablets), `lg` (desktops), and `xl` (large
desktops). The `n`, on the other hand, is an integer between 1 and 12 that
describes how many grid columns wide the `<div>` should be.

I rewrite part of `could-be.html` to make use of the grid system:

```html
<div class="container">
  <h1>“Could Be,” by Langston Hughes</h1>
  <div class="row">
    <div class="col-md-4" id="poem">
      <p>Poem will go here</p>
    </div>
    <div class="col-md-8" id="places-sidebar">
      <div id="could-be-map" class="map"></div>
      <div id="places-info">
        <p>Info on places will go here.</p>
      </div>
    </div>
  </div>
</div>
```

Save and reload, and now the page is clearly split up into three parts. What’s
more, at small widths, the poem will appear above the map, instead of
squeezing the map.

</section>
<section id="tabbed-navigation">
## Building tabbed navigation

The next step is designing that navigation element I want to use to show the
five different places in the poem. We wrap the [navigation
elements](https://v4-alpha.getbootstrap.com/components/navs/#base-nav), which
are `<a>` tags, in a `<nav>` tag. Bootstrap’s classes do all the heavy
lifting. The navigation for the `#content` section of our project page, then,
will look like this:

```html
<nav class="nav nav-pills mt-3">
  <a class="nav-link active" href="#introduction">Introduction</a>
  <a class="nav-link" href="#hastings-street">Hastings St.</a>
  <a class="nav-link" href="#lenox-avenue">Lenox Ave.</a>
  <a class="nav-link" href="#eighteenth-and-vine">18th &amp; Vine</a>
  <a class="nav-link" href="#fifth-and-mound">5th &amp; Mound</a>
  <a class="nav-link" href="#rampart">Rampart</a>
</nav>
```

The `nav-pills` class means that Bootstrap will style this as though it were a
bunch of “pills,” where the one with the `active` class will be a different
color. This will work just fine for how we want our design to look.
Additionally, the `mt-3` class is a [Bootstrap class that adds a
**margin**](https://v4-alpha.getbootstrap.com/utilities/spacing/) to the
top, to push the tabs away from the map above it. 

Also notice that to create an ampersand (&) in HTML, one has to type the
unwieldy `&amp;`. This also goes for typing things like `<>` (`&lt;&gt;`).
Markdown, ahem, suffers from none of these problems.

Below the navigation list, we create the contents of each tab. Here we make
use of more of Bootstrap’s built in classes.

```HTML
<div class="tab-content p-3">
  <section class="tab-pane active" id="introduction" role="tabpanel"> </section>
  <section class="tab-pane" id="hastings-street" role="tabpanel"> </section>
  <section class="tab-pane" id="lenox-avenue" role="tabpanel"> </section>
  <section class="tab-pane" id="eighteenth-and-vine" role="tabpanel"> </section>
  <section class="tab-pane" id="fifth-and-mound" role="tabpanel"> </section>
  <section class="tab-pane" id="rampart" role="tabpanel"> </section>
</div>
```
The relationship between each `<section>`’s id and the `href` setting on the
navigation list is how we connect the tabs to the content beneath.
Furthermore, the `p-3` class provides some **padding** for the inner content.
Margins and padding are the two best ways to use CSS to control negative
space.

In order to make the tab pills work their magic, however, we have to add some
data attributes, so that Bootstrap’s JavaScript knows to treat the section as
a set of tabs, so the navigation gets augmented to include that:

```html
<nav class="nav nav-pills mt-3" role="tablist">
  <a class="nav-link active" href="#introduction" data-toggle="tab" role="tab">Introduction</a>
  <a class="nav-link" href="#hastings-street" data-toggle="tab" role="tab">Hastings St.</a>
  <a class="nav-link" href="#lenox-avenue" data-toggle="tab" role="tab">Lenox Ave.</a>
  <a class="nav-link" href="#eighteenth-and-vine" data-toggle="tab" role="tab">18th &amp; Vine</a>
  <a class="nav-link" href="#fifth-and-mound" data-toggle="tab" role="tab">5th &amp; Mound</a>
  <a class="nav-link" href="#rampart" data-toggle="tab" role="tab">Rampart</a>
</nav>
```

</section>
<section id="markdown-sections">
## Populating the sections with Markdown content

The `<section>`s hold all of the content for this project are currently empty,
so I will write one markdown file for each. I’ll then use a variation on the
`$.ajax()` method we used in the [previous chapter](/12-markdown) to feed the
content into the tabs. Importantly, however, every Markdown document has the
same name as the id of its corresponding `<section>`. This allows us, instead
of having to write the same call to `$.ajax()` five times, we can write it
once and loop over it by creating an array on the fly made up of the tab
names:

```javascript
let converter;
converter = new showdown.Converter();
["hastings-street", "eighteenth-and-vine",
  "fifth-and-mound", "introduction",
  "lenox-avenue", "rampart"].forEach(function(tab){
  // Create a variable tab that has the name as a string.
  $.ajax({
    // tab + ".md" yields, for example, "rampart.md".
    url: tab + ".md",
    success: function(markdown){
      let html;
      html = converter.makeHtml(markdown);
      // "#rampart", for example.
      $("#" + tab).html(html);
    }
  });
});
```

</section>
<section id="exercises">
## Exercises

1. Draw (by hand) a wireframe for your web project. It can have multiple pages
   to show how the site reacts to different user interactions.
1. Populate some `<section>`s in your project with Markdown. 

</section>
