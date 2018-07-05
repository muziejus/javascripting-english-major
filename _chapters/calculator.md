---
chapter-no: 2
title: JavaScript Calculator
summary: Introduction to JavaScript / Basic data types / Using JavaScript as a calculator / Assigning variables
---


The [last chapter](/1-environment/) ended with the
following, in the console:

```javascript
> console.log("Hello, World!");
//--> Hello, World!
```

Note that I have included the `>` prompt in this example, along with the how
the console responded to your single line of JavaScript, after the `//-->`.
There’s a lot going on in just this one example, but, briefly, `console.log()`
is a way of using JavaScript to tell the console to output
something.[^consolelog] Before we get too carried away with writing
JavaScript, however, I think it might be useful to learn a bit about
JavaScript’s history.

<section id="hello-world">

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
(like programmers) are often the last.
* Obsolete technologies fade away slowly.

The implications of both points reveal why JavaScript has its quirks and why
those quirks are here to stay.

The short version of Crockford’s history boils down to the fact that
JavaScript was written over ten days by one man, [Brendan
Eich](http://en.wikipedia.org/wiki/Brendan_Eich). Netscape wanted a scripting
language for their web browser, Navigator, and Eich delivered. At the time,
Java was positioned to be “the language for the web,” as we would be running
Java applets on websites, so Netscape called Eich’s language “JavaScript,”
despite the fact that JavaScript inherited nearly nothing substantial from
Java. 

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

Now that we’ve got a bit of an introduction to the language’s history and
context out of the way, Let’s learn how to make JavaScript appear in our
browser.

<section id="embedding-javascript">
## Embedding JavaScript in a webpage

In the previous chapter, I had you clone a project with Atom. We’ll be working
with that project for the rest of this course, so let’s go over the project
and get learn some key details.

![Initial state of javascripting-english-major-project](https://i.imgur.com/tz4Lkme.png)

This screenshot of Atom shows the two key panes, the Project pane and the
editing pane. Currently, I’m editing `index.html`, and that’s the file we’re
most interested in right now. But I’ll quickly explain what the other files
do:

* `.eslintrc.yml`: This file describes some rules for correcting our
JavaScript on the fly. You won’t be using it.
* `.gitignore`: This file tells Git what files to ignore. You won’t be using
it.
* `index.html`: This is a webpage, written in HTML. 
* `README.md`: This is a file written in Markdown that is important for
GitHub. You should have updated this in the previous chapter.
* `scripts.js`: This is a JavaScript file that `index.html` loads. We will be
using this file *a lot*.

So we know how to open `index.html` in Atom. It’s right there in the
screenshot. But how can we get it to open in a browser? That part is a little
tricker. If you hover your mouse above the file name, however, Atom should
print its **path**, or the route to the file:

![Path to index.html](https://i.imgur.com/v4Theyk.png)

On a Mac, it should look exactly like this, except with your username where
mine says “moacir.” On Windows, the path will be a bit more complex. Now we
need to tell the browser to open that file. In the File menu of your browser,
you should select “Open File,” and it should prompt you with a box. Now, if
you type <key>Cmd</key> <key>Shift</key> <key>H</key> on a Mac, it will take
you to your **Home** folder, and you should see the “github” folder in there.
Open that, then open the “javascripting-english-major-project” folder, and
then, finally, “index.html.” 

It’ll be boring, but your webpage will be there. You should be greeted with a
blank white webpage with, in large text, “This is my project!”

For the rest of this course, we will be using Atom *and* a web browser,
so it’s time to get used to having both open at once. Back in Atom, change the
text “This is my project!” to something else and save your change. Switch over
to the browser and press the reload button. The text should change.

Congratulations, you are now a web editor.[^html] 

As a final step, open up the `scripts.js` file in Atom. Delete the `//` in
front of line thirteen, and the line should light up something like this:

```javascript
$("#results-div").html("Hello from scripts.js!");
```

Save and reload the page in your browser. What happens now?

Hopefully, your webpage now reads “Hello from scripts.js!”. Yet you didn’t
change `index.html`. True, but as noted above, `index.html` loads in
`scripts.js`, and `scripts.js` has this one line of JavaScript that causes the
text to change. Specifically, this is a line of [jQuery](http://jquery.com),
which is a bunch of shortcuts for writing JavaScript. In short, it tells the
browser to find an element in the webpage with the `id` of `results-div` (the
`#` is shorthand for “id of”) and to replace the HTML inside of it with
whatever is inside the `html()` parentheses.

We’ll be using this line of jQuery a lot, but it’s ok if you don’t completely
understand how it works right now. Now, however, let’s move on to what sorts
of things we can put inside those `html()` parentheses.
</section>

<section id="data-fundamentals">
## Fundamentals of Data

We hear the word “data” every day, but what, precisely, does it mean? If you
had to draw a picture of “data,” what would it look like? We can say “data is
information,” but doesn’t that just pass the buck, because now we have to ask
what “information” means? 

It maybe helps to remember that the word “data” is the plural version of the
Latin word “datum.” A datum is a single piece of information, abstract as that
sounds. It can be a number. It can be string of letters. It can be the answer
to the question “true or false?” It can also be the *lack* of information. 

Data can also be more complex. A datum can be a list or collection of other
pieces of data, or it can be a process that takes some data and generates new
data based on that data.

These six possibilities (and more exist) make up the six most important **data
types** in JavaScript, namely **number**, **string**, **boolean**, **null** /
**undefined**, **array** / **object**, and **function**. We’ll only be working
with the first four types, the fundamental types, in this chapter.

### Number

Numbers are precisely what they sound like—numbers. In JavaScript, it’s easy
to use numbers, because you just type them as numbers. Numbers can have
decimal points if they’re not integers. Try typing numbers into the `html()`
parentheses, save, reload, and see what happens:

```javascript
$("#results-div").html(9);
```

Now try:

```javascript
$("#results-div").html(9 + 10);
```

And, finally:

```javascript
$("#results-div").html(9 / 10);
```

This is a lot of work for a calculator, but it shows you that numbers behave,
more or less, like you might expect them to.

### String

Strings are a bit trickier than numbers at first glance. They are any string
of characters enclosed by double quotes.[^quoting] Have you used a string
already in this course? Yes, `"Hello, World!"` is a string containing the
characters `Hello, World!`. Similarly, `"Hello from scripts.js!"` is a string.
We can issue statements with strings in much the same way we did with numbers:

```javascript
$("#results-div").html("This is just a boring string.");
```

### Boolean

A boolean is a value that is either `true` or `false`. They are named after
[George Boole](https://en.wikipedia.org/wiki/George_Boole), an English
mathematician, and they are astonishingly useful in programming, because they
allow programs to make decisions based on values, much like you might make a
decision on where to get dinner based on a series of truth values. For
example, say you eat burritos every day for dinner except Fridays, when there is
a deal on falafel. You ask yourself the question, “Is today Friday?” If the
answer is “yes” (`true`), then you go to the falafel joint. If the answer is
“no” (`false`), you get a burrito.

Since booleans are only ever true or false, you refer to them in JavaScript
using those two words:

```javascript
$("#results-div").html(true);
```

Notice that `true` and `false` do *not* have double quotes around them. But `true` and `false` are more useful when you write truth tests. Try this:

```javascript
$("#results-div").html(9 === 9);
```

Why does it respond `true`? In JavaScript, `===` is a **comparison operator**
that we use in a truth test. That is, it compares what is on either side, and
responds `true` or `false` on the result of the test. That is, `9 === 9`
means, briefly, “is `9` the same thing as `9`?” Because they are the same,
JavaScript outputs `true`, and that gets printed to the webpage. Of course, we
know that `9` and `9` are the same thing, but pretty soon, we’ll have
variables where we might not know. Or, even more importantly, maybe we want to
make a decision based on the value, like “is today Friday?”

```javascript
$("#results-div").html(9 === 10);
```

We might expect this to print “false” to the webpage, but instead, nothing
gets printed. Sometimes JavaScript is a bit unpredictable. Between numbers,
strings, and booleans, we can start using JavaScript as a calculator, but one
type remains.

### Null/Undefined

Sometimes we deal with a lack of information, instead of information we
understand as a datum. There are two main ways JavaScript understands that
lack, through an object called `null` and a data type called `undefined`.

`null` is an object that indicates the lack of information. Say you’re filling
out a questionnaire online and you left the last few questions unanswered but
still pressed “Submit.” The answered questions would be strings or numbers,
probably. But how should the computer understand the unanswered questions? The number zero doesn’t
seem right.  Nor does a blank string. In this case, it makes sense to register
that lack of answers with `null`.

`undefined`, on the other hand, is for information that we do not yet have.
Using the questionnaire example again, all of the answers are `undefined`
until you press “Submit” and send them to the computer, where it can then
decide what to do with them, by turning them into strings, numbers, or just
`null`.

The distinction is tricky, but often you’ll end up with `null` or `undefined`
in unexpected places, and it’s useful to know what they are.

</section>
<section id="javascript-as-a-calculator">
## Using JavaScript as a calculator

You learned a comparison operator in the previous section, `===`, and you’ll
learn a few more in this section. The comparison operators, like `===`,
respond with `true` or `false`. Try:

```javascript
$("#results-div").html(2 + 3 * 6 < (2 + 3) * 6);
```

Programmers have figured out nifty ways to get around the difficulty of typing
≥ and ≤ by using `>==` and `<==` instead. 

OK, I take it all back. A JavaScript calculator doesn’t sound terribly
interesting, so let’s add one more wrinkle to it by introducing variables.

</section>
<section id="calculator-understood-variables">
## What if the calculator understood variables?

Everything we have been doing above is fun for about three seconds. It is
interesting to test edge cases (what happens when you multiply a number with a
boolean?), of course, as that is a good way to understand the assumptions the
language is making. But we’re building websites, not calculators.

So let’s expand on what we’ve already learned, then, with the `const`
statement, which lets us define and assign variables. Type into `scripts.js`:

```javascript
const burrito = "Basically the best food around.";
$("#results-div").html(burrito);
```

We’ve added a line above that tried and true line in `scripts.js`. Typically
in JavaScript, a program moves downward, line-by-line. In the first line, you
**defined** a variable, `burrito`, and **assigned** to it the string,
“Basically the best food around.”[^let]

Then you tell jQuery to print the value assigned to the variable `burrito`,
and it prints `Basically the best food around.`

Any of the data types you have learned about already you can assign to a
variable, and we can define multiple variables at once.

```javascript
const magicNumber = 9;
const secretNumber = 10;
$("#results-div").html(secretNumber + magicNumber);
```

Let’s play a bit more with assigning variables:

```javascript
const tipRate = 0.20;
const bill = 10.00;
const billPlusTip = bill + (tipRate * bill);
$("#results-div").html(billPlusTip);
```

And then:

```javascript
const question = "What is the best food around?";
const burritos = "Delicious burritos";
const answer = burritos + " are clearly the best!";
$("#results-div").html(question + "<br>" + answer);
```

Again, these examples are pretty straightforward, but they’re doing important
things. You see how you can define variables (like `billPlusTip` entirely
within the context of other variables. Similarly, you see that you can use `+`
to glue strings together, like `burritos` and `"are clearly the best!"`. And
there is even bonus content: the HTML tag `<br>` creates a line break, which
is why `question` and `answer` print on separate lines.

</section>
<section id="exercises">
## Exercises

2. What happens when you surround `true` or `false` with double quotes? Are
   they still booleans?

6. What happens when you add a string to a number? What about the reverse?
   Why?

7. Use the statements to find `billPlusTip` above but print “You should pay
   $12 because the service was good.” to the webpage.

</section>

## Footnotes

[^language-type]: In this course, most of the JavaScript will be procedural, which encourages a step-by-step way of thinking through a solution. Once we move to making maps with Leaflet, the more object-oriented aspects will emerge. JavaScript’s functional personality is its most powerful and appealing, but it strikes me as the most difficult to understand and teach.

[^quoting]: Yes, JavaScript permits using single quotes as well, but you should use double quotes exclusively.

[^let]: `const` is a statement that is not supported in all JavaScript
  consoles, but it should work in all “modern” browsers. Nevertheless, if the
burrito example doesn’t print, open the JavaScript console while looking at
your page, where you might see `Uncaught SyntaxError: Unexpected identifier`,
then you have one of those older browsers. The best move is to upgrade
browsers, but if you can’t, the second solution is, luckily,
straightforward. For the duration of this course, where I instruct you to use
`const`, you can use `var`, instead.

[^consolelog]: More precisely, `console` is a JavaScript object (similar to `window` or `document`, as we’ll see later) that refers to the console you have opened in your browser. `.log()` is a “method” specific to the `console` object that outputs whatever is in sent as a parameter (or, inside the `()`).  In our example, we sent the console a snippet of text, `"Hello, World!"`, and it returned it to us.

[^html]: Yes, you are now writing HTML without learning how to do it. The key grammar of the markup is clear from this example, though. HTML is made up of nested tags that look like this, for example: `<h1>` to open and `</h1>` to close. Some tags, like the `<meta>` and `<!doctype>` tags don’t need to be closed, but most do.  
