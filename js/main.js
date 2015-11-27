var jsonTwitterFeed = "/tweets.json";

$(document).ready(function() {
    var el = $(".twitter div");

    if(el.length > 0){
        $.ajax({
            url: jsonTwitterFeed,
            data: {},
            dataType: "json",
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

$(document).ready(function(){
  var category = window.location.hash.substr(1);
  showCategory(category);
  $('.category-filter').on('click', function(){
    var category = this.classList[1];
    showCategory(category);
  });
});

function showCategory(category){
  if(category == '') return;
  $('.archives li').show();
  $('.archives li').hide();
  $('.archives .' + category).show();
  $('.category-title').text(category.replace(/-/g, ' ').replace(/\b./g, function(m){ return m.toUpperCase(); }));
}

function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1'>$1</a>");
}
