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
function findSpaceByNumber(spaceNumber){
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
function makeBehavior(nextSpace){
  var nextSpaceOrigin = findSpaceByNumber(nextSpace);
  var nextSpace = findSpaceByNumber(nextSpace);
  var extraTurnFlag = false;
  var skipTurnFlag = false;
  changePositionFlag =false;
  var behavior = nextSpace.spaceBehavior;
  switch (behavior) {
    case GO_BACK_TO_START_BEHAVIOR:
      nextSpace =  findSpaceByNumber(nextSpaceOrigin.spaceNumber - nextSpace.spaceNumber);
      changePositionFlag =true;
      break;
    case MOVE_UP_2_SPACES_BEHAVIOR:
      nextSpace =  findSpaceByNumber(nextSpaceOrigin.spaceNumber + 2);
      changePositionFlag =true;
      break;
    case GO_BACK_5_SPACES_BEHAVIOR:
      nextSpace =  findSpaceByNumber(nextSpaceOrigin.spaceNumber -5);
      changePositionFlag =true;
      break;
    case EXTRA_TURN_BEHAVIOR:
      extraTurnFlag = true;
      break;
    case SKIP_TURN_BEHAVIOR:
      skipTurnFlag = true;
      break;
  }
  if(skipTurnFlag){
    player.playerStatus = ON_2_HOLD_STATUS;
  }
  player.playerCurrentPosition = nextSpace.spaceNumber;
  nextPlayerTurn = nextPlayer();
  if(extraTurnFlag){
    nextPlayerTurn = player;
  }
  if(changePositionFlag){
    nextSpaceOrigin.removePlayer(player);
    nextSpace.spacePlayers.push(player);
  }
  player = nextPlayerTurn;
  return true;
}

function playJumanji(diceValue){
  var nextPlayerTurn;
  var currentPlayerTmp = player;
  if(player.playerStatus === ON_2_HOLD_STATUS){
    player.playerStatus = ON_HOLD_STATUS;
    player = nextPlayer();
    while(player.playerStatus === ON_2_HOLD_STATUS){
      player.playerStatus = ON_HOLD_STATUS;
      player = nextPlayer();
      if(player.playerId === currentPlayerTmp.playerId){
        break;
      }
    }
  }
  var currentSpace = findSpaceByNumber(player.playerCurrentPosition);
  currentSpace.removePlayer(player);
  nextSpace =  findSpaceByNumber(player.playerCurrentPosition + diceValue);
  if (nextSpace.spaceNumber <= spacesNumber) {
    nextSpace.spacePlayers.push(player);
    player.playerCurrentPosition = nextSpace.spaceNumber;
    player.playerStatus = ON_HOLD_STATUS;
  }
  else {
    return -1;
  }
  return player.playerCurrentPosition;
}

//
//                USER INTERFACE
'use strict';
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
      pimg = "<img class='playerImg' src='" + $('#playerOneImg').attr('src') + "'>";
      player1 = new Player(playerOneUserName, pimg, 0, READY_STATUS, 1);
      players.push(player1);
      player = player1;
      spacesOnBoard[0].spacePlayers.push(player1);
      $('#0').find('.playerDeck').append('<div class="playerCard">' + players[0].playerSimbol+" " + '</div>');
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
      pimg = "<img class='playerImg' src='" + $('#playerTwoImg').attr('src') + "'>";
      player2 = new Player(playerTwoUserName, pimg, 0, ON_HOLD_STATUS, 2);
      players.push(player2);
      spacesOnBoard[0].spacePlayers.push(player2);
      $('#0').find('.playerDeck').append('<div class="playerCard">' + players[1].playerSimbol+" " + '</div>');
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
      pimg = "<img class='playerImg' src='" + $('#playerThreeImg').attr('src') + "'>";
      player3 = new Player(playerThreeUserName, pimg, 0, ON_HOLD_STATUS, 3);
      players.push(player3);
      spacesOnBoard[0].spacePlayers.push(player3);
      $('#0').find('.playerDeck').append('<div class="playerCard">' + players[2].playerSimbol+" " + '</div>');

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
      pimg = "<img class='playerImg' src='" + $('#playerFourImg').attr('src') + "'>";
      player4 = new Player(playerFourUserName, pimg, 0, ON_HOLD_STATUS, 4);
      // console.log(players);
      players.push(player4);
      spacesOnBoard[0].spacePlayers.push(player4);
      $('#0').find('.playerDeck').append('<div class="playerCard">' + players[3].playerSimbol+" " + '</div>');
    }
  });
}

// Document Ready Function
var roll = function() {
  return Math.floor((Math.random() * 6) + 1);
}

$(function(){
  // player1 = new Player("player1", "simbol1", 0, READY_STATUS, 1);
  // player2 = new Player("player2", "simbol2", 0, ON_HOLD_STATUS, 2);
  // player3 = new Player("player3", "simbol3", 0, ON_HOLD_STATUS, 3);
  // players.push(player1);
  // players.push(player2);
  // players.push(player3);
  // player = player1;
  // $("form.diceroll").submit(function(event) {
  //   event.preventDefault();
  // $("span#rollNumber").text(roll);

  // $("form.diceroll").submit(function(event) {
  //   event.preventDefault();
  //   // debugger;
  //   $("span#rollNumber").text(roll);
  // }

  playerReadyRegistrationForms();
  $('.span-pg').click(function () {
    $('.gameboard').removeClass('hidden');
    $('.span-pg').addClass('hidden');
    $('.nobg').addClass('hidden');
  });

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
  for (var i = 0; i < spacesOnBoard.length; i++) {
      $('#'+i).append('<div class="playerDeck"></div');
  }

  // for (var i = 0; i < players.length; i++) {
  //   $('#0').append(players[i].playerSimbol+" ")
  // }

  $('#test').click(function(event){
    event.preventDefault();
    var diceValue = throwDice();
    var nextSpaceNumber = playJumanji(diceValue);
    makeBehavior(nextSpaceNumber);
    //update board
    for (var i = 0; i < spacesOnBoard.length; i++) {
      $('#'+i).find('.playerDeck').empty();
      if(spacesOnBoard[i].spacePlayers.length > 0){
        for (var j = 0; j < spacesOnBoard[i].spacePlayers.length; j++) {
          $('#'+i).find('.playerDeck').append('<div class="playerCard">' + spacesOnBoard[i].spacePlayers[j].playerSimbol+" "+ '</div>');
        }
      }
    }
  });
});
