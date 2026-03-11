---
layout: layouts/blog-index.liquid
theme: blog
pageName: blog
headTitle: "Blogs, Memos, and Articles"
headDescription: "A collection of my thoughts on life and the Web"
footerTypes: ["written-by-human"]

canonical: "https://www.christianhain.com/blog/"
pagination:
  data: collections.blog
  size: 5
permalink: "blog/{%- if pagination.pageNumber > 0 -%}page-{{- pagination.pageNumber | plus:1 -}}{%- endif -%}/"
---
