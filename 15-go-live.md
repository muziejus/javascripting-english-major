---
layout: default
title: Time to Go Live
permalink: /15-go-live
---

We have come a long, long way since you were creating your GitHub account and
using JavaScript just as a calculator. Yet with the couple of basic types I
taught you, you are able to make a fully interactive web project by making use
of Bootstrap, jQuery, and Leaflet. Hopefully your own personal project is
coming along as well as the “Could Be” project has. More importantly,
Hopefully you’ve figured out a few tricks of your own, to get the project to
meet your desires and to make your wireframe a reality. 

In this final chapter, we’ll do two things: do some blanket styling on your
project so it doesn’t totally look like a default Bootstrap website, and then
put it live so that you can have a URL you can share with your friends,
family, and, also importantly, me, your instructor.

<section id="styling">
## Big style changes

Because the section on CSS was so short, I’ll include some CSS here to inspire
you to change your own style sheets for your project. First, let’s change the
font. Fonts have to be loaded from somewhere, and, luckily, Google offers that
service through [fonts.google.com](http://fonts.google.com). When you find a
font you like there, you click on the red circle with a white cross, and a
black bar appears on the bottom of your browser window. When you click on the
white line on that bar, a subwindow opens. If you click on “@import,” you get
something that looks like this:

```css
@import url("https://fonts.googleapis.com/css?family=Garamond");
```

Now, in your style sheet, you have to include that line at the top. Then,
below, you can define the `<body>` font as Garamond.

```css
body {
  font-family: "EB Garamond", serif;
}
```

Leaflet its own font, however, so force the change this way:

```css
.leaflet-container {
  font-family: "EB Garamond", serif;
}
```

Now I can change the background color for the page as a whole and for the
popups:

```css
body, .leaflet-popup-content-wrapper, .leaflet-popup-tip {
  background-color: #fdf6e3;
}
```

We could keep going on, adding borders, etc. But here’s a good place to stop.
You can view the “finished” version of this “Could Be” project
[here](/examples/could-be.html).


</section>
<section id="going-live">
## Going live

Since I’ve started working on the “Could Be” project, and you’ve been working
on your own project, I hope that you have been saving and committing along the
way to your GitHub repository. I also hope you’ve been pushing your commits up
to GitHub. If the latest and greatest is pushed to GitHub, then going live is
a one-minute procedure.

1. Go to your repository’s page on Github.com.
2. Click on the “Settings” tab near the top.
3. Scroll down to “GitHub Pages.”
2. Click on “None,” choose “Master Branch.”
2. Click “Save.”
3. Scroll back down to “GitHub Pages” and you should see something like “Your
   site is ready to be published at
   https://YOURUSERNAME.github.io/javascripting-english-major-project/.”

That last line is the URL to your project, with your project’s `.html` file
added to the end, like `could-be.html`. If you want to rename your project’s
file to `index.html`, that would simplify things. Now you can share that with
your friends. You can also keep making changes by editing files in Atom,
committing, and then pushing back up to GitHub.

And that’s it! We’ve laughed, we’ve cried, we talked a lot about burritos
until it got time to start building web sites. And now you know how to use
JavaScript and can go on making sites, learning more about Leaflet, Bootstrap,
jQuery, and even other, more exciting libraries, like
[d3.js](http://d3js.org). 

Please let me know what kinds of amazing things you go on to create, and I
hope your learning process has been as enjoyable as my writing this course
(and teaching it) has been.

</section>

<section id="exercises">
## Exercises

1. Style your project. Then, go live.
