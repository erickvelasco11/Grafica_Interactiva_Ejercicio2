﻿function initLifeBar(lifeBar, tint) {
    lifeBar.lineStyle(5, 0xffffff, 1);
    lifeBar.tint = tint;
    lifeBar.moveTo(0, 0);
    lifeBar.lineTo(250, 0);
    lifeBar.scale.x = 1;
    lifeBar.endFill();
}

function initPlayer(player) {
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = GRAVITY;
    player.animations.add('right', [1, 2, 3, 4, 5], 10, true);
    player.animations.add('left', [6, 7, 8, 9, 10], 10, true);
    player.animations.add('front', [11, 12, 13, 14, 15], 10, true);
    player.animations.add('die', [16, 17, 18, 19, 20], 5, false);
    player.animations.play('front');
}

function initKeys() {
    up1 = game.input.keyboard.addKey(Phaser.Keyboard.W);
    down1 = game.input.keyboard.addKey(Phaser.Keyboard.S);
    left1 = game.input.keyboard.addKey(Phaser.Keyboard.A);
    right1 = game.input.keyboard.addKey(Phaser.Keyboard.D);
    up2 = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    down2 = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    left2 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right2 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    p = game.input.keyboard.addKey(Phaser.Keyboard.P);
    u = game.input.keyboard.addKey(Phaser.Keyboard.U);
    g = game.input.keyboard.addKey(Phaser.Keyboard.G);
    k = game.input.keyboard.addKey(Phaser.Keyboard.K);
}

function initPlatforms(platforms) {
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 32, 'ground');
    ground.scale.setTo(2, 1);
    ground.body.immovable = true;
}

function resetData() {
    winText.destroy();
    state = READY;
    background_pause.kill();
    btnStart.destroy();
    player1.destroy();
    player2.destroy();
    score1 = 0;
    score2 = 0;
    time = ROUND_TIME;
    fps = 0;
    directions = [WITHOUT_DIRECTION, WITHOUT_DIRECTION];
    for (var i = 0; i < collectables.children.length; i++) {
        collectables.children[i].kill();
    }
    for (var i = 0; i < platforms.children.length; i++) {
        platforms.children[i].kill();
    }
    for (var i = 0; i < shots1.children.length; i++) {
        shots1.children[i].kill();
    }
    for (var i = 0; i < shots2.children.length; i++) {
        shots2.children[i].kill();
    }
}