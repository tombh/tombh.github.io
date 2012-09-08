---
layout: default
slug: blog
title: Blog
---

<h2>Archive</h2>

<br />

<ul class="archives">
  {% for post in site.posts %}
 
  <li>
    <a href="{{ post.url }}">
      <h3>{{ post.title }}</h3>
    </a>
    <div class="excerpt">
	<span class="post_date">{{ post.date | date: "%d %B %Y" }}</span>
	    {{ post.content | strip_html | truncatewords: 50 }}
    </div>
  </li>

  <br />
 
  {% endfor %}
</ul>
