This repository contains the code for a geomap the displays earthquake data for significant earthquakes in the past 30 days. The data is obtained from the United States Geological Survey. The code is written in JavaScript and utilizes Leaflet to include the interactive map on an html page.

The javascript code first obtains the data by accessing the the GeoJSON page: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

The main features that are accessed for graphing from the retrieved data are the earthquakes coordinates, depth, and magnitude.

A circle marker is added on the map using the coordinates of each earthquake.

The attributes of the circle are differentiated to designate different depth and magnitues of the earthquake. The radius of the circle is proportial to its magnitude (larger circles for greater magnitude earthquakes) and the color of the circle is adjusted based on the earthquake's recorded depth. A legend is displayed on the map indicating the depth of the different color representations.

The circles are interactive and can be clicked on to display a popup displaying the features of the selected earthquake. These include the place (a description of the erathquake location), coordinates, magnitude, and depth.
