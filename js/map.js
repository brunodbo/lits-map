"use strict";

// Set up map.
var mapId = 'brunodbo.gka6ciem';
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
  minZoom: 6,
  maxZoom: 8,
  maxBounds: L.latLngBounds(L.latLng(49.15296, -135.7470), L.latLng(59.9660, -99.3823)),
  keyboard: false
}).setView([54, -116.5], 6);

var baseLayers;
var overlays;

var layerControl = L.control.layers(baseLayers, overlays);
layerControl.setPosition('bottomleft');
layerControl.addTo(map);