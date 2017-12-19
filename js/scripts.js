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
// Capitalize function
function Capitalize (string) { return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); }
// Player Ready Animation
function playerReady (playerReadyDivId, playerName) {
  $(playerReadyDivId).html('<div class="card border-success playerReadyAnimation">' +
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
    var player = Capitalize($('#player1').val());

    if (!player == "") {
      $('#player1name').text(player);
      $('#player1RegistrationForm').hide();
      playerReady('#player1Ready', player);
    }
  });

  playerTwoRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var player = Capitalize($('#player2').val());

    if (!player == "") {
      $('#player2name').text(player);
      $('#player2RegistrationForm').hide();
      playerReady('#player2Ready', player);
    }
  });

  playerThreeRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var player = Capitalize($('#player3').val());

    if (!$('#player3').val() == "") {
      $('#player3name').text(player);
      $('#player3RegistrationForm').hide();
      playerReady('#player3Ready', player);
    }
  });

  playerFourRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var player = Capitalize($('#player4').val());

    if (!$('#player4').val() == "") {
      $('#player4name').text(player);
      $('#player4RegistrationForm').hide();
      playerReady($('#player4Ready'), player);
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
