var stage3 = function(game) {
    var player;
    var health;
    var spikes;
    var platforms;
    var cursors;

    var stars;
    var score;
    var scoreText;
    var resultText;
};

WebFontConfig = {
  
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
      families: ['Revalia', 'Righteous']
    }
    
};

stage3.prototype = {
  
    init: function(score, health) {
        this.score = score;
        this.health = health;
    },
  
    preload: function() {
      
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js');
        this.game.load.image('sky', 'assets/sky3.png');
        this.game.load.image('ground', 'assets/platform-3.png');
        this.game.load.image('star', 'assets/star.png');
        this.game.load.spritesheet('shirokuma', 'assets/shirokuma.png', 32, 32);
        this.game.load.spritesheet('loli', 'assets/loli.png', 32, 48);
        
    },

    create: function() {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // add background
        this.game.add.sprite(0, 0, 'sky');

        // add platforms
        platforms = this.game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, this.game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        
        // add ledges
        var ledge = platforms.create(550, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(360, 300, 'ground');
        ledge.scale.setTo(0.2, 1);
        ledge.body.immovable = true;
        ledge = platforms.create(0, 400, 'ground');
        ledge.scale.setTo(0.6, 1);
        ledge.body.immovable = true;
        ledge = platforms.create(100, 200, 'ground');
        ledge.scale.setTo(0.25, 1);
        ledge.body.immovable = true;
        ledge = platforms.create(615, 200, 'ground');
        ledge.scale.setTo(0.3, 1);
        ledge.body.immovable = true;
        ledge = platforms.create(315, 100, 'ground');
        ledge.scale.setTo(0.4, 1);
        ledge.body.immovable = true;
        
        // add player
        player = this.game.add.sprite(385, this.game.world.height - 430, 'loli');
        this.game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 350;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 8, true);
        player.animations.add('right', [5, 6, 7, 8], 8, true);
        player.health = this.health;
        
        // add spikes
        spikes = [];
        spikes[0] = this.game.add.sprite(280, this.game.world.height - 150, 'shirokuma');
        spikes[1] = this.game.add.sprite(700, this.game.world.height - 400, 'shirokuma'); 
        spikes[2] = this.game.add.sprite(450, this.game.world.height - 150, 'shirokuma'); 
        spikes[3] = this.game.add.sprite(50, this.game.world.height - 400, 'shirokuma'); 
        
        for (var i = 0; i < spikes.length; i++) {
            init.initSpike(spikes[i]);
        }
        
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.moveSpike1, this);
        this.game.time.events.loop(Phaser.Timer.SECOND, this.moveSpike2, this);
        this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.moveSpike3, this);
        this.game.time.events.loop(Phaser.Timer.SECOND, this.moveSpike4, this);

        // add stars
        stars = this.game.add.group();
        stars.enableBody = true;

        for (var i = 0; i < 12; i++) {
            var star = stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.5 + Math.random() * 0.4;
        }
     
        // add score text
        scoreText = this.game.add.text(60, 60, 'score: ' + this.score, { fontSize: '32px', fill: '#000' });
        
        // add health text
        healthText = this.game.add.text(550, 55, 'HP: ' + player.health, { fontSize: '32px', fill: '#000' });
     
        // add level text
        var levelText = this.game.add.text(345, 20, 'Level 3', { fill: '#FFF' });
        levelText.font = 'Revalia';
        levelText.fontSize = 20;

        // set cursors
        cursors = this.game.input.keyboard.createCursorKeys();
                
    },

    update: function() {
      
        update.setCollision(this.game);
        update.setPlayerMovement();
        update.setCursor();
        
        if (player.health > 0) {
            this.game.physics.arcade.overlap(player, stars, collect.collectStar, null, this);
            this.game.physics.arcade.overlap(player, spikes, this.hurtPlayer, null, this);       
        }
        
        if (this.score == 360) {
            resultText = this.game.add.text(300, 180, 'YOU WIN', { fill: '#001a33', wordWrap: true, wordWrapWidth: 6, align: 'center' });
            resultText.font = 'Righteous';
            resultText.fontSize = 100;
            // resultText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
            
            player.body.enable = false;
            spikes[0].body.enable = false;
            spikes[1].body.enable = false;
        }
      
    },

    moveSpike1: function() {

        var spikeMover = this.game.rnd.integerInRange(1, 2);
        
        if (spikes[0].body.position.x <= 200) {
            spikeMover = 1;
        } else if (spikes[0].body.position.x >= 500) {
            spikeMover = 2;
        }
        
        if (spikeMover == 1) {
            spikes[0].body.velocity.x = 60;
            spikes[0].animations.play('right');	
        }	else if (spikeMover == 2) {
            spikes[0].body.velocity.x = -60;
            spikes[0].animations.play('left');
        }
        
    },

    moveSpike2: function() {

        var spikeMover = this.game.rnd.integerInRange(1, 2);
        
        if (spikes[1].body.position.x <= 600) {
            spikeMover = 1;
        } else if (spikes[1].body.position.x >= 670) {
            spikeMover = 2;
        }
        
        if (spikeMover == 1) {
            spikes[1].body.velocity.x = 60;
            spikes[1].animations.play('right');	
        }	else if (spikeMover == 2) {
            spikes[1].body.velocity.x = -60;
            spikes[1].animations.play('left');
        }
        
    },
    
    moveSpike3: function() {
               
        var spikeMover = this.game.rnd.integerInRange(1, 2);
        
        if (spikes[2].body.position.x <= 200) {
            spikeMover = 1;
        } else if (spikes[2].body.position.x >= 500) {
            spikeMover = 2;
        }
        
        if (spikeMover == 1) {
            spikes[2].body.velocity.x = 60;
            spikes[2].animations.play('right');	
        }	else if (spikeMover == 2) {
            spikes[2].body.velocity.x = -60;
            spikes[2].animations.play('left');
        }
      
    },
    
    moveSpike4: function() {
      
      var spikeMover = this.game.rnd.integerInRange(1, 2);
        
        if (spikes[3].body.position.x <= 50) {
            spikeMover = 1;
        } else if (spikes[3].body.position.x >= 150) {
            spikeMover = 2;
        }
        
        if (spikeMover == 1) {
            spikes[3].body.velocity.x = 60;
            spikes[3].animations.play('right');	
        }	else if (spikeMover == 2) {
            spikes[3].body.velocity.x = -60;
            spikes[3].animations.play('left');
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

        resultText = this.game.add.text(320, 200, 'GAME OVER', { fill: '#000', wordWrap: true, wordWrapWidth: 5, align: 'center' });
        resultText.font = 'Righteous';
        resultText.fontSize = 50;
        
        var restart = this.game.add.text(320, 322, 'click to restart', {fill: '#FFF'});
        restart.fontSize = 22;
        
        window.onclick = function() {
            this.game.state.start('stage3', true, false, 240, window.health);
        }
        
    },
    
};



