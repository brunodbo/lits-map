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
  // minZoom: 6,
  // maxZoom: 6,
  maxBounds: L.latLngBounds(L.latLng(49.15296, -135.7470), L.latLng(59.9660, -99.3823)),
  keyboard: false,
  zoomControl: false
}).setView([54, -123.5], 6);

// Disable zoom.
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
