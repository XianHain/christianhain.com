---
title: "Great Documentation: Context"
slug: "great-documentation-context"
date: 2023-01-25T16:02:29.567Z
description: "Enhance documentation by including purpose statements, background, definitions, references, and relevant meta-information for context"
readTime: 7
author: "Christian Hain (He/Him)"
authorGiven: "Christian"
authorFamily: "Hain"
ogImage: "https://assets.christianhain.com/images/pages/blog/2023-01-25-great-documentation-context/og.png"
url: "https://www.christianhain.com/blog/great-documentation-context"
brief: "Knock-knock, who's there? Documentation about documentation! Just kidding, it's more like a series of essays, so even better. In the first part of this series, I want to discuss the most important thing anyone can do to make their documentation the best: give me context"
tags: ["56744722958ef13879b950f8"]
canonical: "https://www.christianhain.com/blog/great-documentation-context/"
layout: layouts/blog-entry.liquid
theme: blog
pageName: blog
footerTypes: ["written-by-human"]
permalink: /blog/great-documentation-context/

---

Knock-knock, who's there? Documentation about documentation! Just kidding, it's
more like a series of essays, so even better. In the first part of this series,
I want to discuss the most important thing anyone can do to make their
documentation the best: give me context.

<meta data-xian="article-start">

## Why context?

Why does this document exist? What's the motivation? Who asked for it? *Who
needs it?*

**Wait– Stop scrolling! I don't know who needs to hear this, but your
documentation will outlive your memory and probably your tenure.** So do you,
and those who come after you, a favor and add a little context.

## What kind of context? What are some examples?

In short, anything that will help the reader comprehend, or help the team
maintain, the documentation. In this essay, I'll touch on purpose statements to
scope the document, background statements to give a brief history, related links
for further reading, clarifying terminology to avoid confusion, and custom
meta-information to establish relevancy.

### Use purpose statements to limit the focus

Is this a living document meant to be updated as information changes, or is a
static archive meant to capture a moment in time? This is important to decide
upfront because it will influence how much context to give and whether or not
edits are welcome.

For example, the purpose statement of a living document might read:

> The purpose of this document is to provide links and information for
developers setting up their environments. It is meant to be a living document
and kept up-to-date on an as-needed basis.

While an archived document might be:

> The purpose of this document is to capture the pain points developers
experience during environment setup and to provide suggestions on how to address
said pain points. This document was submitted to A Specific Department on
2022-02-22.

By determining the document's intention up-front, you set the expectations of
how the document will be used and maintained. In the former example, that
document is expected to be a source of truth that invites collaborators to
modify. In the latter, a team member documented pain points, changes are
unlikely, and future exercises will result in new documents.

### Use background statements to give a little history

Purpose statements tend to focus on the present or future states of the
document, whereas background statements are great for summarizing the past.
These statements should be brief; if there's a need to capture an in-depth
backstory, then a separate document should be written to capture those details.

Keep in mind not all documentation needs a background. For example, if you're
documenting team procedures for the first time, is it important to note the
former procedures? Not really. It might be more relevant if you're *proposing* a
change to procedures.

To give an idea, here are a couple of background statements I've used in my
documents; the first is from a document containing project estimations and was
submitted as a sprint deliverable:

> Another Team performed a Specific Set of Tests on a Specific Application and
provided a report on a Specific Date. The report contained 11 items, one of
which was listed as Critical and immediately worked on. As of writing, the
remaining ten items have yet to be planned.

The following example is from a document containing a write-up of how an
application was architected. The purpose of this document was to explain why
choices were made and what the final architecture looks like.

> The Specific Project was an initiative started in a Specific Year. The goal
was to deliver a modern and performant website with micro-frontends responsible
for the site's discrete functions. When the project began, the site's homepage
was already abstracted and built using React.js (React) while .NET powered the
rest of the site.

> We knew that we wanted to continue using React for our front-end projects, and
we wanted to introduce a heavier emphasis on quality and testing.

### Provide definitions

What could be more aggravating than a document with unfamiliar acronyms?
Probably one that also switches terminology. I get it; writing the same words
multiple times is boring, but fun prose at the expense of confusion is never
worth it.

Recently, I was reviewing a teammate's proposal on feature flag solutions. The
term "feature flag" itself has evolved from "feature toggle" and most accurately
represents the idea. However, write it 33 times, and it makes sense why they
would want to use both terms interchangeably. This issue, however, is that
they're technically different, even if colloquially understood as the same.

The solution to this problem (short of educating and adopting the correct
terminology) is to introduce a "Definitions" section, and it could look like
this:

> **DEFINITIONS**
> **Feature Flag**, **feature toggle**, **flag**, and **toggle** are all used
interchangeably in this document to refer to the concept of turning features on
or off.

This approach is also helpful if you've recently changed the name of a
component. Another example here would be the time everybody referred to our
site's navigation as either "main nav," "fat nav," "meganav," "new nav," "nav
bar," or "top nav." To make it more complicated, a request came in to rewrite
the component again, but we needed to differentiate it from what was existing. I
introduced the plainly-named `ourNamespace-navigation` (where `ourNamespace` was
the actual namespace we used) and ensured that whenever I referred to the
concept of navigation, I used the specific name that was indexed in our
repository. Why? Because now other people will know what to search for if they
want to find information.

Have I driven this point home yet? If not, here's one more example. When I was
working on CNN's election center, we needed terms to differentiate between
geographical states, such as Georgia, from React application states. Before
that, all mention of either concept was simply "state," and all you could do was
hope that nobody was talking about the state's state.

### Link to references

The last topic I want to cover related to context is to provide links to
references. In addition to inline links, providing a consolidated list of
related articles is helpful, even if they aren't mentioned directly in the
documentation.

For example, I wrote documentation for implementing Optimizely into our site and
included the following related links section:

> **RELATED LINKS**
>
> 1. Optimizely and UCI Data
>
> 2. Our Approach to Feature Flags
>
> 3. Optimizely Developer Docs
>

Consider "Related Links" to be "if you'd like to learn more, look here." I've
seen developers include ticket numbers and other project-management-based links
here. While I'm hesitant to say, "don't do that," I would suggest creating
another section to capture those details, mostly because I've never seen a
ticketing system executed in a way where all related work, conversation, and
artifacts point back to the ticket. In my experience, it's usually been a
dead-end reference that requires further digging anyway. Unless there's a
prescribed template, I usually move or put this kind of information in an
"Appendix" section.

> **APPENDIX A: TICKETS**
>
> 1. JIRA-0000
>
> 2. JIRA-0001
>

### How relevant is this document? Who owns it? When was it last reviewed?

Suppose your company uses a system like Confluence for wiki pages. In that case,
your documents will have meta information that says who created the page, when,
the last person to modify it, and when that happened. What it doesn't tell you
is the last time anyone reviewed the document for accuracy.

This was a problem with our setup docs. They were created by someone who left
the company, and any minor change (such as adding a new troubleshooting step)
would suddenly make that person the subject matter expert since their name was
associated with the most recent revision.

While there are other solutions, and I plan to explore those in this series, I
found it helpful to add a meta section detailing who owns the document and the
last time someone reviewed the content.

> \[Jira meta-information saying the doc was created in 2020 and last updated
today, for example\]
>
> +++++++++++++++++++++++++
> Owner: Christian
> Last Reviewed: 2022-03-03
> +++++++++++++++++++++++++
>
> **PURPOSE**
> The purpose of this example is to show how meta-information could be added to
the page...

## Conclusion

That's it.

Just kidding. These are a few of my thoughts on what makes excellent
documentation. Adding context to the page is one way to ensure that the document
remains relevant long after you've forgotten about it. When you're no longer
with the company, the new person running a keyword search can make sense of the
fifteen seemingly similar results.

What are your thoughts? What steps do you take to ensure that your documents
stand up to time? Do you do anything different between living docs and
artifacts? Were any of these tips helpful?

<meta data-xian="article-end">

<meta data-xian="ps-start">

P.S. I want to give thanks to
<a rel="nofollow" href="https://hashnode.com/@GitGood" title="Mj's Hashnode Profile" target="_blank">
  @Mjnari Richards</a>
for proofing this essay.

<meta data-xian="ps-end">
