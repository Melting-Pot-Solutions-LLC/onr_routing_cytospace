#!/usr/bin/env python3

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


def enumerate_random_paths(array_of_paths, current_routing_table, level):
	if (level == len(array_of_paths):
		fully_process_routing_table(current_routing_table)
	else:
		

  var i = Math.floor((Math.random()*(array_of_paths[level].length-1))+1);

    var current_routing_table_clone = current_routing_table.slice(0);
    current_routing_table_clone.push(array_of_paths[level][0]); #push the node id of which the path is pushed
    current_routing_table_clone.push(array_of_paths[level][i]); # push the path itself
    enumerate_random_paths(array_of_paths, current_routing_table_clone, level+1);


"""
DESCRIPTION GOES HERE
"""

import sys
import os
import traceback
import argparse
import time
import logging

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
 

print(my_dict)
# for a in ar:
# 	if a=="":
# 		print("found split")







file.close()




