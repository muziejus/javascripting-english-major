---
chapter-no: 5
title: Iteration
summary: Map / Filter / Reduce
---

This chapter is an experiment. So far, things have been moving at a relatively
gentle pace as I demonstrate the basics of JavaScript to you and you write
some code and enjoy the fruits of your labor. You know what numbers and
strings are, you know what arrays and `Object`s are. You even know how to
write if statements and do comparisons. But now things are going to get
abstract very quickly.

Teaching this, what could be called “iterability” or “iteration” has struck me
as particularly tricky, and it simply takes time to get used to thinking about
data in terms of collections that you can loop over and manipulate. We
iterate—loop—in our daily lives, of course, but I have found that teaching
students to really see the power in looping is tricky. Work through each
example in this chapter carefully, then, and hopefully a window will open up
in your brain. This is, I promise, the hardest chapter in this course. But
it’s also the most rewarding, because it’s what unlocks the possibility of
programming by leveraging what it is that computers do better than humans:
small repetitive tasks.

So it’s an experiment because you’re being thrown in what I consider the
deep end pretty quickly. This is only chapter five! But I hope greater
understanding will follow.

Let’s start the chapter off with an array of `Object`s. Type this into
`scripts.js`:

```javascript
const turtles = [
  { name: "Leonardo", weapon: "katana", color: "blue", favPizza: "mushroom", pizzaSlices: 5 },
  { name: "Donatello", weapon: "bō", color: "purple", favPizza: "mushroom", pizzaSlices: 3 },
  { name: "Raphael", weapon: "sai", color: "red", favPizza: "cheese", pizzaSlices: 4 },
  { name: "Michelangelo", weapon: "nunchaku", color: "orange", favPizza: "cheese", pizzaSlices: 7 }
];
```

Now, because this is a list of `Object`s, we can _iterate_ or _loop_ over it.
Say we wanted to invite each turtle to our birthday party. We could loop over
the list, and for each turtle print an email addressed to the `.name`
property. In fact, let’s start with that:

```javascript
const partyInvite = function(name){
  return "Dear " + name + ",<br>Please come to my party tomorrow.";
};
```

What does this function do? It takes a parameter, “name” and then **returns**
a string that incorporates the name. So far, we have not used **return
values**, but they are the _result_ of a function. Returning will be vitally
important for what follows in this chapter.

Having typed the above into your `scripts.js`, now add:

```javascript
$("#results-div").html(partyInvite("Splinter"));
```

Save and reload your webpage. What happens? Now try:

```javascript
$("#results-div").html(partyInvite(turtles[1].name));
```

Save and reload the webpage. Can you tell why the page now invites Donatello?
Recall that in an array, we can use `[n]` index notation to access a member of
an array. The Donatello `Object` is the “oneth” member of the array (they
start with 0!), so `turtles[1]` gives us the Donatello `Object`. Now because
that `Object` has a `.name` property, we can _call_ it and get the string
`"Donatello"`. That then gets passed to `partyInvite()` and so on.

But how can we invite all four turtles at once?

<section id="map">
## Map

Arrays have three super methods, `.map()`, `.filter()`, and `.reduce()`. Let’s
begin with `.map()`. It takes an array and then executes a **callback
function** on every member in the array. Then it creates a new array out of
the return values of every call to the callback function. Let’s see it in
practice.

First, clear out your `#results-div` line so it just prints the `turtles`
array by itself:

```javascript
$("#results-div").html(turtles);
```

The result on your webpage should be nothing, just a blank. Why? Well, what
would it look like to “print” an `Object`? We saw last chapter that when the
array is made up of strings, we get them printed all smushed together, and we
needed to use `.join(", ")` to give some breathing room. But `Object`s? Who
knows. Let’s try this, instead: 

```javascript
const turtleNames = turtles.map(function(turtle){
  return turtle.name;
});
$("#results-div").html(turtleNames);
```

Much better, though still smushed. But here, at least, we see a callback
function at work. That is, instead of _passing_ a string to `.map()`, like we
do for `.html()`, we pass a *function*. And that function has a variable,
`turtle`, that appears out of thin air. But it means “the current value of the
`Object` in the array.” That is why it has a property, `.name`, that we can
return.

This is a lot, but let’s do it step by step:

1. Define a variable `turtleNames` with `const turtleNames`;

2. Assign to `turtleNames` the result of the `.map()` method on `turtles`.

3. Now, with `turtles`, call the `.map()` method on it, which means that it
   executes the callback function on every member of the `turtles` array and
builds a new array out of the results.

4. Have that callback function take the current `turtles` array member and
   call it, for the time being, `turtle`, as a variable. Then pass that
variable into a function that _returns_ that variable’s `.name` property. So
the first time through the loop, the result of `turtle.name` is `"Leonardo"`.
The second time, it's `"Donatello"`, and so on.

5. Feed the new array, `turtleNames`, into the `#results-div` line of jQuery.

That floating function can be confusing, but we can define it, to make things
a bit more readable:

```javascript
const getNameProperty = function(object){
  return object.name;
}
const turtleNames = turtles.map(getNameProperty);
$("#results-div").html(turtleNames);
```

I don’t find this easier to read, but you might. The tricky intuition is to
understand that `.map()` creates a variable out of thin air that it passes to
the callback function. In the previous example, we call that variable
`turtle`, but we could call it anything, as in:

```javascript
const turtleNames = turtles.map(function(anything){
  return anything.name;
});
$("#results-div").html(turtleNames.join(", "));
```

We still end up with an array, `turtleNames`, that looks like this:
`["Leonardo", "Donatello", "Raphael", "Michelangelo"]`, which means we can
even use the `.join()` method on it to add the breathing room of a comma and a
space. In the version where we define `getNameProperty()`, we don’t even need
to include the parameter, as it’s understood that `.map()` is sending that one
piece of information over. 

So what needs to be changed if we want to get a list of the turtles’ weapons,
and not their names?

It turns out only one thing needs to be changed:

```javascript
const turtleNames = turtles.map(function(anything){
  return anything.weapon;
});
$("#results-div").html(turtleNames.join(", "));
```

Even though `turtleNames` is no longer an appropriate name for the array we
get, `["katana", "bō", "sai", "nunchaku"]`, the computer doesn’t care.

What about colors?

So, back to our party invitations: how do we invite each turtle to our party?
Here’s the full `scripts.js`:

```javascript
// define the list of turtles
const turtles = [
  { name: "Leonardo", weapon: "katana", color: "blue", favPizza: "mushroom", pizzaSlices: 5 },
  { name: "Donatello", weapon: "bō", color: "purple", favPizza: "mushroom", pizzaSlices: 3 },
  { name: "Raphael", weapon: "sai", color: "red", favPizza: "cheese", pizzaSlices: 4 },
  { name: "Michelangelo", weapon: "nunchaku", color: "orange", favPizza: "cheese", pizzaSlices: 7 }
];
// define the party invitation function
const partyInvite = function(name){
  return "Dear " + name + ",<br>Please come to my party tomorrow.";
};
// get the turtles’ names
const turtleNames = turtles.map(function(turtle){
  return turtle.name;
});
// create the array of invitations
const partyInvites = turtleNames.map(partyInvite);
// Send the array of invitations to the webpage
$("#results-div").html(partyInvites.join("<br><br>"));
```

Be careful to make sure you have the parentheses and braces in the right
places, or else the program won’t work. Now, looking at this, it seems like
overkill to go through making a separate `Object` for each turtle. We could
just as easily have had an array of just their names. 

But let’s say our party is a peace party, and we want them to leave their
weapons at home. Now things get interesting:

```javascript
// define the list of turtles. This is the same.
const turtles = [
  { name: "Leonardo", weapon: "katana", color: "blue", favPizza: "mushroom", pizzaSlices: 5 },
  { name: "Donatello", weapon: "bō", color: "purple", favPizza: "mushroom", pizzaSlices: 3 },
  { name: "Raphael", weapon: "sai", color: "red", favPizza: "cheese", pizzaSlices: 4 },
  { name: "Michelangelo", weapon: "nunchaku", color: "orange", favPizza: "cheese", pizzaSlices: 7 }
];
// define the party invitation function
const partyInvite = function(name, weapon){
  return "Dear " + name + ",<br>Please come to my party tomorrow. It is a
peace party, so please leave your " + weapon + " at home.";
};
```

Suddenly, `turtleNames` is insufficient. How do we get a value for `weapon`
into the `partyInvite()` function? We continue:

```javascript
// create the array of invitations
const partyInvites = turtles.map(function(turtle){
  return partyInvite(turtle.name, turtle.weapon);
});
// Send the array of invitations to the webpage
$("#results-div").html(partyInvites.join("<br><br>"));
```

OK. This is complicated, I know. But spend some time looking at the whole
code. Hopefully the elegance of the `.map()` loop will appear. Remember, all
we’re doing is creating a list of turtles and an invitation function that is
waiting for a value for `name` and one for `weapon`. 

Then, we use `.map()` to loop over the list of turtles and send, one-by-one,
each turtle’s values for `.name` and `.weapon` to our invitation function. The
result of that invitation function, in turn, is sent to the new list we
create, `partyInvites`. Then we send that list to the webpage, gluing the
pieces together with `<br><br>`, or two blank lines.

Try looking at the exercises, which are a bit less abstract, if this is all
still very, very confusing.

<section id="filter">
## Filter

Luckily, `.filter()` builds on the intuition hopefully you’ve already gotten
with `.map()`. Both methods return arrays, but while `.map()` returns a
manipulated array (give me the `.name` property of every turtle in the
`turtles` array), `.filter()` gives a sub-array where each element passes a
truth test, meaning it’s time to use `===` again.

If we look at the `turtles` array again, we can see that among the properties
is `.favPizza`, which lists each turtle’s favorite pizza. In this case, there
are only two favorites, “cheese” and “mushroom.” Now say we wanted to send a
second message to the turtles who love mushroom pizzas, letting them know that
we’ll have mushroom pizza at our party. How could we get a list of just those
turtles? We would use `.filter()`:

```javascript
const turtles = [
  { name: "Leonardo", weapon: "katana", color: "blue", favPizza: "mushroom", pizzaSlices: 5 },
  { name: "Donatello", weapon: "bō", color: "purple", favPizza: "mushroom", pizzaSlices: 3 },
  { name: "Raphael", weapon: "sai", color: "red", favPizza: "cheese", pizzaSlices: 4 },
  { name: "Michelangelo", weapon: "nunchaku", color: "orange", favPizza: "cheese", pizzaSlices: 7 }
];
const mushroomFans = turtles.filter(function(turtle){
  return turtle.favPizza === "mushroom";
});
```

Notice that the return value here is a truth test, meaning it’s actually just
`true` if that turtle’s `.favPizza` property is equal to `"mushroom"` and
`false` if it’s not.

The result is a smaller array of just the two turtles who love mushroom pizza.
Continuing:

```javascript
$("#results-div").html(mushroomFans.map(function(turtle){
	return turtle.name;
}).join(" and ") + " love mushroom pizza.");
```

A lot is happening in this last step, including another `.map()` invocation.
But, step-by-step, we take the smaller array, then grab the `.name` property
for each turtle. Using `.join()`, we glue the `.name` properties together with
`" and "`, which works because I know ahead of time that there are only two
mushroom pizza fans. Then, having the two `.name` properties glued together,
we tack on, at the end, `" love mushroom pizza"` and send the whole thing to the webpage.

Or, more verbosely:

```javascript
const mushroomFansNames = mushroomFans.map(function(turtle){
  return turtle.name;
});
const mushroomFansNamesWithAnd = mushroomFansNames.join(" and ");
$("#results-div").html(mushroomFansNamesWithAnd + " love mushroom pizza.");
```

The verbose method isn’t less correct, and it’s probably no slower, either.
But it is more, well, _verbose_, and not quite as “idiomatic.” With practice,
you’ll begin to see that you don’t need to keep assigning all those
intermediate variables. You can use a combination of `return`s and chained
methods to achieve your goals.

</section>


## Exercises

1. Given an array of `[1, 2, 3, 4]`, use `.map()` to create an array that is
   `[1, 4, 9, 16]`.

2. Given an array of `["burrito", "samosa"]`, use `.map()` to create an array
   that is `["yum, BURRITO", "yum, SAMOSA"]`.

3. Recalling that `"string".length` gives you the length of a string and
   `"string"[n]` gives you the nth value of of a string, use `.filter()` to
create an array of *only* turtles whose names end in “o.”


