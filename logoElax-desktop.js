/*

Logo Alexis Pétard
(c) Jérémy Bobel & Alexis Pétard

###### DWTFYW 2006 ######

0. You just Do What The Fuck You Want with this fucking code

*/

/*###
        INITIALISATION DES VARIABLES
###*/
var cote = 7;
var demicote = cote / 2;
var context = null;
var ctx = null;
var nombreBtns = 9;
var listeBtns = new Array("graphisme", "webdev", "progra", "illus", "photos", "musique", "typos", "contact", "actus");
var listeThetas = new Array(0.04, 0.09, 0.02, 0.02, 0.1, 0.06, 0.07, 0.1, 0.11);

var wMax = $(document).width();
var hMax = $(document).height();

var deformationCourbe = 1200;
var amplitudeDeformation = 0;
var incremTemps = 0;

/*COULEURS CHOISIES :

385D82
3CBC88
6DC6C6
879293
79B7B6
73577F
CCADA3

*/

var listeCouleurs = ["#385D82", "#3CBC88", "#6DC6C6", "#879293", "#79B7B6", "#73577F", "#CCADA3"];

var couleur = listeCouleurs[Math.floor(Math.random() * listeCouleurs.length)];

/*var couleur = '#' + (function co(lor) {
    return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
})('');*/






var thetas = [];
for (var i = 0; i <= nombreBtns; i++) {
    thetas[i] = 0.0;
}

/*### Initialisation de la grille ###*/
var grilleX = [];
var grilleY = [];
var nombreStep = 24;
var stepX = Math.floor(wMax / nombreStep);
var stepY = Math.floor(hMax / nombreStep);
for (var i = 0; i <= nombreStep; i++) {
    grilleX[i] = stepX * i;
    grilleY[i] = stepY * i;
}

var btnX = new Array(grilleX[6], grilleX[12], grilleX[8], grilleX[18], grilleX[13], grilleX[20], grilleX[22], grilleX[3], grilleX[7]);
var btnY = new Array(grilleY[6], grilleY[20], grilleY[11], grilleY[7], grilleY[2], grilleY[20], grilleY[9], grilleY[18], grilleY[22]);



/*###
        FONCTION GENERALE D'INITIALISATION DU VISUEL
###*/
function init() {
    context = document.getElementById("lignes");
    ctx = context.getContext("2d");

    /*### Positionnement des boutons ###*/
    for (var i = 0; i < nombreBtns; i++) {
        var c = document.getElementById(listeBtns[i]);
        var tempw = $("#" + listeBtns[i]).width();
        var temph = $("#" + listeBtns[i]).height();
        c.style.left = btnX[i] + "px";
        c.style.top = btnY[i] + "px";
    }
}
window.onload = init();

/*###
        FONCTION GENERALE D'ANIMATION DU VISUEL
###*/
function doMove() {

    /*### Positionnement des boutons ###*/
    for (var i = 0; i < nombreBtns; i++) {
        var c = document.getElementById(listeBtns[i]);
        var tempw = $("#" + listeBtns[i]).width();
        var temph = $("#" + listeBtns[i]).height();
        c.style.left = (btnX[i] - (tempw / 2)) + "px";
        c.style.top = (btnY[i] - (temph / 2)) + "px";
    }


    for (var i = 0; i <= nombreBtns; i++) {
        thetas[i] += listeThetas[i];
        btnX[i] = (Math.cos(thetas[i]) + btnX[i]) * 1;
        btnY[i] = (Math.sin(thetas[i]) + btnY[i]) * 1;
    }


    /*### Recupération du canvas et de son contexte ###*/
    context = document.getElementById("lignes");
    ctx = context.getContext('2d');
    /*### Redimensionnement du canvas ###*/
    ctx.canvas.width = wMax;
    ctx.canvas.height = hMax;


    /*### Dessin des lignes ###*/
    ctx.beginPath();
    /*
graphisme webdev progra illus photos musique typos contact actus
    0       1       2       3   4       5       6       7       8
*/

    incremTemps++;

    if (incremTemps >= 330) {
        amplitudeDeformation++;
    }
    var margeCoul = (amplitudeDeformation * 100) / 10;
    var seuilCoul = amplitudeDeformation - margeCoul;

    var deformationCourbeX = new Array();
    var deformationCourbeY = new Array();

    for (var i = 0; i <= nombreBtns; i++) {
        deformationCourbeX[i] = Math.cos(thetas[i] / 2) * amplitudeDeformation;
        deformationCourbeY[i] = Math.cos(thetas[i] / 2) * amplitudeDeformation;
    }


    /*    if (deformationCourbe >= seuilCoul || deformationCourbe <= -seuilCoul) {
        couleur = '#' + (function co(lor) {
            return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
        })('');
    }*/



    ctx.lineWidth = 1;
    ctx.strokeStyle = couleur;
    ctx.moveTo(btnX[7], btnY[7]); /*contact*/
    ctx.bezierCurveTo(
        btnX[7] + deformationCourbeX[7], btnY[7] + deformationCourbeY[7],
        btnX[0] + deformationCourbeX[0], btnY[0] + deformationCourbeY[0],
        btnX[0], btnY[0]); /*ctx.lineTo(btnX[0], btnY[0]); /*graphisme*/

    ctx.bezierCurveTo(
        btnX[0] + deformationCourbeX[0], btnY[0] + deformationCourbeY[0],
        btnX[2] - deformationCourbeX[2], btnY[2] + deformationCourbeY[2],
        btnX[2], btnY[2]); /*ctx.lineTo(btnX[2], btnY[2]); /*progra*/

    ctx.bezierCurveTo(
        btnX[2] + deformationCourbeX[2], btnY[2] + deformationCourbeY[2],
        btnX[7] + deformationCourbeX[7], btnY[7] + deformationCourbeY[7],
        btnX[7], btnY[7]); /*ctx.lineTo(btnX[7], btnY[7]); /*contact*/

    ctx.moveTo(btnX[8], btnY[8]); /*actus*/

    ctx.bezierCurveTo(
        btnX[8] + deformationCourbeX[8], btnY[8] + deformationCourbeY[8],
        btnX[2] + deformationCourbeX[2], btnY[2] + deformationCourbeY[2],
        btnX[2], btnY[2]); /*ctx.lineTo(btnX[2], btnY[2]); /*progra*/

    ctx.bezierCurveTo(
        btnX[2] + deformationCourbeX[2], btnY[2] + deformationCourbeY[2],
        btnX[1] + deformationCourbeX[1], btnY[1] + deformationCourbeY[1],
        btnX[1], btnY[1]); /*ctx.lineTo(btnX[1], btnY[1]); /*webdev*/

    ctx.moveTo(btnX[0], btnY[0]); /*graphisme*/

    ctx.bezierCurveTo(
        btnX[0] + deformationCourbeX[0], btnY[0] + deformationCourbeY[0],
        btnX[4] + deformationCourbeX[4], btnY[4] + deformationCourbeY[4],
        btnX[4], btnY[4]); /*ctx.lineTo(btnX[4], btnY[4]); /*photos*/

    ctx.bezierCurveTo(
        btnX[4] + deformationCourbeX[4], btnY[4] + deformationCourbeY[4],
        btnX[3] + deformationCourbeX[3], btnY[3] + deformationCourbeY[3],
        btnX[3], btnY[3]); /*ctx.lineTo(btnX[3], btnY[3]); /*illus*/

    ctx.bezierCurveTo(
        btnX[3] + deformationCourbeX[3], btnY[3] + deformationCourbeY[3],
        btnX[6] + deformationCourbeX[6], btnY[6] + deformationCourbeY[6],
        btnX[6], btnY[6]); /*ctx.lineTo(btnX[6], btnY[6]); /*typos*/

    ctx.bezierCurveTo(
        btnX[6] + deformationCourbeX[6], btnY[6] - deformationCourbeY[6],
        btnX[5] + deformationCourbeX[5], btnY[5] - deformationCourbeY[5],
        btnX[5], btnY[5]); /*ctx.lineTo(btnX[5], btnY[5]); /*musique*/

    ctx.bezierCurveTo(
        btnX[5] + deformationCourbeX[5], btnY[5] + deformationCourbeY[5],
        btnX[1] + deformationCourbeX[1], btnY[1] + deformationCourbeY[1],
        btnX[1], btnY[1]); /*ctx.lineTo(btnX[1], btnY[1]); /*webdev*/

    ctx.bezierCurveTo(
        btnX[1] - deformationCourbeX[1], btnY[1] - deformationCourbeY[1],
        btnX[4] - deformationCourbeX[4], btnY[4] - deformationCourbeY[4],
        btnX[4], btnY[4]); /*ctx.lineTo(btnX[4], btnY[4]); /*photos*/

    ctx.bezierCurveTo(
        btnX[4] + deformationCourbeX[4], btnY[4] - deformationCourbeY[4],
        btnX[5] + deformationCourbeX[5], btnY[5] - deformationCourbeY[5],
        btnX[5], btnY[5]); /*ctx.lineTo(btnX[5], btnY[5]); /*musique*/

    ctx.moveTo(btnX[2], btnY[2]); /*progra*/

    ctx.bezierCurveTo(
        btnX[2] + deformationCourbeX[2], btnY[2] + deformationCourbeY[2],
        btnX[4] + deformationCourbeX[4], btnY[4] + deformationCourbeY[4],
        btnX[4], btnY[4]); /*ctx.lineTo(btnX[4], btnY[4]); /*photos*/

    ctx.moveTo(btnX[8], btnY[8]); /*actus*/

    ctx.bezierCurveTo(
        btnX[8] + deformationCourbeX[8], btnY[8] + deformationCourbeY[8],
        btnX[1] + deformationCourbeX[8], btnY[1] + deformationCourbeY[8],
        btnX[1], btnY[1]); /*ctx.lineTo(btnX[1], btnY[1]); /*webdev*/

    ctx.bezierCurveTo(
        btnX[1] + deformationCourbeX[1], btnY[1] + deformationCourbeY[1],
        btnX[6] + deformationCourbeX[6], btnY[6] + deformationCourbeY[6],
        btnX[6], btnY[6]); /*ctx.lineTo(btnX[6], btnY[6]); /*typos*/

    ctx.moveTo(btnX[0], btnY[0]); /*graphisme*/

    ctx.bezierCurveTo(
        btnX[0] + deformationCourbeX[0], btnY[0] + deformationCourbeY[0],
        btnX[8] + deformationCourbeX[8], btnY[8] + deformationCourbeY[8],
        btnX[8], btnY[8]); /*ctx.lineTo(btnX[8], btnY[8]); /*actus*/

    ctx.moveTo(btnX[1], btnY[1]); /*webdev*/

    ctx.bezierCurveTo(
        btnX[1] + deformationCourbeX[1], btnY[1] + deformationCourbeY[1],
        btnX[3] + deformationCourbeX[3], btnY[3] + deformationCourbeY[3],
        btnX[3], btnY[3]); /*ctx.lineTo(btnX[3], btnY[3]); /*illus*/

    ctx.bezierCurveTo(
        btnX[3] + deformationCourbeX[3], btnY[3] + deformationCourbeY[3],
        btnX[5] + deformationCourbeX[5], btnY[5] + deformationCourbeY[5],
        btnX[5], btnY[5]); /*ctx.lineTo(btnX[5], btnY[5]); /*musique*/

    ctx.moveTo(btnX[1], btnY[1]); /*webdev*/
    ctx.bezierCurveTo(
        btnX[1] + deformationCourbeX[1], btnY[1] + deformationCourbeY[1],
        btnX[7] + deformationCourbeX[7], btnY[7] + deformationCourbeY[7],
        btnX[7], btnY[7]); /*ctx.lineTo(btnX[7], btnY[7]); /*contact*/

    ctx.stroke();

    /*### Dessin des carres ###*/
    var contextecercle = document.getElementById("cercles");
    var ctxc = contextecercle.getContext("2d");
    ctxc.canvas.width = wMax;
    ctxc.canvas.height = hMax;
    for (var i = 0; i < nombreBtns; i++) {
        ctxc.beginPath();
        ctxc.rect(btnX[i] - demicote, btnY[i] - demicote, cote, cote);
        ctxc.fill();
        ctxc.closePath();
    }

}

setInterval(doMove, 30);
