---
comments: true
date: 2010-02-13 11:43:52
layout: post
slug: inserting-unicode-characters-on-linux
title: Inserting unicode characters on Linux
wordpress_id: 143
categories:
- Computing
---

If all you want to do is insert a special character like an em dash (—) or an ellipsis (…) in Linux you don't need any special programs like _scim_ or _kcharselect_, you simply;



	
  1. Hold down **CTRL+SHIFT+U** and a little underlined **u** will appear

	
  2. Type the unicode hexadecimal number for the character, eg 2014 for an em dash

	
  3. Press space and your character will magically appear!


A [reference like this](http://www.alanwood.net/demos/ansi.html) will help you find the corresponding hex digit for your character.

It's amazing how such a simple and useful tool like this is so hard to find out about. I stumbled across this after hours of googling and even then it was tucked away half way through some comments :(

_BTW, I did this on Debian Linux KDE4, so your mileage may vary._
