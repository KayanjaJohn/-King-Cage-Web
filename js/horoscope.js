const form = document.getElementById("horoscope-form");
const resultDiv = document.getElementById("horoscope-result");

const zodiacSigns = {
	January: [
		{ sign: "Capricorn", dates: [1, 19] },
		{ sign: "Aquarius", dates: [20, 31] },
	],
	February: [
		{ sign: "Aquarius", dates: [1, 18] },
		{ sign: "Pisces", dates: [19, 28] },
	],
	March: [
		{ sign: "Pisces", dates: [1, 20] },
		{ sign: "Aries", dates: [21, 31] },
	],
	April: [
		{ sign: "Aries", dates: [1, 19] },
		{ sign: "Taurus", dates: [20, 30] },
	],
	May: [
		{ sign: "Taurus", dates: [1, 20] },
		{ sign: "Gemini", dates: [21, 31] },
	],
	June: [
		{ sign: "Gemini", dates: [1, 20] },
		{ sign: "Cancer", dates: [21, 30] },
	],
	July: [
		{ sign: "Cancer", dates: [1, 22] },
		{ sign: "Leo", dates: [23, 31] },
	],
	August: [
		{ sign: "Leo", dates: [1, 22] },
		{ sign: "Virgo", dates: [23, 31] },
	],
	September: [
		{ sign: "Virgo", dates: [1, 22] },
		{ sign: "Libra", dates: [23, 30] },
	],
	October: [
		{ sign: "Libra", dates: [1, 22] },
		{ sign: "Scorpio", dates: [23, 31] },
	],
	November: [
		{ sign: "Scorpio", dates: [1, 21] },
		{ sign: "Sagittarius", dates: [22, 30] },
	],
	December: [
		{ sign: "Sagittarius", dates: [1, 21] },
		{ sign: "Capricorn", dates: [22, 31] },
	],
};

const signInfo = {
	Aquarius: {
		description: `<br> <br> 
            <b>Traits:</b> Humanitarian, independent, unconventional, inventive, and progressive.<br> <br> 
            <b>Strengths:</b> Visionary, intellectual, and socially conscious. Aquarians value freedom and individuality.<br> <br> 
            <b>Weaknesses:</b> Unpredictable, rebellious, and aloof. They can also be overly detached or unpredictable.<br> <br> 
            <b>Overcoming weaknesses:</b> Practice empathy and active listening to connect with others on a deeper level. Cultivate self-awareness to understand your emotions and behaviors.
        `,
		dates: "January 20 - February 18",
	},
	Pisces: {
		description: `<br> <br> 
            <b>Traits:</b> Sensitive, emotional, imaginative, intuitive, and empathetic.<br> <br> 
            <b>Strengths:</b> Compassionate, artistic, and adaptable. Pisces are natural caregivers and creative problem solvers.<br> <br> 
            <b>Weaknesses:</b> Indecisive, impressionable, and escapist. They can struggle with boundaries and self-care.<br> <br> 
            <b>Overcoming weaknesses:</b> Develop self-discipline and set healthy boundaries. Practice mindfulness and self-compassion to stay grounded.
        `,
		dates: "February 19 - March 20",
	},
	Aries: {
		description: `<br> <br> 
            <b>Traits:</b> Adventurous, impulsive, energetic, confident, and determined.<br> <br> 
            <b>Strengths:</b> Courageous, spontaneous, and natural-born leaders. Aries are passionate and driven.<br> <br> 
            <b>Weaknesses:</b> Impulsive, impatient, and competitive. They can struggle with self-control and empathy.<br> <br> 
            <b>Overcoming weaknesses:</b> Practice patience and self-awareness to make more informed decisions. Cultivate empathy by actively listening to others.
        `,
		dates: "March 21 - April 19",
	},
	Taurus: {
		description: `<br> <br> 
            <b>Traits:</b> Reliable, practical, sensuous, determined, and patient.<br> <br> 
            <b>Strengths:</b> Responsible, hardworking, and loyal. Tauruses value stability and security.<br> <br> 
            <b>Weaknesses:</b> Stubborn, materialistic, and overly cautious. They can struggle with flexibility and spontaneity.<br> <br> 
            <b>Overcoming weaknesses:</b> Practice flexibility and openness to new experiences. Cultivate a growth mindset to stay adaptable.
        `,
		dates: "April 20 - May 20",
	},
	Gemini: {
		description: `<br> <br> 
            <b>Traits:</b> Communicative, versatile, unpredictable, curious, and adaptable.<br> <br> 
            <b>Strengths:</b> Quick-witted, sociable, and intelligent. Geminis are natural communicators and problem solvers.<br> <br> 
            <b>Weaknesses:</b> Restless, easily distracted, and unpredictable. They can struggle with focus and commitment.<br> <br> 
            <b>Overcoming weaknesses:</b> Practice focus and concentration through mindfulness and meditation. Cultivate self-discipline to stay committed to goals.
        `,
		dates: "May 21 - June 20",
	},
	Cancer: {
		description: `<br> <br> 
            <b>Traits:</b> Emotional, sensitive, protective, nurturing, and sentimental.<br> <br> 
            <b>Strengths:</b> Empathetic, loyal, and caring. Cancers value close relationships and family ties.<br> <br> 
            <b>Weaknesses:</b> Moody, clingy, and overly sensitive. They can struggle with emotional regulation and boundaries.<br> <br> 
            <b>Overcoming weaknesses:</b> Practice emotional awareness and regulation through self-reflection and mindfulness. Cultivate healthy boundaries and communication skills.
        `,
		dates: "June 21 - July 22",
	},
	Leo: {
		description: `<br> <br> 
            <b>Traits:</b> Confident, passionate, generous, warm-hearted, and proud.<br> <br> 
            <b>Strengths:</b> Charismatic, creative, and natural-born leaders. Leos are confident and generous.<br> <br> 
            <b>Weaknesses:</b> Prideful, dominating, and overly critical. They can struggle with humility and empathy.<br> <br> 
            <b>Overcoming weaknesses:</b> Practice humility and self-awareness to recognize the value of others. Cultivate empathy by actively listening to others.
        `,
		dates: "July 23 - August 22",
	},

	Virgo: {
		description: `<br> <br> 
        <b>Traits:</b> Analytical, practical, precise, critical, and perfectionistic.<br> <br> 
        <b>Strengths:</b> Hardworking, reliable, and attentive to detail. Virgos are natural problem solvers and analysts.<br> <br> 
        <b>Weaknesses:</b> Overly critical, perfectionistic, and anxious. They can struggle with self-acceptance and relaxation.<br> <br> 
        <b>Overcoming weaknesses:</b> Practice self-compassion and self-acceptance. Cultivate relaxation techniques like meditation and deep breathing.
    `,
		dates: "August 23 - September 22",
	},
	Libra: {
		description: `<br> <br> 
        <b>Traits:</b> Diplomatic, social, balance, gracious, and cooperative.<br> <br> 
        <b>Strengths:</b> Charming, fair-minded, and natural peacemakers. Libras value harmony and balance.<br> <br> 
        <b>Weaknesses:</b> Indecisive, people-pleasing, and avoiding conflict. They can struggle with assertiveness and self-identity.<br> <br> 
        <b>Overcoming weaknesses:</b> Practice assertiveness and self-expression. Cultivate self-awareness to develop a stronger sense of self.
    `,
		dates: "September 23 - October 22",
	},
	Scorpio: {
		description: `<br> <br> 
        <b>Traits:</b> Passionate, intense, profound, perceptive, and secretive.<br> <br> 
        <b>Strengths:</b> Resourceful, courageous, and naturally intuitive. Scorpios are magnetic and charismatic.<br> <br> 
        <b>Weaknesses:</b> Obsessive, vengeful, and overly critical. They can struggle with trust and emotional regulation.<br> <br> 
        <b>Overcoming weaknesses:</b> Practice emotional awareness and regulation. Cultivate self-reflection and self-compassion to develop healthier relationships.
    `,
		dates: "October 23 - November 21",
	},
	Sagittarius: { 
		description: `<br> <br> 
        <b>Traits:</b> Adventurous, optimistic, freedom-loving, philosophical, and blunt.<br> <br> 
        <b>Strengths:</b> Confident, enthusiastic, and natural explorers. Sagittarians love learning and expanding their horizons.<br> <br> 
        <b>Weaknesses:</b> Blunt, restless, and overly optimistic. They can struggle with commitment and emotional depth.<br> <br> 
        <b>Overcoming weaknesses:</b> Practice emotional awareness and empathy. Cultivate self-reflection and self-discipline to develop greater commitment and responsibility.
    `,
		dates: "November 22 - December 21",
	},
	Capricorn: {
		description: `<br> <br> 
        <b>Traits:</b> Disciplined, responsible, ambitious, practical, and patient.<br> <br>
        <b>Strengths:</b> Reliable, hardworking, and strategic thinkers. Capricorns value stability and security.<br><br>
        <b>Weaknesses:</b> Perfectionistic, overly critical, and pessimistic. They can struggle with emotional expression and spontaneity.<br> <br> 
        <b>Overcoming weaknesses:</b> Practice self-compassion and self-awareness. Cultivate emotional expression and spontaneity through creative pursuits and social connections.
    `,
		dates: "December 22 - January 19",
	},
};
function getZodiacSign(month, day) {
	const signs = zodiacSigns[month];
	for (const sign of signs) {
		if (day >= sign.dates[0] && day <= sign.dates[1]) {
			return sign.sign;
		}
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const month = document.getElementById("month").value;
	const day = parseInt(document.getElementById("day").value);
	const sign = getZodiacSign(month, day);
	const signDescription = signInfo[sign].description;
	const signDates = signInfo[sign].dates;

	resultDiv.innerHTML = `
        <h2>Your Zodiac Sign is ${sign}!</h2>
        <p>Sign Dates:  ${signDates}</p>
        <p>Sign Description: ${signDescription}✨</p><br>
    `;
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
utterance.pitch = -1;
utterance.rate = 1.2;

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

document.getElementById('theme-toggle').addEventListener('click', () => {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	let newTheme;
  
	if (currentTheme === 'light') {
	  newTheme = 'dim';
	} else if (currentTheme === 'dim') {
	  newTheme = 'dark';
	} else {
	  newTheme = 'light';
	}
  
	document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme); // Save preference
  });
  
  // Load saved theme on page load
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  
  
  
  