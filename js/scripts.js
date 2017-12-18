var dice = function(){ // function to roll a dice
  return Math.floor(Math.random()*6+1);
}
var currentspot = 0;

$(document).ready(function(){
  $("#roll").click(function(event){
    event.preventDefault();
    var roll = dice();
    $(".currentroll").text(roll);
  });
});
