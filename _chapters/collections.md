---
chapter-no: 3
title: Collections and Control
summary: `Object`s / Arrays / Control flow / If statements
---

“Data,” you may recall, is a plural. Just like “bacteria” is a collection of
many instances of a single “bacterium,” so it is with data. Data are a
collection of single “datums.” So far, we’ve been working for the
most part with just single pieces of information, like a single number. We’ve
been using that number with other numbers, of course, but not as a collection
of information. 

A collection of information combines to form something larger than it itself.
In this chapter, we’ll be learning about two of those collection forms,
**`Object`s** and **arrays**. Throughout this course, I refer to the former as
`Object`s just to underscore how vital they are to programming. They won’t
seem terribly important at first, but we’ll see their power grow alongside the
chapter numbers.

Then, because we don’t yet know a lot about how to make `Object`s and arrays
show their power, we’ll learn about control flow and put the `===` truth test
to use.

<section id="objects">
## `Object`s

Two rules: 

1. in JavaScript, an `Object` is a collection of data that **has properties**

2. in JavaScript, an `Object` is defined inside `{}` (“braces,” in American
   English). 

Freeze these two into your head. `Object`s have properties, and they’re
defined in braces. We’ll see braces used elsewhere in JavaScript, alas, but
you should be able to recognize the difference. So let’s define an `Object`:

```javascript
const myBurritoObject = {
  tortilla: "wheat",
  guacamole: true,
  beans: "pinto",
  habaneroSauceSquirts: 3
  };
$("#results-div").html(myBurritoObject["tortilla"]);
```

What prints? Hopefully, “wheat.” That is, we have defined an `Object` and
alongside defined four properties: `tortilla`, `guacamole`, `beans`, and
`habaneroSauceSquirts`. And we assigned the string `"wheat"` to the `tortilla`
property. Properties can be named nearly anything, and they can be assigned
nearly anything, including, of course, other `Object`s. Here we assign
strings, a boolean, and a number. 

An `Object` by itself doesn’t seem so special, but it formalizes a data
structure, which is to say, it provides a blueprint for how a website talks
about certain things. For example, say your website was for burrito
deliveries. Every burrito ordered would be an `Object`, and an order would
come in as a list (or, ahem, _array_) of `Object`s, and you could see how many
need guacamole, which beans are more popular, pinto or black, and so on. That
is, not only do the properties inhere _within_ the `Object`, but they allow us
to organize or work with several `Objects`.

For example, assume a web map that shows a bunch of points. We can think of
that as a list (_array_) of `Object`s, where each `Object` has a `latitude`
property and a `longitude` property. And maybe it has a `color` property to
tell the browser what color the dot should be. And then a `radius` property
for how big… and so on.
</section>

<section id="arrays">
## Arrays

If `Object`s are defined with braces (`{}`), an array is a list of pieces of
information surrounded by `[]`, or “brackets,” in American English.  The
following are all valid arrays, and you can type them into your `scripts.js`:

```javascript
const arrayOfStrings = ["a", "b", "c"];
const arrayOfNumbers = [1, 2, 3];
const arrayMixed = ["a", null, true, arrayOfNumbers, [4.5, 5.6], { tortilla: "wheat" }];
```

Notice that you are not limited to a single data type in an array. Strings,
numbers, `null`, `true`, variables, `Object`s, and even other arrays can be
used as the contents of arrays. 

Each item in an array can be accessed by its **index**, which is an integer
unique to that item. The indices begin with 0, which is confusing for
beginners. So if you add to the above:

```javascript
$("#results-div").html(arrayOfStrings[2]);
```

`#results-div` will read “c.” The third value of the array is `"c"`, but its index
is 2, because the index begins with 0. So to get “a,” we would call
`$("#results-div").html(arrayOfStrings[0]);`. We are interested in the zeroth
value. Again, I know this is confusing, but you will get the hang of it with
practice, and then you can join that exclusive club of people who make jokes
about zero-based numbering.

For now, that's about all you need to know about arrays: how to make them and
how to access a particular member. But when we get to looping, then arrays
will truly shine, especially in concert with `Object`s. So let’s start
thinking a bit more big-time.
</section>

<section id="control-flow">
## Control flow

**Control flow** is an idea you’ve probably seen before, like in flow charts.
They’re all over social media and often funny. In a flow chart, you start from
some position and answer questions. Depending on the answers to those
questions, you end up in a certain location. Other answers lead you somewhere
else. But the idea is that you are interacting with information, in that you
are being provided a prompt for some input, and your input directs what
happens.

Let’s sketch out a toy program to begin illustrating control flow in a
program.

We want to write a program that asks the user what they want for dinner. If
they answer “burrito,” the program congratulates their choice. If they answer
anything else, the program scolds them for not wanting a burrito. What might
that look like in **pseudocode** (pretend programming that’s not a real
language)? Let’s try it out while also using some JavaScript we already know.

First, the program needs to get the information from the user, so we need some
kind of input. Let’s save that as a variable.

```
// THIS IS PSEUDOCODE. It is for illustration only. It will crash.
//
const userInput;
userInput = prompt_the_user_for_what_they_want_for_dinner;
```

We have a variable now, `userInput`, that has whatever the user has input. Now
let’s test that variable, using the `===` operator you’ve already learned.

```
// THIS IS PSEUDOCODE. It is for illustration only. It will crash.
//
if userInput === "burrito";
  then $("#results-div").html("Brilliant choice!");
```

OK. But what if the input *isn’t* “burrito”?

```
// THIS IS PSEUDOCODE. It is for illustration only. It will crash.
//
if userInput !== "burrito";
  then $("#results-div").html("Don’t you want a burrito?");
```

Here I’m using the negation operator `!==`. It’s the same as `===`, but its
inverse.

And that’s it. We have our program. The JavaScript, as we’ll see, isn’t so
terribly different from this code we already have. But the intuition here is
to see that the program is making a decision based on the value assigned to a
variable. Previously, we’ve just been defining variables and then printing
their values to our webpage with a little manipulation here and there. Now,
however, we’re directing traffic. We’re directing the flow of information. 

If the user only ever wants a burrito, two things happen: first, we know the
user has excellent taste. Second, however, is that the code for scolding never
gets run. It’s an information path that never gets taken. But computers are
very literal and kind of dumb. They can’t roll with unexpected information, so
we need to spell out, in detail, every move that could be made. This is
especially important in error handling, as we’ll see in later chapters.

</section>
<section id="if-statements">
## If statements

Back to the pseudocode, however. We used an “if / then” statement in it, which
is an example of a **conditional statement**. That means that it behaves in a
certain way depending on a condition. From the example above, we can read

```
// THIS IS PSEUDOCODE. It is for illustration only. It will crash.
//
if userInput === "burrito";
  then $("#results-div").html("Brilliant choice!");
```

As “If the condition that the variable `userInput` is equivalent to the string
‘burrito’ is true, then print the string ‘Brilliant choice!’ to the webpage.”

That’s a mouthful, but it is actually three distinct steps:

1. The test of whether `userInput` is equivalent to the string “burrito.”
2. If the test in 1. is `true`, then the condition in the if statement is met,
   so we can go on to 3.
3. print the string “Brilliant choice!”

Now, JavaScript’s syntax is different from the pseudocode above. First, there
is no `then` statement. Instead, that `then` is replaced with braces (`{}`).
Everything within the braces gets executed if the truth test (`userInput ===
"burrito"`) returns `true`. And the truth test itself is surrounded by
parentheses. Generically, then, it looks like this:

```javascript
// This code is for illustration only. It will crash your console.
//
if ( truth_test ) {
  do_things_if_the_test_returns_true;
}
```

Note where the semicolons are (and are not!) in this example. Now we can fill
it out with some of our toy program. We know that `do_things…` is actually 
`$("#results-div").html("Brilliant choice!")`, so we can put that in. As for
`truth_test`, let’s just put in `true` for now.

```javascript
if ( true ) {
  $("#results-div").html("Brilliant choice!");
}
```

Type this into `scripts.js`, save, and then reload your webpage. You should
get “Brilliant choice!” printed to the webpage. Now replace `true` with
`false`. What happens? Why?

Now you can add some complexity, this time using the variable `userInput`:

```javascript
const userInput = "burrito";
if ( userInput === "burrito" ) {
  $("#results-div").html("Brilliant choice!");
}
```

Notice where you have to use `=` (which *assigns* a value to a variable) and
where you have to use `===` (which *tests* whether something is true). If you
type this in `scripts.js`, again it should congratulate you. If you replace the
second line with `userInput = "samosa";`, what happens? Why?

In our program, we had a second condition, which would scold the user if they
didn’t want a burrito. That’s pretty straightforward to write:

```javascript
const userInput = "samosa";
if ( userInput !== "burrito" ) {
  $("#results-div").html("Don’t you want a burrito?");
} else {
  $("#results-div").html("Don’t you want a burrito?");
}
```

Now, we can see this as “if the truth test is true, then print ‘Brilliant
choice!’ Otherwise, respond ‘Don’t you want a burrito?’” If you type this
snippet into `scripts.js`, you’ll see that it scolds you. What do you have to
change so that it congratulates you?

The last part of our pseudocode is handling user input. That is, where does
the value for `userInput` come from? It’s possible to do something like this
instead of the first line:

```javascript
const userInput = prompt("What do you want to eat for lunch?");
```

And then run the rest of the program, but `prompt()` doesn’t work on all
browsers, and the focus of this course is using JavaScript to tell stories,
not ask for information. We provide the information already.

We have one step left before you have all the basics of JavaScript, so relax
on this shorter chapter that has no homework.
</section>
