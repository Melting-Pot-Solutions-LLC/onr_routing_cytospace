#!/usr/bin/env python3.7

# Copyright 2020, Gurobi Optimization, LLC

# This example reads an LP model from a file and solves it.
# If the model is infeasible or unbounded, the example turns off
# presolve and solves the model again. If the model is infeasible,
# the example computes an Irreducible Inconsistent Subsystem (IIS),
# and writes it to a file


# helper routines
def create_routing_table_from_array_of_lp_variables(packets_in_nodes):
    # create a dict where eac packet would be an item
    routes = {}
    for x in packets_in_nodes:
        packet_name = x[:find_nth(x, '_', 3)] # cuts out the packet name
        if (packet_name in routes.keys()):
            routes[packet_name].append(x)
            routes[packet_name].sort()
        else:
            routes[packet_name] = [x];
    print(routes)
    f = open("routes.txt", "w")
    for key, value in routes.items():
        f.write(str(key)+ ' : '+ str(value))
        f.write("\n\n")
    f.close()

def find_nth(string, substring, what_occurance):
    start = string.find(substring)
    while start >= 0 and what_occurance > 1:
        start = string.find(substring, start+len(substring))
        what_occurance -= 1
    return start




import sys
import gurobipy as gp
from gurobipy import GRB

if len(sys.argv) < 2:
    print('Usage: lp.py filename')
    sys.exit(0)

# Read and solve model

model = gp.read(sys.argv[1])
model.optimize()

if model.status == GRB.INF_OR_UNBD:
    # Turn presolve off to determine whether model is infeasible
    # or unbounded
    model.setParam(GRB.Param.Presolve, 0)
    model.optimize()

if model.status == GRB.OPTIMAL:
    print('Optimal objective: %g' % model.objVal)
    model.write('model.sol')
    variables_solved = model.getVars()
    packets_in_nodes = [var.VarName for var in variables_solved if var.x==1.0]
    # print(packets_in_nodes)
    create_routing_table_from_array_of_lp_variables(packets_in_nodes)
    sys.exit(0)

elif model.status != GRB.INFEASIBLE:
    print('Optimization was stopped with status %d' % model.status)
    sys.exit(0)


# Model is infeasible - compute an Irreducible Inconsistent Subsystem (IIS)

print('')
print('Model is infeasible')
model.computeIIS()
model.write("model.ilp")
print("IIS written to file 'model.ilp'")





