var stage2 = function(game) {
    console.log("Hello Hoho");    
};

stage2.prototype = {
    preload: function() {
        this.game.load.image('sky', 'assets/sky2.png');
    },

    create: function() {
        this.game.add.sprite(0, 0, 'sky');
    },

    update: function() {
    }
};



