'use strict'

function Frame() {
  this._pins = [];
  this._bonusPins = [];
  this._inPlay = false;
  this._strike = false;
  this._spare = false;
  this._frameScore = 0;
};

Frame.prototype.start = function() {
  this._inPlay = true;
};

Frame.prototype.finish = function() {
  this._inPlay = false;
};

Frame.prototype.add = function(number) {
  if ((this.inPlay()) === false) {
    return 'Not in play';
  }
  if (number > 10) {
    return 'Maximum of 10 per roll';
  }
  if ((this._pins[0] + number) > 10 ) {
    return 'Maximum of 10 per frame';
  }
  else {
    this._pins.push(number);
    this.checkBonus();
    this.checkToFinish();
  }
};

Frame.prototype.bonusAdd = function(number) {
  if ((this.strike()) && (this._bonusPins.length < 2)) {
    this._bonusPins.push(number);
  }
  if (this.spare() && (this._bonusPins.length < 1)) {
    this._bonusPins.push(number);
  }
};

Frame.prototype.score = function() {
  return this._pins.reduce(total);
};

Frame.prototype.bonusScore = function() {
  if (this._bonusPins.length != 0) {
    return this._bonusPins.reduce(total);
  }
  else {
    return 0;
  }
};

Frame.prototype.frameScore = function() {
  this._frameScore = (this.score() + this.bonusScore());
  return this._frameScore;
};

Frame.prototype.strike = function() {
  if (this._pins[0] === 10) {
    this._strike = true;
  };
  return this._strike;
};

Frame.prototype.spare = function() {
  if ((this.strike() === false) && (this.score() === 10)) {
    this._spare = true;
  };
  return this._spare;
};

Frame.prototype.inPlay = function() {
  return this._inPlay;
};

Frame.prototype.checkBonus = function() {
  this.spare();
  this.strike();
};

Frame.prototype.checkToFinish = function() {
  if ((this.strike()) || (this._pins.length === 2)) {
    this.finish();
  }
};

Frame.prototype.bonusFull = function() {
  if (this._spare && (this._bonusPins.length === 1)) {
    return true
  }
  if (this._strike && (this._bonusPins.length === 2)) {
    return true
  }
  else {
    return false
  }
};

Frame.prototype.isBonus = function() {
  if (this._strike || this._spare) {
    return true
  }
};

Frame.prototype.frameOver = function() {
  if (this.isBonus() && this.bonusFull()) {
    return true
  }
  if (this._pins.length === 2) {
    return true
  }
  else {
    return false
  }
};

function total(a, b) {
  return a + b;
};
