---
comments: true
date: 2008-04-24 22:18:20
layout: post
slug: simplate-a-very-simple-php-templating-system
title: Simplate -- a very simple PHP templating system
wordpress_id: 12
categories:
- Computing
---

I have designed a very simple PHP templating system called Simplate, you can [download it from here](/images/simplate-01.zip). Instructions on how to use it are contained within the Readme.txt file.

I sometimes like to describe PHP as 'HTML with conditional statements', this is perhaps on over-simplification, but for anyone new to web development it's usually enough to make them go 'Ah!'. You see, all PHP does is just output ordinary HTML, but it lets you ask a few questions before it does so, like, 'is it Saturday?' or 'what's the most recent database entry?' and then let's you choose some appropriate HTML to display depending on the answers. Simple really.

Perhaps the simplest PHP-thing I can think of is putting the current date at the bottom of a web-page, which would be done like this,

`<?php print date() ?>`

And then to style, position it, or whatever, all you need to do is surround it with HTML and CSS, for example,

`<strong class="beautiful">
<?php print date() ?>
</strong>`

But I think the first real benefit that an HTMLer would receive from PHP is simple templating. Let's say we are making a website that has a consistent design across all its pages -- maybe a colourful banner across the top with the website's name in a pretty font. Now let's also say there are 10 pages to this site and that the banner must appear at the top of every single one, no problem, we can just copy and paste the HTML into every single page. Great. But what if we find a mistake or we want to change the wording of the banner? We have to go through every single page and change it! Not so great. What if we could simply store the banner-HTML in a single file and get it to fetch different page-contents into itself? That would mean that if a change needed to be made to the banner then all we need do is update one little file! PHP makes this kind of thing very easy.

This is the basis of templating and when such techniques become a necessity, and not a luxury, we have the foundations of Content Management Systems, like Wordpress (from which this site is made), Joomla and Drupal. But let's have a closer look at this simple templating for now, here's how a typical page might be coded,

`<h1>Banner that Always Appears at the Top</h1>
``<?php include($a_page) ?>`

where` $a_page` is a variable that stores the address of the file that contains the requested page-contents.

So the basic premise is pretty simple really. But one tricky problem we come across is that actually we may want the banner to be slightly different on each page. Most commonly, the problem occurs when the banner also provides site navigation and you want the banner to indicate, by highlighting the appropriate button, which section of the site we are currently viewing. I'm not sure of the technical term for this, but I call it _currentification_. And in order to do this we have to use PHP to insert some kind of class or ID into the anchor tag of the page currently being viewed in order to differentiate it as 'current'. Again, this is the kind of thing that PHP makes very easy. It might be coded something like,

`<?php if ($link_address == $current_url) $class='current'; ?>
<a href="<?php print $link_address ?>" class="<?php print $class ?>">Link Title</a>`

So there you have it, the fundamentals of templating, and these are exactly the principles that have gone to make up Simplate.
