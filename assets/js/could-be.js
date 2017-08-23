let map, tileLayer;
map = L.map("could-be-map");
tileLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
              attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://carto.com/attribution'>CARTO</a>",
              subdomains: "abcd",
              maxZoom: 18
            }).addTo(map);
map.setView([40.730833, -73.9975], 16);
let couldBeFeatures;
$.getJSON("http://the-javascripting-english-major.org/could-be.geo.json", function(data){
  let couldBeLayer;
  couldBeFeatures = data.features.map(function(feature){
    return {
      name: feature.properties.name,
      div: feature.properties.div,
      mentions: feature.properties.mentions,
      lines: feature.properties.lines,
      wikipedia: feature.properties.wikipedia,
      latLng: L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
    };
  });
  couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
    let popupContent, lines;
    popupContent = "<h4>" + feature.name + "</h4>";
    if (feature.lines.length > 1){
      lines = "lines " + feature.lines.join(" and ");
    } else {
      lines = "line " + feature.lines[0];
    }
    popupContent = popupContent + feature.name + " is mentioned on " + lines + ".<br />";
    popupContent = popupContent + "Read about " + feature.name + " on <a href='"+ feature.wikipedia + "'>Wikipedia</a>.";
    return L.circleMarker(feature.latLng, {
      radius: 10 * Math.sqrt(feature.mentions),
      color: "#d33682",
      fillColor: "#d33682"
      }).bindPopup(popupContent);
    })
  );
  couldBeLayer.addTo(map);
  map.fitBounds(couldBeLayer.getBounds());
  map.zoomOut(1);
});
if (document.location.href.match(/[^\/]+$/)[0].match(/be12/) !== null){
  // Define and assign a Showdown converter.
  let converter;
  converter = new showdown.Converter();
  // Load the Markdown file with jQuery.
  $.ajax({
    url: "/markdown/hastings-street.md",
    success: function(markdown){
      // Convert the Markdown to HTML.
      let html;
      html = converter.makeHtml(markdown);
      // Print the HTML using jQuery.
      $("#content").html(html);
    }
  });
}
if (document.location.href.match(/[^\/]+$/)[0].match(/be13/) !== null){
  let converter;
  converter = new showdown.Converter();
  ["hastings-street", "eighteenth-and-vine",
    "fifth-and-mound", "introduction",
    "lenox-avenue", "rampart"].forEach(function(tab){
      // Create a variable tab that has the name as a string.
    $.ajax({
      // tab + ".md" yields, for example, "rampart.md".
      url: "/markdown/" + tab + ".md",
      success: function(markdown){
        let html;
        html = converter.makeHtml(markdown);
        // "#rampart", for example.
        $("#" + tab).html(html);
      }
    });
  });
}
if (document.location.href.match(/[^\/]+$/)[0].match(/be14/) !== null){
  let converter;
  converter = new showdown.Converter();
  let placesArray;
  placesArray = [
    {text: "Hastings Street", div: "hastings-street", html: "Hastings Street"},
    {text: "Lenox Avenue", div: "lenox-avenue", html: "Lenox Avenue"},
    {text: "18th & Vine", div: "eighteenth-and-vine", html: "18th &amp; Vine"},
    {text: "5th & Mound", div: "fifth-and-mound", html: "5th &amp; Mound"},
    {text: "Rampart", div: "rampart", html: "Rampart"}
  ];
  $.ajax({
    url: "/markdown/poem.md",
    success: function(poem){
      let html = converter.makeHtml(poem);
      $("#poem").html(html);
      placesArray.forEach(function(place){
        $("#poem").html(function(_, oldHtml){
          let regex, newHtml;
          regex = RegExp(place.html, "g");
          newHtml = "<a href='#' data-tab='" + place.div + "'>" + place.html + "</a>";
          return oldHtml.replace(regex, newHtml);
        });
      });
      $("#poem a").click(function(){
        let div, latLng;
        div = $( this ).data("tab");
        $("#tabs-nav a[href='#" + div + "']").tab("show");
        latLng = couldBeFeatures.filter(function(feature){
          return feature.div === div;
        })[0].latLng;
        map.panTo(latLng);
      });
    }
  });
  ["hastings-street", "eighteenth-and-vine",
    "fifth-and-mound", "introduction",
    "lenox-avenue", "rampart"].forEach(function(tab){
      // Create a variable tab that has the name as a string.
    $.ajax({
      // tab + ".md" yields, for example, "rampart.md".
      url: "/markdown/" + tab + ".md",
      success: function(markdown){
        let html;
        html = converter.makeHtml(markdown);
        // "#rampart", for example.
        $("#" + tab).html(html);
      }
    });
  });
}
