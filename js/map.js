"use strict";

// Set up map.
var mapId = 'brunodbo.gka6ciem';
if ($(window).width() < 626) {
  var map = L.mapbox.map('map', mapId).setView([54, -121], 6);
} else {
  var map = L.mapbox.map('map', mapId, {
    layersControl: {
      position: 'bottomleft'
    },
    legendControl: {
      position: 'bottomright'
    },
    attributionControl: {
      position: 'bottomright'
    },
    keyboard: false
  }).setView([54, -116.5], 6);
}

var baseLayers;
var overlays;

var layerControl = L.control.layers(baseLayers, overlays);
layerControl.setPosition('bottomleft');
layerControl.addTo(map);