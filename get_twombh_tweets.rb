#!/bin/env ruby

require 'yaml'
require 'tweetkit'

TWOMBH_ID = '33468211'.freeze

yaml = YAML.safe_load File.read 'twitter.yaml'

client = Tweetkit::Client.new do |config|
  config.consumer_key        = yaml['API_KEY']
  config.consumer_secret     = yaml['API_KEY_SECRET']
  config.bearer_token = yaml['BEARER']
end

tweets = client.get(
  "users/#{TWOMBH_ID}/tweets?tweet.fields=created_at&max_results=50"
)

count = 0
tweets_html = ''

tweets.response['data'].each do |tweet|
  body = tweet['text']
  next if body.start_with?('@')

  body.gsub!(/(http\S+)/, '<a href="\1">\1</a>')

  date = Date.parse(tweet['created_at'].to_s).strftime '%e %B %Y'
  date_html = "<span class=\"post_date\">#{date}</span>"
  tweets_html += "<li>#{date_html}#{body}</li>"
  count += 1
  break if count > 3
end

tweets_html = "<ul>#{tweets_html}</ul>"

File.write '_includes/tweets.md', tweets_html
