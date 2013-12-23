// Set up map.
var mapId = 'brunodbo.gka6ciem';
if ($(window).width() < 626) {
  var map = L.mapbox.map('map', mapId).setView([54, -121], 6);
} else {
  var map = L.mapbox.map('map', mapId, {
    legendControl: {
      position: 'bottomright'
    },
    attributionControl: {
      position: 'bottomright'
    }
  }).setView([54, -116.5], 6);
}


// Initialize Tabletop: get our spreadsheet data.
// var jqueryNoConflict = jQuery;
// jqueryNoConflict(document).ready(function(){
//   initializeTabletopObject('0AoyLypQrLn3xdHo4cjNpWkhpcDhYYXZ1eElYYWFaUFE');
// });

// Pull data from Google spreadsheet, and push to our startUpLeaflet function.
// function initializeTabletopObject(dataSpreadsheet){
//   Tabletop.init({
//     key: dataSpreadsheet,
//     callback: startUpLeafet,
//     simpleSheet: true,
//     debug: false
//   });
// }

// Get the data from our spreadsheet, and pass it on Leaflet.
// function startUpLeafet(tabletopData) {
//   // Tabletop creates arrays out of our data.
//   // We'll loop through them and create markers for each.
//   for (var num = 0; num < tabletopData.length; num ++) {
//     // Our table columns
//     var dataOne = tabletopData[num].park;

//     // Pull in our lat, long information
//     var dataLat = tabletopData[num].latitude;
//     var dataLong = tabletopData[num].longitude;

//     // Add to our marker
//     marker_location = new L.LatLng(dataLat, dataLong);
//     // Create the marker
//     marker = new L.marker(marker_location, {
//       icon: L.mapbox.marker.icon({
//         'marker-symbol': 'park',
//         // 'marker-size': 'large',
//         'marker-color': '#ff0000'
//       })
//     });
    
//     // Create the popup
//     // Change 'Address', 'City', etc.
//     // To match table column names in your table
//     var popup = "<div class=popup_box" + "id=" + num + ">";
//     popup += "<h4 class='popup_box_header'>" + dataOne + "</h4>";
//     popup += "</div>";
//     // Add to our marker
//     marker.bindPopup(popup);

//     // Add marker to our to map
//     // map.addLayer(marker);
//     marker.addTo(map);
//   }
// };

$(function() {
  var legendContent = $('#legend').html();
  map.legendControl.addLegend(legendContent);
});


// Toggle for 'About this map' and X buttons
// Only visible on mobile
isVisibleDescription = false;
// Grab header, then content of sidebar
sidebarHeader = $('.sidebar_header').html();
sidebarContent = $('.sidebar_content').html();
// Then grab credit information
creditsContent = $('.leaflet-control-attribution').html();
$('.toggle_description').click(function() {
  if (isVisibleDescription === false) {
    $('.description_box_cover').show();
    // Add Sidebar header into our description box
    // And 'Scroll to read more...' text on wide mobile screen
    $('.description_box_header').html(sidebarHeader + '<div id="scroll_more"><strong>Scroll to read more...</strong></div>');
    // Add the rest of our sidebar content, credit information
    $('.description_box_text').html(sidebarContent + '<br />');
    $('#caption_box').html('Credits: ' + creditsContent);
    $('.description_box').show();
    isVisibleDescription = true;
  } else {
    $('.description_box').hide();
    $('.description_box_cover').hide();
    isVisibleDescription = false;
  }
});