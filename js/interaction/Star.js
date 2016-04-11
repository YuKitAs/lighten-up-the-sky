/**
* @author   YuKitAs
*/
var Star = {
  
    collect: function(player, star) {
      
        star.kill();
        
        this.score += 10;
        scoreText.text = 'score: ' + this.score;
      
    }
    
};