---
date: 2016-10-22
layout: post
slug: when-your-screen-breaks-in-the-himalayas
title: When Your Screen Breaks (In The Himalayas)
categories:
- Around The World
- Geek
---

&nbsp;    

![](/images/india/laptop.jpg#wide)

Usually when your laptop screen breaks you curse and just fork out the cash to get it fixed. Perhaps whilst you're waiting for the replacement parts you plug in an external monitor. It's annoying but it needn't be a show stopper. But what if you're two days bus ride from the nearest major city and you can't trust the postal service to send you anything valuable? This is the situation I found myself in Ladakh, Northern India, amongst the mighty Himalayas. I'd come here to have a break from work and write a book. So I needed a working computer, but not so much that my livelihood depended on it, I had time to geek about with more hacker solutions.

The gist of my hack is to use my phone as a 'monitor', by which I don't mean directly streaming video output as in VNC or X-forwarding, although these approaches are certainly part of the fix. Rather I use the phone for multiple interfaces, yes VNC, but more often using my laptop's keyboard to interface to the phone's existing apps, Termux (to SSH into my laptop), Chrome, Gmail, Whatsapp, etc. It took me a few days to get everything just right, but I'm pleased to report that I've written my book and made some technical [Github PRs](https://github.com/jart/hiptext/pull/43/files), so it's a very functional little setup. Even if you've not got anything broken right now I reckon there'll be something in my hack you'll find useful or interesting.

I will also include in this writeup my methods for coping with extremely poor Internet connectivity, which strictly doesn't have anything to do with a broken screen, it's just part of the everyday usage of this curious setup I have.

I'm a Linux and Android person, so some of the details here won't be applicable to Windows, Macs and iOS, but certainly the general themes will still be relevant. Specifically I have a rooted, but unchanged ROM, Sony Z3 Compact smartphone and a Dell XPS 13 (2015) laptop running Arch Linux.

## The bootstrap

Like Matt Damon's stranded character in The Martian, at first you're technically blind so achieving those primitive initial steps to bootstrap could be potentially slow and painstaking.

Ideally we want SSH access from our phone to the laptop, but it's unlikely you have that already setup. Fortunately there is some automation on our side, for instance you may already have your phone's wifi hotspot set to auto connect when you turn it on. And even if you don't, then it's almost certain your OS's DHCP client will auto connect to a USB tether. But. There are two _major_ obstacles &mdash; installing the SSH daemon and discovering your laptop's IP address.

We're going to need to rely on your memory of the boot process. I think most of us can at least get to the desktop blind can't we? I knew to press the up arrow at the Grub boot menu, then wait a few seconds, enter my username and password, then I'd be at my desktop. By a huge stroke of luck I had the extra good fortune to have two text lines worth of working pixels at the top of the screen. Well I say working, they didn't automatically update, I had to sort of twist the screen with my hands and at some point they'd decide to update. I knew then to press ALT+SPACE, my shortcut for a terminal. I couldn't see the mouse cursor or the command prompt, but I could press ENTER a few times to get the prompt and any output to eventually appear in that tiny gap.

So with my auto-connected USB tether I had some Internet, I just needed to type `sudo pacman -S openssh` (I needed to enter my sudo password at first of course) then `sudo systemctl enable sshd && sudo systemctl start sshd` and I was done. Luckily there were no complications. These commands may vary on different systems.

_Some tips: On Linux it's probably even better to just use a VT (eg; CTRL+ALT+F1) if you're blind, as you're guaranteed a login, directly followed by a prompt. That way you don't even need to wait for the desktop to load before you can start installing openssh, etc (thanks to [kbaker](https://news.ycombinator.com/user?id=kbaker) on HN for that idea). Otherwise I know that most OSs have a shortcut for a 'runner', eg; ALT+F2 on most Linuxes gives you a text input where you can type `xterm` or similar, on OSX it's ALT+SPACE to get a runner. You can assume you get focus on a command prompt after starting your terminal app. As far as I know, an SSH daemon is already installed on all OSXs, you just need to start it with `sudo systemsetup -setremotelogin on` (thanks [@notpeter](https://twitter.com/notpeter) for that tip)._

I'd argue this is a good reason to always setup an SSH daemon with a strong password on a new laptop. All web servers have this setup and they're far more exposed than a laptop, so it's not a significant security risk if you use strong authentication. SSH keys are the best.

Now, we just need the laptop's IP address. I could just type `ifconfig` and keep pressing return until I saw the magical `inet 192.168.42.177 netmask 255.255.255.0 broadcast 192.168.42.255` (the IP is the first address, 192.168.42.177 in my case). But as I've since found out, you can actually discover the address from a rooted Android phone, just look in: `/data/misc/dhcp/dnsmasq.leases`. Rooting is generally pretty easy on Android, in most cases you can just do it with an app called [King Root](). If someone knows how to do this from an iOS phone, please let me know.

This is the key stage, if you can't get a running SSH server and find your laptop's IP then I think you just have to fix your screen. Now we just need to provide our SSH details to an SSH client, the port will default to `22`, so it's `ssh://192.168.42.177:22` in my case.

## SSH clients

SSH may be essential for the bootstrap, but it's also by far the app I use most. As I'll talk about more later, I spend most of my time writing in [`neovim`](https://neovim.io) and browsing the web on a remote server using [`elinks`](http://elinks.or.cz). So even though most Android SSH clients are perfectly usable for getting that all-important sudo access to your laptop, for long-term everyday usage an SSH client can actually provide features that make a huge difference to usability.

I'll briefly mention as well that it's good to have at least two SSH clients installed. I also talk about this more later but basically there were a few times when I was experimenting with different methods of using my laptop's keyboard as input to my phone when I managed to freeze up STDIN, so the only way of killing processes was to SSH into my laptop with a different SSH client.

I played with most of Android's SSH clients, none of them are perfect, but there are two I use regularly, mostly Termux and sometimes Connectbot. I'll describe all the notable ones here, ordered by least-used first.

[**Juice SSH ☛**](https://juicessh.com)     
Before my broken screen, this is the app I already knew and used for accessing my remote cloud servers. I thought it was pretty good, well it is, but for daily usage it has one major shortcoming, you can't set the XTERM variable, which means the terminal colours are limited. Don't settle for anything less than `XTERM=xterm-256color` or `XTERM=screen-256color`.

As I'll talk about more later, Juice SSH, like my preferred client Termux (see below), has support for [`mosh`](https://mosh.org), an improved SSH-like protocol for unreliable network connections.

[**Server Auditor ☛**](https://serverauditor.com)    
This one appears pretty modern, the UI is clean and friendly. It's all round an excellent app. However it has one show stopper and a niggle. Most importantly it doesn't support ALT+key combinations, which seriously limits shortcuts in apps like `neovim` and [`tmux`](https://tmux.github.io) (multiple terminals inside a single terminal).

Secondly, it has a curiosity that a lot of the clients here have, it doesn't correctly report the width of UTF-8 characters. Now this really isn't a big deal unless you use status lines like [powerline](https://github.com/powerline/powerline), or [vim-airline](https://github.com/vim-airline/vim-airline) etc.

![](/images/status_lines.jpg#wide)
<small class="caption">
`powerline` with `tmux` and `vim-airline` with `neovim`, whilst editing this blog post.
</small>

Status lines are actually very useful if you spend a lot of time at the terminal, they tell you things like the time, remaining battery and in the case of tmux, running sessions and terminals. But what happens is that special characters like the electricity symbol (&#x26a1;) push the end of the status line over onto a new line, so successive redraws of the status line (eg, when the time changes) gradually push copies of the status line up the screen until you can't see the actual terminal anymore.

The fix is pretty easy, just remove those characters from the config. In my case this means `powerline`, though other status lines are available. Interestingly, the status line I use for `neovim`, `vim-airline` doesn't suffer this problem, so doesn't need any tweaking. I suspected the problem was a combination of the SSH client not setting the `iutf8` flag (type `stty` at the CLI to see which flags are set) and `tmux`'s integration with `powerline`, however despite these suspicions, Connectbot (see below) for some reason renders `powerline` perfectly.

[**Terminal Emulator ☛**](https://play.google.com/store/apps/details?id=jackpal.androidterm)    
This one's noteworthy because, like Termux (see below), it gives you an actual shell and supports mouse escape sequences. The shell in this case is Android's actual shell, so you get all the commands that come with default Android, like `ssh`. You can install [busybox](https://play.google.com/store/apps/details?id=com.jrummy.busybox.installer) for the rest of the commands you know and love like; `cat`, `find`, `grep`, `ping`, `sed`, etc.

Mouse escape sequences are pretty interesting. What happens is that touch gestures are converted to mouse events, this means you can scroll by swiping and move the cursor by tapping. This may not be hugely useful on the CLI but can be useful for other apps, like `elinks` the purely text-based web browser. As I'll talk about later, touch-based `elinks` should be something all travellers and users of poor Internet, should be aware of.

![](/images/elinks.jpg#wide)
<small class="caption">
elinks
</small>

The problems with this client are again small but significant when used as an everyday tool. It supports `screen-256color` but the colours it provides seem limited, as if there are only actually 16 colours. Also it doesn't support ALT+HOME and ALT+END key combinations.

[**Connect Bot ☛**](https://play.google.com/store/apps/details?id=org.connectbot)    
I've actually used this one a lot as a day to day client and have swung between it and Termux. The big pluses are it has the highest screen update FPS and perfect font rendering. I only notice the high FPS because one of the things I'm working on is a graphics to TTY renderer ([hiptext](https://github.com/jart/hiptext) and [texttop](https://github.com/tombh/texttop)). The font rendering is purely aesthetic, spending so much time in a text-based environment I appreciate every opportunity to have little graphical treats like UTF-8 characters. Also `powerline` maintains a set of patched fonts with extra characters like the triangular separator (like filled chevrons <>), Connectbot is the only client to render these characters with perfect alignment, I don't know why.

However, Connectbot, like most of the clients here, doesn't actually support custom fonts out of the box, you need to do a little hack. It's pretty simple if you've rooted your phone; just overwrite `/system/fonts/DejavuSansMono.ttf` with your chosen font and reboot.

Another little hack I use here is to install [Auto Hide Soft Keys](https://play.google.com/store/apps/details?id=com.gmd.hidesoftkeys) because Connectbot doesn't hide those 'soft keys' (Back, Home, Menu). You want as much screen real estate as you can when using your phone as a laptop screen!

I think Connectbot is actually the oldest and perhaps the most mature SSH client for Android and has a sort of active [Github repo](https://github.com/connectbot/connectbot). However, the big reason this isn't my No. 1 app is that there are so many CTRL and ALT key combinations that don't work. There is a [Github Issue](https://github.com/vx/connectbot/pull/123) addressing part of this.

[**Termux ☛**](https://play.google.com/store/apps/details?id=com.termux)    
This is the client I've settled on. There are lots of lovely things about it, but the biggest reason I've stuck with it is because it has complete support for all key combinations. I still have some problems getting `neovim` acknowledging ALT combinations, but that's another story. My only niggles are that it doesn't align `powerline`'s special characters, has that common UTF-8 width bug, and has a low screen update FPS. The font alignment seems odd as Termux's `powerline`-patched fonts are a paid extra.

_I must make a slight digression to mention an unexpected and important discovery. Termux possesses the feature sweet spot of `mosh` and mouse escape sequences. Now what this means is that you can `mosh` into a remote server and interact with a remote `elinks` browser with your fingers, clicking links and scrolling without fiddling with a soft keyboard. Now at first this might not sound particularly exciting, but consider the situations of unstable 2G connections, or censored Internet, or the dreaded combination of both. `mosh` does two things that make a significant improvement over `ssh`, it handles connection loss and only sends screen diffs to lower bandwidth consumption. When the connection disappears `mosh` displays a blue bar at the top of the screen saying as much and patiently waits for the return of Internet without permanently freezing like `ssh` sometimes does. If you use `tmux` on your server as well, this means you have a reliable connection to a long-lived browser session with cookies and tabs, using an Internet pipe faster even than most broaband._

_Imagine this, you're sitting on a bus in the Chinese countryside, you literally only need a few kilobytes of connection every minute or so and you can check your Gmail and do some Googling. This is a killer feature and it's worth having Termux just for this._

Termux has so many of the best bits of the other clients;

* An actual shell. Though it's some kind of jail or chroot, so mounts the native filesystem and you need to install common binaries from a dedicated Termux repo. Eg; `apt update && apt-get install mosh`.
* `mosh` support. Apart from the unexpected `mosh`-`elinks` hack above, the cool thing about `mosh` for connecting to your laptop is that you can disconnect your phone or put your laptop to sleep and `mosh` instantly and automatically reconnects the same connection when you plug back in. _NB. But watch out for nested `mosh` sessions, using `mosh`'s native `CTRL+^.` will kill the parent session. If you want to kill child sessions you'll have to manually find the `pid` and kill it._
* Touch events converted to mouse escape sequences.
* True fullscreen support out of the box. _NB. When using a hardware keyboard you'll want to hide the special characters bar &mdash; long holding the "keyboard" button in the side drawer menu (CTRL+ALT+RIGHT) toggles the bar._
* Lots of `powerline`-patched fonts, though they cost a little bit.
* Open source, active [Github repo](https://github.com/termux).

## Creating a bluetooth keyboard from your laptop's keyboard

It would be a crime not to take advantage of that laptop keyboard that your fingers know so well. There are a few Android apps that let you do just that, but they all use frustratingly poor hacks involving wifi or telnet. It works something like; ensure phone and laptop are on the same network, launch the phone app, then point your laptop's browser or shell to a particular IP and port. It's convoluted and I found they don't even send all keys or key combinations.

Then I suddenly thought, surely I can get my laptop to act as a Bluetooth keyboard? Well yes I can, the only thing is that the software needed to do it is not actively maintained, on Linux at least. Here's what's available, least useful first;

**PyTooth related**    
There seems to be a few attempts to use python to create a Bluetooth keyboard. Obviously some people have had success, but I couldn't make any progress whatsoever with them. The 2 main ones are [pyTooth.py](https://github.com/Rensselaer-Hackathon/Hackathon-Sorting-Hat/blob/master/pyTooth.py) and [hid2bt](https://github.com/gh4ck3r/hid2bt).

[**btkbdd ☛**](https://github.com/lkundrak/btkbdd)    
The advantage of this one is that it claims to work with iPhones/Macs and Windows. It also comes with a separate tool that provides a shortcut to switch your keyboard between acting as a Bluetooth keyboard and a physical keyboard. This is useful because otherwise key presses get sent to both your laptop *and* your phone. Unfortunately, although I got both the binaries to compile and I could see key presses in the logs, I could never get those key presses to my phone.

[**hidclient ☛**](https://anselm.hoffmeister.be/computer/hidclient/index.html.en)    
It's a few years old now but surprisingly works fine. I did however struggle for a while getting all my system Bluetooth stuff setup, which I've never had a reason to do before. The driver for my laptop is proprietary, so I didn't even have that installed. I had to disable some `rfkill` stanzas in systemd config. I needed to actually `power on` Bluetooth in `bluetoothctl`. But the most time consuming problem was discovering that the advice to add `DisablePlugin=input` to `/etc/bluetooth/main.conf` was only applicable to Bluez4, which was good advice 4+ years ago when `hidclient` et al were doing the rounds, but nowadays most of us will have Bluez5, in which case you need to add `--noplugin=input` as an arg to the `bluetoothhd` stanza in `/etc/systemd/system/dbus-org.bluez.service`.

A quick and easy way to avoid your keypresses causing havoc on your desktop whilst you happily type at your phone is to switch to a separate VT, eg; CTRL+ALT+F2. Trouble is I quite often forget to do this and come back to my desktop to find all manner of programs open with random text in them.

[**bVNC ☛**](https://play.google.com/store/apps/details?id=com.iiordanov.freebVNC)    
But how can I see my desktop if my screen's broken? Well I very occasionally VNC in from my phone. I installed `x11vnc` on my laptop which is beautifully simple, no setup, just install and run, it gives you an IP address and port that you provide to a VNC client. bVNC was the second client I tried, I can't remember the first one I used, but it wouldn't render the mouse cursor. I guess theoretically you could do everything you wanted through VNC, but for me the screen update FPS is just too low and it's too fiddly having to pinch zoom all the time to see what's going. I suppose you could change the resolution of your desktop to match your phone? Anyway, I'm happy enough with `ssh` and `tmux`. I do however always come back to VNC to do image editing in Gimp.

## Laptoping through a phone

So now we're very much bootstrapped, we have root and graphical access, and a physical keyboard, there's nothing we can't do. However there's a few things that make life easier.

* Enable a static IP address. I did this by adding the following to `/etc/systemd/network/wired.network`

  ```
  [Match]
  Name=enp0s20u1
  [Netowrk]
  DHCP=ipv4
  [Address]
  Label=enp0s20u1:0
  Address=192.168.42.177/24
  ```

* Disable password login at boot and after sleep, so you always go straight to the desktop. If you're entering your password blind, then you don't get feedback if you enter it incorrectly. Besides you still have password login when SSH'ing.

* Create an `hidclient.service` to start your Bluetooth keyboard at boot. Create `/usr/lib/systemd/system/hidclient.service` and add the following;

  ```
  [Unit]
  Description=Broadcast physical keyboard as Bluetooth keyboard
  Requires=bluetooth.service

  [Service]
  ExecStart=/usr/local/sbin/hidclient -e0
  Restart=always

  [Install]
  WantedBy=multi-user.target
  ```

  Run `systemctl enable hidclient` and it should always start at boot.

* Automate settings when connecting phone to laptop. I use a combination of [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en) and [System Settings](https://play.google.com/store/apps/details?id=com.whitedavidp.systemsettingsfortasker&hl=en) (~£2) to detect power from USB on the phone which in turn toggles the following settings:
  * USB tethering
  * Landscape/portrait mode
  * Bluetooth keyboard connection
  * The [Null Keyboard](https://play.google.com/store/apps/details?id=com.wparam.nullkeyboard&hl=en) input app is a simple hack to never show a soft keyboard. Without it Android will display a keyboard overlay whenever you trigger a text input focus, which is annoying when you have physical keyboard.

* If you don't want to install Tasker and System Settings, then at the very least you want a shortcut to enable USB tethering, you can use the [Shortcut](https://play.google.com/store/apps/details?id=com.sika524.android.quickshortcut&hl=en) app to create a home screen icon to quickly start USB tethering.

* [`neovim` config](https://github.com/tombh/dotfiles/blob/master/init.vim) to make it like a normal editor. I know, I know, I should learn the 'vim way', but I've done my time, and it's not for me. An argument that I never hear in the Great Editor Debate is that \*vim has a rich plugin ecosystem, I should be allowed to take advantage of that without having to learn vim's keyboard grammar.

* `tmux` copy and paste. I set it up by adding this to my [`~/.tmux.conf`](https://github.com/tombh/dotfiles/blob/master/.tmux.conf):

  ```
  # LEADER->'[' enters copy mode and LEADER->']' pastes the current buffer
  set-window-option -g mode-keys vi
  bind-key -t vi-copy 'v' begin-selection
  bind-key -t vi-copy 'y' copy-selection
  ```

## Writing a Book and Blog Posts

You might not be writing a book, but I'll just briefly explain my method because I was surprised how easy it was to accomplish in just `neovim`, markdown and [`pandoc`](http://pandoc.org). I write each chapter as `1.md`, `2.md`, etc and then run this little script to create a PDF version of the whole book;

``` bash
#!/bin/bash
echo "building..."
mkdir -p build
rm -f build/book.md
cp -rf *.md build
for chapter in $(ls build/*.md); do
  echo >> $chapter
  echo '\pagebreak' >> $chapter
  echo >> $chapter
done
cat build/*.md > build/book.md
pandoc -f markdown -o book.pdf build/book.md
echo "built"
```

I use [Jekyll](https://jekyllrb.com), a static site generator, for my blog. Similarly it uses markdown, so I can use `neovim` again. I host it on Github, so publishing is a simple matter of `git push`. Whilst writing I use `jekyll serve`, with `host: 0.0.0.0` in the config, so that I can use my phone's browser set to `192.168.42.177` (my laptop's IP) to view the blog before publishing.

## Slow Internet

The Internet here is worse than the days of dialup. It seems like half the time there's absolutely no Internet and the rest of the time it's intermittent single digit kbps. Here's a pretty standard ping aggregate;

```
--- google.in ping statistics ---
3450 packets transmitted, 1840 received, +2 duplicates, 46% packet loss, time 3513626ms
rtt min/avg/max/mdev = 138.121/18864.009/126507.226/30817.182 ms, pipe 127
```

[**mtr ☛**](http://www.bitwizard.nl/mtr/)    
So one thing I find useful is to keep a running visual ping. It gives me a quick overview of the current state of the network, eg;

![](/images/mtr.jpg#wide)

If there's a lot of red I know it's not a good time to do some googling. But if there's a little bit of colour, I can at least hit 'r' for refresh (I change it from the default (CTRL+R)) on my `elinks` session and come back in a few minutes to see if I've got new mail in my inbox.

**Audio `ping`**    
I wrote [a little script](https://gist.github.com/fa670cdfb5bbbf9a00f3b4da6b813217) to give me audio feedback of the live network quality. It means I can do something else about the house whilst waiting for good enough Internet. No sound means no Internet, then the higher the pitch of the beep the shorter the ping time.

[**elinks ☛**](http://elinks.or.cz)    
So just to be clear, `elinks` should be run on a remote server where the bandwidth is high and reliable. Even though it's text-based it still needs to download the entire site, the advantage is that it only needs to send a page of text over the wire which, when sent using `mosh`'s diffing algorithm, amounts to just a few bytes. I have 3 main tips for using it;

* BE CAREFUL OF THE ARROW KEYS &mdash; they don't do what you expect. Up and down move between links, which can be annoying if the next link is 10 pages down. Left and right go back and forth through history. So use INSERT/DELETE for scrolling up and down, and use my next tip for actually navigating links.

* Hitting '.' toggles displaying a unique number by each link. This lets you type the link number, followed by ENTER, giving you focus on the link. From there you can hit ENTER again to go to the link, or 'T' to open it in a new background tab.

* Hit 'gg[SPACEBAR]' to load the address bar pre-filled with a 'g', then whatever you type next gets sent to Google as a search, just like the default behaviour of most graphical browser address bars. 'tg[SPACEBAR]' is the same but the results get loaded in a new foreground tab.

There are 2 fairly major drawbacks to `elinks`. Firstly it doesn't support SNI encrypted SSL pages, which means a good portion of modern HTTPS sites won't load. There is [a patch to enable SNI](https://www.hadrons.org/~guillem/patches/elinks/), but I haven't had the inclination to try it. Secondly it doesn't have complete JS support, which of course in the brave new world of SPAs can be a show stopper.

[**texttop ☛**](https://github.com/tombh/texttop)    
`elinks`'s lack of SNI and JS support led me to develop a text-based method for displaying a complete and interactive Firefox browser in the terminal.

![](http://i3.ytimg.com/vi/TE_D_fx_ut8/hqdefault.jpg#wide)

It uses [`hiptext`](https://github.com/jart/hiptext) to render the GUI as text, similar to ASCII Art, but better. It uses mouse escape sequences to control the mouse, allowing you to scroll, click and zoom. I've only actually needed it once, to get an API key from my Digital Ocean account, but it's good to know that, should I need to, I can access any site on the Net with only a dialup-speed connection.

## Things to undo once your screen works again
* Disable the `hidclient.service` at boot with `sudo systemctl disable hidclient`
* Re-enable password login at boot and after sleep
