---
title: "Great Documentation: Formatting"
slug: "great-documentation-formatting"
date: 2023-06-21T12:00:42.035Z
description: "Part 2 of the Great Documentation essay series: formatting. Enhance your documentation's headings, lists, code blocks, terminology, and tables"
readTime: 9
author: "Christian Hain (He/Him)"
authorGiven: "Christian"
authorFamily: "Hain"
ogImage: "https://assets.christianhain.com/images/pages/blog/2023-06-21-great-documentation-formatting/og.png"
url: "https://www.christianhain.com/blog/great-documentation-formatting"
brief: "Welcome back! I've missed you. It has been weird to think about blogging in the wake of ChatGPT, but I promised a series, and here it is! This is part two of the Great Documentation essay series. In part one, I talked about giving context, and today ..."
tags: ["56744722958ef13879b950f8"]
canonical: "https://www.christianhain.com/blog/great-documentation-formatting/"
layout: layouts/blog-entry.liquid
theme: blog
logo: black
logoDark: green
pageName: blog
footerTypes: ["written-by-human"]
permalink: /blog/great-documentation-formatting/

---

Welcome back! I've missed you. It has been weird to think about blogging in the
wake of ChatGPT, but I promised a series, and here it is! This is part two of
the Great Documentation essay series. In part one, I talked about giving
context, and today I'll discuss formatting and learn how to enhance headings,
lists, code blocks, terminology, and tables.

Listen... I judge books by covers and documents by formatting; I can't help it.
All of my tech education came from websites, tutorial blogs, and well-formatted
StackOverflow answers. If the content I'm trying to learn doesn't have a good
hierarchy for headings, or if variables are written in plain text, my
comprehension goes out the `Window` *(da-da-dum, tss).*

Okay, without further ado, let's begin!

<meta data-xian="article-start">

## Headings and lists

In his book, <a rel="nofollow" href="https://www.amazon.com/Dont-Make-Think-Revisited-Usability-dp-0321965515/dp/0321965515/ref=dp_ob_title_bk" title="Don't Make Me Think on Amazon.com" target="_blank">
  "Don't Make Me Think"</a>,
Steven Krug talks about website usability. One lesson that always stood out to
me was that website users will not read every piece of content; they'll skim the
page until they see something that draws their attention. That same is true when
people read newspapers, and it's still true when they read your documentation
*(be honest, how many of you are just reading the headlines and saying, "Yep, I
got it"?)*.

So, let's not fight our users and instead give them content they can quickly
skim.

### General considerations

Remember when you had to write an outline in school for a paper? Those lessons
apply to documentation writing as well. You have your thesis, which is the
document's title, and then you have the main ideas supporting that thesis, which
are your next-level headings. You could continue to nest deeper as long as the
following are true:

1. Each nested level supports the level above it; and
2. Each nested level has at least one sibling.

In other words, a list or nested list should relate to its parent and never
contain one item.

### Headings

1. **Avoid level-1 headings**. If you're using a tool like Confluence, then the
   title of your document is already coded to be `<h1 />`. Why do they give you
   the option to add more? I don't know; it goes against accessibility 
   guidelines. Maybe they value flexibility over usability. Who knows? In any 
   event, if your documentation software does this, then consider `<h2 />` to be
   your top-level heading of choice.

2. **Keep it consistent; keep it simple**. The goal is to create skimmable
   hierarchical content. I would suggest avoiding long sentences as your heading
   unless it's consistent with the rest of the document. For example, maybe
   you're creating FAQs where the question is the heading. In that case,
   consistency beats simplicity.

   On the other hand, if you have five three-word headings and then one
   sentence-long heading, consider shortening the heading to match the tone and
   style of the rest of the document. You can always add an introductory
   paragraph after the heading to capture more details.

   Also, since we're talking about it, keep casing and punctuation consistent.
   Do your headings end with a semicolon? If so, make sure they all do. Are
   they all sentence or title cases? It's the little things that make the
   difference here.

3. **Avoid needless subdivisions**. For those of you who skimmed to this level
   and now have an interest, refer to the General Considerations section above.

### Lists

1. **Prefer ordered lists**. When referring to a document, it's easier to
   reference and find *ordered* list items than it is to count the bullets in
   *unordered* lists. This is especially true if your list contains more than
   three items.

2. **Practice good outlining techniques**. Refer to the General Considerations
   section above.

## Code formatting

### Terminal commands

When writing step-by-step guides for developers, I love to include code
snippets. Even if I'm telling the reader to go to their Desktop directory, I'll
include the `cd` command. Essentially, I try to walk through every aspect of the
process so that anybody on experience level can follow along, and I like to keep
the reader in the same application. Here are some of the other considerations I
make:

1. **Prefix command-line statements with** `$`. Code blocks are helpful for file
snippets and command-line statements. I like to include the `$` in my snippets
to convey that this line of code is to be entered into the terminal, and this
convetion works with or without syntax highlighting.

    ```bash
    $ cd ~/Desktop
    $ touch testFile.txt
    $ vim testFile.txt
    ```

2. **Include multiple steps in a single command**. Prefixing command-line
statements are great until you have numerous back-to-back statements. To avoid
frustration, format the code in a way that escapes line breaks and allows for a
single copy-paste command like so:

    ```bash
    $ cd ~/Desktop; \
      touch testFile.txt; \
      vim testFile.txt
    ```

    *(Notice how the single* `$` *conveys that the above block is a single
    copy-and-paste command while the first example requires the reader to copy
    each line individually)*

3. **Place variables at the end of the statement**. Similar to consideration 2
of this list, when I have to document a command with variable data, I like to
include those at the end of the statement. That way, developers can easily omit
the last variable's value when they copy to paste.

4. ```bash
     $ aws s3api list-objects \
         --output json \
         --query "[sum(Contents[].Size), length(Contents[])]" \
         --bucket VARIABLE_BUCKETNAME
    ```

### Syntax Highlighting

If you're familiar with Markdown, you probably understand how to add syntax
highlighting for backtick-flavored code blocks (` ```js `, for example).
However, if you're using a platform like Hashnode or Confluence, I like to take
this further by using themes.

## Monospace tech terms

One of the first things you do as a JavaScript developer is decide whether
you're #teamSingleQuote or #teamDoubleQuote. So imagine how confused I was when
I saw one of my colleagues use backticks. It annoyed the shit out of me; to the
point where I started making pull requests *changing* them to single quotes.
He'd approve them, and I kept going until one day when I asked an unrelated
question about our software and was told, "It's in the README."

<blockquote>
I was trying to figure out how to '$ run the project;' and the 'readme' had all
of the build instructions for the 'local environment'.
</blockquote>

*Oh no! Did I choose the wrong quote team?* But then I read everything in my
head and could hear myself emphasizing/"finger quoting" the quotes. I was trying
to figure out how to "*$ run the project;*" and the "*readme*" had all of the
build instructions for the "*local environment*".

Obviously, that's not right. "They could have at least bolded it," I thought.
"Who did this?" Lo-and-behold, I did a `git blame`, and it was me. Turns out my
find-and-replace pull requests removed all the monospace formatting.

<blockquote>
I was trying to figure out how to `$ run the project;` and the `readme` had all
of the build instructions for the `local environment`.
</blockquote>

<figure data-theme="polaroid">
  <iframe src="https://giphy.com/embed/pJmnk86fXFNmrUb8LB" width="480" height="270" class="giphy-embed"></iframe>
  <figcaption>
    Giphy clip of Taylor Swift singing "It's me. Hi. I'm the problem, it's me"
  </figcaption>
</figure>

Adding monospace formatting to tech terms is useful because it helps visually
separate code from prose and is especially useful whenever referring to the
names of something, like servers or applications. It also helps highlight
shorter commands as executable, even though they're written in line with the
rest of the sentence. Interestingly, I still mentally "finger quote" monospaced
terms... but with a little less sarcasm. It's the difference between having to
cd into a directory or `cd` out of it. The visual cue increases comprehension
and reduces the risk of skimming past the nuance. It works even better when
you're using these terms as verbs, such as `cd`\-ing into a directory.

Here's a list of things that I like to monospace.

1. **Tech-nouns: repos, projects, names**: If I have an application in GitHub
   called `navigation`, then that is its name. Whenever I refer to the
   application by name, I monospace it. If I'm talking about it in the abstract,
   then I won't. For example, pay attention to the word "navigation" in the
   following sentence:

   > `navigation` is responsible for the site's navigation component.

   This rule also applies server names, file names, function names,
   <a rel="nofollow" href="https://en.wikipedia.org/wiki/Amazon_S3" title="Amazon S3 on Wikipedia" target="_blank">
     S3 bucket</a>
   names, HTML tags (*e.g.*, text goes into `<p />` tags), common commands used
   as verbs, such as `pull` or `$ git pull`, *et cetera*.

2. **Short commands**: Any command around two-to-three words is usually okay for
   inline monospacing. Things like `$ npm start` or `$ yarn add <npm_module>`.

   Note, after three/four words, the command is no longer "short," and you don't
   want the line to be so long that it has a line break... that's confusing 
   (e.g.
   `$ yarn add --dev --exact <npm_module_0> <npm_module_1> <npm_module_2> <npm_module_3> <npm_module_4> <npm_module_5>`
   ).

3. **URLs that are a part of the source code**. For example, if referring to a
   variable that should be added to a config file, monospacing the URL will
   remove the browser's default formatting and make it easier to copy/paste.
   Don't do this if you want the user to click the link.

   > 1. Go to https://christianhain.com and click "Follow".
   >
   > 2. To see if the site is running, you can try to `ping`
   >    `https://xianhain.com`.

   Did you notice the difference between `ping https://xianhain.com` and `ping`
   `https://christianhain.com`? The former is a command where the latter is a
   name before a variable.

   Try to copy those URLs and see what happens. Now, of course, you may get
   line breaks with URLs, but what can you do? URLs tend to be long and would
   probably wrap anyway.

## Tables

Sorry, this essay's long! I'm passionate! If I ever get my master's, I'll
probably write about Markdown for my dissertation. There's something beautiful
about its minimal formatting, but it sucks if you have a lot of information or
want to do anything with images. Your readers will be scrolling forever.

Fortunately, there are tables. The same rules about being semantic apply to
documentation tables; don't use them as layout grids without context. I've seen
GitHub projects where `README`s had used tables to align contributors and
sponsors horizontally, and here's a
<a rel="nofollow" href="https://stackoverflow.com/questions/15279947/understanding-table-use-semantics" title="Understanding <table> Use Semantics" target="_blank">
   Stack Overflow post</a>
about why that's a bad idea.

Anyway… I tend to use tables to show side-by-side screenshots, such as
before-and-after photos. When appropriate, I'll include rows of images for
mobile and desktop screens, visual states, and other screenshots that benefit
from comparison.

This helps visually-capable users who can process the differences quickly
without having to remember how things look while scrolling up and down. Their
eyes can dart left and right to see the changes. And for those using assistive
technologies, properly labeled table headings will let them know what
information exists in the table and whether or not they want to explore the rows
or skip over them.

<meta data-xian="article-end">

So there you have it! Hopefully, my writing has inspired you to think about how
you like to read documentation and, more importantly, how you'll start
formatting your own moving forward.

Thanks!
