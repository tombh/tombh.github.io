---
date: 2022-03-28
layout: post
slug: notes-wasmer-controversy
title: "Notes: Wasmer Controversy"
categories:
- Mill Grist
---

I've started working for [Wasmer](https://wasmer.io), a company somewhat surrounded in controversy. I've made an accompanying post exploring my feelings about that [here](/why-i-work-at-wasmer). This post is more just to collect the various public evidence of the controversy. If there is something missing or misrepresented, please let me know so I can add/amend it. I work at Wasmer in full knowledge of these facts.

Although I'm trying to present the story here in an unbiased manner, inevitably my bias will come through. You should read the accompanying post for all the details, but the tl;dr is that: yes the concerns levelled at Wasmer are real and valid, but I can't honestly say I am above them. In my 15 years of experience in this industry, what I find unique about Wasmer is not the nature of the controversy, but that it is public.

## Mozilla versus YCombinator
The highest praise and gratitude goes to Mozilla for not only the technical merit of [WebAssembly](https://webassembly.org/) (Wasm), but also the diplomatic achievement of bringing all the needed major players together, namely; Google, Apple and Microsoft.

Just as it became clear that Javascript needed a systems runtime (Node.js) so too did it become clear for Wasm. In 2019 there were a number of prominent runtime projects, but most notably these two; [Wasmtime](https://wasmtime.dev/) which was, at the time, incubated by Mozilla themselves, and Wasmer, incubated by [YCombinator](https://www.ycombinator.com/) (YC), famous for such startups as Airbnb, Coinbase and DoorDash. Mozilla and YC are two giants of the tech world, in many ways representing the fundamental archetypes of public good and private interest, two forces that have profoundly shaped the Internet, and hence the world, as we know it today.

## What I know so far

<center>○</center><br/>
I haven't found anything online yet, but I believe it is somewhat public knowledge that in 2019 Wasmer tried to poach prominent Wasm runtime developers (who? from what projects?). I don't know the details, but I believe this began to cause tensions between Wasmer and Wasmtime.

<center>○</center><br/>
At a public Wasm event in March of 2019, a member of Wasmtime, [tweeted](https://twitter.com/linclark/status/1105181102694633478):

> There’s a guy in the wasm world who: <br /><br />
😡 Touched me in a prolonged, overly-familiar way at a wasm event, making me uncomfortable <br/>
🤨 Then tweeted about me for International Women’s Day (to get those RTs, I’m sure) <br />
🤯 While unfollowing me that same week <br /><br />
Don’t be that guy 👆🏻

As can be seen from the ensuing replies, the CEO of Wasmer's responses are received poorly.

Later, in December of that year, [it's made clear](https://twitter.com/syrusakbary/status/1202362342555545600) that the guy in question is indeed Syrus Akbary, CEO of Wasmer.

<center>○</center><br/>
On November 12th, 2019, Mozilla announced the creation of [The Bytecode Alliance](https://hacks.mozilla.org/2019/11/announcing-the-bytecode-alliance/) (BA):

> a nonprofit organization dedicated to creating secure new software foundations, building on standards such as WebAssembly and WebAssembly System Interface (WASI).

The founding members being; Mozilla, Fastly, Intel, and Red Hat. The next day Wasmer applied to join. There is a [Wasmer Github issue](https://github.com/wasmerio/wasmer/issues/956) discussing the process. In that thread, it's claimed that a reply had not been received from BA, at least not up until November 21st. Indeed it seems that an official reply from BA was never given to the official application. In hindsight, Wasmer relied upon an unofficial veto received the same day BA came into existence, [a comment from that Github issue](https://github.com/wasmerio/wasmer/issues/956#issuecomment-722045840):

> The Bytecode Alliance vetoed Wasmer the same day the alliance was announced, on November 12 2019 (via direct message by one of their well-known members -now working at Fastly- to an investor of Wasmer)

<center>○</center><br/>
On November 22nd, Wasmer Inc. took the surprising step of applying for trademarks to the names; "WASMER", "WEBASSEMBLY" and "WASM". [Here is the USPTO application](https://uspto.report/company/Wasmer-Inc). Syrus later explained that this was part of an existing process to form a WebAssembly foundation, in [a company blog post](https://wasmer.io/posts/wasmer-and-trademarks) on March 20th, 2022, he wrote:

> Simply because “WebAssembly” is part of the name “WebAssembly Foundation”, an attempt was made to register a trademark for “WebAssembly”. The intent was not to kidnap the name, nor to aggressively prevent its usage, but solely to create the foundation.

The blog post also states that Syrus didn't know that "WEBASSEMBLY" and "WASM" were being applied for, and that he made no further effort to continue the process once he found out. There's some [discussion of the blog post on Hacker News](https://news.ycombinator.com/item?id=30758651). A well-made point from [a commentator](https://news.ycombinator.com/item?id=30786558) there is that the rejection from the USPTO predates Syrus's claim to have discovered the truth of the application:

> In addition, the USPTO record shows that your attorneys withdrew from the trademark case several weeks prior to the DM screenshot you posted where you claim ignorance. As part of that withdrawal, your lawyer attested, under penalty of law, that you had been notified about the current state of those filings.

This would imply that Syrus is lying in the blog post. I don't personally believe that, but there's evidence for it so it's certainly a possibility.

<center>○</center><br/>
Generally it seems that Wasmer continued to communicate with BA for about a year about joining, as indicated by [a comment from an employee](https://github.com/wasmerio/wasmer/issues/956#issuecomment-719449743) in that same Github issue. And there is [a comment from a prominent member of BA](https://github.com/WebAssembly/WASI/issues/3#issuecomment-713652851) on an important Wasm project called [WASI](https://wasi.dev/), that gives some context for their rejection:

> The rejection from the Bytecode Alliance was based on a history of behavior that isn’t compatible with the BA codes of conduct—both the individual CoC and the organizational CoC.

> We made both of these points explicit in the rejection email. In that email, we also said that if Wasmer established a track record of positive engagement, we would re-evaluate.

It is not clear which rejection email this is. According to Wasmer, the only rejection they had was unofficial and was received on November 12th, 2019, before the attempt to register the trademarks. Either way, it seems perfectly reasonable, that in the eyes of BA, Wasmer was not "establishing a track record of positive engagement".

Although there is zero evidence for it, I personally think it's clear that the "history of behavior that isn’t compatible with the BA codes of conduct" is a direct reference to Syrus' conduct at, and in response to, the public Wasm event in the tweet above.

<center>○</center><br/>
In October 2020 the entirety of [the Wasmtime team was hired by Fastly](https://bytecodealliance.org/articles/1-year-update#the-lucet-and-wasmtime-teams-join-forces). In [a Hacker News post](https://news.ycombinator.com/item?id=24897641) Syrus [expressed concerns](https://news.ycombinator.com/item?id=24900186) that, "now almost all the power of the WASI standard is concentrated into the Fastly corporation". Considering Wasmer's track record, this was not received well. And not helped by the fact that at one point [Syrus used a puppet account](https://news.ycombinator.com/item?id=24904829).

<center>○</center><br/>
In October 2021, Ivan Enderlin, one of Wasmer's most prominent employees and ultimately co-founder, [left Wasmer under difficult circumstances](https://mnt.io/2021/10/04/i-leave-wasmer). In Ivan's post he talks about a toxic working environment, being micromanaged, burnout, lies, secrets, and the departure of most of the development team (7 devs in total) for related reasons.

There is also a [discussion of Ivan's blog post on Hacker News](https://news.ycombinator.com/item?id=28772863).
