'use strict';

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
