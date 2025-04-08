const angelNumberInput = document.getElementById("angel-number");
const getMeaningBtn = document.getElementById("get-meaning-btn");
const resultDiv = document.getElementById("result");

const angelNumbers = {
	111: {
		title: "Angel Number 111",
		intro:
			"Seeing 111 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*New Beginnings and Manifestation*: 111 is often associated with new beginnings, manifestation, and positive energy. Your angels may be nudging you to focus on your thoughts and desires.",
			"*Spiritual Awakening and Enlightenment*: The number 1 represents spiritual awakening and enlightenment. Seeing 111 might indicate that you're entering a period of spiritual growth and awakening.",
		],
		guidance: [
			"*Take a moment to reflect*: When you see 111, take a deep breath, and reflect on your thoughts, emotions, and current situation.",
			"*Trust your intuition*: Pay attention to your inner voice and trust your instincts. Your angels may be guiding you toward a specific decision or action.",
		],
		conclusion:
			"Angel number 111 is a powerful and uplifting message from the spiritual realm. It's a reminder to trust your intuition, focus on your thoughts and desires, and have faith in the universe's plan. When you see 111, know that your angels are guiding and supporting you every step of the way.",
	},
	222: {
		title: "Angel Number 222",
		intro:
			"Seeing 222 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*Balance and Harmony*: 222 is often associated with balance and harmony. Your angels may be nudging you to focus on finding stability and equilibrium in your life.",
			"*Trust and Faith*: The number 2 represents trust and faith. Seeing 222 might indicate that you need to have more faith in the universe's plan and trust that everything will work out for your highest good.",
		],
		guidance: [
			"*Have patience and trust the universe*: When you see 222, remember to have patience and trust that everything will work out for your highest good.",
			"*Focus on balance and harmony*: Pay attention to finding balance and harmony in your life. Your angels may be guiding you toward a more peaceful and stable path.",
		],
		conclusion:
			"Angel number 222 is a reassuring message from the spiritual realm. It's a reminder to trust the universe's plan, have faith in the outcome, and focus on finding balance and harmony in your life.",
	},
	333: {
		title: "Angel Number 333",
		intro:
			"Seeing 333 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*Creativity and Manifestation*: 333 is often associated with creativity, manifestation, and positive energy. Your angels may be nudging you to focus on your creative pursuits, turn your ideas into reality, and trust that your thoughts will manifest into your desired outcomes.",
			"*Balance and Harmony*: The number 3 represents the trinity (body, mind, and spirit) and is associated with balance and harmony. Seeing 333 might indicate that you're entering a period of stability and equilibrium in your life.",
		],
		guidance: [
			"*Take a moment to reflect*: When you see 333, take a deep breath, and reflect on your thoughts, emotions, and current situation.",
			"*Trust your intuition*: Pay attention to your inner voice and trust your instincts. Your angels may be guiding you toward a specific decision or action.",
			"*Focus on positivity and creativity*: 333 is a powerful manifestation number. Focus on positive thoughts, cultivate creativity, and visualize your desired outcomes.",
			"*Let go of fears and doubts*: Remember that your angels are supporting you. Let go of fears, doubts, and worries, and trust that everything will work out for your highest good.",
		],
		conclusion:
			"Angel number 333 is a powerful and uplifting message from the spiritual realm. It's a reminder to trust your intuition, focus on positivity and creativity, and have faith in the universe's plan. When you see 333, know that your angels are guiding and supporting you every step of the way.",
	},
	444: {
		title: "Angel Number 444",
		intro:
			"Seeing 444 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*Stability and Structure*: 444 is often associated with stability, structure, and practicality. Your angels may be nudging you to focus on building a strong foundation for your life and creating a sense of stability and security.",
			"*Hard Work and Determination*: The number 4 represents hard work, determination, and perseverance. Seeing 444 might indicate that you need to put in more effort and be more determined to achieve your goals.",
		],
		guidance: [
			"*Focus on building a strong foundation*: When you see 444, pay attention to building a strong foundation for your life. This could include creating a stable routine, setting clear goals, and working hard to achieve them.",
			"*Be more determined and persevering*: Remember that success often requires hard work and determination. When you see 444, it may be a sign that you need to be more persistent and determined in pursuing your goals.",
		],
		conclusion:
			"Angel number 444 is a reassuring message from the spiritual realm. It's a reminder to focus on building a strong foundation for your life, work hard, and be determined to achieve your goals.",
	},
	555: {
		title: "Angel Number 555",
		intro:
			"Seeing 555 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*Transformation and Change*: 555 is often associated with transformation, change, and freedom. Your angels may be nudging you to be more open to new experiences and to embrace change as an opportunity for growth.",
			"*Adventure and Exploration*: The number 5 represents adventure, exploration, and taking risks. Seeing 555 might indicate that you need to be more spontaneous and willing to take risks in order to achieve your goals.",
		],
		guidance: [
			"*Be open to new experiences*: When you see 555, remember to be more open to new experiences and to embrace change as an opportunity for growth.",
			"*Take calculated risks*: Seeing 555 may be a sign that you need to be more willing to take calculated risks in order to achieve your goals. Trust your instincts and have faith that everything will work out for your highest good.",
		],
		conclusion:
			"Angel number 555 is an exciting message from the spiritual realm. It's a reminder to be more open to new experiences, to embrace change, and to take calculated risks in order to achieve your goals.",
	},
	666: {
		title: "Angel Number 666",
		intro:
			"Seeing 666 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*Love and Nurturing*: 666 is often associated with love, nurturing, and responsibility. Your angels may be nudging you to focus on cultivating more love and compassion in your life.",
			"*Balance and Harmony*: The number 6 represents balance and harmony. Seeing 666 might indicate that you need to focus on finding more balance and harmony in your life.",
		],
		guidance: [
			"*Cultivate more love and compassion*: When you see 666, remember to focus on cultivating more love and compassion in your life. This could include being more nurturing and caring toward yourself and others.",
			"*Focus on balance and harmony*: Seeing 666 may be a sign that you need to focus on finding more balance and harmony in your life. Pay attention to your thoughts, emotions, and actions, and make adjustments as needed to achieve a more balanced and harmonious state.",
		],
		conclusion:
			"Angel number 666 is a loving message from the spiritual realm. It's a reminder to focus on cultivating more love and compassion in your life, and to strive for balance and harmony in all aspects of your life.",
	},
	777: {
		title: "Angel Number 777",
		intro:
			"Seeing 777 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*Spiritual Growth and Enlightenment*: 777 is often associated with spiritual growth, enlightenment, and inner wisdom. Your angels may be nudging you to focus on your spiritual growth and to trust your inner wisdom.",
			"*Intuition and Inner Guidance*: The number 7 represents intuition and inner guidance. Seeing 777 might indicate that you need to trust your intuition more and listen to your inner voice.",
		],
		guidance: [
			"*Focus on spiritual growth*: When you see 777, remember to focus on your spiritual growth and to trust your inner wisdom.",
			"*Trust your intuition*: Seeing 777 may be a sign that you need to trust your intuition more and listen to your inner voice.",
		],
		conclusion:
			"Angel number 777 is a powerful and uplifting message from the spiritual realm. It's a reminder to focus on your spiritual growth, trust your inner wisdom, and listen to your intuition.",
	},
	888: {
		title: "Angel Number 888",
		intro:
			"Seeing 888 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*Abundance and Prosperity*: 888 is often associated with abundance, prosperity, and financial success. Your angels may be nudging you to focus on manifesting abundance and prosperity in your life.",
			"*Inner Wisdom and Intuition*: The number 8 represents inner wisdom and intuition. Seeing 888 might indicate that you need to trust your inner wisdom and listen to your intuition.",
		],
		guidance: [
			"*Focus on manifesting abundance*: When you see 888, remember to focus on manifesting abundance and prosperity in your life.",
			"*Trust your inner wisdom*: Seeing 888 may be a sign that you need to trust your inner wisdom and listen to your intuition.",
		],
		conclusion:
			"Angel number 888 is a powerful and uplifting message from the spiritual realm. It's a reminder to focus on manifesting abundance and prosperity, trust your inner wisdom, and listen to your intuition.",
	},
	999: {
		title: "Angel Number 999",
		intro:
			"Seeing 999 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*Humanitarianism and Global Awareness*: 999 is often associated with humanitarianism, global awareness, and the completion of a cycle. Your angels may be nudging you to focus on making a positive impact on the world.",
			"*Inner Wisdom and Intuition*: The number 9 represents inner wisdom and intuition. Seeing 999 might indicate that you need to trust your inner wisdom and listen to your intuition.",
		],
		guidance: [
			"*Focus on making a positive impact*: When you see 999, remember to focus on making a positive impact on the world.",
			"*Trust your inner wisdom*: Seeing 999 may be a sign that you need to trust your inner wisdom and listen to your intuition.",
		],
		conclusion:
			"Angel number 999 is a powerful and uplifting message from the spiritual realm. It's a reminder to focus on making a positive impact on the world, trust your inner wisdom, and listen to your intuition.",
	},

	"000": {
		title: "Angel Number 000",
		intro:
			"Seeing 000 repeatedly is considered a powerful message from the spiritual realm, particularly from your angels or spirit guides. Here are some possible interpretations:",
		symbolism: [
			"*The Universe and Infinite Potential*: 000 is often associated with the universe and infinite potential. Your angels may be nudging you to focus on your connection to the universe and to tap into your infinite potential.",
			"*New Beginnings and Cycles*: The number 0 represents new beginnings and cycles. Seeing 000 might indicate that you're entering a new cycle of life and that new beginnings are on the horizon.",
		],
		guidance: [
			"*Focus on your connection to the universe*: When you see 000, remember to focus on your connection to the universe and to tap into your infinite potential.",
			"*Be open to new beginnings*: Seeing 000 may be a sign that you're entering a new cycle of life and that new beginnings are on the horizon.",
		],
		conclusion:
			"Angel number 000 is a powerful and uplifting message from the spiritual realm. It's a reminder to focus on your connection to the universe, tap into your infinite potential, and be open to new beginnings.",
	},
};

getMeaningBtn.addEventListener("click", () => {
	const angelNumber = angelNumberInput.value.trim();
	if (angelNumber in angelNumbers) {
		const result = angelNumbers[angelNumber];
		resultDiv.innerHTML = `
            <h1>${result.title}</h1>
            <p>${result.intro}</p>
            <h2>Symbolism and Meaning</h2>
            <ul>
                ${result.symbolism.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <h2>Guidance</h2>
            <ul>
                ${result.guidance.map((item) => `<li>${item}</li>`).join("")}
            </ul>
            <h2>Conclusion</h2>
            <p>${result.conclusion}</p>
        `;
	} else {
		resultDiv.innerHTML = `<p>Angel number not found</p>`;
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
utterance.pitch = 2;
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
  
  
  document.getElementById('switch').addEventListener('click', () => {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	let newTheme;
  
	if (currentTheme === 'light') {
	  newTheme = 'dim';
	} else if (currentTheme === 'dim') {
	  newTheme = 'dark';
	} else if (currentTheme === 'dark') {
	  newTheme = 'grin';
	} else {
	  newTheme = 'light';
	}
  
	document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme); // Save preference
  });
  
  // Load saved theme on page load
  const switchTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', switchTheme);
 
