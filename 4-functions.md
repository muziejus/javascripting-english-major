---
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

Think about if you’re making a burrito, wouldn’t it make more sense to just
say “make a burrito” every time you wanted instead of saying “get out the
tortillas, take one out, place it on the griddle,” and so on? We abstract out
little tasks in our daily life. Computers can’t think as abstractly, however,
so we have to spell things out in detail. But once we do it, we’re set. Once
the computer understands how to make a burrito, we don’t have to give every
teeny step the next time we want one.

Of course, I don’t think computers can make good burritos, but stick with me.

All those burrito-making instructions can be collapsed into a function. In
JavaScripty pseudocode, that might look something like:

```
let makeABurrito = function(){
  prepareTortilla();
  addBeans();
  [ ... ]
  rollUpTortilla();
}
```

As you can see, the `makeABurrito()` function even has functions inside of it
that get more and more specific. But with the function in place, you just have
to execute `makeABurrito()` once and be done with it. The internals of the
function take care of everything else.

## Parameters

Now notice the parentheses that follow the function name. Where have you seen this
kind of of syntax before? We’ve already gone over `prompt()`, for example, in
the [previous chapter](/3-programming/), and that is, of course, a
function.[^console] But recall how we typed it:

```javascript
let userInput = prompt("What do you want to have for dinner?", "Type your answer here.");
```

The parentheses aren’t empty. Instead, they have two strings in them. From
experience, we know that that the first string is what appears at the top of
the prompt box, and the second string is what appears where we type our
answer. We can abstract out the function, then, as `prompt(promptText,
defaultText)`, where `promptText` and `defaultText` are two variables. And, in
fact, if we were to rewrite the above as:


```javascript
let promptText = "What do you want to have for dinner?";
let defaultText = "Type your answer here.";
let userInput = prompt(promptText, defaultText);
```

It would work in exactly the same way. These two variables, `promptText` and
`defaultText` are **parameters** that we **send** to the function. Giving
functions parameters 

## Footnotes

[^console]: `console.log()` also looks like a function, but as I mentioned
back in [chapter 2](2-calculator/#fn:consolelog), `.log()` is a method
belonging to the `console` object. 
