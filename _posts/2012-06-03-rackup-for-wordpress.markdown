---
date: 2012-06-03 03:21:33
layout: post
slug: rackup-for-wordpress
title: Rackup For Wordpress
categories:
- Computing
---

<p>One of the great things about the Ruby ecosystem is the development practice of firing up quick, per-project development servers. So, you can be in the root of your project and you issue;</p>

<p><code>rackup</code></p>

<p>And a server is fired up serving your app from lcoalhost:8080 (or whatever port you specify). This is so much less of a headache than configuring Apache or Nginx/PHP-FCGI.</p>

<p>So I got to thinking, surely there must be something similar for PHP apps. The nearest I came across was <a href="https://bitbucket.org/ravelsoft/node-sng">SNG</a>, which is actually a Node module. It's a wrapper around Nginx and PHP-FCGI that creates an adhoc and temporary server. It works really well, but it doesn't honour .htaccess rules, which means it won't fire up a Wordpress site very well. I got infinite redirect problems :(</p>

<p>So then I thought I'd dig around in the Ruby world and it turns out that Rack, the framework that supports the serving of Ruby apps has, what it calls, legacy support for PHP in the form of <a href="https://github.com/eric1234/rack-legacy">rack-legacy</a>. Unfortunately, it took me rather a long time to get the config right. I think it's to do with the fact that everyone else has got it working with Pow on OSX, whereas I am a humble Linux user. Anyway, here's a Gist of the config.ru file you need to put in the root of your Wordpress site <a href="https://gist.github.com/2860953">https://gist.github.com/2860953</a> Rackup and rack-legacy are easily installed with;</p>

<p><code>gem install rack rack-legacy rack-rewrite</code></p>

<p>Once you've done that, just;</p>

<p><code>rackup</code></p>

<p>And you're good to go :)</p>