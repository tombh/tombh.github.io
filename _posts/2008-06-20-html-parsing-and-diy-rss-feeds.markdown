---
comments: true
date: 2008-06-20 10:57:04
layout: post
slug: html-parsing-and-diy-rss-feeds
title: HTML Parsing and DIY RSS feeds
wordpress_id: 16
categories:
- Computing
---

A PHP library that I think more people should know about is SC Chen's [Simple HTML DOM Parser](http://simplehtmldom.sourceforge.net/).

An HTML parser is a very powerful tool that allows the systematic 'reading' (i.e. parsing) of an HTML document so that specific elements can be accessed. One example of this would be to regularly parse a forum thread in order to extract the text of the conversation so that it can be published in an RSS feed.

Right, let's say we've managed to get our chosen HTML document into a variable called `$dom` -- we can then do stuff like this;

	foreach($dom->**find**('img') as $element) echo $element->**src** . '<br>';

What that does is first build an array of all the `<img>` tags (and their various attributes such src, alt, width, height) in the document, then, the foreach loop iterates through each `<img>` tag and outputs its `src` attribute.

The `find()` function actually has 2 arguments, the first being the name of the tag you want to find, as demonstrated, and the second can be used to pinpoint a particular tag by numerical order. For example to find the first `<div>` element the code would be `find('div', 0)`, remembering that arrays begin with 0 not 1.

Perhaps the most important attribute that can be accessed is the `innerHTML` one, which you'd do like this;

	$element =  find('div', 0);
	$innerHTML = $element->innerHTML;

So as you can see, HTML parsing is a very useful and accessible way of getting at any part of a HTML document. Obviously I've only been able outline the basics here, there are of course a lot more useful functions in Chen's library.

So if you want to use the HTML parser to create RSS feeds, first you'll need an RSS creator library like [bitfolge's Feed Creator Class](http://www.bitfolge.de/rsscreator-en.html). You can then get all the data for your RSS feeds (like title and description) ready with the HTML parser then add them to the RSS code. Here is the heart of some code I currently use to make feeds;

{% highlight perl %}

foreach($dom->find('table.forumline tr') as $table_row){
	//Filter off irrelvant table rows
	if (! $table_row->find('td span.topictitle') ) continue;

	//Filter off sticky threads
	if ( eregi('sticky', $table_row->find('td img', 0)->src) ) continue;
	if ( eregi('announce', $table_row->find('td img', 0)->src) ) continue;

	//Fill her up
	$item = new FeedItem();
	$title = trim($table_row->find('span.topictitle a', 0)->plaintext);
	$item->title = preg_replace('/[^a-zA-Z0-9:!\.\-+=#@;()&%$£\[\]\{\} ]/', "", $title);
	$item->link = 'http://www.murga-linux.com/puppy/'.trim($table_row->find('span.postdetails a[title=View latest post]', 0)->href);
	$item->description = trim($table_row->find('td span.gensmall', 0)->plaintext);
	//item->descriptionTruncSize = 500;
	$item->descriptionHtmlSyndicated = true;`

	$rss->addItem($item);
}

{% endhighlight %}
