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

function countObjectsInJSON(json_object) {
    var count = 0;
    for (var prop in json_object) {
        if (json_object.hasOwnProperty(prop)) {
            ++count;
        }
    }
    return count;
}

function packet() {
    this.status = "";
    this.current_node = "";
    this.position_in_the_path = 0;
    this.going_from = "";
    this.going_to = "";
    this.cycles_before_reception = 0;
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
    simulate_routing_table(json_str, 100);
});
//---------------------
//
//     CORE CODE
//
//---------------------
function simulate_routing_table(routing_table_json, number_of_cycles) {
    var packets = new Array();
    for (var k = 0; k < COLS * ROWS; k++) {
        packets.push(new packet());
    }
    for (var cycle = 0; cycle < COLS * ROWS; cycle++) {
        console.log("PROCESSED CYCLE #" + cycle);
        for (var packet = 0; packet < COLS * ROWS; packet++) {}
    }