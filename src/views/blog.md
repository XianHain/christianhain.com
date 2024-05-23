---
layout: layouts/blog.njk
theme: blog
logo: black
logoDark: green
headTitle: 'Blogs, Memos, and Articles'
menuTypes: ["navigation"]
footerTypes: []

pagination:
  data: blog-posts
  size: 12
  
#permalink: blog{% if pagination.pageNumber > 0 %}/page{{ pagination.pageNumber + 1}}{% endif %}/index.html
---