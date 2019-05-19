xotArr = [];
eatArr = [];
gishatichArr = [];
hreshArr = [];
gazanArr = [];
matrix = [];
let random = require('./modules/random');
function matrixGenerator(matrixSize,xot,eat,gishatich,hresh,gazan) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < xot; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < eat; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < hresh; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < gazan; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(40,10,10,10,15,15);
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Hresh = require("./modules/Hresh.js");
var Gazan = require("./modules/Gazan.js");
var Gishatich = require("./modules/Gishatich.js");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(8000);
function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                eatArr.push(grassEater);
            }
            else if (matrix[y][x] == 4) {
                var hresh = new Hresh(x, y);
                hreshArr.push(hresh);
            } 
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
                
            } 
            else if (matrix[y][x] == 3) {
                var pred = new Gishatich(x, y);
                gishatichArr.push(pred);
                
            }
            else if (matrix[y][x] == 5) {
                var gazan = new Gazan(x, y);
                gazanArr.push(gazan);
                
            }
        }
    }
}

creatingObjects();
function game() {
    for (var i in xotArr) {
        xotArr[i].mul();
    }
    for (var i in eatArr) {
        eatArr[i].eat();
        eatArr[i].mul();
    }
    for (var i in gishatichArr) {
        gishatichArr[i].mul();
        gishatichArr[i].eat();
    }
    for (var i in hreshArr) {
        hreshArr[i].eat(3, gishatichArr);
        hreshArr[i].eat(1, xotArr);
        hreshArr[i].mul();
    }
    for (var i in gazanArr) {
        gazanArr[i].mul();
        gazanArr[i].eat(4, hreshArr);
        gazanArr[i].eat(2, eatArr);
    }
    let sendData = {
        matrix: matrix
    }
    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)