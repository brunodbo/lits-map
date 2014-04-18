$(function() {

  'use strict';

  // var videoPlayer = function(posterImg, fileWebm) {
  //   var player = '<video width="175" height="175" poster="' + posterImg + '" preload="none"><!-- WebM/VP8 for Firefox4, Opera, and Chrome --><source type="video/webm" src="' + fileWebm + '" /></video>';

  //   return player;
  // }

  var remoteVideoBaseUrl = 'http://vimeo.com/',
      iconDir = 'img/interviews/',
      videoDir = 'video/',
      interviews = L.mapbox.markerLayer().addTo(map);
  interviews.loadURL('js/lits_interviews_data.json');
  // Unbind default Leaflet popup content and set custom icon.
  interviews.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature,
        featureId = feature.properties.id,
        markerId = 'marker-' + featureId,
        playerId = 'player-' + featureId,
        markerTitle = marker.options.title + ', ' + feature.properties.intervieweeTitle + ', interviewed in ' + feature.properties.locationName,
        icon = iconDir + feature.properties.icon,
        videoWebm = videoDir + feature.properties.videoWebm,
        videoMp4 = videoDir + feature.properties.videoMp4;
      // videoPlayer = videoPlayer(feature.properties.posterImg, feature.properties.fileWebm);
    marker.unbindPopup(marker._popup);
    marker.options.title = markerTitle;
    marker.options.riseOnHover = true;
    marker.setIcon(L.divIcon({
      iconSize: [50, 50],
      iconAnchor: [25, 25],
      className: 'marker-wrapper',
      html: '<div id="' + markerId + '" class="marker-inner-wrapper"><img class="interview-thumb interview-marker" src="' + icon + '" /><video id="' + playerId + '" class="interview-video player" width="145" height="145" poster="' + icon + '" preload="auto"><!-- WebM/VP8 for Firefox4, Opera, and Chrome --><source type="video/webm" src="' + videoWebm + '" /><source type="video/mp4" src="' + videoMp4 + '" /></video><i class="fa fa-play"></i></div>'
    }));
  });

  interviews.on('ready', function(e) {
    this.eachLayer(function(marker) {
      var feature = marker.feature,
          featureId = feature.properties.id,
          markerId = 'marker-' + featureId,
          playerId = 'player-' + featureId,
          player = new MediaElementPlayer('#' + playerId, {
            loop: true,
            enableKeyboard: false,
            startVolume: 0
          }),
          vimeoUrl = remoteVideoBaseUrl + feature.properties.vimeoId;

      $('#'+ markerId).mouseenter(function() {
        var markerWrapper = $(this).parent('.marker-wrapper');
        markerWrapper.css('margin-left', -65);
        markerWrapper.css('margin-top', -65);

        $(this).find('.interview-thumb').hide();
        $(this).find('.player').show();
        $(this).find('.fa-play')
          .show()
          .magnificPopup({
            items: {
              src: vimeoUrl
            },
            type: 'iframe'
          });
        player.setCurrentTime(0);
        player.play();
        $(this).mouseleave(function() {
          markerWrapper.css('margin-left', -25);
          markerWrapper.css('margin-top', -25);
          $(this).find('.interview-thumb').show();
          $(this).find('.player').hide();
          $(this).find('.fa-play').hide();
          player.pause();
        });
      });
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

