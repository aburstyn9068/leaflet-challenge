// Data URL
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Create a map object
var myMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 2
});
  
// Adding title layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

// Function to give each earthquake point a radius with a ratio to its magnitude
function markerSize(magnitude) {
    return magnitude * 25000;
}

// Function to get color for the circle based on the depth
function getColor(depth) {
    switch (depth) {
        case (depth > 90):
            return '#800026';
        case (depth > 70):
            return '#BD0026';
        case (depth > 50):
            return '#E31A1C';
        case (depth > 30):
            return '#FC4E2A';
        case (depth > 10):
            return '#FD8D3C';
        case (depth > -10):
            return '#FEB24C';
    }
}

d3.json(url).then(function(data) {
    console.log(data);
    console.log("Features:" + data.features);
    
    // Arrays to store the data
    var coordinates = []
    var depth = []
    var magnitude = []
    var place = []

    // Iterate over the data and save the necessary information
    for (var i=0; i<data.features.length; i++) {
        coordinates.push([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]]);
        depth.push(data.features[i].geometry.coordinates[2]);
        magnitude.push(data.features[i].properties.mag);
        place.push(data.features[i].properties.place);
    }
    console.log(coordinates);
    console.log(depth);
    console.log(magnitude);
    console.log(place);

    for (var i=0; i<data.features.length; i++) {
        L.circle(coordinates[i], {
            fillOpacity: 0.75,
            color: getColor(depth[i]),
            fillColor: getColor(depth[i]),   
            // Adjust radius
            radius: markerSize(magnitude[i])
        }).bindPopup("<h2>" + place[i] + "</h2> <hr> <h3>Coordinates: " + coordinates[i][1] + ", " + coordinates[i][0] + "<br> Magnitude: " + magnitude[i] + "<br> Depth: " + depth[i] + "</h3>").addTo(myMap);
    }
  
});