---
layout: default
title: Atom Help
permalink: /help/atom
---

Atom is a tricky piece of software, and it’s easy to get frustrated using it.
This doesn’t mean you’re “bad at computers.” It’s a new program, and it takes
time to get used to it. Below are a few pointers that can solve problems my students often
have. If these are insufficient, you can always look to the [official Atom
documentation](https://atom.io/docs), which includes a nice, four-minute
[introductory video](https://www.youtube.com/watch?v=U5POoGSrtGg) on
customizing some settings. Even in those four minutes, though, they show some
advanced techniques like [using
snippets](http://flight-manual.atom.io/using-atom/sections/snippets/) to
automate text that one ends up retyping often. Anyway, as noted, below are
questions students have asked, so hopefully your answers will be found below
as well.

**Remember:** by typing `command` `shift` `P` on a Mac or `ctrl` `shift` `P`
on Windows, you can always access the Command Palette, where you can search
for a specific command.

<section id="missing-project">
## My files disappeared; Atom is the worst.

If you open Atom and get a blank screen when you were expecting your list of
files, don’t fret. There are several ways to open it back up. Try these in
order.

1. The project tree—which shows the files—may have just disappeared. Try
   typing `ctrl` `0` (that’s a
   zero) to have the tree reopen. If that’s empty, too, move to the next step.

1. Atom may have forgotten what project you were working on. **If you close
   the Atom window before quitting, this will happen.** Luckily, the solution
   is pretty easy. Go to the “File” menu, choose “Reopen Project,” and then
   choose your project from the list there. If your project isn’t in that
   list, move to the next step.

1. Atom may not even know where your project is anymore. You can reopen your
   project by going to the “File” menu and choosing “Add Project Folder…” Now,
   a dialog box shows up.
      
      * For Macs, type `command` `shift` `H`, which should open up your home
        directory (a house icon will show up at the top). There should be a
        folder in there called “github.” Open that folder. In there should be
        a folder with your project’s name. Open that, and then click on the
        “Open” button at the bottom of the dialog box.

1. If your project doesn’t even seem to appear even in the “github” folder,
   and you haven’t changed the default value for where the projects go, you
   have to re-clone your project.

</section>

<section id="git-push-failed">

## When I go to push my changes to GitHub, it says I’m behind master

Always, *always* fetch/pull before pushing. Bring up those buttons by clicking
on the up and down arrows in the bottom right corner of the screen. Avoid
force pushing, because it can cause chaos for your collaborators.

</section>

<section id="autosave">
## How do I enable autosave?

In Atom, open up your preferences (in the “Atom” menu). After clicking on
“Packages,” type `autosave` into the search bar. When the Autosave package
appears, click the Settings button underneath it and make sure “Enabled” has a
checkmark next to it.

</section>

