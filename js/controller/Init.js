/**
* @author   YuKitAs
*/
var Init = {
  
    ground: function(platforms) {
                
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
    },
  
    player: function(player) {
      
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 350;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 8, true);
        player.animations.add('right', [5, 6, 7, 8], 8, true);
      
    },
  
    spike: function(spikes) {
      
        for (var i = 0; i < spikes.length; i++) {
            game.physics.arcade.enable(spikes[i]);
            spikes[i].body.gravity.y = 300;
            spikes[i].body.collideWorldBounds = true;
            spikes[i].animations.add('left', [0, 1], 6, true);
            spikes[i].animations.add('right', [2, 3], 6, true);
        }
    
    },
    
    star: function(stars) {
        
        stars.enableBody = true;

        for (var i = 0; i < 12; i++) {
            var star = stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.5 + Math.random() * 0.4;
        }
        
    }
    
};