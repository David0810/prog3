var LivingCreature = require("./LivingCreature");
var random = require("./random.js");



module.exports = class Hresh extends LivingCreature{
    super(x,y,index){
     this.energy = 3;
    }
 getRandomInt(max) {
     return Math.floor(Math.random() * Math.floor(max));
 }
 newDirections() {
     this.directions = [
         [this.x - 2, this.y - 2],
         [this.x, this.y - 2],
         [this.x + 2, this.y - 2],
         [this.x - 2, this.y],
         [this.x + 2, this.y],
         [this.x - 2, this.y + 2],
         [this.x, this.y + 2],
         [this.x + 2, this.y + 2]
     ];
 }
 newDirections1() {
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


 //move() շարժվել
 move() {
     if (this.getRandomInt(2)) {
         var foundCords = this.getDirections(0);
     } else {
         var foundCords = this.getDirections1(0);
     }
     var cord = random(foundCords);

     if (cord) {
         var x = cord[0];
         var y = cord[1];
         matrix[y][x] = 4;
         matrix[this.y][this.x] = 0;
         this.x = x;
         this.y = y;
     }
 }
 eat(y, z) {
     var foundCords = this.getDirections(y);
     var cord = random(foundCords);
     if (cord) {
         var x = cord[0];
         var y = cord[1];
         matrix[y][x] = 4;
         matrix[this.y][this.x] = 0;
         this.x = x;
         this.y = y;
         this.multiply++;
         this.energy++;
         for (var i in z) {
             if (x == z[i].x && y == z[i].y) {
                 z.splice(i, 1);
             }
         }
         if (this.multiply >= 30) {
             this.mul();
             this.multiply = 0;
         }
     } else {
         this.move();
         this.energy--;
         if (this.energy <= 0) {
             this.die();
         }
     }
 }
 mul() {
     var rnd = random(100);
     if (rnd <= 30) {
         var foundCords = this.getDirections(0);
         var cord = random(foundCords);
         if (cord) {
             var x = cord[0];
             var y = cord[1];
             var hresh = new Hresh(x, y);
             hreshArr.push(hresh);
             matrix[y][x] = 4;
         }
     }
     console.log(rnd);
 }
 die() {
     matrix[this.y][this.x] = 0;
     for (var i in hreshArr) {
         if (this.x == hreshArr[i].x && this.y == hreshArr[i].y) {
             hreshArr.splice(i, 1);
         }
     }
 }
}