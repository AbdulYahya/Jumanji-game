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
