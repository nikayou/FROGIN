var score = 0;
var waves = 0;

var scoreTag = document.getElementById("score");
var wavesTag = document.getElementById("waves");

var updateScore = function(v) {
    if (v) {
	score += v;
    }
    scoreTag.innerHTML = "score: "+score;
}

var updateWaves = function(v) {
    if (v) {
	score += v;
    }
    wavesTag.innerHTML = "waves: "+waves;
}

