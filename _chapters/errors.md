---
chapter-no: 7
title: Oops!
summary:  Try & Catch / ESLint / Mistakes / User error
---

That previous chapter was a lot of conceptual work, I think, and for a lot of
it, you were flying blind. That is, if you made a mistake in your code, there
wasn’t much you could do about it, other than reload the webpage and say “OK,
it’s still not working.” That’s very frustrating, and, what’s more, it’s not
very useful moving forward, when you’ll be encouraged to start trying things
out on your own and building your own project while using this text only as a
template. So let’s learn how to handle errors.

Mistakes. They happen in programming. Sometimes they’re simple mistakes, like
typos, that can break programs. Luckily, those tend to be easy to spot.
Sometimes they are conceptual errors that arise from making erroneous
assumptions about the data. Those are a bit trickier to solve, but it’s
possible.

Then there’s the issue of dealing with users giving you bad data, and
defending against that. Though we’re not dealing with user input in this
course, in the real world, users find miraculous ways to break programs
(sometimes maliciously, but sometimes not). Even something as simple as
entering a name can break a program; when I type in my name into many systems,
I get errors, telling me my name has too many words. That means that the
program is checking for things that look like user mistakes and handling them.
Unfortunately, my name isn’t wrong; it’s their assumption about what a name
looks like that is. But that programmers are not particularly empathetic and
attuned to the wide variety of the world around them is nothing new. Anyway… 

Let’s look at the first line of defense, JavaScript’s own built-in error
handling.

<section id="try-catch">
## Try & Catch

JavaScript lets you `try` out some code in safety without taking everything
down. If there is an error, it `catch`es the error, and then you can do
something with it. So let’s create a `try` sandbox out of `scripts.js`. Load
it up and paste this in:

```javascript
// script.js for The JavaScripting English Major
//
// This is a JavaScript file where you can type up your JavaScript
// that will get processed by the file index.html, as you can see
// on line 16 of index.html. Lines 13–15 of that file import the
// jQuery library (https://jquery.com/), which means you use
// jQuery in this file.
//
// Because these lines begin with “//,” they are commented out,
// that is, ignored by the browser. Hence, in order to rewrite the
// contents of the “results-div,” you can uncomment the line below:
try {

  $("#results-div").html("This is a boring string.");

}
catch(error) {
  $("#error-div")
    .css("border", "1px solid red")
    .css("padding", "1rem");
  $("#error-div").html(`There was an error: ${error}.`);
}
```

If you save and reload your webpage, everything should work fine. But now
change line 14 to `$("#results-div").html(undefinedVariable);`. Save and reload
your webpage. Now what happens?

There should be an error printed to your webpage, specifically: “There was an
error: ReferenceError: undefinedVariable is not defined.” And that error
should be surrounded by a pretty red border. So what’s going on here?

First, we’re trying some code. When you had `"This is a boring string."`,
there was no error, because everything was working correctly. the jQuery
method `.html()` is waiting for a string (or a function or a number), and we
gave it that. However, `undefinedVariable` is *not* a string. It’s a variable.
But still, if it were assigned to a string, it would still work. But it’s
assigned to nothing. It is **undefined**. Hence, the `.html()` method can’t
work with it, and JavaScript **throws** an error.

Where does that error go? Well, if something is _thrown_, then it must get
_caught_, and that’s where the `catch` block comes in. That block catches the
error, as the variable `error`, and then does two things with it. First, it
does some jQuery magic (using the `.css()` method) to add that red border and
some padding to the HTML entity with the id `error-div`. Then, it simply
prints “There was an error:” along with the contents of the error it caught.

Now, `try` and `catch` are brilliant if you’re making *programming* mistakes.
But they won’t help you if you’re making *typing* mistakes. That is, if you
forget to close a parenthesis or a set of `""`, your program will simply crash
and no amount of `catch`ing will save you. But here, your linter is your
friend.

<section id="eslint">
## ESLint

Back in [chapter 1](/1-environment/), I had you install the
[`linter-eslint`](https://atom.io/packages/linter-eslint) package into Atom. A
linter cleans out the lint from code, ensuring that the code is clean and
lean. The linter has, then, two tasks. The first is to ensure a consistent
style to your programming. For example, the linter can complain whenever you
are using single quotes instead of double quotes to quote a string. But the
linter can also catch syntax errors, that is, errors that will simply break
JavaScript. Open up `scripts.js` file in Atom, and type this line inside
the `try` block (that is inside `try{` and the `}` right before `catch`):

```javascript
const brokenVariable = "This will be broken';
```

A little red dot will appear to the left of that line, and your code should even
flood with ugly white on red text. The red dot means that the linter found an
error on that line, and it underlined that error with a squiggly red line. If
you hover your mouse near that squiggly line, the linter should show a brief
message about an “Unterminated string constant (Fatal)” like in this image:

![Unterminated string constant error](https://i.imgur.com/ybcWhq2.png)

All this because you typed a single quote when JavaScript was expecting a
double quote. Change it to a double quote, and the garish white on red text
will disappear:

![Style errors](https://i.imgur.com/1Oq6DRd.png)

But we now have *two* red dots, one on line 14 and one on line 15. Hover over
the squiggly red lines. Do you understand the errors?

The first error, “‘undefinedVariable’ is not defined,” is the same error we
were `catch`ing up above. We saw how while that is an error, it doesn’t take
*everything* down, like the “unterminated string constant” error did.

The second error is a bit more subtle. It reads, “‘brokenVariable’ is assigned
a value but never used.” But so what? That’s not crashing JavaScript. So we
defined and assigned a variable but never used it. Big deal! In fact, if you
change that reference to `undefinedVariable` back to `"This is a boring
string."`, save, and reload your webpage, you’ll see that everything is
working fine. No errors appear on the webpage.

This is because assigning a value to a variable, while not an *error*, per se,
is still a coding fashion faux pas. A coding party foul, perhaps. It doesn’t break
the program, but it’s sloppy. It is, in other words, an error of **style**.

ESLint is set to be pretty strict, so it even flags these style errors as
errors, and those red dots are meant to be annoying enough to change how you
write your code to fix them.  It’s hard to believe there was a time when
writing code didn’t benefit from linters, and you could spend hours looking at
your code trying to figure out why it didn’t run. Not didn’t *work*, mind, but
didn’t even *run*.

Now we have software saying our code isn’t pretty enough. Works for me!

</section>
<section id="inspect">

## Inspecting Objects

Often an error arises because we make assumptions about our data that are
wrong. Like we think something is an `Object`, when really it’s an array. It’s
often useful, then, to have a sort of “sanity test” that we can use on the
fly. JavaScript has a built-in means of representing data as plain text,
called **JSON**, and we’ll learn more about it in later chapters. Here,
briefly, I can just say that it turns something like an array into a
“stringified” version of itself. So, inside your `try{ }` block (lines 13–15)
in `scripts.js`, paste in our turtles again and let’s just print that array of
objects to our page:

```javascript
const turtles = [
  { name: "Leonardo", weapon: "katana", favPizza: "mushroom", pizzaSlices: 5 },
  { name: "Donatello", weapon: "bō", favPizza: "mushroom", pizzaSlices: 3 },
  { name: "Raphael", weapon: "sai", favPizza: "cheese", pizzaSlices: 4 },
  { name: "Michelangelo", weapon: "nunchaku", favPizza: "cheese", pizzaSlices: 7 }
];

$("#results-div").html(turtles);
```

What prints? If everything went “correctly,” absolutely nothing. Nothing
prints. And why should it? We’re asking JavaScript to render an object as a
string. But what does that even mean? Yet, at the same time, we *typed* it
using letters. Shouldn’t we be able to see that, somehow? Enter JSON.

The JSON `Object` has a method, `.stringify()`, that turns an `Object` (which
includes an array) into a string. Then we can ask JavaScript to print *that*.
So now change the last line above to:

```javascript
$("#results-div").html(JSON.stringify(turtles, null, 2));
```

That `null` and `2` mean, respectively, what to replace with (nothing), and
how much space to indent (two spaces). Save and reload your webpage. Now you
should see something that kind of looks like what you typed in. Of course,
it’s all unhelpfully printed on one line, but that’s HTML’s fault. So let’s
have HTML respect newlines and spaces by using the `<pre>` tag:

```javascript
$("#results-div").html(`<pre>${JSON.stringify(turtles, null, 2)}</pre>`);
```

Save and reload. By enclosing our stringified array in those `<pre>` tags, the
website prints the array as pretty code. In fact, the code blocks you see in
this very text are just `<pre>` blocks.

Now, there are limits to `JSON.stringify()`. Most importantly, it won’t print
methods that objects may have. But functions and methods (remember, they’re
the same thing…) don’t really change on the fly. When you write a method,
that’s that. But if you’re using `.map()` or `.filter()` to create new arrays,
and they’re not working right, it’s useful to **inspect** your array using
`JSON.stringify()`. If you get something like `[undefined, undefined,
undefined, undefined]`, you’ve made a mistake somewhere for sure! I  use this
technique all. the. time. Partly since I often don’t get all my logic right on
the first try. That takes years more experience than even I have…

</section>

<section id="errors">
## Common Errors

var str = JSON.stringify(obj, null, 2);

Since the linter handles syntax errors, we’re not as likely to run into those
when coding. That’s great, because it lets us spend more time on more
complicated mistakes. 




</section>
<section id="users">
## Users and their mistakes

Part of programming with testing in mind is that it encourages you to think of
the edge cases, when something happens that you couldn’t prepare for. Back in
[chapter 2](/2-calculator), one of the homework assignments asked you to add a
string to a number. It clearly doesn’t work, but it also doesn’t cause
JavaScript to break, like a syntax error would. But let’s revisit that
question by working in the console, with a twist:

```javascript
> let x, y, z;
> x = "string";
//--> "string"
> y = x + 3;
//--> "string3"
> z = x * 3;
//--> NaN
```

There’s that confusing `NaN` type, **Not a Number**. Instead of breaking and
saying something like “cannot multiply a string!” JavaScript instead just
quietly fails, sets the response to `NaN` and moves on. This level of
forgiveness can cause trouble, because finding what, precisely, caused your
expected number to stop being a number can be difficult.

In fact, we’ve already used (and benefited from) JavaScript’s forgiveness.
Remember the `tipCalculator()` function in [chapter 4](/4-functions)? It
relied on `prompt()` to get numbers from the user in order to calculate a tip.
Let’s revisit that part, too, in the console:

```javascript
> let promptValue;
> promptValue = prompt("Type in a number, please.");
//--> "2"
> typeof promptValue;
//--> "string"
> promptValue = promptValue + 3;
//--> "23"
> promptValue = promptValue * 3;
//--> 69
> typeof promptValue;
//--> "number"
```

Wait, what? Let’s follow what happens to our variable `promptValue`. When the
user types it in, it’s a string. This makes sense, the user could type in `2`
as easily as `burrito`. But the user can only type, so assuming the result is
a string is a good one. Next, because `promptValue` is a string, when we add
three to it, it’s just like adding `"string" + 3` and getting `"string3"`, so
we get `"23"`. A little bit weird, but, remember, `promptValue` is a *string*.

Then we multiply it by 3, which in the above example returned `NaN`. Instead
we get the number (not the string) `69`. In other words, the result of
multiplying a number (`23`) times another number (`3`). What on earth
happened? Why did `promptValue` suddenly start behaving like a number? And
then how does `promptValue` start out as a string but end as a number?

The answer, in non-technical terms, is that JavaScript will look at a string,
when it’s being asked to behave like a number, and if it can turn into a
number, it does so. We get the value `"23"`, however, because strings *can*
use the `+` operator. So it stays a string. Confusing, I know. But this shows
that we have to make sure we know what we’re dealing with when we receive data
from a user.

For numbers, one trick is to use the function `isNaN()` on any data we receive
from a user that *must* be a number, so our function could look something like
this:

```javascript
let promptValue;
promptValue = prompt("Type in a number, please");
if (isNaN(promptValue) === true) {
  alert("The value you submitted is not a number");
} else {
  // Do the calculations on promptValue knowing it
  // will behave like a number and move on from here.
}
```

`alert()` makes that little box appear on your browser, similar to `prompt()`.

Of course, over the rest of this course, you will be creating a project where
you, yourself, are the sole source of data. In other words, you will be your
worst enemy. But keep in mind the sorts of valves JavaScript offers, like
`isNaN()`, while also knowing the limitations of things like `typeof`.
Remember, you can always check your sanity in the console.

</section>
<section id="exercises">
## Exercises

1. No homework this time. Enjoy the halfway point. When you come back, it will
   be time to start creating!

## Footnotes

[^haverbeke]: This is where I make my first large deviation from Haverbeke’s book’s structure. The sixth chapter of *Eloquent JavaScript* is “The Hidden Life of Objects,” and none of what is covered in that chapter is covered in this course.
