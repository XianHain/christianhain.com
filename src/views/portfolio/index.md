---
layout: layouts/portfolio-index.liquid
theme: portfolio
logo: black
logoDark: dusty-blue
headTitle: "Portfolio"
headDescription: "Some samples of my design work"
footerTypes: ["written-by-human"]

canonical: "https://www.christianhain.com/portfolio/"
pagination:
  data: collections.portfolio
  size: 10
  alias: portfolio
permalink: "portfolio/{%- if pagination.pageNumber > 0 -%}page-{{- pagination.pageNumber | plus:1 -}}{%- endif -%}/"
---
