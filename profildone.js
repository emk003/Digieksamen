
//fået hjælp af denne hjemmeside til koden: https://codepen.io/genzuby/pen/OYaYrM

// har sat bredde og højde
var width = 100,
    height = 100;

// har sat størrelsen for ydre og indre radius
var outerRadius = width / 2;
var innerRadius = 30;

// har dataen 100%, da man har klaret quizzen
var data = [100];
var pie = d3.layout.pie().value(function(d) {
    return d;
});

// Funktion til at beregne slutvinklen for en bue baseret på data. Konverterer procent til en vinkel (radians).
var endAng = function(d) {
    return (d / 100) * Math.PI * 2;
};

// Definerer en baggrundsbue (en komplet cirkel).
var bgArc = d3.svg
    .arc()
    .innerRadius(innerRadius) // Den indre radius af buen (hullets størrelse).
    .outerRadius(outerRadius) // Den ydre radius af buen (buens bredde).
    .startAngle(0) // Startvinklen (begynder ved 0).
    .endAngle(Math.PI * 2); // Slutvinklen (en fuld cirkel, 2 * PI radians).

// Definerer en data-bue, som vil repræsentere den variabel procentdel.
var dataArc = d3.svg
    .arc()
    .innerRadius(innerRadius) // Samme indre radius som baggrundsbuen.
    .outerRadius(outerRadius) // Samme ydre radius som baggrundsbuen.
    .cornerRadius(15) // Giver buen afrundede hjørner.
    .startAngle(0); // Startvinklen for data-buen (begynder ved 0).

// Opretter et SVG-element inde i et område med klassen 'chart-area'.
var svg = d3
    .select('.chart-area') // Vælger HTML-elementet med klassen 'chart-area'.
    .append("svg") // Tilføjer et SVG-element.
    .attr("preserveAspectRatio", "xMinYMin meet") // Bevarer aspektforholdet ved skalering.
    .attr("viewBox", "0 0 100 100") // Definerer synsområdet for SVG.
    .attr("class" ,"shadow") // Tilføjer en klasse 'shadow' til SVG.
    .classed("svg-content", true); // Tilføjer endnu en klasse 'svg-content'.

// Opretter en 'g'-gruppe til hver datapunkt og flytter dem til midten af SVG.
var path = svg
    .selectAll("g") // Vælger alle 'g' elementer (som endnu ikke findes).
    .data(pie(data)) // Binder data til grupperne (her bruges pie layout til data).
    .enter() // Indsætter et nyt 'g' element for hvert datapunkt.
    .append("g") // Tilføjer 'g' elementer.
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); // Flytter dem til midten af SVG.

// Tilføjer baggrundsbuen (en fuld cirkel) for hver datapunkt.
path
    .append("path")
    .attr("d", bgArc) // Tegner baggrundsbuen.
    .style("stroke-width", 5) // Sætter stregbredden til 5.
    .attr("fill", "white"); // Sætter fyldfarven til hvid.

// Tilføjer data-buen, som vil repræsentere procentdelen, og animerer den.
path
    .append("path")
    .attr("fill", "#FFF387") // Fylder data-buen med gul farve.
    .transition() // Tilføjer en overgang (animation).
    .ease("ease-in-out") // Sætter animationsstilen til "ease-in-out".
    .duration(750) // Animationens varighed er 750 ms.
    .attrTween("d", arcTween); // Animerer bueformen over tid (mellem start- og slutvinkel).

// Tilføjer tekst inde i cirklen, som viser procentdelen.
path
    .append("text")
    .attr("fill", "#fff") // Teksten starter med at være hvid.
    .attr("font-size","1.3em") // Sætter skrifttypestørrelsen.
    .attr("tex-anchor", "middle") // Centrerer teksten horisontalt.
    .attr("x", -13) // Flytter teksten lidt mod venstre.
    .attr("y", 8) // Flytter teksten lidt nedad.
    .transition() // Animerer tekstens farveændring.
    .ease("ease-in-out") // Animation med "ease-in-out".
    .duration(750) // Animationens varighed er 750 ms.
    .attr("fill", "#000000") // Ændrer tekstens farve til sort.
    .text(data); // Viser den aktuelle procentdel som tekst.

// Tilføjer et procenttegn ('%') ved siden af teksten.
path.append("text")
    .attr("fill", "#fff") // Teksten starter med at være hvid.
    .attr("class", "ratingtext") // Tilføjer en klasse til teksten for yderligere styling.
    .attr("font-size","0.6em") // Sætter skrifttypestørrelsen.
    .attr("tex-anchor", "middle") // Centrerer teksten horisontalt.
    .attr("x", 10) // Flytter teksten mod højre.
    .attr("y", 8) // Flytter teksten lidt nedad.
    .text('%') // Viser '%' som tekst.
    .transition() // Animerer tekstens farveændring.
    .ease("ease-in-out") // Animation med "ease-in-out".
    .duration(750) // Animationens varighed er 750 ms.
    .attr("fill", "#000000"); // Ændrer tekstens farve til sort.

// Funktion, der animerer buen fra startvinkel til slutvinkel baseret på data.
function arcTween(d) {
    var interpolate = d3.interpolate(d.startAngle, endAng(d.data)); // Interpolation mellem startvinkel og slutvinkel.
    return function(t) {
        d.endAngle = interpolate(t); // Opdaterer slutvinklen over tid.
        return dataArc(d);   // Returnerer den opdaterede bueform.
    };
}