---
chapter-no: 4
title: Functions
summary: Parameters / Scope / Recursion
---

The [previous chapter](/3-programming) was rather light, but it introduced
`Object`s and arrays, which will be central to the programming we do from here
on. For this chapter, we’ll be breaking out the braces (`{}`) again, but now
in terms of a **block** of code. That is, we’ll be defining **functions**,
which are compact, reusable snippets of programming.

<section id="function-function">
## Function, function, what's your…

Functions break up your code into smaller pieces. This means that it’s easier
to reason about your work abstractly and find problems. Additionally,
functions also automate repetitive tasks, and that’s the way I’ll introduce
them to you.

Imagine if you want your computer to make burritos. Wouldn’t it be great to
just tell it “make a burrito” every time you wanted one, instead of saying
“get out the tortillas, take one out, place it on the griddle,” and so on? We
make little tasks in our daily life abstract using the huge figurative power
of language as well as our own memories. Computers can’t think as abstractly,
however. And though they do have memories, we still need to spell things out
in detail. Yet once we do it, we’re set. We can ask the computer to make us a
burrito from then on.

Of course, I don’t think computers can make good burritos, but stick with me.

All those burrito-making instructions can be collapsed into a function. That
might look something like:

```javascript
// This code is for illustration only. It will crash.
//
const makeABurrito = function(){
  prepareTortilla();
  addBeans();
  addOnionsAndCilantro();
  // etc.
  rollUpTortilla();
}
```

As you can see, there are syntactic similarities between functions and
`if(){}` statements. Both use blocks with braces, and both have parentheses.
In fact, this snippet of code is perfectly fine JavaScript. That’s because the
`makeABurrito()` function does nothing but **call** other functions. The only
reason it will crash is because the inner functions (`prepareTortilla()`)
aren’t defined. But we can imagine that a function like `prepareTortilla()`
has even more specific steps inside it. But with the function in place, you
just have to execute `makeABurrito()` once and be done with it. The internals
of the function take care of everything else.

Quickly before moving on, that line `// etc.` is a **comment**. I mention
comments in a comment in `scripts.js`, but now I’ll spell out what they are in
the text, too. Comments are very useful in programming because they can serve
as little messages to yourself (or to other programmers) about what is going
on in your program.  In JavaScript, everything after two slashes (`//`) to the
end of the line is **commented out**. If you want to comment out a whole
section of multiple lines, begin it with `/*` and close it with `*/`. Or you
can put a `//` in front of every line. I’ll start commenting the code I
provide, where necessary. In Atom, you can quickly comment out (or uncomment,
depending) a line of code by just typing <kbd>Cmd</kbd> <kbd>/</kbd> on Mac
and <kbd>Ctrl</kbd> <kbd>/</kbd> on Windows.

</section>
<section id="parameters">
## Parameters

Back to the function. Did you notice the parentheses that follow the function
name? Where have you seen this kind of of syntax before? 

```javascript
$("#results-div").html("This is a boring string.");
```

Here we see the same syntax, but the parentheses aren’t empty. Instead, they
have strings in them. Because I’ve told you this is so, we know that the above
line of JavaScript replaces the contents of something with the id
`results-div` with “This is a boring string.” But what I didn’t tell you
until now is that this is actually two *functions*, chained together with the
`.`. `$()` is shorthand for `jQuery()`, which is the jQuery **selector**
function that we’ll learn about more later. Then, `.html()` is a function that
replaces the HTML inside whatever the selector has selected. `"#results-div"`
and `"This is a boring string."` are **parameters** we are **sending** to the
function.[^arguments] And, in fact, we can (and have) replaced them with
variables:

```javascript
const selectedDiv = "#results-div";
const newHtml = "This is a boring string.";
$(selectedDiv).html(newHtml);
```

This works in exactly the same way.  Giving functions parameters lets us
change the internals of the function to let it react to specific instances.
Now sometimes I want black beans in my burrito, and sometimes I want pinto
beans. Let’s add a parameter to `makeABurrito()` to let us specify which beans
to use on the fly:

```javascript
// This code is for illustration only. It will crash your console.
//
const makeABurrito = function(beansVariable){
  prepareTortilla();
  addBeans();
  addOnionsAndCilantro();
  const beansResponse = "You ordered " + beansVariable + " beans. Good choice!";
  $("#results-div").html(beansResponse);
  // etc.
  rollUpTortilla();
}
```

If we were to execute:

```javascript
// This code is for illustration only. It will crash your console.
//
const blackBeans = "black";
makeABurrito(blackBeans);
```

We would see that the webpage would now read “You ordered black beans. Good
choice!” Don’t actually try this, yet, though. Can you see why that is the
case? We define a variable, `blackBeans` and assign it to the string
`"black"`.  Next, we send (or **pass**) that variable as a parameter to
`makeABurrito()`.  Now, inside the function, we see that it makes reference to
a `beansVariable`, that has the value “black,” which it then prints in
`#results-div`, like we did last chapter.

But where did `beansVariable` come from? And how did it get set to “black”?
There’s no `const beansVariable = "black"`, after all. The answer is that the
variable is defined at the same time as the function is. `makeABurrito =
function(beansVariable){}` defines both the function, `makeABurrito()`, and
the parameter, `beansVariable`, which can be used as a variable inside the
function.

The number of parameters you can define is up to you. Imagine you had
different kinds of tortillas, like whole wheat and regular wheat. You can
redefine the function as:

```javascript
// This code is for illustration only. It will crash your console.
//
const makeABurrito = function(beansVariable, tortillaVariable){
  prepareTortilla(tortillaVariable);
  addBeans(beansVariable);
  addOnionsAndCilantro();
  // etc.
  rollUpTortilla();
}
```

What would happen if you executed `makeABurrito("black", "whole wheat")`?

</section>
<section id="back-to-numbers">
## Back to numbers

`makeABurrito()` is a great function, and it’s making me hungry, but we can’t
actually *use* it, because it relies on so many functions we haven’t defined.
So let’s abandon it for a bit and go back to using numbers. Back in [Chapter
2](/2-calculator), we made a tipping calculator. We can build on that example
with real, usable code.

First, what information do you need in order to know how much to tip? You need
to know the `total` and the `tipRate`, which is a percentage, like 15 or 20%.
The barebones function looks like this, then:

```javascript
const tipCalculator = function(total, tipRate){
  // 1. Calculate the percentage of the total 
  // as a variable “tipAmount”
  //
  // 2. Change #results-div to tell us the tip
  // amount.
} 
```

In fact, type this into your `scripts.js` file. It can go after the earlier
code you’ve written, or it can replace it. Note what’s in the comments; it’s a
sketch of what the function will do. The first step is that it’ll do some
math—an easy calculation. In the second step, it will tell us what the result
of the calculation is.

```javascript
const tipCalculator = function(total, tipRate){
  // step 1:
  const tipAmount = tipRate * total;
  // and step 2:
  $("#results-div").html("Your tip is $" + tipAmount);
}; 

// Now call (or “execute”) the function, passing a 
// total of $50.00 and a tipRate of 20%:

tipCalculator(50.00, 0.2);
```

Save and reload, and the webpage should now inform you that you owe $10. If it
does, commit. In the exercises, we’ll expand on this function. Note, however,
that that variable, `tipAmount`, only exists *inside* the `tipCalculator()`
function. This is because, in JavaScript, variables defined with `const` are
**scoped** to the block (whatever’s in `{}`) in which they’re defined.

That is, just like a “scope” is used to see things that are far away (tele*scope*) or
are really tiny (micro*scope*), in JavaScript, scope also has to do with
visbility. Variables are only “visible” within the block. Of course, there’s a
“master block” (actually called `window` on the browser) that holds whatever
we’re writing in `scripts.js`, which is why when we define a variable on one
line, it’s available on the next. 

Scope is a tricky concept to get right, and even experienced programmers (or,
at least, me) sometimes use variables that are out of scope. 

</section>
<section id="methods">
## Methods

In the previous chapter, we learned that `Object`s have properties. That’s the
most important thing about them. And we also learned that properties can be
anything: a string, a number, a boolean, an array, another object. Anything.

Even a function.

For example, to return to `myBurritoObject`, you can add a new property:

```javascript
// First, define and assign a variable for how 
// spicy the burrito is.
const myHabaneroSauceSquirts = 3;
// Now assign the burrito object.
const myBurritoObject = {
  tortilla: "wheat",
  guacamole: true,
  beans: "pinto",
  // Make use of the variable above.
  habaneroSauceSquirts: myHabaneroSauceSquirts,
  // Use the variable again in a function.
  spiciness() {
    if (myHabaneroSauceSquirts > 0 ){
      alert("This is a spicy burrito!");
    } else {
      alert("This is a mild burrito.");
    }
  }
};
$("#results-div").html("Your burrito has " +
  myBurritoObject.habaneroSauceSquirts +
  " squirts of habanero.");
myBurritoObject.spiciness();
```

Save, and reload, and see what happens. If you’re told the burrito is spicy,
commit. Now let’s have a look at the two new things I’m presenting here. The
first is that I use a `.` to call a property with
`myBurritoObject.habaneroSauceSquirts` and with `myBurritoObject.spiciness()`.
This is called **dot-notation**, and it is a feature of `Object`s. If I wanted
to get “wheat,” I could execute `myBurritoObject.tortilla`, for example. And,
in the jQuery example we’ve been using all course, that’s what the `.` before
`html()` does. `html()` is a *property* of the jQuery selector `Object`.

When the property of an `Object` is a function, we call it a **method**.
Hence, more correctly, `.html()` is a _method_ of the jQuery selector
`Object`, and, in our example, `.spiciness()` is a method of the
`myBurritoObject` `Object`.

The next thing is that I define `.spiciness()` as a method by using the syntax
above, where instead of a `:`, I use `()`, and then I wrap the method in `{}`,
just like when defining a function.

Now, we’ve seen that `myBurritoObject` has a method, `.spiciness()`. We’ve
seen that `$()` has a method, `.html()`. But arrays have methods, too:

```javascript
const turtles = ["Leonardo", "Donatello", "Raphael", "Michelangelo"];
$("#results-div").html(turtles.sort());
```

The `.sort()` method sorts the array in alphabetical order. But the result
isn’t pretty. So let’s add the `.join()` method that all arrays have:

```javascript
const turtles = ["Leonardo", "Donatello", "Raphael", "Michelangelo"];
$("#results-div").html(turtles.sort().join(", "));
```

`.join()` takes an array and turns it into a string, using whatever you *pass*
`.join()` as the glue between array items. In our case, that’s “, ”, which
turns “LeonardoDonatelloRaphaelMichelangelo” into “Leonardo, Donatello,
Raphael, Michelangelo.”

There was one other trick here, I did **method chaining**, which is when you
add a method to the end of another method. Because the result of `.sort()` is
an array just like `turtles` is an array, then it has the builtin method
`.join()` just like `turtles` does. Try inserting a `.reverse()` in between
`.sort()` and `.join()`. What happens?
</section>

<section id="strings-like-arrays">
## Strings as arraylike things

Strings, too, have methods and properties. And they can behave array-ishly.
I’ll mention a few here, because manipulating strings (or “text”) is a vital
feature of writing web pages.

```javascript
const string = "This is a string.";
// Strings have indices and lengths, just like arrays:
const firstLetter = string[0];
// firstLetter is "T"
const stringLength = string.length;
// stringLength is 17
//
// Strings also have methods, just like arrays:
const upperCaseString = string.toUpperCase();
// upperCaseString is "THIS IS A STRING."
const replacedString = string.replace("string", "pipe");
// replacedString is "This is a pipe."
```

</section>
<section id="exercises">
## Exercises

1. Add functionality to the tip calculator so that you can enter “20” *or*
   “.2” for 20%, and the calculator understands the difference.

</section>

## Footnotes

[^arguments]: Parameters are also often called **arguments**, but to my ears, that term is more opaque.
