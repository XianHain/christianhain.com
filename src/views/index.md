---
layout: layouts/home.njk
theme: homepage
logo: blue
menuTypes: ["social"]
permalink: "{%- if pagination.pageNumber == 0 -%}/index.html{%- else -%}/blog/{{- pagination.pageNumber -}}/{%- endif -%}"
footerTypes: ["csm", "companies"]

canonical: "https://christianhain.com"
pagination:
  data: blog-posts
  size: 5
---
