---
layout: default
title: About
---

This course, *The JavaScripting English Major*, was created by [Moacir P. de Sá
Pereira](http://moacir.com) to be used, initially, in the 2017 course “[Novel
Maps of New York](https://muziejus.github.io/novel-maps-of-ny-2017/),” taught
as part of the Digital Literary Studies sequence in the [English Department at
NYU](http://english.fas.nyu.edu).

Intellectually, this course owes its greatest debt to Marijn Haverbeke’s book [*Eloquent
JavaScript*](http://eloquentjavascript.net/), which is available both online
for free and in an elegant paperback. The title is a nod to [*The Programming
Historian*](https://programminghistorian.org/). The scope here is much
smaller, of course, but I have tried to use that site as a model, in its
efforts to provide tutorials and training to people without backgrounds in
programming.

More information about the project in general is available in the [zeroth
chapter](/0-introduction).

If you enjoyed this course, consider letting me know on
Twitter, where I tweet as [@muziejus](http://twitter.com/muziejus).

## Technical details

I wrote the first draft of this course in [Vim](http://www.vim.org/) on the
eighth floor (and sometimes sixth) of [Elmer Holmes Bobst
Library](https://www.nyu.edu/academics/libraries/elmer-holmes-bobstlibrary.html)
in July and August of 2017. The code I wrote in [Atom](http://atom.io) in
order to get a better sense of it as a drafting environment. It’s great!
Except for the part where it’s not Vim, which, once you’re used to, infects
all text generation you do (like typing `:w` when you’re done with a draft of
an email in gmail…).

The pages are all written in Markdown. The site is then generated by {%
include icon-github.html username="jekyll" %} /
[jekyll](https://github.com/jekyll/jekyll). When I like how things look, I
push it to GitHub Pages. Hence there’s also a [GitHub
repository](http://github.com/muziejus/javascripting-english-major).

I built a rather simple, custom theme for the course, which is a customized
version of [Bootstrap](http://getbootstrap.com). The body font is Georg
Duffner’s [EB Garamond](http://www.georgduffner.at/ebgaramond), a free version
of [Claude Garamont](http://en.wikipedia.org/wiki/Claude_Garamond)’s classic.
The display and code fonts are variants of the [Ubuntu Font
Family](http://font.ubuntu.com). I typically use
[DejaVu](http://dejavu-fonts.github.io) for my code font, but I liked the
relationship the Ubuntu Sans and Mono create across the page. The color scheme
is a rather arbitrarily applied version of Ethan Schoonover’s
[Solarized](http://ethanschoonover.com/solarized).

Finally, this course is **entirely free** and covered under the [CC BY-NC-SA
4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. That means
you’re completely free to share or adapt this material as long as you give
credit and maintain the license. But I also await
[GitHub pull requests](https://help.github.com/articles/about-pull-requests)
if you find something about the course upon which you think you could
improve! Just [fork the
repository](http://github.com/muziejus/javascripting-english-major) and get in
touch.

## Acknowledgments

In addition to the above acknowledgments, I have to thank NYU (and its
English Department) for giving me the opportunity and encouragement to teach
courses like the one that will be using this text. I was encouraged along the
way in some way by [Annie Ali Khan](http://www.anniealikhan.com), [Manan
Ahmed](http://history.columbia.edu/faculty/manan-ahmed/), [Alex
Gil](https://elotroalex.com), Kirin Wachter-Grene, [Audra
Grigaliūnas](https://audragrigs.com/), [Kovas Boguta](http://kovasboguta.com),
Michael Cardarelli, [Steven Vance](http://stevevance.net), and the
screenwriter who vacuums the eighth floor of Bobst in the mornings.

Also, the impetus for this course came from a workshop I was supposed to lead
on Leaflet at the 2017 edition of [NYC DHWeek](http://dhweek.nycdh.org). A
snowstorm led to its cancellation, but I always wanted to still share the
knowledge with the people who signed up. Sadly, my presentation slides by
themselves would not have been sufficient. Then, while speaking with [Jonathan
Reeve](http://jonreeve.com) in the Spring about the folly of teaching
proprietary mapping software with crippling license fees (hello, Esri!) or
one-trick pony tools that students would use for a week and then forget, it
dawned on me that I evade both at once by teaching a language with
applications beyond mapping (JavaScript) that also could help my students in
making mapping projects (with Leaflet).
