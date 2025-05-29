let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let startButton = document.getElementById('start-button');
let filterButton = document.getElementById('filter-button');
let filterSelect = document.getElementById('filter-select');
let currentFilter = 'none';
let autoColorShift = 0;
let direction = 1;

startButton.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(error => console.error('Error accessing camera:', error));
});

filterButton.addEventListener('click', () => {
  currentFilter = filterSelect.value;
});

filterSelect.addEventListener('change', () => {
  currentFilter = filterSelect.value;
});

function applyFilter() {
  ctx.drawImage(video, 0, 0);

  switch (currentFilter) {
    case 'grayscale':
      ctx.filter = 'grayscale(100%)';
      ctx.drawImage(video, 0, 0);
      break;
    case 'sepia':
      ctx.filter = 'sepia(100%)';
      ctx.drawImage(video, 0, 0);
      break;
    case 'invert':
      ctx.filter = 'invert(100%)';
      ctx.drawImage(video, 0, 0);
      break;
    case 'auto-color':
      ctx.filter = `hue-rotate(${autoColorShift}deg)`;
      ctx.drawImage(video, 0, 0);
      autoColorShift += direction * 1;
      if (autoColorShift > 360 || autoColorShift < 0) {
        direction *= -1;
      }
      break;
    default:
      ctx.drawImage(video, 0, 0);
  }

  requestAnimationFrame(applyFilter);
}

applyFilter();