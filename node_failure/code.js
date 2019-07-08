
// const COLS = 5;
// const ROWS = 5;

/*

      Ivan's original algorithm

*/

// run_the_algorithm(COLS, ROWS)


function run_the_algorithm(COLS, ROWS, dead_node=""){

    
var data = [];
var data_average_load_seen_by_packet = []
var data_average_load_seen_by_packet_standard_deviation = []

function node() 
    {
        this.west = 1;
        this.north = 1;
        this.east = 1;
        this.south = 1;
        this.value = 0;
        this.path = 0;
        this.closest_origin = 0;
        this.dead = false;
    }

var nodes_original = new Array();
for (var k = 0; k < COLS*ROWS; k++)
{
    nodes_original.push(new node());
    // if(dead_node == k) nodes_original[k].dead = true;
}


// calculate_nodes_original()
display_grid()


// use Dijkstra algorithm to calculate all weights



function display_grid(){

    var i, j;
    for (i = 0; i < COLS; i++) {
      for (j = 0; j < ROWS; j++) {
        data.push( {
          "data": {
            "id": "n-"+i+"-"+j,
            "weight": 0,
            // "label": "non"
          },
          "position": {
            "x": 50+110*i,
            "y": 50+110*j
          },
          "group": "nodes",
          "removed": false,
          "selected": false,
          "selectable": true,
          "locked": false,
          "grabbable": true,
          // if the node is dead, then assign "dead" class which makes the colo red
          "classes": (dead_node==j*COLS+i)?"dead":""
           // "classes": nodes_original[j*COLS+i].dead?"dead":""
        });
      }
    }

    // two for loops for creating edges

    for (i = 0; i < COLS; i++) {
      for (j = 0; j < ROWS; j++) {
          if(j != ROWS-1) { // if the element is not at the last row
          data.push({
            "data": {
              "id": "e-"+i+"-"+j+"--"+i+"-"+(j+1),
              "weight": 1,
              "source": "n-"+i+"-"+j,
              "target": "n-"+i+"-"+(j+1),
              "label": nodes_original[j*COLS+i].south
            },
            "position": {},
            "group": "edges",
            "removed": false,
            "selected": false,
            "selectable": true,
            "locked": true,
            "grabbable": true,
            "classes": "outline"
          });
        }
        else // if the element is  at the last row -- wrap around to the 0th row
        {
          data.push({
            "data": {
              "id": "e-"+i+"-"+j+"--"+i+"-"+0,
              "weight": 1,
              "source": "n-"+i+"-"+j,
              "target": "n-"+i+"-"+0,
              "label": nodes_original[j*COLS+i].south
            },
            "position": {},
            "group": "edges",
            "removed": false,
            "selected": false,
            "selectable": true,
            "locked": true,
            "grabbable": true,
            "classes": "outline unbundled-bezier"
          });
        }


          if(i != COLS-1) { // if the element is not at the last row
          data.push({ 
            "data": {
              "id": "e-"+i+"-"+j+"--"+(i+1)+"-"+j,
              "weight": 1,
              "source": "n-"+i+"-"+j,
              "target": "n-"+(i+1)+"-"+j,
              "label": nodes_original[j*COLS+i].east
            },
            "position": {},
            "group": "edges",
            "removed": false,
            "selected": false,
            "selectable": true,
            "locked": true,
            "grabbable": true,
            "classes": "outline"
          });
        }

        else { // if the element is at the last row -- wrap around
          data.push({ 
            "data": {
              "id": "e-"+i+"-"+j+"--"+0+"-"+j,
              "weight": 1,
              "source": "n-"+i+"-"+j,
              "target": "n-"+0+"-"+j,
              "label": nodes_original[j*COLS+i].east
            },
            "position": {},
            "group": "edges",
            "removed": false,
            "selected": false,
            "selectable": true,
            "locked": true,
            "grabbable": true,
            "classes": "outline unbundled-bezier"
          });
        }
      }
    }

    console.log(data);


    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'preset'
      },

      style: [
            {
            selector: 'node',
            style: {
              'height': 20,
              'width': 20,
              'background-color': '#18e018'
            }
            },

            {
            selector: 'edge',
            style: {
              'curve-style': 'haystack',
              'haystack-radius': 0,
              'width': 5,
              'opacity': 0.5,
              'line-color': '#a2efa2'
            }
            },
            {
            selector: "node[label]",
            style: {
            "label": "data(label)"
            }
            },

            {
            selector: "edge[label]",
            style: {
            'label': "data(label)",
            'width': 3
            }
            },

            {
            selector: ".outline",
            style: {
            'color': "#fff",
            'text-outline-color': "#888",
            'text-outline-width': 3
            }
            },

            {
            selector: ".dead",
            style: {
            'color': "#fff",
            'text-outline-color': "#888",
            'text-outline-width': 3,
            'background-color': '#e01717'
            }
            },

            {
            selector: "edge.unbundled-bezier",
            style: {
              "curve-style": "unbundled-bezier",
              "control-point-distances": 120,
              "control-point-weights": 0.1
            }
            }



      ],

      elements: data
    });


    // delete a dead node
    if(dead_node != "") 
      cy.remove(dead_node);
    // else
    //   cy.remove('n-0-1');

    // highlight the node which we clicked on
    cy.on('tap', 'node', function(evt){
      var node = evt.target;
      // console.log( 'tapped ' + JSON.stringify(node.json()) );
      // console.log( 'tapped ' + JSON.stringify(node.json()) );
      var node_json = JSON.stringify(node.json());
      // console.log(node_json);
      // console.log(node_json["data"]);
      console.log("deleting the node " + node.id());
      // var index_of_weight = node_json.indexOf("id")
      // var dead_node_id = parseInt(node_json.substring(index_of_weight+5, index_of_weight+13));
      
      run_the_algorithm(parseInt(COLS), parseInt(ROWS), "#"+node.id());
    });



    var i, j, radius;
    var m,l;
    var kk, mm, ll, nn, ii;


    // determine how many possible routes we have if we select completely random routs but with min hop count
    cy.$("#n-"+0+"-"+1).json({"data":{"weight":1}});
    cy.$("#n-"+1+"-"+0).json({"data":{"weight":1}});
    cy.$("#n-"+(COLS-1)+"-"+0).json({"data":{"weight":1}});
    cy.$("#n-"+0+"-"+(ROWS-1)).json({"data":{"weight":1}});

    var number_of_routs = 1;
    var final_array_of_paths = [];
    console.log("starting calculating routes from all nodes");
    for(radius = 1 ; radius <= COLS + ROWS; radius++) {
      // for (j = 0; j < ROWS; j++) {
      //   for (i = 0; i < COLS; i++) {


        /*  kk - starting row index 
        mm - ending row index 
        ll - starting column index 
        nn - ending column index 
        ii - iterator 
        */
           

        kk = ll = ii =0;
        mm = ROWS;
        nn = COLS;
        // CLOCK WISE

        while (kk < mm && ll < nn)
        {
            // Print the first row from the remaining rows 
            for (ii = ll; ii < nn; ++ii) 
            { 
              // console.log("#n-"+kk+"-"+ii);
              // number_of_routs = number_of_routs * calculate_routes_from_node(ii, kk, radius, COLS, ROWS, dead_node);
              final_array_of_paths.push(calculate_routes_from_node(ii, kk, radius, COLS, ROWS, dead_node, final_array_of_paths));
            } 
            kk++; 
   
            // Print the last column from the remaining columns  
            for (ii = kk; ii < mm; ++ii) 
            { 
              // console.log("#n-"+ii+"-"+(nn-1));
              // number_of_routs = number_of_routs * calculate_routes_from_node((nn-1), ii, radius, COLS, ROWS, dead_node);
              final_array_of_paths.push(calculate_routes_from_node((nn-1), ii, radius, COLS, ROWS, dead_node, final_array_of_paths));
            } 
            nn--; 
   
            // Print the last row from the remaining rows */ 
            if ( kk < mm) 
            { 
                for (ii = nn-1; ii >= ll; --ii) 
                { 
                  // console.log("#n-"+(mm-1)+"-"+ii);
                  // number_of_routs = number_of_routs * calculate_routes_from_node(ii, (mm-1), radius, COLS, ROWS, dead_node);
                  final_array_of_paths.push(calculate_routes_from_node(ii, (mm-1), radius, COLS, ROWS, dead_node, final_array_of_paths));
                } 
                mm--; 
            } 
   
            // Print the first column from the remaining columns */ 
            if (ll < nn) 
            { 
                for (ii = mm-1; ii >= kk; --ii) 
                { 
                  // console.log("#n-"+ii+"-"+ll);
                  // number_of_routs = number_of_routs * calculate_routes_from_node(ll, ii, radius, COLS, ROWS, dead_node);
                  final_array_of_paths.push(calculate_routes_from_node(ll, ii, radius, COLS, ROWS, dead_node, final_array_of_paths));
                } 
                ll++;     
            }         
        } 

          
      //   } 
      // }
    }

    number_of_routing_tables = 1;
    cy.nodes().forEach(function( ele ){
      // console.log( ele.id("data") );
      if((ele.data('id') == "n-0-0") || (ele.data('id') == "#"+dead_node)) return;
      number_of_routing_tables *= ele.data('weight');
      // console.log("weight for " + ele.data('id') + " is - " + ele.data('weight'));
      // console.log(ele.data('id'));
       // console.log(ele.data('weight'));
    });
    console.log("number of routing tables for this grid - " + number_of_routing_tables);


    // console.log("Number of the possible routes - " + number_of_routs);
    var filtered = final_array_of_paths.filter(function(value, index, arr){

    return value != 1;

    });
     console.log("Final array of routes  ");
     console.log(filtered);
    var x = [];
    var number_of_random_routs = 0;
    // for (var i = 0; i < COLS*ROWS; i++)
    // {
    //   x.push(1);
    // }

    for (var j = 0; j < 10000; j++)
    {
      enumerate_random_paths(filtered, [], 0);
    }

        












    // for(radius = 1 ; radius <= COLS + ROWS; radius++) { // traverse in circles
    //   // radius = 2;
    //   kk = ll= ii =0;
    //   mm = ROWS;
    //   nn = COLS;




    for (j = 0; j < ROWS; j++) {
      for (i = 0; i < COLS; i++) {

        process_node(i, j, radius, COLS, ROWS, dead_node);
      


        /*  kk - starting row index 
        mm - ending row index 
        ll - starting column index 
        nn - ending column index 
        ii - iterator 
        */
           

           // CLOCK WISE
        // while (kk < mm && ll < nn) 
        // {
        //     // Print the first row from the remaining rows 
        //     for (ii = ll; ii < nn; ++ii) 
        //     { 
        //       // console.log("#n-"+kk+"-"+ii);
        //       process_node(ii, kk, radius, COLS, ROWS, dead_node);
        //     } 
        //     kk++; 
   
        //     // Print the last column from the remaining columns  
        //     for (ii = kk; ii < mm; ++ii) 
        //     { 
        //       // console.log("#n-"+ii+"-"+(nn-1));
        //       process_node((nn-1), ii, radius, COLS, ROWS, dead_node);
        //     } 
        //     nn--; 
   
        //     // Print the last row from the remaining rows */ 
        //     if ( kk < mm) 
        //     { 
        //         for (ii = nn-1; ii >= ll; --ii) 
        //         { 
        //           // console.log("#n-"+(mm-1)+"-"+ii);
        //           process_node(ii, (mm-1), radius, COLS, ROWS, dead_node);
        //         } 
        //         mm--; 
        //     } 
   
        //     // Print the first column from the remaining columns */ 
        //     if (ll < nn) 
        //     { 
        //         for (ii = mm-1; ii >= kk; --ii) 
        //         { 
        //           // console.log("#n-"+ii+"-"+ll);
        //           process_node(ll, ii, radius, COLS, ROWS, dead_node);
        //         } 
        //         ll++;     
        //     }         
        // } 

        // COUNTER CLOCK WISE
        // while (kk < mm && ll < nn) 
        // { 

        //     // Print the first column from the remaining columns */ 
        //     if (ll < nn) 
        //     { 
        //         for (ii = kk; ii <= mm-1; ++ii) 
        //         { 
        //            // console.log("#n-"+ii+"-"+ll);
        //           process_node(ll, ii, radius, COLS, ROWS);
        //         } 
        //         ll++;     
        //     }         

        //     // Print the last row from the remaining rows */ 
        //     if ( kk < mm) 
        //     { 
        //         for (ii = ll; ii <= nn-1; ++ii) 
        //         { 
        //           // console.log("#n-"+(mm-1)+"-"+ii);
        //           process_node(ii, (mm-1), radius, COLS, ROWS);
        //         } 
        //         mm--; 
        //     } 


        //     // Print the last column from the remaining columns  
        //     for (ii = mm; ii > kk; --ii) 
        //     { 
        //       // console.log("#n-"+ii+"-"+(nn-1));
        //       process_node((nn-1), ii, radius, COLS, ROWS);
        //     } 
        //     nn--; 

        //     // Print the first row from the remaining rows 
        //     for (ii = nn; ii > ll; --ii) 
        //     { 
        //       // console.log("#n-"+kk+"-"+ii);
        //       process_node(ii, kk, radius, COLS, ROWS);
        //     } 
        //     kk++; 

          // process_node(i, j, radius, COLS, ROWS);
      //   } 
      
      // }
    }

  }


  function enumerate_random_paths(array_of_paths, current_routing_table, level)
  {
    if (level == array_of_paths.length) fully_process_routing_table(current_routing_table);
    else {

      var i = Math.floor((Math.random()*(array_of_paths[level].length-1))+1);
      // for (var i = 1; i < array_of_paths[level].length; i++) {
        var current_routing_table_clone = current_routing_table.slice(0);
        current_routing_table_clone.push(array_of_paths[level][0]); // push the node id of which the path is pushed
        current_routing_table_clone.push(array_of_paths[level][i]); // push the path itself
        enumerate_random_paths(array_of_paths, current_routing_table_clone, level+1);
      // }
    }
  }


  function enumerate_paths(array_of_paths, current_routing_table, level)
  {
    if (level == array_of_paths.length) process_routing_table(current_routing_table);
    else {
      for (var i = 1; i < array_of_paths[level].length; i++) {
        var current_routing_table_clone = current_routing_table.slice(0);
        current_routing_table_clone.push(array_of_paths[level][0]); // push the node id of which the path is pushed
        current_routing_table_clone.push(array_of_paths[level][i]); // push the path itself
        enumerate_paths(array_of_paths, current_routing_table_clone, level+1);
      }
    }
  }

  function process_routing_table(current_routing_table)
  {
    // console.log("New routing table");
    // console.log(current_routing_table);

    // extract the last node
    // 
    console.log("processing a routing table:");
    console.log(current_routing_table);
    var right=0;
    var bot=0;
    var left=0;
    var top=0;
    for (var i = 0; i < current_routing_table.length; i++)
    {
      if (i%2==0) continue; // skip the node IDs
      else
      {
        // extrac the last one
        // console.log("the last element is "+current_routing_table[i][current_routing_table[i].length-2].data("id"));
        // var id = current_routing_table[i][current_routing_table[i].length-2].data("id");
        var id = current_routing_table[i][current_routing_table[i].length-2];
        if(id == "#n-1-0") right++;
        else if (id == "#n-0-1") bot++;
        else if (id == "#n-0-" + (ROWS-1)) top++;
        else if (id == "#n-"+(COLS-1)+"-0") left++;
        else console.log("ERROR!!!");

      }
    }

    // console.log("for this table the maximum load is " + Math.max(right, bot, top, left));
    // x[Math.max(right, bot, top, left)]++;
    x.push(Math.max(right, bot, top, left));
    number_of_random_routs++;

    // console.log("\n");
  }


  function fully_process_routing_table(current_routing_table)
  {
    // console.log("New routing table");
    // console.log(current_routing_table);

    // extract the last node
    // 
    // console.log("FULLY processing a routing table:");
    // console.log(current_routing_table);

    // console.log("Resetting the links loads...");
    cy.edges().forEach(function( ele ){
      // console.log( ele.id("data") );
      ele.json({"data":{"weight":0}});
      // console.log(ele.data('id'));
       // console.log(ele.data('weight'));
    });


    var right=0;
    var bot=0;
    var left=0;
    var top=0;

    // STEP 1: process the routing table for the first time, update the edges weights according to how many messages will go along each link
    for (var i = 0; i < current_routing_table.length; i++)
    {
      if (i%2==0) continue; // skip the node IDs
      else
      {

        for (var j = 1; j < current_routing_table[i].length; j++)
        {
          var current_node_id = current_routing_table[i][j];
          var prev_node_id = current_routing_table[i][j-1];
          var edge_id_1 = "#e-" + extract_i_j_from_id(current_node_id)[0]+"-"+extract_i_j_from_id(current_node_id)[1]+ "--" + extract_i_j_from_id(prev_node_id)[0]+"-"+extract_i_j_from_id(prev_node_id)[1];
          var edge_id_2 = "#e-" + extract_i_j_from_id(prev_node_id)[0]+"-"+extract_i_j_from_id(prev_node_id)[1]+ "--" + extract_i_j_from_id(current_node_id)[0]+"-"+extract_i_j_from_id(current_node_id)[1];
          if (cy.$(edge_id_1).inside())
          {
            var current_weight = cy.$(edge_id_1).data().weight;
            current_weight++;
            cy.$(edge_id_1).json({"data":{"weight":current_weight}});
            cy.$(edge_id_1).json({"data":{"label":current_weight}});
          } 
          else if (cy.$(edge_id_2).inside())
          {
            var current_weight = cy.$(edge_id_2).data().weight;
            current_weight++;
            cy.$(edge_id_2).json({"data":{"weight":current_weight}});
            cy.$(edge_id_2).json({"data":{"label":current_weight}});
          }
          else console.log("ERROR finding edge");
        }
      }
    }



    // STEP 2: process the routing table second time to calculate the average load seen by a message

    for (var i = 0; i < current_routing_table.length; i++)
    {
      if (i%2==0) continue; // skip the node IDs
      else
      {
        var average_load_seen_by_packet = 0;

        for (var j = 1; j < current_routing_table[i].length; j++)
        {
          var current_node_id = current_routing_table[i][j];
          var prev_node_id = current_routing_table[i][j-1];
          var edge_id_1 = "#e-" + extract_i_j_from_id(current_node_id)[0]+"-"+extract_i_j_from_id(current_node_id)[1]+ "--" + extract_i_j_from_id(prev_node_id)[0]+"-"+extract_i_j_from_id(prev_node_id)[1];
          var edge_id_2 = "#e-" + extract_i_j_from_id(prev_node_id)[0]+"-"+extract_i_j_from_id(prev_node_id)[1]+ "--" + extract_i_j_from_id(current_node_id)[0]+"-"+extract_i_j_from_id(current_node_id)[1];

          if (cy.$(edge_id_1).inside())
          {
            average_load_seen_by_packet += cy.$(edge_id_1).data().weight
          } 
          else if (cy.$(edge_id_2).inside())
          {
            average_load_seen_by_packet += cy.$(edge_id_2).data().weight
          }
          else console.log("ERROR finding edge");
        }
        average_load_seen_by_packet = average_load_seen_by_packet / (current_routing_table[i].length-1);
        // console.log("For " + current_routing_table[i-1] + " average_load_seen_by_packet is " + average_load_seen_by_packet);
        data_average_load_seen_by_packet.push(Math.round(average_load_seen_by_packet));
      }
    }

    // find SD for the current routing table
    // find the mean
    var mean_average_load_seen_by_packet = 0;
    for (var i = 0; i < current_routing_table.length/2; i++)
    {
      mean_average_load_seen_by_packet += data_average_load_seen_by_packet[data_average_load_seen_by_packet.length-i-1];
    }
    mean_average_load_seen_by_packet /= (current_routing_table.length/2);
    mean_average_load_seen_by_packet = Math.round(mean_average_load_seen_by_packet);

    var sd_average_load_seen_by_packet = 0;
    for (var i = 0; i < current_routing_table.length/2; i++)
    {
      sd_average_load_seen_by_packet += Math.pow(mean_average_load_seen_by_packet - data_average_load_seen_by_packet[data_average_load_seen_by_packet.length-i-1], 2);
    }

    sd_average_load_seen_by_packet /= (current_routing_table.length/2);
    sd_average_load_seen_by_packet = Math.round(Math.sqrt(sd_average_load_seen_by_packet));

    data_average_load_seen_by_packet_standard_deviation.push(sd_average_load_seen_by_packet);


    x.push(Math.max(right, bot, top, left));
    number_of_random_routs++;


  }


  console.log("\n");
  console.log("FINISHED PROCESSING THE NODES");
  console.log("\n");

    console.log("\nNOW PLOTTING A HISTOGRAM");


      console.log(data_average_load_seen_by_packet_standard_deviation);
        var trace = {
            x: x,
            type: 'histogram',
          };
        var data1 = [trace];

        var trace_average_load_seen_by_packet = {
            x: data_average_load_seen_by_packet,
            type: 'histogram',
          };
        var data2 = [trace_average_load_seen_by_packet];

        
        var trace_average_load_seen_by_packet_standard_deviation = {
            x: data_average_load_seen_by_packet_standard_deviation,
            type: 'histogram',
          };
        var data3 = [trace_average_load_seen_by_packet_standard_deviation];


        var layout = {title: {text:'Worst Link Load'}};
        var layout_average_load_seen_by_packet = {title: {text:'Average Load Seen by a Packet'}};
        var layout_average_load_seen_by_packet_standard_deviation = {title: {text:'Average Load Seen by a Packet (SD)'}};


        //Plotly.newPlot('histogram', data1, layout, {showSendToCloud: true});
        //console.log(data_average_load_seen_by_packet);
        Plotly.newPlot('histogram_average_load_seen_by_packet', data2, layout_average_load_seen_by_packet, {showSendToCloud: true});
        Plotly.newPlot('histogram_average_load_seen_by_packet_standard_deviation', data3, layout_average_load_seen_by_packet_standard_deviation, {showSendToCloud: true});

        // var min = COLS*ROWS;
        // for(var i=0;i<x.length;i++)
        // {
        //   if(x[i]<min) min = x[i];
        // }
        // // console.log("the min load is " + min);

        // var max = COLS*ROWS;
        // for(var i=0;i<x.length;i++)
        // {
        //   if(x[i]>max) max = x[i];
        // }
        // console.log("the max load is " + max);
    


}
}

function calculate_routes_from_node(i, j, radius, COLS, ROWS, dead_node, final_array_of_paths)
{
  var ret = 0;
  var origin = "#n-0-0";
  var destination = "#n-"+i+"-"+j;

  if(destination == dead_node) return 1;
  if(minimum_hop_count_between_nodes(origin, destination) != radius) return 1;
  if (i == 0 && j == 0) return 1;
  

  // remove the nodes which are not in the min hop count
  var removed_nodes = [];
  for (m = 0; m < COLS; m++) {
    for (l = 0; l < ROWS; l++) {
    
      if (m == 0 && l == 0) continue;
      
      var el = "#n-"+m+"-"+l;
      if(el == dead_node) continue;
      
      if((!path_exists_between_nodes(origin, el) || !path_exists_between_nodes(el, destination) || !path_exists_between_nodes(origin, destination)) || (minimum_hop_count_between_nodes(origin, el) + minimum_hop_count_between_nodes(el, destination) > minimum_hop_count_between_nodes(origin, destination))) // the element is not in the subgraph of being in the shortest path between origin and the destination, then remove
      {
        //remove node outside of the subgraph
        removed_nodes.push(cy.remove("#n-"+m+"-"+l));

      }
    }
  }

  // determin how many nodes ar connected to the current node (at most 4)
  // find the indeces of the nodes which should be connected to the current node
  var top_i, top_j, bot_i, bot_j, left_i, left_j, right_i, right_j;

  // left node
  if (i == 0) left_i = COLS - 1;
  else left_i = i-1;

  left_j = j;


  // right node
  if (i == COLS-1) right_i = 0;
  else right_i = i+1;

  right_j = j;

  // node above
  if (j == 0) top_j = ROWS - 1;
  else top_j = j-1;

  top_i = i;

  // node below
  if (j == ROWS - 1) bot_j = 0;
  else bot_j = j+1;

  bot_i = i;


  // if node below exists
  if (cy.$("#n-"+bot_i+"-"+bot_j).inside()) ret = ret + cy.$("#n-"+bot_i+"-"+bot_j).data('weight');

  // if node above exists
  if (cy.$("#n-"+top_i+"-"+top_j).inside()) ret = ret + cy.$("#n-"+top_i+"-"+top_j).data('weight');

  // if node left exists
  if (cy.$("#n-"+left_i+"-"+left_j).inside()) ret = ret + cy.$("#n-"+left_i+"-"+left_j).data('weight');

  // if node right exists
  if (cy.$("#n-"+right_i+"-"+right_j).inside()) ret = ret + cy.$("#n-"+right_i+"-"+right_j).data('weight');

  // plus the current weight which is 0 unless the node is right next to the master
  ret = ret + cy.$("#n-"+i+"-"+j).data('weight');



       var paths_for_current_node = [];


      // function perm(a) {
      //     if (a.length < 2) return [a];
      //     var c, d, b = [];
      //     for (c = 0; c < a.length; c++) {
      //         var e = a.splice(c, 1),
      //             f = perm(a);
      //         for (d = 0; d < f.length; d++) b.push([e].concat(f[d]));
      //         a.splice(c, 0, e[0])
      //     } return b
      // }
       

       // var array_of_paths = [];

      
      // console.log("for " + i + "-" + j);
      // var ar = cy.nodes().toArray();
      // // console.log(perm(ar).join("\n"));

      
      // var ar1 = perm(ar);
      // for (var p = 0; p < ar1.length; p++) {
      //   if (ar1[p][ar1[p].length-1][0].data("id") == cy.$("#n-0-0").data("id") && ar1[p][0][0].data("id") == cy.$("#n-"+i+"-"+j).data("id")  ) paths_for_current_node.push(ar1[p]);
      
      // }

      var global_paths


      function find_paths_dynamic_programming(current_path, final_array_of_paths)
      {

        if(current_path[current_path.length-1] == "#n-0-0"){
          // check the length of the path
          if(current_path.length != radius + 1) return;
          paths_for_current_node.push(current_path);
        }
        else  if(radius < 2){
          var top_p_i, top_p_j, bot_p_i, bot_p_j, left_p_i, left_p_j, right_p_i, right_p_j;
          // console.log(current_path[current_path.length-1].data("id"));
          // var current_i_j = extract_i_j_from_id(current_path[current_path.length-1].data("id"));
          var current_i_j = extract_i_j_from_id(current_path[current_path.length-1]);

          // node above
          if (current_i_j[1] == 0) top_p_j = ROWS - 1;
          else top_p_j = current_i_j[1]-1;
          top_p_i = current_i_j[0];

          // left node
          if (current_i_j[0] == 0) left_p_i = COLS - 1;
          else left_p_i = current_i_j[0]-1;
          left_p_j = current_i_j[1];

          // right node
          if (current_i_j[0] == COLS-1) right_p_i = 0;
          else right_p_i = current_i_j[0]+1;
          right_p_j = current_i_j[1];

          // node below
          if (current_i_j[1] == ROWS - 1) bot_p_j = 0;
          else bot_p_j = current_i_j[1]+1;
          bot_p_i = current_i_j[0];

          // if the element above is in the subgraph
          if(cy.$("#n-"+top_p_i+"-"+top_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, top_p_i, top_p_j)) // if that element was not visited before
            {
              var clone_top = current_path.slice(0);
              // clone_top.push(cy.$("#n-"+top_p_i+"-"+top_p_j));
              clone_top.push("#n-"+top_p_i+"-"+top_p_j);
              find_paths(clone_top, final_array_of_paths);
            }
          }

          // if the element below is in the subgraph
          if(cy.$("#n-"+bot_p_i+"-"+bot_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, bot_p_i, bot_p_j)) // if that element was not visited before
            {
              var clone_bot = current_path.slice(0);
              // clone_bot.push(cy.$("#n-"+bot_p_i+"-"+bot_p_j));
              clone_bot.push("#n-"+bot_p_i+"-"+bot_p_j);
              find_paths(clone_bot, final_array_of_paths);
            }
          }

          // if the element left is in the subgraph
          if(cy.$("#n-"+left_p_i+"-"+left_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, left_p_i, left_p_j))
            {
              var clone_left = current_path.slice(0);
              // clone_left.push(cy.$("#n-"+left_p_i+"-"+left_p_j));
              clone_left.push("#n-"+left_p_i+"-"+left_p_j);
              find_paths(clone_left, final_array_of_paths);
            }
          }

          // if the element right is in the subgraph
          if(cy.$("#n-"+right_p_i+"-"+right_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, right_p_i, right_p_j))
            {
              var clone_right = current_path.slice(0);
              // clone_right.push(cy.$("#n-"+right_p_i+"-"+right_p_j));
              clone_right.push("#n-"+right_p_i+"-"+right_p_j);
              find_paths(clone_right, final_array_of_paths);
            }
          }
      }
      else // if the node is far away from the master - use dynamic programming
      {
        var top_p_i, top_p_j, bot_p_i, bot_p_j, left_p_i, left_p_j, right_p_i, right_p_j;
          // console.log(current_path[current_path.length-1].data("id"));
          // var current_i_j = extract_i_j_from_id(current_path[current_path.length-1].data("id"));
          var current_i_j = extract_i_j_from_id(current_path[current_path.length-1]);

          // node above
          if (current_i_j[1] == 0) top_p_j = ROWS - 1;
          else top_p_j = current_i_j[1]-1;
          top_p_i = current_i_j[0];

          // left node
          if (current_i_j[0] == 0) left_p_i = COLS - 1;
          else left_p_i = current_i_j[0]-1;
          left_p_j = current_i_j[1];

          // right node
          if (current_i_j[0] == COLS-1) right_p_i = 0;
          else right_p_i = current_i_j[0]+1;
          right_p_j = current_i_j[1];

          // node below
          if (current_i_j[1] == ROWS - 1) bot_p_j = 0;
          else bot_p_j = current_i_j[1]+1;
          bot_p_i = current_i_j[0];

          // if the element above is in the subgraph
          if(cy.$("#n-"+top_p_i+"-"+top_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, top_p_i, top_p_j)) // if that element was not visited before
            {
              // var clone_top = current_path.slice(0);
              // clone_top.push(cy.$("#n-"+top_p_i+"-"+top_p_j));
              // clone_top.push("#n-"+top_p_i+"-"+top_p_j);
              // clone all the paths from top_p_i-top_p_j to the paths of the current node
              for(var k = 0; k < final_array_of_paths.length; k++) // find that element in the final array, copy all paths
              {
                if(Array.isArray(final_array_of_paths[k]) && (final_array_of_paths[k][0] == "#n-"+top_p_i+"-"+top_p_j)){
                  for(var l = 1; l < final_array_of_paths[k].length; l++)
                  {
                     var clone_top = final_array_of_paths[k][l].slice(0);
                     clone_top.unshift("#n-"+current_i_j[0]+"-"+current_i_j[1]);
                     paths_for_current_node.push(clone_top);
                    // paths_for_current_node.push(final_array_of_paths[k][l]);
                  }
                  break;
                }
              }
              // paths_for_current_node.push(current_path);
            }
          }

          // if the element below is in the subgraph
          if(cy.$("#n-"+bot_p_i+"-"+bot_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, bot_p_i, bot_p_j)) // if that element was not visited before
            {
              // var clone_bot = current_path.slice(0);
              // clone_bot.push(cy.$("#n-"+bot_p_i+"-"+bot_p_j));
              // clone_bot.push("#n-"+bot_p_i+"-"+bot_p_j);
              for(var k = 0; k < final_array_of_paths.length; k++) // find that element in the final array, copy all paths
              {
                if(Array.isArray(final_array_of_paths[k]) && (final_array_of_paths[k][0] == "#n-"+bot_p_i+"-"+bot_p_j)){
                  for(var l = 1; l < final_array_of_paths[k].length; l++)
                  {
                    var clone_bot = final_array_of_paths[k][l].slice(0);
                    clone_bot.unshift("#n-"+current_i_j[0]+"-"+current_i_j[1]);
                    paths_for_current_node.push(clone_bot);
                  }
                  break;
                }
              }
              // paths_for_current_node.push(current_path);
            }
          }

          // if the element left is in the subgraph
          if(cy.$("#n-"+left_p_i+"-"+left_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, left_p_i, left_p_j))
            {
              // var clone_left = current_path.slice(0);
              // clone_left.push(cy.$("#n-"+left_p_i+"-"+left_p_j));
              // clone_left.push("#n-"+left_p_i+"-"+left_p_j);
              for(var k = 0; k < final_array_of_paths.length; k++) // find that element in the final array, copy all paths
              {
                if(Array.isArray(final_array_of_paths[k]) && (final_array_of_paths[k][0] == "#n-"+left_p_i+"-"+left_p_j)){
                  for(var l = 1; l < final_array_of_paths[k].length; l++)
                  {
                    var clone_left = final_array_of_paths[k][l].slice(0);
                    clone_left.unshift("#n-"+current_i_j[0]+"-"+current_i_j[1]);
                    paths_for_current_node.push(clone_left);
                    // paths_for_current_node.push(final_array_of_paths[k][l]);
                  }
                  break;
                }
              }
              // paths_for_current_node.push(current_path);
            }
          }

          // if the element right is in the subgraph
          if(cy.$("#n-"+right_p_i+"-"+right_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, right_p_i, right_p_j))
            {
              // var clone_right = current_path.slice(0);
              // clone_right.push(cy.$("#n-"+right_p_i+"-"+right_p_j));
              // clone_right.push("#n-"+right_p_i+"-"+right_p_j);
              for(var k = 0; k < final_array_of_paths.length; k++) // find that element in the final array, copy all paths
              {
                if(Array.isArray(final_array_of_paths[k]) && (final_array_of_paths[k][0] == "#n-"+right_p_i+"-"+right_p_j)){
                  for(var l = 1; l < final_array_of_paths[k].length; l++)
                  {
                    var clone_right = final_array_of_paths[k][l].slice(0);
                    clone_right.unshift("#n-"+current_i_j[0]+"-"+current_i_j[1]);
                    paths_for_current_node.push(clone_right);
                    // paths_for_current_node.push(final_array_of_paths[k][l]);
                  }
                  break;
                }
              }
              // paths_for_current_node.push(current_path);
            }
          }
      }
    }


      function find_paths(current_path)
      {
        // console.log(current_path[current_path.length-1].data("id"));
        // if(current_path[current_path.length-1].data("id") == "n-0-0"){ // if we found the Master - finish searching
          if(current_path[current_path.length-1] == "#n-0-0"){
          // check the length of the path
          if(current_path.length != radius + 1) return;
          paths_for_current_node.push(current_path);
        }
        else {
          //get the last element of the path
          // current_path[current_path.length-1].data("id")

          var top_p_i, top_p_j, bot_p_i, bot_p_j, left_p_i, left_p_j, right_p_i, right_p_j;
          // console.log(current_path[current_path.length-1].data("id"));
          // var current_i_j = extract_i_j_from_id(current_path[current_path.length-1].data("id"));
          var current_i_j = extract_i_j_from_id(current_path[current_path.length-1]);

          // node above
          if (current_i_j[1] == 0) top_p_j = ROWS - 1;
          else top_p_j = current_i_j[1]-1;
          top_p_i = current_i_j[0];

          // left node
          if (current_i_j[0] == 0) left_p_i = COLS - 1;
          else left_p_i = current_i_j[0]-1;
          left_p_j = current_i_j[1];

          // right node
          if (current_i_j[0] == COLS-1) right_p_i = 0;
          else right_p_i = current_i_j[0]+1;
          right_p_j = current_i_j[1];

          // node below
          if (current_i_j[1] == ROWS - 1) bot_p_j = 0;
          else bot_p_j = current_i_j[1]+1;
          bot_p_i = current_i_j[0];

          // if the element above is in the subgraph
          if(cy.$("#n-"+top_p_i+"-"+top_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, top_p_i, top_p_j)) // if that element was not visited before
            {
              var clone_top = current_path.slice(0);
              // clone_top.push(cy.$("#n-"+top_p_i+"-"+top_p_j));
              clone_top.push("#n-"+top_p_i+"-"+top_p_j);
              find_paths(clone_top);
            }
          }

          // if the element below is in the subgraph
          if(cy.$("#n-"+bot_p_i+"-"+bot_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, bot_p_i, bot_p_j)) // if that element was not visited before
            {
              var clone_bot = current_path.slice(0);
              // clone_bot.push(cy.$("#n-"+bot_p_i+"-"+bot_p_j));
              clone_bot.push("#n-"+bot_p_i+"-"+bot_p_j);
              find_paths(clone_bot);
            }
          }

          // if the element left is in the subgraph
          if(cy.$("#n-"+left_p_i+"-"+left_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, left_p_i, left_p_j))
            {
              var clone_left = current_path.slice(0);
              // clone_left.push(cy.$("#n-"+left_p_i+"-"+left_p_j));
              clone_left.push("#n-"+left_p_i+"-"+left_p_j);
              find_paths(clone_left);
            }
          }

          // if the element right is in the subgraph
          if(cy.$("#n-"+right_p_i+"-"+right_p_j).inside()) {
            if(!check_if_node_exists_in_path(current_path, right_p_i, right_p_j))
            {
              var clone_right = current_path.slice(0);
              // clone_right.push(cy.$("#n-"+right_p_i+"-"+right_p_j));
              clone_right.push("#n-"+right_p_i+"-"+right_p_j);
              find_paths(clone_right);
            }
          }



        }
      }


        var p = [];
        // p.push(cy.$("#n-"+i+"-"+j));
        console.log("Calculating paths for " + "#n-"+i+"-"+j + "...");
        p.push("#n-"+i+"-"+j);
        // find_paths(p);
        find_paths_dynamic_programming(p, final_array_of_paths);

        
        // print_paths(paths_for_current_node);



      

    

    


      // restore all the deleted elements
      for (k = removed_nodes.length-1; k >= 0; k--) { 
        removed_nodes[k].restore();
      }
    

  //assign the number of paths to this node
  cy.$("#n-"+i+"-"+j).json({"data":{"weight":ret}});
  var node_id = "#n-"+i+"-"+j;
  paths_for_current_node.unshift(node_id);

   return paths_for_current_node;
  // return ret;

}


function print_paths(paths)
{
  var i, j, final_message;
  final_message = "";
  for (i = 0; i < paths.length; i++)
  {
    final_message += "\n";
    for (j = 0; j < paths[i].length; j++){
      // final_message += paths[i][j].data("id") + "  ->  ";
      final_message += paths[i][j] + "  ->  ";
    }
  }
  // console.log(final_message);
}


function process_node(i, j, radius, COLS, ROWS, dead_node)
{
    
      var origin = "#n-0-0";
      var destination = "#n-"+i+"-"+j;

      if(destination == dead_node) return;
      // console.log(destination);
      // console.log(dead_node);
      // if(minimum_hop_count_between_nodes(origin, destination) != radius) return;
      
      
        // i = 7;
        // j=2;
        if (i == 0 && j == 0) return;
        
        var removed_nodes = [];

        for (m = 0; m < COLS; m++) {
          for (l = 0; l < ROWS; l++) {
          
            if (m == 0 && l == 0) continue;

            
            var el = "#n-"+m+"-"+l;
            if(el == dead_node) continue;
            
            if((!path_exists_between_nodes(origin, el) || !path_exists_between_nodes(el, destination) || !path_exists_between_nodes(origin, destination)) || (minimum_hop_count_between_nodes(origin, el) + minimum_hop_count_between_nodes(el, destination) > minimum_hop_count_between_nodes(origin, destination))) // the element is not in the subgraph of being in the shortest path between origin and the destination, then remove
            {
              //remove node outside of the subgraph
              removed_nodes.push(cy.remove("#n-"+m+"-"+l));

            }
          }
        }


        // run astar (origin -> node)
        var aStar2 = cy.elements().aStar({ root: "#n-0-0", goal: "#n-"+i+"-"+j, weight: function(edge){
  return edge.data('weight');
} });
        // update the weights of the graph
        if (!aStar2.found) console.log("ERROR: MINUMUM PATH NOT FOUND");

            // console.log(aStar.path);
            var k;
            // for ( k=0; k<aStar2.path.length; k++ ) {  
            //     if(aStar2.path[k].isEdge()){ 
            //         //chnage the weigth
            //         var current_weight = cy.$("#"+aStar2.path[k].id()).data().weight;
            //         current_weight++;
            //         cy.$("#"+aStar2.path[k].id()).json({"data":{"weight":current_weight}});
            //         cy.$("#"+aStar2.path[k].id()).json({"data":{"label":current_weight}});
            //     }
            // }
        // restore all the deleted elements
        for (k = removed_nodes.length-1; k >= 0; k--) { 
  removed_nodes[k].restore();
  }
}

  function extract_i_j_from_id(id)
  {
    ret = [];
    ret.push(parseInt(id.substring(3, id.lastIndexOf("-")))); // add i
    ret.push(parseInt(id.substring(id.lastIndexOf("-") + 1))); // add j
    return ret;
  }

  function check_if_node_exists_in_path(path, i, j)
  {
    // var found = false;
    var n = 0;
    for(n = 0; n < path.length; n++)
    {
      // if(path[n].data("id") == "n-" + i + "-" + j) return true;
      if(path[n] == "#n-" + i + "-" + j) return true;
    }
    return false;
  }

  function minimum_hop_count_between_nodes(node1, node2) {
    var ret = cy.elements().aStar({ root: node1, goal: node2 }).distance;
    return ret;
    }

    function path_exists_between_nodes(node1, node2) {
      var ret = cy.elements().aStar({ root: node1, goal: node2 }).found;
    return ret;
    }


function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}



