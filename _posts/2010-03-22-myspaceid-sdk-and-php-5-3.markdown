---
comments: true
date: 2010-03-22 16:33:36
layout: post
slug: myspaceid-sdk-and-php-5-3
title: MySpaceID SDK and PHP 5.3
wordpress_id: 160
categories:
- Computing
---

If you're trying to get the MyspaceID SDK working in PHP 5.3 then you're going to need the updated version of the Janrain OpenID library instead of the version that it ships with as default.

You'll know your version of the OpenID library is a problem because you'll get lots of these errors;

`Deprecated: Assigning the return value of new by reference is deprecated`

Once you've downloaded the updated library from [here](http://sourcecookbook.com/en/recipes/60/janrain-s-php-openid-library-fixed-for-php-5-3-and-how-i-did-it), just copy the /Auth folder (nothing else is needed) and replace the /Auth folder  in the MySpaceID SDK.

**However!** You will also need to retain the /Auth/OpenID/OAuth.php file from the MySpaceID SDK as the updated  Janrain version doesn't include it, just copy it over.

Happy days :D
