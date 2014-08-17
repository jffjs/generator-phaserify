'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var PhaserifyGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(this.yeoman);

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project?',
      default: 'phaser game'
    },
    {
      name: 'phaserVersion',
      message: 'Which Phaser version would you like to use?',
      default: '2.0.7'
    },
    {
      name: 'gameWidth',
      message: 'Game Display Width',
      default: 800
    },
    {
      name: 'gameHeight',
      message: 'Game Display Height',
      default: 600
    }
  ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.phaserVersion = props.phaserVersion;
      this.gameHeight = props.gameHeight;
      this.gameWidth = props.gameWidth;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('src');
    this.mkdir('src/assets');
    this.mkdir('src/game');

    this.directory('gulp', 'gulp');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    
    this.copy('bowerrc', '.bowerrc');
    this.copy('_gulpfile.js', 'gulpfile.js');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');

    this.copy('src/assets/fonts/minecraftia.png', 'src/assets/fonts/minecraftia.png');
    this.copy('src/assets/fonts/minecraftia.xml', 'src/assets/fonts/minecraftia.xml');
    this.copy('src/assets/images/player.png', 'src/assets/images/player.png');
    this.copy('src/assets/images/preloader.gif', 'src/assets/images/preloader.gif');
    this.copy('src/css/main.less', 'src/css/main.less');

    this.template('src/game/states/boot.js', 'src/game/states/boot.js');
    this.template('src/game/states/game.js', 'src/game/states/game.js');
    this.template('src/game/main.js', 'src/game/main.js');
    this.template('src/game/states/menu.js', 'src/game/states/menu.js');
    this.template('src/game/states/preloader.js', 'src/game/states/preloader.js');
    this.template('src/css/main.less', 'src/css/main.less');
    this.template('src/index.html', 'src/index.html');
  }
});

module.exports = PhaserifyGenerator;
