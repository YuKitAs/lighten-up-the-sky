/**
* @author   YuKitAs
*/
var upgrade = {  

    switchState: function(newState) {
    
        save.setHealth();
        
        this.game.state.start(newState, true, false, this.score, player.health);
        
    }
    
};