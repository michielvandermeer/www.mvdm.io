---
layout: page
title: Products
icon: fas fa-cube
order: 4
---

Personal projects and products I'm working on.

{% assign sorted_products = site.products | sort: "order" %}
{% for product in sorted_products %}
### [{{ product.title }}]({{ product.url | relative_url }})

{{ product.description }}

{% if product.external_url %}
[Visit {{ product.title }}]({{ product.external_url }}){: .btn }
{% endif %}

---
{% endfor %}
