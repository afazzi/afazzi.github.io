document.addEventListener('DOMContentLoaded', function() {
    var toggleMusicButton = document.querySelector('#menu .menu');
    var audioPlayer = document.getElementById('audioPlayer');
  
    toggleMusicButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });
});