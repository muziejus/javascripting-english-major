---
title: JavaScript Calculator
permalink: /2-calculator/
---

# JavaScript Calculator

The [last chapter]({{ site.baseurl }}/1-environment/) ended with the
following, in the console:

```
> console.log("Hello, World!");
Hello, World!
```

Note that I have included the `>` prompt in this example, along with the
“return value,” or how the console responded to your single line of
JavaScript. There’s a lot going on in just this one example, but, briefly,
`console.log();` is a way of using JavaScript to tell the console to output
something.[^consolelog] Before we get too carried away with writing
JavaScript, however, I think it might be useful to learn a bit about
JavaScript’s history.

## Hello, World! Hello, JavaScript!

I mentioned a few details about JavaScript’s history in the [FAQs]({{
site.baseurl }}/0-introduction/), but I’ll reiterate some of that now.

Programming languages inherit from previous programming languages. The
writer(s) of a language will take parts they like from one language and mix it
with parts they like from another, and then add their own, new additions that
makes their language special. JavaScript is no different; in fact, JavaScript
might be especially good at revealing its mixed parentage. But that means,
concretely, that it helps to have a sense of the history of programming in
general when understanding why JavaScript looks like it does today.

The [fourth episode of the BBC show *Connections* draws a
line](http://www.dailymotion.com/video/x3dvbkg) to computer programming that
begins with the Roman era [Barbegal aqueduct and
mill](https://en.wikipedia.org/wiki/Barbegal_aqueduct_and_mill). Sadly, James
Burke concludes his wry take on advances in technology with punch cards, but
he was also filming *Connections* in 1978. Nevertheless, Burke sees that the
key to how computers work is related to how they *organize information*.  How
to organize information is, not coincidentally, the first part of programming
that we will learn in this chapter.

Speaking a few decades later, Douglas Crockford picks up the thread from where
Burke ended it (punchcards) and moves us all the way up to JavaScript in two
of his *Crockford on JavaScript* lectures, “[The Early
Years](https://www.youtube.com/embed/JxAXlJEmNMg)” and the first 20 minutes of
“[And Then There Was
JavaScript](https://www.youtube.com/watch?v=RO1Wnu-xKoY).” Although the
lectures are aimed at people with some programming knowledge, meaning that
they get pretty geeky, what Crockford does well is hammer home two key points
in the way computing has evolved over time:

* The people who should be the first to recognize the value of an innovation
[like programmers] are often the last.

* Obsolete technologies fade away slowly.

The implications of both points reveal why JavaScript has its quirks and why
those quirks are here to stay.

The short version of Crockford’s history boils down to the fact that
JavaScript was written over ten days by one man, Brendan Eich. Netscape wanted
a scripting language for their web browser, Navigator, and Eich delivered. At
the time, Java was positioned to be “the language for the web,” as we would be
running Java applets on websites, so Netscape called Eich’s language
“JavaScript,” despite the fact that JavaScript inherited nearly nothing
substantial from Java. 

Once Microsoft put their *own* version of JavaScript in Internet Explorer, it
became clear that in order for JavaScript to be useful across the entire web,
it would have to be standardized. This took time, and, what’s more,
standardizing involved a process of maintaining compatibility. As a result,
JavaScript, as Crockford is fond to point out, has a lot of bad parts that are
here to stay. Nevertheless, he adds, it also has some *very good* parts. After
all, back in 2001 Crockford called JavaScript “[the world’s most misunderstood
programming language](http://javascript.crockford.com/javascript.html).” Yet
now programmers are focusing more on these good parts (it helps that Crockford
even wrote a book [about JavaScript’s good
parts](http://shop.oreilly.com/product/9780596517748.do)), which is part of
what makes JavaScript so popular.

As Crockford likes to point out, JavaScript is many things to many people,
allowing itself to be used in three different programming paradigms. It can be
a [procedural](https://en.wikipedia.org/wiki/Procedural_programming) language.
It can be used as a
[functional](https://en.wikipedia.org/wiki/Functional_programming) language.
Or it can be used as an
[object-oriented](https://en.wikipedia.org/wiki/Object-oriented_programming)
language. Or all three in the same application. These are details that go
beyond the scope of this course, but they gesture towards the idea that
JavaScript is very flexible and very forgiving. This is part of why it’s so
easy to learn. But it’s also why it’s so easy for programmers to cause trouble
with it.[^language-type]



## Basic Data Types

## Using JavaScript as a Calculator

## Exercises

## Footnotes

[^consolelog]: More precisely, `console` is a JavaScript object (similar to `window` or `document`, as we’ll see later) that refers to the console you have opened in your browser. `.log()` is a “method” specific to the `console` object that outputs whatever is in sent as a parameter (or, inside the `()`).  In our example, we sent the console a snippet of text, `'Hello, World!'`, and it returned it to us.

[^languagetype]: In this course, most of the JavaScript will be procedural, which encourages a step-by-step way of thinking through a solution. Once we move to making maps with Leaflet, the more object-oriented aspects will emerge. JavaScript’s functional personality is its most powerful and appealing, but it strikes me as the most difficult to understand and teach.
