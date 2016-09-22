---
date: 2016-09-20
layout: post
slug: when-your-screen-breaks-in-the-himalayas
title: When Your Screen Breaks (In The Himalayas)
categories:
- Mill Grist
---

## The bootstrap

**SSHD**
Once your laptop is past the boot menu, it should automatically connect to your phone's USB tethering (whether there is Internet or not)
Blind through bootmenu, login and launching your terminal
Blind again, install openssh and start it
Argument to always have `sshd` runnnig on a laptop?

What's the laptop's IP address! Luckily I had an intermittent single line at the top of my screen so I could just run `ifconfig` and keep pressing return
until I saw the magical `inet 192.168.42.177  netmask 255.255.255.0  broadcast 192.168.42.255`. On a rooted device you can actually just look in
`/data/misc/dhcp/dnsmasq.leases`.

This is the key stage, if you can't get a running SSHD server and find your laptop's IP then I think you just have to fix your screen. Even plugging in an
external monitor requires setup on your original screen, on Linux anyway.

Now I just need to use provide my details, `ssh://192.168.42.177:22`, to an Android SSH client

**Termux**
* more like virtual environment, jail or something, busybox and lots of other packages
* slick UI
* screen update bug with tmux powerline :(
* FULL SCREEN out of the box!
* Lots of great fonts if you pay
* use mosh because it sets iutf8, see `stty`, which fixes powerline utf8 char count. this fixes rendering bug
* must remove utf8 chars from powerline (they're fine in vim-airline!)
* properly interprets all CTRL and ALT combos
* Converts touch events to mouse escape sequences!!!!!!!

**Juice SSH**
* can't set XTERM, so crap colours
* otherwise seems ok

**Server Auditor**
Seems decent and free, but suffers from screen update bug

**Connect Bot**
* Free and Open Source
* Mature
* Not great UI but lots of options
* Highest FPS
* No fonts but can copy powerline fonts to /system/fonts/DejavuSansMono.ttf and reboot
* Auto Hide Soft Keys app for fullscreen
* Doesn't support CTRL and ALT combos

But it's good to have 2! If BT keyboard is occupying your STDIN :/

Shortcut app to create home screen icon to quickly start USB tethering

## Creating a bluetooth keyboard from your laptop's keyboard

It's annoying having to always move your hands to do things on your phone. At least with 2 working devices, you can reply to a message on your phone and
not have to reopen an SSH client just to use your phone again.

I generally switch between the SSH client, Chrome, Gmail and Whatsapp. Even though the Internet is terrible here and I use elinks mostly, it's still better
to use some of these native apps. Android has a rich selection of key bindings, so it's well worth being able to just live on your laptops keyboard.

**hidclient**
* only one to get actually get working
* CTRL/ALT + nonalphanumeric don't work

**btkbdd**
looks to work with iphones/mac and windows

**PiTooth related**

**Bluez5**
`--noplugin=input` not `DisablePlugin=input`

hidclient.service
Remember to switch to a VT to avoid your keypresses causing havoc on your desktop

**bVNC**
for a couple of reasons at least
could be used as main interface, but resolution isn't great and there's lag. perhaps adjusting laptop's resolution would make it more bareable

## Laptoping through the phone

nvim conf like a normal editor

tmux powerline with internet, battery and time. tmux copy and paste

ALT+TAB to android apps

## Slow Internet

**mtr**

**audio ping**

**elinks**
'.' shows link numbers
arrows move between links so use insert/del
gg to google. tg new tab google
SNI doesn't work :/

**texttop**
