function defaultImage(imageID) {
    const image = document.getElementById(imageID);
    if (image.complete && image.naturalWidth !== 0) {
        // Image is available, do nothing, it will be displayed by default
    } else {
        image.src = 'assets/img/default.jpeg';
        image.alt = 'Default Image';
    }
}

defaultImage('myImage');
defaultImage('myImag');
defaultImage('myImag2');