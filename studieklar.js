
//fået hjælp af denne hjemmeside til koden: https://codepen.io/genzuby/pen/OYaYrM

// har sat bredde og højde for at få den til at passe til mobil størrelse
var width = 250,
    height = 250;

// har sat størrelsen for ydre og indre radius
var outerRadius = width / 2;
var innerRadius = 80;

// starter med dataen 60%
var data = [60];

//Opretter SVG-elementet i chart-area og centrerer det med en "g" element
var svg = d3.select('.chart-area')
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Baggrundsbue (en fuld cirkel)
var bgArc = d3.arc()
    .innerRadius(innerRadius) //inde radiaus
    .outerRadius(outerRadius) //ydre radius
    .startAngle(0) //startvinkel
    .endAngle(2 * Math.PI); // Full circle

// Tilføjer baggrundsbuen til SVG og definerer dens stil
svg.append("path")
    .attr("d", bgArc)
    .style("stroke-width", 5)
    .attr("fill", "white");

// Bue for den variable procentdel (forgrundsbuen)
var dataArc = d3.arc()
    .innerRadius(innerRadius) //indre radius
    .outerRadius(outerRadius) //ydre radius
    .startAngle(0); //startvinklen, som vil ændres på baggrund af data

// Tilføjer forgrundsbuen til SVG og initialiserer med data
var foreground = svg.append("path")
    .datum({endAngle: (data[0] / 100) * 2 * Math.PI}) // Initial angle
    .attr("d", dataArc)
    .attr("fill", "#FFF387");

// Tilføjer tekst til at vise procentdelen (f.eks. 60)
var percentageText = svg.append("text")
    .attr("fill", "#000") //tekstfarve
    .attr("font-size", "1.3em") // skriftstørrelsen
    .attr("text-anchor", "middle") //centrere teksten
    .attr("y", 8) //justere teksten lodret
    .text(data[0]); //viser den aktuelle procentværdi

// Tilføjer tekst til at vise procenttegnet %
svg.append("text")
    .attr("fill", "#000")
    .attr("font-size", "0.6em")
    .attr("text-anchor", "middle")
    .attr("x", 15)
    .attr("y", 8)
    .text('%');

// Funktion der opdaterer diagrammet med tilfældig procentdel
function updateChart() {
    // Genererer en tilfældig værdi mellem 0 og 100
    var newData = Math.floor(Math.random() * 100); //sat til 100 for at at tallet den genere ikke bliver højere end 100

    // Animerer opdateringen af forgrundsbuen med en overgang
    foreground.transition()
        .duration(750) // Varighed for overgangen (750 ms)
        .attrTween("d", function(d) {
            // Danner flere værdier mellem nuværende og ny slutvinkel
            var interpolate = d3.interpolate(d.endAngle, (newData / 100) * 2 * Math.PI);
            return function(t) {
                d.endAngle = interpolate(t); // Opdaterer slutvinklen
                return dataArc(d); // Opdaterer buen
            };
        });

    // Animerer opdateringen af procentteksten
    percentageText.transition()
        .duration(750) // Varighed for overgangen (750 ms)
        .tween("text", function() {
            // Danner flere værdier mellem nuværende og ny slutvinkel
            var that = d3.select(this),
                i = d3.interpolateNumber(that.text(), newData);
            return function(t) {
                that.text(Math.round(i(t))); // Opdaterer tekstværdien
            };
        });
}

// Tilføjer en event listener til knappen, så updateChart kaldes ved klik
document.getElementById('randomize').addEventListener('click', updateChart);
