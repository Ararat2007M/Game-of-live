var socket =io()
var side = 10;

function setup() {
    createCanvas(50 * side, 50 * side);
    background('#acacac');
}



function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
  
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("#2a9d8f")
            }
            else if (matrix[y][x] == 5) {
                fill("#fec89a")
            }
            else if (matrix[y][x] == 6) {
                fill("#e76f51")
            }
  
            rect(x * side, y * side, side, side);
  
  
        }
    }
}

socket.on("send matrix", nkarel)


function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add Eagle")
}
function addHuman() {
    socket.emit("add Human")
}
function addEagle() {
    socket.emit("add Predator")
}

