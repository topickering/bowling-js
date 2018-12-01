'use strict'

describe('Game', function() {

  var game;

  beforeEach(function() {
    game = new Game();
  })

  describe('has a setUp function', function() {
    it('which populates the game with ten frames', function() {
      expect(game._frames.length).toEqual(10);
    });
  });

  describe('has an add function', function() {
    it('which adds a score to a frame', function() {
      game.add(1);
      expect(game._frames[0].score()).toEqual(1);
    });
  });

  describe('has a bonusAdd function', function() {
    it ('which, if applicable, adds a bonus to a frame', function() {
      game.add(10);
      game.bonusAdd(5);
      expect(game._frames[0]._bonusPins).toContain(5);
    });
  });

  describe('has a runningTotal function', function() {
    it('calculate the current total of frames played', function() {
      game.add(4);
      game.add(5);
      expect(game.runningTotal()).toEqual(9);
    });
  });

  describe('has a frameIndexUpdate function', function() {
    it('which updates the Index if the frame is finished', function() {
      game.add(4);
      game.add(5);
      game.frameIndexUpdate();
      expect(game._currentFrameIndex).toEqual(1);
    });
  });

});
