#!/usr/bin/env python3

import matplotlib.pyplot as plt
import numpy as np
# %matplotlib inline




"""
GLOBAL VARIABLES
"""
ROWS = 10
COLS = 10

link_load = []
max_total_load_seen_by_packet_over_number_of_hops_array = []
max_total_load_seen_by_packet_array = []

for i in range(ROWS*COLS*2):
	link_load.append(0)


"""
SUPPORTING FUNCTIONS
"""

def reset_link_load():
	global link_load
	link_load = []
	for i in range(ROWS*COLS*2):
		link_load.append(0)

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
	ret.append(int(new_node_string[:new_node_string.index("-")])); # add i
	ret.append(int(new_node_string[new_node_string.index("-")+1:])); # add j
	return ret;

def get_direction_of_link(node_from, node_to):
	if(node_from[0] == node_to[0]):  # vertical edge
		if(node_from[1] - node_to[1] == 1 or node_to[1] - node_from[1] == ROWS-1):
			return "up"
		else:
			return "down"
	elif (node_from[1] == node_to[1]):  # horizontal edge
		if(node_to[0] - node_from[0] == 1 or node_from[0] - node_to[0] == COLS-1):
			return "right"
		else:
			return "left"
	else:
		print("ERROR PROCESSING ROUTING TABLE")



def fully_process_routing_table(current_routing_table):
	global link_load
	reset_link_load()

	# STEP 1: process the routing table for the first time, update the edges weights according to how many messages will go along each link
	for node, path in current_routing_table.items():
		# print("\n")
		# print("PROCESSING PATHS for " + node)
		array_of_nodes_in_path = path.split(",")
		for i in range(1, len(array_of_nodes_in_path)):
			node_to = extract_coordinates_from_node(array_of_nodes_in_path[i])
			node_from = extract_coordinates_from_node(array_of_nodes_in_path[i-1])
			direction = get_direction_of_link(node_from, node_to)
			edge_number = 0
			base_edge = node_from[1]*COLS*2 + node_from[0]
			if(direction == "up"):
				edge_number = base_edge  - COLS
				# print("up")
			elif (direction == "down"):
				edge_number = base_edge  + COLS
				# print("down")
			elif (direction == "right"):
				edge_number = base_edge 
				# print("right")
			elif (direction == "left"): #left
				edge_number = base_edge - 1
				# print("left")
			else:
				print("ERROR DETERMINING THE DIRECTION OF THE MESSAGE")
			# print("Increasing edge count for #" + str(edge_number))
			link_load[edge_number] = link_load[edge_number] + 1
	# print(link_load)

	# STEP 2: process the routing table second time to calculate the max load seen by a packet
	max_total_load_seen_by_packet = 0
	max_total_load_seen_by_packet_over_number_of_hops = 0
	for node, path in current_routing_table.items():
		load_seen_by_packet = 0
		array_of_nodes_in_path = path.split(",")
		for i in range(1, len(array_of_nodes_in_path)):
			node_to = extract_coordinates_from_node(array_of_nodes_in_path[i])
			node_from = extract_coordinates_from_node(array_of_nodes_in_path[i-1])
			direction = get_direction_of_link(node_from, node_to)
			edge_number = 0
			base_edge = node_from[1]*COLS*2 + node_from[0]
			if(direction == "up"):
				edge_number = base_edge  - COLS
				# print("up")
			elif (direction == "down"):
				edge_number = base_edge  + COLS
				# print("down")
			elif (direction == "right"):
				edge_number = base_edge 
				# print("right")
			elif (direction == "left"): #left
				edge_number = base_edge - 1
				# print("left")
			else:
				print("ERROR DETERMINING THE DIRECTION OF THE MESSAGE")
			load_seen_by_packet = load_seen_by_packet + link_load[edge_number]
			# print("load_seen_by_packet " + str(load_seen_by_packet))
		if load_seen_by_packet > max_total_load_seen_by_packet :
			max_total_load_seen_by_packet = load_seen_by_packet
			max_total_load_seen_by_packet_over_number_of_hops = float(max_total_load_seen_by_packet) / (len(array_of_nodes_in_path)-1)
	# print("max_total_load_seen_by_packet - " + str(max_total_load_seen_by_packet))
	# print("max_total_load_seen_by_packet_over_number_of_hops - " + str(max_total_load_seen_by_packet_over_number_of_hops))
	max_total_load_seen_by_packet_over_number_of_hops_array.append(max_total_load_seen_by_packet_over_number_of_hops)
	max_total_load_seen_by_packet_array.append(max_total_load_seen_by_packet)








	#   // STEP 2: process the routing table second time to calculate the max load seen by a packet
	#   var max_total_load_seen_by_packet = 0;
	#   var max_total_load_seen_by_packet_over_number_of_hops = 0;
	#   for (var i = 0; i < current_routing_table.length; i++)
	#   {
	#     if (i%2==0) continue; // skip the node IDs
	#     else
	#     {
	#       var load_seen_by_packet = 0;

	#       for (var j = 1; j < current_routing_table[i].length; j++)
	#       {


	#         var current_node_id = current_routing_table[i][j];
	#         var prev_node_id = current_routing_table[i][j-1];
	#         var edge_id_1 = "#e-" + extract_i_j_from_id(current_node_id)[0]+"-"+extract_i_j_from_id(current_node_id)[1]+ "--" + extract_i_j_from_id(prev_node_id)[0]+"-"+extract_i_j_from_id(prev_node_id)[1];
	#         var edge_id_2 = "#e-" + extract_i_j_from_id(prev_node_id)[0]+"-"+extract_i_j_from_id(prev_node_id)[1]+ "--" + extract_i_j_from_id(current_node_id)[0]+"-"+extract_i_j_from_id(current_node_id)[1];

	#         if (cy.$(edge_id_1).inside())
	#         {
	#           load_seen_by_packet += cy.$(edge_id_1).data().weight
	#         } 
	#         else if (cy.$(edge_id_2).inside())
	#         {
	#           load_seen_by_packet += cy.$(edge_id_2).data().weight
	#         }
	#         else console.log("ERROR finding edge");
	#       }

	#       // check if this load is bigger than before
	#       if(load_seen_by_packet > max_total_load_seen_by_packet)
	#       {
	#         max_total_load_seen_by_packet = load_seen_by_packet;
	#         max_total_load_seen_by_packet_over_number_of_hops = Math.round(max_total_load_seen_by_packet/(current_routing_table[i].length-1));
	#       }
	#     }
	#   }
	#   data_total_load_seen_by_packet.push(max_total_load_seen_by_packet);
	#   data_total_load_seen_by_packet_divided_by_number_of_hops.push(max_total_load_seen_by_packet_over_number_of_hops);



	#   x.push(Math.max(right, bot, top, left));
	#   number_of_random_routs++;


	# }





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
	fully_process_routing_table(routing_table)
	# print("Table is processed")
	# if(i%100 == 0 and i != 0):
	# print("done with another 100 routing tables")

# print("\n")
# print("max_total_load_seen_by_packet_array - " + str(max_total_load_seen_by_packet_array))
# print("max_total_load_seen_by_packet_over_number_of_hops_array - " + str(max_total_load_seen_by_packet_over_number_of_hops_array))


# routing_table = enumerate_random_paths(my_dict)
# routing_table = {'#n-3-2': '#n-3-2,#n-4-2,#n-4-1,#n-4-0,#n-0-0', '#n-3-3': '#n-3-3,#n-3-4,#n-4-4,#n-4-0,#n-0-0', '#n-3-0': '#n-3-0,#n-4-0,#n-0-0', '#n-3-1': '#n-3-1,#n-4-1,#n-0-1,#n-0-0', '#n-3-4': '#n-3-4,#n-3-0,#n-4-0,#n-0-0', '#n-4-4': '#n-4-4,#n-4-0,#n-0-0', '#n-4-1': '#n-4-1,#n-4-0,#n-0-0', '#n-4-0': '#n-4-0,#n-0-0', '#n-4-3': '#n-4-3,#n-4-4,#n-4-0,#n-0-0', '#n-4-2': '#n-4-2,#n-0-2,#n-0-1,#n-0-0', '#n-0-2': '#n-0-2,#n-0-1,#n-0-0', '#n-2-2': '#n-2-2,#n-2-1,#n-2-0,#n-1-0,#n-0-0', '#n-1-4': '#n-1-4,#n-0-4,#n-0-0', '#n-1-0': '#n-1-0,#n-0-0', '#n-1-1': '#n-1-1,#n-0-1,#n-0-0', '#n-1-2': '#n-1-2,#n-0-2,#n-0-1,#n-0-0', '#n-1-3': '#n-1-3,#n-1-4,#n-1-0,#n-0-0', '#n-0-1': '#n-0-1,#n-0-0', '#n-0-3': '#n-0-3,#n-0-4,#n-0-0', '#n-2-4': '#n-2-4,#n-1-4,#n-0-4,#n-0-0', '#n-2-3': '#n-2-3,#n-2-4,#n-1-4,#n-1-0,#n-0-0', '#n-0-4': '#n-0-4,#n-0-0', '#n-2-1': '#n-2-1,#n-1-1,#n-0-1,#n-0-0', '#n-2-0': '#n-2-0,#n-1-0,#n-0-0'}
# print(routing_table)
# fully_process_routing_table(routing_table)

#[0, 2, 1, 2, 2, 5, 1, 1, 2, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 3, 3, 1, 2, 1, 0, 2, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]




file.close()
x = np.random.normal(size = 1000)
plt.hist(max_total_load_seen_by_packet_over_number_of_hops_array) # density
plt.ylabel('Probability')
plt.show()
print(x)



