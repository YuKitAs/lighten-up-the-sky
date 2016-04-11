/**
* @author   YuKitAs
*/
var Update = {
  
    setCollision: function(game) {
      
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);
        
        for (var i = 0; i < spikes.length; i++) {
            game.physics.arcade.collide(spikes[i], platforms);
        }
        
    },
    
    setPlayerMovement: function() {
      
        player.body.velocity.x = 0;

        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 4;
        }
        
    },    

    setCursor: function() {
      
      if (cursors.up.isDown && player.body.touching.down) {
          player.body.velocity.y = -320;
      }
      
    }

};