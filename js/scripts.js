// var Player function(turn){
//   this.
// }
var roll = function() {
  return Math.floor((Math.random() * 6) + 1);
}

//frontend
$(function() {
  $("form.diceroll").submit(function(event) {
    event.preventDefault();
// debugger;
  $("span#rollNumber").text(roll);

  });
});
