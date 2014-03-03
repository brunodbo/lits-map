$(function() {

  'use strict';

  var interviews = L.mapbox.markerLayer().addTo(map);
  interviews.loadURL('js/lits_interviews_data.json');
  // Unbind default Leaflet popup content and set custom icon.
  interviews.on('layeradd', function(e) {
    var marker = e.layer,
      feature = marker.feature;
    marker.unbindPopup(marker._popup);
    marker.setIcon(L.divIcon({
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      className: 'marker-wrapper',
      html: '<div class="marker-inner-wrapper"><img class="interview-marker" src="' + feature.properties.iconUrl + '" /><i class="fa fa-play"></i></div>'
    }));
  });

  interviews.on('ready', function(e) {
    var markers = [],
        feature;
    this.eachLayer(function(marker) { 
      markers.push(marker);
      feature = marker.feature;
    });
    cycle(markers);
    $('.marker-wrapper').mouseenter(function() {
      $(this).css('margin-left', -75);
      $(this).css('margin-top', -75);
      $(this).find('.interview-marker').attr('src', feature.properties.iconGifUrl);
      $(this).mouseleave(function() {
        $(this).css('margin-left', -30);
        $(this).css('margin-top', -30);
        $(this).find('.interview-marker').attr('src', feature.properties.iconUrl);
      });
    });
    $('.fa-play').magnificPopup({
      items: {
        src: feature.properties.videoUrl
      },
      type: 'iframe'
    });
  });
  
  // Add prev/next navigation to sidebar.
  var interviewsNav = '<nav id="interviews-nav"><ul><li><i id="interviews-nav-left" class="fa fa-arrow-left fa-4x"></i></li><li><i id="interviews-nav-right" class="fa fa-arrow-right fa-4x"></i></li></ul><p class="small-note">You can also use the left/right arrow keys.</p></nav>';
  (function() {
    $('#sidebar-inner').append(interviewsNav);
  })();

  function cycle(markers) {
    var i = -1;
    function navigate(marker, ease) {
      if (i > markers.length - 1) i = 0; // Looping forward.
      if (i < 0) i = markers.length - 1; // Looping backwards. 
      map.setView(markers[i].getLatLng(), 8);

      function showPopup() {
        markers[i].openPopup();
      }

      map.once('viewreset', function(event) {
        showPopup();
      });

      map.once('moveend', function(event) {
        showPopup();
      });
      
      if ($('#interviews-nav-right').hasClass('active')) {
        $('#interviews-nav-right').removeClass('active');
      }
      if ($('#interviews-nav-left').hasClass('active')) {
        $('#interviews-nav-left').removeClass('active');
      }
    }

    // User interaction with this layer.
    // Left arrow goes east (next chronologically), right arrow goes west (previous chronologically).
    $(document).keydown(function(event) {
      if (event.keyCode == 37) {
        navigate(markers[++i], true);
        $('#interviews-nav-left').addClass('active');
      }
      if (event.keyCode == 39) {
        navigate(markers[--i], true);
        $('#interviews-nav-right').addClass('active');
      }
    });
    $('#interviews-nav-left').click(function() {
      navigate(markers[++i], true);
    });
    $('#interviews-nav-right').click(function() {
      navigate(markers[--i], true);
    });
  }


  // Add interviews layer to layer control.
  layerControl.addOverlay(interviews, 'Interviews');
  map.on('overlayremove', function(event) {
    if (event.name == 'Interviews') {
      $('#interviews-nav').hide();
    }
  })
  map.on('overlayadd', function(event) {
    if (event.name == 'Interviews') {
      $('#interviews-nav').show();
    }
  })
});

