---
layout: layouts/blog.liquid
theme: blog
logo: black
logoDark: green
headTitle: "Blogs, Memos, and Articles"
headDescription: "A collection of my thoughts on life and the Web"
menuTypes: ["navigation"]
footerTypes: ["written-by-human"]

canonical: "https://www.christianhain.com/blog/"
pagination:
  data: blog-posts
  size: 5
permalink: "blog/{%- if pagination.pageNumber > 0 -%}page-{{- pagination.pageNumber | plus:1 -}}{%- endif -%}/"
---
