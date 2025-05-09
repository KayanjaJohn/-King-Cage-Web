// // Define the audio context, analyser, and data array
// let audioContext, analyser, dataArray, bufferLength, canvasContext;

// // Set the text and voice for the utterance
// const textArea = document.getElementById("text");
// const speakButton = document.getElementById("speak");
// const stopButton = document.getElementById("stop");

// // Get the visualizer canvas element
// const visualizerCanvas = document.getElementById("visualizer");
// canvasContext = visualizerCanvas.getContext("2d");

// // Create a new speech synthesis utterance
// const utterance = new SpeechSynthesisUtterance();

// // Get list of available voices
// const voices = window.speechSynthesis.getVoices();
// const femaleVoice = voices.filter(
// 	(voice) => voice.lang === "en-US" && voice.name === "Google US English Female"
// )[0];

// // Set the text and voice for the utterance
// utterance.text = textArea.value;
// utterance.voice = femaleVoice || voices[0];
// utterance.pitch = 1.6;
// utterance.rate = 1;
// utterance.volume = 100;

// // Add event listeners to the buttons
// speakButton.addEventListener("click", () => {
// 	utterance.text = textArea.value;
// 	utterance.onstart = function () {
// 		audioContext = new AudioContext();
// 		analyser = audioContext.createAnalyser();
// 		analyser.fftSize = 256;
// 		bufferLength = analyser.frequencyBinCount;
// 		dataArray = new Uint8Array(bufferLength);

// 		const mediaStreamAudioSource = audioContext.createMediaStreamSource(
// 			new MediaStream()
// 		);
// 		mediaStreamAudioSource.connect(analyser);
// 		analyser.connect(audioContext.destination);

// 		drawVisualizer();
// 	};

// 	window.speechSynthesis.speak(utterance);
// });

// function drawVisualizer() {
// 	requestAnimationFrame(drawVisualizer);
// 	analyser.getByteFrequencyData(dataArray);

// 	canvasContext.clearRect(
// 		0,
// 		0,
// 		visualizerCanvas.width,
// 		visualizerCanvas.height
// 	);

// 	const barWidth = (visualizerCanvas.width / dataArray.length) * 2;
// 	let barHeight;
// 	let x = 0;
// 	const centerY = visualizerCanvas.height / 2;
// 	const colors = [
// 		"rgba(4, 9, 2, 0.65)",
// 		"rgb(255, 77, 0)",
// 		"rgb(81, 255, 0)",
// 		"rgb(0, 255, 242)",
// 	];

// 	for (let i = 0; i < dataArray.length; i++) {
// 		barHeight = dataArray[i] / 2;
// 		canvasContext.fillStyle = colors[i % colors.length];
// 		canvasContext.beginPath();
// 		canvasContext.moveTo(x, centerY);
// 		canvasContext.lineTo(x, centerY - barHeight / 2);
// 		canvasContext.lineTo(x + barWidth, centerY - barHeight / 2);
// 		canvasContext.arcTo(
// 			x + barWidth,
// 			centerY - barHeight / 2,
// 			x + barWidth,
// 			centerY + barHeight / 2,
// 			barWidth / 2
// 		);
// 		canvasContext.lineTo(x + barWidth, centerY + barHeight / 2);
// 		canvasContext.lineTo(x, centerY + barHeight / 2);
// 		canvasContext.arcTo(
// 			x,
// 			centerY + barHeight / 2,
// 			x,
// 			centerY - barHeight / 2,
// 			barWidth / 2
// 		);
// 		canvasContext.closePath();
// 		canvasContext.fill();
// 		x += barWidth + 1;
// 	}
// }

// stopButton.addEventListener("click", () => {
// 	window.speechSynthesis.cancel();
// });

// textArea.addEventListener("input", (e) => {
// 	e.preventDefault();
// 	var text = e.clipboardData.getData("text/plain");
// 	text =
// 		text /
// 		trim()
// 			.replace(/\s+/g, " ")
// 			.replace(/(\r\n|\n|\r)/gm, " ");

// 	textArea.value = text;
// });


let audioContext, analyser, dataArray, bufferLength, canvasContext;

// Elements
const textArea = document.getElementById("text");
const speakButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");
const visualizerCanvas = document.getElementById("visualizer");
const languageSelect = document.getElementById("languageSelect");
const voiceSelect = document.getElementById("voiceSelect");

canvasContext = visualizerCanvas.getContext("2d");

const utterance = new SpeechSynthesisUtterance();
let allVoices = [];

// Default rate/pitch/volume for natural feel
utterance.pitch = 1.05;
utterance.rate = 0.95;
utterance.volume = 1;

// Language names and flags
const languageData = {
    "de-DE": { name: "German (Germany)", flag: "🇩🇪" },
    "en-AU": { name: "English (Australia)", flag: "🇦🇺" },
    "en-GB": { name: "English (United Kingdom)", flag: "🇬🇧" },
    "en-IE": { name: "English (Ireland)", flag: "🇮🇪" },
    "en-US": { name: "English (United States)", flag: "🇺🇸" },
    "es-ES": { name: "Spanish (Spain)", flag: "🇪🇸" },
    "fr-FR": { name: "French (France)", flag: "🇫🇷" },
    "hi-IN": { name: "Hindi (India)", flag: "🇮🇳" },
    "id-ID": { name: "Indonesian (Indonesia)", flag: "🇮🇩" },
    "it-IT": { name: "Italian (Italy)", flag: "🇮🇹" },
    "ja-JP": { name: "Japanese (Japan)", flag: "🇯🇵" },
    "ko-KR": { name: "Korean (South Korea)", flag: "🇰🇷" },
    "nl-NL": { name: "Dutch (Netherlands)", flag: "🇳🇱" },
    "pl-PL": { name: "Polish (Poland)", flag: "🇵🇱" },
    "pt-BR": { name: "Portuguese (Brazil)", flag: "🇧🇷" },
    "ru-RU": { name: "Russian (Russia)", flag: "🇷🇺" },
    "zh-CN": { name: "Chinese (Simplified)", flag: "🇨🇳" },
    "zh-HK": { name: "Chinese (Hong Kong)", flag: "🇭🇰" },
    "zh-TW": { name: "Chinese (Traditional)", flag: "🇹🇼" }
};

// List of languages to show in the select
const languages = [
    "de-DE", "en-AU", "en-GB", "en-IE", "en-US",
    "es-ES", "fr-FR", "hi-IN", "id-ID", "it-IT",
    "ja-JP", "ko-KR", "nl-NL", "pl-PL", "pt-BR",
    "ru-RU", "zh-CN", "zh-HK", "zh-TW"
];

// Load and populate voices
function loadVoices() {
	allVoices = speechSynthesis.getVoices();

	// Group voices by language
	const languages = [...new Set(allVoices.map(voice => voice.lang))];
	languages.sort(); // Sort alphabetically
	languageSelect.innerHTML = ''; // Clear any existing options
	languages.forEach(lang => {  // Populate the dropdown
		const option = document.createElement("option");
		option.value = lang;
		
		// Get the friendly name and flag
		const languageInfo = languageData[lang] || { name: lang, flag: "" };
		
		// Display flag + language name
		option.textContent = `${languageInfo.flag} ${languageInfo.name}`;
		
		languageSelect.appendChild(option);
	});


	updateVoiceOptions(languageSelect.value);
}

function updateVoiceOptions(selectedLang) {
	const voicesForLang = allVoices.filter(voice => voice.lang === selectedLang);
	voiceSelect.innerHTML = '';

	voicesForLang.forEach(voice => {
		const option = document.createElement("option");
		option.value = voice.name;
		option.textContent = `${voice.name} (${voice.lang})`;
		voiceSelect.appendChild(option);
	});

	// Pick the best by default
	const bestVoice = voicesForLang.find(v => v.name.includes("Google") || v.name.includes("Microsoft")) || voicesForLang[0];
	if (bestVoice) {
		voiceSelect.value = bestVoice.name;
	}
}

languageSelect.addEventListener("change", (e) => {
	updateVoiceOptions(e.target.value);
});

speechSynthesis.onvoiceschanged = loadVoices;


// Speak button
speakButton.addEventListener("click", () => {
	const selectedVoice = allVoices.find(v => v.name === voiceSelect.value);
	utterance.voice = selectedVoice || allVoices[0];
	utterance.lang = selectedVoice.lang;
	utterance.text = textArea.value.replace(/([.?!])\s*/g, "$1  ");
	speechSynthesis.speak(utterance);
});

// Stop button
stopButton.addEventListener("click", () => {
	speechSynthesis.cancel();
});


// Clean up text input
textArea.addEventListener("input", (e) => {
	e.preventDefault();
	let text = textArea.value.trim().replace(/\s+/g, " ").replace(/(\r\n|\n|\r)/gm, " ");
	textArea.value = text;
});

// Trigger voice load
speechSynthesis.onvoiceschanged = loadVoices;


const rateSlider = document.getElementById("rate");
const pitchSlider = document.getElementById("pitch");
const volumeSlider = document.getElementById("volume");

rateSlider.addEventListener("input", () => utterance.rate = parseFloat(rateSlider.value));
pitchSlider.addEventListener("input", () => utterance.pitch = parseFloat(pitchSlider.value));
volumeSlider.addEventListener("input", () => utterance.volume = parseFloat(volumeSlider.value));
