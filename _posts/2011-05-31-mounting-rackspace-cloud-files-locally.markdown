---
comments: true
date: 2011-05-31 23:44:16
layout: post
slug: mounting-rackspace-cloud-files-locally
title: Mounting Rackspace Cloud Files locally
wordpress_id: 228
categories:
- Computing
---

Since writing this I've discovered [Cloudfuse](http://sandeepsidhu.wordpress.com/2011/03/07/mounting-cloud-files-using-cloudfuse-into-ubuntu-10-10-v2/), which, seeing as it's designed specifically for the task at hand, might be more suitable.

Firstly, let's talk about how awesome cloud storage is.

_Unlimited storage_. Okay, well it's not infinite obviously, but to all intent and purpose it is. The point really though is that it's not about adding another physical disk to get more space, Rackspace Cloud Files for instance charge 15¢ per GB and that's it. There's no upper limit and no tiered stages like 20GB, 40GB, 60GB etc. It just expands the more you put on it and you pay just for what you use. Awesome? Yes.

_Content Delivery Networks_. Rackspace Cloud Files specifically uses the [Akamai CDN](http://www.akamai.com/dl/technical_publications/GloballyDistributedContentDelivery.pdf) which has over 12,000 servers world-wide replicating content so that it is always served from the nearest and therefore quickest source! Awesome? Yes.

So I'm talking about [Rackspace's Cloud Files](http://www.rackspace.com/cloud/cloud_hosting_products/files/) here but other cloud services offer similar features. Now, one drawback with Rackspace's offering is that there isn't any traditional means by which you can upload to their service, it's all done via an, albeit excellent, RESTful API. So something as simple as uploading a file requires several lines of code. But imagine if your cloud account was just another folder on your local filesystem, whether that's your workstation or your web server. How doubly awesome would that be? Very.

Enter [ftp-cloudfs](https://github.com/chmouel/ftp-cloudfs/) and [curlftpfs](http://curlftpfs.sourceforge.net/), and with a little bit of command line tinkering you have one of the most awesome things you might ever setup on a computer. Ftp-cloudfs is a python wrapper for Rackspace's API, pretty standard in itself, but then it throws its own private FTP server into the mix, essentially giving you FTP access to your cloud account. Yes, yes, yes! Now, for the pièce _de_ résistance, the cherry on the cake, the jewel in the crown; curlftpfs and its ability to mount an FTP server as a local folder. Oh. My. Great. God. Alive! So, you have your cloud, with its API that is wrapped by Python, that integrates with a private FTP server, that is mounted by cURL onto a local folder that you can then open up with any old file browser. Drag And Drop into the cloud anyone?
