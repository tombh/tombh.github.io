require 'rake'
require 'yaml'
require 'fileutils'

# Load the configuration file
# config = YAML.load_file('_config.yml')

# rake post["Post title goes here"]
desc 'Create a post in _posts'
task :post, :title do |_t, args|
  title     = args[:title]
  extension = 'markdown'

  raise 'Please add a title to your post.' if title.nil? || title.empty?

  date     = Time.now.strftime('%Y-%m-%d')
  slug     = title.gsub(/('|!|\?|:|\s\z)/, '').gsub(/\s/, '-').downcase
  filename = "#{date}-#{slug}.#{extension}"
  content  = <<~FRONT_MATTER
    ---
    date: #{date}
    layout: post
    slug: #{slug}
    title: #{title}
    categories:
    - Mill Grist
    ---

  FRONT_MATTER

  raise 'The post already exists.' if File.exist?("_posts/#{filename}")

  File.write("_posts/#{filename}", content)
  puts "#{filename} was created."
end
