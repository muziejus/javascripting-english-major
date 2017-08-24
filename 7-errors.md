---
layout: default
title: Oops!
permalink: /7-errors
prevch: /6-abstraction
nextch: /8-webpage
---


Typically in an introduction to programming course, about here is where we
would start drilling down deeper into how `Object`s work, the idea being that
creating our own `Object`s that have built-in methods, etc., would be rather
useful. Abstractly, that is certainly the case. But since we’re moving ahead
to a very specific goal, learning about how to create `Object` prototypes and
the like can be saved for later, if at all.

Instead, we’ll close out this first half of the course by talking about
mistakes. They happen in programming. Sometimes they’re simple mistakes, like
typos, that can break programs. Luckily, those tend to be easy to spot.
Sometimes they are conceptual errors that arise from making erroneous
assumptions about the data, like the `.pop().reverse()` example in the
[previous chapter](/6-abstraction). Those are a bit trickier to solve, but
it’s possible.

Then there’s the issue of dealing with users giving you bad data, and
defending against that. Every time we have used the `prompt()` function so
far, we have made assumptions about what the user was going to type in, like a
number. In the real world, users find miraculous ways to break programs
(sometimes maliciously, but sometimes not). Even something as simple as
entering a name can break a program; when I type in my name into many systems,
I get errors, telling me my name has too many words. That means that the
program is checking for things that look like user mistakes and handling them.
Unfortunately, my name isn’t wrong; it’s their assumption about what a name
looks like that is. But that programmers are not particularly empathetic and
attuned to the wide variety of the world around them is nothing new. Anyway… 

Let’s look at the first line of defense, typing errors.

<section id="jshint">
## JSHint

Back in [chapter 1](/1-environment/), I had you install the
[`linter-jshint`](https://atom.io/packages/linter-jshint) package into Atom. A
linter cleans out the lint from code, ensuring that the code is clean and
lean. The linter has, then, two tasks. The first is to ensure a consistent
style to your programming. For example, the linter can complain whenever you
are using single quotes instead of double quotes to quote a string. But the
linter can also catch syntax errors, that is, errors that will simply break
JavaScript. Open up the `scripts.js` file in Atom, and type this in the last
two lines:

```javascript
let brokenVariable;
brokenVariable = "This will be broken';
```

Little red dots will appear near that last line, complaining about an “Unclosed
string” and a “Missing semicolon.” That is because you typed a single quote
when JavaScript was expecting a double quote.

JSHint is set to be pretty strict, and the errors the linter throws up are
meant to be annoying enough to change how you write your code to fix them.
It’s hard to believe there was a time when writing code didn’t benefit from
linters, and you could spend hours looking at your code trying to figure out
why it didn’t run. Not didn’t *work*, mind, but didn’t even *run*.

</section>
<section id="mistakes">
## Mistakes

Since the linter handles syntax errors, we’re not as likely to run into those
when coding. That’s great, because it lets us spend more time on more
complicated mistakes. Let’s revisit the `.pop().reverse()` error from last
chapter. Go ahead and make sure your `scripts.js` file looks like this:

```javascript
let turtlesWithSplinter, reversedTurtlesWithoutSplinter;
turtlesWithSplinter = ["Leonardo", "Donatello", "Raphael", "Michelangelo", "Splinter"];
// oops. let's pop() Splinter off before reversing…
reversedTurtlesWithoutSplinter = turtlesWithSplinter.pop().reverse();
$("#response").html(reversedTurtlesWithoutSplinter);
```

How could we have debugged this? It turns out, in fact, that `console.log()`
is there more for debugging than it is for what we’ve been using it for
throughout this course. It’s the console that tells us why we have the error,
after all. It says, `TypeError`, and though that is a relatively clear error
if you know the language deeply, it’s not clear for beginners. But the
console is helpful in telling us that the error is on line 3.

In solving the problem, we can try to turn it into English:

1. We are creating a variable named `reversedTurtlesWithoutSplinter`.
1. We want to assign to the variable the `turtlesWithSplinter` array, but
   without `"Splinter"` and reversed.
1. To get rid of `"Splinter"`, we use the `.pop()` method.
1. To reverse the array, we use the `.reverse()` method.

What are our assumptions here? In the first step, we are assuming that there
isn’t already a variable defined called `reversedTurtlesWithoutSplinter`.
Since the only JavaScript other than jQuery that the page is loading is
`scripts.js`, we know that isn’t the problem. Similarly, JSHint would have
caught the error if we were defining (with `let`) a variable that had already
been defined. So we know the first step is clear.

In the second step, we’re assuming that the `turtlesWithSplinter` variable
exists and that it’s an array. Again, since we just defined it two lines
earlier, let’s assume that’s not the problem for now.

Here the assumptions start causing problems. We assume in step three that
`.pop()` will remove `"Splinter"` from the array. So let’s break that off into
a separate step, comment out the line that is creating the error and the jQuery line, and have the console tell us what `turtlesWithoutSplinter` equals:

```javascript
let turtlesWithSplinter, turtlesWithoutSplinter, reversedTurtlesWithoutSplinter;
turtlesWithSplinter = ["Leonardo", "Donatello", "Raphael", "Michelangelo", "Splinter"];
// oops. let's pop() Splinter off before reversing…
turtlesWithoutSplinter = turtlesWithSplinter.pop();
console.log(turtlesWithoutSplinter);
//reversedTurtlesWithoutSplinter = turtlesWithSplinter.pop().reverse();
//$("#response").html(reversedTurtlesWithoutSplinter);
```

Save, reload, and the console now reads `"Splinter"`. At least it’s not
causing errors.

But this shows us why we had the error. `turtlesWithoutSplinter` does *not*
equal the array, as we thought it might. Instead, it’s just a single string,
`"Splinter"`. We made a bad assumption, and now we have to solve it. Two
techniques work here. The first is to `.pop()` the array, and then create a
new array that is the popped array, but reversed:

```javascript
let turtlesWithSplinter, reversedTurtlesWithoutSplinter;
turtlesWithSplinter = ["Leonardo", "Donatello", "Raphael", "Michelangelo", "Splinter"];
// oops. let's pop() Splinter off before reversing…
turtlesWithSplinter.pop();
// turtlesWithSplinter is now, paradoxically, without Splinter.
// Now define a new array that is reversed.
reversedTurtlesWithoutSplinter = turtlesWithSplinter.reverse();
$("#response").html(reversedTurtlesWithoutSplinter);
```

We get the result we want. However, there is another way to do this, by
avoiding `.pop()` entirely:

```javascript
let turtlesWithSplinter, reversedTurtlesWithoutSplinter;
turtlesWithSplinter = ["Leonardo", "Donatello", "Raphael", "Michelangelo", "Splinter"];
// Use .filter() instead of .pop().
reversedTurtlesWithoutSplinter = turtlesWithSplinter.filter(function(turtle){
  // What is the value of turtle?
  console.log(turtle);
  return turtle !== "Splinter";
}).reverse();
$("#response").html(reversedTurtlesWithoutSplinter);
```

This is much tidier because it does not make the assumption, as `.pop()` does,
that `"Splinter"` is the last value. Instead, it uses `.filter()` to return
all the strings that *do not* match `"Splinter"`. That’s what `!==` means. So
we get an array of all the strings except `"Splinter"`, and that happens to be
our turtles array, which we can then reverse with no difficult and print to
the webpage.

The trick here is to break down the program into tiny pieces and to test our
assumptions, making use of `console.log()` to keep us sane, so we know what
the program is doing. Writing these little tests is completely normal and
actually good practice. In fact, if this were a more rigorous course, I would
be teaching [test-driven
development](https://en.wikipedia.org/wiki/Test-driven_development), where you
write the tests first, and then only write code that makes the tests pass. But
that takes us to the final part, dealing with users.

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
//<-- "string"
> y = x + 3;
//<-- "string3"
> z = x * 3;
//<-- NaN
```

There’s that confusing `NaN` type, the “Not a Number.” Instead of breaking and
saying something like “cannot multiply a string!” JavaScript instead just
quietly fails, sets the response to `NaN` and moves on. This level of
forgiveness can cause trouble, because finding what, precisely, caused your
expected number to become not a number can be difficult.

In fact, we’ve already used (and benefited from) JavaScript’s forgiveness.
Remember the `tipCalculator()` function in [chapter 4](/4-functions)? It
relied on `prompt()` to get numbers from the user in order to calculate a tip.
Let’s revisit that part, too, in the console:

```javascript
> let promptValue;
> promptValue = prompt("Type in a number, please.");
//<-- "2"
> typeof promptValue;
//<-- "string"
> promptValue = promptValue + 3;
//<-- "23"
> promptValue = promptValue * 3;
//<-- 69
> typeof promptValue;
//<-- "number"
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
	// do the calculations on promptValue knowing it
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
