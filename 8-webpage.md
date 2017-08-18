---
layout: default
title: Writing a Webpage
permalink: /8-webpage
---

The second half of this course begins with an introduction to the foundation
of a web site, the actual web “page.” Twenty-five years ago, writing for the
web involved precisely that: writing documents that included links to each
other. Each was its own page. Now an entire website can be contained in just
one HTML file, like the `index.html` file we have been working on so far. In
2017, the distinction between “website” and “webpage” is as unclear as it has
ever been.

In this chapter, however, I’ll continue to use the metaphor of the single page
(instead of “site” or “project”), because it’s useful to think of that file,
`index.html`, as directing everything that happens for the rest of this
course.

The `.html` at the end of the file name indicates that it’s written in HTML,
or Hyper-text Markup Language. HTML provides the structure and the content of the
page. It directs not only what will be on the page (text, images), but also,
more or less, where that information will appear.

The *look* of the page, however, which includes colors, fonts, sizes of boxes
holding text, and so on, are handled by files written in another language,
CSS, or Cascading Style Sheets. Without CSS, all webpages would be boring,
black Times New Roman text on white backgrounds.

Finally, the *action* on the page, that is, what happens when a user interacts
with a page, is controlled by JavaScript. We’ve already seen that this course
with how the `prompt()` function can change what gets printed on the page. In
this chapter, we'll be looking at jQuery, specifically, which is a means of
accessing and altering the content of a webpage quickly and easily.

The three languages are intertwined; it’s possible to write CSS and JavaScript
inside an HTML document. Similarly, JavaScript on webpages often changes
content (as we have done in class so far) or style. 

<section id="html">
## HTML

It’s time to return to `index.html`, after so many chapters of working
exclusively on `scripts.js`. When you open it in Atom, you should see
something like this:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My JavaScripting English Major Project</title>
  </head>
  <body>
    <h1>This is my project!</h1>
    <div id="response">This is the div.</div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="scripts.js"></script>
  </body>
</html>
```

Remember that HTML is made up of tags that are enclosed in `<>`. Some tags
open and close, like the `<h1></h1>` tag above. Other tags don’t need to be
closed, like the `<meta>` tag. Earlier, I said that HTML provides a webpage
both with its structure and its content. We can see that in this short page
already. The `<html>` tag is split into two sections, each with its own tag,
`<head>` and `<body>`. Inside the `<head>` are two more tags, a `<meta>` tag
and a `<title>` tag. And you can extrapolate what’s inside the `<body>`
tag.[^doctype]

The `<head>` is where web authors put information about the page. None of the
information is actually visible, except for the `<title>`, which appears in
your browser’s title bar. Importantly, however, the `<head>` is the
where we instruct the browser where to find the style sheets
appropriate to the page, but styling is for the next section.

Inside the `<body>` tag is everything we see. It is also, traditionally, where
JavaScript files get loaded with `<script>` tags. It’s best to leave the
JavaScript loading for the end of the page, so that the JavaScript has a
canvas in place to work on and manipulate. Most of your HTML writing happens
inside the `<body>` tag but before the `<script>` tags.

Tags can also have **attributes**, which are designated by the syntax
`attribute="value"`. As you can see, there are a few attributes already listed
here. Some, like `charset` or `lang`, we can ignore. They’re of the “set it
and forget it” variety. But there are several attributes worth learning:

* `id`: sets an identifier for an entity. The entity can then be accessed or
manipulated using the `#id` syntax, as with the `$("#response")` selector we have been using so far.
* `class`: where `id` is supposed to describe a specific entity, `class` can
be used to group entities together for manipulation. They can be accessed
using the `.class` syntax, which we have not yet seen.
* `src`: designates the source of either a JavaScript file (in a `<script>`
tag) or an image (in an `<img>` tag).
* `href`: designates the URL of a link in an `<a>` tag.

In addition to the tags you have seen above, I’ll introduce a few more here:

* `<p></p>`: paragraph
* `<a href="http://..."></a>`: anchor, for making links
* `<img src="...">`: images
* `<h2></h2>`: second-level heading (they descend all the way to `<h6>`
* `<div></div>`: a generic block of content
* `<span></span>`: a generic span of inline content
* `<em></em>`: emphasis. *Emphasis*.
* `<strong></strong>`: strong. **Strong**.
* `<article></article>`: designates the main content of a page
* `<section></section>`: designates a section, typically of an `<article>`

Try the tags out on your `index.html`. See what happens if you forget to close
an `<a>` tag or an `<em>` tag.

There are, of course, many tags I have not mentioned here, like tags relating
to lists, tables, and the like. W3Schools provides [an entire
list](https://www.w3schools.com/TAGs/default.asp). Each tag has attributes
that are appropriate to it, but `id` and `class` are the most widespread.

Any webpage on the internet can expose its raw HTML to the user. The same
window that gives you the JavaScript console also has a tab for “Elements.” If
you click on it, you can see the entire structure of the webpage.
Unfortunately, a lot of webpages these days, especially of popular websites,
are nearly impossible to read. But give it a try.

</section>
<section id="css">
## CSS

CSS is infamous. While HTML has been rather standardized, CSS remains a bit
more unreliable. It’s also changing very quickly, and browsers are slow to
adopt the latest and greatest CSS tricks that are available to design-minded
web authors. But CSS is where artists can shine, as they fine tune
proportions, colors, fonts, and the like. 

### Bootstrap

I’m not an artist, however. I’m an English Major. So I like to leave the art
to the professionals. One way of doing that is by making use of a pre-built
set of styles that will make your webpage look handsome right away. The
framework I prefer, and the one that we’ll be using now, is
[Bootstrap](http://getbootstrap.com), designed by the people at Twitter. We’ll
be using version 4 of Bootstrap, which isn’t even out yet. 

We can load Bootstrap styles by putting two lines of HTML in our `<head>` tag in
`index.html`:

```html
<head>
  <meta charset="utf-8">
  <title>My JavaScripting English Major Project</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
  <link rel="stylesheet" href="styles.css">
</head>
```

Those two `<link>` tags tell the browser to load the Bootstrap styles (first
line), and your personal styles (second line). We also need to add two more
`<script>` tags to load Bootstrap’s special JavaScript, so put these two in
just above `<script src="scripts.js"></script>`.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
```

Let’s also wrap our content inside a container `<div>`, which is a `<div>`
with a class of “container”. You can see it opened on line 2 below and closed
on line 5:

```html
<body>
  <div class="container">
    <h1>This is my project!</h1>
    <div id="response">This is the div.</div>
  </div>
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
  <script src="scripts.js"></script>
</body>
```

“Container” is a class [provided by
Bootstrap](https://v4-alpha.getbootstrap.com/layout/overview/#containers) that
lets us use the grid layout system. If you save, commit, and reload the
webpage in the browser, you should see that it looks different. The font has
changed, and there are tidy margins on both sides.

For me, usually getting this far is enough with CSS. On the other hand,
sometimes I like to personalize Bootstrap. This course, for example, uses a
customized version of Bootstrap. Let’s customize your page, then, while
learning about CSS.

### CSS selectors and properties

CSS is made up of selectors that then have specific properties. Selectors are
typically either tags, ids, or classes. Then the properties are nested inside
of them, using a syntax that looks like *but is not* JavaScript. Let’s make
some changes to our `index.html` let us see how CSS works. Let’s add some
paragraphs underneath the response `<div>`, so that the `<body>` tag looks
like this:

```html
<body>
  <div class="container">
    <h1>This is my project!</h1>
    <div id="response">This is the div.</div>
    <p>This is the first paragraph of my webpage, despite the div above.</p>
    <p class="second-paragraph">This is the second paragraph. As such, it even has two sentences.</p>
		<p id="third-paragraph">This is the third paragraph. Do you want three sentences? Lucky you, because here they are.</p>
  </div>
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
  <script src="scripts.js"></script>
</body>
```

Save and reload, and the three new paragraphs appear, silly though they may
be. Now let’s create a CSS file. In Atom, on the Projects tab on the left
side, right click (or command click) on the project name and choose “New
File.” Name the file `styles.css`. A blank document will open up in Atom, and
type this in:

```css
p {
  color: red;
  background-color: gray;
}
```

Save and reload, and what happens? The three paragraphs become a painful
red-on-gray mess to look at. In this snippet of CSS, we can see that the
selector is `p`, which means “everything with a `<p>` tag.” `color` is the
color of text, and `background-color` is the background color. If you’d like
to pick less garish colors, you can use Dixon and Moe’s [Color
Picker](http://htmlcolorcodes.com/color-picker/). Use the hue slider and then
pick a place on the saturation/lightness grid for the color you want and then
make a note of the “HEX” value.[^hexcolor] Try something like this:

```css
p {
  color: #657b83;
    background-color: #fdf6e3;
}
```

Save and reload. Much nicer on the eyes. The `#id` and `.class` syntax I
mentioned above are also CSS selectors. Add these two statements to
`styles.css`:

```css
.second-paragraph {
  color: #b58900;
}
#third-paragraph {
  color: #d33682;
}
```

As we can see, `.second-paragraph` means “apply these properties to everything
that has the class “second-paragraph.” Similarly, `#third-paragraph` means
“apply these properties to the entity that has the id “third-paragraph.” Try
adding `class="second-paragraph"` to the `<h1>` tag. What happens?

The selectors can also be mixed and matched. `p.lead`, for example, refers to
everything that is `<p class="lead">`. `p.lead.burrito` selects every `<p
class="lead burrito">`, though I’m not sure what the “burrito” class should
do. As for the properties, there are many, many, many of them. Text formatting
by itself is [14 properties](https://www.w3schools.com/css/css_text.asp), and
that does not even include the font properties.

CSS is more than just colors and fonts, however. It’s possible, by using
properties such as `width`, `position`, `float`, and so on, to even manipulate
how large the blocks are that hold your content and where they appear.
Teaching all of that would be a semester-long course of its own, which is why
I prefer to stick to Bootstrap and use their classes.

</section>
<section id="jquery">
## jQuery

jQuery is a library that provides a lot of shortcuts for manipulating
webpages. As with CSS, it selects parts of the page and works on them. We’ve
already seen an example of that throughout this course, with:

```javascript
$("#response").html("some string.");
```

The selector (`$("")`) chooses the HTML element with the id of “response” and
replaces the HTML inside it. Similarly, `$("p")` chooses all of the `<p>`
tags, and `$(".second-paragraph")` chooses everything with a class of
“second-paragraph.” Open up `scripts.js` and try to change all of the
paragraphs to read the same thing at once.

There are [many, many jQuery methods](https://api.jquery.com/) that let you
manipulate webpages. For example, this webpage makes use of jQuery to build
the sidebar, automatically.

* It uses `$("article").has("section").length` as a test to see if the `<article>` tag has `<section>` tags inside it (so the `.length` property is greater than 0, and, hence, `true`).
* It then uses `$("section").each()` to go to each `<section>` in the page.
* It gets that section's id using `$( this ).attr("id")`, where `.attr()` is
the method for getting an attribute.[^this]
* It also gets that sections `<h2>` value by using `$( this
).find("h2").html()`.
* Then it uses the id value as the `href` attribute for a link and uses the `<h2>` value for the text of the link. 
* Then it does the same for subsections.

As your web project grows more interactive, the potential for injecting more
and more jQuery grows along with it.

</section>


<section id="exercises">
## Exercises

1. Flesh out your `index.html` with a subheading, an image, a few paragraphs,
   and a link or two.
1. Glance over the Bootstrap documentation for
   [images](https://v4-alpha.getbootstrap.com/content/images/) and give your
   image rounded corners.
1. Add some jQuery to `scripts.js` that selects one (and only one) `<p>`
   element and uses `.addClass` to add the “lead” class to it. 

</section>

## Footnotes

[^doctype]: The `<!doctype>` tag is not, actually, a tag. Rather, it’s a way of telling the browser to expect a certain kind of HTML, in this case, HTML 5, as noted by giving it the doctype `html`. That is confusing, but it’s so much clearer now than it used to be…

[^hexcolor]: Hex color is an old standard of telling HTML what color something should be. It is made up of three parts, each of which is a hexadecimal number between 0 and FF, which tells the browser how much red, green, and blue to put in a color. As such, `#000000` is the absence of all color, or black.  `#FFFFFF` is all of the colors, or white. `#FF0000` is all of the red, and no blue or green. `#00FF00` is just green, and `#0000FF` is just blue. 

[^this]: `this` is a tricky JavaScript keyword, but the `$( this )` is a way
of using jQuery on an object itself. So when iterating over each `<section>` with `.each()`, `$( this )` selects the section itself, instead of one of its child entities.
