f.write("\\ each packet not at master must move one position in one tick or stay in the same node\n")
for pi in range(ROWS):
	for pj in range(COLS):
		if(pi==0 and pj==0):
			continue
		f.write("\\ packet " + str(pi) + "_" + str(pj) + " \n")
		for t in range(NUMBER_OF_TICKS-1):
			for ni in range(ROWS):
				for nj in range(COLS):
					if(ni==0 and nj==0):
						continue
					neighbors = get_neighbors_for_node([ni, nj])
					f.write("P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[0][0])+"_"+str(neighbors[0][1])+" + P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[1][0])+"_"+str(neighbors[1][1])+" + P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[2][0])+"_"+str(neighbors[2][1])+" + P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[3][0])+"_"+str(neighbors[3][1])+" + P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(ni)+"_"+str(nj)+" - P_"+str(pi)+"_"+str(pj)+"_T_"+str(t)+"_N_"+str(ni)+"_"+str(nj)+" >= 0\n")


def get_neighbors_for_node_excluding_going_backwards(node_coordinates, quater):
	node_row = node_coordinates[0]
	node_col = node_coordinates[1]
	top_row = (node_row - 1) if (node_row != 0) else ROWS-1
	top_col = node_col
	bot_row = (node_row + 1) if (node_row != ROWS-1) else 0
	bot_col = node_col
	left_row = node_row
	left_col = (node_col - 1) if (node_col != 0) else COLS-1
	right_row = node_row
	right_col = (node_col + 1) if (node_col != COLS-1) else 0
	if(quater == "IV"):
		return [[top_row, top_col], [left_row, left_col]]
	elif(quater == "I"):
		return [[right_row, right_col], [bot_row, bot_col]]
	elif(quater == "II"):
		return [[bot_row, bot_col], [left_row, left_col]]
	elif(quater == "III"):
		return [[top_row, top_col], [left_row, left_col]]
	else:
		print("!!!ERROR!!! quater has to be 1, 2, 3, 4")

# OPTIMIZATION: NODES CANT SEND PACKETS BACKWARDS
# if node is in quater IV
if(ni < ROWS/2.0 and nj < COLS/2.0):
	neighbors = get_neighbors_for_node([ni, nj], "IV")
	f.write("P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[0][0])+"_"+str(neighbors[0][1])+" + P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[1][0])+"_"+str(neighbors[1][1])+" - P_"+str(pi)+"_"+str(pj)+"_T_"+str(t)+"_N_"+str(ni)+"_"+str(nj)+" >= 0\n")
# if node is in quater III
elif(ni < ROWS/2.0 and nj > COLS/2.0):
	neighbors = get_neighbors_for_node([ni, nj], "III")
	f.write("P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[0][0])+"_"+str(neighbors[0][1])+" + P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[1][0])+"_"+str(neighbors[1][1])+" - P_"+str(pi)+"_"+str(pj)+"_T_"+str(t)+"_N_"+str(ni)+"_"+str(nj)+" >= 0\n")
# if node is in quater II
elif(ni > ROWS/2.0 and nj < COLS/2.0):
	neighbors = get_neighbors_for_node([ni, nj], "II")
	f.write("P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[0][0])+"_"+str(neighbors[0][1])+" + P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[1][0])+"_"+str(neighbors[1][1])+" - P_"+str(pi)+"_"+str(pj)+"_T_"+str(t)+"_N_"+str(ni)+"_"+str(nj)+" >= 0\n")
# if node is in quater I
elif(ni > ROWS/2.0 and nj > COLS/2.0):
	neighbors = get_neighbors_for_node([ni, nj], "I")
	f.write("P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[0][0])+"_"+str(neighbors[0][1])+" + P_"+str(pi)+"_"+str(pj)+"_T_"+str(t+1)+"_N_"+str(neighbors[1][0])+"_"+str(neighbors[1][1])+" - P_"+str(pi)+"_"+str(pj)+"_T_"+str(t)+"_N_"+str(ni)+"_"+str(nj)+" >= 0\n")
# if node is on the same row as master
elif(ni > ROWS/2.0 and nj > COLS/2.0):
	neighbors = get_neighbors_for_node([ni, nj], "I")








