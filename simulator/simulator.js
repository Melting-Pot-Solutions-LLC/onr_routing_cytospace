//---------------------
//
//     SUPPLEMENTARY CODE
//     AND VARIABLES
//
//---------------------
var COLS = 6;
var ROWS = 12;
var LINK_TRANSMISSION_DELAY_CYCLES = 35;
var CYCLE_FREQUENCY_TO_SYNCHRONIZE_CHANNELS = 16;
var NODE_PACKET_PROCESSING_DELAY = 0;
var current_cycle = 0;

function getRandomLinkDelay() {
    return 35;
}

function extract_i_j_from_id(id) {
    ret = [];
    ret.push(parseInt(id.substring(3, id.lastIndexOf("-")))); // add i
    ret.push(parseInt(id.substring(id.lastIndexOf("-") + 1))); // add j
    return ret;
}

function countObjectsInJSON(json_object) {
    var count = 0;
    for (var prop in json_object) {
        if (json_object.hasOwnProperty(prop)) {
            ++count;
        }
    }
    return count;
}

function initialize_network() {
    var data = [];
    var dead_node = "";

    function node() {
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
    for (var k = 0; k < COLS * ROWS; k++) {
        nodes_original.push(new node());
        // if(dead_node == k) nodes_original[k].dead = true;
    }
    // calculate_nodes_original()
    display_grid()
    // use Dijkstra algorithm to calculate all weights
    function display_grid() {
        var i, j;
        for (i = 0; i < COLS; i++) {
            for (j = 0; j < ROWS; j++) {
                data.push({
                    "data": {
                        "id": "n-" + i + "-" + j,
                        "weight": 0,
                        // "label": "non"
                    },
                    "position": {
                        "x": 50 + 110 * i,
                        "y": 50 + 110 * j
                    },
                    "group": "nodes",
                    "removed": false,
                    "selected": false,
                    "selectable": true,
                    "locked": false,
                    "grabbable": true,
                    // if the node is dead, then assign "dead" class which makes the colo red
                    "classes": (dead_node == j * COLS + i) ? "dead" : "",
                    "holds_packet": false,
                    // "classes": nodes_original[j*COLS+i].dead?"dead":""
                });
            }
        }
        // two for loops for creating edges
        for (i = 0; i < COLS; i++) {
            for (j = 0; j < ROWS; j++) {
                if (j != ROWS - 1) { // if the element is not at the last row
                    data.push({
                        "data": {
                            "id": "e-" + i + "-" + j + "--" + i + "-" + (j + 1),
                            "weight": 1,
                            "source": "n-" + i + "-" + j,
                            "target": "n-" + i + "-" + (j + 1),
                            "label": nodes_original[j * COLS + i].south
                        },
                        "position": {},
                        "group": "edges",
                        "removed": false,
                        "selected": false,
                        "selectable": true,
                        "locked": true,
                        "grabbable": true,
                        "classes": "outline",
                        "number_of_packets_processing": 0,
                        "packets_about_to_be_processed": [],
                        "packets_current_processing": []
                    });
                } else // if the element is  at the last row -- wrap around to the 0th row
                {
                    data.push({
                        "data": {
                            "id": "e-" + i + "-" + j + "--" + i + "-" + 0,
                            "weight": 1,
                            "source": "n-" + i + "-" + j,
                            "target": "n-" + i + "-" + 0,
                            "label": nodes_original[j * COLS + i].south
                        },
                        "position": {},
                        "group": "edges",
                        "removed": false,
                        "selected": false,
                        "selectable": true,
                        "locked": true,
                        "grabbable": true,
                        "classes": "outline unbundled-bezier",
                        "number_of_packets_processing": 0,
                        "packets_about_to_be_processed": [],
                        "packets_current_processing": []
                    });
                }
                if (i != COLS - 1) { // if the element is not at the last row
                    data.push({
                        "data": {
                            "id": "e-" + i + "-" + j + "--" + (i + 1) + "-" + j,
                            "weight": 1,
                            "source": "n-" + i + "-" + j,
                            "target": "n-" + (i + 1) + "-" + j,
                            "label": nodes_original[j * COLS + i].east
                        },
                        "position": {},
                        "group": "edges",
                        "removed": false,
                        "selected": false,
                        "selectable": true,
                        "locked": true,
                        "grabbable": true,
                        "classes": "outline",
                        "number_of_packets_processing": 0,
                        "packets_about_to_be_processed": [],
                        "packets_current_processing": []
                    });
                } else { // if the element is at the last row -- wrap around
                    data.push({
                        "data": {
                            "id": "e-" + i + "-" + j + "--" + 0 + "-" + j,
                            "weight": 1,
                            "source": "n-" + i + "-" + j,
                            "target": "n-" + 0 + "-" + j,
                            "label": nodes_original[j * COLS + i].east
                        },
                        "position": {},
                        "group": "edges",
                        "removed": false,
                        "selected": false,
                        "selectable": true,
                        "locked": true,
                        "grabbable": true,
                        "classes": "outline unbundled-bezier",
                        "number_of_packets_processing": 0,
                        "packets_about_to_be_processed": [],
                        "packets_current_processing": []
                    });
                }
            }
        }
        var cy = window.cy = cytoscape({
            container: document.getElementById('cy'),
            boxSelectionEnabled: false,
            autounselectify: true,
            layout: {
                name: 'preset'
            },
            style: [{
                selector: 'node',
                style: {
                    'height': 20,
                    'width': 20,
                    'background-color': '#18e018'
                }
            }, {
                selector: 'edge',
                style: {
                    'curve-style': 'haystack',
                    'haystack-radius': 0,
                    'width': 5,
                    'opacity': 0.5,
                    'line-color': '#a2efa2'
                }
            }, {
                selector: "node[label]",
                style: {
                    "label": "data(label)"
                }
            }, {
                selector: "edge[label]",
                style: {
                    'label': "data(label)",
                    'width': 3
                }
            }, {
                selector: ".outline",
                style: {
                    'color': "#fff",
                    'text-outline-color': "#888",
                    'text-outline-width': 3
                }
            }, {
                selector: ".dead",
                style: {
                    'color': "#fff",
                    'text-outline-color': "#888",
                    'text-outline-width': 3,
                    'background-color': '#e01717'
                }
            }, {
                selector: "edge.unbundled-bezier",
                style: {
                    "curve-style": "unbundled-bezier",
                    "control-point-distances": 120,
                    "control-point-weights": 0.1
                }
            }],
            elements: data
        });
        var i, j, radius;
        var m, l;
        var kk, mm, ll, nn, ii;
        // determine how many possible routes we have if we select completely random routs but with min hop count
        cy.$("#n-" + 0 + "-" + 1).json({ "data": { "weight": 1 } });
        cy.$("#n-" + 1 + "-" + 0).json({ "data": { "weight": 1 } });
        cy.$("#n-" + (COLS - 1) + "-" + 0).json({ "data": { "weight": 1 } });
        cy.$("#n-" + 0 + "-" + (ROWS - 1)).json({ "data": { "weight": 1 } });
        var number_of_routs = 1;
        var final_array_of_paths = [];
    }
}
//---------------------
//
//     FILE READING ROUTINES
//
//---------------------
var reader = new FileReader();
document.querySelector("#inputGroupFile01").addEventListener('change', function() {
    // list of selected files
    var all_files = this.files;
    if (all_files.length == 0) {
        alert('Error : No file selected');
        return;
    }
    // first file selected by user
    var file = all_files[0];
    // files types allowed
    // we are reading text file in this example
    // var allowed_types = ['text/plain'];
    // if (allowed_types.indexOf(file.type) == -1) {
    //     alert('Error : Incorrect file type');
    //     return;
    // }
    // Max 2 MB allowed
    var max_size_allowed = 2 * 1024 * 1024
    if (file.size > max_size_allowed) {
        alert('Error : Exceeded size 2MB');
        return;
    }
    // file validation is successful
    // we will now read the file
    reader.readAsText(file);
});
reader.addEventListener('load', function(e) {
    // contents
    var text = e.target.result;
    // parse as JSON
    var json_str = JSON.parse(text);
    // console.log(json_str);
    console.log("FOUND " + countObjectsInJSON(json_str) + " PATHS IN THE ROUTING TABLE");
    new_routing_tabe = {};
    for (var node in json_str) {
        new_routing_tabe[node] = json_str[node].split(",");
    }
    // console.log(new_routing_tabe);
    simulate_routing_table(new_routing_tabe, 1);
});
//
//
//
//
//
//
//
//
//---------------------
//
//     CORE CODE
//
//---------------------
function simulate_routing_table(routing_table_json, number_of_cycles) {
    console.log("SIMULATING the following routing table");
    console.log(routing_table_json);
    for (var node in routing_table_json) {
        path = routing_table_json[node];
    }

    function packet() {
        this.origin = "";
        this.status = "inside_a_node";
        this.node_packet_is_in = "";
        this.link_packet_is_in = "";
        this.current_node = "";
        this.position_in_the_path = 0;
        this.going_from = "";
        this.going_to = "";
        this.cycles_before_reception = 0;
    }
    initialize_network()
    var packets = new Array();
    for (var k = 0; k < COLS * ROWS - 1; k++) {
        packets.push(new packet());
    }
    // initialize packets
    for (var i = 0; i < packets.length; i++) {
        packets[i].origin = Object.keys(routing_table_json)[i];
        packets[i].current_node = Object.keys(routing_table_json)[i];
        packets[i].status = "inside_a_node";
    }
    // core simulation
    for (var cycle = 0; cycle < number_of_cycles; cycle++) {
        console.log("STARTING PROCESSING CYCLE #" + cycle);
        for (var i = 0; i < packets.length; i++) {
            // var current_path;
            // for (var node in routing_table_json) {
            //     current_path = routing_table_json[node]
            // }
            var origin = Object.keys(routing_table_json)[i];
            var current_node = (routing_table_json[origin])[packets[i].position_in_the_path];
            var next_node = (routing_table_json[origin])[packets[i].position_in_the_path + 1];
            var edge_id_1 = "#e-" + extract_i_j_from_id(current_node)[0] + "-" + extract_i_j_from_id(current_node)[1] + "--" + extract_i_j_from_id(next_node)[0] + "-" + extract_i_j_from_id(next_node)[1];
            var edge_id_2 = "#e-" + extract_i_j_from_id(next_node)[0] + "-" + extract_i_j_from_id(next_node)[1] + "--" + extract_i_j_from_id(current_node)[0] + "-" + extract_i_j_from_id(current_node)[1];
            if (cy.$(edge_id_1).inside()) {
                // load_seen_by_packet += cy.$(edge_id_1).data().weight
            } else if (cy.$(edge_id_2).inside()) {
                // load_seen_by_packet += cy.$(edge_id_2).data().weight
            } else console.log("ERROR finding edge");
            switch (packets[i].status) {
                case "inside_a_node":
                    console.log("packet from " + Object.keys(routing_table_json)[i] + " is inside a node");
                    console.log("going to " + next_node + " via the link " + edge_id_1);
                    break;
                default:
                    console.log("ERROR DETERMINING STATUS OF PACKET");
                    break;
            }
        }
        // finished processing packets
        // now start processing links
        cy.edges().forEach(function(link) {});
        console.log("FINISHED PROCESSING CYCLE #" + cycle);
    }
}