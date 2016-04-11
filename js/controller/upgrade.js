/**
* @author   YuKitAs
*/
var Upgrade = {
  
    showResult: function(player, spikes) {
      
        resultText = game.add.text(310, 200, 'STAGE CLEAR', { fill: '#FFF', wordWrap: true, wordWrapWidth: 6, align: 'center' });
        resultText.font = 'Righteous';
        resultText.fontSize = 50;
        
        player.body.enable = false;
        
        for (var i = 0; i < spikes.length; i++) {
            spikes[i].body.enable = false;
        } 
        
    },

    switchState: function(newState) {
    
        Save.setHealth();
        
        game.state.start(newState, true, false, this.score, player.health);
        
    }
    
};