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

$(function(){
  player1 = new Player("player1", "simbol1", 0, READY_STATUS, 1);
  player2 = new Player("player2", "simbol2", 0, ON_HOLD_STATUS, 2);
  player3 = new Player("player3", "simbol3", 0, ON_HOLD_STATUS, 3);
  players.push(player1);
  players.push(player2);
  players.push(player3);
  player = player1;
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
  spacesOnBoard[0].spacePlayers.push(player1);
  spacesOnBoard[0].spacePlayers.push(player2);
  spacesOnBoard[0].spacePlayers.push(player3);
  for (var i = 0; i < players.length; i++) {
    $('#0').append(players[i].playerSimbol+" ")
  }
  $('#test').click(function(event){
    event.preventDefault();
    var diceValue = throwDice();
    var nextSpaceNumber = playJumanji(diceValue);
    makeBehavior(nextSpaceNumber);
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
})
