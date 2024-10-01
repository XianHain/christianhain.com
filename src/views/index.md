---
layout: layouts/home.njk
theme: homepage
logo: blue-mid-2
logoDark: blue
menuTypes: ["social"]
permalink: "{%- if pagination.pageNumber == 0 -%}/index.html{%- else -%}/.delete/homepages/{{- pagination.pageNumber -}}/{%- endif -%}"
footerTypes: ["csm", "companies"]
eleventyExcludeFromCollections: true

canonical: "https://christianhain.com"
pagination:
  data: blog-posts
  size: 1
---
