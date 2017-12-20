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
var player1, player2, player3, player4;

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
  }
  return players[0];
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
}

function playJumanji(){
  var extraTurnFlag = false;
  var skipTurnFlag = false;
  var nextPlayerTurn;
  if(player.playerStatus == ON_2_HOLD_STATUS){
    player.playerStatus = ON_HOLD_STATUS;
    player = nextPlayer();
    player.playerStatus = READY_STATUS
  }
  var diceValue = throwDice();
  alert(diceValue);
  var currentSpace = findSpaceByNumber(spacesOnBoard, player.playerCurrentPosition);

  currentSpace.removePlayer(player);
  nextSpace =  findSpaceByNumber(spacesOnBoard, (player.playerCurrentPosition + diceValue));
  if (nextSpace.spaceNumber <= spacesNumber) {
    if (nextSpace.spaceBehavior === GO_BACK_TO_START_BEHAVIOR) {
      nextSpace =  findSpaceByNumber(spacesOnBoard, player.playerCurrentPosition - player.playerCurrentPosition);
    }
    else if (nextSpace.spaceBehavior === MOVE_UP_2_SPACES_BEHAVIOR) {
      nextSpace =  findSpaceByNumber(spacesOnBoard, nextSpace.spaceNumber + 2);
    }
    else if (nextSpace.spaceBehavior === GO_BACK_5_SPACES_BEHAVIOR) {
      nextSpace =  findSpaceByNumber(spacesOnBoard, nextSpace.spaceNumber -5);
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
    player.playerCurrentPosition = nextSpace.spaceNumber;
    nextSpace.spacePlayers.push(player);
    if(skipTurnFlag){
      player.playerStatus = ON_2_HOLD_STATUS;
    }
    else {
      player.playerStatus = ON_HOLD_STATUS;
    }
    nextPlayer.playerStatus = READY_STATUS;
    nextPlayerTurn = nextPlayer();
    if(extraTurnFlag){
      nextPlayerTurn = player;
    }
  }
  else {
    alert('hey '+player.playerName+' you are winner');
    return player;
  }
  return nextPlayerTurn;
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
    var playerOneUserName = Capitalize($('#player1').val());

    if (!playerOneUserName == "") {
      $('#player1name').text(playerOneUserName);
      $('#player1RegistrationForm').hide();
      playerReady('#player1Ready', playerOneUserName);
      pimg = "<img class='center-image' src='" + $('#playerOneImg').attr('src') + "'>";
      player1 = new Player(playerOneUserName, pimg, 0, READY_STATUS, 1);
      players.push(player1);
      player = player1;
      spacesOnBoard[0].spacePlayers.push(player1);
      $('#0').append(players[0].playerSimbol+" ");

    }
  });

  playerTwoRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var playerTwoUserName = Capitalize($('#player2').val());

    if (!playerTwoUserName == "") {
      $('#player2name').text(playerTwoUserName);
      $('#player2RegistrationForm').hide();
      playerReady('#player2Ready', playerTwoUserName);
      pimg = "<img class='center-image' src='" + $('#playerTwoImg').attr('src') + "'>";
      player2 = new Player(playerTwoUserName, pimg, 0, ON_HOLD_STATUS, 2);
      players.push(player2);
      spacesOnBoard[0].spacePlayers.push(player2);
      $('#0').append(players[1].playerSimbol+" ");
    }
  });

  playerThreeRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var playerThreeUserName = Capitalize($('#player3').val());

    if (!playerThreeUserName == "") {
      $('#player3name').text(playerThreeUserName);
      $('#player3RegistrationForm').hide();
      playerReady('#player3Ready', playerThreeUserName);
      pimg = "<img class='center-image' src='" + $('#playerThreeImg').attr('src') + "'>";
      player3 = new Player(playerThreeUserName, pimg, 0, ON_HOLD_STATUS, 3);
      players.push(player3);
      spacesOnBoard[0].spacePlayers.push(player3);
      $('#0').append(players[2].playerSimbol+" ");

    }
  });

  playerFourRegistrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var playerFourUserName = Capitalize($('#player4').val());
    if (!playerFourUserName == "") {
      $('#player4name').text(playerFourUserName);
      $('#player4RegistrationForm').hide();
      playerReady($('#player4Ready'), playerFourUserName);
      pimg = "<img class='center-image' src='" + $('#playerFourImg').attr('src') + "'>";
      player4 = new Player(playerFourUserName, pimg, ON_HOLD_STATUS, 4);
      players.push(player4);
      spacesOnBoard[0].spacePlayers.push(player4);
      $('#0').append(players[3].playerSimbol+" ");
    }
  });
}

var roll = function() {
  return Math.floor((Math.random() * 6) + 1);
}

// Document Ready Function
$(function (){
  playerReadyRegistrationForms();

  // $("form.diceroll").submit(function(event) {
  //   event.preventDefault();
  //   // debugger;
  //   $("span#rollNumber").text(roll);
  // }
  spacesNumber = 14;
  var space;

  for (var i = 0; i < spacesNumber; i++) {
    switch (i) {
      case 2:
        space = new Space(i, MOVE_UP_2_SPACES_BEHAVIOR);
        break;
      case 5:
        space = new Space(i, EXTRA_TURN_BEHAVIOR);
        break;
      case 7:
        space = new Space(i, GO_BACK_TO_START_BEHAVIOR);
        break;
      case 9:
        space = new Space(i, SKIP_TURN_BEHAVIOR);
        break;
      case 13:
        space = new Space(i, GO_BACK_5_SPACES_BEHAVIOR);
        break;
      default:
        space = new Space(i, NOT_BEHAVIOR);
    }
    spacesOnBoard.push(space);
  }

  for (var i = 0; i < players.length; i++) {
    $('#0').append(players[i].playerSimbol+" ")
  }

  $('#test').click(function(event){
    event.preventDefault();
    player = playJumanji();
    //update board
    for (var i = 0; i < spacesOnBoard.length; i++) {
      $('#'+i).empty();
      if(spacesOnBoard[i].spacePlayers.length > 0){
        for (var j = 0; j < spacesOnBoard[i].spacePlayers.length; j++) {
          $('#'+i).append(spacesOnBoard[i].spacePlayers[j].playerSimbol+" ");
        }
      }
    }
  });
});
