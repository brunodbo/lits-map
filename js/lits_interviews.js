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
        markerTitle = marker.options.title + ', ' + feature.properties.intervieweeTitle + ', ' + feature.properties.locationName,
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
});
