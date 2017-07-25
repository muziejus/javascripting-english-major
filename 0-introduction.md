---
title: 0. Introduction & FAQs
permalink: /0-introduction/
---

# 0. Introduction & FAQs

Welcome! This is a sort of introduction to this course with a few FAQs that
help explain the motivation behind this project. If you’re already committed
to following through, you can skip this section and jump straight to the
[first chapter]({{ site.baseurl }}/1-environment/), on setting up your environment. 

The goals here are straightforward: at the end of 15 sessions, you should be
able to host a web project that investigates an academic topic of your
choosing. Following the examples step-by-step will lead to a short project
featuring mapping locations in a novel.

## What Are the Prerequisites?

If you’re on this website, you’ve got most of the prerequisites covered, as it
implies that you have the two most important ingredients, a web browser and
the desire to learn. 

I believe that anyone can learn a little JavaScript, but it helps if that
anyone likes puzzles. Programming, to me, like many intellectual pursuits, is
a way of solving problems creatively. In programming, you use your mind and
the limited rules of the programming language to realize the goals you have
set for yourself. The path can be (and often is) convoluted and unexpected,
but that means that reaching the end is that much more satisfying.

Some familiarity with HTML is useful, as I only give a cursory explanation of
it. The best way to learn HTML, however, is to see how others use it and
simply copy it and learn from it. “View Source” has been a useful, if hidden,
command on the browser for two decades.

## What if I’m not an English Major?

This course is for any student, really. But I was an English major, and I am
using this course in an English course, so I prepare the materials with that
audience in mind. 

That said, I don’t believe that computer scientists or students eager to learn
about the foundations of programming will find this course useful. They will
be frustrated by the lack of coverage, the way I opinionatedly push the
students, and that certain fundamental aspects of contemporary programming,
such as objects, are almost entirely ignored (and ES6 *never* comes up). For
those students, I hope that your university offers a course where Marijn
Haverbeke’s [*Eloquent JavaScript*](http://eloquentjavascript.net) is the
textbook. 

Instead, this course addresses a need I have seen in my own practice. Most
programming books I have read fall into one of two categories; they are either
introductions to computer science that use a specific language for the
introduction (Haverbeke, Allen Downey’s [*Think
Python*](http://greenteapress.com/wp/think-python-2e/)), or they are
introductions to a specific language aimed at people who already program
(David Black’s [*The Well-Grounded
Rubyist*](https://www.manning.com/books/the-well-grounded-rubyist-second-edition)).
For my students, undergraduates studying English, the former seem too
detailed, and the latter are too complicated.

So just as a university might offer different statistics courses depending on
the students’ interests, I propose a course that assumes very little advance
knowledge (like the first category), but also tries to push process and
practice over theory.

There are books that are more in this vein, such as Matthew Jockers’s [*Text
Analysis with* R *for Students of
Literature*](http://www.matthewjockers.net/text-analysis-with-r-for-students-of-literature/).
So if this course can be considered “Jockers, but for JavaScript,” I
think I will have met my largest goal.

## Why JavaScript?

The previous question notes that Matthew Jockers has already written a
programming book for English majors, so why learn JavaScript *instead* of R? 

There are two reasons, and the second follows from the first. First,
JavaScript is *ubiquitous*. Every contemporary laptop or desktop ships with a
browser and a text editor. In fact, only a browser is needed to write simple
JavaScript. There is no need to install any additional software, though this
course will encourage installing one program, the text editor Atom.

Second, because JavaScript is ubiquitous, it becomes very easy to see very
quick results that are very portable. The first time I taught programming, I
was teaching python to English majors. But the moment they were most excited
about was when I used JavaScript in the browser to deface a website. It takes
comparatively little in JavaScript to get something up that you can share with
your friends, and that is a large part of the excitement of engaging in any
creative process. That includes programming, of course!

## Why not Python or R?

Python is great. R is great. Ruby is my favorite language. And so on. If you
have a chance to take a course in any of those languages, please do so.
However, all of these languages require more setup than JavaScript, and my
goal is to get students making projects as quickly as possible while also
understanding every line of code they type.

The rush under which JavaScript was written and its peculiar (lack of)
relationship to Java mean that JavaScript has been considered a “toy” language
for much of its life. In the past decade or so, however, JavaScript has
emerged as a vital language for doing anything web-based, both on the client
(browser) side and on the server side. This course focuses entirely on
client-side JavaScript, but that should provide enough of a foundation for a
student to make the jump to server-side.

The first class I ever taught where I taught a piece of software, the software
was ArcGIS, a behemoth of a software suite whose license most students will not be able
to afford once they graduate (and whose license even most universities
probably cannot afford!). I got frustrated teaching students skills that I
knew they would use for my class and my class only. When trying to think of a
way to teach them, instead, something they could use even outside of my
classroom, JavaScript seems like the best answer because of its ubiquity.

Finally, once you know JavaScript, jumping to Python or R or Ruby is a smaller
step.

## Atom!?! I Only Use vim!

Any text editor in the world can be used to write JavaScript. TextEdit,
Notepad, vim, and even emacs. This course encourages students to use
[Atom](http://atom.io), however. Atom brings three benefits that the others do
not.

1. Atom is available (for free) for Windows, Mac, and Linux, and it looks more
   or less the same on all of the operating systems. I don’t want to be
   platform specific when teaching, because I’m already relying on the
   students’ having some access to some computer. I’d rather not rely on it
   being a specific kind of computer.

1. Atom has nice git and GitHub support that comes preinstalled. Part of the
   skills taught in this course include thinking about a creative and
   intellectual process that includes versioning.

1. Atom’s configuration files are written in the same languages as used on the
   web, namely JavaScript (CoffeeScript) and CSS.

Of course, if you would like to take this course using vim and git from the
command line, that is up to you. Of course, if you’re already using vim, then
this course may be too simple for you.

## Teaching People How to Code Is Just a Silicon Valley Ploy to Drive Down Developer Wages.

This is, of course, true. However, the goal of this course is not to teach
students how to become coders so that they can dilute the programmer pool in
California. The goal here is to teach process- and project-based creative
thinking when it comes to literary study. If students “graduate” from this to
learn more about programming, then they can face the uncertainties of the
labor market then.

That said, I believe that Silicon Valley will be needing more, not fewer,
people with humanities training in the near future. Hence, learning to code
will help a humanist get hired in Silicon Valley, but not as a developer.
Instead, knowing about coding may help in job positions that include
interaction with coding and engineering teams.

## Isn’t Digital Humanities a Neoliberal Scheme?

Please see the multiple volumes of [*Debates in the Digital
Humanities*](http://dhdebates.gc.cuny.edu/). However, it’s likely that even
those won’t convince you otherwise.

## Why Should I Trust You?

This course is called “JavaScripting for English Majors.” I was an English
major for many years. I then became a PhD student in English, and now I’ve
leveled up to being an Assistant Professor / Faculty Fellow in English, at
NYU.  In other words, unlike with some literary-minded programming books (such
as Angus Croll’s [*If Hemingway Wrote
JavaScript*](https://www.nostarch.com/hemingway) or the peculiar Shakespeare
epigraphs in every chapter of Douglas Crockford’s otherwise superb
[*JavaScript: The Good
Parts*](http://shop.oreilly.com/product/9780596517748.do)), this course is a
product that considers students of literature first and programming second.

That said, I have been programming for three decades, from writing fantasy
games in BASIC on an Apple IIe to programming my TI-81 to learning Perl and
PHP to program for the web to having a part-time student job as a Ruby
developer. I find programming to be a rewarding exercise because there’s
always at least something that almost sort of works at the other end.
Programming is, of course, also frustrating. Irritating. Infuriating. But
still rewarding when each problem gets solved.

But the main reason you should trust me is that, by the time you read this, I
will have already taught this course, making adjustments where necessary. And
I hope to keep teaching it. JavaScript and the web are going nowhere, and the
humanities are as important now as they have ever been.

So happy JavaScripting, and I’ll see you in [Chapter 1]({{ site.baseurl }}/1-environment/)!
