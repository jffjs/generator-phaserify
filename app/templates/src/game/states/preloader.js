'use strict';

function Preloader() {
  this.asset = null;
  this.ready = false;
}

Preloader.prototype = {

  preload: function () {
    this.asset = this.add.sprite(320, 240, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('player', 'assets/images/player.png');
    this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia.png', 'assets/fonts/minecraftia.xml');
  },

  create: function () {
    this.asset.cropEnabled = false;
  },

  update: function () {
    if (!!this.ready) {
      this.game.state.start('menu');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};

module.exports = Preloader;
