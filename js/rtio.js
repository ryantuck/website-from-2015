// rtio.js

var data = [4,8,15,25,42];

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .style("background-color","#0f2")
    .style("color","black")
    .text(function(d) { return d; });















