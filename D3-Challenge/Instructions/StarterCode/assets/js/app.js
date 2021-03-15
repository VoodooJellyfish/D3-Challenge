// @TODO: YOUR CODE HERE!
//Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  // Append a group area, then set its margins
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from miles-walked-this-month.csv
d3.csv("assets/data/data.csv").then(function(healthData) {

    // Print the milesData
    console.log(healthData);
  
    // Format the date and cast the miles value to a number
    healthData.forEach(function(data) {
      data.smokes = +data.smokes
      data.age = +data.age;
    });
    // scale y to chart height
    var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(healthData, data => data.smokes)]);

    // scale x to chart width
    var xLinearScale = d3.scaleLinear()
    .range([0, chartWidth])
    .domain(d3.extent(healthData, data => data.age));

    // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.selectAll("circle")
    .data(healthData).enter()
    .append("circle")
    .attr("cx", function(data) {return xLinearScale(data.age)})
    .attr("cy", function(data) {return yLinearScale(data.smokes)})
    .attr("r", 10)
    .style("fill", "#69b3a2")

    //circle labels

    chartGroup.selectAll("text")
  .data(healthData).enter()
  .append("text")
  .attr("x", function(data) {return xLinearScale(data.age)-6})
  .attr("y", function(data) {return yLinearScale(data.smokes)})
  .text(function(data) {return data.abbr})
  .attr("font-size", "10px")


    // Append an SVG group element to the SVG area, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

    // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
  .classed("axis", true)
  .attr("transform", "translate(0, " + chartHeight + ")")
  .call(bottomAxis);

//Adding Axis Labels
var axisLabelY = chartHeight / 2;

chartGroup
    .append('g')
    .attr('transform', 'translate(' + 500 + ', ' + chartWidth / 2 + ')')
    .append('text')
    .attr('text-anchor', 'middle')
    .text('Age (Years)');

chartGroup
    .append('g')
    .attr('transform', 'translate(' + -25 + ', ' + axisLabelY + ')')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Percentage of Population that Smokes');


}).catch(function(error) {
console.log(error);
});



