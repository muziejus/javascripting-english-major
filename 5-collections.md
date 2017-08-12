---
title: Collections
permalink: /5-collections/
---

# Collections

“Data,” you may recall, is a plural. Just like “bacteria” is a collection of
many instances of a single “bacterium,” so it is with data. Data is a
collection of instances of a single datum. So far, we’ve been working for the
most part with just single pieces of information, like a single number. We’ve
been using that number with other numbers, of course, but not as a collection
of information. 

A collection of information is a set of data (“datums”) that combine to form
something larger than it itself. Perhaps the easiest collection is a list,
like, say, a list of friends. These friends don’t interact with each
other, necessarily, but they get combined into a list. Doing so exposes them
to **iterability**, the ability to loop over them. Say you want to invite your
friends to a party, and you want to send “personalized” invitations. You could
iterate over (loop over) your list of friends, get their first names, and then
use that name in an email that opens “Dear FIRST_NAME.” 

## Arrays

In JavaScript, the simplest list data structure is called an **array**. Arrays
are common in programming languages, and are typically designed to be
extremely fast at sorting and iterating. In JavaScript, we’re not so lucky, as
the implementation is a bit peculiar. However, it’s worth knowing what an
array looks like, because we will definitely be using them from now on.

Simply put, an array is a set of pieces of data surrounded by brackets (`[]`).
These are all valid arrays:

```javascript
let arrayOfStrings = ["a", "b", "c"];
let arrayOfNumbers = [1, 2, 3];
let arrayMixed = ["a", 1, null, true, arrayOfNumbers, [4.5, 5.6]];
```

Notice that you are not limited to a single data type in an array. Strings,
numbers, `null`, `true`, variables, and even other arrays can be used as the
building blocks of arrays. Later on, when we start building maps, we will have
at least one array made up of geographical points. 

Each value in an array can be accessed by its **index**, which is an integer.
The index begins with 0, which is confusing for beginners. So if we add to the
above:

```javascript
$("#response").text(arrayOfStrings[2]);
```

The `<div>` will read “c.” The third value of the array is “c,” but its index
is 2, because the index begins with 0. So to get “a,” we would call
`$("#response").text(arrayOfStrings[0]);`. We are interested in the zeroth
value. Again, I know this is confusing, but you will get the hang of it with
practice, and then you can join that exclusive club who make jokes about
zero-based numbering.

## Objects

Above, when I mentioned that arrays are a bit peculiar in JavaScript, that is
because arrays are a simplified version of the JavaScript **object**. Where
arrays are pieces of data surrounded by brackets, objects are surrounded by
braces (`{}`). Similarly, while arrays have indices, objects have
**properties**. Let’s define an object.

```javascript
let myBurritoObject = {
  tortilla: "wheat",
  guacamole: true,
  beans: "pinto",
  habaneroSauceSquirts: 3
  };
// and let’s call a property
$("#response").text(myBurritoObject["tortilla"]);
```

With an array, we call it using the syntax `arrayName[indexNumber]`. With an
object, we replace the index with a property. But, even better:

```javascript
$("#response").text(myBurritoObject.tortilla);
```

It’s much more succinct to use **dot-notation** to access
properties.[^dot-notation] This is in part because arrays have properties,
too, like `.length`:

```javascript
let arrayOfStrings = ["a", "b", "c"];
$("#response").text(arrayOfStrings.length);
```

This will print “3,” because the value of that array’s `.length` property, or
its length, is three. So even though the largest *index* value in the array is
2, its length is 3.

Objects can contain other objects, of course, but we really start cooking when
we build arrays of objects. Those points on a map I mentioned before? They
will be an array of objects, where each object has properties that give its
place name and its coordinates. 

## Methods

JavaScript, like Ruby, is famous because in both languages, *everything* is an
object. Objects are objects, arrays are objects, strings are objects (in that
they have properties, as we’ll see below), `null` is an objects, and even
functions are objects. Since a property of an object can be any other kind of
object, that means that a property can even be a function. For example, to
return to `myBurritoObject`, let’s add a new property:

```javascript
let myBurritoObject = {
  tortilla: "wheat",
  guacamole: true,
  beans: "pinto",
  habaneroSauceSquirts: 3,
  // new property
  spiciness: function(){
    alert("This is a spicy burrito!");
    }
  };
// and let’s call the new property
$("#response").text(myBurritoObject.spiciness);
```

Try this out and see what happens. 




## Exercises

1. Write a function that always returns the last item in whatever array you
   pass it.


The third value of the array is “c,” but its index

built-in
functions, called **methods**, that expose a lot of power. I’ll only mention a
few here.

## Footnotes

[^dot-notation]: Dot-notation does not work, however, for index values. `arrayOfStrings.1` will cause an error.

