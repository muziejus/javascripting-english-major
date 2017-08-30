let md;
md = window.markdownit({html: true}).use(window.markdownitFootnote);
let map, tileLayer;
map = L.map("could-be-map");
tileLayer = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
              attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://carto.com/attribution'>CARTO</a>",
              subdomains: "abcd",
              maxZoom: 18
            }).addTo(map);
map.setView([40.730833, -73.9975], 16);
let couldBeFeatures;
$.getJSON("/could-be.geo.json", function(data){
  let couldBeLayer;
  couldBeFeatures = data.features.map(function(feature){
    return {
      name: feature.properties.name,
      html: feature.properties.html,
      tab: feature.properties.tab,
      mentions: feature.properties.mentions,
      lines: feature.properties.lines,
      wikipedia: feature.properties.wikipedia,
      latLng: L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
    };
  });
  if (document.location.href.match(/[^\/]+$/)[0].match(/be14/) !== null){
    couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
      let popupContent, lines;
      popupContent = "<h4>" + feature.name + "</h4>";
      if (feature.lines.length > 1){
        lines = "lines " + feature.lines.join(" and ");
      } else {
        lines = "line " + feature.lines[0];
      }
      popupContent = popupContent + "<p>" + feature.name + " is mentioned on " + lines + ".<br />";
      popupContent = popupContent + "Read about " + feature.name + " on <a href='"+ feature.wikipedia + "'>Wikipedia</a>.</p>";
      return L.circleMarker(feature.latLng, {
        radius: 10 * Math.sqrt(feature.mentions),
        color: "#d33682",
        fillColor: "#d33682"
        }).bindPopup(popupContent);
      })
    );
  } else {
    couldBeLayer = L.featureGroup(couldBeFeatures.map(function(feature){
      return L.marker(feature.latLng);
      })
    );
  }
  couldBeLayer.addTo(map);
  if (document.location.href.match(/[^\/]+$/)[0].match(/be12/) !== null){
    $.ajax({
      url: "/examples/markdown/hastings-street.md",
      success: function(markdown){
        let html;
        html = md.render(markdown);
        $("#content").html(html);
      }
    });
  }
  if (document.location.href.match(/[^\/]+$/)[0].match(/be13/) !== null){
    ["hastings-street", "eighteenth-and-vine",
      "fifth-and-mound", "introduction",
      "lenox-avenue", "rampart"].forEach(function(tab){
        // Create a variable tab that has the name as a string.
      $.ajax({
        url: "/examples/markdown/" + tab + ".md",
        success: function(markdown){
          let html;
          html = md.render(markdown);
          $("#" + tab).html(html);
        }
      });
    });
  }
  if (document.location.href.match(/[^\/]+$/)[0].match(/be14/) !== null){
    $.ajax({
      url: "/examples/markdown/poem.md",
      success: function(markdown){
        let html;
        html = md.render(markdown);
        $("#poem").html(html);
        console.log(couldBeFeatures);
        console.log("it's in.");
        couldBeFeatures.forEach(function(feature){
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
        });
        $("#poem a").click(function(){
          let tab, latLng;
          tab = $( this ).data("tab");
          $("#tabs-nav a[href='#" + tab + "']").tab("show");
          latLng = couldBeFeatures.filter(function(feature){
            return feature.tab === tab;
          })[0].latLng;
          map.panTo(latLng);
        });
      }
    });
    ["hastings-street", "eighteenth-and-vine",
      "fifth-and-mound", "introduction",
      "lenox-avenue", "rampart"].forEach(function(tab){
      $.ajax({
        url: "/examples/markdown/" + tab + ".md",
        success: function(markdown){
          let html;
          html = md.render(markdown);
          $("#" + tab).html(html);
        }
      });
    });
  }

  map.fitBounds(couldBeLayer.getBounds());
  map.zoomOut(1);
});
