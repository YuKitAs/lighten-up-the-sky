/**
* @author   YuKitAs
*/
var hurt = {
  
    player: function(player, spike) {
      
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
      
    }
  
};