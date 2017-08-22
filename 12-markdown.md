---
layout: default
title: Writing Content with Markdown
permalink: /12-markdown
---

For the rest of this course, I will continue making changes to the “Could Be”
webpage. I invite you to follow along, but the homework will be mostly related
to fleshing out your own project. 

Alongside the geographical data, of course, is the added content that we
provide as scholars. There’s a reason for making these maps, after all, and
for making a web project. We want to **inform** visitors to the page, and a
map will typically not suffice to do so. That means there has to be some
writing. I want my content to appear in a `<div>` I call `#content` that I put
underneath the map.

<section id="markdown">
## Markdown

You may have already noticed that writing HTML is not a lot of fun. The tags
are clumsy and get in the way, making it tricky to write “human-readable”
text. [Markdown](https://daringfireball.net/projects/markdown/), designed by
John Gruber in 2004, is an attempt to do just that. We can write texts in Atom
using the Markdown syntax rules, and they will be turned into clear HTML that
we can use in our web project. Additionally, Markdown plays nicely with Atom,
which has some built in features that make writing in Markdown even more
satisfying.

Before getting into the syntax, I’ll mention this fun fact: you’ve already
written some Markdown. The `README.md` file I had you edit back in [Chapter
1](/1-environment) is in Markdown, as noted by the `.md` extension. 

I wrote up a simple [Markdown cheat
sheet](https://gist.github.com/muziejus/53a24ef58a90599ed8dff18276a9c744) on
GitHub that you can use as a reference. When you click on the “Raw” button at
the top, it shows you the raw Markdown I typed. Nevertheless, here’s a brief
description of the syntax you are most likely to use in your project:

* Paragraphs are just regular paragraphs with two returns between them, like
in email.
* For an image, you type `![Alt text](image url)`. I will describe images in
greater detail below.
* Links have a similar syntax: `[Link text](link url)` will create the form
`<a href="link url">Link text</a>` with which you are already familiar.
* Use `_underscores_` for _italic_ text and `**double asterisks**` for **bold**.
* Introduce an `<h2>` by typing `##`. Use three octothorpes for `<h3>` and so
on.

For the “Could Be” project, I create a file, `hastings-street.md`, to hold my
content about Hastings Street:

```markdown
## Hastings Street

Hastings Street was a major thoroughfare in the [Black
Bottom](https://en.wikipedia.org/wiki/Black_Bottom,_Detroit) neighborhood of
Detroit. It was largely razed to the ground to make room for the [Chrysler
Freeway](https://en.wikipedia.org/wiki/Chrysler_Freeway). 
```

Now, in Atom, I can go to the “Packages” menu, choose “Markdown Preview” and
then “Toggle Preview” to open a new pane that shows what the Markdown I am
typing will look like in HTML. The heading is larger than the body text, and
the links, when I click on them, take me to the correct Wikipedia pages. 
</section>

<section id="hotlinking-images">
## Hotlinking Images

Using images on webpages sets up a series of issues. Simply copying an image
from another website is most likely copyright infringement, even if you give
credit. This is why my webpages are typically light on images; they tend to
feature only images I have created or photos I have taken. For the “Could Be”
project, there are not many opportunities for images, but your project may
differ.

If you do use images, I recommend hotlinking them from a dedicated image
hosting site, like [Imgur](http://imgur.com). Images carry a lot of internet
traffic and are pretty much useless in Git, so it makes sense not to host them
yourself in your own project.

Hosting images in Imgur is easy. Point your browser to
[`http://imgur.com`](http://imgur.com), and follow the steps to create a new
post. Once your image appears on Imgur, hover your mouse over the picture and
choose “Get Share Links” from the dropdown menu. Copy the Markdown option and
paste it into your Markdown page. Change the `[Imgur]` text to `[a
description of the photo]`, and don’t forget to type a `!` before it. 

</section>
<section id="showdown">
## Rendering Markdown with JavaScript

Getting Markdown into a webpage involves having JavaScript intercede.
Specifically, we will use the
[Showdown](https://github.com/showdownjs/showdown) parser. I add it to my list
of `<script>` tags in `could-be.html` like this:

```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
<script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js" integrity="sha512-lInM/apFSqyy1o6s89K4iQUKg6ppXEgsVxT35HbzUupEVRh2Eu9Wdl4tHj7dZO0s1uvplcYGmt3498TtHq+log==" crossorigin=""></script>
<script src="https://cdn.rawgit.com/showdownjs/showdown/1.7.2/dist/showdown.min.js"></script>
<script src="could-be.js"></script>
```

Showdown provides a converter `Object` that has a `.makeHtml()` method. The
process that follows, then, is:

1. Define and assign a Showdown converter.
1. Load in the Markdown file using jQuery.
1. Convert the loaded file into HTML using Showdown.
1. Print the HTML in the `#content` container with jQuery.

To accomplish these steps, I add these lines to `could-be.js`:

```javascript
// Define and assign a Showdown converter.
let converter;
converter = new showdown.Converter();
// Load the Markdown file with jQuery.
$.ajax({
  url: "hastings-street.md",
  success: function(markdown){
    // Convert the Markdown to HTML.
    let html;
    html = converter.makeHtml(markdown);
    // Print the HTML to #content using jQuery.
    $("#content").html(html);
  }
});
```

The jQuery method `$.ajax()` is a more generic version of the `$.getJSON()`
method we have already used. It takes an `Object` as a parameter, with a
`.url` property and a `.success` property, which runs if the `$.ajax()` method
runs smoothly. 

And that’s it. Now you can write content in convenient Markdown and use jQuery
to populate sections of your web project. See [this
page](/examples/couldbe12.html) to see how far we’ve come.
</section>

## Exercises

1. Start drafting your own project’s content using Markdown in Atom. Commit
   the drafts and push them to GitHub.
1. Add a `#content` container to your project’s HTML file. Have it load one of
   your Markdown files with jQuery.
