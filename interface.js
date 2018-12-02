$(document).ready(function() {
  var game = new Game;
  update();

  $('#0').click(function() {
    game.enterRoll(0);
    update();
  });

  $('#1').click(function() {
    game.enterRoll(1);
    update();
  });

  $('#2').click(function() {
    game.enterRoll(2);
    update();
  });

  $('#3').click(function() {
    game.enterRoll(3);
    update();
  });

  $('#4').click(function() {
    game.enterRoll(4);
    update();
  });

  $('#5').click(function() {
    game.enterRoll(5);
    update();
  });

  $('#6').click(function() {
    game.enterRoll(6);
    update();
  });

  $('#7').click(function() {
    game.enterRoll(7);
    update();
  });

  $('#8').click(function() {
    game.enterRoll(8);
    update();
  });

  $('#9').click(function() {
    game.enterRoll(9);
    update();
  });

  $('#10').click(function() {
    game.enterRoll(10);
    update();
  });

  function updateRunningTotal() {
    $('#runningTotal').text(game.runningTotal());
  };

  function updateCurrentFrame() {
    $('#currentFrame').text(game._currentFrameIndex + 1);
  };

  function update() {
    updateRunningTotal();
    updateCurrentFrame();
  };

});
