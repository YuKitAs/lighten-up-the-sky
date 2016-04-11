/**
* @author   YuKitAs
*/
var Spike = {
  
    move: function(spike, min, max)  {
        
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
        
    },
    
    hurtPlayer: function(player, spike) {
      
        if (player.x < spike.x + 32) {
            if (player.health > 10) {
                player.health -= 10;
                healthText.text = 'HP: ' + player.health;
                // toss the player a little bit to the left
                player.body.velocity.x = -300;
                player.animations.play('left');
                return false;
            } else {
                return true;
            }           
        } else {
            if (player.health > 10) {
                player.health -= 10;
                healthText.text = 'HP: ' + player.health;
                // toss the player a little bit to the right
                player.body.velocity.x = 300;
                player.animations.play('right');
                return false;
            } else {
                return true;
            }
        }
      
    },
    
    killPlayer: function(player, spike) {
      
        player.kill();

        player.health = 0;
        healthText.text = 'HP: ' + player.health;
        
        spike.body.enable = false;

        resultText = game.add.text(320, 200, 'GAME OVER', { fill: '#FFF', wordWrap: true, wordWrapWidth: 5, align: 'center' });
        resultText.font = 'Righteous';
        resultText.fontSize = 50;
        
        restart = game.add.text(320, 322, 'click to restart', { fill: '#FFF' });
        restart.fontSize = 22;
      
    }
  
};