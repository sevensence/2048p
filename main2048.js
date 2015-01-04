var board = new Array();
var score = 0;
var hasConflicted = new Array();

var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellWidth = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;
$(function () {
    prepareForMobile();
    newgame();
});
function prepareForMobile() {
    if (documentWidth > 500) {
        documentWidth = 500;
        cellWidth = 100;
        cellSpace = 20;
        gridContainerWidth = documentWidth - 2 * cellSpace;
    }
    $("#grid-container").css("width", documentWidth - 2 * cellSpace);
    $("#grid-container").css("height", documentWidth - 2 * cellSpace);
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius",0.02*gridContainerWidth);

    $(".grid-cell").css("width",cellWidth);
    $(".grid-cell").css("height",cellWidth);
    $(".grid-cell").css("border-radius",0.02*cellWidth);

}
function newgame() {
    //init grid
    init();
    //generate number in a random grid
    generateOneNumber(0,0);
    generateOneNumber(0,0);

}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j+'"></div> ');
            var thenumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                thenumberCell.css("width", "0px");
                thenumberCell.css("height", "0px");
                thenumberCell.css("top", getPosTop(i, j)+cellWidth/2);
                thenumberCell.css("left", getPosLeft(i, j)+cellWidth/2);
            }
            else {
                thenumberCell.css("width", cellWidth); 
                thenumberCell.css("height", cellWidth);
                thenumberCell.css("top", getPosTop(i, j));
                thenumberCell.css("left", getPosLeft(i, j));
                thenumberCell.css("background-color", getNumberBGcolor(board[i][j]));
                thenumberCell.css("color", getNumberColor(board[i][j]));
                thenumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
     $(".number-cell").css("line-height",cellWidth+"px");
     $(".number-cell").css("font-size",0.6*cellWidth+"px");

}

function generateOneNumber(addx,addy) {
    if (nospace(board))
        return false;
    //随机一个位置，随机一个数
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));
    var index = 0;
    while (index < 20) {
        randX = randX < 3 ? randX + addx : randX;
        randY = randY < 3 ? randY + addy : randY;
        if (board[randX][randY] == 0)
            break;
        
        randX = parseInt(Math.floor(Math.random() * 4));
        randY = parseInt(Math.floor(Math.random() * 4));
        index++;
    }
    var getOneNum = false;
    if (board[randX][randY] != 0) {
        for (var i = 0; i < 4; i++) {
            if (getOneNum)
                break;
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randX = i;
                    randY = j;
                    getOneNum = true;
                    break;
                }
            }
        }
    }

    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数
    board[randX][randY] = randNumber;

    showNumberWithAnimation(randX, randY, randNumber);

    return;
}

function isgameove() {
    if (nomove(board) && nospace(board)) {
        alert("game over");
        newgame();
    }
}

$(document).keydown(function (event) {
    
    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout("generateOneNumber(1,0)", 200);
                setTimeout("isgameove()", 300);
            }
            break;
        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout("generateOneNumber(0,1)", 200);
                setTimeout("isgameove()", 300);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout("generateOneNumber(-1,0)", 200);
                setTimeout("isgameove()", 300);
            }
            break;
        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout("generateOneNumber(0,-1)", 200);
                setTimeout("isgameove()", 300);
            }
            break;
        default: //
            break;
    }
});

document.addEventListener("touchstart", function (event) { 
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});


document.addEventListener("touchmove", function (event) {
    event.preventDefault();
});

document.addEventListener("touchend", function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    xDirect = startx - endx;
    yDirect = starty - endy;

    if (Math.abs(xDirect) < 0.2 * documentWidth && Math.abs(yDirect) < 0.2 * documentWidth)
        return;

    if (Math.abs(xDirect) >= Math.abs(yDirect)) {
        if (xDirect > 0) {//left
            if (moveLeft()) {
                setTimeout("generateOneNumber(1,0)", 200);
                setTimeout("isgameove()", 300);
            }
        } else {
            if (moveRight()) {
                setTimeout("generateOneNumber(-1,0)", 200);
                setTimeout("isgameove()", 300);
            }
        }
    } else {
        if (yDirect > 0) {//up
            if (moveUp()) {
                setTimeout("generateOneNumber(0,1)", 200);
                setTimeout("isgameove()", 300);
            }
        } else {
            if (moveDown()) {
                setTimeout("generateOneNumber(0,-1)", 200);
                setTimeout("isgameove()", 300);
            }
        }
    }
});


//向左移动
function moveLeft() {
    if (!canMoveLeft(board))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizon(i, j, k, board)) {
                        showMoveAnimate(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizon(i, j, k, board) && !hasConflicted[i][k]) {
                        showMoveAnimate(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add 分数
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

//向右移动
function moveRight() {
    if (!canMoveRight(board))
        return false;
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >=0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizon(i, k, j, board)) {
                        showMoveAnimate(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizon(i, k, j, board) && !hasConflicted[i][k]) {
                        showMoveAnimate(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add 分数
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

//向上移动
function moveUp() {
    if (!canMoveUp(board))
        return false;
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimate(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimate(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add 分数
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}


function moveDown() {
    if (!canMoveDown(board))
        return false;
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimate(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        showMoveAnimate(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add 分数
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}
