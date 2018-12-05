'use strict'

describe('Frame', function() {

  var frame;

  beforeEach(function() {
    frame = new Frame();
    frame.start();
  })

  describe('can be', function() {
    it('started', function() {
      expect(frame._inPlay).toEqual(true);
    });
    it('finished', function() {
      frame.finish();
      expect(frame._inPlay).toEqual(false);
    });
  });

  describe('has an add function which', function() {
    it("won't allow a score to be added if not in play", function() {
      frame.finish();
      expect(frame.add(2)).toEqual('Not in play');
    });
    it('records scores', function() {
      frame.add(5);
      expect(frame._pins).toContain(5);
    });
    it('records a maximum of two regular scores per frame', function() {
      frame.add(4);
      frame.add(4);
      expect(frame.add(2)).toEqual('Not in play');
    });
    it('records scores up to a maximum of ten per roll', function() {
      expect(frame.add(11)).toEqual('Foul Roll');
    });
    it('records scores up to a maximum of ten per frame', function() {
      frame.add(9);
      expect(frame.add(2)).toEqual('Foul Roll');
    });
  });

  describe('has an bonusAdd function which', function() {
    it("stores one roll if there was a spare", function() {
      frame.add(5);
      frame.add(5);
      frame.bonusAdd(8);
      frame.bonusAdd(4);
      expect(frame._bonusPins).toContain(8);
      expect(frame._bonusPins).not.toContain(4);
    });
    it('stores two rolls if there was a strike', function() {
      frame.add(10);
      frame.bonusAdd(8);
      frame.bonusAdd(2);
      expect(frame._bonusPins).toContain(8);
      expect(frame._bonusPins).toContain(2);
    });
  });

  describe('has a score function which', function() {
    it('returns the total of the rolls per frame', function() {
      frame.add(4);
      frame.add(4);
      expect(frame.score()).toEqual(8);
    });
  });

  describe('has a bonusScore function which', function() {
    it('returns the total of any bonus rolls', function() {
      frame.add(10);
      frame.bonusAdd(4);
      frame.bonusAdd(5);
      expect(frame.bonusScore()).toEqual(9);
    });
  });

  describe('has a frameScore function which', function() {
    it('returns the total score for the frame', function() {
      frame.add(10);
      frame.bonusAdd(4);
      frame.bonusAdd(5);
      expect(frame.frameScore()).toEqual(19);
    });
  });

  describe('has a strike function', function() {
    it('which confirms if there was a strike', function() {
      frame.add(10);
      expect(frame.strike()).toEqual(true);
    });
  });

  describe('has a spare function', function() {
    it('which confirms if there was a spare', function() {
      frame.add(5);
      frame.add(5);
      expect(frame.spare()).toEqual(true);
    });
  });

  describe('has a checkToFinish function', function() {
    it('which finishes a frame if there has been a strike', function() {
      frame.add(10);
      frame.checkToFinish();
      expect(frame.inPlay()).toEqual(false);
    });
    it('which finishes a frame if there have been two shots', function() {
      frame.add(3);
      frame.add(4);
      frame.checkToFinish();
      expect(frame.inPlay()).toEqual(false);
    });
  });

});
