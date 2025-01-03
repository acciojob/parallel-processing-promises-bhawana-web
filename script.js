// Array of image URLs to download
const imageUrls = [
  "https://via.placeholder.com/150", // Example image 1
  "https://via.placeholder.com/200", // Example image 2
  "https://via.placeholder.com/250", // Example image 3
  "https://via.placeholder.com/300"  // Example image 4
];

// Function to download an image and return a promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    
    // Event handler for when the image is successfully loaded
    img.onload = () => resolve(img);

    // Event handler for when the image fails to load
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${url}`));
  });
}

// Function to handle downloading all images and displaying them
function downloadAndDisplayImages() {
  // Disable the button to prevent multiple clicks
  document.getElementById('download-images-button').disabled = true;

  // Use Promise.all to download all images in parallel
  Promise.all(imageUrls.map(downloadImage))
    .then(images => {
      // All images downloaded successfully, display them
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = ''; // Clear previous content

      images.forEach(img => {
        outputDiv.appendChild(img);
      });
    })
    .catch(error => {
      // Handle the error if any image fails to download
      alert(error.message);
    })
    .finally(() => {
      // Re-enable the button after the process completes
      document.getElementById('download-images-button').disabled = false;
    });
}

// Attach event listener to the button
document.getElementById('download-images-button').addEventListener('click', downloadAndDisplayImages);

