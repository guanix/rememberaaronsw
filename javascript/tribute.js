(function($) {
  $(document).ready(function() {
    $('#memories').imagesLoaded(function() {
      $('#memories > li').wookmark({
        container: $('#memories')
      });
    });
  });
})(jQuery);
