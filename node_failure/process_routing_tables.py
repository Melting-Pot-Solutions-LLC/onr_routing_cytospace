#!/usr/bin/env python3

"""
GLOBAL VARIABLES
"""
ROWS = 5
COLS = 5

link_load = []
for i in range(ROWS*COLS*2):
	link_load.append(0)


"""
SUPPORTING FUNCTIONS
"""
def separate(array,separator):
	results = []
	a = array[:]
	i = 0
	while i<=len(a)-len(separator):
		if a[i:i+len(separator)]==separator:
			results.append(a[:i])
			a = a[i+len(separator):]
			i = 0
		else: i+=1
	results.append(a)
	return results


def enumerate_random_paths(array_of_paths):
	final_routing_table = {}
	for node, paths in array_of_paths.items():
		i = random.randint(0, len(array_of_paths[node])-1)
		final_routing_table[node] = paths[i]
	return final_routing_table

def extract_coordinates_from_node(node_string):
	ret = [];
	new_node_string = node_string.replace("#n-", "")
	ret.append(int(new_node_string[:new_node_string.index(-)])); # add i
	ret.append(int(new_node_string[new_node_string.index(-)+1:])); # add j
	return ret;

def get_direction_of_link(node_from, node_to):
	if(node_from[0] == node_to[0]):  # vertical edge
		if(node_from[1] - node_to[1] == 1 or node_to[1] - node_from[1] == ROWS):
			return "up"
		else:
			return "down"
	elif (node_from[1] == node_to[1]):  # horizontal edge
		if(node_to[0] - node_from[0] == 1 or node_from[0] - node_to[0] == COLS):
			return "right"
		else:
			return "left"
	else:
		print("ERROR PROCESSING ROUTING TABLE")



def fully_process_routing_table(current_routing_table):
	global link_load

	# STEP 1: process the routing table for the first time, update the edges weights according to how many messages will go along each link
	for node, path in current_routing_table.items():
		array_of_nodes_in_path = path.split(",")
		for i in range(1, len(array_of_nodes_in_path)-1):
			node_to = extract_coordinates_from_node(array_of_nodes_in_path[i])
			node_from = extract_coordinates_from_node(array_of_nodes_in_path[i-1])
			direction = get_direction_of_link(node_from, node_to)
			if(direction == "up"):
			elif (direction == "down"):
			elif (direction == "right"):
			else: #left
				






    # var right=0;
    # var bot=0;
    # var left=0;
    # var top=0;

    # // STEP 1: process the routing table for the first time, update the edges weights according to how many messages will go along each link
    # for (var i = 0; i < current_routing_table.length; i++)
    # {
    #   if (i%2==0) continue; // skip the node IDs
    #   else
    #   {

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
    #   }
    # }



    // STEP 2: process the routing table second time to calculate the max load seen by a packet
    var max_total_load_seen_by_packet = 0;
    var max_total_load_seen_by_packet_over_number_of_hops = 0;
    for (var i = 0; i < current_routing_table.length; i++)
    {
      if (i%2==0) continue; // skip the node IDs
      else
      {
        var load_seen_by_packet = 0;

        for (var j = 1; j < current_routing_table[i].length; j++)
        {


          var current_node_id = current_routing_table[i][j];
          var prev_node_id = current_routing_table[i][j-1];
          var edge_id_1 = "#e-" + extract_i_j_from_id(current_node_id)[0]+"-"+extract_i_j_from_id(current_node_id)[1]+ "--" + extract_i_j_from_id(prev_node_id)[0]+"-"+extract_i_j_from_id(prev_node_id)[1];
          var edge_id_2 = "#e-" + extract_i_j_from_id(prev_node_id)[0]+"-"+extract_i_j_from_id(prev_node_id)[1]+ "--" + extract_i_j_from_id(current_node_id)[0]+"-"+extract_i_j_from_id(current_node_id)[1];

          if (cy.$(edge_id_1).inside())
          {
            load_seen_by_packet += cy.$(edge_id_1).data().weight
          } 
          else if (cy.$(edge_id_2).inside())
          {
            load_seen_by_packet += cy.$(edge_id_2).data().weight
          }
          else console.log("ERROR finding edge");
        }

        // check if this load is bigger than before
        if(load_seen_by_packet > max_total_load_seen_by_packet)
        {
          max_total_load_seen_by_packet = load_seen_by_packet;
          max_total_load_seen_by_packet_over_number_of_hops = Math.round(max_total_load_seen_by_packet/(current_routing_table[i].length-1));
        }
      }
    }
    data_total_load_seen_by_packet.push(max_total_load_seen_by_packet);
    data_total_load_seen_by_packet_divided_by_number_of_hops.push(max_total_load_seen_by_packet_over_number_of_hops);



    x.push(Math.max(right, bot, top, left));
    number_of_random_routs++;


  }





"""
DESCRIPTION GOES HERE
"""

import sys
import os
import traceback
import argparse
import time
import logging
import random

file = open("save.txt","r+")
print("PROCESSING ROUTING TABLES")

ar=[]
ar = file.read().splitlines()
# print(ar)
# for line in file:
	# print(line)

# print(separate(ar, ""))


my_dict = {}

my_dict[ar[0]] = [ar[1]]
i=2
j=0
while i<(len(ar)-1):
	if(ar[i]==""):
		j = i+1
		i = i+1
		my_dict[ar[j]] = [];
	else:
		my_dict[ar[j]].append(ar[i])
	i = i+1
 


# generate a routing table
for i in range(100):
	routing_table = enumerate_random_paths(my_dict)

# process routing tables







file.close()




