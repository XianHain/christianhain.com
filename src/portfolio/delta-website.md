---
layout: layouts/portfolio-entry.liquid
pageName: portfolio
logo: black
logoDark: dusty-blue
headTitle: "Delta.com"
headDescription: "Delta Airlines, the world's number one airline company, took on the task of rebuilding their website from the ground up. Their site is now built upon an HTML 5 backbone and uses the latest in Javascript and Ajax to offer a fresh new user experience."
thumbnail: "https://assets.christianhain.com/images/pages/portfolio/delta-website/deltathumbnail20130422.webp"
lastmod: 2012-11-13
publishDate: 2012-11-13
footerTypes: ["written-by-human"]
tags: ["portfolio"]

metadata: [
  {
    title: "Client",
    values: [{
      type: "string",
      displayValue: "Delta Airlines",
    }],
  },
  {
    title: "Published",
    values: [{
      type: "date",
      datetime: "2012-11-13",
      displayValue: "November 13, 2012",
    }],
  },
  {
    title: "Designer",
    values: [{
      type: "string",
      displayValue: "Razorfish",
    }],
  },
  {
    title: "Lead Developer",
    values: [{
      type: "string",
      displayValue: "Christian Hain",
    }],
  },
  {
    title: "Developers",
    values: [
      {
        type: "string",
        displayValue: "Charles Easter",
      },
      {
        type: "string",
        displayValue: "Diptish Aruk",
      },
      {
        type: "string",
        displayValue: "Wipro Technologies",
      },
    ],
  },
  {
    title: "URL",
    values: [{
      type: "href",
      href: "https://web.archive.org/web/20141130151956/http://www.delta.com/buygftxfer/",
      title: "Internet Archive (Opens in New Window)",
      displayValue: "www.delta.com/buygftxfer",
    }],
  },
]

canonical: "https://www.christianhain.com/portfolio/delta-website"
---

![Delta Website on a computer screen](https://assets.christianhain.com/images/pages/portfolio/delta-website/delta20121114.png)

## Wheels up in 5 minutes...

Delta, one of the only profitable airlines in the industry, was looking for a
way to refresh their online presence and provide a friendlier experience for
their customers. To do so, they've enlisted the help of Razorfish and several
contracting companies to deliver a new delta.com.

Such a large undertaking needed to be broken out into segments, or towers. I was
a part of the Loyalty team, which involved working with SkyMiles, the company's
frequent-flier credit system. I also worked on Escape (previously named
Explore), which focused on offering clients vacation packages and hotel deals.

### Buy, Gift, Transfer, and Donate Skymiles.

<figure data-theme="polaroid">
  <img 
    alt="Screenshot of Delta.com Donate Miles" 
    src="https://assets.christianhain.com/images/pages/portfolio/delta-website/delta_donatemiles20130412.jpg"
  >
  <figcaption>Delta.com Donate Miles</figcaption>
</figure>

In order to provide the best experience to the user on the SkyMiles pages, AJAX
was used heavily to send data back and forth to the server. Also, to protect
against fraud, standard security practices were used such as front-end and
server-side validation. Finally, a service call was placed upon final selection
of Donate Now at the time of transaction to prevent against any anomalies.

jQuery was used for user experience and animations to help bring the pages to
life.
