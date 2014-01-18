$(function() {

  'use strict';

  function markerStyle(feature) {
    // feature.properties['marker-symbol'] = 'water';
    feature.properties['marker-color'] = '#7ab86f';

    return true;
  }

  function markerPopup(feature) {
    var site_url = 'http://www.lineinthesand.ca/';
    var post_url = site_url + feature.properties.post_url;
    var teaser_img_url = site_url + feature.properties.teaser_img_url;
    var popupContent = '<a target="_blank" href="' + ' ' + post_url + '"><img class="post-img" src="' + teaser_img_url + '" /></a>'
      + '<h2 class="post-title"><a target="_blank" href="' + ' ' + post_url + '">' + feature.properties.title + '</a></h2>'
      + '<p>' + '<a class="more-link" target="_blank" href="' + ' ' + post_url + '">Read post</a></p>';

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
  var postsNav = '<nav id="posts-nav"><ul><li><i id="posts-nav-left" class="fa fa-arrow-left fa-4x"></i></li><li><i id="posts-nav-right" class="fa fa-arrow-right fa-4x"></i></li></ul><p class="small-note">You can also use the left/right arrow keys.</p></nav>';
  (function() {
    $('#sidebar-inner').append(postsNav);
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

      function showPopup() {
        markers[i].openPopup();
      }

      // map.on('moveend', showPopup);
      // map.off('moveend', showPopup);

      // map.on('moveend', function(event) {
      //   showPopup();
      //   // console.log(map);
      //   // this.off('moveend', showPopup);
      //   // this.off(event);
      // });

      map.once('viewreset', function(event) {
        showPopup();
      });

      map.once('moveend', function(event) {
        showPopup();
      });
      
      if ($('#posts-nav-right').hasClass('active')) {
        $('#posts-nav-right').removeClass('active');
      }
      if ($('#posts-nav-left').hasClass('active')) {
        $('#posts-nav-left').removeClass('active');
      }
    }

    // User interaction with this layer.
    // Left arrow goes east (next chronologically), right arrow goes west (previous chronologically).
    $(document).keydown(function(event) {
      if (event.keyCode == 37) {
        navigate(markers[++i], true);
        $('#posts-nav-left').addClass('active');
      }
      if (event.keyCode == 39) {
        navigate(markers[--i], true);
        $('#posts-nav-right').addClass('active');
      }
    });
    $('#posts-nav-left').click(function() {
      navigate(markers[++i], true);
    });
    $('#posts-nav-right').click(function() {
      navigate(markers[--i], true);
    });
  }

  // Add posts layer to layer control.
  layerControl.addOverlay(posts, 'Blog posts');
  map.on('overlayremove', function(event) {
    if (event.name == 'Blog posts') {
      $('#posts-nav').hide();
    }
  })
  map.on('overlayadd', function(event) {
    if (event.name == 'Blog posts') {
      $('#posts-nav').show();
    }
  })
});

