---
comments: true
date: 2010-03-22 10:19:47
layout: post
slug: lenny-nginx-fastcgi-and-symfony
title: Lenny, Nginx, FastCGI and Symfony
wordpress_id: 153
categories:
- Computing
---

Running Apache on 256MB of RAM is not ideal and when I started worrying that my VPS might not be able to cope with sudden spikes in traffic I decided to give Nginx a shot.

This isn't a concise tutorial, I mainly just want to share my Nginx config that got Symfony URL rewrites going, but here's the basic idea;


## Don't panic about downtime!


It's possible to run Nginx and Apache side by side on different ports so that you can migrate your vhost configs in your own time. Follow a tutorial [like this](http://www.ubuntugeek.com/using-nginx-as-a-reverse-proxy-to-get-the-most-out-of-your-vps.html).


## Packages


### Nginx

Debian Lenny currently only provides the older version 6 of Nginx, I can't find any repos that offer the newer, stable version 7, so you'll want to compile it yourself, not to worry, it's very straightforward thanks to [Myatu's excellent tutorial](http://www.myatus.co.uk/2009/09/07/compiling-nginx-on-debian-ubuntu/). I'd highly reccomend installing the Debian Nginx v6 package first in order to get the init scripts which aren't supplied when compiling from source ‒ by compiling you are then simply replacing the binary.

### FastCGI

You might come across a lot of people that say you need to rip some _spawn-php_ package from Lighttpd, don't bother. If you're prepared to be running PHP 5.3 just get php-fpm from the DotDeb repo;

`deb http://php53.dotdeb.org stable all`

I already had php5 installed from the official Debian repos so I just did an _aptitude update_ and _upgrade_ and then installed _php5-fpm_.

Now you want to place this config inside the server{} definition of your Nginx configs, I've placed mine inside each individual /etc/nginx/sites-available config, but I'd hope there was some way of doing it more globally.

{% highlight nginx %}

location ~ \.php($|/){
  set  $script     $uri;
  set  $path_info  "";

  if ($uri ~ "^(.+\.php)(/.+)") {
          set  $script     $1;
          set  $path_info  $2;
  }

  fastcgi_pass 127.0.0.1:9000;
  fastcgi_param SCRIPT_FILENAME /your/web/root$script;
  fastcgi_param SCRIPT_NAME $script;
  #fastcgi_param PATH_INFO $fastcgi_script_name;
  include /etc/nginx/fastcgi_params;
}
{% endhighlight %}


## Symfony Rewrite Rules


Now this was by far the hardest bit for me, there's very little definitive advice on this out there and it took a lot of trial and error to get this running exactly right, but here is what is working for me. Please note I think that it is important that this works in combination with the above FastCGI config above (also place within server{} defs);

{% highlight nginx %}
location / {
  root   /your/web/root;
  index  index.php;

  if (-f $request_filename) {
    expires max;
    break;
  }

  if ($request_filename !~ "\.(js|htc|ico|gif|jpg|png|css)$") {
    rewrite ^(.*) /index.php last;
  }

}
{% endhighlight %}
