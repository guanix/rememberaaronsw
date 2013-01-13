desc 'Create a new memory'
task :new, :type, :title do |t, args|
  args.with_defaults(type: "post", title: "a-memory")
  type, title = args[:type], args[:title]
  date = Date.today.strftime("%Y-%m-%d")
  filename = "#{date}-#{args[:title]}.md"
  file = File.join("memories", "_posts", filename)
  content = <<-POST
---
author: Family and friends of Aaron
type: #{args[:title]}
date: #{date}
title: #{args[:type]}
layout: default
link: <delete if unneeded>
---
To add an image:

![Image caption](http://path-to-image.jpg)

To add a link:

This is some text. [This is a link](http://aaronsw.com) to a site.
POST

  File.open(file, "w") { |f| f.write content }
end
