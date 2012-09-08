---
type: page
layout: default
slug: showcase
title: Showcase
---

##The Dharma API

<img src="/images/dharma-api.png" alt="Dharma API"/>
      
This is an ambitious project to try and archive all the dharma talks (Buddhist-themed teachings about meditation) on the Internet. There's about 17 thousand at the moment. It's written using Ruby's Sinatra to adhere to traditioanl REST specifications.

[Visit site](http://dharma-api.com) or [view source on Github](https://github.com/tombh/dharma-api).

##Reddit Drill

<img src="/images/reddit-drill_small.png" alt="Openpractice"/>
      
Being an avid redditor (see <a href="http://reddit.com">Reddit</a>), I often stumble upon deep comment threads. Some even grow to be many thousands long.
So, I developed a visualiser that parses Reddit's API and graphs deep threads in an easily consumable visual form.

It's written in Python, hosted on Google App Engine and can be contributed to via <a href="https://github.com/tombh/Reddit-Drill">Github</a>.

<a href="http://reddrill.tombh.co.uk">Visit site &raquo;</a></p>


##Tweet Factory

<img src="/images/openpractice_small.png" alt="Openpractice"/>
I've ended up making 3 projects now that require heavy usage of the Twitter Search API; <a href="http://uksnow.tombh.co.uk" target="_blank">#uksnow</a>,
<a href="http://openpractice.me" target="_blank">#openpractice</a> and <a href="http://stocktweets.co.uk" target="_blank">Stocktweets</a>. So I decided to wrap up my code in a nice and tidy class and put it on the <a href="http://github.com/tombh/tweetFactory" target="_blank">githubs</a>.
      
It essentially solves 2 problems that client-side Twitter widgets have trouble with.

Firstly, it can handle very large queries, say if you're searching for any occurence of multiple variances of the top 350 FTSE share codes.</li>

Secondly, it stores all the results in a database so that you can call on them at anytime. Twitter's search API only returns results fromthe last 7 or so days you see.

      
##Frintr &mdash; Social Graph Mosaics
      
<img src="/images/frintr_screen_small.jpg" alt="Frintr"/>

<a href="http://www.frintr.com">Frintr</a> is a business I setup and developed by myself. It generates mosaics from Facebook/Myspace/Twitter friends that go to
form a high resolution image of your own profile picture.
   
Built in a dedicated Linux environment, using the Symfony PHP framework. Uses Facebook, Myspace and Twitter APIs for authentication and integration. I
<a href="http://www.tombh.co.uk/how-i-elasticised-my-web-app" target="_blank">blogged</a> about how I separated the application logic from the web logic and elasticised servers.
      
##Animated #uksnow Twitter Hashtag

<img src="/images/timelapse_screen_smaller.jpg" alt="UKsnow Timelapse"/>

This is simply the same concept as <a href="http://uksnow.benmarsh.co.uk" target="_blank">Ben Marsh's #uksnow map</a> &mdash; therefore
plotting all tweets that contain the hashtag "#uksnow" <em>and</em> some gecodable data (like a postcode or placename). Except
that my version also animates the tweets over time (starting from December 31st 2009), this allows you to watch the ebb and flow of
the snowfall which nicely matches the Met Office cloud-cover and precipitation data for the same periods.

Makes heavy use of jQuery, Google Maps API, Google Geolocation API, MySQL cache. Read <a href="http://www.tombh.co.uk/2010/01/uksnow-timelapse/">my accompanying blog post here</a>.

<a href="http://uksnow.tombh.co.uk">Visit site &raquo;</a>
   
##Reality to HTML

<img src="/images/nm_small.jpg" alt="Nicola Marie" />

Forget those <a href="http://www.psd2html.com/">PSD2HTML</a> services, I've developed a technique for converting <em>reality</em> to valid HTML!

<a href="/nicolamarie/products-page/dresses/index.html" target="_blank">Nicola Marie &raquo;</a></p>

<div style="clear:both"></div>

##wNOP &mdash; Compiz-enabled Linux

<img src="/images/compiz_small.jpg" alt="wNOP - Compiz Linux" />

I was, for a while, actively involved in the <a href="http://www.puppylinux.org">Puppy Linux</a> community during which time
I developed a popular derivative called <a href="http://www.murga-linux.com/puppy/viewtopic.php?t=24871">wNOP</a> that
automatically configured the OpenGL Window Manager, <a href="http://www.youtube.com/watch?v=_ImW0-MgR8I&amp;feature=related">Compiz-Fusion</a>, 'out-of-the-box'. So I am told, tens of thousands of copies
have been downloaded.
      