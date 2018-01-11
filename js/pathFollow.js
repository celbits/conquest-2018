queue()
    .defer(d3.xml, "js/wiggle.svg", "image/svg+xml")
    .await(ready);

function ready(error, xml) {
    
    //Adding our svg file to HTML document
    var importedNode = document.importNode(xml.documentElement, true);
    d3.select("#pathAnimation").node().appendChild(importedNode);

    var svg = d3.select("svg");

    var path = svg.select("path#wiggle"),
        startPoint = pathStartPoint(path);

    // var marker = svg.append("polygon");

    marker.attr("points", "0 8 15 0 26 20 0 8 0 8")
        .attr("style", "fill:#fc4f02;")
        .attr("transform", "translate(" + startPoint + ")");
    console.log(svg);
    


    //Get path start point for placing marker
    function pathStartPoint(path) {
        console.log(path);
        var d = path.attr("d"),
            dsplitted = d.split(" ");
        return dsplitted[1].split(",");
    }

    function transition() {
        marker.transition()
            .duration(7500)
            .ease("linear")
            .attrTween("transform", translateAlong(path.node()))
            .each("end", transition1); // infinite loop
    }

    function transition1() {
        marker.transition()
            .delay(3000)
            .duration(7500)
            .ease("linear")
            .attrTween("transform", translateAlong(path.node()))
            .each("end", transition1); // infinite loop
    }

    function translateAlong(path) {
        var l = path.getTotalLength();
        return function (i) {
            return function (t) {
                var p = path.getPointAtLength(t * l);
                return "translate(" + (p.x - 25) + "," + (p.y - 20) + ")"; //Move marker
            }
        }
    }
}