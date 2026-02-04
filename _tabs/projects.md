---
layout: page
title: Projects
icon: fas fa-project-diagram
order: 3
---

A list of projects I've participated in over the years.

{% assign sorted_projects = site.projects | sort: "order" %}
{% for project in sorted_projects %}
### [{{ project.title }}]({{ project.url | relative_url }})

{{ project.description }}

{% if project.image %}
![{{ project.title }}]({{ project.image | relative_url }}){: width="400" }
{% endif %}

---
{% endfor %}
