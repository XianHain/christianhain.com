---
layout: layouts/home.liquid
theme: homepage
logo: blue-mid-2
logoDark: blue
menuTypes: ["home"]
permalink: "{%- if pagination.pageNumber == 0 -%}/index.html{%- else -%}/.delete/homepages/{{- pagination.pageNumber -}}/{%- endif -%}"
headTitle: "It's me! Christian"
headDescription: "I'm an Internet power-user, creator, and Certified Scrum Developer® engineer. Specializing in browser-based experiences, my goal is to share what I know."
footerTypes: ["csm", "webby", "social-proof"]
eleventyExcludeFromCollections: true

canonical: "https://www.christianhain.com"
pagination:
  data: blog-posts
  size: 1
---
