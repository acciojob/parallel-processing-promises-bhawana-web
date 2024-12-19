//your JS code here. If required.
// Array of image URLs to download
const imageUrls = [
    { url: 'https://via.placeholder.com/150' },
    { url: 'https://via.placeholder.com/200' },
    { url: 'https://via.placeholder.com/250' },
    { url: 'https://nonexistenturl.com/image.jpg' } // A failing URL for demonstration
];

// Function to load an image and return a promise
function loadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => resolve(img); // Resolve when the image is loaded
        img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Reject if loading fails
    });
}

// Function to handle the image downloading process
function downloadImages() {
    // Start downloading all images in parallel
    Promise.all(imageUrls.map(loadImage))
        .then(images => {
            // Once all images are downloaded, display them
            const outputDiv = document.getElementById("output");
            outputDiv.innerHTML = ''; // Clear any previous content

            // Append each successfully loaded image to the output div
            images.forEach(img => {
                outputDiv.appendChild(img);
            });
        })
        .catch(error => {
            // If any image failed to load, log the error
            console.error(error);
            alert(error); // Show the error to the user
        });
}

// Attach event listener to the button
document.getElementById("download-images-button").addEventListener("click", downloadImages);
