# Standard library
require 'rake'
require 'yaml'
require 'fileutils'

# Load the configuration file
config = YAML.load_file("_config.yml")

# Set "rake watch" as default task
# task :default => :watch

# rake post["Post title goes here"]
desc "Create a post in _posts"
task :post, :title do |t, args|
  title     = args[:title]
  extension = 'markdown'
  editor    = 'subl'

  if title.nil? or title.empty?
    raise "Please add a title to your post."
  end

  date     = Time.now.strftime("%Y-%m-%d")
  slug     = title.gsub(/(\'|\!|\?|\:|\s\z)/,"").gsub(/\s/,"-").downcase
  filename = "#{date}-#{slug}.#{extension}"
  content  = <<-EOF
---
date: #{date}
layout: post
slug: #{slug}
title: #{title}
categories:
- Mill Grist
---

EOF

  if File.exists?("_posts/#{filename}")
    raise "The post already exists."
  else
    File.write("_posts/#{filename}", content)
    puts "#{filename} was created."

    if editor && !editor.nil?
      sleep 2
      system "#{editor} _posts/#{filename}"
    end
  end
end