let myArray, zerothArrayItem;
myArray = ["a", 1, "string", 23];
zerothArrayItem = myArray[0];
// zerothArrayItem is now "a"
let newArrayLength, newArray;
newArrayLength = newArray.length;
// newArrayLength is now 4
newArray = myArray.map(function(value) {
  return value + 1;
});
// newArray is ["a1", 2, "string1", 24]









let myObject, myName;
myObject = {
  name: "JavaScript",
};
// Access a property:
myName = myObject.name;
// myName is now "JavaScript";



let myFunction, myReturnValue;
myFunction = function(param1, param2){
  return param1 + " " + param2;
};
myReturnValue = myFunction("JavaScript", "is OK!");
// myReturnValue is now "JavaScript is OK!"




myArray.forEach(function(value, i){
  console.log("index: " + i + ", value: " + value);
});
// "index: 0 value: a"
// "index: 1 value: 1"
// "index: 2 value: string"
// "index: 3 value: 23"



$("#response").html("New <em>HTML</em> text.");
// Changes the value of <div id="response"></div>
let pHtml, theParagraph;
pHtml = $("p").html();
// pHtml is the contents of the first <p></p>.
theParagraph = $(".a-class").html();
// theParagraph is the contents of 
// <p class="a-class"></p>


$("p").click(function(){
  // do something when you click on <p></p>.
});
$.getJSON("some.url.of/file.json", function(obj){
  // obj is the JSON object & you can manipulate it:
  $("p").html(obj.someProperty);
  // change the value of the first <p></p> to the
  // value of someProperty
});

let map, tileLayer, lat, lng, marker, line;
// initialize a map inside <div id="leaflet-map"></div>:
map = L.map("leaflet-map");
// set the tileLayer to a tile url:
tileLayer = L.tileLayer("some.url.of/tiles.png", {
      attribution: "&copy; rights holders",
      subdomains: "abcd",
      maxZoom: 18
});
lat = 40;
lng = -72;
// draw a circleMarker at [40, -72]:
marker = L.circleMarker([lat, lng], {
  radius: 5,
  fillColor: "#00aa00"
}).addTo(map);
// draw a line between the circleMarker and a 
// new point at [42, -74]:
line = L.polyline([[lat, lng], [42, -74]], {
  color: "#aa0000"
}).addTo(map);
// change the radius and fillcolor of marker:
marker.setStyle({radius: 20, fillColor: "#aa0000"});







if (true) {
  console.log("This will always print.");
}







let a, b;
a = 10;
b = "someString";
if (a > 5) {
  console.log("This will print.");
}
if (a <= 5) {
  console.log("This will not print.");
}
if (b === "someString") {
  console.log("This will print.");
}
// set an inverse command with else:
if (b === "someString") {
  console.log("b is equal to 'someString.'");
} else {
  console.log("b is not equal to 'someString.'");
}


myObject = {
  name: "JavaScript",
  favNumbers: [1, 3, 5, 6],
  favGreeting: function(name){
    return "Ahoy, ahoy, " + name + "!";
  }
}
myObject.favNumbers.map(function(i){
  return i + 2;
});
// returns: [3, 5, 7, 8]
myObject.favGreeting("Bhalu");
// returns: "Ahoy, ahoy, Bhalu!"
