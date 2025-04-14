// Text Extraction
const imageInput = document.getElementById('image-input');
const extractBtn = document.getElementById('extract-btn');
const extractedTextArea = document.getElementById('extracted-text');
const extractedImage = document.getElementById('extracted-image');
const imageContainer = document.querySelector('.image-wrapper')
const sections = document.querySelectorAll('.section')

// Add event listener to extract button
extractBtn.addEventListener('click', async () => {
  extractBtn.textContent = 'Extracting...';
  extractBtn.disabled = true;

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
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      Tesseract.recognize(
        canvas,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        const extractedImageString = canvas.toDataURL();
        extractedTextArea.value = text;
        imageContainer.style.display = 'block';
        extractedImage.src = extractedImageString;
        extractBtn.textContent = 'Extract Text';
        extractBtn.disabled = false;
      }).catch(error => {
        console.error(error);
        extractBtn.textContent = 'Extract Text';
        extractBtn.disabled = false;
      });
    });
  });

  reader.readAsDataURL(file);
});

imageContainer.addEventListener('click', () => {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  modal.style.display = 'flex';
  modalImage.src = extractedImage.src;

  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});



// Text Translation
const translateTextArea = document.getElementById('translate-text');
const translatedTextArea = document.getElementById('translated-text');
const translateBtn = document.getElementById('translate-btn');
const translateSelect = document.getElementById('translate-select');

translateBtn.addEventListener('click', async () => {
  translateBtn.textContent = 'Translating...';
  translateBtn.disabled = true;
  const text = extractedTextArea.value;
  const language = translateSelect.value;
  if (text && language) {
    try {
      const translatedText = await translateText(text, language);
      translatedTextArea.value = translatedText;
    } catch (error) {
      translatedTextArea.value = 'Error: Unable to translate text';
      console.error(error);
    }
  }
  translateBtn.textContent = 'Translate';
  translateBtn.disabled = false;
});


function translateText(text, language) {
  const apiUrl = 'https://libretranslate.de/translate';
  const params = new URLSearchParams({
    q: text,
    source: 'auto',
    target: language,
    format: 'text'
  });

  return fetch(`${apiUrl}?${params}`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => data.translatedText)
  .catch(error => {
    console.error(error);
    throw error;
  });
}




document.querySelector(".theme-btn").addEventListener('click', () => {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	let newTheme;
  
	if (currentTheme === 'light') {
	  newTheme = 'dim';
	} else if (currentTheme === 'dim') {
	  newTheme = 'dark';
	} else if (currentTheme === 'dark') {
	  newTheme = 'blue';
	} else {
    newTheme = 'light';
  }
  
	document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme); // Save preference
  });
  
  // Load saved theme on page load
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  