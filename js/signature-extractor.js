const input = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const dummyCanvas = document.getElementById('dummy-canvas');
const ctx = canvas.getContext('2d');

dummyCanvas.addEventListener('load', () =>{
    ctx.textContent = 'Results waiting....';
    ctx.style.fontSize = 30;
    ctx.style.color = 'black';

})

input.addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  const reader = new FileReader();

  reader.onload = function(e) {
    img.onload = function() {
      canvas.style.display = 'block';  
      dummyCanvas.style.display = 'none';  
      // Resize canvas
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      extractSignature();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function extractSignature() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let totalBrightness = 0;

  // First pass: calculate average brightness
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    totalBrightness += avg;
  }

  const avgBrightness = totalBrightness / (data.length / 4);
  const isDark = avgBrightness < 127; // brightness threshold

  // Second pass: extract signature
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];

    // Invert colors if image is dark
    if (isDark) {
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
    }

    const brightness = (r + g + b) / 3;

    // Make light background pixels transparent
    if (brightness > 200) {
      data[i + 3] = 0; // transparent
    } else {
      // Make signature black for consistency
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}


function download() {
  const link = document.createElement('a');
  link.download = 'signature.png';
  link.href = canvas.toDataURL();
  link.click();
}

function downloadText() {
    const canvas = document.getElementById('canvas');
    const base64Data = canvas.toDataURL('image/png');
  
    // Optional: get user input name (if you want to label it)
    const name = prompt("Enter name for the signature:", "John Doe") || "Unnamed";
  
    const signatureJSON = {
      name: name,
      signatureData: base64Data
    };
  
    const blob = new Blob([JSON.stringify(signatureJSON, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = 'signature.json';
    link.href = URL.createObjectURL(blob);
    link.click();
  }
  