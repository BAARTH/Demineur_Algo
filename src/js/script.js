var jeu = document.querySelector('.jeu');
var ceil_html;
console.log(jeu);

var tab_game = [];
var marked = 0;
var clicked_x;
var clicked_y;

function generate(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate_tab_game() {
    var ceil_count = 0;
    for (i = 0; i < 10; i++) {
        var line = [];
        for (j = 0; j < 10; j++) {
            var ceil = {};
            ceil.value = 0;
            ceil.mark = false;
            ceil.show = false;
            ceil.number = ceil_count;
            ceil_count++;
            line.push(ceil);
        }
        tab_game.push(line);
    }
}
generate_tab_game();

function generate_bomb() {
    for (i = 0; i < 10; i++) {
        var pos_line = generate(0, 9); // generate random x
        var pos_ceil = generate(0, 9); // generate random y
        tab_game[pos_line][pos_ceil].value = '@'; // affect a bomb to this x and y
    }
}
generate_bomb();

function generate_html() {
    var ceil_count = 0;
    for (i = 0; i < tab_game.length; i++) {
        for (j = 0; j < tab_game[i].length; j++) {
            jeu.innerHTML += '<div class="ceil ceil-' + ceil_count + '" data-x=" ' + j + '" data-y="' + i + '"></div>';
            ceil_count++;
        }
    }
}

generate_html();

function generate_css() {
    ceil_html = document.querySelectorAll('.ceil');
    var ceil_count = 0;
    for (i = 0; i < tab_game.length; i++) {
        for (j = 0; j < tab_game[i].length; j++) {
            ceil_html[ceil_count].style.transform = 'translate(' + j * 25 + 'px, ' + i * 25 + 'px)';
            ceil_count++;
        }
    }
}
detect_bomb();
generate_css();


function detect_bomb() {
    for (i = 0; i < tab_game.length; i++) {

        for (j = 0; j < tab_game[i].length; j++) {
            if (tab_game[i][j].value != '@') {

                if (i - 1 >= 0) {
                    if (j - 1 >= 0) {
                        if (tab_game[i - 1][j - 1].value == '@') {
                            tab_game[i][j].value++;
                        }
                    }

                    if (tab_game[i - 1][j].value == '@') {
                        tab_game[i][j].value++;
                    }

                    if (j + 1 < tab_game.length) {
                        if (tab_game[i - 1][j + 1].value == '@') {
                            tab_game[i][j].value++;
                        }
                    }
                }


                if (j - 1 >= 0) {
                    if (tab_game[i][j - 1].value == '@') {
                        tab_game[i][j].value++;
                    }
                }

                if (j + 1 < tab_game.length) {
                    if (tab_game[i][j + 1].value == '@') {
                        tab_game[i][j].value++;
                    }
                }


                if (i + 1 < tab_game.length) {
                    if (j - 1 >= 0) {
                        if (tab_game[i + 1][j - 1].value == '@') {
                            tab_game[i][j].value++;
                        }
                    }

                    if (tab_game[i + 1][j].value == '@') {
                        tab_game[i][j].value++;
                    }

                    if (j + 1 < tab_game.length) {
                        if (tab_game[i + 1][j + 1].value == '@') {
                            tab_game[i][j].value = tab_game[i][j].value + 1;
                        }
                    }

                }
            }
        }

    }
}


function click_event() {
    for (i = 0; i < ceil_html.length; i++) {

        ceil_html[i].addEventListener('click', function() {
            clicked_x = parseInt(this.getAttribute("data-x"));
            clicked_y = parseInt(this.getAttribute("data-y"));
            this.innerHTML = tab_game[clicked_y][clicked_x].value;
            tab_game[clicked_y][clicked_x].show = true;
            if (tab_game[clicked_y][clicked_x].value == 0) {
                detect_void();
            }
            if (tab_game[clicked_y][clicked_x].value == '@') {
                alert('nef,zvsp');
            }
        });
        ceil_html[i].addEventListener('contextmenu', function() {

            if (tab_game[clicked_y][clicked_x].mark == false) {
                this.innerHTML = '!';
                marked++;
                tab_game[clicked_y][clicked_x].mark = true;
            } else {
                this.innerHTML = '';
                marked--;
                tab_game[clicked_y][clicked_x].mark = false;
            }

        });

    }
}
click_event();


function detect_void() {
    for (i = 0; i < tab_game.length; i++) {
        for (j = 0; j < tab_game.length; j++) {
            if (tab_game[i][j].show == false) {


                if (j - 1 >= 0 && i - 1 >= 0) {
                    if ((tab_game[i - 1][j - 1].value == 0) && (tab_game[i - 1][j - 1].show == true)) {
                        tab_game[i][j].show = true;
                        i = 0;
                        j = 0;
                    }
                }
                if (i - 1 >= 0) {
                    if ((tab_game[i - 1][j].value == 0) && (tab_game[i - 1][j].show == true)) {
                        tab_game[i][j].show = true;
                        i = 0;
                        j = 0;
                    }
                }
                if (j + 1 < tab_game.length && i - 1 >= 0) {
                    console.log(i - 1, j + 1)
                    if ((tab_game[i - 1][j + 1].value == 0) && (tab_game[i - 1][j + 1].show == true)) {
                        tab_game[i][j].show = true;
                        i = 0;
                        j = 0;
                    }

                }
                if (j - 1 >= 0) {
                    if (tab_game[i][j - 1].value == 0 && tab_game[i][j - 1].show == true) {
                        tab_game[i][j].show = true;
                        i = 0;
                        j = 0;
                    }
                }

                if (j + 1 < tab_game.length) {
                    if (tab_game[i][j + 1].value == 0 && tab_game[i][j + 1].show == true) {
                        tab_game[i][j].show = true;
                        i = 0;
                        j = 0;
                    }
                }
                if (i + 1 < tab_game.length) {
                    if (j - 1 >= 0) {
                        if (tab_game[i + 1][j - 1].value == 0 && tab_game[i + 1][j - 1].show == true) {
                            tab_game[i][j].show = true;
                            i = 0;
                            j = 0;
                        }
                    }
                    if ((tab_game[i + 1][j].value == 0) && (tab_game[i + 1][j].show == true)) {
                        tab_game[i][j].show = true;
                        i = 0;
                        j = 0;
                    }
                    if (j + 1 < tab_game.length) {
                        if ((tab_game[i + 1][j + 1].value == 0) && (tab_game[i + 1][j + 1].show == true)) {
                            tab_game[i][j].show = true;
                            i = 0;
                            j = 0;
                        }
                    }
                }
            }
        }
    }

    show_void();
}


function show_void() {
    for (i = 0; i < tab_game.length; i++) {
        for (j = 0; j < tab_game[i].length; j++) {
            if (tab_game[i][j].show == true) {
                ceil_html[tab_game[i][j].number].innerHTML = tab_game[i][j].value;
            }
        }
    }
}
// }function detect_void(y, x) {
//     if (tab_game[y][x].value == 0) {
//         if (y - 1 >= 0) {
//             ceil_html[tab_game[y - 1][x].number].innerHTML = tab_game[y - 1][x].value;
//             detect_void(y - 1, x);
//         }

//         if (x - 1 >= 0) {
//             ceil_html[tab_game[y][x - 1].number].innerHTML = tab_game[y][x - 1].value;
//             detect_void(y, x - 1);
//         }

//         if (x + 1 < tab_game.length) {
//             ceil_html[tab_game[y][x + 1].number].innerHTML = tab_game[y][x + 1].value;
//             // detect_void(y, x + 1);
//         }

//         if (y + 1 < tab_game.length) {
//             ceil_html[tab_game[y + 1][x].number].innerHTML = tab_game[y + 1][x].value;
//             // detect_void(y + 1, x);
//         }
//     }
// }

// [-1][-1]
// [-1][0]
// [-1][+1]
// [0][-1]
// [0][+1]
// [+1][-1]
// [+1][0]
// [+1][+1]
