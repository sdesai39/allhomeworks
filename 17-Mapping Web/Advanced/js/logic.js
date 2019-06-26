var url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
d3.json(url, function(data) {
    createFeatures(data.features);
});

function createMap(earthquakes) {
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 10,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    var baseMaps= {
        "Dark Map": darkmap
    };

    var overlayMaps = {
        Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
        center: [34.05,-118.24],
        zoom:5,
        layers: [darkmap,earthquakes]
    });

    L.control.layers(baseMaps,overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}

function createFeatures(earthquakeData) {
    function onEachFeature(feature,layer) {
        layer.bindPopup(
            "<h3>Magnitude:<br>"+feature.properties.mag+"</h3><hr><h3>Location:<br>"
            +feature.properties.title
            )
    }
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: function(feature) {
            var mag=feature.properties.mag;
            var r=mag*2;
            if(mag<.5) {
                return {
                    stroke:false,
                    fillColor:"#29EA5D",
                    radius: r,
                    fillOpacity: 1
                };
            }
            else if(mag<1 && mag>=.5) {
                return{
                    stroke:false,
                    fillColor:"#90EA29",
                    radius: r,
                    fillOpacity: 1
                };
            }
            else if(mag<2 && mag>=1) {
                return {
                    stroke: false,
                    fillColor: "#EAE429",
                    radius:r,
                    opacity:1
                };
            }
            else if(mag<4 && mag>=2) {
                return {
                    stroke: false,
                    fillColor: "#EAAA29",
                    radius: r,
                    fillOpacity: 1
                };
            }
            else if(mag>=4) {
                return {
                    stroke: false,
                    fillColor: "red",
                    radius: r,
                    fillOpacity:1
                };
            }
        },
        filter: function(feature,layer) {
            return feature.properties.mag>0;
        }
    })
    createMap(earthquakes)
} 
