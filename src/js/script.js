var tab = [];



function generate(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


for (i = 0; i < 10; i++) {
    var line = [];
    for (j = 0; j < 10; j++) {
        ceil = 0;
        line.push(ceil);
    }
    tab.push(line);
}

for (i = 0; i < 10; i++) {
    var pos_line = generate(0, 9);
    var pos_ceil = generate(0, 9);
    tab[pos_line][pos_ceil] = 1;
}

for (i = 0; i < tab.length; i++) {
    document.write(tab[i] + '</br>');
}
