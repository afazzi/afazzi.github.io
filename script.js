document.addEventListener("DOMContentLoaded", function() {
    // Detect iOS and add a class to the body
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        document.body.classList.add('ios');
    }
});

/* ...existing code... */
function toggleContent(id) {
    var element = document.getElementById(id);
    var categoryLink = element.previousElementSibling.querySelector('a');
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        categoryLink.innerHTML = categoryLink.innerHTML.replace('+', '-');
    } else {
        element.classList.add('hidden');
        categoryLink.innerHTML = categoryLink.innerHTML.replace('-', '+');
    }
}