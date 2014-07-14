include("scripts/Objects/Background.js");
include("scripts/Objects/Bullet.js");
include("scripts/Objects/Player.js");
include("scripts/GUI.js");
include("scripts/Objects/Enemy.js");
include("scripts/Objects/Level.js");

var start = function() {
    updateScore();
    updateWaves();
    game.init(new Level());
}

