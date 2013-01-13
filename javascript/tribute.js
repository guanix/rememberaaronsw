(function($) {
  $(document).ready(function() {
    $('#content').imagesLoaded(function() {
      $('#content li').wookmark({
        container: $('#content')
      });
    });
  });
})(jQuery);
