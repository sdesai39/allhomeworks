// @TODO: YOUR CODE HERE!

var svgArea = d3.select("#scatter").select("svg");

if (!svgArea.empty()) {
    svgArea.remove();
}

var svgWidth = 920;
var svgHeight = 600;

var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("height",svgHeight)
    .attr("width",svgWidth);
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("assets/data/data.csv").then(function(statedata) {
    statedata.forEach(function(data) {
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;
    })
    var xScale = d3.scaleLinear()
        .domain([0,d3.max(statedata, d=>d.income)])
        .range([0,width]);
    var yScale = d3.scaleLinear()
        .domain([0,d3.max(statedata,d => d.obesity)])
        .range([height,0]);
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    chartGroup.append("g")
        .attr("transform",`translate(0,${height})`)
        .call(xAxis);
        
    chartGroup.append("g")
        .call(yAxis);

    var circlesGroup = chartGroup.selectAll("circle")
        .data(statedata)
        .enter()
        .append("circle")
        .attr("cx",d => xScale(d.income))
        .attr("cy", d => yScale(d.obesity))
        .attr("r","20")
        .attr("opacity","0.75")
        .attr("class","stateCircle");
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (svgHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Obesity (% of Population)");

    chartGroup.append("text")
        .attr("transform", `translate(${svgWidth / 2}, ${height+margin.top-10})`)
        .attr("class", "axisText")
        .text("Median Income ($)");
    chartGroup.selectAll()
        .data(statedata)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.income))
        .attr("y", d => yScale(d.obesity))
        .style("font-size", "13px")
        .style("text-anchor", "middle")
        .style('fill', 'white')
        .text(d => (d.abbr));
    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function (d) {
          return (`${d.state}<br>Income: $${d.income}<br>Obesity: ${d.obesity}% `);
        });
      chartGroup.call(toolTip);
    
    
      circlesGroup.on("mouseover", function (data) {
        toolTip.show(data, this);
      })
        .on("mouseout", function (data) {
          toolTip.hide(data);
        });
})
