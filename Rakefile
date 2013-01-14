desc 'Create a new memory'
task :new, [:type, :title, :author] do |t, args|
  args.with_defaults(type: "post", title: "a-memory", author: "Family and friends of Aaron")
  type, title, author = args[:type], args[:title], args[:author]
  date = Date.today.strftime("%Y-%m-%d")
  filename = "#{date}-#{title}.md"
  file = File.join("memories", "_posts", filename)
  content = <<-POST
---
author: #{author.gsub('-',' ')}
type: #{type}
date: #{date}
title: #{title.gsub('-',' ')}
layout: default
link: <delete if unneeded>
---
To add an image:

![Image caption](http://path-to-image.jpg)

To add a link:

This is some text. [This is a link](http://aaronsw.com) to a site.
POST

  File.open(file, "w") { |f| f.write content }
  `open #{file}`
end
