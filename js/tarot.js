const tarotReadings = {
	Aries: {
		currentSituation: "5 of Swords (conflict, tension)",
		challenge: "Knight of Cups (emotional turmoil, moodiness)",
		advice: "The Emperor (structure, discipline, leadership)",
		outcome: "10 of Wands (success, achievement, recognition)",
	},
	Taurus: {
		currentSituation: "4 of Pentacles (stability, security)",
		challenge: "8 of Swords (feeling trapped, limited)",
		advice: "The High Priestess (intuition, wisdom, mystery)",
		outcome: "Knight of Pentacles (practicality, hard work, progress)",
	},
	Gemini: {
		currentSituation: "6 of Swords (journey, exploration)",
		challenge: "3 of Swords (heartbreak, sadness)",
		advice: "The Magician (creativity, manifestation, skill)",
		outcome: "8 of Wands (progress, momentum, excitement)",
	},
	Cancer: {
		currentSituation: "2 of Cups (harmony, partnership)",
		challenge: "Moon (intuition, illusion, fear)",
		advice: "The Empress (nurturing, care, compassion)",
		outcome: "10 of Cups (happiness, fulfillment, joy)",
	},
	Leo: {
		currentSituation: "5 of Wands (competition, tension)",
		challenge: "4 of Swords (rest, recovery, solitude)",
		advice: "The Sun (joy, success, recognition)",
		outcome: "Knight of Wands (adventure, passion, progress)",
	},
	Virgo: {
		currentSituation: "3 of Pentacles (skill, craftsmanship, collaboration)",
		challenge: "9 of Swords (anxiety, worry, fear)",
		advice: "The Hermit (introspection, guidance, wisdom)",
		outcome: "6 of Pentacles (balance, harmony, exchange)",
	},
	Libra: {
		currentSituation: "2 of Swords (balance, indecision)",
		challenge: "5 of Cups (loss, regret, longing)",
		advice: "The Justice (balance, fairness, karma)",
		outcome: "Knight of Cups (romance, invitation, opportunity)",
	},
	Scorpio: {
		currentSituation: "8 of Cups (letting go, moving on)",
		challenge: "3 of Swords (heartbreak, sadness)",
		advice: "The Death (transformation, rebirth, renewal)",
		outcome: "10 of Wands (success, achievement, recognition)",
	},
	Sagittarius: {
		currentSituation: "6 of Wands (success, recognition, progress)",
		challenge: "4 of Swords (rest, recovery, solitude)",
		advice: "The Temperance (balance, harmony, moderation)",
		outcome: "Knight of Wands (adventure, passion, progress)",
	},
	Capricorn: {
		currentSituation: "4 of Pentacles (stability, security)",
		challenge: "5 of Swords (conflict, tension)",
		advice: "The Emperor (structure, discipline, leadership)",
		outcome: "10 of Pentacles (success, achievement, recognition)",
	},
	Aquarius: {
		currentSituation: "5 of Wands (competition, tension)",
		challenge: "8 of Cups (letting go, moving on)",
		advice: "The Star (hope, inspiration, guidance)",
		outcome: "Knight of Wands (adventure, passion, progress)",
	},
	Pisces: {
		currentSituation: "2 of Cups (harmony, partnership)",
		challenge: "Moon (intuition, illusion, fear)",
		advice: "The High Priestess (intuition, wisdom, mystery)",
		outcome: "10 of Cups (happiness, fulfillment, joy)",
	},
};

const getReadingBtn = document.getElementById("get-reading-btn");
const resultDiv = document.getElementById("result-div");

getReadingBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const zodiacSign = document.getElementById("zodiac-sign").value;
	const result = tarotReadings[zodiacSign];

	if (result) {
		resultDiv.innerHTML = `
            <h1>Tarot Reading for ${zodiacSign}</h1>
            <h2>Current Situation:</h2>
            <p>${result.currentSituation}</p>
            <h2>Challenge:</h2>
            <p>${result.challenge}</p>
            <h2>Advice:</h2>
            <p>${result.advice}</p>
            <h2>Outcome:</h2>
            <p>${result.outcome}</p>
        `;
	} else {
		resultDiv.innerHTML = "<p>Zodiac sign not found</p>";
	}
});

// Get the textarea and the buttons
const speakButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");

// Create a new speech synthesis utterance
const utterance = new SpeechSynthesisUtterance();

// Get list of available voices
const voices = window.speechSynthesis.getVoices();
const femaleVoice = voices.filter(
	(voice) => voice.lang === "en-US" && voice.name === "Google US English Female"
)[0];

// Set the text and voice for the utterance
utterance.text = resultDiv.textContent;
utterance.voice = femaleVoice || voices[0];
utterance.pitch = 8;
utterance.rate = 1.2;
utterance.volume = 50;

// Add event listeners to the buttons
speakButton.addEventListener("click", () => {
	// Set text tor the utterance
	utterance.text = resultDiv.textContent;
	// Speak the utterance
	window.speechSynthesis.speak(utterance);
});

stopButton.addEventListener("click", () => {
	// Cancel the utterance
	window.speechSynthesis.cancel();
});

// Light, dark and dim theme

document.getElementById("theme-toggle").addEventListener("click", () => {
	const currentTheme = document.documentElement.getAttribute("data-theme");
	let newTheme;

	if (currentTheme === "light") {
		newTheme = "dim";
	} else if (currentTheme === "dim") {
		newTheme = "dark";
	} else if (currentTheme === "dark") {
		newTheme = "grin";
	} else {
		newTheme = "light";
	}

	document.documentElement.setAttribute("data-theme", newTheme);
	localStorage.setItem("theme", newTheme); // Save preference
});

// Load saved theme on page load
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
