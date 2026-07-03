var jsonTwitterFeed =
	"https://jsonp.afeld.me/?url=https://twitrss.me/twitter_user_to_rss/?user=twombh";

$(document).ready(function () {
	var category = window.location.hash.substr(1);
	showCategory(category);
	$(".category-filter").on("click", function () {
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
		category.replace(/-/g, " ").replace(/\b./g, function (m) {
			return m.toUpperCase();
		}),
	);
}

function replaceURLWithHTMLLinks(text) {
	exp = /([a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\/\?\:@\-_=#])+)/g;
	text = text.replace(exp, '<a href="$1" target="_blank">$1</a>');
	exp = /(href=")(?!http)/gi;
	text = text.replace(exp, 'href="http://');
	return text;
}
