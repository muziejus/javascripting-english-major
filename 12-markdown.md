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
writing.

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

## Exercises
