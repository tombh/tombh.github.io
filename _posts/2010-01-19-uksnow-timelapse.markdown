---
comments: true
date: 2010-01-19 13:32:05
layout: post
slug: uksnow-timelapse
title: '#uksnow timelapse'
wordpress_id: 119
categories:
- Computing
---

I love snow, it makes everywhere look so beautiful and clean, plus it disrupts all those boring things like work and school. So I also love [Ben Marsh's Twitter mashup](http://uksnow.benmarsh.co.uk) that plots #uksnow tagged tweets onto a map. Watching Ben's map I itched to see the ebb, flow and movement of the tweets across the country, did they form perceivable fronts that reflected the paths of weather systems?

So I did a little research, realised it was within my skill level, and started building. Three days and some late nights later, _et voila_;

[![timelapse_screen](http://www.tombh.co.uk/wordpress/wp-content/uploads/2010/01/timelapse_screen.jpg)](http://uksnow.tombh.co.uk)

<div style="clear: both"></div>

[Go check it out »](http://uksnow.tombh.co.uk)


## The basic recipe
	
* 1 x [Google Maps API](http://code.google.com/apis/maps/documentation/), version 2, client-side.


* 1 x [Google geocoding API](http://code.google.com/apis/maps/articles/phpsqlgeocode.html), server-side.


* 3 x Cron jobs.


* 2 x cached MySQL tables of Twitter search data.


* 1 x helping of jQuery.


## Twitter Search

First pre-heat your Twitter search archive as soon as possible because you can only really search about a week into the past, beyond that tweets become lost to the search engine.

Twitter's search API is dead easy to use, though I must say it took me a while to realise that it didn't need an API key. My number one tip would be to just use the "Advanced search" option on their website to prototype your search and then just copy the resulting URL from your address bar as the working template for your code. Now, in order to overcome their limitation of 100 results per request you're going to need to get the smallest ID from the first result set and pass that as the "max_id" argument to the second query. This way you can "walk" all the way back to the very oldest results that Twitter supplies.

No-one really knows what the quota is for search API requests, though they do say it is generous, I've never hit it anyway.

## Geocoding

So once you've collected a bunch of tweets — I did this through cron jobs (though all the APIs here will work client-side as well) — you'll want to regex for postcodes and get some lat/long co-ordinates through geocoding. Again, Google's geocoding API doesn't actually need an API key, it'll let you just query it anyway, but bear in mind that you have 15,000 requests per day. Here's the PHP function I used;

{% highlight perl %}

function getLatLong($postcode){
  global $geo_delay;

  $request_url = "http://maps.google.co.uk/maps/geo?output=xml&q=" . urlencode($postcode) . "&gl=gb";

  if( FALSE === $xml = @simplexml_load_file($request_url) ) return 'again';

  $status = $xml->Response->Status->code;
  if (strcmp($status, "200") == 0){
    // Successful geocode
    $coordinates = $xml->Response->Placemark->Point->coordinates;
    return split(",", $coordinates);
  }else if( (strcmp($status, "620") == 0) || (strcmp($status, "403") == 0) ){
    // sent geocodes too fast
    $geo_delay += 1000;
    return 'again';
  }else{
    // failure to geocode
    return FALSE;
  }
}

{% endhighlight %}


## **The Google Map**


Getting the map on there is dead easy, all I've got is;

{% highlight js %}

map = new GMap2(document.getElementById("map"));
map.setMapType(G_SATELLITE_MAP);
map.addControl(new GLargeMapControl3D());
map.addControl(new GMapTypeControl());
map.addMapType(G_PHYSICAL_MAP);
map.enableScrollWheelZoom();
map.enableContinuousZoom();
map.setCenter(new GLatLng(54.16243396806781, -3.955078125), 5);

{% endhighlight %}

Then for adding a snowflake I have a little helper function;

{% highlight javascript %}
function createMarker(point, handle, content, score) {

    var icon = new GIcon();
    var marker = new GMarker(point, icon);

    var size = parseInt( (3 * score) + 5);
    var middle = parseInt( size / 2 );
    icon.image = "/images/snow10.png";
    icon.iconSize = new GSize(size, size);
    icon.iconAnchor = new GPoint(middle, middle);
    icon.infoWindowAnchor = new GPoint(5, 1);

    var html = '<img class="profile_pic" src="http://spiurl.appspot.com/' + handle + '" /><div class="tweet_body">' + content + '</div>';
    GEvent.addListener(marker, "click", function(){
        marker.openInfoWindowHtml(html);
    });
    return marker;
}

{% endhighlight %}


And then you simply do this to get a flake on the map;

{% highlight javascript %}

var point = new GPoint(flakes[count]['lng'], flakes[count]['lat']);
var marker = createMarker(point, flakes[count]['handle'], flakes[count]['content'], flakes[count]['score']);
map.addOverlay(marker);

{% endhighlight %}

That flakes[] array is the one that stores all the data that I've been archiving from Twitter searches. It's a JSON encoded MySQL result set. So then all I've done is iterate over the entire array plotting each tweet and removing it once it's 60 mins older than the newest.

## Serving Suggestion

I'm still yet to iron out some performance issues, it seems that there is a bit of stuttering when the map contains 1000+ tweets. Doing some Firebug profiling it looks at first glance to be to do with the way I'm locating rendered flakes using jQuery's CSS selector. Recent webkit browsers certainly fair better here.

Of course the UI is just icing on the cake, but I'd heartily recommend the jQuery UI plugin that gives you very usable sliders out of the box.

Best served with a warm Rioja.