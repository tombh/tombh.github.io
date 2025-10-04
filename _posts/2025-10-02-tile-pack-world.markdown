---
date: 2025-10-05
layout: post
slug: packing-world-lines-of-sight
title: Packing The World For Longest Lines Of Sight
categories:
- Computing
- Code
---

I have a side project to find the longest line of sight on the planet<a href="#footnotes" class="footnote">1</a> using a novel [Total Viewshed algorithm](https://github.com/tombh/total-viewsheds). At a resolution of 3 arc-seconds (~92m x 92m), the planet contains around 4.5 billion elevation samples<a href="#footnotes" class="footnote">2</a>. Now obviously we don't need to calculate the visibility between literally every single one of those, so how do we begin to cut it up? That's what I'll explore in this post.

## Theoretical Longest Lines Of Sight
A [viewshed](https://en.wikipedia.org/wiki/Viewshed) is all the things that you can see from any given point. Here is an example from my home country, Wales, looking across a large estuary towards England:

<img src="images/cardiff_viewshed.webp#wide" />

Notice how it seems that this viewshed is pretty much completely contained within the screenshot. I say "seems" because what if there's some gigantic off-screen mountain that, even though it's far away, its peak can be seen for hundreds of kilometres all around? The fact is that there is only one way to know whether you've found the true boundaries of a viewshed — going to the edge of where the Earth curves.

You may already know this bit of trivial knowledge: for an average height person standing on a beach, their horizon is around 4.5km away. So extending that example to Mount Everest, if it were unobstructed and looking at only sea, its horizon would be about 335km in the distance. Now we can add one more little case to this: what if there were _another_ Mount Everest at exactly the right distance, such that it could see the same horizon, but from the other side? This would also mean that the peaks of these 2 Everests would be mutually visible. And so this is how we can construct theoretical maximums for viewsheds. Basically, for any given region, we find its highest point and assume that there is a perfectly placed sibling peak of the same height that is mutually visible. Here's a list of some of these maximums:

* 8848m  670km (height of Everest)
* 6km    553km
* 4km    452km
* 2km    319km
* 1km    226km
* 0.5km  160km
* 1.65m  9km (height of an average human)

Note how the distances are double that which I've already mentioned. This is because we assume the extreme perfect case where the 2 peaks are right at the edges of the other's horizon. If one Everest can see 335km then 2 Everests can, in theory, see each other from a distance of 670km.

## Total Viewshed Tiles

<img src="images/tvs.webp#wide" />

This is what's called a Total Viewshed Surfaces (TVS) heatmap. Its source data is nothing other than the raw elevation values from the Welsh map above. But this time _every single possible viewshed_ has been calculated for it! There's no sensible way of rendering all those viewsheds, so instead just the surface area of each viewshed is recorded. Therefore the whiter pixels in the heatmap have larger viewsheds, namely, they can see more, and the darker pixels have smaller viewsheds, in other words they see less.

I find these TVS heatmaps eerily beautiful. There's certainly a sense of light being shone, but it's not quite clear from where. In this case it feels like the estuary is shining onto the mountains. But notice how that little island in the middle has what appears to be 4 or 5 shadows. I understand it like this: imagine you are in one of those "shadows" looking towards the island but instead looking at what's behind the island in the distance. The "shadow" is indicating that the island is blocking a larger surface of land in the distance. The island may be small, but the nearer you are to it, the more of your field of vision it occupies, and thus the smaller your viewshed.

I will of course try to make as many of these publicly available as possible. Hopefully the whole world if practical. Watch this space. But for now back to the packing problem.

Notice how this TVS heatmap only covers a small region from the centre of the map above. In fact it is just the right size that every single point in it has enough elevation data from the surrounding map that none of its viewsheds are prematurely cut off. And this exact size is calculated using the theoretical longest line of sight formula we previously discussed. This is important for the packing problem because it shows us that we don't need to think carefully about how TVS tiles themselves overlap. In fact ideally they just need to touch. It's all of the surrounding auxiliary elevation data that has to overlap, and there's just no way around that.

## Covering The World
If we could calculate the TVS for every part of the planet, at some point we would then also calculate the longest line of sight. Some of you may be thinking, well if your goal is to just find the longest, why calculate them _all_? Indeed, I could just find the largest TVS on the planet and be done with it. The short answer is that I also want to be able to answer questions like, what's the longest line of sight in Wales? Or, from where can you see Africa from Europe? Or indeed, what's the longest line of sight that is actually practically able to be seen due to not suffering from adverse conditions like low oxygen, bad weather, refraction, pollution, etc.

But another reason I can't just take the largest TVS is that it only contains the _theoretical_ longest line of sight. Not only might a peak not have its perfect sibling, but even in the rare case that it did, there could be plenty of terrain in between them that prevents them seeing each other. We would still need to search other tiles until we found a line of sight that was longer than any of the remaining TVSs' theoretical maximums.

Whatever my goals, I need to consider how to at least find a not-terrible TVS packing of the world.

So there are just 3 rules that a planet-covering algorithm needs to follow:
1. That each tile is perfectly square. (This is a requirement of the Total Viewshed algorithm.)
2. That each tile overlaps its neighbours. Or in other words, that there are no gaps, on land at least.
3. That each tile is big enough to contain the theoretically longest line of sight of its highest point.

And there are 2 properties to optimise:
1. How well a tile fits its theoretical maximum line of sight. If a tile is bigger than it needs to be, then when it comes to calculating its viewsheds, more RAM and CPU cycles will be used than are necessary.
2. How much the tile overlaps with other tiles. Viewsheds in overlapping regions will be redundantly re-calculated, again wasting RAM and CPU.

Here's how I've implemented it:
1. Create a "lower" resolution version of the global elevation data that for every N degrees (I chose 0.1°, or ~11km at the equator) there's a _sub_-tile that captures the highest point within itself. So it is lower resolution but it hasn't lost any critical data via the typical side effects of interpolation. These subtiles are like an accelerating data structure for all the lookups we'll be doing to find TVS tiles.
2. For each subtile on a popable stack:
    1. Create any TVS tile that fits the highest elevation of all the subtiles it covers.
    2. If the tile overlaps with other tiles discard it and move on to the next subtile.
    3. If the tile doesn't overlap then keep it and remove all the subtiles from the stack that the tile covers.
    4. Repeat this process until no more non-overlapping tiles can be found.
3. Repeat step 2 but allow for overlapping tiles.
4. Once all subtiles are covered, run some cleanup, like removing tiles that are already encompassed by larger tiles.

The only notable optimisation I've added is for step 3. Instead of just automatically adding any overlapping tile, I instead first see if extending an _existing_ nearby TVS tile to cover the uncovered subtile would introduce less new surface area than the new overlapping tile itself. But this introduces an interesting problem: arbitrarily extending an existing tile might make it cover a new elevation that triggers a greater theoretical maximum line of sight, which in turn requires the tile to be extended yet again to ensure all its viewsheds are valid. This is fine for my not-terrible approach, but it adds complexity to the search space when a goal of the algorithm is to optimise for the lowest possible total area of overlaps across the world.

## The Results

<img src="images/world_packed.webp#wide" />

The blue squares in this screenshot are the TVS tiles that we've been talking about. They look distorted towards the poles just because of the [Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection). There's also [an interactive version you can play with here](https://tombh.co.uk/viewview/tile_packing.html) (click on the tiles to see their details). And [the code is here](https://github.com/tombh/viewview).

You can see there are quite a lot of overlaps. And even from a cursory amount of clicking on tile details I can see that there are many tiles that are bigger than they need to be. But I think it's good enough for our needs. Nevertheless I'm curious as to what an _optimal_ packing would look like.

I'm sure it could just be brute forced to find ever improved optimums. There are only a few thousand tiles after all. Though currently my implementation takes about 2 hours to tile the world, which doesn't make brute forcing so approachable. Perhaps you could do some localised gradient descent and then apply the found input variable optimums globally. Ideally though, is there not an elegant and efficient solution? This isn't the first packing problem to exist, I imagine there are similar problems that could inform this one.

I'd love to know about any better approaches, but for now I have something practical to get us onto the next step — actually running all the viewshed calculations for these tiles! You can [follow my progress live on Twitch](https://www.twitch.tv/tom__bh).

_Special thanks to [Ryan Berger](https://ryanberger.me/) for proofreading_.

### Footnotes

1. A quick Internet search suggests that we already know that the longest line of sight is from Mt. Dankova, Kyrgyzstan to Hindu Tagh, China, and is 538km long. See [calgaryvisioncentre.com/news/2017/6/23/tdgft1bsbdlm8496ov7tn73kr0ci1q](https://calgaryvisioncentre.com/news/2017/6/23/tdgft1bsbdlm8496ov7tn73kr0ci1q). But I have not found any evidence for how this is the actual longest and not just the longest found _so far_.
2. I'm currently using [NASA's SRTM3 survey](https://www.earthdata.nasa.gov/data/instruments/srtm) data, that has been cleaned up by Jonathan de Ferranti who has kindly made his work available at [viewfinderpanoramas.org](https://www.viewfinderpanoramas.org).
