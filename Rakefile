require 'rake'
require 'yaml'
require 'fileutils'

# Load the configuration file
config = YAML.load_file("_config.yml")

# rake post["Post title goes here"]
desc "Create a post in _posts"
task :post, :title do |t, args|
  title     = args[:title]
  extension = 'markdown'

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
	end
end
