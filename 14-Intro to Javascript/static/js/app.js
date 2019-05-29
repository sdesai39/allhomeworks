// from data.js
var tableData = data;
function rowUpload(sighting) {
    var table = d3.select("tbody");
    var row = table.append("tr");
    row.attr("id","sightings")
    row.append("td").text(sighting.datetime);
    row.append("td").text(sighting.city);
    row.append("td").text(sighting.state);
    row.append("td").text(sighting.country);
    row.append("td").text(sighting.shape);
    row.append("td").text(sighting.durationMinutes);
    row.append("td").text(sighting.comments);
}
// YOUR CODE HERE!
var dateinput = d3.select("#datetime");
var datebutton = d3.select("#filter-date");
datebutton.on("click", function () {
    d3.selectAll("#sightings").remove();
    d3.event.preventDefault();
    inputvalue = dateinput.property("value");
    var newdata = [];
    tableData.forEach(function(sighting) {
        if(sighting.datetime == inputvalue) {
            newdata.push(sighting);
        };
    });
    newdata.forEach(rowUpload);
});

var cityinput = d3.select("#city");
var citybutton = d3.select("#filter-city");
citybutton.on("click", function () {
    d3.selectAll("#sightings").remove();
    d3.event.preventDefault();
    inputvalue = cityinput.property("value");
    var newdata = [];
    tableData.forEach(function(sighting) {
        if(sighting.city == inputvalue) {
            newdata.push(sighting);
        };
    });
    newdata.forEach(rowUpload);
});

var stateinput = d3.select("#state");
var statebutton = d3.select("#filter-state");
statebutton.on("click", function () {
    d3.selectAll("#sightings").remove();
    d3.event.preventDefault();
    inputvalue = stateinput.property("value");
    console.log(inputvalue)
    var newdata = [];
    tableData.forEach(function(sighting) {
        if(sighting.state == inputvalue) {
            newdata.push(sighting);
        };
    });
    newdata.forEach(rowUpload);
});

var countryinput = d3.select("#country");
var countrybutton = d3.select("#filter-country");
countrybutton.on("click", function () {
    d3.selectAll("#sightings").remove();
    d3.event.preventDefault();
    inputvalue = countryinput.property("value");
    var newdata = [];
    tableData.forEach(function(sighting) {
        if(sighting.country == inputvalue) {
            newdata.push(sighting);
        };
    });
    newdata.forEach(rowUpload);
});

var shapeinput = d3.select("#shape");
var shapebutton = d3.select("#filter-shape");
shapebutton.on("click", function () {
    d3.selectAll("#sightings").remove();
    d3.event.preventDefault();
    inputvalue = shapeinput.property("value");
    var newdata = [];
    tableData.forEach(function(sighting) {
        if(sighting.shape == inputvalue) {
            newdata.push(sighting);
        };
    });
    newdata.forEach(rowUpload);
});

