---
layout: page
title: Projects
icon: fas fa-project-diagram
order: 3
---

A list of projects I've participated in over the years.

{% assign sorted_projects = site.projects | sort: "order" %}

<div class="row row-cols-1 row-cols-md-2 g-4 mb-4 mt-2">
  {% for project in sorted_projects %}
  <article class="col">
    <div class="post-preview card h-100">
      {% if project.image %}
      <a href="{{ project.url | relative_url }}"><img src="{{ project.image | relative_url }}" class="card-img-top" alt="{{ project.title }}"></a>
      {% endif %}
      <a href="{{ project.url | relative_url }}" class="card-body d-flex flex-column text-decoration-none">
        <h4 class="card-title mb-2">{{ project.title }}</h4>
        <p class="card-text text-muted flex-grow-1">{{ project.description }}</p>
      </a>
    </div>
  </article>
  {% endfor %}
</div>
