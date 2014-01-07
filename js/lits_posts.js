$(function() {

  'use strict';

  function markerStyle(feature) {
    // feature.properties['marker-symbol'] = 'water';
    feature.properties['marker-color'] = '#7ab86f';

    return true;
  }


  function markerPopup(feature) {
    var popupContent = '<img class="teaser-img" src="' + feature.properties.teaser_img_url + '" />'
      + '<h2>' + feature.properties.title + '</h2>'
      + '<p>' + '<a class="more-link" target="_blank" href="' + ' ' + feature.properties.post_url + '">Read post</a></p>';

      return popupContent;
  }
  
  var posts = L.mapbox.markerLayer().addTo(map);
  posts.loadURL('js/lits_posts_data.json');
  // Create custom popup content and bind popup to marker.
  posts.on('layeradd', function(e) {
    var marker = e.layer,
      feature = marker.feature,
    popupContent = markerPopup(feature);
    marker.bindPopup(popupContent, {
      closeButton: false,
      minWidth: 340
    });
  });

  posts.setFilter(markerStyle);
  
  posts.on('ready', function(e) {
    var markers = [];
    this.eachLayer(function(marker) { 
      markers.push(marker); 
    });
    cycle(markers);
  });

  // Add prev/next navigation to sidebar.
  (function() {
    $('#sidebar-inner').append('<nav id="posts-nav"><ul><li><i id="posts-nav-prev" class="fa fa-arrow-left fa-4x"></i></li><li><i id="posts-nav-next" class="fa fa-arrow-right fa-4x"></i></li></ul><p class="small-note">You can also use the left/right arrow keys.</p></nav>');
  })();

  function cycle(markers) {
    var i = -1;
    function navigate(marker, ease) {
      if (i > markers.length - 1) i = 0; // Looping forward.
      if (i < 0) i = markers.length - 1; // Looping backwards. 
      map.setView(markers[i].getLatLng(), 8);

      // if (!ease) {
        // map.centerzoom(markers[i].getLatLng(), 8);
      // } else {
      //   map.ease.location(markers[i].location).zoom(markers[i].data.properties.zoom||8).optimal(0.5, 1.00);
      // }

      markers[i].openPopup();
    }
    $(document).keydown(function(event) {
      if (event.keyCode == 37) {
        navigate(markers[--i], true);
        $('#posts-nav-prev').addClass('active');
        if ($('#posts-nav-next').hasClass('active')) {
          $('#posts-nav-next').removeClass('active');
        }
      }
      if (event.keyCode == 39) {
        navigate(markers[++i], true);
        $('#posts-nav-next').addClass('active');
        if ($('#posts-nav-prev').hasClass('active')) {
          $('#posts-nav-prev').removeClass('active');
        }
      }
    });
    $('#posts-nav-prev').click(function() {
      navigate(markers[--i], true);
    });
    $('#posts-nav-next').click(function() {
      navigate(markers[++i], true);
    });
  }
});
