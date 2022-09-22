var jsonTwitterFeed =
    "https://jsonp.afeld.me/?url=https://twitrss.me/twitter_user_to_rss/?user=twombh";

$(document).ready(function() {
    var el = $(".twitter div");

    if (el.length() > 0) {
        $.ajax({
            url: jsonTwitterFeed,
            data: {},
            dataType: "xml",
            timeout: 5000,
            success: function(data) {
                xml = $(data);
                data = xml.find("item");
                var str = "";
                var matches = 0;
                var tweet_date = "";
                var adte = "";
                for (var i = 0; i < 50; i++) {
                    var tweet = $(data[i]);
                    var tweet_text = tweet.find("title").text();
                    if (tweet_text.charAt(0) != "@") {
                        var date_bits = tweet.find("pubDate").text().split(" ");
                        date_bits.splice(-1, 1);
                        tweet_date = date_bits.join(" ");
                        var date = '<span class="post_date">' + tweet_date + "</span>";
                        str += "<li>" + date + replaceURLWithHTMLLinks(tweet_text) +
                            "</li>";
                        matches++;
                        if (matches == 4) break;
                    }
                }
                el.html("<ul>" + str + "</ul>");
            },
            error: function(XHR, textStatus, errorThrown) {
                console.log("Couldn't load tweets");
            },
        });
    }
});

$(document).ready(function() {
    var category = window.location.hash.substr(1);
    showCategory(category);
    $(".category-filter").on("click", function() {
        var category = this.classList[1];
        showCategory(category);
    });
});

function showCategory(category) {
    if (category === "") return;
    $(".archives li").show();
    $(".archives li").hide();
    $(".archives ." + category).show();
    $(".category-title").text(
        category.replace(/-/g, " ").replace(/\b./g, function(m) {
            return m.toUpperCase();
        }),
    );
}

function replaceURLWithHTMLLinks(text) {
    exp = /([a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\/\?\:@\-_=#])+)/g;
    text = text.replace(exp, '<a href="$1" target="_blank">$1</a>');
    exp = /(href=")(?!http)/ig;
    text = text.replace(exp, 'href="http://');
    return text;
}
