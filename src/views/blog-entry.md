---
layout: layouts/blog-entry.njk
theme: blog
logo: black
menuTypes: ["blog", "navigation"]
footerTypes: []

pagination:
  data: blog-posts
  size: 1
  alias: blogpost
permalink: blog/{{ blogpost.slug }}/index.html

eleventyComputed:
  headTitle: "{{ blogpost.title }}"
---