
function getPosTop(i, j) {
    return cellSpace + i * (cellWidth + cellSpace);
}

function getPosLeft(i, j) {
    return cellSpace + j * (cellWidth + cellSpace);
}


function getNumberColor(number) {
    if (number < 4) {
        return "#776e65";
    }
    return "white";
}
function getNumberBGcolor(number) {
    switch (number) {
        case 2: return "#eee4da"; break;
        case 4: return "#ded0e8"; break;
        case 8: return "#f2b179"; break;
        case 16: return "#f67e5f"; break;
        case 32: return "#f65e3b"; break;
        case 64: return "#edef72"; break;
        case 128: return "#edcc61"; break;
        case 256: return "#9c0"; break;
        case 512: return "#33b5e5"; break;
        case 1024: return "#c90"; break;
        case 2048: return "#f59563"; break;
        case 4096: return "#a6e"; break;
        case 8192: return "#93e"; break;
    }
    return "black";
}

function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0)
                return false;
        }
    }
    return true;
}
function nomove(board) {
    if (canMoveDown(board) || canMoveUp(board) || canMoveLeft(board) || canMoveRight(board))
        return false;
    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}
function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >=0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}

//判断两个值之前是否有其他值
function noBlockHorizon(row, col1, col2, board) {
    for (var i=col2+1; i < col1; i++) {
        if (board[row][i] != 0)
            return false;
    }
    return true;
}
function noBlockVertical(col, row1, row2, board) {
    for (var i = row2 + 1; i < row1; i++) {
        if (board[i][col] != 0)
            return false;
    }
    return true;
}

function canMoveUp(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}
function canMoveDown(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j])
                    return true;
            }
        }
    }
    return false;
}

