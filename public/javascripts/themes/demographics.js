let populationChart, outsideStateChart, houseHoldsChart, houseHoldCompositionChart;
let population, outsideStateContent, outsideStateTT, houseHoldsContent, houseHoldsTT, houseHoldCompositionContent, houseHoldCompositionTT;

d3.csv("../data/Demographics/CNA13.csv").then(data => {

  const columnNames = data.columns.slice(2),
    xValue = data.columns[0];
  groupBy = data.columns[0];
  yLabels = ["Population (000s)", "Rate %"];

  const valueData = data.map(d => {
    d.label = d.date;
    d.date = parseYear(d.date);
    for (var i = 0, n = columnNames.length; i < n; i++) {
      d[columnNames[i]] = +d[columnNames[i]];
    }
    return d;
  });

  const types = d3.nest()
    .key(d => {
      return d[groupBy];
    }).entries(valueData);

  const grouping = types.map(d => d.key);

  population = {
    e: "#chart-population",
    ks: grouping,
    xV: "date",
    yV: columnNames[0],
    d: types,
    tX: "Years",
    tY: "Population",
    ySF: "millions"
  };

  populationChart = new MultiLineChart(population);
  populationChart.yLabels = yLabels;
  populationChart.tickNumber = 106;
  populationChart.drawChart();

  // add the tooltip
  populationChart.addTooltip("Year: ", "thousands", "label");
  populationChart.showSelectedLabels([0, 16, 26, 36, 46, 56, 66, 76, 86, 96, 106]);
  // populationChart.showSelectedLabels([0, 16, 26, 36, 41, 46, 51, 56, 61, 69, 71, 76, 81, 86, 92, 96, 101, 106]);

  // d3.select(window).on("resize", function() {
  //   populationChart.drawChart();
  //   populationChart.addTooltip("Year: ", "thousands", "label");
  //   populationChart.showSelectedLabels([0, 16, 26, 36, 41, 46, 51, 56, 61, 69, 71, 76, 81, 86, 92, 96, 101, 106]);
  //
  // });
}).catch(function(error) {
  console.log(error);
});

d3.csv("../data/Demographics/CNA14.csv").then(data => {

  data.forEach(d => {
    d.Dublin = +d.Dublin;
  });
  // const femaleRateBar = new BarChart( data,"#chart-femalespermales", "date", "Dublin", "Year", "Rate");

}).catch(function(error) {
  console.log(error);
});

d3.csv("../data/Demographics/CNA31.csv").then(data => {

  const columnNames = data.columns.slice(2),
    xValue = data.columns[1];
  yLabels = ["Population (000s)"];

  const combinedData = d3.nest()
    .key(function(g) {
      return g.date;
    })
    .rollup(function(v) {
      return {
        state: d3.sum(v, function(g) {
          return g.State;
        }),
        dublin: d3.sum(v, function(g) {
          return g.Dublin;
        })
      };
    })
    .entries(data);
  let array = [];

  combinedData.forEach(d => {
    let obj = {}
    obj.date = d.key;
    obj.Dublin = d.value.dublin;
    obj.State = d.value.state;
    array.push(obj);
  });

  outsideStateContent = {
    e: "#chart-bornOutsideState",
    d: array,
    ks: columnNames,
    xV: xValue,
    tX: "Years",
    tY: "Population",
    ySF: "millions"
  };

  outsideStateTT = {
    title: "Born Outside the State - Year:",
    datelabel: xValue,
    format: "thousands",
  };

  //  for each d in combineData get the key and assign to each d in d.values

  outsideStateChart = new GroupedBarChart(outsideStateContent);
  // outsideStateChart.tickNumber = 1;
  outsideStateChart.drawChart();
  outsideStateChart.addTooltip(outsideStateTT);
  outsideStateChart.showSelectedLabels([0, 2, 4, 6, 8, 10, 12, 14]);

  // d3.select(window).on("resize", function() {
  //   outsideStateChart.drawChart();
  //   outsideStateChart.addTooltip(outsideStateTT);
  // });

}).catch(function(error) {
  console.log(error);
});


d3.csv("../data/Demographics/CNA33.csv").then(data => {
  const columnNames = data.columns.slice(1);
  const xValue = data.columns[0];

  const valueData = data.map(d => {
    for (var i = 0, n = columnNames.length; i < n; i++) {
      d[columnNames[i]] = +d[columnNames[i]];
    }
    return d;
  });
  houseHoldsContent = {
    e: "#chart-households",
    d: valueData,
    ks: columnNames,
    xV: xValue,
    tX: "Years",
    tY: "Number of Households",
    ySF: "millions"
  };

  houseHoldsTT = {
    title: "Number of Households - Year:",
    datelabel: xValue,
    format: "thousands",
  };

  houseHoldsChart = new GroupedBarChart(houseHoldsContent);
  houseHoldsChart.drawChart();
  houseHoldsChart.addTooltip(houseHoldsTT);

  // d3.select(window).on("resize", function() {
  //   // houseHoldsChart.drawChart();
  //   // houseHoldsChart.addTooltip(houseHoldsTT);
  // });



}).catch(function(error) {
  console.log(error);
});


d3.csv("../data/Demographics/CNA29.csv").then(data => {

  const columnNames = data.columns.slice(2);
  const xValue = data.columns[0];

  const valueData = data.map(d => {
    for (var i = 0, n = columnNames.length; i < n; i++) {
      d[columnNames[i]] = +d[columnNames[i]];
    }
    return d;
  });
  houseHoldCompositionContent = {
    e: "#chart-householdComposition",
    d: valueData,
    ks: columnNames,
    xV: xValue,
    tX: "Person per Household",
    tY: "Number of Households",
    ySF: "millions"
  };

  houseHoldCompositionTT = {
    title: "Person per Household:",
    datelabel: xValue,
    format: "thousands",
  };

  houseHoldCompositionChart = new GroupedBarChart(houseHoldCompositionContent);
  houseHoldCompositionChart.drawChart();
  houseHoldCompositionChart.addTooltip(houseHoldCompositionTT);
  houseHoldCompositionChart.hideRate(true);

  // d3.select(window).on("resize", function() {
  //   console.log("Resize");
  //   houseHoldCompositionChart.drawChart();
  //   houseHoldCompositionChart.addTooltip(houseHoldCompositionTT);
  // });

}).catch(function(error) {
  console.log(error);
});