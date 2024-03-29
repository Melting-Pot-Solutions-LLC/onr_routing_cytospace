var data = []
const COLS = 5;
const ROWS = 5;
/*

      Ivan's original algorithm

*/
function node() {
    this.west = 0;
    this.north = 0;
    this.east = 0;
    this.south = 0;
    this.value = 0;
    this.path = 0;
    this.closest_origin = 0;
}
var nodes_original = new Array();
for (var k = 0; k < COLS * ROWS; k++) {
    nodes_original.push(new node());
}

function calculate_nodes_original() {
    var i = x = y = count = path = j = 0;
    var af = xf = yf = 0.0;
    for (j = 0; j < ROWS; j++) {
        for (i = 0; i < COLS; i++) {
            //1st quarter
            if ((j <= (COLS % 2 == 0 ? Math.floor(COLS / 2) : Math.floor(COLS / 2))) && (i <= (ROWS % 2 == 0 ? Math.floor(ROWS / 2 - 1) : Math.floor(ROWS / 2 - 1)))) {
                nodes_original[y * COLS + x].value = i * COLS + j;
                x = j;
                y = i;
                af = (y) / (x); // angle tangent 
                path = y + x;
                nodes_original[y * COLS + x].path = path;
                while (path > 0) {
                    yf = af * (x);
                    xf = (y) / af;
                    // console.log("x = ", x)
                    // console.log("y = ", y)
                    // console.log("af = ", af)
                    // console.log("yf = ", yf)
                    // console.log("xf = ", xf)
                    if (((j >= i) & (y - yf < 0.5)) || ((i > j) & (x - xf > 0.5))) {
                        // move left
                        nodes_original[y * COLS + x].west++;
                        nodes_original[y * COLS + x - 1].east++;
                        x--;
                    } else {
                        // move up
                        nodes_original[y * COLS + x].north++;
                        nodes_original[(y - 1) * COLS + x].south++;
                        y--;
                    }
                    path--;
                }
            }
            //2nd quarter
            if ((j >= (COLS % 2 == 0 ? Math.floor(COLS / 2 + 1) : Math.floor(COLS / 2 + 1))) && (i <= (ROWS % 2 == 0 ? Math.floor(ROWS / 2 - 1) : Math.floor(ROWS / 2)))) {
                x = j;
                y = i;
                af = (y) / (COLS - x);
                path = y + COLS - x;
                nodes_original[y * COLS + x].path = path;
                while (path > 0) {
                    yf = af * (COLS - x);
                    xf = COLS - (y) / af;
                    if (((i >= COLS - j) & (y - yf < 0.5)) || ((i < COLS - j) & (y - yf < -0.5))) {
                        if (x == COLS - 1) {
                            // move right
                            nodes_original[y * COLS + x].east++;
                            x = 0;
                            nodes_original[y * COLS + x].west++;
                        } else if (x == 0) {
                            // move up
                            nodes_original[y * COLS + x].north++;
                            nodes_original[(y - 1) * COLS + x].south++;
                            y--;
                        } else {
                            // move right
                            nodes_original[y * COLS + x].east++;
                            nodes_original[y * COLS + x + 1].west++;
                            x++;
                        }
                    } else {
                        if (y == 0) {
                            if (x == COLS - 1) {
                                // move right
                                nodes_original[y * COLS + x].east++;
                                x = 0;
                                nodes_original[y * COLS + x].west++;
                            } else {
                                // move right
                                nodes_original[y * COLS + x].east++;
                                nodes_original[y * COLS + x + 1].west++;
                                x++;
                            }
                        } else {
                            // move up
                            nodes_original[y * COLS + x].north++;
                            nodes_original[(y - 1) * COLS + x].south++;
                            y--;
                        }
                    }
                    path--;
                }
            }
            //3rd quarter
            if ((j >= (COLS % 2 == 0 ? Math.floor(COLS / 2) : Math.floor(COLS / 2 + 1))) && (i >= (ROWS % 2 == 0 ? Math.floor(ROWS / 2) : Math.floor(ROWS / 2 + 1)))) {
                x = j;
                y = i;
                af = (y) / (x);
                path = ROWS - y + COLS - x;
                nodes_original[y * COLS + x].path = path;
                while (path > 0) {
                    yf = af * (x);
                    xf = (y) / af;
                    if (((i > j) & (yf - y < 0.5)) || ((i <= j) & (yf - y < -0.5))) {
                        //if ((yf-y<0.5)) {
                        if (x == COLS - 1) {
                            // move right
                            nodes_original[y * COLS + x].east++;
                            x = 0;
                            nodes_original[y * COLS + x].west++;
                        } else if (x == 0) {
                            if (y == ROWS - 1) {
                                // move down
                                nodes_original[y * COLS + x].south++;
                                y = 0;
                                nodes_original[y * COLS + x].north++;
                            } else {
                                // move down
                                nodes_original[y * COLS + x].south++;
                                nodes_original[(y + 1) * COLS + x].north++;
                                y++;
                            }
                        } else {
                            // move rigth
                            nodes_original[y * COLS + x].east++;
                            nodes_original[y * COLS + x + 1].west++;
                            x++;
                        }
                    } else if (y == ROWS - 1) {
                        // move down
                        nodes_original[y * COLS + x].south++;
                        y = 0;
                        nodes_original[y * COLS + x].north++;
                    } else if (y == 0) {
                        if ((x == COLS - 1)) {
                            // move right
                            nodes_original[y * COLS + x].east++;
                            x = 0;
                            nodes_original[y * COLS + x].west++;
                        } else {
                            nodes_original[y * COLS + x].east++;
                            nodes_original[y * COLS + x + 1].west++;
                            x++;
                        }
                    } else {
                        nodes_original[y * COLS + x].south++;
                        nodes_original[(y + 1) * COLS + x].north++;
                        y++;
                    }
                    path--;
                }
            }
            //4th quarter
            if ((j <= (COLS % 2 == 0 ? Math.floor(COLS / 2 - 1) : Math.floor(COLS / 2))) && (i >= (ROWS % 2 == 0 ? Math.floor(ROWS / 2) : Math.floor(ROWS / 2)))) {
                x = j;
                y = i;
                af = (ROWS - y) / (x);
                path = ROWS - y + x;
                nodes_original[y * COLS + x].path = path;
                while (path > 0) {
                    yf = ROWS - af * (x);
                    xf = (ROWS - y) / af;
                    if (((ROWS - i < j) & (yf - y < 0.5)) || ((ROWS - i >= j) & (yf - y < -0.5))) {
                        if (x == 0) {
                            if (y == ROWS - 1) {
                                //table[nodes[y*COLS+x].value][nodes[i*COLS+j].value] = 4;
                                nodes_original[y * COLS + x].south++;
                                y = 0;
                                nodes_original[y * COLS + x].north++;
                            } else {
                                //table[nodes[y*COLS+x].value][nodes[i*COLS+j].value] = 4;
                                nodes_original[y * COLS + x].south++;
                                nodes_original[(y + 1) * COLS + x].north++;
                                y++;
                            }
                        } else {
                            //table[nodes[y*COLS+x].value][nodes[i*COLS+j].value] = 1;
                            nodes_original[y * COLS + x].west++;
                            nodes_original[y * COLS + x - 1].east++;
                            x--;
                        }
                    } else {
                        if (y == ROWS - 1) {
                            //table[nodes[y*COLS+x].value][nodes[i*COLS+j].value] = 4;
                            nodes_original[y * COLS + x].south++;
                            y = 0;
                            nodes_original[y * COLS + x].north++;
                        } else if (y == 0) {
                            //table[nodes[y*COLS+x].value][nodes[i*COLS+j].value] = 1;
                            nodes_original[y * COLS + x].west++;
                            nodes_original[y * COLS + x - 1].east++;
                            x--;
                        } else {
                            //table[nodes[y*COLS+x].value][nodes[i*COLS+j].value] = 4;
                            nodes_original[y * COLS + x].south++;
                            nodes_original[(y + 1) * COLS + x].north++;
                            y++;
                        }
                    }
                    path--;
                }
            }
        }
    }
    console.log("Ivan's original algorithm");
    console.log(nodes_original);
}
calculate_nodes_original()
var i, j;
for (i = 0; i < ROWS; i++) {
    for (j = 0; j < COLS; j++) {
        data.push({
            "data": {
                "id": "n-" + i + "-" + j,
                "weight": 53,
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
            // "classes": "outline"
        });
    }
}
for (i = 0; i < COLS; i++) {
    for (j = 0; j < ROWS; j++) {
        if (j != ROWS - 1) { // if the element is not at the last row
            data.push({
                "data": {
                    "id": "e-" + i + j + "-" + i + (j + 1),
                    "weight": 31,
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
                "classes": "outline"
            });
        } else // if the element is  at the last row -- wrap around to the 0th row
        {
            data.push({
                "data": {
                    "id": "e-" + i + j + "-" + i + 0,
                    "weight": 31,
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
                "classes": "outline unbundled-bezier"
            });
        }
        if (i != COLS - 1) { // if the element is not at the last row
            data.push({
                "data": {
                    "id": "e-" + i + j + "-" + (i + 1) + j,
                    "weight": 31,
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
                "classes": "outline"
            });
        } else { // if the element is at the last row -- wrap around
            data.push({
                "data": {
                    "id": "e-" + i + j + "-" + 0 + j,
                    "weight": 31,
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
        selector: "edge.unbundled-bezier",
        style: {
            "curve-style": "unbundled-bezier",
            "control-point-distances": 120,
            "control-point-weights": 0.1
        }
    }],
    elements: data
});