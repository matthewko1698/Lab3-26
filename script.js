var data = d3.json('classData.json').then(function(d){

  initialize(d,0);

})

var changeDay = function(dataset, day){

 console.log("day: "+day)

  var svgwidth = 900;
  var svgheight = 600;


  var data = dataset.map(function(d){

             return d.quizes[day].grade;
  });
  console.log(data);



  var xScale = d3.scaleLinear()
                 // .domain(d3.extent(data))
                 .domain([0,10])
                 .nice()
                 .range([0,width]);

  var binMaker = d3.histogram()
                   .domain(xScale.domain())
                   .thresholds(xScale.ticks(10));

  var bins = binMaker(data);


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

  var percentage = function(d){
    return d.length/data.length;
  }

  var yScale = d3.scaleLinear()
                 .domain([0,d3.max(bins,function(d){return percentage(d);})])
                 .range([height,0])
                 .nice();

  // console.log(bins);

  svg.selectAll("rect")
                  .data(bins)
                  .transition()
                  .duration(1000)
                  .attr("y", function(d){return yScale(percentage(d));})
                  .attr("height", function(d){return height - yScale(percentage(d));});


}

var initialize = function(dataset,day){

  console.log("day: "+day);
  var day2 = day;

  var data = dataset.map(function(d){

             return d.quizes[day].grade;
  });

  console.log(data);

  d3.select('body').selectAll('button').data(dataset[0].quizes)
                .enter().append('button')
                .attr('type','button')
                .text(function(d){
                  return d.day;
                })
                .style('float','right')
                .style('clear','right')
                .style('width','35px')
                .on('click',function(d){

                    if(d.day>30){
                      changeDay(dataset,(d.day-3));
                    }
                    else if(d.day>15){
                      changeDay(dataset,(d.day-2));
                    }
                    else{
                    changeDay(dataset,(d.day-1));
                    }

                });

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

  var barWidth=width/10-1;

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
      .attr("width", barWidth)
      .attr("y", function(d){return yScale(percentage(d));})
      .attr("height", function(d){return height - yScale(percentage(d));})


  var yAxis = d3.axisLeft(yScale);
  svg.append('g').classed('yScale',true)
     .call(yAxis)
     .attr('transform','translate('+(margins.left)+","+margins.top+')')

  var xAxis = d3.axisBottom(xScale);
        svg.append("g").classed("xAxis", true)
        .call(xAxis)
        .attr("transform", "translate("+(margins.left+barWidth/2)+","+(margins.top+height+15)+")");




   }
