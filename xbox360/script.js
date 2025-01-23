document.addEventListener("DOMContentLoaded", function() {
    // Detect iOS and add a class to the body
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        document.body.classList.add('ios');
    }
});