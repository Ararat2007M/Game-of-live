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
// smokeArr = []
humanArr = []
eagleArr = []

 Grass = require("./Grass")
 GrassEater = require("./GrassEater")
 Human = require("./Human")
 Eagle = require("./Eagle")
//  Smoke = require("./Smoke")
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
        var newGrass = new Grass(x, y, 1);
        grassArr.push(newGrass)
      }
      else if (matrix[y][x] == 2) {
        var newGrassEat = new GrassEater(x, y, 2)
        grassEaterArr.push(newGrassEat)
      }
      else if (matrix[y][x] == 3) {
        var newPredator = new Predator(x, y, 3)
        predatorArr.push(newPredator)
      }
      // else if (matrix[y][x] == 4) {
      //   var newSmoke = new Smoke(x, y, 4)
      //   smokeArr.push(newSmoke)
      // }
      else if (matrix[y][x] == 5) {
        var newHuman = new Human(x, y, 5)
        humanArr.push(newHuman)
      }
      else if (matrix[y][x] == 6) {
        var newEagle = new Eagle(x, y, 6)
        eagleArr.push(newEagle)
      }
    }
  }

  // և կրկին ուղարկի կլիենտիդ: 
  //չմոռանաս , որ emit-ը տվյալ ուղարկողն է, իսկ on-ը ստացողը և կատարողը
  //այս դեպքում 2-րդ արգումենտը տվյալն է
  io.sockets.emit('send matrix', matrix)

}


// function generator(matLen, gr, grEat, pr, st, hu, eag) {
//   for (let i = 0; i < matLen; i++) {
//     matrix[i] = [];
//     for (let j = 0; j < matLen; j++) {
//       matrix[i][j] = 0;
//     }
//   }
//   for (let i = 0; i < gr; i++) {
//     let x = Math.floor(Math.random() * matLen);
//     let y = Math.floor(Math.random() * matLen);
//     if (matrix[x][y] == 0) {
//       matrix[x][y] = 1;
//     }
//   }
//   for (let i = 0; i < grEat; i++) {
//     let x = Math.floor(Math.random() * matLen);
//     let y = Math.floor(Math.random() * matLen);
//     if (matrix[x][y] == 0) {
//       matrix[x][y] = 2;
//     }
//   }
//   for (let i = 0; i < pr; i++) {
//     let x = Math.floor(Math.random() * matLen);
//     let y = Math.floor(Math.random() * matLen);
//     if (matrix[x][y] == 0) {
//       matrix[x][y] = 3;
//     }
//   }
//   for (let i = 0; i < st; i++) {
//     let x = Math.floor(Math.random() * matLen);
//     let y = Math.floor(Math.random() * matLen);
//     if (matrix[x][y] == 0) {
//       matrix[x][y] = 4;
//     }
//   }
//   for (let i = 0; i < hu; i++) {
//     let x = Math.floor(Math.random() * matLen);
//     let y = Math.floor(Math.random() * matLen);
//     if (matrix[x][y] == 0) {
//       matrix[x][y] = 5;
//     }
//   }
//   for (let i = 0; i < eag; i++) {
//     let x = Math.floor(Math.random() * matLen);
//     let y = Math.floor(Math.random() * matLen);
//     if (matrix[x][y] == 0) {
//       matrix[x][y] = 6;
//     }
//   }
//   return matrix;
// }


io.sockets.emit('send matrix', matrix)




  // for (var i in grassEaterArr) {
  //     grassEaterArr[i].mul()
  //     grassEaterArr[i].eat()
  // }
  // for (const j in grassArr) {
  //     grassArr[j].mul()
  // }
  // for (var a in predatorArr) {
  //     predatorArr[a].mul()
  //     predatorArr[a].eat()
  // }
  // for (const b in smokeArr) {
  //     smokeArr[b].move()
  //     smokeArr[b].eat()
  // }
  // for (var c in humanArr) {
  //     humanArr[c].mul()
  //     humanArr[c].eat()
  // }
  // for (var e in eagleArr) {
  //     eagleArr[e].mul()
  //     eagleArr[e].eat()
  // }


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
    // for (var i in smokeArr) {
    //   smokeArr[i].eat();
    // }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)


function kill() {
    GrassArr = [];
    GrassEaterArr = [];
    PredatorArr = [];
    HumanArr = [];
    EagleArr = []
    
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
            var gr = new Grass(x, y, 1)
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
            grassEaterArr.push(new GrassEater(x, y, 2))
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
          PredatorArr.push(new Predator(x, y, 3))
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
          HumanArr.push(new Human(x, y, 5))
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
          EagleArr.push(new Eagle(x, y, 6))
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

setInterval(function() {
    statistics.Grass = grassArr.length;
    statistics.GrassEater = grassEaterArr.length;
    statistics.Predator = predatorArr.length;
    statistics.Human = humanArr.length;
    statistics.Eagle = eagleArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)