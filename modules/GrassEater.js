var LivingCreature = require("./LivingCreature");
var random = require("./random.js");



module.exports = class Eatgrass extends LivingCreature{
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
    move() {
        var foundCords = this.getDirections(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--
        }
    }
    eat() {
        var foundCords = this.getDirections(1);
        var cord = random(foundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy++;
            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }
            if (this.multiply >= 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            this.move();
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    mul() {
        let rnd = random(100);
        if (rnd <= 10) {
            var foundCords = this.getDirections(0);
            var cord = random(foundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];
                var norXotaker = new Eatgrass(x, y);
                eatArr.push(norXotaker);
                matrix[y][x] = 2;
            }
        }
    }
    die() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0;
            for (var i in eatArr) {
                if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            }
        }
    }
}