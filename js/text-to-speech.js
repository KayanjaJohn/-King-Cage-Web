// Define the audio context, analyser, and data array
let audioContext, analyser, dataArray, bufferLength, canvasContext;

// Set the text and voice for the utterance
const textArea = document.getElementById("text");
const speakButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");

// Get the visualizer canvas element
const visualizerCanvas = document.getElementById("visualizer");
canvasContext = visualizerCanvas.getContext("2d");

// Create a new speech synthesis utterance
const utterance = new SpeechSynthesisUtterance();

// Get list of available voices
const voices = window.speechSynthesis.getVoices();
const femaleVoice = voices.filter(
	(voice) => voice.lang === "en-US" && voice.name === "Google US English Female"
)[0];

// Set the text and voice for the utterance
utterance.text = textArea.value;
utterance.voice = femaleVoice || voices[0];
utterance.pitch = 1;
utterance.rate = 0.9;
utterance.volume = 100;

// Add event listeners to the buttons
speakButton.addEventListener("click", () => {
	utterance.text = textArea.value;
	utterance.onstart = function () {
		audioContext = new AudioContext();
		analyser = audioContext.createAnalyser();
		analyser.fftSize = 256;
		bufferLength = analyser.frequencyBinCount;
		dataArray = new Uint8Array(bufferLength);

		const mediaStreamAudioSource = audioContext.createMediaStreamSource(
			new MediaStream()
		);
		mediaStreamAudioSource.connect(analyser);
		analyser.connect(audioContext.destination);

		drawVisualizer();
	};

	window.speechSynthesis.speak(utterance);
});

function drawVisualizer() {
	requestAnimationFrame(drawVisualizer);
	analyser.getByteFrequencyData(dataArray);

	canvasContext.clearRect(
		0,
		0,
		visualizerCanvas.width,
		visualizerCanvas.height
	);

	const barWidth = (visualizerCanvas.width / dataArray.length) * 2;
	let barHeight;
	let x = 0;
	const centerY = visualizerCanvas.height / 2;
	const colors = [
		"rgba(4, 9, 2, 0.65)",
		"rgb(255, 77, 0)",
		"rgb(81, 255, 0)",
		"rgb(0, 255, 242)",
	];

	for (let i = 0; i < dataArray.length; i++) {
		barHeight = dataArray[i] / 2;
		canvasContext.fillStyle = colors[i % colors.length];
		canvasContext.beginPath();
		canvasContext.moveTo(x, centerY);
		canvasContext.lineTo(x, centerY - barHeight / 2);
		canvasContext.lineTo(x + barWidth, centerY - barHeight / 2);
		canvasContext.arcTo(
			x + barWidth,
			centerY - barHeight / 2,
			x + barWidth,
			centerY + barHeight / 2,
			barWidth / 2
		);
		canvasContext.lineTo(x + barWidth, centerY + barHeight / 2);
		canvasContext.lineTo(x, centerY + barHeight / 2);
		canvasContext.arcTo(
			x,
			centerY + barHeight / 2,
			x,
			centerY - barHeight / 2,
			barWidth / 2
		);
		canvasContext.closePath();
		canvasContext.fill();
		x += barWidth + 1;
	}
}

stopButton.addEventListener("click", () => {
	window.speechSynthesis.cancel();
});

textArea.addEventListener("input", (e) => {
	e.preventDefault();
	var text = e.clipboardData.getData("text/plain");
	text =
		text /
		trim()
			.replace(/\s+/g, " ")
			.replace(/(\r\n|\n|\r)/gm, " ");

	textArea.value = text;
});

