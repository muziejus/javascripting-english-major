---
title: Oops!
permalink: /7-errors/
---

# Oops!

Typically in an introduction to programming course, about here is where we
would start drilling down deeper into how objects work, the idea being that
creating our own objects that have built-in methods, etc., would be rather
useful. Abstractly, that is certainly the case. But since we’re moving ahead
to a very specific goal, learning about how to create object prototypes and
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
$("#response").text(reversedTurtlesWithoutSplinter);
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
//$("#response").text(reversedTurtlesWithoutSplinter);
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
$("#response").text(reversedTurtlesWithoutSplinter);
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
$("#response").text(reversedTurtlesWithoutSplinter);
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
that takes us to the final part, exceptions and dealing with users.

## Users and Exceptions

Part of programming with testing in mind is that it encourages you to think of
the edge cases, when something happens that you couldn’t prepare for. Let’s
write a tiny program in `scripts.js` that asks for two numbers from the user,
divides them, and squares the result:

```javascript
let dividend, divisor, result;
dividend = prompt("What is the dividend?", "Enter dividend here:");
divisor = prompt("What is the dividend?", "Enter dividend here:");
result = dividend / divisor;
result = result * result;
$("#response").text(result);
```

Save and reload the page. Enter your favorite two integers, and see how
everything works perfectly. Great. But what happens if you enter 0 for both
numbers? You get `NaN`, the infamous not especially useful type “Not a
Number.” Now say you were relying on `result` to do some calculations down the
line. You would just get `NaN` over and over, because once it shows up, it
poisons everything downstream. 

So how can we make sure `result` is a number and not `NaN`? The initial
suspicion is to use the `typeof` operator we learned back in [chapter
2](/2-calculator/). But if you try this in the console:

```javascript
typeof NaN;
//--> "number"
```

In other words, to JavaScript, even though you can’t do anything useful with
it, `NaN` is a number. It’s probably better to use an if statement along with
the `isNaN()` function, which returns `true` if the parameter is `NaN`.

```javascript
let dividend, divisor, result;
dividend = prompt("What is the dividend?", "Enter dividend here:");
divisor = prompt("What is the dividend?", "Enter dividend here:");
result = dividend / divisor;
if (isNaN(result)){
  result  = "The division did not produce a usable number.";
}
result = result * result;
$("#response").text(result);
```

But the response is still `NaN`. Can you see why? The second to last line is
trying multiply a string, `"The division did not produce a usable number"`,
times itself. Of course that will not yield a number. Better to do
something like this:

```javascript
let dividend, divisor, result;
dividend = prompt("What is the dividend?", "Enter dividend here:");
divisor = prompt("What is the dividend?", "Enter dividend here:");
result = dividend / divisor;
if (isNaN(result)){
  $("#response").text("The division did not produce a usable number.");
} else {
  result = result * result;
  $("#response").text(result);
}
```

This branching lets us only do multiplication on things we know are numbers.
Try entering `0` and `0` now.

Now try typing in words instead of numbers.
