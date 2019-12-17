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
var routing_table_from_json_file = {
    "#n-3-2": "#n-3-2,#n-2-2,#n-2-1,#n-1-1,#n-0-1,#n-0-0",
    "#n-3-3": "#n-3-3,#n-3-2,#n-3-1,#n-3-0,#n-2-0,#n-1-0,#n-0-0",
    "#n-3-0": "#n-3-0,#n-2-0,#n-1-0,#n-0-0",
    "#n-3-1": "#n-3-1,#n-4-1,#n-5-1,#n-5-0,#n-0-0",
    "#n-3-6": "#n-3-6,#n-3-7,#n-2-7,#n-2-8,#n-2-9,#n-2-10,#n-2-11,#n-2-0,#n-1-0,#n-0-0",
    "#n-3-7": "#n-3-7,#n-3-8,#n-3-9,#n-3-10,#n-3-11,#n-4-11,#n-4-0,#n-5-0,#n-0-0",
    "#n-3-4": "#n-3-4,#n-4-4,#n-4-3,#n-5-3,#n-5-2,#n-5-1,#n-0-1,#n-0-0",
    "#n-3-5": "#n-3-5,#n-3-4,#n-2-4,#n-2-3,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
    "#n-3-8": "#n-3-8,#n-4-8,#n-4-9,#n-4-10,#n-5-10,#n-0-10,#n-0-11,#n-0-0",
    "#n-3-9": "#n-3-9,#n-4-9,#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
    "#n-5-8": "#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
    "#n-5-9": "#n-5-9,#n-5-10,#n-5-11,#n-0-11,#n-0-0",
    "#n-4-9": "#n-4-9,#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
    "#n-4-8": "#n-4-8,#n-5-8,#n-5-9,#n-5-10,#n-0-10,#n-0-11,#n-0-0",
    "#n-4-4": "#n-4-4,#n-4-3,#n-4-2,#n-5-2,#n-5-1,#n-5-0,#n-0-0",
    "#n-5-0": "#n-5-0,#n-0-0",
    "#n-5-1": "#n-5-1,#n-5-0,#n-0-0",
    "#n-5-2": "#n-5-2,#n-0-2,#n-0-1,#n-0-0",
    "#n-5-3": "#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0",
    "#n-4-1": "#n-4-1,#n-5-1,#n-5-0,#n-0-0",
    "#n-4-0": "#n-4-0,#n-5-0,#n-0-0",
    "#n-4-3": "#n-4-3,#n-4-2,#n-4-1,#n-4-0,#n-5-0,#n-0-0",
    "#n-4-2": "#n-4-2,#n-4-1,#n-4-0,#n-5-0,#n-0-0",
    "#n-4-6": "#n-4-6,#n-4-5,#n-4-4,#n-4-3,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0",
    "#n-5-4": "#n-5-4,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0",
    "#n-5-10": "#n-5-10,#n-5-11,#n-0-11,#n-0-0",
    "#n-5-11": "#n-5-11,#n-0-11,#n-0-0",
    "#n-0-11": "#n-0-11,#n-0-0",
    "#n-0-10": "#n-0-10,#n-0-11,#n-0-0",
    "#n-0-4": "#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
    "#n-2-1": "#n-2-1,#n-2-0,#n-1-0,#n-0-0",
    "#n-5-7": "#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-0-11,#n-0-0",
    "#n-1-10": "#n-1-10,#n-1-11,#n-1-0,#n-0-0",
    "#n-1-11": "#n-1-11,#n-1-0,#n-0-0",
    "#n-1-4": "#n-1-4,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
    "#n-1-5": "#n-1-5,#n-1-4,#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0",
    "#n-1-6": "#n-1-6,#n-1-5,#n-1-4,#n-1-3,#n-1-2,#n-1-1,#n-0-1,#n-0-0",
    "#n-1-7": "#n-1-7,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-1-0,#n-0-0",
    "#n-1-0": "#n-1-0,#n-0-0",
    "#n-1-1": "#n-1-1,#n-1-0,#n-0-0",
    "#n-1-2": "#n-1-2,#n-1-1,#n-1-0,#n-0-0",
    "#n-1-3": "#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0",
    "#n-3-11": "#n-3-11,#n-4-11,#n-5-11,#n-5-0,#n-0-0",
    "#n-4-7": "#n-4-7,#n-5-7,#n-5-8,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0",
    "#n-1-8": "#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0",
    "#n-1-9": "#n-1-9,#n-1-10,#n-1-11,#n-1-0,#n-0-0",
    "#n-0-9": "#n-0-9,#n-0-10,#n-0-11,#n-0-0",
    "#n-0-8": "#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0",
    "#n-4-11": "#n-4-11,#n-4-0,#n-5-0,#n-0-0",
    "#n-2-9": "#n-2-9,#n-2-10,#n-2-11,#n-2-0,#n-1-0,#n-0-0",
    "#n-2-8": "#n-2-8,#n-2-9,#n-2-10,#n-2-11,#n-1-11,#n-0-11,#n-0-0",
    "#n-0-1": "#n-0-1,#n-0-0",
    "#n-2-6": "#n-2-6,#n-2-7,#n-2-8,#n-2-9,#n-2-10,#n-2-11,#n-1-11,#n-0-11,#n-0-0",
    "#n-2-5": "#n-2-5,#n-2-4,#n-2-3,#n-1-3,#n-1-2,#n-0-2,#n-0-1,#n-0-0",
    "#n-2-4": "#n-2-4,#n-2-3,#n-2-2,#n-2-1,#n-2-0,#n-1-0,#n-0-0",
    "#n-0-5": "#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
    "#n-2-2": "#n-2-2,#n-2-1,#n-2-0,#n-1-0,#n-0-0",
    "#n-0-7": "#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0",
    "#n-2-0": "#n-2-0,#n-1-0,#n-0-0",
    "#n-0-3": "#n-0-3,#n-0-2,#n-0-1,#n-0-0",
    "#n-5-6": "#n-5-6,#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-0-11,#n-0-0",
    "#n-2-3": "#n-2-3,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
    "#n-4-5": "#n-4-5,#n-4-4,#n-4-3,#n-4-2,#n-4-1,#n-5-1,#n-5-0,#n-0-0",
    "#n-2-7": "#n-2-7,#n-2-8,#n-2-9,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0",
    "#n-0-2": "#n-0-2,#n-0-1,#n-0-0",
    "#n-3-10": "#n-3-10,#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
    "#n-4-10": "#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
    "#n-2-10": "#n-2-10,#n-1-10,#n-0-10,#n-0-11,#n-0-0",
    "#n-5-5": "#n-5-5,#n-5-4,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0",
    "#n-2-11": "#n-2-11,#n-1-11,#n-0-11,#n-0-0",
    "#n-0-6": "#n-0-6,#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0"
}

function getRandomLinkDelay() {
    return 35;
}

function is_period_completed(packets) {
    for (var i = 0; i < packets.length; i++) {
        if (packets[i].status != "has_reached_master") return false;
    }
    return true;
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
                            "label": nodes_original[j * COLS + i].south,
                            "number_of_packets_processing": 0,
                            "packets_about_to_be_processed": [],
                            "packets_current_processing": [],
                            "packets_current_processing_counter": [],
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
                } else // if the element is  at the last row -- wrap around to the 0th row
                {
                    data.push({
                        "data": {
                            "id": "e-" + i + "-" + j + "--" + i + "-" + 0,
                            "weight": 1,
                            "source": "n-" + i + "-" + j,
                            "target": "n-" + i + "-" + 0,
                            "label": nodes_original[j * COLS + i].south,
                            "number_of_packets_processing": 0,
                            "packets_about_to_be_processed": [],
                            "packets_current_processing": [],
                            "packets_current_processing_counter": [],
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
                if (i != COLS - 1) { // if the element is not at the last row
                    data.push({
                        "data": {
                            "id": "e-" + i + "-" + j + "--" + (i + 1) + "-" + j,
                            "weight": 1,
                            "source": "n-" + i + "-" + j,
                            "target": "n-" + (i + 1) + "-" + j,
                            "label": nodes_original[j * COLS + i].east,
                            "number_of_packets_processing": 0,
                            "packets_about_to_be_processed": [],
                            "packets_current_processing": [],
                            "packets_current_processing_counter": [],
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
                } else { // if the element is at the last row -- wrap around
                    data.push({
                        "data": {
                            "id": "e-" + i + "-" + j + "--" + 0 + "-" + j,
                            "weight": 1,
                            "source": "n-" + i + "-" + j,
                            "target": "n-" + 0 + "-" + j,
                            "label": nodes_original[j * COLS + i].east,
                            "number_of_packets_processing": 0,
                            "packets_about_to_be_processed": [],
                            "packets_current_processing": [],
                            "packets_current_processing_counter": [],
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
new_routing_tabe = {};
for (var node in routing_table_from_json_file) {
    new_routing_tabe[node] = routing_table_from_json_file[node].split(",");
}
simulate_routing_table(new_routing_tabe, 5, 400);
// var reader = new FileReader();
// document.querySelector("#inputGroupFile01").addEventListener('change', function() {
//     // list of selected files
//     var all_files = this.files;
//     if (all_files.length == 0) {
//         alert('Error : No file selected');
//         return;
//     }
//     // first file selected by user
//     var file = all_files[0];
//     // files types allowed
//     // we are reading text file in this example
//     // var allowed_types = ['text/plain'];
//     // if (allowed_types.indexOf(file.type) == -1) {
//     //     alert('Error : Incorrect file type');
//     //     return;
//     // }
//     // Max 2 MB allowed
//     var max_size_allowed = 2 * 1024 * 1024
//     if (file.size > max_size_allowed) {
//         alert('Error : Exceeded size 2MB');
//         return;
//     }
//     // file validation is successful
//     // we will now read the file
//     reader.readAsText(file);
// });
// reader.addEventListener('load', function(e) {
//     // contents
//     var text = e.target.result;
//     // parse as JSON
//     var json_str = JSON.parse(text);
//     // console.log(json_str);
//     console.log("FOUND " + countObjectsInJSON(json_str) + " PATHS IN THE ROUTING TABLE");
//     new_routing_tabe = {};
//     for (var node in json_str) {
//         new_routing_tabe[node] = json_str[node].split(",");
//     }
//     // console.log(new_routing_tabe);
//     simulate_routing_table(new_routing_tabe, 10, 400);
// });
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
function simulate_routing_table(routing_table_json, number_of_periods, number_of_cycles_per_period) {
    // console.log("SIMULATING the following routing table");
    console.log(routing_table_json);
    for (var node in routing_table_json) {
        path = routing_table_json[node];
    }

    function packet() {
        this.origin = "";
        this.status = "inside_a_node";
        this.link_packet_is_in = "";
        this.current_node = "";
        this.position_in_the_path = 0;
        this.going_from = "";
        this.going_to = "";
        this.path = "";
        this.latency = 0;
        this.latencies_over_periods = [];
    }
    initialize_network()
    var packets = new Array();
    for (var k = 0; k < COLS * ROWS - 1; k++) {
        packets.push(new packet());
    }
    // initialize packets
    for (var i = 0; i < packets.length; i++) {}
    // core simulation
    for (var preriod = 0; preriod < number_of_periods; preriod++) {
        console.log("STARTING PROCESSING PERIOD #" + preriod);
        //reset packets
        for (var i = 0; i < packets.length; i++) {
            packets[i].link_packet_is_in = "";
            packets[i].position_in_the_path = 0;
            packets[i].going_from = "";
            packets[i].going_to = "";
            packets[i].latency = 0;
            packets[i].origin = Object.keys(routing_table_json)[i];
            packets[i].current_node = Object.keys(routing_table_json)[i];
            packets[i].status = "inside_a_node";
            packets[i].path = routing_table_json[Object.keys(routing_table_json)[i]];
        }
        for (var cycle = 0; cycle < number_of_cycles_per_period; cycle++) {
            // console.log("STARTING PROCESSING CYCLE #" + cycle);
            for (var i = 0; i < packets.length; i++) {
                // var current_path;
                // for (var node in routing_table_json) {
                //     current_path = routing_table_json[node]
                // }
                var origin = Object.keys(routing_table_json)[i];
                var current_node = (routing_table_json[origin])[packets[i].position_in_the_path];
                var next_node = (routing_table_json[origin])[packets[i].position_in_the_path + 1];
                switch (packets[i].status) {
                    case "inside_a_node":
                        if (packets[i].current_node == "#n-0-0") {
                            // console.log("packet from " + packets[i].origin + " has reached the Master");
                            packets[i].status = "has_reached_master";
                            packets[i].latencies_over_periods.push(packets[i].latency);
                            packets[i].latency = 0;
                            break;
                        }
                        packets[i].latency++;
                        // console.log("packet from " + Object.keys(routing_table_json)[i] + " is inside a node " + packets[i].current_node);
                        // not sure what the link is called
                        var edge_id_1 = "#e-" + extract_i_j_from_id(current_node)[0] + "-" + extract_i_j_from_id(current_node)[1] + "--" + extract_i_j_from_id(next_node)[0] + "-" + extract_i_j_from_id(next_node)[1];
                        var edge_id_2 = "#e-" + extract_i_j_from_id(next_node)[0] + "-" + extract_i_j_from_id(next_node)[1] + "--" + extract_i_j_from_id(current_node)[0] + "-" + extract_i_j_from_id(current_node)[1];
                        // now we found the exact name of the link
                        // add the packet to the packets_about_to_be_processed array
                        if (cy.$(edge_id_1).inside()) {
                            // console.log("going to " + next_node + " via the link " + edge_id_1);
                            cy.$(edge_id_1).data().packets_about_to_be_processed.push(i)
                            // cy.$(edge_id_1).data().packets_current_processing_counter.push(LINK_TRANSMISSION_DELAY_CYCLES);
                            // console.log(cy.$(edge_id_1).data().packets_about_to_be_processed);
                        } else if (cy.$(edge_id_2).inside()) {
                            // console.log("going to " + next_node + " via the link " + edge_id_2);
                            cy.$(edge_id_2).data().packets_about_to_be_processed.push(i);
                            // cy.$(edge_id_2).data().packets_current_processing_counter.push(LINK_TRANSMISSION_DELAY_CYCLES);
                            // console.log(cy.$(edge_id_2).data().packets_about_to_be_processed);
                        } else console.log("ERROR finding edge");
                        packets[i].going_from = current_node;
                        packets[i].going_to = next_node;
                        packets[i].status = "inside_a_link";
                        packets[i].current_node = "";
                        break;
                    case "has_reached_master":
                        packets[i].latency++;
                        break;
                    case "inside_a_link":
                        packets[i].latency++;
                        break;
                    default:
                        alert("STOPPING ");
                        break;
                }
            }
            // finished processing packets
            // now start processing links
            cy.edges().forEach(function(link) {
                // console.log("processing link " + link.data('id'));
                var packets_currently_processing = link.data('packets_current_processing');
                var packets_about_to_be_processed = link.data('packets_about_to_be_processed');
                var packets_current_processing_counters = link.data('packets_current_processing_counter');
                for (var i = 0; i < packets_currently_processing.length; i++) {
                    packets_current_processing_counters[i]--;
                    if (packets_current_processing_counters[i] == 0) {
                        // releasing the packet to the next node
                        packets[packets_currently_processing[i]].status = "inside_a_node";
                        packets[packets_currently_processing[i]].link_packet_is_in = "";
                        packets[packets_currently_processing[i]].current_node = packets[packets_currently_processing[i]].going_to;
                        packets[packets_currently_processing[i]].going_from = "";
                        packets[packets_currently_processing[i]].going_to = "";
                        packets[packets_currently_processing[i]].position_in_the_path++;
                        packets_current_processing_counters.shift();
                        packets_currently_processing.shift();
                    }
                }
                if (packets_about_to_be_processed.length == 0) {} else if (packets_about_to_be_processed.length == 1) {
                    // start processing the packet in the link
                    packets_currently_processing.push(packets_about_to_be_processed[0]);
                    packets[packets_about_to_be_processed[0]].status = "inside_a_link";
                    packets[packets_about_to_be_processed[0]].link_packet_is_in = link.data('id');
                    packets_current_processing_counters.push(LINK_TRANSMISSION_DELAY_CYCLES);
                    packets_about_to_be_processed.shift();
                } else if (packets_about_to_be_processed.length > 1) {
                    // collision
                    var r_index = Math.floor(Math.random() * packets_about_to_be_processed.length);
                    var r = packets_about_to_be_processed[r_index];
                    packets_currently_processing.push(r);
                    packets[r].status = "inside_a_link";
                    packets[r].link_packet_is_in = link.data('id');
                    packets_current_processing_counters.push(LINK_TRANSMISSION_DELAY_CYCLES);
                    packets_about_to_be_processed.splice(r_index, 1); // delete the element
                } else {
                    console.log("ERROR processing packets in the links");
                    alert("STOPPING ");
                }
                link.json({ "data": { "packets_current_processing": packets_currently_processing } });
                link.json({ "data": { "packets_about_to_be_processed": packets_about_to_be_processed } });
                link.json({ "data": { "packets_current_processing_counters": packets_current_processing_counters } });
            });
            // console.log("FINISHED PROCESSING CYCLE #" + cycle);
            // console.log("PACKETS");
            // console.log(packets);
            if (is_period_completed(packets)) {
                console.log("THE PERIOD IS COMPLETED WITHIN " + cycle + " CYCLES");
                break;
            }
        }
    }
    // display status of the network
    console.log("\n\nDISPLAYING THE NETWORK");
    console.log(packets);
}