---
comments: true
date: 2008-01-24 16:52:59
layout: post
slug: css-rounded-corners
title: CSS Rounded Corners
wordpress_id: 10
categories:
- Computing
---

**CSS Rounded Corners -- Using only one image file!**

There are lots of tutorials on this subject, yet most of the one's you see require the use of four separate images, which means a lot of fiddly photoshop work; cutting, pasting, naming and saving -- all times four.

This method will still need four divs, but it will utilise just one _non-symmetrical_ image, aligned (_i.e. not split_) as indicated in this diagram:

![Rounded corners diagram](http://www.tombh.co.uk/wordpress/wp-content/uploads/2008/01/rounded_corners.jpg)

As you can see the layout of the divs is not typical of the traditional four-image method, but rather there is one huge wrapping div with two small divs fixed in the top-right and bottom-left corners and the content-containing div aligned to the bottom right corner.

Therefore the HTML will look like this, (notice the lack of recursive nesting):

<div style="clear:both"></div>

{% highlight html %}

<div id="top_left">
	<div id="top_right"></div>
	<div id="bottom_left"></div>
	<div id="bottom_right">
		Hello there, I'm some content. 
	</div>
</div>

{% endhighlight %}

And here is the the heart of the CSS (note the alignment attributes in the background properties):


{% highlight css %}
#top_left{
	background: url(image.jpg) top left no-repeat;
	padding-top: 6px;
	padding-left: 6px;
	position: relative;
}
#top_right{
	background: url(image.jpg) top right no-repeat;
	width: 6px;
	height: 6px;
	position: absolute;
	right: 0%;
	top: 0%;
}
#bottom_left{
	background: url(image.jpg) bottom left no-repeat;
	width: 6px;
	height: 6px;
	position: absolute;
	left: 0%;
	bottom: 0%;
}
#bottom_right{ /*This is where the actual text goes*/
	background: url(image.jpg) bottom right no-repeat;
}
 
{% endhighlight %}


##Notes
	
  * The top-left div provides the top-left rounded corner _and_ the top and left borders -- thus the need for padding of equal size to the size of the top-right and bottom-left divs. This padding in the top and left sides prevents the bottom-right div from obscuring the wrapping div's borders and corner.
	
  * The two small divs in the top-right and bottom-left _just_ provide rounded corners.
	
  * Absolute positiong is needed for the two small divs -- remember that to absolutely position a div, its parent div _must be_ assigned relative position.
	
  * The bottom-right div actually contains the content text or picture. It provides both a rounded corner and the right and bottom borders. It is also responsible for stretching the top-left-wrapping-div to size.
	
  * Interestingly this method can be used to display a non-symmetrical detail in the bottom-right corner.
	
  * [Here's](http://www.dave-woods.co.uk/?p=150) another approach to rounded corners with a single image but using a slightly different method.

*CSS for MSIE before version 7*

{% highlight css %}
#top_left{
	background: url(image.jpg) top left no-repeat;
	padding-top: 6px;
	padding-left: 6px;
	position: relative;
	height: 100%; /*This causes absolute positioning to work properly*/**
}
#top_right{
	margin-right: -1px; /*Adjusts a small offset*/**
	background: url(image.jpg) top right no-repeat;
	width: 6px;
	height: 6px;
	position: absolute;
	right: 0%;
	top: 0%;
}
#bottom_left{
	margin-bottom: -1px; /*Adjusts a small offset*/**
	background: url(image.jpg) bottom left no-repeat;
	width: 6px;
	height: 6px;
	position: absolute;
	left: 0%;
	bottom: 0%;
}
#bottom_right{ /*This is where the actual text goes*/
	background: url(image.jpg) bottom right no-repeat;
}
{% endhighlight %}
