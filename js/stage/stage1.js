/**
* @author   YuKitAs
*/
var Stage1 = function() {};

WebFontConfig = {
  
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
      families: ['Revalia', 'Righteous']
    }
    
};

Stage1.prototype = {
  
    preload: function() {

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js');
        game.load.image('sky', 'assets/sky-1.png');
        game.load.image('ground', 'assets/platform-1.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('shirokuma', 'assets/shirokuma.png', 32, 32);
        game.load.spritesheet('loli', 'assets/loli.png', 32, 48);
      
    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // add background
        game.add.sprite(0, 0, 'sky');

        // add platforms
        platforms = this.game.add.group();
        Init.ground(platforms);

        // add ledges
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 280, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(395, 200, 'ground');
        ledge.scale.setTo(0.35, 1);
        ledge.body.immovable = true;
        ledge = platforms.create(680, 130, 'ground');
        ledge.scale.setTo(0.3, 1);
        ledge.body.immovable = true;
        
        // add player
        player = game.add.sprite(32, game.world.height - 150, 'loli');
        player.health = 150;
        Init.player(player);
        
        // add spikes
        spikes = [];
        spikes[0] = game.add.sprite(400, game.world.height - 150, 'shirokuma');
        spikes[1] = game.add.sprite(700, game.world.height - 400, 'shirokuma');        
        Init.spike(spikes);
        
        // set movement of spikes
        game.time.events.loop(Phaser.Timer.SECOND * 2, Spike.move, this, spikes[0], 200, 300);
        game.time.events.loop(Phaser.Timer.SECOND, Spike.move, this, spikes[1], 420, 600);

        // add stars
        stars = game.add.group();
        Init.star(stars);
     
        // add score text
        this.score = 0;
        scoreText = game.add.text(60, 60, 'score: 0', { fontSize: '32px', fill: '#FFF' });
        
        // add health text
        healthText = game.add.text(550, 55, 'HP: ' + player.health, { fontSize: '32px', fill: '#FFF' });
     
        // add level text
        levelText = game.add.text(345, 20, 'Level 1', { fill: '#FFF' });
        levelText.font = 'Revalia';
        levelText.fontSize = 20;
     
        // set cursors
        cursors = game.input.keyboard.createCursorKeys();
        
    },

    update: function() {
        
        Update.setCollision(game);
        Update.setPlayerMovement();
        Update.setCursor();
        
        if (player.health > 0) {
            game.physics.arcade.overlap(player, stars, Star.collect, null, this);
            game.physics.arcade.overlap(player, spikes, this.over, Spike.hurtPlayer, this);
        }
        
        if (this.score == 120) {
            Upgrade.showResult(player, spikes);           
            game.time.events.add(Phaser.Timer.SECOND * 3, Upgrade.switchState, this, ['stage2']);
        }
        
    },

    over: function(player, spike) {
        
        Spike.killPlayer(player, spike);
        
        window.onclick = function() {
            game.state.start('stage1');
        }
        
    },

};