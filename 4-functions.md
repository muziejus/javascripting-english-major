---
layout: default
title: Functions
permalink: /4-functions/
---

# Functions

The [previous chapter](/3-programming) was very conceptual. Loops are tricky
to get a hang of, but once you visualize how looping can solve problems,
you’re definitely on your way to thinking algorithimically. This chapter is a
bit more focused, but it builds on the idea of a **block** of code, like the
loop or the if statement. Blocks in JavaScript are always surrounded by braces
(`{}`), and that is true for functions, as well.

Just as looping is useful because it automates repetitive tasks, functions
break up your code into smaller pieces. This means that it’s easier to
reason about your work abstractly and find problems. Additionally, functions
also automate repetitive tasks, and that’s the way I’ll introduce them to you.

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
let makeABurrito;
makeABurrito = function(){
  prepareTortilla();
  addBeans();
  addOnionsAndCilantro();
  // etc.
  rollUpTortilla();
}
```

As you can see, there are syntactic similarities between functions and loops.
Both use blocks with braces, and both have parentheses. In fact, this snippet
of code is perfectly fine JavaScript. That’s because the `makeABurrito()`
function does nothing but **call** other functions. We can imagine that a
function like `prepareTortilla()` has even more specific steps inside it. But
with the function in place, you just have to execute `makeABurrito()` once and
be done with it. The internals of the function take care of everything else.

Quickly before moving on, that line `// etc.` is a **comment**. Comments are
very useful in programming because they can serve as little messages to
yourself (or to other programmers) about what is going on in your program.
In JavaScript, everything after two slashes (`//`) to the end of the line is
commented. If you want to comment out a whole section of multiple lines, begin
it with `/*` and close it with `*/`. Or you can put a `//` in front of every line.

## Parameters

Back to the function. Did you notice the parentheses that follow the function
name? Where have you seen this kind of of syntax before? We’ve already gone
over `prompt()`, for example, in the [previous chapter](/3-programming/), and
that is, of course, a function.[^console] But recall how we typed it:

```javascript
let userInput;
userInput = prompt("What do you want to have for dinner?", "Type your answer here.");
```

The parentheses aren’t empty. Instead, they have two strings in them. From
experience, we know that that the first string is what appears at the top of
the prompt box, and the second string is what appears where we type our
answer. We can abstract out the function, then, as `prompt(promptText,
defaultText)`, where `promptText` and `defaultText` are two variables. And, in
fact, if we were to rewrite the above as:


```javascript
let promptText, defaultText, userInput;
promptText = "What do you want to have for dinner?";
defaultText = "Type your answer here.";
userInput = prompt(promptText, defaultText);
```

It would work in exactly the same way. These two variables, `promptText` and
`defaultText` are **parameters** that we **send** to the function.[^arguments] Giving
functions parameters lets us change the internals of the function, to let it
react to specific instances. Now sometimes I want black beans in my burrito,
and sometimes I want pinto beans. Let’s add a parameter to `makeABurrito()` to
let us specify which beans to use on the fly:

```javascript
let makeABurrito;
makeABurrito = function(beansVariable){
  let beansResponse;
  prepareTortilla();
  addBeans();
  addOnionsAndCilantro();
  beansResponse = "You ordered " + beansVariable + " beans. Good choice!";
  $("#response").text(beansResponse);
  // etc.
  rollUpTortilla();
}
```

If we were to execute:

```javascript
  let blackBeans;
  blackBeans = "black";
  makeABurrito(blackBeans);
```

We would see that the webpage would now read “You ordered black beans. Good
choice!” Don’t actually try this, yet, though. Can you see why that is the
case? We define a variable, `blackBeans` and assign it to the string “black.”
Next, we send (or *pass*) that variable as a parameter to `makeABurrito()`.
Now, inside the function, we see that it makes reference to a `beansVariable`,
that has the value “black,” which it then prints in the `<div>`, like we did last
chapter.

But where did `beansVariable` come from? And how did it get set to “black”?
There’s no `beansVariable = "black"`, after all. The answer is that the
variable is defined at the same time as the function is. `makeABurrito =
function(beansVariable){}` defines both the function, `makeABurrito()`, and
the parameter, `beansVariable`, which can be used as a variable inside the
function.

The number of parameters you can define is up to you. Imagine you had
different kinds of tortillas, like whole wheat and regular wheat. You can
redefine the function as:

```javascript
let makeABurrito;
makeABurrito = function(beansVariable, tortillaVariable){
  prepareTortilla(tortillaVariable);
  addBeans(beansVariable);
  addOnionsAndCilantro();
  // etc.
  rollUpTortilla();
}
```

What would happen if you executed `makeABurrito("black", "whole wheat")`?
Notice how this looks rather similar to `prompt(promptText, defaultText);`?

## Back to Numbers

`makeABurrito()` is a great function, and it’s making me hungry, so let’s
abandon it for a bit and go back to using numbers. Say you wanted a function
that told you how much to tip at a restaurant. How would you go about building
it?

First, what information do you need in order to know how much to tip? You need
to know the `total` and the `tipRate`, which is a percentage, like 15 or 20%.
The barebones function looks like this, then:

```javascript
let tipCalculator;
tipCalculator = function(total, tipRate){
  // 1. calculate the percentage of the total 
  // as a variable “tipAmount”
  //
  // 2. change the response <div> to tell us 
  // the tip amount.
} 
```

In fact, type this into your `scripts.js` file. It can go after the earlier
code you’ve written, or it can replace it. Note what’s in the comments; it’s a
sketch of what the function will do. The first step is that it’ll do some
math—an easy calculation. In the second step, it will tell us what the result
of the calculation is.

```javascript
let tipCalculator;
tipCalculator = function(total, tipRate){
  // step 1:
  let tipAmount;
  tipAmount = tipRate * total;
  // and step 2:
  $("#response").text("Your tip is $" + tipAmount);
} 

// now execute the function, passing a total of $50.00
// and a tipRate of 20%:

tipCalculator(50.00, 0.2);
```

Save, commit, reload, and the webpage should now inform you that you owe $10.
In the exercises, we’ll expand on this function.

## Scope

Alongside the idea of a function block, that is, the set of curly braces, we
also have the idea of scope. Beginner programmers often get tripped up by
scope, but that’s ok, so do veteran programmers. Note that though conditionals
and loops also use blocks, they don’t affect scope in the same way.

Just like a “scope” is used to see things that are far away (tele*scope*) or
are really tiny (micro*scope*), in JavaScript, scope also has to do with
visbility. Consider this snippet:

```javascript
let alice, friendOfBob;
alice = "Alice";
friendOfBob = function(friend){
  let chuck;
  chuck = "Chuck";
  console.log("Bob has a friend named " + friend);
}

friendOfBob(alice);
```

That works as we expect. In JavaScript, a variable has the scope of the block
in which its defined and in every block within that block. As a result, we
define `alice` in the “main” block, and that means `alice` remains defined—or
*visible*—inside the function. But what happens if that last line is changed to
`friendOfBob(chuck)`? The console should complain “`Uncaught ReferenceError:
chuck is not defined`.” But we *defined* `chuck` on the third line here. Why
doesn’t it work?

Because we define `chuck` *inside* the function block, it is *only* visible
inside that block (and any children blocks). If we were to move the third line
above the second line, `chuck` would now be defined in the “main”
scope.[^main-scope] 

Scope helps you keep your code tidy, because there is less risk of variables
being accessed where they shouldn’t be.

## Recursion

One last bit on functions is that they are recursive. That means they can call
themselves. This becomes very useful in many instances, especially when trying
to sort things, but a simple version is to show how a factorial function would
work. As you may recall from high school, a factorial (like “5!”) is the
equivalent of 5 &times; 4 &times; 3 &times; 2 &times; 1. Here’s the completed
function, with a `prompt()` so you can see it in action on your page:

```javascript
let factorial;
factorial = function(integer, result){
  while (integer > 0) {
    result = result * integer;
    integer = integer - 1;
    factorial(integer, result)
  }
  $("#response").text("The result is: " + result);
}
let initialInteger;
initialInteger = prompt("Factorial", "Initial integer");
factorial(initialInteger, 1);
```

Let’s walk through it, step by step, starting with an initial integer of 2.
The function gets a value for `integer`, 2, and a value for `result`, also 1.
Because 2 > 0, we pass the truth test and enter the while loop. Now `result`
and `integer` are multiplied to each other and that value is set to `result`.
That means that `result` now is assigned 2, not 1. Next, 1 is subtracted from
`integer`. Finally, the function is called again, but this time instead of
passing `(2, 1)`, it passes `(1, 2)`, because that 1 is the result of 2 - 1,
and that 2 is the result of 2 &times; 1.

Now the second time through, `integer` still passes the truth test, gets into
the while loop, and has subtracted from it. `result` remains the same, because
2 &times; 1 is still 2.

The third time through, `integer` is now 0 ((2 - 1) - 1), and `result` is still 2
((2 &times; 1) &times; 1). But now the truth test fails. The function breaks out of
the while loop and prints the value of `result` to the `<div>`.

If we started with five, we’d have these steps:

1. `integer` = 5, `result` = 1
2. `integer` = 4 (5 - 1), `result` = 5 (5 &times; 1)
2. `integer` = 3 ((5 - 1) - 1), `result` = 20 ((5 &times; 1) &times; 4)
2. `integer` = 2 (((5 - 1) - 1) - 1), `result` = 60 (((5 &times; 1) &times; 4)
   &times; 3)
2. `integer` = 1 ((((5 - 1) - 1) - 1) - 1), `result` = 120 ((((5 &times; 1) &times; 4)
   &times; 3) &times; 2)
2. `integer` = 0 (((((5 - 1) - 1) - 1) - 1) - 1), `result` = 120 (((((5 &times; 1) &times; 4)
   &times; 3) &times; 2) &times; 1)
3. **break** and return `result`: 120.

Functions are powerful things, as we can see, and we’ll be seeing a lot more
from them over the rest of this course.

## Exercises

1. Add functionality to the tip calculator so that you can enter “20” *or*
   “.2” for 20%, and the calculator understands the difference.
1. Add functionality to the factorial function so that if the user enters 0,
   it calculates 0!, which is 1.
1. Add functionality so the factorial function so that if the user enters a
   negative number, it makes the number positive and calculates the factorial
   as before.

## Footnotes

[^console]: `console.log()` also looks like a function, but as I mentioned back in [chapter 2](2-calculator/#fn:consolelog), `.log()` is a method belonging to the `console` object. 

[^arguments]: Parameters are also often called **arguments**, but to my ears, that term is more opaque.

[^main-scope]: Technically, this can be considered either the global scope or the scope of the `window` or `console` objects.
