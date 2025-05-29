// app.js
const themes = [
    {
      title: "Purpose and Calling",
      wisdom: "A flame may flicker in doubt, but it cannot be put out by fear. Purpose is not found—it is followed.",
      example: `Monica had worked in finance for eight years. It was safe, well-paid—but every morning felt like a routine march. One day at a children’s home where she volunteered, she helped a young girl write her first story. The girl beamed with pride—and something inside Monica awakened. Over the next year, she scaled back work, studied child development, and started an educational nonprofit. It wasn’t glamorous. It wasn’t easy. But it was hers.`
    },
    {
      title: "Overcoming Fear",
      wisdom: "The lion of fear stands at the gate of every great breakthrough. Step forward, and it bows.",
      example: `Ayo had always feared rejection. As a teen, he loved music but never shared it. At 28, he sat in his room, jobless after a layoff, wondering if he was wasting his life. On a dare, he uploaded one of his old songs to social media. No one laughed. In fact, strangers commented. Encouraged, he kept sharing. Two years later, he became a local artist and speaker helping youth face anxiety. The fear never left—but his courage grew louder.`
    },
    {
      title: "Discipline and Growth",
      wisdom: "Correction may sting, but the sting of stagnation lasts longer.",
      example: `Kelvin was fired from his first job for being late too often. It crushed him. At first, he blamed the manager. Then he sat with the pain. He realized he hadn’t taken life seriously. He started waking early, reading books on habits, and applying to internships. Within a year, he landed another role—this time, he was never late once. That job led to better opportunities. What once felt like failure became the turning point of his life.`
    },
    {
      title: "Forgiveness and Healing",
      wisdom: "To forgive is not to forget, but to free yourself from what memory chains you.",
      example: `Clara’s sister betrayed her during a time of crisis. For years, they didn’t speak. Clara carried the pain like a backpack full of bricks—always heavy. After a therapy session, she wrote a long letter. She didn’t justify the hurt—but she let it go. She didn’t mail it. She burned it. Then she prayed. Months later, her sister reached out. Reconciliation took time, but Clara was already lighter. Forgiveness wasn’t about the other person. It was the gift she gave herself.`
    },
    {
      title: "Patience and Timing",
      wisdom: "The fruit is sweetest when it ripens in season. Impatience picks it bitter.",
      example: `Denzel applied for medical school four times. Every rejection stung. Friends advanced, married, built careers—while he waited. He wanted to give up. But he also believed in his calling. He took another job at a hospital. There, he met a mentor who helped him strengthen his application. On the fifth try, he got in. Now a doctor, he says, “Had I been accepted earlier, I wouldn’t have appreciated it the same. Delay built my character.”`
    },
    {
      title: "Wisdom in Friendship",
      wisdom: "A true friend multiplies joy and divides sorrow, while a fool brings ruin wrapped in charm.",
      example: `Rita was popular in school, surrounded by friends—until she was hospitalized after an accident. The ones who called, visited, and helped her family were not the loudest or trendiest. They were the quiet ones she had often overlooked. That season taught her that friendship is proven in adversity, not social photos. When she healed, her circle shrank—but it was richer than ever.`
    },
    {
      title: "Humility and Pride",
      wisdom: "Pride builds a tall house with weak foundations; humility digs deep roots before rising.",
      example: `Julius had a booming tech startup. Money came fast. So did arrogance. He dismissed others’ input, overpromised, and neglected his team. A big contract failed, investors pulled out, and the company folded. Broke and bitter, he took time to reflect. He studied business again, listened to mentors, and rebuilt a smaller, more stable business. Now he shares his story at leadership events—reminding others that falling down humbles you, but staying down is a choice.`
    },
    {
      title: "Speech and Silence",
      wisdom: "Words build bridges or burn them—speak with fire, but know when to be still.",
      example: `Maya was known for her quick wit and sarcasm. But after a heated argument with her sister that led to months of silence, she reconsidered. She read books on communication and learned to pause before reacting. One night, she chose to listen quietly as a friend poured out their struggles. That friend later said, “Your silence helped me more than a thousand words.” Maya discovered the strength in restraint.`
    }
  ];
  
  window.onload = () => {
    const container = document.getElementById("themesContainer");
    const bgMusic = document.getElementById("bgMusic");
    const voiceSelect = document.getElementById("voiceSelect");
  
    themes.forEach((theme, index) => {
      const card = document.createElement("div");
      card.className = "theme-card";
      card.innerHTML = `
        <h3>${theme.title}</h3>
        <p><strong>Wisdom:</strong> ${theme.wisdom}</p>
        <p><strong>Story:</strong> ${theme.example}</p>
        <button onclick="readOutLoud('${theme.wisdom} ${theme.example}')">🔊 Listen</button>
        <button onclick="addToFavorites(${index})">⭐ Add to Favorites</button>
      `;
      container.appendChild(card);
    });
  
    if (bgMusic) bgMusic.volume = 0.3;
    if (window.speechSynthesis) {
      const voices = window.speechSynthesis.getVoices();
      voices.forEach(voice => {
        const option = document.createElement("option");
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelect.appendChild(option);
      });
    }
  };
  
  function readOutLoud(text) {
    const rate = document.getElementById("rateSlider").value || 1;
    const voiceName = document.getElementById("voiceSelect").value;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = parseFloat(rate);
    const voices = window.speechSynthesis.getVoices();
    utter.voice = voices.find(v => v.name === voiceName);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
  
  function addToFavorites(index) {
    const theme = themes[index];
    const list = document.getElementById("favoritesList");
    const item = document.createElement("li");
    item.textContent = theme.title;
    list.appendChild(item);
  }
  
  function toggleTheme(value) {
    document.body.className = value === "dark" ? "dark" : "light";
  }
  
  function toggleMusic() {
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.muted = !bgMusic.muted;
  }
  
  function toggleCalmingMode() {
    document.body.classList.toggle("calming");
    const utter = new SpeechSynthesisUtterance("Calming mode activated. Take a deep breath and let wisdom sink in.");
    utter.rate = 0.8;
    window.speechSynthesis.speak(utter);
  }
  
  function goToSettings() {
    document.getElementById("settingsPage").classList.remove("hidden");
    document.querySelector("main").style.display = "none";
  }
  
  function goToMain() {
    document.getElementById("settingsPage").classList.add("hidden");
    document.querySelector("main").style.display = "block";
  }
  
  // Optional: auto-enable calming mode between 9PM–6AM
  const hour = new Date().getHours();
  if (hour >= 21 || hour < 6) {
    document.body.classList.add("calming");
  }
  