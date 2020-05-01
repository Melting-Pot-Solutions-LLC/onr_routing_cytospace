//---------------------
//
//     SUPPLEMENTARY CODE
//     AND VARIABLES
//
//---------------------
var NUMMBER_OF_FLITS_PER_PACKET = 16;
var NUMBER_OF_CYCLES_TO_TRANSMIT_A_FLIT = 35;
var COLS = 6;
var ROWS = 12;
var LINK_TRANSMISSION_DELAY_CYCLES = NUMBER_OF_CYCLES_TO_TRANSMIT_A_FLIT + NUMMBER_OF_FLITS_PER_PACKET;
var LINK_TRANSMISSION_DELAY_DEVIATION = 2;
var CYCLE_FREQUENCY_TO_SYNCHRONIZE_CHANNELS = 8;
var NODE_PACKET_PROCESSING_DELAY = 0;
var current_cycle = 0;
var CLOCK_JITTER_PERCENT = 0.07;

//1st table -  IDEAL
// var routing_table_from_json_file = {
//     "#n-3-2": "#n-3-2,#n-2-2,#n-2-1,#n-1-1,#n-0-1,#n-0-0",
//     "#n-3-3": "#n-3-3,#n-3-2,#n-3-1,#n-3-0,#n-2-0,#n-1-0,#n-0-0",
//     "#n-3-0": "#n-3-0,#n-2-0,#n-1-0,#n-0-0",
//     "#n-3-1": "#n-3-1,#n-4-1,#n-5-1,#n-5-0,#n-0-0",
//     "#n-3-6": "#n-3-6,#n-3-7,#n-2-7,#n-2-8,#n-2-9,#n-2-10,#n-2-11,#n-2-0,#n-1-0,#n-0-0",
//     "#n-3-7": "#n-3-7,#n-3-8,#n-3-9,#n-3-10,#n-3-11,#n-4-11,#n-4-0,#n-5-0,#n-0-0",
//     "#n-3-4": "#n-3-4,#n-4-4,#n-4-3,#n-5-3,#n-5-2,#n-5-1,#n-0-1,#n-0-0",
//     "#n-3-5": "#n-3-5,#n-3-4,#n-2-4,#n-2-3,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
//     "#n-3-8": "#n-3-8,#n-4-8,#n-4-9,#n-4-10,#n-5-10,#n-0-10,#n-0-11,#n-0-0",
//     "#n-3-9": "#n-3-9,#n-4-9,#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
//     "#n-5-8": "#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
//     "#n-5-9": "#n-5-9,#n-5-10,#n-5-11,#n-0-11,#n-0-0",
//     "#n-4-9": "#n-4-9,#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
//     "#n-4-8": "#n-4-8,#n-5-8,#n-5-9,#n-5-10,#n-0-10,#n-0-11,#n-0-0",
//     "#n-4-4": "#n-4-4,#n-4-3,#n-4-2,#n-5-2,#n-5-1,#n-5-0,#n-0-0",
//     "#n-5-0": "#n-5-0,#n-0-0",
//     "#n-5-1": "#n-5-1,#n-5-0,#n-0-0",
//     "#n-5-2": "#n-5-2,#n-0-2,#n-0-1,#n-0-0",
//     "#n-5-3": "#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0",
//     "#n-4-1": "#n-4-1,#n-5-1,#n-5-0,#n-0-0",
//     "#n-4-0": "#n-4-0,#n-5-0,#n-0-0",
//     "#n-4-3": "#n-4-3,#n-4-2,#n-4-1,#n-4-0,#n-5-0,#n-0-0",
//     "#n-4-2": "#n-4-2,#n-4-1,#n-4-0,#n-5-0,#n-0-0",
//     "#n-4-6": "#n-4-6,#n-4-5,#n-4-4,#n-4-3,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0",
//     "#n-5-4": "#n-5-4,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0",
//     "#n-5-10": "#n-5-10,#n-5-11,#n-0-11,#n-0-0",
//     "#n-5-11": "#n-5-11,#n-0-11,#n-0-0",
//     "#n-0-11": "#n-0-11,#n-0-0",
//     "#n-0-10": "#n-0-10,#n-0-11,#n-0-0",
//     "#n-0-4": "#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
//     "#n-2-1": "#n-2-1,#n-2-0,#n-1-0,#n-0-0",
//     "#n-5-7": "#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-0-11,#n-0-0",
//     "#n-1-10": "#n-1-10,#n-1-11,#n-1-0,#n-0-0",
//     "#n-1-11": "#n-1-11,#n-1-0,#n-0-0",
//     "#n-1-4": "#n-1-4,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
//     "#n-1-5": "#n-1-5,#n-1-4,#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0",
//     "#n-1-6": "#n-1-6,#n-1-5,#n-1-4,#n-1-3,#n-1-2,#n-1-1,#n-0-1,#n-0-0",
//     "#n-1-7": "#n-1-7,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-1-0,#n-0-0",
//     "#n-1-0": "#n-1-0,#n-0-0",
//     "#n-1-1": "#n-1-1,#n-1-0,#n-0-0",
//     "#n-1-2": "#n-1-2,#n-1-1,#n-1-0,#n-0-0",
//     "#n-1-3": "#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0",
//     "#n-3-11": "#n-3-11,#n-4-11,#n-5-11,#n-5-0,#n-0-0",
//     "#n-4-7": "#n-4-7,#n-5-7,#n-5-8,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0",
//     "#n-1-8": "#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0",
//     "#n-1-9": "#n-1-9,#n-1-10,#n-1-11,#n-1-0,#n-0-0",
//     "#n-0-9": "#n-0-9,#n-0-10,#n-0-11,#n-0-0",
//     "#n-0-8": "#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0",
//     "#n-4-11": "#n-4-11,#n-4-0,#n-5-0,#n-0-0",
//     "#n-2-9": "#n-2-9,#n-2-10,#n-2-11,#n-2-0,#n-1-0,#n-0-0",
//     "#n-2-8": "#n-2-8,#n-2-9,#n-2-10,#n-2-11,#n-1-11,#n-0-11,#n-0-0",
//     "#n-0-1": "#n-0-1,#n-0-0",
//     "#n-2-6": "#n-2-6,#n-2-7,#n-2-8,#n-2-9,#n-2-10,#n-2-11,#n-1-11,#n-0-11,#n-0-0",
//     "#n-2-5": "#n-2-5,#n-2-4,#n-2-3,#n-1-3,#n-1-2,#n-0-2,#n-0-1,#n-0-0",
//     "#n-2-4": "#n-2-4,#n-2-3,#n-2-2,#n-2-1,#n-2-0,#n-1-0,#n-0-0",
//     "#n-0-5": "#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
//     "#n-2-2": "#n-2-2,#n-2-1,#n-2-0,#n-1-0,#n-0-0",
//     "#n-0-7": "#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0",
//     "#n-2-0": "#n-2-0,#n-1-0,#n-0-0",
//     "#n-0-3": "#n-0-3,#n-0-2,#n-0-1,#n-0-0",
//     "#n-5-6": "#n-5-6,#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-0-11,#n-0-0",
//     "#n-2-3": "#n-2-3,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0",
//     "#n-4-5": "#n-4-5,#n-4-4,#n-4-3,#n-4-2,#n-4-1,#n-5-1,#n-5-0,#n-0-0",
//     "#n-2-7": "#n-2-7,#n-2-8,#n-2-9,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0",
//     "#n-0-2": "#n-0-2,#n-0-1,#n-0-0",
//     "#n-3-10": "#n-3-10,#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
//     "#n-4-10": "#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0",
//     "#n-2-10": "#n-2-10,#n-1-10,#n-0-10,#n-0-11,#n-0-0",
//     "#n-5-5": "#n-5-5,#n-5-4,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0",
//     "#n-2-11": "#n-2-11,#n-1-11,#n-0-11,#n-0-0",
//     "#n-0-6": "#n-0-6,#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0"
// }


// 2nd table - NOT IDEAL - 13 13 21 24
//var routing_table_from_json_file = {"#n-3-2": "#n-3-2,#n-3-1,#n-4-1,#n-5-1,#n-0-1,#n-0-0", "#n-3-3": "#n-3-3,#n-2-3,#n-2-2,#n-2-1,#n-2-0,#n-1-0,#n-0-0", "#n-3-0": "#n-3-0,#n-2-0,#n-1-0,#n-0-0", "#n-3-1": "#n-3-1,#n-2-1,#n-1-1,#n-1-0,#n-0-0", "#n-3-6": "#n-3-6,#n-3-7,#n-3-8,#n-3-9,#n-2-9,#n-2-10,#n-2-11,#n-1-11,#n-0-11,#n-0-0", "#n-3-7": "#n-3-7,#n-3-8,#n-3-9,#n-3-10,#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0", "#n-3-4": "#n-3-4,#n-3-3,#n-2-3,#n-2-2,#n-1-2,#n-0-2,#n-0-1,#n-0-0", "#n-3-5": "#n-3-5,#n-2-5,#n-2-4,#n-1-4,#n-1-3,#n-1-2,#n-0-2,#n-0-1,#n-0-0", "#n-3-8": "#n-3-8,#n-2-8,#n-1-8,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-3-9": "#n-3-9,#n-3-10,#n-2-10,#n-1-10,#n-1-11,#n-1-0,#n-0-0", "#n-5-8": "#n-5-8,#n-5-9,#n-5-10,#n-0-10,#n-0-11,#n-0-0", "#n-5-9": "#n-5-9,#n-5-10,#n-5-11,#n-0-11,#n-0-0", "#n-4-9": "#n-4-9,#n-4-10,#n-4-11,#n-4-0,#n-5-0,#n-0-0", "#n-4-8": "#n-4-8,#n-4-9,#n-4-10,#n-4-11,#n-4-0,#n-5-0,#n-0-0", "#n-4-4": "#n-4-4,#n-4-3,#n-4-2,#n-4-1,#n-5-1,#n-5-0,#n-0-0", "#n-5-0": "#n-5-0,#n-0-0", "#n-5-1": "#n-5-1,#n-5-0,#n-0-0", "#n-5-2": "#n-5-2,#n-0-2,#n-0-1,#n-0-0", "#n-5-3": "#n-5-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-4-1": "#n-4-1,#n-5-1,#n-0-1,#n-0-0", "#n-4-0": "#n-4-0,#n-5-0,#n-0-0", "#n-4-3": "#n-4-3,#n-4-2,#n-4-1,#n-5-1,#n-5-0,#n-0-0", "#n-4-2": "#n-4-2,#n-4-1,#n-5-1,#n-0-1,#n-0-0", "#n-4-6": "#n-4-6,#n-4-7,#n-4-8,#n-4-9,#n-4-10,#n-4-11,#n-5-11,#n-0-11,#n-0-0", "#n-5-4": "#n-5-4,#n-5-3,#n-5-2,#n-5-1,#n-5-0,#n-0-0", "#n-5-10": "#n-5-10,#n-0-10,#n-0-11,#n-0-0", "#n-5-11": "#n-5-11,#n-5-0,#n-0-0", "#n-0-11": "#n-0-11,#n-0-0", "#n-0-10": "#n-0-10,#n-0-11,#n-0-0", "#n-0-4": "#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-2-1": "#n-2-1,#n-1-1,#n-0-1,#n-0-0", "#n-5-7": "#n-5-7,#n-5-8,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-1-10": "#n-1-10,#n-1-11,#n-1-0,#n-0-0", "#n-1-11": "#n-1-11,#n-0-11,#n-0-0", "#n-1-4": "#n-1-4,#n-1-3,#n-1-2,#n-1-1,#n-0-1,#n-0-0", "#n-1-5": "#n-1-5,#n-1-4,#n-1-3,#n-1-2,#n-0-2,#n-0-1,#n-0-0", "#n-1-6": "#n-1-6,#n-1-5,#n-1-4,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-1-7": "#n-1-7,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0", "#n-1-0": "#n-1-0,#n-0-0", "#n-1-1": "#n-1-1,#n-1-0,#n-0-0", "#n-1-2": "#n-1-2,#n-1-1,#n-1-0,#n-0-0", "#n-1-3": "#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0", "#n-3-11": "#n-3-11,#n-4-11,#n-5-11,#n-5-0,#n-0-0", "#n-4-7": "#n-4-7,#n-4-8,#n-5-8,#n-5-9,#n-5-10,#n-0-10,#n-0-11,#n-0-0", "#n-1-8": "#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0", "#n-1-9": "#n-1-9,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-0-9": "#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-0-8": "#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-4-11": "#n-4-11,#n-5-11,#n-5-0,#n-0-0", "#n-2-9": "#n-2-9,#n-1-9,#n-1-10,#n-0-10,#n-0-11,#n-0-0", "#n-2-8": "#n-2-8,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0", "#n-0-1": "#n-0-1,#n-0-0", "#n-2-6": "#n-2-6,#n-2-7,#n-2-8,#n-1-8,#n-1-9,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-2-5": "#n-2-5,#n-2-4,#n-2-3,#n-2-2,#n-2-1,#n-2-0,#n-1-0,#n-0-0", "#n-2-4": "#n-2-4,#n-1-4,#n-1-3,#n-1-2,#n-1-1,#n-0-1,#n-0-0", "#n-0-5": "#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-2-2": "#n-2-2,#n-2-1,#n-1-1,#n-1-0,#n-0-0", "#n-0-7": "#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-2-0": "#n-2-0,#n-1-0,#n-0-0", "#n-0-3": "#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-5-6": "#n-5-6,#n-0-6,#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-2-3": "#n-2-3,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-4-5": "#n-4-5,#n-4-4,#n-4-3,#n-5-3,#n-5-2,#n-5-1,#n-5-0,#n-0-0", "#n-2-7": "#n-2-7,#n-2-8,#n-2-9,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0", "#n-0-2": "#n-0-2,#n-0-1,#n-0-0", "#n-3-10": "#n-3-10,#n-4-10,#n-4-11,#n-5-11,#n-0-11,#n-0-0", "#n-4-10": "#n-4-10,#n-5-10,#n-0-10,#n-0-11,#n-0-0", "#n-2-10": "#n-2-10,#n-1-10,#n-1-11,#n-1-0,#n-0-0", "#n-5-5": "#n-5-5,#n-5-4,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0", "#n-2-11": "#n-2-11,#n-1-11,#n-0-11,#n-0-0", "#n-0-6": "#n-0-6,#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0"}

// 3rd table - NOT IDEAL - 16 11 20 24
 // var routing_table_from_json_file = {"#n-3-2": "#n-3-2,#n-2-2,#n-1-2,#n-0-2,#n-0-1,#n-0-0", "#n-3-3": "#n-3-3,#n-3-2,#n-2-2,#n-1-2,#n-0-2,#n-0-1,#n-0-0", "#n-3-0": "#n-3-0,#n-2-0,#n-1-0,#n-0-0", "#n-3-1": "#n-3-1,#n-3-0,#n-4-0,#n-5-0,#n-0-0", "#n-3-6": "#n-3-6,#n-3-7,#n-3-8,#n-2-8,#n-2-9,#n-2-10,#n-1-10,#n-1-11,#n-0-11,#n-0-0", "#n-3-7": "#n-3-7,#n-3-8,#n-2-8,#n-2-9,#n-2-10,#n-2-11,#n-2-0,#n-1-0,#n-0-0", "#n-3-4": "#n-3-4,#n-3-3,#n-3-2,#n-3-1,#n-2-1,#n-1-1,#n-0-1,#n-0-0", "#n-3-5": "#n-3-5,#n-3-4,#n-2-4,#n-2-3,#n-2-2,#n-2-1,#n-1-1,#n-1-0,#n-0-0", "#n-3-8": "#n-3-8,#n-2-8,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0", "#n-3-9": "#n-3-9,#n-3-10,#n-3-11,#n-2-11,#n-1-11,#n-0-11,#n-0-0", "#n-5-8": "#n-5-8,#n-5-9,#n-5-10,#n-0-10,#n-0-11,#n-0-0", "#n-5-9": "#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0", "#n-4-9": "#n-4-9,#n-5-9,#n-5-10,#n-0-10,#n-0-11,#n-0-0", "#n-4-8": "#n-4-8,#n-4-9,#n-5-9,#n-5-10,#n-0-10,#n-0-11,#n-0-0", "#n-4-4": "#n-4-4,#n-4-3,#n-4-2,#n-5-2,#n-5-1,#n-5-0,#n-0-0", "#n-5-0": "#n-5-0,#n-0-0", "#n-5-1": "#n-5-1,#n-0-1,#n-0-0", "#n-5-2": "#n-5-2,#n-0-2,#n-0-1,#n-0-0", "#n-5-3": "#n-5-3,#n-5-2,#n-5-1,#n-0-1,#n-0-0", "#n-4-1": "#n-4-1,#n-5-1,#n-0-1,#n-0-0", "#n-4-0": "#n-4-0,#n-5-0,#n-0-0", "#n-4-3": "#n-4-3,#n-4-2,#n-5-2,#n-5-1,#n-5-0,#n-0-0", "#n-4-2": "#n-4-2,#n-4-1,#n-4-0,#n-5-0,#n-0-0", "#n-4-6": "#n-4-6,#n-5-6,#n-5-5,#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-5-4": "#n-5-4,#n-5-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-5-10": "#n-5-10,#n-0-10,#n-0-11,#n-0-0", "#n-5-11": "#n-5-11,#n-0-11,#n-0-0", "#n-0-11": "#n-0-11,#n-0-0", "#n-0-10": "#n-0-10,#n-0-11,#n-0-0", "#n-0-4": "#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-2-1": "#n-2-1,#n-2-0,#n-1-0,#n-0-0", "#n-5-7": "#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0", "#n-1-10": "#n-1-10,#n-1-11,#n-1-0,#n-0-0", "#n-1-11": "#n-1-11,#n-0-11,#n-0-0", "#n-1-4": "#n-1-4,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-1-5": "#n-1-5,#n-1-4,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-1-6": "#n-1-6,#n-1-7,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-1-0,#n-0-0", "#n-1-7": "#n-1-7,#n-1-8,#n-1-9,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-1-0": "#n-1-0,#n-0-0", "#n-1-1": "#n-1-1,#n-1-0,#n-0-0", "#n-1-2": "#n-1-2,#n-1-1,#n-1-0,#n-0-0", "#n-1-3": "#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0", "#n-3-11": "#n-3-11,#n-3-0,#n-4-0,#n-5-0,#n-0-0", "#n-4-7": "#n-4-7,#n-5-7,#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-1-8": "#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0", "#n-1-9": "#n-1-9,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-0-9": "#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-0-8": "#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-4-11": "#n-4-11,#n-5-11,#n-5-0,#n-0-0", "#n-2-9": "#n-2-9,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0", "#n-2-8": "#n-2-8,#n-2-9,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0", "#n-0-1": "#n-0-1,#n-0-0", "#n-2-6": "#n-2-6,#n-2-7,#n-2-8,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-1-0,#n-0-0", "#n-2-5": "#n-2-5,#n-2-4,#n-2-3,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-2-4": "#n-2-4,#n-2-3,#n-1-3,#n-1-2,#n-1-1,#n-0-1,#n-0-0", "#n-0-5": "#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-2-2": "#n-2-2,#n-2-1,#n-1-1,#n-1-0,#n-0-0", "#n-0-7": "#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-2-0": "#n-2-0,#n-1-0,#n-0-0", "#n-0-3": "#n-0-3,#n-0-2,#n-0-1,#n-0-0", "#n-5-6": "#n-5-6,#n-5-7,#n-5-8,#n-5-9,#n-0-9,#n-0-10,#n-0-11,#n-0-0", "#n-2-3": "#n-2-3,#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0", "#n-4-5": "#n-4-5,#n-4-4,#n-5-4,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0", "#n-2-7": "#n-2-7,#n-2-8,#n-2-9,#n-1-9,#n-1-10,#n-0-10,#n-0-11,#n-0-0", "#n-0-2": "#n-0-2,#n-0-1,#n-0-0", "#n-3-10": "#n-3-10,#n-2-10,#n-2-11,#n-2-0,#n-1-0,#n-0-0", "#n-4-10": "#n-4-10,#n-5-10,#n-5-11,#n-0-11,#n-0-0", "#n-2-10": "#n-2-10,#n-2-11,#n-1-11,#n-0-11,#n-0-0", "#n-5-5": "#n-5-5,#n-5-4,#n-5-3,#n-5-2,#n-5-1,#n-5-0,#n-0-0", "#n-2-11": "#n-2-11,#n-1-11,#n-1-0,#n-0-0", "#n-0-6": "#n-0-6,#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0"}

// 4th table -  IDEAL - 18 18 17 18
var routing_table_from_json_file = {'#n-3-2': '#n-3-2,#n-2-2,#n-2-1,#n-1-1,#n-0-1,#n-0-0', '#n-3-3': '#n-3-3,#n-2-3,#n-2-2,#n-1-2,#n-1-1,#n-1-0,#n-0-0', '#n-3-0': '#n-3-0,#n-2-0,#n-1-0,#n-0-0', '#n-3-1': '#n-3-1,#n-3-0,#n-2-0,#n-1-0,#n-0-0', '#n-3-6': '#n-3-6,#n-3-7,#n-3-8,#n-3-9,#n-3-10,#n-3-11,#n-3-0,#n-2-0,#n-1-0,#n-0-0', '#n-3-7': '#n-3-7,#n-4-7,#n-4-8,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-3-4': '#n-3-4,#n-4-4,#n-4-3,#n-4-2,#n-4-1,#n-5-1,#n-5-0,#n-0-0', '#n-3-5': '#n-3-5,#n-3-4,#n-3-3,#n-3-2,#n-2-2,#n-2-1,#n-1-1,#n-1-0,#n-0-0', '#n-3-8': '#n-3-8,#n-3-9,#n-3-10,#n-3-11,#n-3-0,#n-4-0,#n-5-0,#n-0-0', '#n-3-9': '#n-3-9,#n-4-9,#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-5-8': '#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-0-11,#n-0-0', '#n-5-9': '#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-4-9': '#n-4-9,#n-4-10,#n-5-10,#n-0-10,#n-0-11,#n-0-0', '#n-4-8': '#n-4-8,#n-4-9,#n-5-9,#n-5-10,#n-5-11,#n-0-11,#n-0-0', '#n-4-4': '#n-4-4,#n-4-3,#n-4-2,#n-4-1,#n-5-1,#n-5-0,#n-0-0', '#n-5-0': '#n-5-0,#n-0-0', '#n-5-1': '#n-5-1,#n-5-0,#n-0-0', '#n-5-2': '#n-5-2,#n-5-1,#n-5-0,#n-0-0', '#n-5-3': '#n-5-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-4-1': '#n-4-1,#n-4-0,#n-5-0,#n-0-0', '#n-4-0': '#n-4-0,#n-5-0,#n-0-0', '#n-4-3': '#n-4-3,#n-4-2,#n-4-1,#n-5-1,#n-0-1,#n-0-0', '#n-4-2': '#n-4-2,#n-5-2,#n-0-2,#n-0-1,#n-0-0', '#n-4-6': '#n-4-6,#n-4-7,#n-4-8,#n-5-8,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-5-4': '#n-5-4,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0', '#n-5-10': '#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-5-11': '#n-5-11,#n-5-0,#n-0-0', '#n-0-11': '#n-0-11,#n-0-0', '#n-0-10': '#n-0-10,#n-0-11,#n-0-0', '#n-0-4': '#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-2-1': '#n-2-1,#n-2-0,#n-1-0,#n-0-0', '#n-5-7': '#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-1-10': '#n-1-10,#n-1-11,#n-1-0,#n-0-0', '#n-1-11': '#n-1-11,#n-1-0,#n-0-0', '#n-1-4': '#n-1-4,#n-1-3,#n-1-2,#n-0-2,#n-0-1,#n-0-0', '#n-1-5': '#n-1-5,#n-1-4,#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0', '#n-1-6': '#n-1-6,#n-0-6,#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-1-7': '#n-1-7,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0', '#n-1-0': '#n-1-0,#n-0-0', '#n-1-1': '#n-1-1,#n-1-0,#n-0-0', '#n-1-2': '#n-1-2,#n-0-2,#n-0-1,#n-0-0', '#n-1-3': '#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0', '#n-3-11': '#n-3-11,#n-4-11,#n-5-11,#n-5-0,#n-0-0', '#n-4-7': '#n-4-7,#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-1-8': '#n-1-8,#n-1-9,#n-1-10,#n-0-10,#n-0-11,#n-0-0', '#n-1-9': '#n-1-9,#n-1-10,#n-0-10,#n-0-11,#n-0-0', '#n-0-9': '#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-0-8': '#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-4-11': '#n-4-11,#n-5-11,#n-0-11,#n-0-0', '#n-2-9': '#n-2-9,#n-2-10,#n-2-11,#n-1-11,#n-1-0,#n-0-0', '#n-2-8': '#n-2-8,#n-1-8,#n-1-9,#n-1-10,#n-0-10,#n-0-11,#n-0-0', '#n-0-1': '#n-0-1,#n-0-0', '#n-2-6': '#n-2-6,#n-2-7,#n-2-8,#n-2-9,#n-2-10,#n-2-11,#n-1-11,#n-0-11,#n-0-0', '#n-2-5': '#n-2-5,#n-2-4,#n-1-4,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-2-4': '#n-2-4,#n-1-4,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-0-5': '#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-2-2': '#n-2-2,#n-2-1,#n-1-1,#n-1-0,#n-0-0', '#n-0-7': '#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-2-0': '#n-2-0,#n-1-0,#n-0-0', '#n-0-3': '#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-5-6': '#n-5-6,#n-5-5,#n-5-4,#n-5-3,#n-5-2,#n-5-1,#n-5-0,#n-0-0', '#n-2-3': '#n-2-3,#n-2-2,#n-2-1,#n-2-0,#n-1-0,#n-0-0', '#n-4-5': '#n-4-5,#n-4-4,#n-4-3,#n-5-3,#n-5-2,#n-0-2,#n-0-1,#n-0-0', '#n-2-7': '#n-2-7,#n-2-8,#n-2-9,#n-1-9,#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-0-2': '#n-0-2,#n-0-1,#n-0-0', '#n-3-10': '#n-3-10,#n-4-10,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-4-10': '#n-4-10,#n-5-10,#n-0-10,#n-0-11,#n-0-0', '#n-2-10': '#n-2-10,#n-2-11,#n-1-11,#n-1-0,#n-0-0', '#n-5-5': '#n-5-5,#n-5-4,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-2-11': '#n-2-11,#n-1-11,#n-1-0,#n-0-0', '#n-0-6': '#n-0-6,#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0'}

// 5th table -  IDEAL - 18 18 18 17
//var routing_table_from_json_file =  {'#n-3-2': '#n-3-2,#n-3-1,#n-3-0,#n-2-0,#n-1-0,#n-0-0', '#n-3-3': '#n-3-3,#n-3-2,#n-3-1,#n-2-1,#n-1-1,#n-0-1,#n-0-0', '#n-3-0': '#n-3-0,#n-2-0,#n-1-0,#n-0-0', '#n-3-1': '#n-3-1,#n-4-1,#n-4-0,#n-5-0,#n-0-0', '#n-3-6': '#n-3-6,#n-3-7,#n-3-8,#n-4-8,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-3-7': '#n-3-7,#n-3-8,#n-3-9,#n-2-9,#n-2-10,#n-2-11,#n-1-11,#n-1-0,#n-0-0', '#n-3-4': '#n-3-4,#n-2-4,#n-1-4,#n-1-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-3-5': '#n-3-5,#n-4-5,#n-5-5,#n-5-4,#n-5-3,#n-5-2,#n-5-1,#n-5-0,#n-0-0', '#n-3-8': '#n-3-8,#n-3-9,#n-4-9,#n-4-10,#n-5-10,#n-5-11,#n-0-11,#n-0-0', '#n-3-9': '#n-3-9,#n-4-9,#n-4-10,#n-4-11,#n-5-11,#n-5-0,#n-0-0', '#n-5-8': '#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-5-9': '#n-5-9,#n-5-10,#n-0-10,#n-0-11,#n-0-0', '#n-4-9': '#n-4-9,#n-4-10,#n-5-10,#n-0-10,#n-0-11,#n-0-0', '#n-4-8': '#n-4-8,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-4-4': '#n-4-4,#n-5-4,#n-5-3,#n-5-2,#n-5-1,#n-0-1,#n-0-0', '#n-5-0': '#n-5-0,#n-0-0', '#n-5-1': '#n-5-1,#n-5-0,#n-0-0', '#n-5-2': '#n-5-2,#n-5-1,#n-5-0,#n-0-0', '#n-5-3': '#n-5-3,#n-5-2,#n-5-1,#n-0-1,#n-0-0', '#n-4-1': '#n-4-1,#n-5-1,#n-0-1,#n-0-0', '#n-4-0': '#n-4-0,#n-5-0,#n-0-0', '#n-4-3': '#n-4-3,#n-4-2,#n-5-2,#n-5-1,#n-5-0,#n-0-0', '#n-4-2': '#n-4-2,#n-5-2,#n-5-1,#n-0-1,#n-0-0', '#n-4-6': '#n-4-6,#n-5-6,#n-5-5,#n-5-4,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-5-4': '#n-5-4,#n-5-3,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-5-10': '#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-5-11': '#n-5-11,#n-0-11,#n-0-0', '#n-0-11': '#n-0-11,#n-0-0', '#n-0-10': '#n-0-10,#n-0-11,#n-0-0', '#n-0-4': '#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-2-1': '#n-2-1,#n-1-1,#n-1-0,#n-0-0', '#n-5-7': '#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-1-10': '#n-1-10,#n-1-11,#n-1-0,#n-0-0', '#n-1-11': '#n-1-11,#n-0-11,#n-0-0', '#n-1-4': '#n-1-4,#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0', '#n-1-5': '#n-1-5,#n-1-4,#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0', '#n-1-6': '#n-1-6,#n-1-7,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0', '#n-1-7': '#n-1-7,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-1-0,#n-0-0', '#n-1-0': '#n-1-0,#n-0-0', '#n-1-1': '#n-1-1,#n-1-0,#n-0-0', '#n-1-2': '#n-1-2,#n-0-2,#n-0-1,#n-0-0', '#n-1-3': '#n-1-3,#n-1-2,#n-1-1,#n-1-0,#n-0-0', '#n-3-11': '#n-3-11,#n-4-11,#n-4-0,#n-5-0,#n-0-0', '#n-4-7': '#n-4-7,#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-0-10,#n-0-11,#n-0-0', '#n-1-8': '#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-0-11,#n-0-0', '#n-1-9': '#n-1-9,#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-0-9': '#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-0-8': '#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-4-11': '#n-4-11,#n-5-11,#n-5-0,#n-0-0', '#n-2-9': '#n-2-9,#n-2-10,#n-2-11,#n-2-0,#n-1-0,#n-0-0', '#n-2-8': '#n-2-8,#n-2-9,#n-2-10,#n-1-10,#n-1-11,#n-0-11,#n-0-0', '#n-0-1': '#n-0-1,#n-0-0', '#n-2-6': '#n-2-6,#n-2-5,#n-2-4,#n-2-3,#n-2-2,#n-1-2,#n-0-2,#n-0-1,#n-0-0', '#n-2-5': '#n-2-5,#n-2-4,#n-2-3,#n-2-2,#n-1-2,#n-1-1,#n-1-0,#n-0-0', '#n-2-4': '#n-2-4,#n-2-3,#n-2-2,#n-2-1,#n-2-0,#n-1-0,#n-0-0', '#n-0-5': '#n-0-5,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-2-2': '#n-2-2,#n-1-2,#n-0-2,#n-0-1,#n-0-0', '#n-0-7': '#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0', '#n-2-0': '#n-2-0,#n-1-0,#n-0-0', '#n-0-3': '#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-5-6': '#n-5-6,#n-5-7,#n-5-8,#n-5-9,#n-5-10,#n-5-11,#n-5-0,#n-0-0', '#n-2-3': '#n-2-3,#n-1-3,#n-1-2,#n-0-2,#n-0-1,#n-0-0', '#n-4-5': '#n-4-5,#n-5-5,#n-5-4,#n-0-4,#n-0-3,#n-0-2,#n-0-1,#n-0-0', '#n-2-7': '#n-2-7,#n-2-8,#n-1-8,#n-1-9,#n-1-10,#n-1-11,#n-1-0,#n-0-0', '#n-0-2': '#n-0-2,#n-0-1,#n-0-0', '#n-3-10': '#n-3-10,#n-4-10,#n-4-11,#n-5-11,#n-0-11,#n-0-0', '#n-4-10': '#n-4-10,#n-4-11,#n-5-11,#n-5-0,#n-0-0', '#n-2-10': '#n-2-10,#n-1-10,#n-1-11,#n-1-0,#n-0-0', '#n-5-5': '#n-5-5,#n-5-4,#n-5-3,#n-5-2,#n-5-1,#n-5-0,#n-0-0', '#n-2-11': '#n-2-11,#n-1-11,#n-1-0,#n-0-0', '#n-0-6': '#n-0-6,#n-0-7,#n-0-8,#n-0-9,#n-0-10,#n-0-11,#n-0-0'}

function average_of_an_array(array)
{
    var total = 0;
    for(var i = 0; i < array.length; i++) {
        total += array[i];
    }
    var avg = total / array.length;
    return avg;
}

function stddev_of_an_array(array)
{
    const n = array.length;
    const mean = array.reduce((a,b) => a+b)/n;
    return Math.sqrt(array.map(x => Math.pow(x-mean,2)).reduce((a,b) => a+b)/n);
}

function getRandomLinkDelay() {
    return NUMBER_OF_CYCLES_TO_TRANSMIT_A_FLIT;
}

function is_period_completed(packets) {
    for (var i = 0; i < packets.length; i++) {
        if (packets[i].status != "has_reached_master") return false;
    }
    return true;
}

function extract_i_j_from_id(id) {
    ret = [];
    var index_of_n = id.indexOf("n");
    ret.push(parseInt(id.substring(index_of_n+2, id.lastIndexOf("-")))); // add i
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

function get_random_link_transmission_delay()
{
    // var delay = LINK_TRANSMISSION_DELAY_CYCLES - LINK_TRANSMISSION_DELAY_DEVIATION;
    // return delay + Math.floor(Math.random() * Math.floor(LINK_TRANSMISSION_DELAY_DEVIATION*2+1));

    return LINK_TRANSMISSION_DELAY_CYCLES;
    
 
}

function gaussian(mean, stdev) 
{
    var y2;
    var use_last = false;
    // return function() {
        var y1;
        if(use_last) {
           y1 = y2;
           use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                 x1 = 2.0 * Math.random() - 1.0;
                 x2 = 2.0 * Math.random() - 1.0;
                 w  = x1 * x1 + x2 * x2;               
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
       }

       var retval = mean + stdev * y1;
       if(retval > 0) 
           return retval;
       return -retval;
   // }
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
                            "number_of_flits_left_to_send_in_a_packet": 0,
                            "number_of_collisions": 0,
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
                            "number_of_flits_left_to_send_in_a_packet": 0,
                            "number_of_collisions": 0,
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
                            "number_of_flits_left_to_send_in_a_packet": 0,
                            "number_of_collisions": 0,
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
                            "number_of_flits_left_to_send_in_a_packet": 0,
                            "number_of_collisions": 0,
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
// simulate_routing_table_with_synchronized_periods(new_routing_tabe, 5, 400);
simulate_routing_table_based_only_on_cycles(new_routing_tabe, 10000, 700);
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
function simulate_routing_table_with_synchronized_periods(routing_table_json, number_of_periods, number_of_cycles_per_period) {
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
        this.period = Math.round(gaussian(number_of_cycles_per_period, number_of_cycles_per_period_std_dev));


    }
    initialize_network()
    var packets = new Array();
    var packets_periods = new Array();
    var number_of_cycles_per_period_std_dev = number_of_cycles_per_period*CLOCK_JITTER_PERCENT;
    for (var k = 0; k < COLS * ROWS - 1; k++) {
        packets.push(new packet());
        packets_periods.push(Math.round(gaussian(number_of_cycles_per_period, number_of_cycles_per_period_std_dev)));
    }
    // console.log(packets_periods);
    // exit();
    // console.log(initial_packets_delays);
    // initialize packets
    for (var i = 0; i < packets.length; i++) {}
    // core simulation
    for (var preriod = 0; preriod < number_of_periods; preriod++) {
        console.log("STARTING PROCESSING PERIOD #" + preriod);
        // creating a copy of delays array which we are going to decrement

        var packets_periods_copy = packets_periods.slice();
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
                // if(cycle > 0 && cycle % packets_periods[i] == 0)
                // {
                //     if(packets[i].status == "has_reached_master")
                //     {
                //         packets[i].link_packet_is_in = "";
                //         packets[i].position_in_the_path = 0;
                //         packets[i].going_from = "";
                //         packets[i].going_to = "";
                //         packets[i].latency = 0;
                //         packets[i].origin = Object.keys(routing_table_json)[i];
                //         packets[i].current_node = Object.keys(routing_table_json)[i];
                //         packets[i].status = "inside_a_node";
                //         packets[i].path = routing_table_json[Object.keys(routing_table_json)[i]];
                //     }
                //     else
                //     {
                //         console.log("ERROR: attempting to send a packet when it was not received yet from the previous period");
                //     }
                // }
                
                var origin = Object.keys(routing_table_json)[i];
                var current_node = (routing_table_json[origin])[packets[i].position_in_the_path];
                // console.log(current_node);
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
            // finished processing packets for this cycle
            // now start processing links
            // on every 8th cycle all the links idle
            if (cycle%8 != 0) {
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
                            packets_current_processing_counters.splice(i, 1);
                            packets_currently_processing.splice(i, 1);
                        }
                    }
                    if (packets_about_to_be_processed.length == 0) {} else if (packets_about_to_be_processed.length == 1) {
                        // start processing the packet in the link
                        packets_currently_processing.push(packets_about_to_be_processed[0]);
                        packets[packets_about_to_be_processed[0]].status = "inside_a_link";
                        packets[packets_about_to_be_processed[0]].link_packet_is_in = link.data('id');
                        var o = get_random_link_transmission_delay();
                        // console.log(o);
                        
                        packets_current_processing_counters.push(o);
                        packets_about_to_be_processed.shift();
                    } else if (packets_about_to_be_processed.length > 1) {
                        // collision - choose the packet with the lower index
                        // var r_index = Math.floor(Math.random() * packets_about_to_be_processed.length);
                        // var r = packets_about_to_be_processed[r_index];
                        var r = Math.min(...packets_about_to_be_processed);
                        var r_index = packets_about_to_be_processed.indexOf(r);

                        packets_currently_processing.push(r);
                        packets[r].status = "inside_a_link";
                        packets[r].link_packet_is_in = link.data('id');
                        var o = get_random_link_transmission_delay();
                        // console.log(o + " + " + r);
                        // console.log(packets_about_to_be_processed);
                        packets_current_processing_counters.push(o);

                        packets_about_to_be_processed.splice(r_index, 1); // delete the element
                    } else {
                        console.log("ERROR processing packets in the links");
                        alert("STOPPING ");
                    }
                    link.json({ "data": { "packets_current_processing": packets_currently_processing } });
                    link.json({ "data": { "packets_about_to_be_processed": packets_about_to_be_processed } });
                    link.json({ "data": { "packets_current_processing_counter": packets_current_processing_counters } });
                });
            }
            // console.log("FINISHED PROCESSING CYCLE #" + cycle);
            // console.log("PACKETS");
            // console.log(packets);
            if (is_period_completed(packets)) {
                console.log("THE PERIOD IS COMPLETED WITHIN " + cycle + " CYCLES");
                break;
            }
        }
        if (!is_period_completed(packets)) {
            console.log("ERROR SIMULATING A PERIOD #" + preriod);
        }
    }
    // display status of the network
    console.log("\n\nDISPLAYING THE NETWORK");
    console.log(packets);
}




//---------------------
//
//     This function simulates clock drift - each packet has its own period
//     and it starts as soon as the previous one finishes, not waiting
//     on other packets
//
//---------------------


function simulate_routing_table_based_only_on_cycles(routing_table_json, number_of_total_cycles, number_of_cycles_per_period) {
    // console.log("SIMULATING the following routing table");
    // console.log(routing_table_json);
    for (var node in routing_table_json) {
        path = routing_table_json[node];
    }

    var number_of_cycles_per_period_std_dev = number_of_cycles_per_period*CLOCK_JITTER_PERCENT;

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
        this.periods = [];
        // this.period = Math.round(gaussian(number_of_cycles_per_period, number_of_cycles_per_period_std_dev));
        this.start_cycle_of_current_period = [];
        this.stdev_of_latencies = 0;
        this.number_of_collisions = 0;
        this.number_stall_cycles = 0;
        this.packet_conflicting_with = "";
    }
    initialize_network()
    var packets = new Array();
    // var packets_periods = new Array();
    
    for (var k = 0; k < COLS * ROWS - 1; k++) {
        packets.push(new packet());
        // packets_periods.push(Math.round(gaussian(number_of_cycles_per_period, number_of_cycles_per_period_std_dev)));
    }
    // console.log(packets_periods);
    // exit();
    // console.log(initial_packets_delays);
    // initialize packets
    for (var i = 0; i < packets.length; i++) {}
    // core simulation
    // for (var preriod = 0; preriod < number_of_periods; preriod++) {
        // console.log("STARTING PROCESSING PERIOD #" + preriod);
        // creating a copy of delays array which we are going to decrement

        // var packets_periods_copy = packets_periods.slice();
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
            packets[i].start_cycle_of_current_period.push(0); 
            packets[i].periods.push(Math.round(gaussian(number_of_cycles_per_period, number_of_cycles_per_period_std_dev)));
        }
        for (var cycle = 0; cycle < number_of_total_cycles; cycle++) {
            // console.log("STARTING PROCESSING CYCLE #" + cycle);
            for (var i = 0; i < packets.length; i++) {
                // if the master thinks that the new period should start
                if(cycle%number_of_cycles_per_period == 0)
                {
                    packets[i].latency = 0;
                }

                // when an actual new period starts
                if(cycle > 0 && cycle == packets[i].periods[packets[i].periods.length-1] + packets[i].start_cycle_of_current_period[packets[i].start_cycle_of_current_period.length-1])
                {
                    // create a new number for the period
                    packets[i].periods.push(Math.round(gaussian(number_of_cycles_per_period, number_of_cycles_per_period_std_dev)));
                    packets[i].start_cycle_of_current_period.push(cycle);

                    if(packets[i].status == "has_reached_master")
                    {
                        // if(i == 10)
                        // console.log("packet " + i + " starts a new period");
                        packets[i].link_packet_is_in = "";
                        packets[i].position_in_the_path = 0;
                        packets[i].going_from = "";
                        packets[i].going_to = "";
                        // packets[i].latency = 0;
                        packets[i].origin = Object.keys(routing_table_json)[i];
                        packets[i].current_node = Object.keys(routing_table_json)[i];
                        packets[i].status = "inside_a_node";
                        packets[i].path = routing_table_json[Object.keys(routing_table_json)[i]];
                    }
                    else
                    {
                        console.log("ERROR: attempting to send a packet " + i + " when it was not received yet from the previous period");
                    }
                }
                
                var origin = Object.keys(routing_table_json)[i];
                var current_node = (routing_table_json[origin])[packets[i].position_in_the_path];
                // console.log(current_node);
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
                            // packets[i].latency++;
                            break;
                        case "inside_a_link":
                            packets[i].latency++;
                            break;
                        default:
                            alert("STOPPING ");
                            break;
                    }
                

            }
            // finished processing packets for this cycle
            // now start processing links
            // on every 8th cycle all the links idle
            if (cycle%8 != 0) {
                cy.edges().forEach(function(link) {

                    // console.log("processing link " + link.data('id'));
                    var packets_currently_processing = link.data('packets_current_processing');
                    var packets_about_to_be_processed = link.data('packets_about_to_be_processed');
                    var packets_current_processing_counters = link.data('packets_current_processing_counter');
                    var number_of_flits_left_to_send_in_a_packet = link.data('number_of_flits_left_to_send_in_a_packet');
                    var number_of_collisions = link.data('number_of_collisions');
                    var number_stall_cycles = link.data('number_stall_cycles');
                    var packet_conflicting_with_cycle_ago = link.data('packet_conflicting_with');



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
                            packets_current_processing_counters.splice(i, 1);
                            packets_currently_processing.splice(i, 1);
                        }
                    }
                    if (packets_about_to_be_processed.length == 0) {} else if (packets_about_to_be_processed.length == 1) {
                        if(number_of_flits_left_to_send_in_a_packet == 0)
                        {
                            // start processing the packet in the link
                            packets_currently_processing.push(packets_about_to_be_processed[0]);
                            packets[packets_about_to_be_processed[0]].status = "inside_a_link";
                            packets[packets_about_to_be_processed[0]].link_packet_is_in = link.data('id');
                            var o = get_random_link_transmission_delay();
                            // console.log(o);
                            
                            packets_current_processing_counters.push(o);
                            packets_about_to_be_processed.shift();
                            number_of_flits_left_to_send_in_a_packet = NUMMBER_OF_FLITS_PER_PACKET+1;
                        }
                        else
                        {
                            packets[packets_about_to_be_processed[0]].number_of_collisions++;
                            number_of_collisions++;
                            if (packets[packets_about_to_be_processed[0]].path.length == 2)
                            {
                            	console.log("Cycle - " + cycle);
                            	console.log("packet #" + packets_about_to_be_processed[0] + " from " + packets[packets_about_to_be_processed[0]].origin);
                            	console.log("is waiting for " + packets_currently_processing);
                            }
                            //packet_conflicting_with
                        }
                    } else if (packets_about_to_be_processed.length > 1) {
                        if(number_of_flits_left_to_send_in_a_packet == 0)
                        {
                            // collision - choose the packet with the lower index
                            // var r_index = Math.floor(Math.random() * packets_about_to_be_processed.length);
                            // var r = packets_about_to_be_processed[r_index];
                            var r = Math.min(...packets_about_to_be_processed);
                            var r_index = packets_about_to_be_processed.indexOf(r);

                            packets_currently_processing.push(r);
                            packets[r].status = "inside_a_link";
                            packets[r].link_packet_is_in = link.data('id');
                            var o = get_random_link_transmission_delay();
                            // console.log(o + " + " + r);
                            // console.log(packets_about_to_be_processed);
                            packets_current_processing_counters.push(o);

                            packets_about_to_be_processed.splice(r_index, 1); // delete the element
                            number_of_flits_left_to_send_in_a_packet = NUMMBER_OF_FLITS_PER_PACKET+1;
                        }
                        else
                        {
                            packets_about_to_be_processed.forEach(
                                function(el)
                                { 
                                    packets[el].number_of_collisions++;
                                    if (packets[el].path.length == 2)
		                            {
		                            	console.log("Cycle - " + cycle);
                            			console.log("packet #" + packets[el] + " from " + packets[packets[el]].origin);
                            			console.log("is waiting for #" + packets_currently_processing[0] + " from " + packets[packets_currently_processing[0]].origin);
		                            }
                                }
                            );
                            number_of_collisions++;
                        }
                    } else {
                        console.log("ERROR processing packets in the links");
                        alert("STOPPING ");
                    }

                    if(number_of_flits_left_to_send_in_a_packet>0) 
                        number_of_flits_left_to_send_in_a_packet--;

                    link.json({ "data": { "packets_current_processing": packets_currently_processing } });
                    link.json({ "data": { "packets_about_to_be_processed": packets_about_to_be_processed } });
                    link.json({ "data": { "packets_current_processing_counter": packets_current_processing_counters } });
                    link.json({ "data": { "number_of_flits_left_to_send_in_a_packet": number_of_flits_left_to_send_in_a_packet } });
                    link.json({ "data": { "number_of_collisions": number_of_collisions } });
                    link.json({ "data": { "number_stall_cycles": number_stall_cycles } });
                    link.json({ "data": { "packet_conflicting_with": packet_conflicting_with_cycle_ago } });
                });
            }
            // console.log("FINISHED PROCESSING CYCLE #" + cycle);
            // console.log("PACKETS");
            // console.log(packets);
            // if (is_period_completed(packets)) {
            //     console.log("THE PERIOD IS COMPLETED WITHIN " + cycle + " CYCLES");
            //     break;
            // }
        }
        // if (!is_period_completed(packets)) {
        //     console.log("ERROR SIMULATING A PERIOD #" + preriod);
        // }
    
    // display status of the network
    console.log("\n\nCALCULATING LATENCIES");
    // for (var i = 0; i < packets.length; i++) {
    //     // packets[i].stdev_of_latencies = stddev_of_an_array(packets[i].latencies_over_periods);

    // }

    for(var i = 1; i <= ((COLS+ROWS)+1)/2; i++)
    {
        console.log("\nFor " + i + " hops:");
        var average = 0;
        var array_of_latencies = new Array();
        for (var j = 0; j < packets.length; j++) 
        {
            if(packets[j].path.length == i+1)
            {
                for(var k=0; k < packets[j].latencies_over_periods.length; k++)
                {
                    array_of_latencies.push((packets[j].latencies_over_periods)[k]);
                }
                
            }
        }
        console.log("jitter = " +  (Math.round((stddev_of_an_array(array_of_latencies) + Number.EPSILON) * 1000) / 1000));
        // console.log( array_of_latencies)
        // console.log("average latency: " + average_of_an_array(array_of_latencies) + " cycles");

    }

    // console.log("\n\nDISPLAYING THE NETWORK");
    // console.log(packets);

    // console.log("\n\nDISPLAYING THE LINKS");
    // cy.edges().forEach(function(link) {
    //     console.log(link.data('number_of_collisions'));
        // console.log(link.data('packets_current_processing_counter'));
        // console.log(link.data('number_of_flits_left_to_send_in_a_packet'));
        
        // console.log(link.data('packets_current_processing'));
        // });


    // calculating how many collisions happen for packets with different hop counts
    console.log("\n\n\n Calculating how many collisions happen for packets with different hop counts");
    for(var i = 1; i <= ((COLS+ROWS)+1)/2; i++)
    {
        console.log("\nFor " + i + " hops:");
        var sum = 0;
        for (var j = 0; j < packets.length; j++) 
        {
            if(packets[j].path.length == i+1)
            {
                console.log(packets[j].number_of_collisions + " cycles");
                sum += packets[j].number_of_collisions;
            }
        }
        console.log("TOTAL: " + sum + " cycles");
    }


    //calculating how many collisions happen for packets with different hop counts
    // console.log("\n\n\n Calculating how many collisions happen for links ");
    // for(var i = 1; i <= ((COLS+ROWS)+1)/2; i++)
    // {
    //     console.log("\nFor " + i + " hops:");
    //     var sum = 0;

    //     for (var j = 0; j < packets.length; j++) 
    //     {
    //         if(packets[j].path.length == i+1)
    //         {
    //             cy.edges().forEach(function(link) {
    //                 if((('#' + link.data('source')).localeCompare(packets[j].path[packets[j].path.length-1]) == 0) && 
    //                     (('#' + link.data('target')).localeCompare(packets[j].path[packets[j].path.length-2]) == 0)) 
    //                     {
    //                         console.log(link.data('id') + " " + link.data('number_of_collisions') + " cycles");
    //                         sum += link.data('number_of_collisions')
    //                     }
    //                 else{ if((('#' + link.data('source')).localeCompare(packets[j].path[packets[j].path.length-2]) == 0) && 
    //                     (('#' + link.data('target')).localeCompare(packets[j].path[packets[j].path.length-1]) == 0)) 
    //                     {
    //                         console.log(link.data('id') + " " + link.data('number_of_collisions') + " cycles");
    //                         sum += link.data('number_of_collisions')
    //                     }  }  

    //             });

                
    //         }
    //     }
        
    //     console.log("TOTAL: " + sum + " cycles");
    // }
    // cy.edges().forEach(function(link) {
    //     console.log(link.data('id') + " " + link.data('number_of_collisions') + " cycles"); 
    // });

    // testing gaussian and std-dev functions
    // var dummyarray = new Array();
    // for (var k = 0; k < 1000; k++) {
    //     dummyarray.push(Math.round(gaussian(number_of_cycles_per_period, number_of_cycles_per_period_std_dev)));
    // }

    // console.log("checking jitter = " +  (Math.round((stddev_of_an_array(dummyarray) + Number.EPSILON) * 1000) / 1000));
    // console.log(dummyarray);


}

// failure modes
// allow multiple packets to be sent from one master - overlapping 