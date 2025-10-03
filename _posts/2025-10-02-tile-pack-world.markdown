---
date: 2025-10-02
layout: post
slug: packing-world-lines-of-sight
title: Packing The World For Longest Lines Of Sight
categories:
- Computing
- Code
---

<img src="images/world_packed.webp#wide" />

I have a side project to find the longest line of sight on the planet using a novel [Total Viewshed algorithm](https://github.com/tombh/total-viewsheds). At a resolution of 100m², the planet contains around 4.5 billion elevation samples<a href="#footnotes" class="footnote">1</a>. Now obviously we don't need to calculate the visibility between literally every single one of those, so how do we begin to cut it up? That's what I'll explore in this post.

## Theoretical Longest Lines Of Sight
A _single_ viewshed is just all the things that you can see from any given point. Here is an example from my home country, Wales, looking across a large estuary towards England:

<img src="images/cardiff_viewshed.png#wide" />

Notice how it seems that this viewshed is pretty much completely contained within the screenshot. I say "seems" because what if there's some gigantic off-screen mountain that, even though it's far away, its peak can be seen for hundreds of kilometres all around? The fact is that there is only one way to know whether you've reached the edge of a viewshed — going to the edge of where the Earth curves.

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

<img src="images/tvs_on_hgt.jpg#wide" />

There are 2 heatmaps in the above black and white image. The bigger background one is just a simple representation of the height of the land (and sea) from the Welsh viewshed screenshot above. The whiter the higher. And black is basically just the sea. The smaller central square is quite different, it's a heatmap of the total surface area visible from each point. There are 2 interesting things to note about it. Firstly the higher land in the upper half is mostly black — just because you're in the mountains doesn't mean you can see a lot. You might be in a little ravine, only able to see a few metres all around. Secondly, the bottom right corner, where the sea is, is white — just because you're at sea level doesn't mean you can't see a lot. The ocean is actually a great place to behold greater distances, there's nothing in your way to prevent you glancing even the tiniest islands and furthest ridges.

The size of the Total Viewshed Surface (TVS) tile in the middle is intentional. It is just the right size that every single point in it has enough elevation data (from the background heatmap) that none of the viewsheds are prematurely cut off. The required size of the TVS tile can be calculated using the theoretical longest line of sight formula we previously discussed. The size of the elevation data tile is then just 3 times the size of the TVS tile, to make sure that all the edges of the TVS have enough data.


## Covering The World
If we could calculate the TVS for every part of the planet, at some point we would then also calculate the longest line of sight. Some of you may be thinking, well if your goal is to just find the longest, why calculate them _all_? Indeed, I could just find the largest TVS on the planet and be done with it. The short answer is that I also want to be able to answer questions like, what's the longest line of sight in Wales? Or, from where can you see Africa from Europe? Or indeed, what's the longest line of sight that is actually practically able to be seen due to not suffering from adverse conditions like low oxygen, bad weather, refraction, pollution, etc.

But another reason I can't just take the largest TVS is that it only contains the _theoretical_ longest line of sight. Not only might a peak not have its perfect sibling, but even in the rare case that it did, there could be plenty of terrain in between them that prevents them seeing each other. We would still need to search other tiles until we found a line of sight that was longer than any of the remaining TVSs theoretical maximums.

Whatever my goals, I need to consider how to at least find a not-terrible TVS packing of the world.

It took me a couple of weeks, but I've found one. It's the main image at the start of this post and there's [an interactive version you can play with here](https://tombh.co.uk/viewview/tile_packing.html) (click on the tiles to see their details). And [the code is here](https://github.com/tombh/viewview). The blue squares are the TVS tiles that we've been talking about. They look distorted towards the poles just because of the [Mercator projection](https://en.wikipedia.org/wiki/Mercator_projection).

I think it's good enough for my needs, but I'm curious as to what an _optimal_ packing would look like. Let me outline my approach and maybe you can come up with something better.

1. Create a "lower" resolution version of the global elevation data that for every N (I chose 0.1) degrees creates a subtile that captures the highest point within itself. So it's lower resolution but it hasn't lost any critical data via the conventional side effects of interpolation. These subtiles are like an accelerating data structure for all the lookups we'll be doing to find TVS tiles.
2. For each subtile on a popable stack:
    1. Create a TVS tile that fits the highest elevation of all the subtiles it covers.
    2. If the tile overlaps with any other tiles discard it and move on to the next subtile.
    3. If the tile doesn't overlap then remove all the subtiles from the stack that the tile covers.
    4. Repeat this process until no more non-overlapping tiles can be found.
3. Repeat step 2 but allow for overlapping tiles.
4. Once all subtiles are covered, run some cleanup, like removing tiles that are already encompassed by larger tiles.

The only notable optimisation I've added is for step 3. Instead of just automatically adding any overlapping tile, I instead first see if extending an existing nearby TVS tile to cover the uncovered subtile would introduce less new surface area than the new overlapping tile. But this introduces an interesting problem: arbitrarily extending an existing tile might make it cover an elevation greater than its existing theoretical maximum, which in turn would require it to be extended yet again to ensure that it can be guaranteed to find valid viewsheds. This adds complexity to the search space. And I suspect it will be an obstacle to face in all possible optimisations. But I still think an optimal packing of the world can be found.

There are only 3 rules that an algorithm needs to follow:
1. That each tile is perfectly square.
2. That all tiles overlap. Or in other words, that there are no gaps, on land at least.
3. That each tile is big enough to contain the theoretically longest line of sight of its highest point.

I'd love to explore it further, but for now I have something practical to get us onto the next step — actually running all the viewshed calculations for these tiles! Watch this space.

### Footnotes
1. I'm currently using [NASA's SRTM3 survey](https://www.earthdata.nasa.gov/data/instruments/srtm) data, that has been cleaned up by Jonathan de Ferranti who has kindly made his work available at [viewfinderpanoramas.org](https://www.viewfinderpanoramas.org).
