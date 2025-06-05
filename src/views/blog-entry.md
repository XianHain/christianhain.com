---
layout: layouts/blog-entry.liquid
theme: blog
logo: black
logoDark: green
footerTypes: ["written-by-human"]

permalink: blog/{{ blogpost.slug }}/index.html
pagination:
  data: blog-posts
  size: 1
  alias: blogpost
  addAllPagesToCollections: true

eleventyComputed:
  canonical: "https://www.christianhain.com/blog/{{ blogpost.slug }}/"
  headTitle: "{{ blogpost.title }}"
  headDescription: "{{ blogpost.seo.description }}"
---
