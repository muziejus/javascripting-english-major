---
layout: default
title: Map to 1.1
permalink: /help/map-to-1dot1
---

It was a great privilege to be able to teach this course as part of my
“[Novel Maps of New York](https://muziejus.github.io/novel-maps-of-ny-2017/)”
course at NYU in 2017. I got a lot of feedback from my students, and that
coupled with my own extended thinking about inclusivity in programming
pedagogy have directed how this course should proceed. I’ve also used this
course as a resource for teaching a [quick workshop on
JavaScript](https://www.youtube.com/watch?v=iepGc3prnEA) for
[NYCDH](http://nycdh.org), and I’ve also used parts of it in my 2018 course,
“[Media History of New
York](https://muziejus.github.io/media-history-of-nyc/).”

There are two prongs to how to improve _The JavaScripting English Major_, and
they may seem initially unrelated. First, there’s the question of how to
improve the choices I make in terms of the technologies taught. Second,
however, are the pedagogical choices I make in terms of aligning the course
better with its implicit and explicit goals. But they are, in fact, tightly
related. Pursuing inclusivity, for example, requires changes in both aspects
of the course, as what might seem like “just” a technical choice can be,
actually, anti-inculsionary.

Since this website is designed both to guide my teaching of the course and to
inspire others to learn JavaScript (or use it in their own teaching!), I
_must_ aim to keep pedagogical concerns transparent. It may seem weird for me
to talk about “requiring weekly labs,” say, as part of what version 1.1 of
this course’s _website_ would look like, especially without providing detailed
lesson plans for those labs. But the weekly labs build on and reinforce what
this site already provides, and the site can be improved to make those labs
even more useful. Not every student will need them, of course, and not every
instructor can afford to provide them. But it strikes me that the labs, like
all the changes proposed below, should be goals to which we (teachers) aspire.

<section id="background">
## Background

My 12-student class in the fall had only one student with programming
experience. Similarly, it was demographically not a stereotypical programming
course, by which I mean that, like most of the courses I teach, it was
populated mostly by women. The students almost universally said that they chose
the course because it seemed interesting and they needed some kind of writing
course for their major. The plurality were pre-med/bio.[^english-major]

_The JavaScripting English Major_, as the title suggests, is already aimed at
a “non-traditional” computer science audience: humanities undergraduates.
Nevertheless, in teaching the course, I quickly understood that I was falling
into some anti-inclusive traps. And getting rid of those traps, that are both
pedagogical and technical, underscore how this project is to continue.

</section>
<section id="inclusivity">
## Inclusivity

As mentioned above, the whole point of _The JavaScripting English Major_ is to
be more inclusive than the JavaScript textbooks that I considered using.
Programming books, in my experience, [are written for CS
students](/0-introduction#not-english-major), meaning they highlight concepts
that are obscure or irrelevant to humanities students who want to learn
JavaScript. The books can be great, but their audience is wrong.

That CS has an inclusivity problem is no surprise. Nevertheless, a lot of the
suggestions someone like [Ashe Dryden can make to Stanford’s CS
department](https://teachingcommons.stanford.edu/teaching-talk/making-computer-science-more-inclusive)
demonstrate potential means by which programming can be made more inclusive
even to non-CS majors. A lot of the tips Dryden gives I was already using in
the design of this course, but some I had overlooked.

</section>
<section id="pedagogy-to-change">
## Things to change: Pedagogy edition

1. **No ninja programming:** Edge cases are great, but I should not be
   asking students to explain to me why, in their second homework
   assignment, `0.1 + 0.2` returns `0.30000000000000004`. The instructor
   should know the answer, of course, but asking students to figure it out is
   precisely the sort of arrogant, exclusionary type of assignment to scare
   away students. None of my students got this problem correct, and one even
   suggested that it’s because “computers are more precise,” which is
   precisely the *opposite* take-home message of such an assignment.

   In fact, in trying to explain this problem in class, I went down a massive
   rabbit hole once it was clear that my students (or so they claimed) had
   never been taught how to calculate in binary. It was fun for me to teach,
   and it was maybe fun for the students, but it certainly didn’t make any of
   them feel like they understood JavaScript better. 

   “No ninja programming” is also an encouragement to use clunky, over-literal
   syntax as well. Define variables and then assign them separately, for
   example.

2. **Use Atom in class:** I’ve already made this change for this semester. I
   don’t use Atom in my day-to-day. But I also think it’s great for students,
   because it has a ton of great features built-in and a (comparably) flat
   learning curve. Nevertheless, when I was leading discussion of homework in
   class, I would be doing all my coding to the projector in Vim. Students
   noticed the difference, and one even suggested she felt like I was
   patronizing by teaching the “toy” Atom program instead of the “real”
   program I use.

   Furthermore, students had *far* more technical trouble with Atom than I
   imagined they would. I’ve already addressed this in part by starting an
   [Atom Help](help/atom) page that tackles the most common stumbling blocks
   my students encounter. Seeing my clicks, etc., in Atom makes the software
   more approachable for them.

3. **Have a weekly lab where students bring their laptops:** My _students_
   recommended this one to me. They _asked_ for more class! I generally don’t
   let my students use their laptops in class, but they were also having
   serious technical issues I could not predict. As a result, they had to rely
   on being free during my office hours or free for a few minutes before and
   after class to ask for specific, technical help. That, imo, is bad
   pedagogy.

   If a student has an internship/job/busy schedule and can only do the
   homework at midnight, and all of a sudden Atom is doing weird things,
   they’ll probably get frustrated and resent the class/professor for
   requiring such a dumb piece of software. And they have no recourse.
   Assuming they’re like me—and that they’d just go to Stack Overflow—is
   *anti-inclusionary* and, again, *bad pedagogy*.

   This semester, I had all the students install Atom and make their first
   commits to our shared GitHub blog in class, at the same time. And wow. I
   had not anticipated the myriad ways they would find what I thought were
   crystal clear instructions rather opaque. This was a great experience.

   It makes perfect sense, then, to have students work on homework together in
   a weekly lab, leaving “regular” class for discussion of the readings, etc.,
   that we have done for class. At the lab, I can reiterate concepts from
   regular class, find new hiccups that I haven’t anticipated, and catch
   students who are slipping behind. Speaking of…

4. **Mentor better and monitor students’ progress better:** My approach to the
   homework assignments in *The JavaScripting English Major* didn’t work
   right. I had students put in a good faith effort at each problem set and
   push it to their own repository. I’d look those over before class and, in
   class, I’d ask if students had questions and go over the problems in class.
   That was *insufficient*, because it relied on the *unearned* assumption
   that all of the students were caught up. 

   Dealing with non- and under-performing students is a particular concern of
   mine, because “under-performing” is a brilliant description of me as a
   student. I liked that professors kept their nose out of my business,
   but I also resented them for not reaching out to me to help me when I was
   particularly adrift. As a teacher, I’m in a similar position now, where
   part of me takes the “they’re adults” line, but I’m starting to think
   that’s insufficient. That is, if it breaks my heart to fail a student—and
   it does—then the solution shouldn’t be “well, some students fail.” The
   solution should be “make it so students don’t fail.”

   If inclusion is a goal, and it is, then I should be more attuned to how
   alienating programming work can be to humanities students, meaning I should
   not simply dump all of the responsibility of trying to get caught up on the
   student. If I know a student is woefully behind in their homework—and in
   this course, the homework is cumulative and falling behind is a recipe for
   disaster—then I should be far more concerned at catching them up than I
   have been.[^underperformance] Given the marked correlation between
   students’ keeping up with the homework and their grades on their final
   projects (to say nothing of their final grades), a weekly lab should also
   help here with improving outcomes.

4. **Require journaling:** This may grow in importance as I think more and
   more in terms of self-evaluation and
   “[ungrading](http://www.jessestommel.com/how-to-ungrade/),” but having the
   students reflect on their difficulties and feel open to critiquing how
   things are going during the course of the semester would be a good move. My
   students’ suggestions at the end of the semester were great—but I could
   have “easily” implemented some of them at midterm and some students’
   performance would’ve improved alongside.

</section>
<section id="technology-to-change">
## Things to change: Technology edition

1. **Provide more materials:** By this I mean documents like my
   [JavaScript cheat sheet](/help/js-cheat-sheet). In teaching JavaScript, I
   settled into some mantras (“what do all objects have?” “properties!”), but
   this cheat sheet was maybe too little, too late.

3. **Use the console less:** Students are learning JavaScript to learn how to
   (mostly) make webpages. I should get them out of the console as quickly as
   possible, then. This could even mean flipping the order of some chapters.

4. **Use the console more:** On the other hand, my students were helpless at
   doing their own troubleshooting, and they didn’t know to use the console
   to help solve their various problems.

2. **Solve the variable definition problem:** Throughout, I encourage students
   to define their variables first and only later assign them. This works fine
   with `var` and `let`, but it does *not* work with `const`. Nevertheless,
   the consensus seems to be growing that [we should be using `const` as our
   “default” variable
   definer](https://medium.com/dailyjs/use-const-and-make-your-javascript-code-better-aac4f3786ca1),
   especially considering that variables defined with `const` maintain their
   mutability, something I assumed not to be the case. 

   I can get away with only using `let`, but if I introduce `const`, then I
   _must_ also introduce `let`, which might be unnecessarily complex.
</section>

## Footnotes

[^english-major]: I had only one English major in my class and one first-year who was planning on becoming an English major. This was surprising, considering that the course was listed exclusively as an English course. This confirms my skepticism regarding how eager English majors are to take courses with a digital component—at least at NYU! Throughout my time at NYU, my self-designed courses have all fallen within the “Digital Literary Studies” rubric. Until this course, however, that meant that they helped fulfill the English major’s “theory” requirement. I would typically have classes full of students saying that they chose the course because it fulfilled that requirement. I find it notable, then, that (given _n_ = 3) though this was the most popular DLS course I taught, in terms of enrollment, it was also the least subscribed by majors in the home department. 

[^underperformance]: Mind, it’s not like I ignored students. But conscience-settling occasional “I’m worried” emails may be insufficient. My students are not accustomed to this kind of work, so I can’t use the regular cavalier attitude regarding performance in trying to mentor and monitor them.
