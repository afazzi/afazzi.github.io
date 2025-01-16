document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const toggleMusicButton = document.querySelector('#menu button');
    const startButton = document.querySelector('.button');
    const gunshotAudio = new Audio('sfx/gunshot.wav');

    toggleMusicButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });

    startButton.addEventListener('click', () => {
        gunshotAudio.play();
    });
});
