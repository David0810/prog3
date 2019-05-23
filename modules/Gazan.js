var LivingCreature = require("./LivingCreature");
var random = require("./random.js");
module.exports = class Gazan extends LivingCreature{
    super(x,y,index){
        this.energy = 3;
       }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    newDirections1() {
        this.directions1 = [
            [this.x - 1, this.y + 1],
            [this.x + 1, this.y - 1],
            [this.x + 1, this.y + 1],
            [this.x - 1, this.y - 1],
            [this.x - 2, this.y + 2],
            [this.x + 2, this.y - 2],
            [this.x + 2, this.y + 2],
            [this.x - 2, this.y - 2],
            [this.x - 3, this.y + 3],
            [this.x + 3, this.y - 3],
            [this.x + 3, this.y + 3],
            [this.x - 3, this.y - 3]
        ];
    }
    getDirections(t) {
        this.newDirections();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    getDirections1(t) {
        this.newDirections1();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var foundCords = this.getDirections(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    eat(a, b) {
        var foundCords = this.getDirections1(a);
        var cord = random(foundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in b) {
                if (x == b[i].x && y == b[i].y) {
                    b.splice(i, 1);
                }
            }
            if (this.multiply >= 0) {
                this.mul();
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy < 3) {
                this.die();
            }
        }
    }
    mul() {
        var rnd = random(100);
        if (rnd <= 40) {
            var foundCords = this.getDirections(0);
            var cord = random(foundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];
                var gazan = new Gazan(x, y);
                gazanArr.push(gazan);
                matrix[y][x] = 7;
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in gazanArr) {
            if (this.x == gazanArr[i].x && this.y == gazanArr[i].y) {
                gazanArr.splice(i, 1);
            }
        }
    }

}