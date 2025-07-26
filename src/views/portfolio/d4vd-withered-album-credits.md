---
layout: layouts/portfolio-entry.liquid
pageName: portfolio
logo: black
logoDark: dusty-blue
headTitle: "Withered Album Credits"
headDescription: "An Pen of d4vd's \"Withered\" credits, made accessible"
thumbnail: "https://assets.christianhain.com/images/pages/portfolio/d4vd-withered-credits/withered-thumbnail.webp"
publishDate: 2025-07-07
footerTypes: ["written-by-human"]
tags: ["portfolio"]

metadata: [
  {
    title: "For",
    values: [{
      type: "string",
      displayValue: "d4vd",
    }],
  },
  {
    title: "Published",
    values: [{
      type: "date",
      datetime: "2025-07-07",
      displayValue: "July 07, 2025",
    }],
  },
  {
    title: "Developer",
    values: [{
      type: "string",
      displayValue: "Christian Hain",
    }],
  },
  {
    title: "URLs",
    values: [
      {
        type: "href",
        href: "https://shop.d4vd.io/pages/album-credits",
        title: "Original Credits (Opens in new Window)",
        displayValue: "Original Credits"
      },
      {
        type: "href",
        href: "https://codepen.io/XianHain/pen/GggyxzE",
        title: "View in CodePen (Opens in new Window)",
        displayValue: "View in CodePen",
      }],
  },
]

canonical: "https://www.christianhain.com/portfolio/d4vd-withered-credits"
---

## Is This Really Love?
The best thing about a vinyl collection is that it'll, in theory, exist forever.
Long after the Spotify servers are shut down and `.mp4` files are obsolete, a
vinyl record will, err... _should..._, still spin. Add a bit of exclusivity via
alternate cover art, and now it's a collectible hobby.

I've been a fan of d4vd since
<a rel="nofollow" href="https://www.youtube.com/watch?v=B7Y4LHbpXv0" title="'Here With Me' Music Video (Opens in a new Window)" target="_blank">Here With Me</a>
showed up in my algorithm, and so I happily ordered the web-store exclusive
version of "Withered" while supplies lasted. In other words, sight unseen and
sound unheard.

Well, that's a risk with this hobby. Turns out, the vinyl version is a subset of
the digital album, and doesn't include the marketing track,
<a rel="nofollow" href="https://www.youtube.com/watch?v=vZi8ET9k11g" title="'Feel It' Music Video (Opens a new Window)">Feel It</a>,
which Wikipedia doesn't list as a "single" but has at least 400M+ more streams
on Spotify than any other track on the album. _Oof._

It also didn't have credits or lyrics on the gatefold cover, something that is
nice to have, but not guaranteed with vinyl releases. I think it could be
considered best practice to include this information on physical media, and
sometimes artists will add loose inserts or print onto the disc sleeve. Still,
it's not uncommon for them to be excluded. Other times, artists will simply
print a link to their website.

That's what d4vd did, and I wish he'd done it differently. First of all, this
means that the link will inevitably `404` once someone stops paying the bill or
changes the taxonomy of their website. Secondly, he used a
<a rel="nofollow" href="https://lnk.to" title="Good luck, who knows where this goes (Opens in a new Window)" target="_blank">`lnk.to`</a>
URL, which means he's now dependent on a third party to stay in business. In
other words, the text on the jacket will inevitably not work, and the people who
worked on this album will be lost in the sands of time.

<figure data-theme="polaroid">
  <img alt="Withered Album cover" src="https://assets.christianhain.com/images/pages/portfolio/d4vd-withered-credits/withered-album-back-cover.webp">
  <figcaption>Picture of the Withered Album's "credits"</figcaption>
</figure>

So, how do ***I*** fix this? Simple, print a copy of the credits while I can
(oh, by the way, the album cover mentions lyrics, but those still aren't
available). Well, that didn't work out because the credits are a static
image, and it takes a lot of toner/ink. It actually crashed my printer; that's
never happened before, and I'm not sure whose fault it is.

Anyway... that was enough motivation for me.

### Before
<figure>
  <video controls autoplay style="inline-size: 100%;">
    <source src="https://assets.christianhain.com/images/pages/portfolio/d4vd-withered-credits/withered-existing-site.mp4" type="video/mp4" />
    Download the <a href="https://assets.christianhain.com/images/pages/portfolio/d4vd-withered-credits/withered-existing-site.mp4">video</a>
  </video>
  <figcaption>The current, pre-existing version of the credits</figcaption>
</figure>

You can see in the video above how the image scales in smaller viewports. It's
absolutely unreadable on mobile devices and has no `alt` text for screen
readers. ***Yikes!***

### After
Using free, open-source fonts from Google and a re-created logo, I was able to
write a fully semantic and responsive page for the album credits. Lyrics: MIA

To add some <b><i>oompf</i></b> and give a tangled effect, I also recreated and
animated the strings in the background. It might take a moment to load, but you
could also refresh this page and see the strings randomly rearrange. This is
cool because it gives something extra in exchange for the inconvenience of
having to go to the website in the first place. It also allows for new entries
if the Deluxe album gets any new songs.

_d4vd, if you're reading this, feel free to take the code from CodePen and use
it on your site. I used <abbr title="Optical Character Recognition">OCR</abbr>
to scan the text; the results were okay, but not perfect. I did my best to
fact-check, but proofread it anyway. All I ask is that you leave a link-back to
my site._

<style>.cp_embed_wrapper > iframe {block-size: 50vh;}</style>
<figure>
<p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="GggyxzE" data-pen-title="d4vd Credits" data-user="XianHain" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/XianHain/pen/GggyxzE">
  d4vd Credits</a> by Christian (<a href="https://codepen.io/XianHain">@XianHain</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://public.codepenassets.com/embed/index.js"></script>
  <figcaption>
  A fully responsive version, available on 
    <a rel="nofollow" href="https://codepen.io/XianHain/pen/GggyxzE" title="View on CodePen (Opens in a New Window)" target="_blank">CodePen</a>
  </figcaption>
</figure>

<hr>

And there you have it! By the way, if you haven't heard d4vd's new album, here's
a video!
<figure data-theme="video-player">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/ktcu9NVFYSo?si=rwIJmRgQ1uM6VcHI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <figcaption>Music video for "Is This Really Love"</figcaption>
</figure>
