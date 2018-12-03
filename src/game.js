'use strict'

function Game() {
  this._frames = this.setUp();
  this._currentFrameIndex = 0;
  this._runningTotal = 0;
};

Game.prototype.setUp = function() {
  var frames = []
  for (var i=0; i<10; i++) {
    frames.push(new Frame);
  };
  return frames;
};

Game.prototype.add = function(number) {
  if (this._currentFrameIndex <= 9) {
    var frame1 = this.currentFrame();
    frame1.start();
    frame1.add(number);
  }
};

Game.prototype.bonusAdd = function(number) {
  this._frames.forEach(function(frame) {
    if (frame._strike || frame._spare) {
      frame.bonusAdd(number);
    }
  });
};

Game.prototype.runningTotal = function() {
  var frameScores = [0];
  this._frames.forEach(function(frame) {
    if (frame._pins.length != 0) {
      frameScores.push(frame.frameScore());
    }
  });
  this._runningTotal = frameScores.reduce(total);
  return this._runningTotal;
};

Game.prototype.currentFrame = function() {
  return this._frames[this._currentFrameIndex];
};

Game.prototype.frameIndexUpdate = function() {
  if ((this.currentFrame().inPlay() === false) && (this._framesLeft())) {
    this._currentFrameIndex += 1;
  }
};

Game.prototype.enterRoll = function(number) {
  // if (!this.foulRoll(number)) {
    this.bonusAdd(number);
  // };
  this.add(number);
  this.runningTotal();
  this.frameIndexUpdate();
  this.finalScore();
};

Game.prototype._framesLeft = function() {
  if (this._currentFrameIndex < 9) {
    return true;
  }
};

Game.prototype.gameOver = function() {
  if (this._frames[9].frameOver()) {
    return true;
  }
};

Game.prototype.finalScore = function() {
  if (this.gameOver()) {
    console.log('Game Over. Your score: ' + this.runningTotal());
    return true;
  }
};

Game.prototype.foulRoll = function(number) {
  if (this.currentFrame().foulRoll(number)) {
    return true;
  }
};

function total(a, b) {
  return a + b;
};
