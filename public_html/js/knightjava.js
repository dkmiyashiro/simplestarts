/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var buttnum = true;
var mouseState = new MouseState();
var canvas;
var rect;
var ctx;
var bsquares = [];
var posnum = 0;
var row = 1;
var column = 1;
var t = new Timer(0, 0, 0);
var cnum = 1;
var rainbowInterval;

window.onload = function init() {

    $(".button-collapse").sideNav();
    
    var parent = document.getElementById("canvasHolder");
    canvas = document.getElementById("knightCanvas");
    
    ctx = canvas.getContext("2d");
    // canvas.width = parent.offsetWidth;
    // canvas.height = parent.offsetHeight;
    rect = canvas.getBoundingClientRect();
    
    $( "#startButt" ).toggleClass( "disabled" );

    createBoard();
    initBoard();
    //document.getElementById("resetbutton").style.display = "none";

    canvas.addEventListener("mousedown", function (event) {
        rect = canvas.getBoundingClientRect();
        posnum = 0;
        row = 1;
        column = 1;
        mouseState.x = event.clientX - rect.left;
        mouseState.y = event.clientY - rect.top;
        console.log("actual x ="+event.clientX+", adjusted x ="+mouseState.x+", actual y ="+event.clientY+", adjusted y ="+mouseState.y);
        determineX(15, mouseState.x, 65);
        determineY(15, mouseState.y, 65);
        if (posnum >= 0) {
            if (bsquares[posnum].potential) {
                knightsTour();
            }
        }
        winCondition();
    });

    // canvas.addEventListener("contextmenu", function (event) {
    //     forceWin();
    //     event.preventDefault();
    //     return false;
    // }, false);

};



function initBoard() {
    $( "#restartButt" ).toggleClass( "disabled" );
    $( "#startButt" ).toggleClass( "disabled" );
    clearInterval(myTimer);
    clearInterval(rainbowInterval);
    // document.getElementById("heading2").innerHTML = 'To start, press "Start!"';
    // document.getElementById("startbutton").style.display = "block";
    // document.getElementById("resetbutton").style.display = "none";
    for (var i = 0; i < bsquares.length; i++) {
        bsquares[i].resetSquare();
    }
    bsquares[0].potential = true;
    posnum = 0;
    row = 1;
    column = 1;
    t.s = 0;
    t.m = 0;
    t.ms = 0;
    //document.getElementById("currenttime").innerHTML = t.displayTime();
}

function knightsTour() {
    bsquares[posnum].selectSquare();
    notReset();
    if (row > 2) {
        if (posnum > 17 && !(bsquares[posnum - 17].select) && column > 1) {
            bsquares[(posnum - 17)].potentialSquare();
        }
        if (posnum > 15 && !(bsquares[posnum - 15].select) && column < 8) {
            bsquares[(posnum - 15)].potentialSquare();
        }
    }
    if (row > 1) {
        if (posnum > 10 && !(bsquares[posnum - 10].select) && column > 2) {
            bsquares[(posnum - 10)].potentialSquare();
        }
        if (posnum > 6 && !(bsquares[posnum - 6].select) && column < 7) {
            bsquares[(posnum - 6)].potentialSquare();
        }
    }
    if (row < 7) {
        if (posnum < 47 && !(bsquares[posnum + 17].select) && column < 8) {
            bsquares[(posnum + 17)].potentialSquare();
        }
        if (posnum < 49 && !(bsquares[posnum + 15].select) && column > 1) {
            bsquares[(posnum + 15)].potentialSquare();
        }
    }
    if (row < 8) {
        if (posnum < 54 && !(bsquares[posnum + 10].select) && column < 7) {
            bsquares[(posnum + 10)].potentialSquare();
        }
        if (posnum < 58 && !(bsquares[posnum + 6].select) && column > 2) {
            bsquares[(posnum + 6)].potentialSquare();
        }
    }
}

function winCondition() {
    var count = 0;
    for (var i = 0; i < bsquares.length; i++) {
        if (bsquares[i].select) {
            count++;
        }
    }
    if (count === 64) {
        winnerChickenDinner();
    }
}

function Timer() {
    this.ms = 0;
    this.s = 0;
    this.m = 0;
}

Timer.prototype.displayTime = function () {
    var mm;
    var ss;
    var mmss;
    if (this.ms < 10) {
        mmss = "0" + this.ms;
    } else {
        mmss = this.ms;
    }
    if (this.s < 10) {
        ss = "0" + this.s;
    } else {
        ss = this.s;
    }
    if (this.m < 10) {
        mm = "0" + this.m;
    } else {
        mm = this.m;
    }
    message = mm + ':' + ss + ':' + mmss;
    return message;
};

function notReset() {
    for (var i = 0; i < bsquares.length; i++) {
        if (!bsquares[i].select) {
            bsquares[i].resetSquare();
        }
    }
}
;

Timer.prototype.active = function () {
    if (this.ms < 10) {
        this.ms += 1;
    } else if (this.ms === 10) {
        if (this.s < 60) {
            this.s += 1;
            this.ms = 0;
        } else if (this.s === 60) {
            this.m += 1;
            this.s = 0;
        }
    }
};

function reset() {
    clearInterval(myTimer);
    clearInterval(rainbowInterval);
    // document.getElementById("heading2").innerHTML = 'To start, press "Start!"';
    // document.getElementById("startbutton").style.display = "block";
    // document.getElementById("resetbutton").style.display = "none";
    for (var i = 0; i < bsquares.length; i++) {
        bsquares[i].resetSquare();
    }
    bsquares[0].potential = true;
    posnum = 0;
    row = 1;
    column = 1;
    t.s = 0;
    t.m = 0;
    t.ms = 0;
    knightsTour();
}
;

function determineX(base, middle, ceiling) {
    if (middle < base) {
        posnum -= 65;
    } else {
        if (middle > ceiling && ceiling > 479) {
            posnum -= 65;
        } else {
            if (middle > ceiling && ceiling < 480) {
                determineX(base + 60, middle, ceiling + 60);
                posnum += 1;
                column += 1;
            }
        }
    }
}
;

function determineY(base, middle, ceiling) {
    if (middle < base) {
        posnum -= 65;
    } else {
        if (middle > ceiling && ceiling > 479) {
            posnum -= 65;
        } else {
            if (middle > ceiling && ceiling < 480) {
                determineY(base + 60, middle, ceiling + 60);
                posnum += 8;
                row += 1;
            }
        }
    }
}
;

function MouseState() {
    this.down = false;
    this.x = 0;
    this.y = 0;
    this.action = 3; // 3 indicates no action
}
;

function createBoard() {
    sqx = 10;
    sqy = 10;
    for (var i = 0; i < 8; i++) {
        sqx = 10;
        for (var j = 0; j < 8; j++) {
            createBoardSquare(sqx, sqy, 50, "gray");
            sqx += 60;
        }
        sqy += 60;
    }
}
;

function createBoardSquare(x, y, wh, color) {
    var sq = new BoardSquare(x, y, wh);
    bsquares.push(sq);
    sq.resetSquare(color);
}
;

function BoardSquare(x, y, wh) {
    this.wh = wh;
    this.x = x;
    this.y = y;
    this.row = row;
    this.column = column;
    this.potential = false;
    this.select = false;
}
;

BoardSquare.prototype.resetSquare = function () {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.x, this.y, this.wh, this.wh);
    this.potential = false;
    this.select = false;
};

BoardSquare.prototype.potentialSquare = function () {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.wh, this.wh);
    this.potential = true;
};

BoardSquare.prototype.selectSquare = function () {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.wh, this.wh);
    this.potential = false;
    this.select = true;
};

BoardSquare.prototype.changeColor = function (color) {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.wh, this.wh);
};

function winnerChickenDinner() {
    clearInterval(myTimer);
    //document.getElementById("heading2").innerHTML = "Congrats! You Win!!";
    rainbowInterval = setInterval(winRainbow, 100);
}

// found at https://krazydad.com/tutorials/makecolors.php
function winRainbow(){
    var red = Math.sin(.3*cnum ) * 40 + 215;
    var grn = Math.sin(.3*cnum + 2) * 40 + 215;
    var blu = Math.sin(.3*cnum + 4) * 40 + 215;
    cnum++;
    if(cnum>1000) cnum=0;
    for (var i = 0; i < bsquares.length; i++) {
        bsquares[i].changeColor("rgb("+red+","+grn+","+blu+")");
    }
    //return RGB2Color(red,grn,blu);
}

var myTimer;

function startKnight() {
    reset();
    $( "#startButt" ).toggleClass( "disabled" );
    $( "#restartButt" ).toggleClass( "disabled" );
    myTimer = setInterval(timer, 100);
    // document.getElementById("startbutton").style.display = "none";
    // document.getElementById("resetbutton").style.display = "block";
    // document.getElementById("heading2").innerHTML = "Good Luck!";
}

function timer() {
    t.active();
    // document.getElementById("currenttime").innerHTML = t.displayTime();
}

function forceWin() {
    bsquares[17].selectSquare();
    bsquares[32].selectSquare();
    bsquares[49].selectSquare();
    bsquares[59].selectSquare();
    bsquares[53].selectSquare();
    bsquares[63].selectSquare();
    bsquares[46].selectSquare();
    bsquares[31].selectSquare();
    bsquares[14].selectSquare();
    bsquares[4].selectSquare();
    bsquares[10].selectSquare();
    bsquares[16].selectSquare();
    bsquares[33].selectSquare();
    bsquares[48].selectSquare();
    bsquares[58].selectSquare();
    bsquares[52].selectSquare();
    bsquares[62].selectSquare();
    bsquares[47].selectSquare();
    bsquares[30].selectSquare();
    bsquares[15].selectSquare();
    bsquares[5].selectSquare();
    bsquares[11].selectSquare();
    bsquares[1].selectSquare();
    bsquares[18].selectSquare();
    bsquares[24].selectSquare();
    bsquares[41].selectSquare();
    bsquares[56].selectSquare();
    bsquares[50].selectSquare();
    bsquares[60].selectSquare();
    bsquares[54].selectSquare();
    bsquares[39].selectSquare();
    bsquares[22].selectSquare();
    bsquares[7].selectSquare();
    bsquares[13].selectSquare();
    bsquares[3].selectSquare();
    bsquares[9].selectSquare();
    bsquares[26].selectSquare();
    bsquares[43].selectSquare();
    bsquares[37].selectSquare();
    bsquares[20].selectSquare();
    bsquares[35].selectSquare();
    bsquares[45].selectSquare();
    bsquares[28].selectSquare();
    bsquares[34].selectSquare();
    bsquares[40].selectSquare();
    bsquares[57].selectSquare();
    bsquares[51].selectSquare();
    bsquares[61].selectSquare();
    bsquares[55].selectSquare();
    bsquares[38].selectSquare();
    bsquares[23].selectSquare();
    bsquares[6].selectSquare();
    bsquares[12].selectSquare();
    bsquares[2].selectSquare();
    bsquares[8].selectSquare();
    bsquares[25].selectSquare();
    bsquares[42].selectSquare();
    bsquares[36].selectSquare();
    bsquares[21].selectSquare();
    bsquares[27].selectSquare();
    bsquares[44].selectSquare();
    bsquares[29].selectSquare();
    bsquares[19].selectSquare();
    winCondition();
}