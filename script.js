function generator(matLen, gr, grEat, pr, st, hu, eag) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < st; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < hu; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    for (let i = 0; i < eag; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 6;
        }
    }
    return matrix;
}


let matrix = generator(35, 40, 10, 10, 10, 5, 10);
var side = 20;
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var smokeArr = []
var humanArr = []
var eagleArr = []

function setup() {
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix.length; ++x) {
            if (matrix[y][x] == 1) {
                var newGrass = new Grass(x, y, 1);
                grassArr.push(newGrass)
            }
            else if (matrix[y][x] == 2) {
                var newGrassEat = new GrassEater(x, y, 2)
                grassEaterArr.push(newGrassEat)
            }
            else if (matrix[y][x] == 3) {
                var newPredator = new Predator(x, y, 2)
                predatorArr.push(newPredator)
            }
            else if (matrix[y][x] == 4) {
                var newSmoke = new Smoke(x, y, 2)
                smokeArr.push(newSmoke)
            }
            else if (matrix[y][x] == 5) {
                var newHuman = new Human(x, y, 2)
                humanArr.push(newHuman)
            }
            else if (matrix[y][x] == 6) {
                var newEagle = new Eagle(x, y, 2)
                eagleArr.push(newEagle)
            }
        }
    }

}


function draw() {

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
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (const j in grassArr) {
        grassArr[j].mul()
    }
    for (var a in predatorArr) {
        predatorArr[a].mul()
        predatorArr[a].eat()
    }
    for (const b in smokeArr) {
        smokeArr[b].move()
        smokeArr[b].eat()
    }
    for (var c in humanArr) {
        humanArr[c].mul()
        humanArr[c].eat()
    }
    for (var e in eagleArr) {
        eagleArr[e].mul()
        eagleArr[e].eat()
    }
}
