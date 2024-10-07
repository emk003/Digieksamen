var width = 250,
    height = 250;

var outerRadius = width / 2;
var innerRadius = 80;

var data = [60]; // Initial data

var svg = d3.select('.chart-area')
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Background arc (full circle)
var bgArc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0)
    .endAngle(2 * Math.PI); // Full circle

svg.append("path")
    .attr("d", bgArc)
    .style("stroke-width", 5)
    .attr("fill", "white");

// Foreground arc (variable percentage)
var dataArc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0);

var foreground = svg.append("path")
    .datum({endAngle: (data[0] / 100) * 2 * Math.PI}) // Initial angle
    .attr("d", dataArc)
    .attr("fill", "#FFF387");

// Text for percentage
var percentageText = svg.append("text")
    .attr("fill", "#000")
    .attr("font-size", "1.3em")
    .attr("text-anchor", "middle")
    .attr("y", 8)
    .text(data[0]);

// Text for the '%' sign
svg.append("text")
    .attr("fill", "#000")
    .attr("font-size", "0.6em")
    .attr("text-anchor", "middle")
    .attr("x", 15)
    .attr("y", 8)
    .text('%');

// Function to update the chart with random data
function updateChart() {
    // Randomize data between 0 and 100
    var newData = Math.floor(Math.random() * 100);

    // Transition the arc path
    foreground.transition()
        .duration(750)
        .attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.endAngle, (newData / 100) * 2 * Math.PI);
            return function(t) {
                d.endAngle = interpolate(t);
                return dataArc(d);
            };
        });

    // Update the text with the new percentage
    percentageText.transition()
        .duration(750)
        .tween("text", function() {
            var that = d3.select(this),
                i = d3.interpolateNumber(that.text(), newData);
            return function(t) {
                that.text(Math.round(i(t)));
            };
        });
}

// Add event listener to the button
document.getElementById('randomize').addEventListener('click', updateChart);
