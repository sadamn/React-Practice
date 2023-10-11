// Get references to the file input and image preview elements
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');

// Add an event listener to the file input element
imageInput.addEventListener('change', function () {
    const file = imageInput.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader();

        // Set up the reader to load the image file
        reader.onload = function (e) {
            imagePreview.src = e.target.result; // Set the image source to the loaded data URL
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
    } else {
        // If no file is selected or the user cancels the file dialog, clear the image preview
        imagePreview.src = '#';
    }
});