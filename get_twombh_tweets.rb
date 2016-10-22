#!/bin/env ruby

require 'yaml'
require 'twitter'

yaml = YAML.load File.read 'twitter.yaml'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = yaml['CONSUMER_KEY']
  config.consumer_secret     = yaml['CONSUMER_SECRET']
  config.access_token        = yaml['ACCESS_TOKEN']
  config.access_token_secret = yaml['ACCESS_SECRET']
end

tweets = client.user_timeline(
  {
    count: 50,
    exclude_replies: true,
    include_rts: true
  }
)

# Only show 4 tweets
tweets = tweets[0..3]

tweets_html = ""

tweets.each do |tweet|
  date = Date.parse(tweet.created_at.to_s).strftime "%e %B %Y"
  body = tweet.full_text
  tweet.urls.each do |url|
    short = url.url
    link_html = "<a href=\"#{url.expanded_url}\">#{url.display_url}</a>"
    body = body.gsub short, link_html
  end
  date_html = "<span class=\"post_date\">#{date}</span>"
  tweets_html += "<li>#{date_html}#{body}</li>"
end

tweets_html = "<ul>#{tweets_html}</ul>"

File.write '_includes/tweets.md', tweets_html
