var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky2.jpg');
    game.load.image('ground', 'assets/platform2.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
    game.load.spritesheet('loli', 'assets/loli.png', 32, 48);

}

var player;
var spikes;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;
var resultText;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // add background
    game.add.sprite(0, 0, 'sky');

    // add platforms
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    // add ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    
    // add player
    player = game.add.sprite(32, game.world.height - 150, 'loli');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 8, true);
    player.animations.add('right', [5, 6, 7, 8], 8, true);
    player.health = 100;
    
    // add spikes
    spikes = [];
    spikes[0] = game.add.sprite(400, game.world.height - 150, 'baddie');
    spikes[1] = game.add.sprite(700, game.world.height - 400, 'baddie'); 
    
    for (var i = 0; i < spikes.length; i++) {
        initSpike(spikes[i]);
    }
    
    game.time.events.loop(Phaser.Timer.SECOND * 2, moveSpike, this);
    game.time.events.loop(Phaser.Timer.SECOND, moveSpike2, this);

    

    // add stars
    stars = game.add.group();
    stars.enableBody = true;

    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.5 + Math.random() * 0.4;
    }
 
    // add score text
    scoreText = game.add.text(50, 50, 'score: 0', { fontSize: '32px', fill: '#000' });
    
    // add health text
    healthText = game.add.text(640, 50, 'HP: ' + player.health, { fontSize: '32px', fill: '#000' });;
 
    // set cursors
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms); 
    
    for (var i = 0; i < spikes.length; i++) {
        game.physics.arcade.collide(spikes[i], platforms);
    }
    
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -320;
    }
    
    if (player.health > 0) {
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
        game.physics.arcade.overlap(player, spikes, hurtPlayer, null, this);       
    }
    
    if (score == 120) {
        resultText = game.add.text(330, 220, 'STAGE CLEAR', { fontSize: '200px', fill: '#000', wordWrap: true, wordWrapWidth: 6, align: 'center' });
        player.body.enable = false;
        spikes[0].body.enable = false;
        spikes[1].body.enable = false;
    }
    
}

function initSpike(spike) {
    
    game.physics.arcade.enable(spike);
    spike.body.gravity.y = 300;
    spike.body.collideWorldBounds = true;
    spike.animations.add('left', [0, 1], 10, true);
    spike.animations.add('right', [2, 3], 10, true);
    
}

function collectStar(player, star) {
    
    star.kill();
    
    score += 10;
    scoreText.text = 'Score: ' + score;

}

function moveSpike() {

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
    
}

function moveSpike2() {

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
    
}

function hurtPlayer(player, spike) {

    if (player.x < spike.x + 32) {
        if (player.health > 10) {
            player.health -= 10;
            healthText.text = 'HP: ' + player.health;
            // toss the player a little bit to the left
            player.body.velocity.x = -300;
            player.animations.play('left');
        } else {
            killPlayer(player, spike);
        }           
    } else {
        if (player.health > 10) {
            player.health -= 10;
            healthText.text = 'HP: ' + player.health;
            // toss the player a little bit to the right
            player.body.velocity.x = 300;
            player.animations.play('right');   
        } else {
            killPlayer(player, spike);
        }
    }
    
}

function killPlayer(player, spike) {
    
    player.kill();

    player.health = 0;
    healthText.text = 'HP: ' + player.health;
    
    spike.body.enable = false;

    resultText = game.add.text(330, 220, 'GAME OVER', { fontSize: '200px', fill: '#000', wordWrap: true, wordWrapWidth: 5, align: 'center' });
    
}
