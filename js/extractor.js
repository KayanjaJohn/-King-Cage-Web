// Get the image input element
const imageInput = document.getElementById('image-input');

// Get the extract button element
const extractBtn = document.getElementById('extract-btn');

// Get the result container element
const resultContainer = document.getElementById('result-container');

// Get the extracted text element
const extractedText = document.getElementById('extracted-text');

// Get the extracted image element
const extractedImage = document.getElementById('extracted-image');

// Add event listener to extract button
extractBtn.addEventListener('click', async () => {
  // Get the selected image
  const file = imageInput.files[0];

  // Create a new Image object
  const img = new Image();

  // Create a FileReader to read the file
  const reader = new FileReader();

  // Add event listener to FileReader
  reader.addEventListener('load', async () => {
    // Set the image src to the loaded file
    img.src = reader.result;

    // Add event listener to image
    img.addEventListener('load', async () => {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Draw the image on the canvas
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Extract the text from the image using Tesseract.js
      const { createWorker } = Tesseract;
      const worker = createWorker({
        logger: m => console.log(m),
      });
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(canvas);
      await worker.terminate();

      // Extract the image from the image
      const extractedImageString = canvas.toDataURL();

      // Display the extracted text and image
      extractedText.value = text;
      extractedImage.src = extractedImageString;

      // Show the result container
      resultContainer.style.display = 'block';
    });
  });

  // Read the file as a data URL
  reader.readAsDataURL(file);
});
