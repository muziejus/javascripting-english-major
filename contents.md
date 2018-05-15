---
layout: default
title: Contents
---

Welcome to *The JavaScripting English Major*. Here is a list of this course’s
contents, session (or chapter) by session. If you’re uncertain about the
course, start with the [zeroth chapter](/0-introduction), which introduces the
course and answers some questions about it. Skip straight to the [first
chapter](/1-environment) if you’re already motivated. 

If you want to see what you’ll be able to create by chapter 15, [look
here](/examples/could-be.html). Also, the technical details and other
information regarding this course are hidden on the “[About](/about)” page.

{{ page.title }}

{% for chapter in chapters %}

{{ chapter.title }}

## [{{ chapter.chapter-no}}. {{ chapter.title }}]({{ chapter.url }})

### {{ chapter.summary }}

{% endfor %}
