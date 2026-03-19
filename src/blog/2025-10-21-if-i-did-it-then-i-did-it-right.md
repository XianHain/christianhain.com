---
title: "If I did it, then I did it right"
slug: "if-i-did-it-then-i-did-it-right"
date: 2025-10-21T04:11:11.150Z
description: "Balancing software standards and deadlines; tech debt and quality are crucial. Short-term hacks often cause long-term issues"
readTime: 4
author: "Christian Hain (He/Him)"
authorGiven: "Christian"
authorFamily: "Hain"
ogImage: "https://assets.christianhain.com/images/pages/blog/2025-10-21-if-i-did-it-then-i-did-it-right/og.png"
url: "https://www.christianhain.com/blog/if-i-did-it-then-i-did-it-right"
brief: "Mediocre? That just won't suffice. I think about these lyrics from NF's \"SUFFICE\" almost daily, especially when developing software. For the past couple of years I've been professionally balancing one of my favorite Amazon Leadership Principles…"
tags: ["63dc9bff980f5b820d64aa00", "56744722958ef13879b94f1b", "658b1bb47f2e4b55d0289532", "56744721958ef13879b94906", "629a4c0ca7681524f75be0f9"]
canonical: "https://www.christianhain.com/blog/if-i-did-it-then-i-did-it-right/"
layout: layouts/blog-entry.liquid
theme: blog
pageName: blog
footerTypes: ["written-by-human"]
permalink: /blog/if-i-did-it-then-i-did-it-right/
---

<meta data-xian="songquote-start">

_Mediocre? That just won't suffice._

<meta data-xian="songquote-end">

I think about these lyrics from <a rel="nofollow" href="https://www.youtube.com/watch?v=JsIoJ9cxrYs" title="SUFFICE on YouTube" target="_blank">
  NF's "SUFFICE"</a>
almost daily, especially when developing software. For the past couple of years
I've been professionally balancing one of my favorite
<a rel="nofollow" href="https://www.amazon.jobs/content/en/our-workplace/leadership-principles" title="Leadership Principles on Amazon.com" target="_blank">
  Amazon Leadership Principles</a>,
"Insist on the Highest Standards," against predetermined delivery dates and
milestones. This is a challenge in any business, but even more-so when the
business isn't Amazon and, therefore, doesn't follow the same principles. You
might quickly find yourself in a losing battle when everyone else is looking for
a quick win, a line item for their <i lang="fr">résumé</i> or promo docs, and
then it's on to the next new feature that promises more revenue.

It's unlikely that the cut corners will ever be prioritized. Even at Amazon, I
was on a project where we half-assed a carousel component that barely worked and 
completely fell apart once we had to implement video and pan-and-zoom
functionality… a problem we didn't foresee when planning the sprint and resulted
in several uncomfortable conversations about why other features would have to be
cut if continued to focus on this one. And we had to focus on this one because:

<ol type="a">
  <li>
    the Inventory Team had already re-photographed tens-of-thousands of products
    at various high-resolution angles; and
  </li>
  <li>
    our competitors already had a similar (albeit worse) features on their
    sites.
  </li>
</ol>

Dramatics aside, this is pretty common in software and is lovingly known as 
"<a rel="nofollow" href="https://en.wikipedia.org/wiki/Technical_debt" title="Technical Debt according to Wikipedia" target="_blank">tech debt</a>,"
a term to describe the idea that the short-term gains of today will eventually
have to be paid back with interest. I've seen teams who are diligent about
managing their tech debts and others that let it go with the promise of, "we'll
come back to it after we launch," for years knowing that the next project is
already on the roadmap and, already, more important than the feature currently
in development. The tech debt becomes so massive that day-to-day tasks take
forever, bugs show up out of nowhere, and eventually there are dozens of
meetings to prioritize, justify, estimate, re-justify, re-prioritize, and, oh…
by the way… the next project starts in two weeks.

This leads me to the inspiration for this post. I was watching Tentacruel's
video,
<i><a rel="nofollow" href="https://youtu.be/QYM3TWf_G38?t=705" title="How We're Redesigning Audacity For The Future on YouTube" target="_blank">
  How We're Redesigning Audacity For The Future</a></i>.
When he talked about the project's tech debt, I felt a sense of kinship… a
trauma bond even though we've never worked together. He gives the viewer an
incredible piece of advice:

<figure data-theme="blockquote">
  <blockquote cite="https://youtu.be/QYM3TWf_G38?t=705">
    When you're told that the only way to hit a deadline is to hack something
    together, don't do it. A hack is like building a road through someone's
    house: It might work for a bit… but eventually you're going to have to build
    the road properly anyway, and you'll need to repair the house, too.
  </blockquote>
  <figcaption style="text-align:right">—&nbsp;
    <cite>
        <a rel="nofollow" href="https://youtu.be/QYM3TWf_G38?t=705" title="How We're Redesigning Audacity For The Future on YouTube" target="_blank">
          How We're Redesigning Audacity For The Future
        </a>
    </cite>
  </figcaption>
</figure>

That's what this all boils down to. As an engineer, we're responsible for the
quality and maintainability of our code. I've always been partial to the "crack
in the window pane" analogy (<abbr title="also known as">aka</abbr>,
<a rel="nofollow" href="https://omarizquierdo.dev/posts/broken-windows-theory/" title="Omar Izquierdo's post on Broken Windows Theory" target="_blank">
  Broken Windows Theory</a>.
It might start as something small and unnoticeable, but left unattended, and
it'll eventually spread. And… if you're okay with ignoring that problem, you
probably won't care when other panes break, paint peels, wood rots,
<abbr lang="la" title="et cetera">etc</abbr>. Before long the neglect will be
evident from across the street; property values will decline, customers will go 
elsewhere, cash flow will dwindle, and suddenly it's too late. We can't afford
to fix the problem.

<meta data-xian="ps-start">

P.S. What do you think? Let me know on
<a rel="nofollow" href="https://github.com/XianHain/christianhain.com/discussions/11" title="GitHub Discussion for this article" target="_blank">
  this GitHub Discussion</a>!
In the meantime, catch a vibe and enjoy
<a rel="nofollow" href="https://www.youtube.com/watch?v=JsIoJ9cxrYs" title="SUFFICE on YouTube" target="_blank">
  NF's "SUFFICE"</a>.

<meta data-xian="ps-end">

<meta data-xian="music-start">
<iframe
  width="100%"
  height="100%"
  style="aspect-ratio: 16 / 9; 
  display: block;
  margin: 2em 0 0;" 
  src="https://www.youtube.com/embed/JsIoJ9cxrYs?si=AN1hlveg7GsIND_2" 
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen="true">
</iframe>
<meta data-xian="music-end">
