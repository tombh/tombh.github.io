---
comments: true
date: 2011-05-02 15:44:25
layout: post
slug: chromephp-setup-for-all-your-local-sites
title: ChromePHP setup for all your local sites
wordpress_id: 216
---

As you may kow you can output your PHP debugging into the Chrome console using [ChromePHP](http://www.chromephp.com/). Hallelujah!

However, there is a 4k limit to the size of the output ChromePHP can return. Bugger. Therefore you need to use ChromePHP::useFile() in order to allow unlimited output. This works by outputting debugging content to somewhere on the filesystem and reading that output from a public URL such as `http://localhost/chromephpoutput`

I didn't want to have to setup Apache every time I start developing a new site locally, eg;

	http://localdevsite1/chromephp
	http://localdevsite2/chromephp
	http://localdevsite3/chromephp
	etc...
<br>
So what you can do is simply add; `Alias /chromephp /tmp/chromephp` to your Apache config (say at `/etc/apache2/conf.d/vhosts.conf`) and for every domain that you host locally you'll be able to access `/tmp/chromephp` via the URL `http://somelocaldevsite12312/chromephp`

Now, if you've put the ChromePHP lib on your include path and added; `ChromePHP:useFile('/tmp/chromephp', '/chromephp');` to that lib or anywhere else in your code, ChromePHP will now work for every site and for any amount of debugging output.
