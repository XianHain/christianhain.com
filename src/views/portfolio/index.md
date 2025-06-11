---
layout: layouts/portfolio-index.liquid
theme: portfolio
logo: black
logoDark: green
headTitle: "Portfolio"
headDescription: "Some samples of my design work"
footerTypes: ["written-by-human"]

canonical: "https://www.christianhain.com/portfolio/"
pagination:
  data: collections.portfolio
  size: 5
  alias: portfolio
permalink: "portfolio/{%- if pagination.pageNumber > 0 -%}page-{{- pagination.pageNumber | plus:1 -}}{%- endif -%}/"
---
