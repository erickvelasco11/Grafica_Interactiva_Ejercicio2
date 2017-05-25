﻿function postCreate() {
    player1.destroy();
    intro = game.add.audio('intro');
    intro.play('', 0, 1, true);
    game.add.sprite(0, 0, 'background');
    game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = game.add.group();
    initPlatforms(platforms);

    collectables = game.add.group();
    collectables.enableBody = true;
    shots1 = game.add.group();
    shots1.enableBody = true;
    shots2 = game.add.group();
    shots2.enableBody = true;

    logo = game.add.sprite(game.world.centerX - 223, 100, 'logo');
    btnStart = game.add.button(game.world.centerX - 100, 400, 'btnStart', initGame, this, 2, 1, 0);

    /*btnStart.onInputOver.add(over, this);
    btnStart.onInputOut.add(out, this);
    btnStart.onInputUp.add(up, this);*/

    initKeys();
}

function initGame() {
    fps = 0;
    btnStart.destroy();
    intro.pause();
    logo.destroy();

    initLifeBar(game.add.graphics(16, 50), WHITE);
    initLifeBar(game.add.graphics(game.world.width - 272, 50), WHITE);
    lifeBar1 = game.add.graphics(16, 50);
    lifeBar2 = game.add.graphics(game.world.width - 272, 50);
    initLifeBar(lifeBar1, GREEN);
    initLifeBar(lifeBar2, GREEN);

    player1 = game.add.sprite(32, game.world.height - 112, 'pikachu');
    player2 = game.add.sprite(game.world.width - 64, game.world.height - 112, 'charmander');
    initPlayer(player1);
    initPlayer(player2);

    scoreText1 = game.add.text(16, 16, 'Tiros: 0', { font: '20px Arial' });
    scoreText2 = game.add.text(game.world.width - 100, 16, 'Tiros: 0', { font: '20px Arial' });
    timeText = game.add.text(game.world.centerX, 20, 'Tiempo: ' + time, { font: '30px Arial' });
    timeText.anchor.set(0.5);
    roundText = game.add.text(game.world.centerX, 50, 'Round ' + round, { font: '20px Arial' });
    roundText.anchor.set(0.5)

    state = READY;

    readyText = game.add.text(game.world.centerX, game.world.centerY, 'Round ' + round, { font: "80px Arial", align: "center" });
    readyText.anchor.set(0.5);

    battle = game.add.audio('battle');
    battle.play('', 0, 1, true);
}


function pause() {
    battle.pause();
    game.add.audio('pause').play('', 0, 1, false);
    background_pause = game.add.sprite(0, 0, 'background_pause');
    state = PAUSED;
    dataPause.push(player1.body.velocity.x);
    dataPause.push(player1.body.velocity.y);
    dataPause.push(player2.body.velocity.x);
    dataPause.push(player2.body.velocity.y);
    player1.body.gravity.y = 0;
    player1.body.velocity.x = 0;
    player1.body.velocity.y = 0;
    player2.body.gravity.y = 0;
    player2.body.velocity.x = 0;
    player2.body.velocity.y = 0;
    for (var i = 0; i < collectables.children.length; i++) {
        dataPause.push(collectables.children[i].body.velocity.x);
        dataPause.push(collectables.children[i].body.velocity.y);
        collectables.children[i].body.gravity.y = 0;
        collectables.children[i].body.velocity.x = 0;
        collectables.children[i].body.velocity.y = 0;
    }
    for (var i = 0; i < platforms.children.length; i++) {
        dataPause.push(platforms.children[i].body.velocity.x);
        platforms.children[i].body.velocity.x = 0;
    }
    for (var i = 0; i < shots1.children.length; i++) {
        dataPause.push(shots1.children[i].body.velocity.x);
        dataPause.push(shots1.children[i].body.velocity.y);
        shots1.children[i].body.velocity.x = 0;
        shots1.children[i].body.velocity.y = 0;
    }
    for (var i = 0; i < shots2.children.length; i++) {
        dataPause.push(shots2.children[i].body.velocity.x);
        dataPause.push(shots2.children[i].body.velocity.y);
        shots2.children[i].body.velocity.x = 0;
        shots2.children[i].body.velocity.y = 0;
    }
}

function unpause() {
    game.add.audio('pause').play('', 0, 1, false);
    battle.resume();
    background_pause.kill();
    state = PLAYING;
    player1.body.gravity.y = GRAVITY;
    player1.body.velocity.x = dataPause.shift();
    player1.body.velocity.y = dataPause.shift();
    player2.body.gravity.y = GRAVITY;
    player2.body.velocity.x = dataPause.shift();
    player2.body.velocity.y = dataPause.shift();
    for (var i = 0; i < collectables.children.length; i++) {
        collectables.children[i].body.gravity.y = GRAVITY;
        collectables.children[i].body.velocity.x = dataPause.shift();
        collectables.children[i].body.velocity.y = dataPause.shift();
    }
    for (var i = 0; i < platforms.children.length; i++) {
        platforms.children[i].body.velocity.x = dataPause.shift();
    }
    for (var i = 0; i < shots1.children.length; i++) {
        shots1.children[i].body.velocity.x = dataPause.shift();
        shots1.children[i].body.velocity.y = dataPause.shift();
    }
    for (var i = 0; i < shots2.children.length; i++) {
        shots2.children[i].body.velocity.x = dataPause.shift();
        shots2.children[i].body.velocity.y = dataPause.shift();
    }
}