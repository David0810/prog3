class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
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
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    }
}

class Grass extends LivingCreature{
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
    mul() {
        this.multiply++;
        if (this.multiply == 6) {
            var foundCords = this.getDirections(0);
            var cord = random(foundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];
                var norXot = new Grass(x, y);
                xotArr.push(norXot);
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}
class Eatgrass extends LivingCreature{
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
        if (rnd <= 40) {
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
class Gishatich extends LivingCreature{
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
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy -= 2;
        }
    }
    eat() {
        var foundCords = this.getDirections(2);
        var cord = random(foundCords);
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++;
            this.energy += 2;
            for (var i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1);
                }
            } 
            if (this.multiply >= 15) {
                this.mul()
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
        let rnd = random(100);
        if (rnd <= 60) {
            var foundCords = this.getDirections(0);
            var cord = random(foundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
                matrix[y][x] = 5;
            }
        }
    }
    die() {
        if (this.energy < 0) {
            matrix[this.y][this.x] = 0;
            for (var i in gishatichArr) {
                if (this.x == gishatichArr[i].x && this.y == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                }
            }
        }
    }
}
class Hresh extends LivingCreature{
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
        //որոնում է դատարկ տարածքներ
        if (this.getRandomInt(2)) {
            var foundCords = this.getDirections(0);
        } else {
            var foundCords = this.getDirections1(0);
        }
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }
    //eat()-ուտել
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
        if (rnd <= 80) {
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
class Gazan extends LivingCreature{
    super(x,y,index){
        this.energy = 3;
       }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    //շրջապատի հետազոտության մատրիցը
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
    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
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
        //որոնում է դատարկ տարածքներ
        var foundCords = this.getDirections(0);
        var cord = random(foundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat(a, b) {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var foundCords = this.getDirections1(a);
        var cord = random(foundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
            for (var i in b) {
                if (x == b[i].x && y == b[i].y) {
                    b.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply >= 0) {
                this.mul();
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy < 3) { //մահանում է, եթե էներգիան 3֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var rnd = random(100);
        if (rnd <= 66) {
            var foundCords = this.getDirections(0);
            var cord = random(foundCords);

            //եթե կա բազմանում է
            if (cord) {
                var x = cord[0];
                var y = cord[1];
                //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
                //և տեղադրում է այն խոտակերների զանգվածի մեջ
                var gazan = new Gazan(x, y);
                gazanArr.push(gazan);

                //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
                matrix[y][x] = 7;
            }
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in gazanArr) {
            if (this.x == gazanArr[i].x && this.y == gazanArr[i].y) {
                gazanArr.splice(i, 1);
            }
        }
    }

}