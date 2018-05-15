// Final version of the “Could Be” Project’s JavaScript.
//
// Note: Because of the specific way that the Project is uploaded to the
// internet, no actual parsing of Markdown is done here. 
//
// Please follow along for this file by viewing the course at
// http://the-javascripting-english-major.org/
//

// Define and assign a Markdown-it renderer.
let md;
md = window.markdownit({html: true}).use(window.markdownitFootnote);

// Leaflet section.
// Define map and baselayer.
let map, tileLayer;
// Initialize map and set its center to Washington Sq. Park.
map = L.map("could-be-map").setView([40.730833, -73.9975], 16);
// Assign the baselayer and add it to the map.
tileLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
              attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://carto.com/attribution'>CARTO</a>",
              subdomains: "abcd",
              maxZoom: 18
            }).addTo(map);
// Acquire geographic GeoJSON data from an async request. The rest of 
// the JavaScript will be callbacks in this function.
$.getJSON("/v1/could-be.geo.json", function(data){
  // Define the markers’s data array and Leaflet layer of 
  // circle markers.
  let couldBeLayer, couldBeFeatures;
  // Iterate over GeoJSON to build a new array of objects. 
  // This avoids the use of L.geoJSON(), which hides the GeoJSON
  // properties deep the layer itself.
  couldBeFeatures = data.features.map(function(feature){
    return {
      name: feature.properties.name,
      html: feature.properties.html,
      tab: feature.properties.tab,
      mentions: feature.properties.mentions,
      lines: feature.properties.lines,
      wikipedia: feature.properties.wikipedia,
      // Recall that GeoJSON presents coordinates as a 
      // [lng, lat] array.
      latLng: L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
    };
  });
  // Generate circle marker layer and assign rich popups.
  couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
    // Create popups.
    let popupContent, lines;
    popupContent = "<h4>" + feature.name + "</h4>";
    if (feature.lines.length > 1){
      lines = "lines " + feature.lines.join(" and ");
    } else {
      lines = "line " + feature.lines[0];
    }
    popupContent = popupContent + "<p>" + feature.name + " is mentioned on " + lines + ".<br />";
    popupContent = popupContent + "Read about " + feature.name + " on <a href='"+ feature.wikipedia + "'>Wikipedia</a>.</p>";
    // Create circle markers.
    return L.circleMarker(feature.latLng, {
      // Use square root because circle areas are proportional to r^2.
      radius: 10 * Math.sqrt(feature.mentions),
      color: "#d33682",
      fillColor: "#d33682"
      }).bindPopup(popupContent);
    })
  ).addTo(map);
  // These two functions rely on couldBeFeatures, and they
  // are defined below.
  loadPoem(couldBeFeatures);
  loadNavTabs(couldBeFeatures);
  map.fitBounds(couldBeLayer.getBounds());
  map.zoomOut(1);
});

// Functions that get called in the GeoJSON callback function

let loadPoem, loadNavTabs;
loadPoem = function(featuresArray){
  $.ajax({
    url: "/examples/markdown/poem.md",
    success: function(markdown){
      let html;
      html = md.render(markdown);
      $("#poem").html(html);
      featuresArray.forEach(function(feature){
        $("#poem").html(function(_, oldHtml){
          let regex, newHtml;
          regex = RegExp(feature.html, "g");
          newHtml = "<a href='#' data-tab='" +
            feature.tab + 
            "' data-lat='" +
            feature.latLng.lat +
            "' data-lng='" +
            feature.latLng.lng +
            "'>" + feature.html + "</a>";
          return oldHtml.replace(regex, newHtml);
        });
        // While looping, make the navigation tabs also cause panning.
        $("#nav-tabs a[href='#" + feature.tab + "']").click(function(){
          map.panTo(feature.latLng);
        });
      });
      $("#poem a").click(function(){
        let tab, lat, lng;
        tab = $( this ).data("tab");
        $("#nav-tabs a[href='#" + tab + "']").tab("show");
        lat = $( this ).data("lat");
        lng = $( this ).data("lng");
        map.panTo([lat, lng]);
      });
    }
  });
};

loadNavTabs = function(featuresArray){
  // Create an array using the tab properties of every object in
  // couldBeFeatures, then add "introduction" to the end of that
  // array.
  featuresArray.map(function(feature){
    return feature.tab;
  }).concat(["introduction"]).forEach(function(tab){
    // Loop through the new array of tab names and "introduction".
      $.ajax({
        url: "/examples/markdown/" + tab + ".md",
        success: function(markdown){
          let html;
          html = md.render(markdown);
          $("#" + tab).html(html);
        }
      });
  });
};
