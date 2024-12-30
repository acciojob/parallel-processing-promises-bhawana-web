//your JS code here. If required.
// Array of image URLs
const imageUrls = [
  { url: 'https://via.placeholder.com/150' },
  { url: 'https://via.placeholder.com/200' },
  { url: 'https://via.placeholder.com/250' },
  { url: 'https://example.com/invalid-url' } // This is an invalid URL for testing error handling
];

// Function to download images in parallel
function downloadImages() {
  const outputDiv = document.getElementById('output');
  
  // Clear any previous images
  outputDiv.innerHTML = '';
  
  // Array of promises to download each image
  const imagePromises = imageUrls.map(image => 
    fetch(image.url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load image's URL: ${image.url}`);
        }
        return response.blob(); // Get image data as a Blob
      })
      .then(blob => {
        // Create an image element and set the src to the downloaded image's Blob
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob); // Create an object URL for the Blob
        outputDiv.appendChild(img); // Append image to the output div
      })
      .catch(error => {
        // If there's an error, log it and show the error message
        console.error(error.message);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = error.message;
        outputDiv.appendChild(errorMessage);
      })
  );
  
  // Use Promise.all to wait for all images to be downloaded in parallel
  Promise.all(imagePromises)
    .then(() => {
      console.log('All images have been downloaded successfully');
    })
    .catch(() => {
      console.log('Some images failed to load');
    });
}

// Add event listener for the button click
document.getElementById('download-images-button').addEventListener('click', downloadImages);
