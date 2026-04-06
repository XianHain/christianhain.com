---
title: "Good Design Solves Problems"
slug: "good-design-solves-problems"
date: 2018-02-16T05:18:37.000Z
description: "This article talks about using ARIA labels as a way to add context to visual assumptions applied to an election results table."
readTime: 3
author: "Christian Hain (He/Him)"
authorGiven: "Christian"
authorFamily: "Hain"
ogImage: "https://assets.christianhain.com/images/pages/blog/2018-02-16-good-design-solves-problems/og.png"
url: "https://www.christianhain.com/blog/good-design-solves-problems"
brief: "Good design is about solving problems, regardless of the medium. American architect, Bertrand Goldberg, designed the Marina City in 1959 to address what he believed to be an issue with Chicago residents leaving the city to live in the suburbs."
tags: ["56744723958ef13879b95230"]
canonical: "https://www.christianhain.com/blog/good-design-solves-problems/"
layout: layouts/blog-entry.liquid
theme: blog
pageName: blog
footerTypes: ["written-by-human"]
permalink: /blog/good-design-solves-problems/

---

<meta data-xian="article-start">

Good design is about solving problems, regardless of the medium.  American
architect, Bertrand Goldberg, designed the Marina City in 1959 to address what
he believed to be an issue with Chicago residents leaving the city to live in
the suburbs.  He devised a futuristic concept to build a self-contained "city
within a city" that contained offices, apartments, a gym, swimming pool, ice
rink, bowling alley, several stores and restaurants, and a marina.  Not only did
Goldberg come up with a unique visual design, but he also found a way to make
life's luxuries and amenities more accessible.

Although not directly related, web designers also have problems they must try
and solve.  For example, how does one effectively tell the story of South
Carolina's 5th District's special election at 8 PM on a Tuesday while US fighter
jets are shooting down drones in Syria, and a Russian fighter jet flies within
five feet of a US Air Force spy plane?

![annotated-aria-before (1).jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1646841936967/DazMEyPWC.jpg)

The image above shows CNN's race result module for that exact scenario.  Its
purpose is to provide details about the race and, above all else, tell the
audience who won.  Aesthetics aside, the designer has done his job.  When I look
at the module, even before reading anyone's name, I know that a Republican has
won, then I process that his name is Ralph Norman.  More detail is available to
me: the number of votes Ralph received and what percentage of all voters
supported him.  I can do this quickly because I bring a lot of outside context
with me.  First, I know that "R" stands for "Republican" and that the blue
represents Democrats.  The module describes the result of an election, and
elections have winners.  Therefore, I can safely assume that the check icon
denotes who won.  All of these clues are things that I can visually perceive,
but what about people who can't see?  What context clues are available, and how
does someone make sense of color when color doesn't mean anything?

Before answering that question, I need to know how somebody would get this
information if they can't see it; they would most likely use a screen reader.
Without any special consideration, a screen reader would look at this piece of
information and announce the text.  "Are Ralph Norman.  Forty-five thousand,
seventy-six.  Fifty-one percent.  Dee Archie Parnell.  Forty-two…"

Unless specified, the computer doesn't know that a red checkmark next to a
candidate's name means that the candidate won or that a blue D implies that the
candidate is a Democrat.  If a design solves a problem, this design has failed.

Situations like this occur all over the Web.  Visually, things make sense
because designers have studied how to use text, color, shapes, and spacing to
deliver a message.  They rely on the brain's ability to recognize patterns and
previous exposure to symbolism and relationships.  ARIA attributes exist to
explain all these subconscious assumptions programmatically without sacrificing
the designer's intent.  However, that doesn't mean they can be used to make up
for bad design or haphazard markup.  ARIA attributes are expected to supplement
semantic markup and natively enhance the tags that HTML provides.

Assuming that the markup is the best it could be, the image below shows what
attributes could be added to CNN's module to enhance the audio output, thus
executing the designer's vision and solving the design problem for all
audiences.

![annotated-aria-after (1).jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1646841954100/Su36pLTzA.jpg)

Screen readers will now say, "Republican, Ralph Norman wins!  Forty-five
thousand, seventy-six votes.  Fifty-one percent.  Democrat, Archie Parnel.
Forty-two…"

<meta data-xian="article-end">
