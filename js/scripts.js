//Constants
const READY_STATUS = 'Ready';
const ON_HOLD_STATUS = 'On hold';
const ON_2_HOLD_STATUS = 'On 2 hold';
const SKIP_TURN_BEHAVIOR = 'Skip turn';
const GO_BACK_TO_START_BEHAVIOR = 'Go back to start';
const MOVE_UP_2_SPACES_BEHAVIOR = 'Move up 2 spaces';
const GO_BACK_5_SPACES_BEHAVIOR = 'Go back 5 spaces';
const EXTRA_TURN_BEHAVIOR = 'Extra turn';
const NOT_BEHAVIOR = 'Not behavior';
//Variables
var players = [];//Array of players
var player;//Current player
var spacesNumber;//Number of spaces on the board
var spacesOnBoard = [];//Array of spaces
//Player constructor, prototype and methods
function Player(playerName, playerSimbol, currentPosition, playerStatus, playerId){
  this.playerName = playerName;
  this.playerSimbol = playerSimbol;//The symbol is the url to an image that represents the player.
  this.playerCurrentPosition = currentPosition;
  this.playerStatus = playerStatus;
  this.playerId = playerId;
}
Player.prototype.isActive = function () {
  return this.playerStatus === READY_STATUS;
}

function nextPlayer(){
  for (var i = 0; i < players.length; i++) {
    if(players[i].playerId === player.playerId && i !== players.length-1){
      return players[i+1];
    }
    else {
      return players[0];
    }
  }
}
//Space constructor
function Space(spaceNumber, spaceBehavior){
  this.spaceNumber = spaceNumber;
  this.spaceBehavior = spaceBehavior;
  this.spacePlayers = [];
}
function findSpaceByNumber(spacesOnBoard, spaceNumber){
  for (var i = 0; i < spacesOnBoard.length; i++) {
    if (spacesOnBoard[i].spaceNumber === spaceNumber) {
      return spacesOnBoard[i];
    }
  }
  return -1;
}
function throwDice(){
  return Math.floor((Math.random() * 6) + 1);
}
Space.prototype.removePlayer = function () {
  var playersTemp = this.spacePlayers;
  this.spacePlayers = [];
  for (var i = 0; i < playersTemp.length; i++) {
    if (playersTemp[i].playerId != player.playerId) {
      this.spacePlayers.push(playersTemp[i]);
    }
  }
};

function playJumanji(){
  var extraTurnFlag = false;
  var skipTurnFlag = false;
  var nextPlayer;
  if(player.playerStatus !== ON_2_HOLD_STATUS){
    var diceValue = throwDice();
    var currentSpace = findSpaceByNumber(spacesOnBoard, player.playerCurrentPosition);
    currentSpace.removePlayer(player);
    nextSpace =  findSpaceByNumber(spacesOnBoard, player.playerCurrentPosition + diceValue);
    if(nextSpace.spaceBehavior === NOT_BEHAVIOR){
      player.playerCurrentPosition = nextSpace.spaceNumber;
    }
    else if (nextSpace.spaceBehavior === GO_BACK_TO_START_BEHAVIOR) {
      nextSpace =  findSpaceByNumber(spacesOnBoard, player.playerCurrentPosition - player.playerCurrentPosition);
    }
    else if (nextSpace.spaceBehavior === MOVE_UP_2_SPACES_BEHAVIOR) {
      nextSpace =  findSpaceByNumber(spacesOnBoard, player.playerCurrentPosition + 2);
    }
    else if (nextSpace.spaceBehavior === GO_BACK_5_SPACES_BEHAVIOR) {
      nextSpace =  findSpaceByNumber(spacesOnBoard, player.playerCurrentPosition -5);
      if(nextSpace < 0){
        nextSpace = 0;
      }
    }
    else if (nextSpace.spaceBehavior === EXTRA_TURN_BEHAVIOR) {
      extraTurnFlag = true;
    }
    else if (nextSpace.spaceBehavior === SKIP_TURN_BEHAVIOR) {
      skipTurnFlag = true;
    }
    nextSpace.spacePlayers.push(player);
    if(extraTurnFlag){
      nextPlayer = player;
    }
    else {
      nextPlayer = nextPlayer(player);
    }
    if(skipTurnFlag){
      player.playerStatus = ON_2_HOLD_STATUS;
    }
    else {
      player.playerStatus = ON_HOLD_STATUS;
    }
    nextPlayer.playerStatus = READY_STATUS;
  }
  else {
    nextPlayer = nextPlayer(player);
    player.playerStatus = ON_HOLD_STATUS;
    nextPlayer.playerStatus = READY_STATUS;
  }
  return nextPlayer;

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
$(function (){
  player1 = new Player("player1", "simbol1", 0, READY_STATUS, 1);
  player2 = new Player("player2", "simbol2", 0, ON_HOLD_STATUS, 2);
  player3 = new Player("player3", "simbol3", 0, ON_HOLD_STATUS, 3);
  player4 = new Player("player4", "simbol4", 0, ON_HOLD_STATUS, 4);
  players.push(player1);
  players.push(player2);
  players.push(player3);
  players.push(player4);
  player = player1;
  spacesNumber = 15;
  // for (var i = 0; i < spacesNumber; i++) {
  //   array[i]
  // }

  playerReadyRegistrationForms();
  $('.span-pg').click(function () {
    $('.gameboard').removeClass('hidden');
    $('.span-pg').addClass('hidden');
    $('.nobg').addClass('hidden');
  });
});
