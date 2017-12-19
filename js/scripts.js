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
//                USER INTERFACE 
// 'use strict';
//
//
// Player Ready Animation
function playerReady () {
  $('.playerReady').html('<div class="card border-success playerReadyAnimation">' +
                           '<div class="card-body text-success">' +
                             '<h4 class="display-4 mb-0">PLAYER READY!</h4>' +
                           '</div>' +
                         '</div>');
}
// Grab info from playerRegistrationForm
function playerReadyRegistrationForms () {
  var playerOneRegistrationForm = document.getElementById('playerOneRegistrationForm');
  var playerTwoRegistrationForm = document.getElementById('playerTwoRegistrationForm');
  var playerThreeRegistrationForm = document.getElementById('playerThreeRegistrationForm');
  var playerFourRegistrationForm = document.getElementById('playerFourRegistrationForm');

  playerOneRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('#playerOneName').text($('#playerOneNameInput').val());
    $('#playerOneRegistrationForm').hide();
    playerReady();
  });

  playerTwoRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('#playerTwoName').text($('#playerTwoNameInput').val());
  });

  playerThreeRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('#playerThreeName').text($('#playerThreeNameInput').val());

  });

  playerFourRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    $('#playerFourName').text($('#playerFourNameInput').val());
  });
}


// Document Ready Function
$(function () {
  playerReadyRegistrationForms();
});
