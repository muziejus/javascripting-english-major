---
layout: default
title: Bootstrap Layout and Content
permalink: /13-bootstrap
---

In this chapter, I will present some of how Bootstrap handles layout, which
will let you conceive of how you want your project to look and present the
content you are creating.

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

## The Bootstrap Grid

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

## Building a Navbar

The next step is designing that navigation element I want to use to show the
five different places in the poem. This involves using 

