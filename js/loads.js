﻿/*
    Este archivo es para manejar la carga de archivos a la aplicación
    También permite visualizar la barra de carga de los créditos
*/

//Variables de manejo de estados de carga
var loadBar;
var loadText;
var loadType = LOAD_ANYTHING;

//Esta función carga todos los archivos que necesita la aplicación como sonidos e imágenes
function loadAssets() {
    loadType = LOAD_LOADING;
    game.load.image('logo', 'assets/logo.png');
    game.load.image('background', 'assets/background.png');
    game.load.image('background_pause', 'assets/background_pause.png');
    game.load.image('ground', 'assets/platform_ground.png');
    game.load.image('cloud', 'assets/platform_cloud.png');
    game.load.image('collectable', 'assets/powerups/collectable.png');
    game.load.image('shoot1', 'assets/powerups/shoot1.png');
    game.load.image('shoot2', 'assets/powerups/shoot2.png');
    game.load.image('medal', 'assets/medal.png');
    game.load.audio('battle', 'assets/sounds/battle.mp3');
    game.load.audio('intro', 'assets/sounds/intro.mp3');
    game.load.audio('credits', 'assets/sounds/credits.mp3');
    game.load.audio('hit', 'assets/sounds/hit.mp3');
    game.load.audio('die', 'assets/sounds/die.mp3');
    game.load.audio('shoot1', 'assets/sounds/shoot1.mp3');
    game.load.audio('shoot2', 'assets/sounds/shoot2.mp3');
    game.load.audio('pause', 'assets/sounds/pause.mp3');
    game.load.spritesheet('charmander', 'assets/characters/charmander.png', 48, 48);
    game.load.spritesheet('btnStart', 'assets/buttons/btnStart.png', 200, 80);
    game.load.spritesheet('btnNext', 'assets/buttons/btnNext.png', 200, 80);
    game.load.spritesheet('btnCredits', 'assets/buttons/btnCredits.png', 200, 80);
    game.load.spritesheet('btnReset', 'assets/buttons/btnReset.png', 200, 80);
    game.load.spritesheet('btnMuteMusic', 'assets/buttons/btnMuteMusic.png', 32, 32);
    game.load.spritesheet('btnMuteSounds', 'assets/buttons/btnMuteSounds.png', 32, 32);
    game.load.spritesheet('keys', 'assets/keys.png', 48, 48);

    game.load.start();
}

//Esta función es de Phaser y se llama cuando la carga de archivos va a empezar
function loadStart() {
    switch (loadType) {
        case LOAD_LOADING:
            loadBar = game.add.graphics(100, game.world.centerY - 12);

            loadBar.lineStyle(35, 0xffffff, 1);
            loadBar.tint = YELLOW;
            loadBar.moveTo(0, 0);
            loadBar.lineTo(game.world.width - 200, 0);
            loadBar.scale.x = 0;
            loadBar.endFill();

            player1 = game.add.sprite(52, 260, 'pikachu');
            player1.animations.add('right', [1, 2, 3, 4, 5], 10, true);
            player1.animations.play('right');
            loadText = game.add.text(game.world.centerX, game.world.centerY + 40, "Cargando...", { font: "30px Arial", align: "center", fill: '#ffffff' });
            loadText.anchor.set(0.5);
            break;
    }
}

//Esta función es de Phaser y se llama cuando un archivo se a descargado completamente y está listo para usarse
//Yo la uso para mover la barra de carga del inicio de la aplicación
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    switch (loadType) {
        case LOAD_COMPONENTS:
            loadBar.scale.x = progress * 0.01;
            player1.x = ((600 * progress) / 100) + 52;
            break;
    }
}

//Esta función es de Phaser y se llama al terminar toda la descarga de los archivos necesarios
function loadComplete() {
    switch (loadType) {
        case LOAD_LOADING:
            loadType = LOAD_COMPONENTS;
            break;
        case LOAD_COMPONENTS:
            postCreate();
            break;
    }
}

//Esta función actualiza la barra de carga de los créditos
function creditsLoadingBar() {
    if (fps % 5 == 0) {
        loadBar.scale.x += 0.0004025;
    }
}