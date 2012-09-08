---
comments: true
date: 2011-05-31 22:28:00
layout: post
slug: how-i-elasticised-my-web-app
title: How I elasticised my web app
wordpress_id: 223
categories:
- Computing
---

By 'elasticising' I mean, separating the heavy application logic from the lighter website logic in such a way that under high demand it is a simple matter of firing up new application server clones to cater for the increased load. The other significant benefit of this is that by placing the most significant application load onto a separate server, the web server is dedicated to the sole task of serving web pages.

The web app in question is [http://frintr.com](http://frintr.com); it creates mosaics from all the profile pictures of your social network friends. The basic elastic concept is as follows;



	
  1. Someone requests a mosaic on the web server, so we gather all the things we need to make it, profile pic URLs, user ID, unique mosaic ID, etc into a nice little JSON package.

	
  2. We place that JSON package onto a queue.

	
  3. The application servers poll the queue and, if a package is found, it is removed from the queue and building is begun.

	
  4. Once the mosaic is built it is FTP'd back to the web server and a little note is made in a prearranged location saying that a mosaic is finished and waiting to be served.

	
  5. The web server, via AJAX, polls itself in the prearranged location from step 4, waiting for an application server to place the completion note.

	
  6. The web server renders the finished mosaic.


To create the queue I use [Redis](http://redis.io/), a NoSQL-style database. Crucially it provides atomic operations, which means that when a queue is being polled by multiple servers only one can ever receive the queued item as it is _instantly_ popped from the queue upon request. Redis also provides a server-client paradigm out of the box, so you just fire up a password protected Redis server on the web server and query it remotely from the application servers. Installing and interacting with Redis is easy if you're using Debian because the folks over at [Dotdeb](http://www.dotdeb.org/) have ready-made packages for it.

Another thing worth mentioning is how to make a daemon, as that's the thing that does the constant 24/7 polling of the Redis queue. Making a cron job that runs every minute (which is too slow for a real-time app) or whatever is one thing, but having a script run constantly with the same process ID is something else altogether. Thankfully, PEAR's[ System_Daemon](http://pear.php.net/package/System_Daemon) library handles all the daemon stuff for you. It evens creates init.d scripts for you that can be run at start up. It's a real big deal keeping this running, without it the whole system breaks down. For instance one gotcha I discovered is that the daemon will crash from the fatal error caused by the Redis server being unreachable, when the web server reboots for instance. For now, I've just fixed that bug, but I'm looking into using [Monit](http://mmonit.com/monit/) to manage automatic respawning.

It's still a work in progress, but I'm impressed by how well this method works.
