
function showNumberWithAnimation(x, y, randnumber) {
    var numberCell = $("#number-cell-" + x + "-" + y);
    numberCell.css("background-color", getNumberBGcolor(randnumber));
    numberCell.css("color", getNumberColor(randnumber));
    numberCell.text(randnumber);

    numberCell.animate({
        width: cellWidth,
        height: cellWidth,
        top: getPosTop(x, y),
        left: getPosLeft(x, y)
    }, 50);
}

function showMoveAnimate(fromx, fromy, tox, toy) {
    var theMoveNumber = $("#number-cell-" + fromx + "-" + fromy);

    theMoveNumber.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

function updateScore() {
    $("#socre").text(score);
}
