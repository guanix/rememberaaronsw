(function($) {
  $(document).ready(function() {
    var next = $("a[rel=next]").attr("href"),
        all  = $("a[rel=post]").map(function() { return $(this).attr("href"); });
        BOTTOM_DISTANCE_LOAD_THRESHOLD = 300;


    var bestColumn = function() {
      var best = null;

      $(".column").each(function() {
        if (best == null || $(this).height() < $(best).height())
          best = this;
      });

      return $(best);
    }

    var loaded = [];

    var loadMore = function() {
      if (loaded.indexOf(next) >= 0) {
        return;
      } else {
        // TODO Figure out how to append. again.
        loaded.push(next);
      }

      $(all).each(function() {
        $.get(this).done(function(res) {
          var entry = $("<li/>").css("display", "none").append($(res).find("article"));
          bestColumn().append(entry);
          entry.fadeIn();
        })
      });

      $.get(next).done(function(res) {
        var doc = $(res);
        next = doc.find("a[rel=next]").attr("href");
        all = doc.find("a[rel=post]").map(function() { return $(this).attr("href"); });
      });
    }

    $(document).scroll(function(evt, stuff) {
      if (window.scrollY + window.innerHeight >= ( $(document).height() - BOTTOM_DISTANCE_LOAD_THRESHOLD ))
        loadMore();
    })

    loadMore();
    function resetForm($form) {
      $form.find('input:text, textarea').val('');
    }
    var GithubCredentials = {};

    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
        }
      }
    }

    var authorizeGithub = function() {
      var code = getQueryVariable('code');
      if(code) {
        $('.github-login').css({'display': 'none'});
        $('form').css({'display': 'block'});
        $.ajax({
          type: 'POST',
          url: 'https://github.com/login/oauth/access_token',
          data: JSON.stringify({
            client_id: '74264a1d40eb1333b753',
            client_secret: 'a8a6dd00741f7c69e8990435cde2caf82d4eb20c',
            code: code
          }),
          success: function(dataString) {
            var data = JSON.parse(dataString);
            GithubCredentials.token = data.access_token;
          }
        });
      }
    }
    window.authorizeGithub = authorizeGithub;

    var createPost = function() {
      var filename = $('.filename').val();
      var author = $('.author').val();
      var title = $('.title').val();
      var body = $('.body').val();
      var todayDate = new Date();
      var year = todayDate.getFullYear();
      var day = todayDate.getDate();
      var month= todayDate.getMonth()+1;
      var content = '---\nauthor: '+author+'\ntitle: "'+title+'"\ndate: '+year+'-'+month+'-'+day+'\ntype: post\nlayout: default\n---\n'+body;

      var github = new Github({
        token: GithubCredentials.token,
        auth: "oauth"
      });
      var repo = github.getRepo('rememberaaronsw', 'rememberaaronsw');
      repo.writePullRequest({title: 'New Post', base: 'master'}, 'master', 'memories/_posts/'+year+'-'+month+'-'+day+'-'+filename+'.md', content, 'AutoPost', function(err) {
        if(err) {
          alert("Error!");
        } else {
          alert("Posted!");
          resetForm($('form'));
        }
      });
      return false;
    };
    $('.new-post').submit(createPost);
  });
})(jQuery);
