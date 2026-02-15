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
    <a href="{{ project.url | relative_url }}" class="post-preview card h-100 text-decoration-none">
      {% if project.image %}
      <img src="{{ project.image | relative_url }}" class="card-img-top" alt="{{ project.title }}">
      {% endif %}
      <div class="card-body d-flex flex-column">
        <h4 class="card-title mb-2">{{ project.title }}</h4>
        <p class="card-text text-muted flex-grow-1">{{ project.description }}</p>
      </div>
    </a>
  </article>
  {% endfor %}
</div>
