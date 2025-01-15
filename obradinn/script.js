document.addEventListener('DOMContentLoaded', function() {
  var playButton = document.getElementById('playButton');
  var audio = document.getElementById('audioPlayer');

  playButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
});
