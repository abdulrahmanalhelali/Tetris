window.addEventListener("load", function () {
    var tetris = document.getElementById("tetris");
    var shapeList = [];
    var colors = ['red', 'cyan', 'green', 'purple', 'orange', 'blue', 'yellow'];

    ZShape = [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ];
    SShape = [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ];
    TShape = [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ];
    LShape = [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ];
    JShape = [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ];
    IShape = [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    OShape = [
        [1, 1],
        [1, 1]
    ];
    shapes = [ZShape, IShape, SShape, TShape, LShape, JShape, OShape];
    function randomShape() {
        return Math.floor(Math.random() * 7);
    }
    function createShape() {
        this.x = 3 * 30;
        this.y = 0;
        var rand = randomShape();
        this.shape = shapes[rand];
        this.color = colors[rand];
        this.divs = [];
        for (var row = 0; row < this.shape.length; row++) {
            for (var col = 0; col < this.shape[row].length; col++) {
                if (this.shape[row][col] == 1) {
                    var div = document.createElement("div")
                    div.classList.add("block")
                    div.style.top = row * 30 + this.y + "px"
                    div.style.left = col * 30 + this.x + "px"
                    div.style.backgroundColor = this.color;
                    tetris.appendChild(div)
                    this.divs.push(div)
                }
            }
        }
        shapeList.push(this);

    }

    new createShape()

    loop();

    function loop() {
        var canGo = true;
        for (var i = 0; i < 4; i++) {
            var top = parseInt(shapeList[shapeList.length - 1].divs[i].style.top);
            if (top >= 570) {
                canGo = false;
            }
        }

        for (var shapes = 0; shapes < shapeList.length - 1; shapes++) {
            for (var currentDivs = 0; currentDivs < 4; currentDivs++) {
                for (var otherDivs = 0; otherDivs < shapeList[shapes].divs.length; otherDivs++) {
                    var cx = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.left)
                    var cy = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.top)
                    var ox = parseInt(shapeList[shapes].divs[otherDivs].style.left)
                    var oy = parseInt(shapeList[shapes].divs[otherDivs].style.top)

                    if (ox == cx && cy + 30 == oy) {
                        canGo = false;
                    }
                }
            }
        }

        if (canGo == true) {
            for (var i = 0; i < 4; i++) {
                var top = parseInt(shapeList[shapeList.length - 1].divs[i].style.top) + 30;
                shapeList[shapeList.length - 1].divs[i].style.top = top + "px";
            }
            shapeList[shapeList.length - 1].y += 30;
            setTimeout(loop, 200);
        } else {
            for (var i = 0; i < 20; i++)
                checkRows();
            new createShape();
            gameover = false
            for (var shapes = 0; shapes < shapeList.length - 1 && !gameover; shapes++) {
                for (var currentDivs = 0; currentDivs < 4 && !gameover; currentDivs++) {
                    for (var otherDivs = 0; otherDivs < shapeList[shapes].divs.length && !gameover; otherDivs++) {
                        var cx = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.left)
                        var cy = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.top)
                        var ox = parseInt(shapeList[shapes].divs[otherDivs].style.left)
                        var oy = parseInt(shapeList[shapes].divs[otherDivs].style.top)

                        if (ox == cx && cy == oy) {
                            gameover = true

                        }
                    }
                }
            }
            if (!gameover)
                setTimeout(loop, 200);
        }
    }

    function checkRows() {
        var filled = [];
        var count = 0;
        for (var c = 570; c >= 0; c = c - 30) {
            for (var i = 0; i < shapeList.length; i++) {
                for (var j = 0; j < shapeList[i].divs.length; j++) {
                    var left = parseInt(shapeList[i].divs[j].style.left);
                    if (parseInt(shapeList[i].divs[j].style.top) == c) {
                        count = count + 30;
                        filled.push(shapeList[i].divs[j]);
                    }
                }
            }

            if (count == 300) {
                for (var k = 0; k < filled.length; k++) {
                    for (var i = 0; i < shapeList.length; i++) {
                        for (var j = 0; j < shapeList[i].divs.length; j++) {
                            if (parseInt(shapeList[i].divs[j].style.top) == c) {
                                if (shapeList[i].divs[j] == filled[k]) {
                                    shapeList[i].divs.splice(j, 1)
                                }
                            }
                        }
                    }
                    tetris.removeChild(filled[k]);
                }
                for (var i = 0; i < shapeList.length; i++) {
                    for (j = 0; j < shapeList[i].divs.length; j++) {
                        if (parseInt(shapeList[i].divs[j].style.top) < c)
                            shapeList[i].divs[j].style.top = parseInt(shapeList[i].divs[j].style.top) + 30 + "px";
                    }
                }
            }
            remove();
            function remove() {
                if (filled.length > 0) {
                    filled.pop();
                    remove();
                }
            }
            count = 0;
        }
    }
    function rotate(matrix) {
        var n = matrix.length;
        var x = Math.floor(n / 2);
        var y = n - 1;
        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                k = matrix[i][j];
                matrix[i][j] = matrix[y - j][i];
                matrix[y - j][i] = matrix[y - i][y - j];
                matrix[y - i][y - j] = matrix[j][y - i];
                matrix[j][y - i] = k;
            }
        }
        return matrix;
    }
    window.addEventListener("keydown", function (e) {
        if (e.keyCode == 38) {
            lastShape = shapeList[shapeList.length - 1];
            lastShape.shape = rotate(lastShape.shape);
            var i = 0;
            for (var row = 0; row < lastShape.shape.length; row++) {
                for (var col = 0; col < lastShape.shape[row].length; col++) {
                    if (lastShape.shape[row][col] == 1) {
                        lastShape.divs[i].style.top = row * 30 + lastShape.y + "px"
                        lastShape.divs[i].style.left = col * 30 + lastShape.x + "px"
                        i++;
                    }
                }
            }
        }
        if (e.keyCode == 39) {
            var canRight = true;
            for (var shapes = 0; shapes < shapeList.length - 1; shapes++) {
                for (var currentDivs = 0; currentDivs < 4; currentDivs++) {
                    for (var otherDivs = 0; otherDivs < shapeList[shapes].divs.length; otherDivs++) {
                        var cx = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.left)
                        var cy = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.top)
                        var ox = parseInt(shapeList[shapes].divs[otherDivs].style.left)
                        var oy = parseInt(shapeList[shapes].divs[otherDivs].style.top)

                        if (ox == (cx + 30) && cy == oy) {
                            canRight = false;
                        }
                    }
                }
            }
            for (var i = 0; i < 4; i++) {
                var left = parseInt(shapeList[shapeList.length - 1].divs[i].style.left);
                if (left >= 270) {
                    canRight = false;
                }
            }
            if (canRight == true) {
                for (var j = 0; j < 4; j++) {
                    shapeList[shapeList.length - 1].divs[j].style.left = parseInt(shapeList[shapeList.length - 1].divs[j].style.left) + 30 + "px";
                }
                shapeList[shapeList.length - 1].x += 30
            }
        }
        if (e.keyCode == 37) {
            var canLeft = true;
            for (var shapes = 0; shapes < shapeList.length - 1; shapes++) {
                for (var currentDivs = 0; currentDivs < 4; currentDivs++) {
                    for (var otherDivs = 0; otherDivs < shapeList[shapes].divs.length; otherDivs++) {
                        var cx = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.left)
                        var cy = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.top)
                        var ox = parseInt(shapeList[shapes].divs[otherDivs].style.left)
                        var oy = parseInt(shapeList[shapes].divs[otherDivs].style.top)

                        if (ox == (cx - 30) && cy == oy) {
                            canLeft = false;
                        }
                    }
                }
            }
            for (var i = 0; i < 4; i++) {
                var left = parseInt(shapeList[shapeList.length - 1].divs[i].style.left);
                if (left <= 0) {
                    canLeft = false;
                }
            }
            if (canLeft == true) {
                for (var j = 0; j < 4; j++) {
                    shapeList[shapeList.length - 1].divs[j].style.left = parseInt(shapeList[shapeList.length - 1].divs[j].style.left) - 30 + "px";
                }
                shapeList[shapeList.length - 1].x -= 30
            }
        }

        if (e.keyCode == 40) {
            var canDown = true;
            for (var shapes = 0; shapes < shapeList.length - 1; shapes++) {
                for (var currentDivs = 0; currentDivs < 4; currentDivs++) {
                    for (var otherDivs = 0; otherDivs < shapeList[shapes].divs.length; otherDivs++) {
                        var cx = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.left)
                        var cy = parseInt(shapeList[shapeList.length - 1].divs[currentDivs].style.top)
                        var ox = parseInt(shapeList[shapes].divs[otherDivs].style.left)
                        var oy = parseInt(shapeList[shapes].divs[otherDivs].style.top)

                        if (ox == cx && cy + 30 == oy) {
                            canDown = false;
                        }
                    }
                }
            }
            for (var i = 0; i < 4; i++) {
                var top = parseInt(shapeList[shapeList.length - 1].divs[i].style.top);
                if (top >= 570) {
                    canDown = false;
                }
            }
            if (canDown == true) {
                for (var j = 0; j < 4; j++) {
                    shapeList[shapeList.length - 1].divs[j].style.top = parseInt(shapeList[shapeList.length - 1].divs[j].style.top) + 30 + "px";
                }
            }
        }

    });
});