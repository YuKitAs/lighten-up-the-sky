/**
* @author   YuKitAs
*/
var Stage2 = function() {};

WebFontConfig = {
  
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
      families: ['Revalia', 'Righteous']
    }
    
};

Stage2.prototype = {
  
    init: function(score, health) {
      
        this.score = score;
        this.health = health;
        
    },
  
    preload: function() {
      
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js');
        game.load.image('sky', 'assets/sky-2.png');
        game.load.image('ground', 'assets/platform-2.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('shirokuma', 'assets/shirokuma.png', 32, 32);
        game.load.spritesheet('loli', 'assets/loli.png', 32, 48);
        
    },

    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        // add background
        game.add.sprite(0, 0, 'sky');

        // add platforms
        platforms = game.add.group();
        Init.ground(platforms);
        
        // add ledges
        var ledge = platforms.create(550, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(50, 200, 'ground');
        ledge.scale.setTo(0.5, 1);
        ledge.body.immovable = true;
        ledge = platforms.create(335, 300, 'ground');
        ledge.scale.setTo(0.3, 1);
        ledge.body.immovable = true;
        ledge = platforms.create(615, 180, 'ground');
        ledge.scale.setTo(0.3, 1);
        ledge.body.immovable = true;
        ledge = platforms.create(-30, 400, 'ground');
        ledge.scale.setTo(0.18, 1);
        ledge.body.immovable = true;
        
        // add player
        player = game.add.sprite(50, game.world.height - 500, 'loli');
        player.health = this.health;
        Init.player(player);
        
        // add spikes
        spikes = [];
        spikes[0] = game.add.sprite(280, game.world.height - 150, 'shirokuma');
        spikes[1] = game.add.sprite(700, game.world.height - 400, 'shirokuma'); 
        spikes[2] = game.add.sprite(450, game.world.height - 150, 'shirokuma'); 
        Init.spike(spikes);
        
        game.time.events.loop(Phaser.Timer.SECOND * 2, Spike.move, this, spikes[0], 200, 500);
        game.time.events.loop(Phaser.Timer.SECOND, Spike.move, this, spikes[1], 600, 670);
        game.time.events.loop(Phaser.Timer.SECOND * 2, Spike.move, this, spikes[2], 150, 400);

        // add stars
        stars = game.add.group();
        Init.star(stars);
     
        // add score text
        scoreText = game.add.text(60, 60, 'score: ' + this.score, { fontSize: '32px', fill: '#000' });
        
        // add health text
        healthText = game.add.text(550, 55, 'HP: ' + player.health, { fontSize: '32px', fill: '#000' });
        
        // add level text
        var levelText = game.add.text(345, 20, 'Level 2', { fill: '#FFF' });
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
        
        if (this.score == 240) {
            Upgrade.showResult(player, spikes);
            game.time.events.add(Phaser.Timer.SECOND * 3, Upgrade.switchState, this, ['stage3']);
        }
      
    },

    over: function(player, spike) {

        Spike.killPlayer(player, spike);
        
        window.onclick = function() {
            game.state.start('stage2', true, false, 120, window.health);
        }
        
    },
    
};