var upgrade = {  
    switchState: function(newState) {
    
        save.setScore();
        save.setHealth();
        
        this.game.state.start(newState, true, false, this.score, player.health);
        
    }   
};