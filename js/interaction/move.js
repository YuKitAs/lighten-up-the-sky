var move = {
  
    spike: function(spike, min, max) {
        
        var spikeMover = game.rnd.integerInRange(1, 2);
        
        if (spike.body.position.x <= min) {
            spikeMover = 1;
        } else if (spike.body.position.x >= max) {
            spikeMover = 2;
        }
        
        if (spikeMover == 1) {
            spike.body.velocity.x = 50;
            spike.animations.play('right');	
        }	else if (spikeMover == 2) {
            spike.body.velocity.x = -50;
            spike.animations.play('left');
        }
        
    }
  
};