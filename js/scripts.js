//Constants
const ON_HOLD_STATUS = 'On hold';
const ON_2_HOLD_STATUS = 'On 2 hold';
const SKIP_TURN_BEHAVIOR = 'Skip turn';
const GO_BACK_TO_START_BEHAVIOR = 'Go back to start';
const MOVE_UP_2_SPACES_BEHAVIOR = 'Move up 2 spaces';
const GO_BACK_5_SPACES_BEHAVIOR = 'Go back 5 spaces';
const EXTRA_TURN_BEHAVIOR = 'Extra turn';
const NOT_BEHAVIOR = 'Not behavior';
const PLAYERS_MAX_NUMBER = 4;

//Variables
var players = [];//Array of players
var player;//Current player
var playersRegistrationTemp =[];

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
function splitId(id) {
  var id = id.toString();
  return id[id.length-1];
}
'use strict';
// Capitalize function
function Capitalize (string) { return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(); }
// Player Ready Animation
function playerReady (playerReadyDivId, playerName) {
  $(playerReadyDivId).removeClass('hidden');
  $(playerReadyDivId).html('<div class="card border-success playerReadyAnimation">' +
                           '<div class="text-success">' +
                             '<h4 class="display-4 mb-0">Player ' +
                              playerName + ' is ready!</h4>' +
                           '</div>' +
                         '</div>');
}
$(function(){
  spacesNumber = 15;
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
  for (var i = 0; i <= spacesOnBoard.length; i++) {
      $('#'+i).append('<div class="playerDeck"></div');
  }
  $('.registerButtons').click(function(event){
    event.preventDefault();
    var idButton = splitId($(this).attr("id"));
    var playerName = $('#playerName'+idButton).val();
    if (playerName !== "") {
      $('#playerNavName'+idButton).text(Capitalize(playerName));
      $('#playerRegistration'+idButton).hide();
      playerReady('#playerReady'+idButton, Capitalize(playerName));
    }
  });
  $('#playerRegistrationForm').submit(function(event){
    event.preventDefault();
    for (var i = 1; i <= PLAYERS_MAX_NUMBER; i++) {
      if ($('#playerName'+i).val() !== "") {
        var playerName = $('#playerName'+i).val();
        var playerSymbol = "<img class='playerImg' src='" + $('#playerSymbol' + i).val() + "'>";
        var playerRegistration = new Player(playerName, playerSymbol, spacesOnBoard[0].spaceNumber, ON_HOLD_STATUS, i);
        players.push(playerRegistration);
        spacesOnBoard[0].spacePlayers.push(playerRegistration);
        $('#'+spacesOnBoard[0].spaceNumber).find('.playerDeck').append('<div class="playerCard">' +playerRegistration.playerSimbol+" " + '</div>');
      }
    }
    player = players[0];
    $('.gameboard').removeClass('hidden');
    $('.span-pg').addClass('hidden');
    $('.nobg').addClass('hidden');
  });
  $('#test').click(function(event){
    event.preventDefault();
    var diceValue = throwDice();
    var nextSpaceNumber = playJumanji(diceValue);
    if (nextSpaceNumber === -1) {
      console.log('Winner');
      $('#14').find('.playerDeck').append('<div class="playerCard">' + player.playerSimbol + " " + '</div>');
      $()
    } else {
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
    }
  });
});
