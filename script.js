var data = d3.json('classData.json').then(function(d){

  initialize(d,0);

})

var changeDay = function(data, day){

  var svgwidth = 900;
  var svgheight = 600;

  var svg = d3.select('svg').attr('width',svgwidth).attr('height',svgheight);
  var margins =
  {
    top:20,
    bottom:50,
    left:50,
    right:100
  }

  var width = svgwidth -margins.left - margins.right;
  var height = svgheight -margins.top - margins.bottom;


  svg.selectAll("rect")
                  .data(data.quizes[day].grade)
                  .transition()
                  .duration(1000)
                  .attr("width", width)
                  .attr("height", function(d){return height;})


}

var initialize = function(dataset,day){

  var data = dataset.map(function(d,day){

             return d.quizes[day].grade;
  });

  var body = d3.select('body');



  var svgwidth = 900;
  var svgheight = 600;

  var svg = d3.select('svg').attr('width',svgwidth).attr('height',svgheight);
  var margins =
  {
    top:20,
    bottom:50,
    left:50,
    right:100
  }

  var width = svgwidth -margins.left - margins.right;
  var height = svgheight -margins.top - margins.bottom;

  var yScale = d3.scaleLinear()
                 .domain([0,50])
                 .range([height,0]);

  var xScale = d3.scaleLinear()
                 // .domain(d3.extent(data))
                 .domain([0,10])
                 .nice()
                 .range([0,width]);


  var binMaker = d3.histogram()
                   .domain(xScale.domain())
                   .thresholds(xScale.ticks(10));

  var bins = binMaker(data);

  var percentage = function(d){
    return d.length/data.length;
  }

  var yScale = d3.scaleLinear()
                 .domain([0,d3.max(bins,function(d){return percentage(d);})])
                 .range([height,0])
                 .nice();

  var plot = svg.append('g').classed('plot',true)
          .attr('transform','translate('+margins.left+","+margins.top+")");

  plot.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", function(d){return xScale(d.x0)+3;})
      .attr("width", function(d){return xScale(d.x1-.1)-xScale(d.x0);})
      .attr("y", function(d){return yScale(percentage(d));})
      .attr("height", function(d){return height - yScale(percentage(d));})

  var yAxis = d3.axisLeft(yScale);
  svg.append('g').classed('yScale',true)
     .call(yAxis)
     .attr('transform','translate('+(margins.left-5)+","+margins.top+')')

  var xAxis = d3.axisBottom(xScale);
        svg.append("g").classed("xAxis", true)
        .call(xAxis)
        .attr("transform", "translate("+(margins.left)+","+(margins.top+height+15)+")")
   }
