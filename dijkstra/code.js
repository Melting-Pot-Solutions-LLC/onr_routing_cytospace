
// const COLS = 5;
// const ROWS = 5;

/*

      Ivan's original algorithm

*/

// run_the_algorithm(COLS, ROWS)


function run_the_algorithm(COLS, ROWS, dead_node=""){

    
var data = [];

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
              number_of_routs = number_of_routs * calculate_routes_from_node(ii, kk, radius, COLS, ROWS, dead_node);
            } 
            kk++; 
   
            // Print the last column from the remaining columns  
            for (ii = kk; ii < mm; ++ii) 
            { 
              // console.log("#n-"+ii+"-"+(nn-1));
              number_of_routs = number_of_routs * calculate_routes_from_node((nn-1), ii, radius, COLS, ROWS, dead_node);
            } 
            nn--; 
   
            // Print the last row from the remaining rows */ 
            if ( kk < mm) 
            { 
                for (ii = nn-1; ii >= ll; --ii) 
                { 
                  // console.log("#n-"+(mm-1)+"-"+ii);
                  number_of_routs = number_of_routs * calculate_routes_from_node(ii, (mm-1), radius, COLS, ROWS, dead_node);
                } 
                mm--; 
            } 
   
            // Print the first column from the remaining columns */ 
            if (ll < nn) 
            { 
                for (ii = mm-1; ii >= kk; --ii) 
                { 
                  // console.log("#n-"+ii+"-"+ll);
                  number_of_routs = number_of_routs * calculate_routes_from_node(ll, ii, radius, COLS, ROWS, dead_node);
                } 
                ll++;     
            }         
        } 

          
      //   } 
      // }
    }


    console.log("Number of the possible routes - " + number_of_routs);











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
  console.log("\n");
  console.log("FINISHED PROCESSING THE NODES");
  console.log("\n");
    


}
}

function calculate_routes_from_node(i, j, radius, COLS, ROWS, dead_node)
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


  // restore all the deleted elements
  for (k = removed_nodes.length-1; k >= 0; k--) { 
    removed_nodes[k].restore();
  }

  //assign the number of paths to this node
  cy.$("#n-"+i+"-"+j).json({"data":{"weight":ret}});

  return ret;

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
            for ( k=0; k<aStar2.path.length; k++ ) {  
                if(aStar2.path[k].isEdge()){ 
                    //chnage the weigth
                    var current_weight = cy.$("#"+aStar2.path[k].id()).data().weight;
                    current_weight++;
                    cy.$("#"+aStar2.path[k].id()).json({"data":{"weight":current_weight}});
                    cy.$("#"+aStar2.path[k].id()).json({"data":{"label":current_weight}});
                }
            }
        // restore all the deleted elements
        for (k = removed_nodes.length-1; k >= 0; k--) { 
  removed_nodes[k].restore();
  }
}


  function minimum_hop_count_between_nodes(node1, node2) {
    var ret = cy.elements().aStar({ root: node1, goal: node2 }).distance;
    return ret;
    }

    function path_exists_between_nodes(node1, node2) {
      var ret = cy.elements().aStar({ root: node1, goal: node2 }).found;
    return ret;
    }

