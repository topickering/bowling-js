'use strict'

describe('Game', function() {

  var game;

  beforeEach(function() {
    game = new Game();
  })

  describe('has a setUp function', function() {
    it('which populates the game with ten frames', function() {
      game.setUp();
      expect(game._frames.length).toEqual(10)
    });
  });

});
