
// Array of image URLs
const imageUrls = [
  'https://via.placeholder.com/150/92c952', // Replace with actual URLs for testing
  'https://via.placeholder.com/150/771796',
  'https://via.placeholder.com/150/24f355',
  'https://via.placeholder.com/150/d32776'
];

// Function to download an image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${url}`));
  });
}

// Function to initiate the download of all images and display them
function downloadImages() {
  // Disable the button to prevent multiple clicks
  document.getElementById('download-images-button').disabled = true;

  // Use Promise.all to download all images in parallel
  Promise.all(imageUrls.map(downloadImage))
    .then((images) => {
      // If all images are downloaded successfully, display them
      const output = document.getElementById('output');
      output.innerHTML = ''; // Clear any previous content
      images.forEach((img) => {
        output.appendChild(img); // Append each image to the output div
      });
    })
    .catch((error) => {
      // If any image fails to download, display the error message
      document.getElementById('output').textContent = error.message;
    })
    .finally(() => {
      // Re-enable the button after the download process
      document.getElementById('download-images-button').disabled = false;
    });
}

// Add click event listener to the download button
document.getElementById('download-images-button').addEventListener('click', downloadImages);
