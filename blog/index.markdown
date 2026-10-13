---
layout: default
slug: blog
title: Blog
---

<h2>Categories</h2>

<div class="categories">
  <a href="#all-posts" class="category-filter all-posts">All Posts</a>
  {% for category in site.categories %}
    <span class="separator">&middot;</span>
    <a href="#{{ category | first | slugify }}" class="category-filter {{ category | first | slugify }}">
      {{ category | first }}
    </a>
  {% endfor %}
</div>

<h2 class="category-title">All Posts</h2>

<br />

<ul class="archives">
  {% for post in site.posts %}
    <li class="all-posts {% for category in post.categories %} {{ category | slugify }} {% endfor %}">
      <div class="title-and-date">
          <a href="{{ post.url }}">
            <h3>{{ post.title }}</h3>
          </a>
          <span class="post_date">{{ post.date | date_to_long_string: "ordinal" }}</span>
      </div>
      <div class="excerpt">
        {{ post.content | strip_html | truncatewords: 50 }}
      </div>
    </li>
  {% endfor %}
</ul>
