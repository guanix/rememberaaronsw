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
      if (window.scrollY + window.innerHeight >= ( document.height - BOTTOM_DISTANCE_LOAD_THRESHOLD ))
        loadMore();
    })

    loadMore();
  });
})(jQuery);
