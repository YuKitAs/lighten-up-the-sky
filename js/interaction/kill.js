/**
* @author   YuKitAs
*/
var kill = {
  
    player: function(player, spike) {
      
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
