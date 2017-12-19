const READY_STATUS = 'Ready';
const ON_HOLD_STATUS = 'On Hold';

var players = [];

function Player(){
  this.playerName = playerName;
  this.playerSimbol = playerSimbol;//The symbol is the url to an image that represents the player.
  this.playerCurrentPosition = currentPosition;
  this.playerStatus;
  this.playerId = playerId;
}
Player.prototype.isActive = function () {
  return this.playerStatus === READY_STATUS;
};

function nextPlayer(players){
  for (var i = 0; i < players.length; i++) {
    if(players[i].isActive() && i !== players.length-1){
      return players[i+1];
    }
    else {
      return player[0];
    }
  }
}
function throwDie(){
  return Math.floor((Math.random() * 6) + 1);
}

//
<<<<<<< HEAD
//                USER INTERFACE
=======
//                USER INTERFACE
>>>>>>> frontend
// 'use strict';
//
//
// Player Ready Animation
function playerReady (divId, playerName) {
  divId.html('<div class="card border-success playerReadyAnimation">' +
                           '<div class="text-success">' +
                             '<h4 class="display-4 mb-0">Player ' +
                              playerName + ' is ready!</h4>' +
                           '</div>' +
                         '</div>');
}
// Grab info from playerRegistrationForm
function playerReadyRegistrationForms () {
  var playerOneRegistrationForm = document.getElementById('player1RegistrationForm');
  var playerTwoRegistrationForm = document.getElementById('player2RegistrationForm');
  var playerThreeRegistrationForm = document.getElementById('player3RegistrationForm');
  var playerFourRegistrationForm = document.getElementById('player4RegistrationForm');

  playerOneRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('#player1name').text($('#player1').val());
    if (!$('#player1').val() == "") {
      $('#player1RegistrationForm').hide();
      playerReady($('#player1Ready'), $('#player1').val());
    }
  });

  playerTwoRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('#player2name').text($('#player2').val());
    if (!$('#player2').val() == "") {
      $('#player2RegistrationForm').hide();
      playerReady($('#player2Ready'), $('#player2').val());
    }
  });

  playerThreeRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('#player3name').text($('#player3').val());
    if (!$('#player3').val() == "") {
      $('#player3RegistrationForm').hide();
      playerReady($('#player3Ready'), $('#player3').val());
    }

  });

  playerFourRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('#player4name').text($('#player4').val());
    if (!$('#player4').val() == "") {
      $('#player4RegistrationForm').hide();
      playerReady($('#player4Ready'), $('#player4').val());
    }
  });
}


// Document Ready Function
$(function () {
  playerReadyRegistrationForms();
  $('.span-pg').click(function () {
    $('.gameboard').removeClass('hidden');
    $('.span-pg').addClass('hidden');
    $('.nobg').addClass('hidden');
  });
});
