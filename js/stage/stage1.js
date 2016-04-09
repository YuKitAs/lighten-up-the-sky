/**
* @author   YuKitAs
*/
var stage1 = function() {};

WebFontConfig = {
  
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
      families: ['Revalia', 'Righteous']
    }
    
};

stage1.prototype = {
  
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
        init.ground(platforms);

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
        init.player(player);
        
        // add spikes
        spikes = [];
        spikes[0] = game.add.sprite(400, game.world.height - 150, 'shirokuma');
        spikes[1] = game.add.sprite(700, game.world.height - 400, 'shirokuma');
        
        for (var i = 0; i < spikes.length; i++) {
            init.spike(spikes[i]);
        }
        
        // set movement of spikes
        game.time.events.loop(Phaser.Timer.SECOND * 2, this.moveSpike1, this);
        game.time.events.loop(Phaser.Timer.SECOND, this.moveSpike2, this);

        // add stars
        stars = game.add.group();
        init.stars(stars);
     
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
        
        update.setCollision(game);
        update.setPlayerMovement();
        update.setCursor();
        
        if (player.health > 0) {
            game.physics.arcade.overlap(player, stars, collect.stars, null, this);
            game.physics.arcade.overlap(player, spikes, this.hurtPlayer, null, this);
        }
        
        if (this.score == 120) {
            resultText = game.add.text(310, 200, 'STAGE CLEAR', { fill: '#FFF', wordWrap: true, wordWrapWidth: 6, align: 'center' });
            resultText.font = 'Righteous';
            resultText.fontSize = 50;
            
            player.body.enable = false;
            spikes[0].body.enable = false;
            spikes[1].body.enable = false;

            game.time.events.add(Phaser.Timer.SECOND * 3, upgrade.switchState, this, ['stage2']);
        }
        
    },

    moveSpike1: function() {

        var spikeMover = game.rnd.integerInRange(1, 2);
        
        if (spikes[0].body.position.x <= 200) {
            spikeMover = 1;
        } else if (spikes[0].body.position.x >= 300) {
            spikeMover = 2;
        }
        
        if (spikeMover == 1) {
            spikes[0].body.velocity.x = 50;
            spikes[0].animations.play('right');	
        }	else if (spikeMover == 2) {
            spikes[0].body.velocity.x = -50;
            spikes[0].animations.play('left');
        }
        
    },

    moveSpike2: function() {

        var spikeMover = game.rnd.integerInRange(1, 2);
        
        if (spikes[1].body.position.x <= 420) {
            spikeMover = 1;
        } else if (spikes[1].body.position.x >= 600) {
            spikeMover = 2;
        }
        
        if (spikeMover == 1) {
            spikes[1].body.velocity.x = 50;
            spikes[1].animations.play('right');	
        }	else if (spikeMover == 2) {
            spikes[1].body.velocity.x = -50;
            spikes[1].animations.play('left');
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
            } else {
                this.killPlayer(player, spike);
            }           
        } else {
            if (player.health > 10) {
                player.health -= 10;
                healthText.text = 'HP: ' + player.health;
                // toss the player a little bit to the right
                player.body.velocity.x = 300;
                player.animations.play('right');   
            } else {
                this.killPlayer(player, spike);
            }
        }
        
    },

    killPlayer: function(player, spike) {
        
        player.kill();

        player.health = 0;
        healthText.text = 'HP: ' + player.health;
        
        spike.body.enable = false;

        resultText = game.add.text(320, 200, 'GAME OVER', {fill: '#FFF', wordWrap: true, wordWrapWidth: 5, align: 'center' });
        resultText.font = 'Righteous';
        resultText.fontSize = 50;
        
        restart = game.add.text(320, 320, 'click to restart', {fill: '#FFF'});
        restart.fontSize = 22;
        
        window.onclick = function() {
            game.state.start('stage1');
        }
        
    },

};