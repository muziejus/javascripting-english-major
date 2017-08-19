---
layout: default
title: Building a Dataset
permalink: /9-dataset
---

Our excitement should be growing as finally, we stop making play pages and
actually build a self-contained digital version of a text you may already know
(or will see soon in your academic career), the “[General
Prologue](https://en.wikipedia.org/wiki/General_Prologue)” of *The Canterbury
Tales*—or at least the first 18 lines. Here they are, in their late 14th
century Middle English grandeur:

> Whan that Aprill, with his shoures soote<br />
  The droghte of March hath perced to the roote<br />
  And bathed every veyne in swich licour,<br />
  Of which vertu engendred is the flour;<br />
  Whan Zephirus eek with his sweete breeth<br />
  Inspired hath in every holt and heeth<br />
  The tendre croppes, and the yonge sonne<br />
  Hath in the Ram his halve cours yronne,<br />
  And smale foweles maken melodye,<br />
  That slepen al the nyght with open ye<br />
  (So priketh hem Nature in hir corages);<br />
  Thanne longen folk to goon on pilgrimages<br />
  And palmeres for to seken straunge strondes<br />
  To ferne halwes, kowthe in sondry londes;<br />
  And specially from every shires ende<br />
  Of Engelond to Caunterbury they wende,<br />
  The hooly blisful martir for to seke<br />
  That hem hath holpen, whan that they were seeke.

Let’s create a webpage that glosses these first 18 lines. That is, it prints
them, and then turns every word that might not be clear into a link the user can
click on. And when the user does click on such a word, a gloss of that word
appears in a box below the text.

<section id="building-a-page">
## Building a page for the Prologue

First, let’s make a link to our new page from our old page. Open up
`index.html` in Atom, and add this below the `<h1>` tag:

```html
<h2><a href="prologue.html">General Prologue</a></h2>
```

Now, create a new file in your project called `prologue.html` Paste into it
this basic structure:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>General Prologue</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
    <link rel="stylesheet" href="prologue.css">
  </head>
  <body>
    <div class="container">
      <h1>The General Prologue of <em>The Canterbury Tales</em></h1>
      <div id="intro">
        <p>Welcome to the first 18 lines of Chaucer’s “General 
          Prologue.” If you don’t recognize a word, just click 
          on it, and gloss will appear below.
        </p>
      </div>
      <div id="prologue">
      </div>
      <div id="glosses">
      </div>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
    <script src="prologue.js"></script>
  </body>
</html>
```

Note lines 7 and 25. They load not `styles.css` and `scripts.js`, but, rather,
`prologue.css` and `prologue.js`. Create a new file in Atom called
`prologue.js` and paste in these two jQuery commands that should already look
rather familiar to you:

```javascript
$("#prologue").html("<p>The text of the Prologue will go here.</p>");
$("#glosses").html("<p>The glosses will go here.</p>");
```

Save, commit, and reload. The text in the jQuery commands should appear on
`prologue.html`.

</section>
<section id="prologue-into-data">
## Turning the Prologue into data

It could be possible to write an interactive version of the Prologue (that is,
with links) in HTML, but that would involve a lot of repetition. Programmers
hate repetition, so think for a moment about what the Prologue would look like
as a dataset in JavaScript. What are our two data types for collections of
information? Arrays and objects. Are 18 lines of poetry more like an array or
an object?

In terms of arrays, we can think of the first 18 lines as an array that is 18
elements long, with each element being its own line, something like:

```javascript
let prologueText, line1, line2, line3, line17, line18;
prologueText = [line1, line2, line3, line17, line18];
```

Then each line could be an array of the words (defined as things between
spaces) in that line, so that:

```javascript
let line1;
line1 = ["Whan", "that", "Aprill,", "with", "his", "shoures", "soote"];
```

In this way, `prologueText` would be an array of arrays. That sounds like a
good way to do things, but I don’t like line array as a line of strings. It
would be better if it were an array of objects, like this:

```javascript
let line1;
line1 = [{text: "Whan"}, {text: "that"}, {text: "Aprill,"}, {text: "with"},
        {text: "his"}, {text: "shoures"}, {text: "soote"}]; 
```

Now you can sort of imagine using the `.map()` method like this:

```javascript
let line1TextArray;
line1TextArray = line1.map(function(word){
  return word.text;
}
```

The `.map()` creates a new array out of the array of objects, and this new
array is just the `.text` property of each object, or, a string. Then we use
the `.join()` method on `line1TextArray` to turn the array into one single
string, separated by spaces. Put it all together in `prologue.js`, and:

```javascript
$("#glosses").html("<p>The glosses will go here.</p>");
let line1, line1Text; // don’t need the intermediate step of line1TextArray
line1 = [{text: "Whan"}, {text: "that"}, {text: "Aprill,"}, {text: "with"},
        {text: "his"}, {text: "shoures"}, {text: "soote"}];
line1Text = line1.map(function(word){
  return word.text;
}).join(" ");
$("#prologue").html("<p>" + line1Text + "<br /></p>");
// <br /> makes a line break, which will come in handy when we have many
// lines.
```

Save, commit, and reload. Now the first line of the Prologue should appear on
the page. Time to increase the complexity. Are you ready? 

The Wikipedia page for the General Prologue provides a word-for-word
translation into Modern English. So let’s add a property, `modern`, to each
word that includes gives its modern version:

```javascript
line1 = [{text: "Whan", modern: "When"}, {text: "that"}, {text: "Aprill,",
        modern: "April,"}, {text: "with"}, {text: "his"}, {text: "shoures",
        modern: "showers"}, {text: "soote", modern: "sweet"}]; 
```

This way, we can access the `word.modern` property and send it, as a gloss, to
the `#glosses` entity at the bottom of the page. But that takes a little
ingenuity.

</section>
<section id="events-in-javascript">
## Events in JavaScript.

When talking about webpage design, whenever someone says something like “when
a user *does something*, we want *something to happen*,” they’re usually
talking about JavaScript. JavaScript and jQuery especially are very good at
handling these situations, which are called **events**. There are several such
events that jQuery recognizes, but we’ll stick to one important one,
**click**. The jQuery method associated with clicking, `$("").click()`, works
on any visible HTML element, but we want it to work on individual words that
have modern glosses.

Conceptually, this is a bit tricky, so I’ll try to spell out the steps here
that we’ll follow:

1. As things stand now, we have a single string getting printed to `#prologue`
   that includes the first line of the Prologue.
1. We went to break that line back up into individual words.
1. If the word has no `.modern` property, we print it as is.
1. If it does, we want to surround that word in `<a>` tags, so that it becomes
   a link.
1. When we click on the link, we want the `.modern` property to get printed in
   `#glosses`.

The final step, of course, will be to do this for all 18 lines, but let’s keep
things simple. 

The first step is straightforward. Remember, we are dealing with word-size
chunks of data to begin with, so we just have to get rid of that `.join()`
method and iterate over the array to build up the single line of text,
instead:

```javascript
$("#glosses").html("<p>The glosses will go here.</p>");
let line1, line1Text; // don’t need the intermediate step of line1TextArray
line1 = [{text: "Whan", modern: "When"}, {text: "that"}, {text: "Aprill,",
        modern: "April,"}, {text: "with"}, {text: "his"}, {text: "shoures",
        modern: "showers"}, {text: "soote", modern: "sweet"}];
// Create a blank string that opens two tags.
line1Text = "<blockquote><p>";
line1.forEach(function(word){
  // Add in the word’s text plus a space.
  line1Text = line1Text + word.text + " ";
});
// Break the line and close the two tags.
line1Text = line1Text + "<br />(line 2 would go here)</p></blockquote>";
$("#prologue").html(line1Text);
```

Nothing changes as far as the look of the webpage (if you save and reload),
but using that `.forEach()` method means that we expose the array to the
potential for an if statement. Looking just at that block:

```
line1.forEach(function(word){
  // Define a variable that will be the entirety of a single
  // word-sized chunk of information
  let wordString;
  wordString = word.text;
  // Test to see if the .modern property exists
  if (word.modern){
    // If it does, surround wordString in an <a> tag.
    wordString = "<a href='#'>" + wordString + "</a>";
  }
  // Add in wordString plus a space
  line1Text = line1Text + wordString + " ";
});
```

Save, commit, and reload. Now the words “Whan,” “Aprill,” “shoures,” and
“soote” should appear like links. But if you click on them, nothing happens.
Here’s where the jQuery `.click()` method becomes our friend. At the bottom of
`prologue.js`, add:

```javascript
$("#prologue a").click(function(){
  $("#glosses").append("<h2>You clicked on a word!</h2>");
});
```

The jQuery selector, `$("#prologue a")`, is selecting every `<a>` tag inside
`#prologue`. With the `click()` method, it says to execute a function whenever
the user clicks on an `<a>` tag inside `#prologue`. And that function appends
a string, “You clicked on a word!” to `#glosses`. Save, commit, reload, and
start clicking on the words in the prologue.

We have one more step, which is to have the gloss be printed, not “You clicked
on a word.” But how can we tell jQuery what the value of a word’s `.modern`
property is? This is tricky, so let’s break it up into two pieces:

1. We want to send word-specific information to `#glosses`.
1. We want that information to be the `.modern` property.

Let’s just send the word *itself* to `#glosses`, to fulfill the first part of
this step. This requires making use of the `$( this )` selector we saw [last
chapter](/8-webpage), that lets a jQuery method get information about the
object that called it:

```javascript
$("#prologue a").click(function(){
  // Define the text and the word that was clicked
  let glossText, clickedWord;
  clickedWord = $( this ).text();
  glossText = "<h2>You clicked on the word: " + clickedWord + "</h2>";
  $("#glosses").html(glossText);
});
```

Save, commit, and reload. Note that the `.text()` method, when called without
parameters, *gets* the text. When called with parameters, it *sets* the text.
Unfortunately, we can’t do something like `$( this ).modern` to get the
`.modern` property, though that would be pretty cool. Can you see why? 

Instead, we have to feed the `<a>` tag some hidden data that we can then use
jQuery to harvest. Here, we make use of **data attributes**, which are custom,
on-the-fly attributes we can set in HTML. So let’s make one, called
`data-modern`.[^data-attributes] Now we can change the `forEach` loop to add
the data-attribute:

```javascript
line1.forEach(function(word){
  let wordString;
  wordString = word.text;
  if (word.modern){
    // Add word.modern as a data attribute to the <a> tag.
    wordString = "<a href='#' data-modern='" + word.modern + "'>" + wordString + "</a>";
  }
  line1Text = line1Text + wordString + " ";
});
```

Save and reload. To make sure it worked correctly, if you use the Element
inspector (a tab near the console tab in the browser), HTML around the word
“Whan” should look like this:

```html
<a href="#" data-modern="When">Whan</a>
```

There are a lot of places to mess this up above, which is why copying and
pasting chunks of code is sometimes a good idea. Of course, it’s also valuable
to have to find your mistakes. One possible mistake is forgetting that single
little `'` after `word.modern`. If everything looks good, go ahead and commit.

And for the final piece of the final step, we need to get the information in
the `data-modern` attribute into jQuery. Easy. Just use the `$("").data()` method:

```javascript
$("#prologue a").click(function(){
  let glossText, clickedWord, modernWord;
  clickedWord = $( this ).text();
  // .data("modern") looks for the data-modern HTML attribute
  modernWord = $( this ).data("modern");
  glossText = "<h2>You clicked on " + clickedWord + ", which means " + modernWord +"</h2>";
  $("#glosses").html(glossText);
});
```

Save and reload. If clicking on the words gives the modern word at the bottom,
then go ahead and commit. We're done with this part of the chapter. 
 
</section>
<section id="json">
## JSON

You've learned a lot in this chapter, but it’s remarkable how much builds on
the steps you already know. We’re not doing anything more complicated than
using arrays, objects, and some fancier methods like `.data()`. There may be
conceptual hurdles, however, which is why it’s worthwhile to make sure you
understand how everything works above before we finish this chapter,
especially since one exercise requires you to expand on what we’ve built
together.

Next, this might seem like a lot of work for just one line of Chaucer! And if
it were just the one line, I would agree. Luckily, it’s possible to load all
18 lines at once as one big JavaScript object, so we can have the whole
first 18 lines of the General Prologue appear on our page.

**JSON** stands for “JavaScript Object Notation,” and it’s a way to transport
complex data using a syntax familiar to JavaScript. Concretely, that means
that a JSON object is an object that often has an array of other objects
inside, which might have arrays or other objects inside them. We can expand on
the data structure we already set for `line1` above, and imagine something
like this:

```
let prologueObject;
prologueObject = {
  lines: [ // .lines is an array of lines
    [ // this bracket opens the line 1 array, like above
      {
        text: "Whan",
        modern: "When"
      },
      {
        text: "that"
      }
      ...
    ], // this closes the line 1 array
    [ // this opens the line 2 array
      ...
    ] // closes line 2
    ...
  ] // closes the .lines property
} // closes prologueObject
```

As you can imagine, having to type that out would be a nightmare. Luckily,
I’ve already done it for you. Open up [this file](/prologue.json) in a new tab
and look at it. You can see that it looks like a regular JavaScript object
except that the properties are strings, as well. That is, instead of `{text:
"that"}`, we get `{"text": "that"}`. Now we have to let `prologue.js` know
about it.

</section>
<section id="async">

## Async

Much of the work we do with JavaScript is **asynchronous**, or **async**, for
short. So far, all of our programming has been step-by-step. Do this, then do
that, then do this, then do that. But the real world doesn’t really work that
way, and the real world includes dealing with the internet. Maybe the server
that is hosting our JSON file is slow. Maybe the file is so huge it takes a
while to download it. Do we really want to wait while the whole file
downloads, leaving our webpage unresponsive?

You already know I love burritos, but let’s think of this in terms of making
pasta. There are three big steps to making pasta: making the sauce, boiling
the pasta, and mixing them together. So let’s imagine a function:

```javascript
let makeAPastaDinner;
makeAPastaDinner = function (){
  makeTheSauce(); // includes chopping vegetables and simmering
  boilThePasta(); // includes heating up the water
  mixTheSauceAndPasta();
}
```

By the time we got to `mixTheSauceAndPasta()`, the sauce would be cold!
Imagine if we had to *finish* simmering the pasta sauce before we could start
on the pasta itself. Tragedy! Disaster! Worse, we could invert them, so that
we add cold, soggy pasta to sauce. Garbage!

Instead, it’d be better if we could somehow write the function so that we can
start `makeTheSauce()` but, while it’s still happening (say, the sauce is
simmering), we start `boilThePasta()`. 

That’s cooking async. And we do stuff async constantly in our daily lives.
Software should be similar. In JavaScript, some functions and methods are
async, which means they do their thing, while, in the meantime, the rest of
the functions happen. This asynchronous activity is done via **callback
functions**, which are functions that happen only once the calling function is
done. To continue with the pasta analogy, let’s get a bit more discrete:

```javascript
let makeAPastaDinner;
makeAPastaDinner = function (){
  prepareSauceIngredients(function(){ // This function is the callback
    simmerSauce(function(){  // another callback
      mixTheSauceAndPasta();
    });
    boilThePasta();
  });
}
```

The first step is `prepareSauceIngredients()`. When that finishes, it executes
its callback, which executes `simmerSauce()` *and* `boilThePasta()`, meaning
that the boiling and simmering are happening at the same time. Only once the
simmering is done does it call *its* callback, to `mixTheSauceAndPasta()`.

In short, dealing with asynchronous functions means that sometimes the order
things are written in your JavaScript file are not the order in which they are
done. And jQuery’s method to get JSON objects from the internet can be
confusing in its asynchronicity. 

</section>
<section id="finishing-the-prologue">

## Finishing up by combining async JSON with the General Prologue.

Let’s make sure we’re all on the same page as we turn into this last quarter
lap. Your `prologue.js` file should look like this, more or less. I’ve taken
out the comments and added three new ones.

```javascript
// 1. Set the content of #glosses.
$("#glosses").html("<p>The glosses will go here.</p>");
// 2. Set the content of #prologue.
let line1, line1Text;
line1 = [{text: "Whan", modern: "When"}, {text: "that"}, {text: "Aprill,",
        modern: "April,"}, {text: "with"}, {text: "his"}, {text: "shoures",
        modern: "showers"}, {text: "soote", modern: "sweet"}];
line1Text = "<blockquote><p>";
line1.forEach(function(word){
  let wordString;
  wordString = word.text;
  if (word.modern){
    wordString = "<a href='#' data-modern='" + word.modern + "'>" + wordString + "</a>";
  }
  line1Text = line1Text + wordString + " ";
});
line1Text = line1Text + "<br />(line 2 would go here)</p></blockquote>";
$("#prologue").html(line1Text);
// 3. Wait around for the user to click on an <a> tag inside #prologue
// and then change the content of #glosses.
$("#prologue a").click(function(){
  let glossText, clickedWord, modernWord;
  clickedWord = $( this ).text();
  modernWord = $( this ).data("modern");
  glossText = "<h2>You clicked on " + clickedWord + ", which means " + modernWord +"</h2>";
  $("#glosses").html(glossText);
});
```

This works; it loads a line of text, and everything runs like we expect it to.
But I want to underscore the fact that this code is actually doing three big
things, as I’ve noted with the comments. Steps 1 and 3 stay the same. They
don’t care about the actual text of the Prologue. Step 1 only concerns
`#glosses`, and step 3 is just hanging out, waiting for the user to click. In
other words, the action will happen in step 2. Now, the jQuery method to get a
JSON file is `$.getJSON(file, callback)`, and it takes two parameters, as you
can see. The file part is easy, since you’ve been looking at it already:

```javascript
$.getJSON("http://the-javascripting-english-major.org/prologue.json", callback);
```

The callback is a bit trickier, but let's think it through abstractly:

1. We have the JSON available to us as a variable for our callback called `data`.
1. This `data` object has a property, `"lines"`, that is an array of lines.
1. Each line in `"lines"` is an array of word-objects.
1. Each word-object has a `"text"` property, and some have a `"modern"` one.

Then what have we already got in that second step:

1. It defines `line1`, an array of word-objects, and `line1Text`, a blank string.
1. It iterates over `line1` and builds up `line1Text` based on the properties of 
	 the word-objects.
1. It closes the HTML tags in `line1Text`.
1. It prints the value of `line1Text` in `#prologue`.

Really all we need to do is two things: create a `prologueText` variable that
holds the text of the *whole* Prologue and repeat what we’ve already got down:

```javascript
$.getJSON("prologue.json", function(data){ // Note the data variable!
  let prologueText; // Define the variable we didn’t need before.
  prologueText = "<blockquote><p>"; // Open the tags.
  // Now we can iterate over the data variable’s .lines property:
  data.lines.forEach(function(line){ // We get a variable, line.
    // Define a blank lineText.
    let lineText;
    lineText = "";
    // Now iterate over each line. This part should be familiar.
    line.forEach(function(word){
      let wordString;
      wordString = word.text;
      if (word.modern){
        wordString = "<a href='#' data-modern='" + word.modern + "'>" + wordString + "</a>";
      }
      lineText = lineText + wordString + " ";
    });
    // Add lineText with a line break to the prologueText.
    prologueText = prologueText + lineText + "<br/>";
  });
  // Close the prologueText tags.
  prologueText = prologueText + "</p></blockquote>";
  // Replace the content of #prologue.
  $("#prologue").html(prologueText);
}); // close the callback function.
```

If we replace step two with this, save and reload, huzzah! The first 18 lines
of the General Prologue appear. But if we click on the words, they don’t work
anymore. Nothing happens. That’s not fair! We didn’t even touch step 3. Why
did it work before, but not now?

The answer is, you probably guessed, because of async. Think of the three
steps as three discrete functions:

```javascript
setTheDefaultGlossesValue();
setTheDefaultPrologueValue();
selectThePrologueLinksAndWaitForClicks();
```

Because the second functions runs asynchronously, the third function looks for
links in `#prologue`, but *`#prologue` is still blank*. So by the time the
second function is done, the third has already finished its business. We need
to treat the third function as a callback to the second. We need to do
something like this:

```javascript
setTheDefaultGlossesValue();
setTheDefaultPrologueValue(function(){
  selectThePrologueLinksAndWaitForClicks();
});
```

Figuring out how to do that is for homework. But here is
what the final page could look like: [prologue.html](/examples/prologue.html).
</section>
<section id="exercises">
## Exercises

1. Why can’t we simply do `$( this ).modern` to get the `.modern` property?
1. Fix the problem with the Prologue and get the glosses to appear.
1. I added a `"url"` property to the JSON file. Rewrite the code for the
   Prologue so that the gloss also suggests taking you to Wikipedia if you
   like.

## Foonotes

[^data-attributes]: Data attributes all begin with `data-`.
