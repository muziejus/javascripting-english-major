---
title: Setting up the Environment
permalink: /1-environment/
---

# Setting up the Environment

It’s possible to start JavaScripting just by opening your browser, but for the
purposes of this course, we’re going to introduce two new pieces of software
that work to make your programming life easier.

This establishes a programming *environment*, which is a workflow in which
multiple pieces of software work together in order to make reaching your goals
as easy as possible. Many programming rely on IDEs, or integrated development
environments, such as Xcode for writing MacOS and iOS apps or R Studio for
writing in R. These are one-stop shops that try to handle the entirety of your
project within one piece of software. We’ll reach a similar state with Atom,
below, but not before first making a detour through Git.

A key concept to application development is “versioning.” That is, by making
use of a piece of software called a version control system, a project can work
as though it has a time machine attached to it. But not just a time machine.

Before moving forward, note that above I don’t refer to a “document” or even a
“file.” Most of the homework you’ve ever turned in before for an English class
has probably been a document, most likely written in Microsoft Word. In this
environment, we’re not creating one document or one file. Instead, we’re
working on one **project**, which is made up of many files, where each file
contributes its own bit to the project as a whole. A website (or a webapp) is
an example of a project—one that is made up, of course, of many documents. For
example, on even the most basic website, the information on the front page
could be saved in one file, and the information in the “About” page could be
saved in another. 

Thinking in terms of *projects*, not documents, is perhaps the first vital
leap for you to make. What we are building in this course is a website that is
a project. As such, you will have a folder for your project, and everything in
that folder will be under version control.

## Git

The version control system we will use in this course is called
“[Git](http://en.wikipedia.org/wiki/Git).” Git is famously opaque, and, worse,
a novice user (like us) uses about three commands all the time except when
things go wrong. Luckily, when things go wrong, Git is often there to help us
out. Nevertheless, Git deserves its reputation that leads to websites like “[Oh
Shit, Git!](http://ohshitgit.com)”

Git calls a project a **repository**, so in the context of using Git, I’ll do
the same. A repository is a folder with files in it, like any regular folder
of files you have on your computer. However it also has, hidden from view, a
history of all the files in the folder. Git knows exactly when a file was
added. It knows every change ever made to each file. It even knows about files
that have been deleted, and it can resurrect them, if needed.

So far, this sounds like a backup system. And Git is *also* that. But it can
do much more. For example, every change you record with Git, called a
**commit**, also has a **commit message** attached to it, where you can leave
a note for yourself (or a collaborator!) that tells you what you were thinking
when you made a change. Why did you put this paragraph before that one? Read
your old commit messages.

Additionally, Git lets you **push** your changes to a central version of the
repository. This means that you can work on one computer, save your work,
commit it, push it, and then, on another computer, **pull** the changes and get
right back to work—with all that history still built in, even though you were
working *on another computer!*

That all of what we’ll be doing with Git in this course, and that is
already a lot. But as you can see, the system of committing, pushing, and
pulling means that collaboration becomes very easy. Additionally, Git allows
for **branching**, where you create new branches for your project. Now Git is
not only a time machine, but it’s also an interdimensional portal leading you
to alternate universes. In one universe, your text could be written full of
jokes. In another, the writing can be very serious. 

### GitHub

For the purposes of this course, we will be using Git via the website
[GitHub](http://github.com). GitHub will serve the remote point to which you
push your project, and GitHub will even, down the road, host the project. At
the end of this course, you’ll have a web address including “github.io” that
you can send to your friends and family to show off your progress.

In addition to being a user-friendlier face for the Git software, GitHub also
includes features that expand what Git offers, such as built in discussion
boards where users can discuss issues. We won’t be using that functionality in
this class, but that should stand in to remind you that **things on GitHub are
public by default**. Keep this in mind when you’re typing commit messages or
working on your project: it’s all visible to anyone who has a look at your
repository. Don’t let that scare you from using GitHub. Just keep it in mind.

#### Create Yourself a GitHub User

The first step with GitHub is easy. Go to [GitHub.com](http://github.com) and
create an account. Choose the free plan. You should get an email, and once you
verify it, you can click on the “Start a project” button.

If you’re a current student, you can
[request a discount](https://education.github.com/discount_requests/new) for
GitHub. That discount entitles you to a limited number of private
repositories.

#### Start a Project

Now you can create a repository. Either click on the “Start a project” button
or visit the [new repository page](https://github.com/new) on GitHub. For the
repository name, pick something short yet descriptive. Remember that this will
be public. Furthermore, it will be part of your project’s web address. 

Fill in the description as you like, and tick the “Initialize this repository
with a README” box. Leave the rest as it is, and click “Create repository.”

You’ve created your first repository! 

Congratulations, and now pause for a moment to enjoy the look of your own
project on GitHub. There’s a lot on this page, but just let it be for now.
We’ll come back to it in a bit.

## Atom

You’re probably used to writing your English homework in Microsoft Word or,
maybe, Pages. Or maybe you use Google Docs. They are all fine word processors,
and I’ve used them all. Actually, I’ve been using Microsoft Word since well
before you were born, probably. But they each make two conceptual assumptions
that go against the work we are doing in this course.

First, they deal with documents, not projects. Remember, in this course you
have to think in terms of a project, not just in terms of a document.
Something like Word is great for a single document, like a business letter or
five page paper. When it comes to something with lots of moving parts, like a
project, it starts to creak.

Second, the big advance Word
brought to the computing world was fusing what a document says along with how
it looks.[^form-vs-content] In Word, whatever the document looks like on your screen is a pretty
good approximation of what it will look like in your printer.[^wysiwyg] You can change
fonts, fontsizes, margins, and so on, for a single document, and when you
print it, it will follow your instructions as closely as possible as it prints
to a US Letter sheet of paper.[^a4] This is, of
course, because of the first assumption: you’re writing a document that is
going to get printed.

We’re writing a website, however. And who knows what kind of device will be
used to view it. Imagine if you write a page with 2-inch margins and visit it
on a smartphone. You’ll see nothing but margins! When you’re writing for the
web, you’re forfeiting a lot of how the content will look to the user, who
could be using a giant monitor or a teeny smartphone to view your site. Of
course, you still have *some* control over how things look. A lot, in fact.
But in order to do that, you have to rethink the basics of writing. You now
have to focus on the content much more than the look.

#### A Plain Text Editor

One way of “focusing on the content” is by stripping away a lot of the
frippery that a program like Word provides. We won’t need something that can
make charts or insert clip art. We won’t be changing fonts willy-nilly. And we
definitely aren’t creating something that lives only to be printed out. We are
creating, again, a *project*, not a document. 

What we need, then, is a “plain text editor.” Something that just writes text.
You’ve probably used a plain text editor before, most notably the Notes
application on your smartphone. G



## Browser

## Exercises

1. Create a GitHub account.

1. Create a repository on GitHub for your project.

1. Install Atom on your computer.

1. Link Atom to your GitHub account.

1. Use Atom to clone your repository.

1. Create a file called `index.html` in your repository and commit it.

1. Push your commit from your computer up to GitHub.

## Footnotes

[^wysiwyg]: Microsoft Word was not, of course, the first “WYSIWYG” (“What You See Is What You Get”) word processor. It appeared around the same time as MacWrite did, and both of those applications were building on ideas established years earlier at Xerox. Nevertheless, as Windows began to gain dominance on the PC market, Word became ubiquitous, leaving it as the “default” example of a WYSIWYG word processor to this day.  

[^form-vs-content]: Of course, whether a text still means the same thing when it looks different is an unsettled question in literary study. 

[^a4]: Or A4 paper, if you’re outside the United States.
