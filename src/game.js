'use strict'

function Game() {
  this._frames = this.setUp();
  this._currentFrame = 0;
  this._runningTotal;
};

Game.prototype.setUp = function() {
  var frame = new Frame;
  var frames = []
  for (var i=0; i<10; i++) {
    frames.push(frame);
  };
  return frames
};

Game.prototype.runningTotal = function() {
  this._frames.forEach(function(frame) {
    this._runningTotal += frame.frameScore();
  });
};
