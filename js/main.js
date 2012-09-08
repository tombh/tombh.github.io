var jsonTwitterFeed = "http://twitter.com/statuses/user_timeline/twombh.json?count=100&callback=?";

$(document).ready(function() {
    var el = $(".twitter div");

    if(el.length > 0){
        $.ajax({
            url: jsonTwitterFeed,
            data: {},
            dataType: "jsonp",
            callbackParameter: "jsoncallback",
            timeout: 5000,
            success: function(data){
                var str = '';
                var matches = 0;
                var tweet_date = '';
                var adte = '';
                for(var i = 0; i < 50; i++) {
                    if(data[i].text.charAt(0) != '@'){
                        console.log(data[i].created_at);
                        date = data[i].created_at.split(" ");
                        tweet_date = '<span class="post_date">' + date[2] + " " + date[1] + " " + date[5] + '</span>';
                        str += '<li>' + tweet_date + replaceURLWithHTMLLinks(data[i].text) + '</li>';
                        matches++;
                        if(matches == 4) break;
                    }
                }
                el.html("<ul>" + str + "</ul>");
            },
            error: function(XHR, textStatus, errorThrown){
                console.log("Couldn't load tweets");
            }
        });
    }
});

function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1'>$1</a>");
}
      