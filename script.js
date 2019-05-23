var socket = io();
var side = 5;
function setup() {
    let grassCount = document.getElementById('grassCount');
    let grassEaterCount = document.getElementById('grassEaterCount');
    socket.on("data", drawCreatures);
}
    function drawCreatures(data) {
        matrix = data.matrix;
        season = data.season;

        createCanvas(matrix[0].length * side, matrix.length * side)
        background('#acacac'); 


        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (season == "winter") {
                        fill("white");
                    }
                    else
                    {
                        fill("green")
                    }
                    
                }
                else if (matrix[i][j] == 2) {
                    if (season == "winter") {
                        fill("black");
                    }
                    else
                    {
                        fill("purple")
                    }
                   
                } 
                else if (matrix[i][j] == 3) {
                    fill('red');
                    
                }
                else if (matrix[i][j] == 4) {
                    fill('blue');
                    
                } 
                else if (matrix[i][j] == 5) {
                    fill('yellow');
                    
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
function spanel() {
    io.emit("spani")
}