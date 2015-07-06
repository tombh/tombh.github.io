---
date: 2015-07-06
layout: post
slug: plasma-5-(kde5)-debian-sid
title: Plasma 5 (KDE5) in Debian Sid
categories:
- geeky
---

Just writing this up, because no-one else on the Internet seems to have done so.

KDE 5 is a bit of a misnomer now, the more common name seems to be *KDE Frameworks* or
*Plasma 5*. It looks like Plasma 5 will hit Debian Sid's official unstable repos very
shortly, but for now it's extremely easy to just get the packages from Siduction.

Firstly add the following to `/etc/apt/sources.list`:

```
deb http://packages.siduction.org/kdenext unstable main
deb http://packages.siduction.org/kdenext kde-frameworks main
```

Then I'd suggest completely removing any existing KDE and Plasma stuff. From a virtual terminal
(CTRL+ALT+F1) I did `apt-get remove 'kde*'` and `apt-get remove 'plasma*'`

Then do the usual, `apt-get update`. It's nice to install `apt-get install siduction-archive-keyring`
to prevent warnings from Siduction repos. Now you can simply install `apt-get install plasma-desktop`.
It's that easy!

You won't have a login manager, in fact I'm not sure there is one for Plasma 5 yet. I've
seen some people using `lightdm`. But for now I'm just starting it manually with `startx`.

There'll be a bunch of other things you'll want, like; `konsole`, `dolphin`, etc. But that's
up to you how much bloat you want to add.
