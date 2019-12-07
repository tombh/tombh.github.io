---
date: 2019-05-26
layout: post
slug: deleting-facebook-and-google
title: Deleting Facebook and Google
categories:
- Geeky
---

## Why?
The gist of it is that I believe these companies now have too much power, perhaps even reaching a precedent unseen
in history. Much has been said about all this already and I don't think I'll add anything
particularly new. However, I feel a certain responsibility as a professional computer person to add to
the small but growing number of stakes in the ground. Whether boycotting these companies is right or
not, there at least needs to be a choice of reasonable paths for us all to take without needing specialist knowledge. Right now leaving Facebook and Google is hard, the only way it will get easier is if enough people
retread those other paths and leave signposts along the way.

There are certainly significant differences between the 2 companies, but the crux of the decision to leave both of them came when I heard about the [Cambridge Analytica scandal](https://en.wikipedia.org/wiki/Facebook%E2%80%93Cambridge_Analytica_data_scandal) at Facebook. Even if the reports of that event
are largely conspiratorial, it nevertheless laid out to me, in an entirely plausible way, the mechanics of a new form of mass manipulation. If state-level actors haven't yet exploited user data to shape the political landscape of countries, or indeed continents, they undoubtedly will.

On the face of it most of us think that Facebook and Google are in the businesses of social media and internet search respectively. The reality is however that they are both advertising companies. At their
very core, their DNA is a blueprint to make money from successful ads. My petty annoyances with poorly
produced, attention-grabbing ads aside, there is an inescapable, dangerous and fundamental overlap between advertising technology and propaganda technology. No matter how ethically principled an ad company is
it will always, to a greater or lesser extent, be facilitating propaganda. So in essence, one way of
looking at what Facebook and Google have created is that they're virally-successful propaganda laboratories.
Every tiny tweak they make to their algorithms is simultaneously a contribution to the state of the art of
mass manipulation. We can argue about the extent to which this knowledge makes it into the hands of the unintended,
but the fact remains that this knowledge is being evolved at an unprecedented rate.

In the grand scale of things I don't suppose Facebook and Google are that bad. It's just that we've reached a
notable watershed: the internet has become central to the functioning of the modern world, such a system must
have significant costs, those costs are implicitly paid for by our personal data, data which in turn pays for
itself by perfecting the art of advertising, an art inextricably linked to propaganda. These 2 companies just
happen to be easy pickings at the centre of this novel virtuous cycle. They're also a good target because they
have so many associated properties; Youtube, Instagram, Whatsapp, Gmail, Android, Chrome, to name just a few.
It's so easy to get caught up in using all these apps, indeed that is part of the success of the virtuous cycle.
Online life is hard without them, but rubbing up against the day to day inconveniences their absence generates
is also the very source of motivation to conceive of new landscapes. I admit it's not much fun, but we've got
to start somewhere. Not to mention that I'm already addicted enough as it is, I'd do well to take every
opportunity I can to reimagine my digital life.

## How?

### So firstly, the things I haven't managed to give up.

For a start I haven't actually deleted my Google account,
because I still currently use Google's Cloud servers for [Browsh's](https://brow.sh) SSH and HTML apps. Google Cloud
has cheap short-lived VMs available through their Kubernetes platform, that are just perfect for Browsh's workloads.
I see that Digital Ocean can now probably do what I need, but that's a migration I'm going to have to
do another time.

Then there's Youtube. This surprised me, I just cannot imagine how I can be a digital citizen and not use it. There
are certainly alternative video sites, but they don't have the content. I actually now think this might be a more
important asset to Google than search.

Google Translate. I've been a full time digital nomad for 3 years now and I don't see that changing any time soon.
There just aren't any other translation apps that come close to Google's. Luckily at least you don't need to be
logged in to use it.

Android. It's actually entirely possible to use Android without making any requests to google.com domains. Which
is what I now do. But nevertheless, it is still fundamentally dependent on the Google ecosystem. For instance I
still download apps mirrored from the Google Play store. I've never been an Apple person, but I'm slowly becoming
even less of a Google person, to the point that I think an iPhone is probably the least worst option.

### What I have quit

Facebook and Instagram. I don't really have much to share about leaving them. I think there's a lot to say about the
superficiality they promote, but that's another conversation.

Whatsapp. Such a great app! Everybody has it, great UI, works on the worst connections. This has been really
frustrating to have to explain to people I don't have it. I opt for [Signal](https://www.signal.org/) now, hardly
anyone uses it and the UX isn't as nice, but it uses state of art in encryption. BTW you should all know about
[Riot](https://riot.im/app), for chat, voice and video: open source, decentralised, ok mobile app, in-browser client (even for video!) and modern encryption.

I swapped Gmail for [Fastmail](https://www.fastmail.com). It's about $5/month.

DuckDuckGo is now my default search engine. I do however still fallback to Google sometimes for programming related
things.

I use Firefox instead of Chrome. The mobile app supports web extensions, it's great to have ad-blocking on your mobile.

The crux of getting Android to stop using Google-based remote services is to install a custom ROM with Google's
Play services app removed. Unfortunately there are a lot of apps that won't work without it. Fortunately there's
a commendable open source project to replace all Google Play's endpoints with alternatives or at least stubs. The
project is [MicroG](https://microg.org/).

My biggest worry about not installing any Google apps was finding a replacement for Google Maps, but I've been
pleasantly surprised by [OSMAnd+](https://osmand.net/). They do want money for it, but they also generously make
it freely available on the F-Droid store. The one thing I'd say about Google Maps alternatives is that the norm
is actually to download offline data for the regions your interested in. This took me a while to get used to
because I rarely did that on Google Maps.

An interesting replacement I found for Google's international internet-based phone calls (was that part of the Google Hangouts app?), was a mashup of [Twilio's](https://www.twilio.com/) VoIP API and the [Zoiper](https://www.zoiper.com/) app. It was a little technical to setup and I didn't make any notes, but I can assure you it's possible without programming knowledge, just a little bit of informed clicking. So anyway now I can make local rate phone calls all over the world as if I'm in that country. Essential for a digital nomad.

And finally backups. Google-enabled Android will put all your media in the cloud for free. So I took the opportunity to overhaul all my syncing and backup needs. [I wrote a separate blog post about that](/synching-and-backup-notes). The short story is that I now sync my laptop, mobile and a remote VM with [Syncthing](https://syncthing.net/), and take regular backups with [Borg](https://www.borgbackup.org/). The VM which I already use for other things is the only cost, at round $5/month including the extra disk space.

## Conclusion

All in all I'm pretty happy with my new setup. There's still some bits to shake off, but it's a significant start. Life online is indeed possible without the giants of Google, Facebook and their offspring. The biggest problems are just knowing there are better versions of things out there and having to put up with annoyances that you know need not exist. But I'm a geek, so I enjoy all the extra tweaking and setup. I was interested in all these tools before anyway, but I'm forced to actually invest in them now that I need them to navigate my daily digital life. I'm not sure I'd recommend all this to most people, but I do hope you take solace knowing that such a path is possible.
