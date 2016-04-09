var init = {
    initSpike: function(spike) {
    
        game.physics.arcade.enable(spike);
        spike.body.gravity.y = 300;
        spike.body.collideWorldBounds = true;
        spike.animations.add('left', [0, 1], 6, true);
        spike.animations.add('right', [2, 3], 6, true);
    
    } 
};