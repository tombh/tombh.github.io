---
comments: true
date: 2009-05-04 21:25:34
layout: post
slug: rss-feeds-per-user-in-wordpress
title: RSS feeds per user in Wordpress
wordpress_id: 21
categories:
- Computing
---

Googled for a while expecting to find some plugin to do this, but no luck. So here's a quick hack;

Open up /wp-includes/feed-rss2.php and at about line 35, after where it starts the while() loop, add;

`<?php
if ( isset( $_GET['author'] ) ) :
if ( get_the_author_ID() != $_GET['author'] ) continue;
endif;
?>
`

You will now be able to create feeds on a per user basis via, the URL

`www.mysite.com/?feed=rss2&author=[author_id]`

The surest way to get a user/author's ID is in the admin backend under "Users", if you hover over a username the ID will be in the URL.
