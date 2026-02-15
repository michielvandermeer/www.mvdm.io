---
layout: page
title: Products
icon: fas fa-cube
order: 4
---

Personal projects and products I'm working on.

{% assign sorted_products = site.products | sort: "order" %}

<div class="row row-cols-1 row-cols-md-2 g-4 mb-4 mt-2">
  {% for product in sorted_products %}
  <article class="col">
    <div class="post-preview card h-100">
      {% if product.image %}
      <a href="{{ product.url | relative_url }}">
        <img src="{{ product.image | relative_url }}" class="card-img-top" alt="{{ product.title }}">
      </a>
      {% endif %}
      <div class="card-body d-flex flex-column">
        <h4 class="card-title mb-2">
          <a href="{{ product.url | relative_url }}">{{ product.title }}</a>
        </h4>
        <p class="card-text text-muted flex-grow-1">{{ product.description }}</p>
        <div class="card-buttons">
          <a href="{{ product.url | relative_url }}" class="btn btn-outline-primary btn-sm">Learn more</a>
          {% if product.external_url %}
          <a href="{{ product.external_url }}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">
            Visit {{ product.title }} <i class="fas fa-external-link-alt fa-xs"></i>
          </a>
          {% endif %}
        </div>
      </div>
    </div>
  </article>
  {% endfor %}
</div>
