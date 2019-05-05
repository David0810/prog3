var side = 15;
let xotArr = [];
let eatArr = [];
let gishatichArr = [];
let hreshArr = [];
let gazanArr = [];

function genetareMatrix(lengthY, lengthX, number) {

    let matrix = [];
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    for (let y = 0; y < lengthY; y++) {
        matrix.push([]);
        for (let x = 0; x < lengthX; x++) {
            let randomCount = getRandomInt(number);
            matrix[y].push(randomCount);
        }
    }
    return matrix;
}
let heigth = 40,
    width = 40,
    matrix = genetareMatrix(heigth, width, 8);

function setup() {
    noStroke();
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side); //կտավի չափերը դնել մատրիցայի չափերին համապատասխան
    background('#acacac');
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            }
            else if (matrix[y][x] == 5) {
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
            }
            else if (matrix[y][x] == 4) {
                var hresh = new Hresh(x, y);
                hreshArr.push(hresh);
            }
            else if (matrix[y][x] == 7) {
                var gazan = new Gazan(x, y);
                hreshArr.push(gazan);
            }
        }
    }
}
function draw() {
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill("red");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("blue");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 7) {
                fill("#400365");
                rect(j * side, i * side, side, side);
            }
            else if (matrix[i][j] == 10) {
                fill("#000");
                rect(j * side, i * side, side, side);
            }
            else {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }

        }
    }
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
        hreshArr[i].eat(5, gishatichArr);
        hreshArr[i].eat(1, xotArr);
        hreshArr[i].mul();
    }
    for (var i in gazanArr) {
        gazanArr[i].mul();
        gazanArr[i].eat(4, hreshArr);
        gazanArr[i].eat(2, eatArr);
    }
}