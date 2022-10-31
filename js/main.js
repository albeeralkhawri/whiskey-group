var q = queue().defer(d3.json, "whiskey/whiskey_data.json");
q.await(initGraphs);

var data;
var ndx;
var all;

function initData(d, callback) {
  data = d;
  if (typeof callback == "function") {
    callback(data);
  }
}

function initGraphs(error, data) {
  if (error) {
    console.log(error);
  } else {
    initData(data, makeGraphs);
  }
}

function makeGraphs(whiskey_data) {
  ndx = crossfilter(whiskey_data);
  show_barchart(ndx);
  show_datatable(ndx);
  show_piechart1(ndx);
  show_piechart2(ndx);
  show_piechart3(ndx);
  search_bar(ndx);
  selection(ndx);
  count(ndx);

  dc.renderAll();
}

  
// Charts Name & Target


var barChart = dc.barChart("#barchart");
var dataTable = dc.dataTable("#datatable");
var pieChart1 = dc.pieChart("#piechart1");
var pieChart2 = dc.pieChart("#piechart2");
var pieChart3 = dc.pieChart("#piechart3");
var search = dc.textFilterWidget("#search");
var datacount = dc.dataCount("#count_field");

// End Charts Name
  
// Charts Details

function show_barchart(ndx) {
  var dim = ndx.dimension(function(d) {
    return d["Country"];
  });

  var group = dim.group();
  barChart
    .width(550)
    .height(450)
      .title(function(d) {
        return d.key;
      })
    
    .dimension(dim)
    .group(group)
    .on("filtered", chartCallback)
    .margins({ top: 40, right: 40, bottom: 100, left: 40 })
    .xUnits(dc.units.ordinal)
    .x(
      d3.scaleBand().domain(
        data.map(function(d) {
          return d["Country"];
        })
      )
    )

    .renderHorizontalGridLines(true)
    .renderLabel(true)
    .y(d3.scaleLinear().domain([0 ,100]))
    .yAxisLabel("Number Of Whisky",50)
    .title(function(d) {
      return d.key;
    })
    .transitionDuration(1500)
    .renderLabel(true)
    .colors(d3.scaleOrdinal([
      "#fff"
  ])
  )
}
function show_datatable(ndx) {
  var dim = ndx.dimension(function(d) {
    return d["Name"];
  });

  dataTable
    .width(600)
    .height(300)
    .dimension(dim)
    .showGroups(false)
    .size(172)
    .renderLabel(true)
    .group(function(d) {
      return d["Name"];
    })
    .columns([
      {
        label: "Whisky",
        format: function(d) {
          return d["Name"];
        }
      },
      {
        label: "Category",
        format: function(d) {
          return d["Class"];
        }
      },
      {
        label: "Did you know?",
        format: function(d) {
          return (
            d["fun_fact"] +
            '<div class="py-4"> <button class="btn btn-warning btn-sm my-4"><a style="color:white" target="_blank" href="https://www.google.com/search?q= ' +
            d["Name"] +
            '"> Learn more</a> </button></div>'
          );
        }
      },
      {
        label: "Image",
        format: function(d) {
          return '<img width="150" height="150" src="' + d["image"] + '">';
        }
      }
    ])
    .sortBy(function(d) {
      return d["Name"];
    })
    .order(d3.ascending);

  update();
  dataTable.render();
}

function show_piechart1(ndx) {
  var dim = ndx.dimension(function(d) {
    return d["Class"];
  });

  var group = dim.group();

  pieChart1
    .width(300)
    .height(300)
    .radius(150)
    .renderLabel(true)
    .colors(
      d3.scaleOrdinal([
        "#2d95ec",
        "#f6ba2a",
        "#f64d2a",
        "#8abb21",
        "#e2711d",
        "#5c415d"
      ])
    )
    .title(function(d) {
      return "Class: " + d.key;
    })
    .transitionDuration(1500)
    .dimension(dim)
    .group(group)
    .on("filtered", chartCallback)
    .cap(5)
    .legend(
      dc
        .legend()
        .x(550)
        .y(5)
        .itemHeight(12)
        .gap(5)
    );
}

function show_piechart2(ndx) {
  var dim = ndx.dimension(function(d) {
    return d["Country"];
  });

  var group = dim.group().reduceCount(function(d) {
    return d.value;
  });

  pieChart2
    .width(300)
    .height(300)
    .radius(150)
    .renderLabel(true)
    .colors(
     d3.scaleOrdinal([
        "#2d95ec",
        "#f6ba2a",
        "#f64d2a",
        "#8abb21",
        "#e2711d",
        "#5c415d"
      ])
    )
    .title(function(d) {
      return d.key;
    })
    .transitionDuration(1500)
    .dimension(dim)
    .group(group)
    .on("filtered", chartCallback)
    .cap(5)
    .legend(
      dc
        .legend()
        .x(550)
        .y(5)
        .itemHeight(12)
        .gap(5)
    );
}

function show_piechart3(ndx) {
  var dim = ndx.dimension(function(d) {
    return d["Type"];
  });

  var group = dim.group().reduceCount(function(d) {
    return d.value;
  });

  pieChart3
    .width(300)
    .height(300)
    .radius(150)
    .renderLabel(true)
    .colors(
      d3.scaleOrdinal([
          "#2d95ec",
          "#f6ba2a",
          "#f64d2a",
          "#8abb21",
          "#e2711d",
          "#5c415d"
      ])
    )
    .title(function(d) {
      return "Type: " + d.key;
    })
    .transitionDuration(1500)
    .dimension(dim)
    .group(group)
    .on("filtered", chartCallback)
    .cap(5)
    .legend(
      dc
        .legend()
        .x(550)
        .y(5)
        .itemHeight(12)
        .gap(5)
    );
}


// End Charts Details
 
// Filters fix we have no filters yat

function search_bar(ndx) {
  var dim = ndx.dimension(function(d) {
    return d["Country"];
  });

  search.dimension(dim);
}

function selection(ndx) {
  var dim = ndx.dimension(function(d) {
    return d["Name"];
  });

  var group = dim.group().reduceCount(function(d) {
    return d.value;
  });

  var selection = dc
    .selectMenu("#select-whisky-type")
    .dimension(dim)
    .group(group)
    .on("filtered", chartCallback);
  selection.title(function(d) {
    return d.key;
  });
}

function count(ndx) {
  all = ndx.groupAll();
  datacount
    .dimension(ndx)
    .group(all)
    .html({
      some:
        "<strong>%filter-count</strong> selected out of <strong>%total-count</strong> records" +
        " <a class='btn-sm bg-warning' href='javascript:dc.filterAll(); dc.renderAll();'>Reset All</a>",
      all: "All records selected. Please click on the graphs to apply filters."
    });
}

   
// End Filters
   
//Pagination

var ofs = 0,
  pag = 3;

function display() {
  d3.select("#begin").text(ofs + 1);
  d3.select("#end").text(ofs + pag);
  d3.select("#previous").attr("disabled", ofs - pag < 0 ? "true" : null);
}

function update() {
  dataTable.beginSlice(ofs);
  dataTable.endSlice(ofs + pag);
  display();
}

function next() {
  if (ofs + pag < Math.ceil(ndx.allFiltered().length / 5) * 5) {
    ofs += pag;
    update();
    dataTable.redraw();
  }
}
function last() {
  ofs -= pag;
  update();
  dataTable.redraw();
}

function reset() {
  ofs = 0;
  update();
  dataTable.redraw();
}

function chartCallback() {
  reset();
}
