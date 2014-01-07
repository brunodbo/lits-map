/* Build GeoJSON object of proposed pipeline route lat/long coordinates, and add it to the map. */
$(function() {

  'use strict';

  // Layer style and popup behaviour.
  var routeColor = '#e44735';
  var routeStyle = {
    'className': 'pipeline',
    'color': routeColor,
    // 'fill': '#eee',
    'weight': 5,
    'opacity': 1,
    // 'dashArray': 10,
    // 'lineCap': 'square',
    'clickable': false
  };
  var popup = L.popup({closeButton: false})
    .setContent('<p>Proposed pipeline route</p>');

  function onEachFeature(feature, layer) {
    // layer.on({
    //   mouseover: addHighlight,
    //   mouseout: removeHighlight
    // });
  }

  function addHighlight(e) {
    var layer = e.target;

    layer.bindPopup(popup).openPopup();
    layer.setStyle({
      opacity: 1,
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToBack();
    }
  }

  function removeHighlight(e) {
    var layer = e.target;

    layer.closePopup();
    layer.setStyle({
      opacity: 0.65,
    });

    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
  }

  var routeLayer = L.geoJson(null, {
    style: routeStyle,
    onEachFeature: onEachFeature
  });

  $.getJSON('js/pipeline_data.json', function(data) {
    var routeGeojson = topojson.feature(data, data.objects.pipeline);
    routeLayer.addData(routeGeojson);
    // $('.pipeline').attr('filter', 'url(#dropshadow)');
  });

  map.addLayer(routeLayer);

});