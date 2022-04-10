var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
  res.redirect('index.html');
});
server.listen(3000);

matrix = [];

grassArr = []
grassEaterArr = []
predatorArr = []
smokeArr = []
humanArr = []
eagleArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Human = require("./Human")
Eagle = require("./Eagle")
Smoke = require("./Smoke")
Predator = require("./Predator")

var n = 50

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
  matrix[i] = [];
  for (let j = 0; j < n; j++) {
    matrix[i][j] = Math.floor(rand(0, 6))

  }
}

io.sockets.emit("send matrix", matrix)


function createObject() {
  for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix.length; ++x) {
      if (matrix[y][x] == 1) {
        var newGrass = new Grass(x, y);
        grassArr.push(newGrass)
      }
      else if (matrix[y][x] == 2) {
        var newGrassEat = new GrassEater(x, y)
        grassEaterArr.push(newGrassEat)
      }
      else if (matrix[y][x] == 3) {
        var newPredator = new Predator(x, y)
        predatorArr.push(newPredator)
      }
      else if (matrix[y][x] == 4) {
        var newSmoke = new Smoke(x, y)
        smokeArr.push(newSmoke)
      }
      else if (matrix[y][x] == 5) {
        var newHuman = new Human(x, y)
        humanArr.push(newHuman)
      }
      else if (matrix[y][x] == 6) {
        var newEagle = new Eagle(x, y)
        eagleArr.push(newEagle)
      }
    }
  }


  io.sockets.emit('send matrix', matrix)

}



function game() {
  for (var i in grassArr) {
    grassArr[i].mul()
  }
  for (var i in grassEaterArr) {
    grassEaterArr[i].eat();
    // grassEaterArr[i].mul();
  }
  for (var i in predatorArr) {
    predatorArr[i].eat();
  }
  for (var i in humanArr) {
    humanArr[i].eat();
  }
  for (var i in eagleArr) {
    eagleArr[i].eat();
  }
  for (var i in smokeArr) {
    smokeArr[i].eat();
  }
  io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


function kill() {
  grassArr = [];
  grassEaterArr = [];
  predatorArr = [];
  humanArr = [];
  eagleArr = []

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("send matrix", matrix);
}


function addGrass() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1
      var gr = new Grass(x, y)
      grassArr.push(gr)
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2
      grassEaterArr.push(new GrassEater(x, y))
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addPredator() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3
      predatorArr.push(new Predator(x, y))
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addHuman() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if (matrix[y][x] == 0) {
      matrix[y][x] = 5
      humanArr.push(new Human(x, y))
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addEagle() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
    if (matrix[y][x] == 0) {
      matrix[y][x] = 6
      eagleArr.push(new Eagle(x, y))
    }
  }
  io.sockets.emit("send matrix", matrix);
}


io.on('connection', function (socket) {
  createObject();
  socket.on("kill", kill);
  socket.on("add grass", addGrass);
  socket.on("add grassEater", addGrassEater);
  socket.on("add predator", addPredator);
  socket.on("add human", addHuman);
  socket.on("add eagle", addEagle);
});


var statistics = {};

setInterval(function () {
  statistics.Grass = grassArr.length;
  statistics.GrassEater = grassEaterArr.length;
  statistics.Predator = predatorArr.length;
  statistics.Human = humanArr.length;
  statistics.Eagle = eagleArr.length;
  fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    console.log("send")
  })
}, 1000)