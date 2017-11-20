let map, center, tileLayer;
// draw the map in <div id="leaflet-map"></div>:
map = L.map("leaflet-map");
// define the center as [latitude, longitude]:
center = [40, -72];
// set the tileLayer to a tile url:
tileLayer = L.tileLayer("some.url.of/tiles.png", {
      attribution: "&copy; rights holders",
      subdomains: "abcd",
      maxZoom: 18
}).addTo(map);
// now set the view with 9 as the zoom level:
map.setView(center, 9);







let marker, line;
// draw a circleMarker at the center:
marker = L.circleMarker(center, {
  radius: 5,
  fillColor: "#00aa00", // green
  fillOpacity: 0.8 // make it a bit transparent
}).addTo(map);
// draw a line between the circleMarker and a 
// new point at [42, -74]:
line = L.polyline([center, [42, -74]], {
  color: "#aa0000", // red
  weight: 5 // line width in pixels
}).addTo(map);
// change the radius and fillColor of marker:
marker.setStyle({
  radius: 20, 
  fillColor: "#0000aa" // blue
});

