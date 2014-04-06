/*

Logo Alexis Pétard
(c) Jérémy Bobel & Alexis Pétard

06.04.14

###### DWTFYW 2006 ######

0. You just Do What The Fuck You Want with this fucking code

*/

var debug = false;
if (debug) console.log('Bienvenue sur le script de mon logo');

/*###
        INITIALISATION DES VARIABLES
###*/

var chose =    [7, 0, 2, 7, 8, 2, 1, 0, 4, 3, 6, 5, 1, 4, 5, 2, 4, 8, 1, 6, 0, 8, 1, 3, 5, 1, 7];
var moveToList=[0,          4,       7,                     15,   17,      20,   22,      25];
var cote = 7;
var demicote = cote / 2;
var context = null;
var ctx = null;
var nombreBtns = 9;
var listeBtns = new Array("graphisme", "webdev", "progra", "illus", "photos", "musique", "typos", "contact", "actus");
var listeThetas = new Array(0.04, 0.09, 0.02, 0.02, 0.1, 0.06, 0.07, 0.1, 0.11);
var wMax = window.innerWidth;
var hMax = window.innerHeight;
var deformationCourbe = 1200;
var amplitudeDeformation = 0;
var incremTemps = 0;
var listeCouleurs = ["#385D82", "#3CBC88", "#6DC6C6", "#879293", "#79B7B6", "#73577F", "#CCADA3"];
var couleur = listeCouleurs[Math.floor(Math.random() * listeCouleurs.length)];
var thetas = [];
var deformationCourbeX = [];
var deformationCourbeY = [];
var retarDebut = 330;
for (var i = 0; i <= nombreBtns; i++) {
    thetas[i] = 0.0;
}

if (debug) console.log('[OK] Variables prêtes');


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

if (debug) console.log('[OK] Grille prête');

/*###
        FONCTION GENERALE D'ANIMATION DU VISUEL
###*/
function doMove() {
wMax = $(document).width();
hMax = $(document).height();
    /*### Positionnement des boutons ###*/
    for (var i = 0; i < nombreBtns; i++) {
        var c = document.getElementById(listeBtns[i]);
        var tempw = $("#" + listeBtns[i]).width();
        var temph = $("#" + listeBtns[i]).height();
        c.style.left = (btnX[i] - (tempw / 2)) + "px";
        c.style.top = (btnY[i] - (temph / 2)) + "px";
    }
    for (var o = 0; o <= nombreBtns; o++) {
        thetas[o] += listeThetas[o];
        btnX[o] = (Math.cos(thetas[o]) + btnX[o]) * 1;
        btnY[o] = (Math.sin(thetas[o]) + btnY[o]) * 1;
    }
    /*### Recupération du canvas et de son contexte ###*/
    context = document.getElementById("cvsLogo");
    ctx = context.getContext('2d');
    /*### Redimensionnement du canvas ###*/
    ctx.canvas.width = wMax;
    ctx.canvas.height = hMax;
    /*### Dessin des lignes ###*/
    ctx.beginPath();
    incremTemps++;
    if (incremTemps >= retarDebut) {
        amplitudeDeformation++;
    }
    for (var j = 0; j <= nombreBtns; j++) {
        deformationCourbeX[j] = Math.cos(thetas[j] / 2) * amplitudeDeformation;
        deformationCourbeY[j] = Math.cos(thetas[j] / 2) * amplitudeDeformation;
    }
    /*
    ###### FONCTION DE SYNTHESE COURBE DE BEZIER ######
    */
    CanvasRenderingContext2D.prototype.courBezier = function (a, b) {
        if (incremTemps >= retarDebut) { // RETARDEMENT DU DEBUT
            return this.bezierCurveTo(
                btnX[a] + deformationCourbeX[a],
                btnY[a] + deformationCourbeY[a],
                btnX[b] + deformationCourbeX[b],
                btnY[b] + deformationCourbeY[b],
                btnX[b], btnY[b]);
        } else {
            return this.bezierCurveTo(
                btnX[a],
                btnY[a],
                btnX[b],
                btnY[b],
                btnX[b], btnY[b]);
        }
    };
    ctx.lineWidth = 1;
    ctx.strokeStyle = couleur;
    
    for (var i=0; i < chose.length; i++){ // La boucle magique
            if(moveToList.indexOf(i) > -1){ // Si dans la liste des moveTo
                    ctx.moveTo(btnX[ chose[i] ], btnY[ chose[i] ]);
            }else{
                    ctx.courBezier(lastPosition, chose[i]);
            }
            var lastPosition = chose[i];
    }
    ctx.stroke();
    /*### Dessin des carres ###*/
    for (var a = 0; a < nombreBtns; a++) {
        ctx.beginPath();
        ctx.rect(btnX[a] - demicote, btnY[a] - demicote, cote, cote);
        ctx.fill();
        ctx.closePath();
    }
}
setInterval(doMove, 20);
