# Remember Aaron Swartz

## How to Contribute

Fork this repository, create a new post in memories (you can just copy an existing one), and send a pull request. When the pull request is accepted, the site will be updated with your memory in about 5 minutes.

If you have rake installed, there is a rake task to create a new memory:

`rake new[type,title,author]`

note: please use '-' to connect words in title and author.

<pre>
| Name   | Description                                        | Default            |
+--------+----------------------------------------------------+--------------------+
| type   | Memory type. Can be one of image, quote, or post.  | post               |
| title  | Title of the memory                                | a-memory           |
| author | Author of the memory                               | family-and-friends |
</pre>

## About

Open source code for the [Remember Aaron Swartz site](http://www.rememberaaronsw.com/).

## Other Uses

Please use this site as a template for creating other rememberance sites. It is really easy to run (just add webserver) and we are actually just running in on Amazon S3. But any vanilla webserver would do a great job of hosting this site.

## Ways to Help

If you would like to help with this site, here are a few things that we haven't been able to get around to:

* JavaScript-based form that creates a pull request on GitHub
* Reddit up-and-down arrows
* Facebook like / Twitter retweet

## Contributors

Friends, family and loved ones of Aaron Swartz.
