var createGradient=function(svg, id, color1, color2){

    var defs = svg.append("svg:defs")

    var red_gradient = defs.append("svg:linearGradient")
            .attr("id", id)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "50%")
            .attr("y2", "100%")
            .attr("spreadMethod", "pad");

    red_gradient.append("svg:stop")
            .attr("offset", "50%")
            .attr("stop-color", color1)
            .attr("stop-opacity", 1);

    red_gradient.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", color2)
            .attr("stop-opacity", 1);
};

var percent = 70;
var ratio = percent / 100;
var w=400, h=400;
var outerRadius=(w/2)-10;
var innerRadius=(w/2)-60;
var color = ['#195474','#00AAB8','#F0F0F0', '#0064C2'];

var pie = d3.layout.pie().value(function(d){return d}).sort(null);
var svg=d3.select("#chart").append("svg").attr({width:w, height:h, class:'shadow'}).append('g').attr({transform:'translate('+w/2+','+h/2+')'});

createGradient(svg,'gradient',color[0],color[1]);

var arc=d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(0).endAngle(2*Math.PI);
var arcLine=d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(0);
var pathBackground=svg.append('path').attr({d:arc}).style({fill:color[2]});
var pathChart=svg.append('path').datum({endAngle:0}).attr({d:arcLine}).style({fill:'url(#gradient)'});
var middleCount=svg.append('text').text(function(d){return d;}).attr({class:'middleText', 'text-anchor':'middle', dy:30, dx:-30})
        .style({fill:color[3], 'font-size':'80px'});

    svg.append('text').text('%').attr({dx:30, dy:30}).style({fill:color[3], 'font-size':'80px'});

var arcTween=function(transition, newAngle) {
    transition.attrTween("d", function (d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);
        var interpolateCount = d3.interpolate(0, percent);
        return function (t) {
            d.endAngle = interpolate(t);
            middleCount.text(Math.floor(interpolateCount(t)));
            return arcLine(d);
        };
    });
};

var animate=function(){
    pathChart.transition().duration(750).ease('cubic').call(arcTween,((2*Math.PI))*ratio);
};

setTimeout(animate,0);