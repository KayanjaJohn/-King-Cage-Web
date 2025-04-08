// Get the landing section, Playlists, Now playing list and music player section elements
const landingSection = document.getElementById("landing-section");
const musicPlayerSection = document.getElementById("music-player-section");
const songListSection = document.getElementById("song-list-section");
const playlistsSection = document.querySelector(".playlist-container");
const nowPlayingSection = document.querySelector(".now-playing-playlist");

// Get the allow media access button element
// document
// 	.getElementById("allow-media-access")
// 	.addEventListener("click", getMediaFiles);

// Get the song list element
const songList = document.getElementById("song-list");

// Get the audio player and control elements
const audioPlayer = document.getElementById("audio-player");
// Get the play & pause buttons element
const playPauseBtn = document.getElementById("play-pause");
// Get the previous button element
const previousButton = document.getElementById("prev-btn");
// Get the next button element
const nextButton = document.getElementById("next-btn");
// Get the shuffle button element
const shuffleButton = document.getElementById("shuffle");
// Get the repeat button element
const repeatButton = document.getElementById("repeat-btn");
// Get the play list button element
const playListButton = document.getElementById("playlist");
// Get the current time element
const currentTimeE1 = document.getElementById("current-time");
// Get the duration element
const durationE1 = document.getElementById("duration");
// Get the seek bar element
const seekBar = document.getElementById("seek-bar");
// Get the bottom player play & pause buttons element
const bottomPlayerPlayPauseBtn = document.getElementById(
	"bottom-player-play-pause"
);
// Get the bottom player previous button element
const bottomPlayerPreviousButton = document.getElementById(
	"bottom-player-prev-btn"
);
// Get the bottom player next button element
const bottomPlayerNextButton = document.getElementById(
	"bottom-player-next-btn"
);
// Get the bottom player shuffle button element
const bottomPlayerShuffleButton = document.getElementById(
	"bottom-player-shuffle"
);
// Get the bottom player repeat button element
const bottomPlayerRepeatButton = document.getElementById(
	"bottom-player-repeat-btn"
);
// Get the bottom player current time element
const bottomPlayerCurrentTimeE1 = document.getElementById(
	"bottom-player-current-time"
);
// Get the bottom player duration element
const bottomPlayerDurationE1 = document.getElementById(
	"bottom-player-duration"
);
// Get the bottom player seek bar elemen
const bottomPlayerSeekBar = document.getElementById("bottom-player-seek-bar");
// Get the visualizer canvas element
const visualizerCanvas = document.getElementById("visualizer");
// Get the canvas context
const canvasContext = visualizerCanvas.getContext("2d");
// Get the song title element
const songTitleElement = document.getElementById("song-title");
// Get the song artist element
const songArtistElement = document.getElementById("song-artist");
// Get the bottom player song title element
const bottomPlayerSongTitleElement = document.getElementById(
	"bottom-player-song-title"
);
// Get the bottom player song artist element
const bottomPlayerSongArtistElement = document.getElementById(
	"bottom-player-song-artist"
);

const fileInput = document.getElementById("song-selector");

// Define the audio context, analyser, and data array
let audioContext, analyser, dataArray, bufferLength;

// Define the current song index and mode
let currentSongIndex = 0;
let repeatMode = false;
let shuffleMode = false;

// Define the song list
let songs = [];

// Function to get the media files
const accessMediaButton = document.getElementById('allow-media-access');
accessMediaButton.addEventListener('click', async () => {
  try {
    if ('showDirectoryPicker' in window) {
      // Use the showDirectoryPicker API to access media files (for desktop devices)
      const directoryHandle = await window.showDirectoryPicker();
      const files = await getFilesFromDirectoryHandle(directoryHandle);
      songs = files.filter((file) =>
        file.name.endsWith('.mp3') ||
        file.name.endsWith('.wav') ||
        file.name.endsWith('.ogg')
      );
      displaySongList(songs);
    } else {
      // Use a file input element with the multiple attribute for mobile devices
      const directoryInput = document.createElement('input');
      directoryInput.type = 'file';
      directoryInput.multiple = true;

      directoryInput.addEventListener('change', async (event) => {
        const files = event.target.files;
        songs = Array.from(files).filter((file) =>
          file.name.endsWith('.mp3') ||
          file.name.endsWith('.wav') ||
          file.name.endsWith('.ogg')
        );
        displaySongList(songs);
      });

      directoryInput.click();
    }
  } catch (error) {
    console.error('Error getting media files:', error);
  }
});

async function getFilesFromDirectoryHandle(directoryHandle) {
  const files = [];
  for await (const entry of directoryHandle.values()) {
    if (entry.kind === 'file') {
      files.push({ name: entry.name, file: await entry.getFile() });
    } else if (entry.kind === 'directory') {
      const subFiles = await getFilesFromDirectoryHandle(await entry.getDirectoryHandle());
      files.push(...subFiles);
    }
  }
  return files;
}

// Function to display the song list
function displaySongList(songs) {
  songList.innerHTML = "";
  songs.forEach((song, index) => {
    const songElement = document.createElement("li");
    songElement.textContent = song.name;
    songElement.addEventListener("click", () => {
      currentSongIndex = index;
      playCurrentSong(currentSongIndex);
    });
    songList.appendChild(songElement);
  });
  musicPlayerSection.style.display = "none";
  landingSection.style.display = "none";
  songListSection.style.display = "block";
  bottomPlayerSection.style.display = "block";
  searchContainer.style.display = "none";
}

// Get the song image element
const songImageElement = document.getElementById("song-image");

// Function to get the song image from the music file
function getSongImage(songFile) {
	const jsmediatags = window.jsmediatags;

	jsmediatags.read(songFile, {
		onSuccess: function (tag) {

			if (!songImageElement) {
				console.error("Error: songImageElement not found in the DOM.");
				return;
			}

			const image = tag.tags.picture;

			if (image && image.data && image.data.length > 0) {
				const imageData = new Uint8Array(image.data);
				const imageType = image.format;

				if (imageType) {
					const imageObjectUrl = URL.createObjectURL(
						new Blob([imageData], { type: `image/${imageType.toLowerCase()}` })
					);
					songImageElement.src = imageObjectUrl;
					return;
				}
			}

			// If there's no image, set the default
			songImageElement.src = "/img/img0.jpg";
		},
		onError: function (error) {
			console.error("Error reading song image:", error);
			if (songImageElement) {
				songImageElement.src = "/img/img0.jpg"; // Set default image on error
			}
		},
	});
}

// Function to edit the album image
function editAlbumImage() {
	const fileInput = document.getElementById("album-image-input");
	fileInput.click();
}

// Function to update the album image
function updateAlbumImage(event) {
	const file = event.target.files[0];
	const imageObjectUrl = URL.createObjectURL(file);
	songImageElement.src = imageObjectUrl;
	// Update the song file with the new album image
	updateSongFileAlbumImage(file);
}

// Function to update the song file with the new album image
function updateSongFileAlbumImage(file) {
	// Use a library like jsmediatags to update the album image
	const jsmediatags = window.jsmediatags;
	jsmediatags.write(
		songs[currentSongIndex].file,
		{
			tags: {
				picture: file,
			},
		},
		{
			onSuccess: function () {
				console.log("Album image updated successfully");
			},
			onError: function (error) {
				console.error("Error updating album image:", error);
			},
		}
	);
}

// Add event listeners
document
	.getElementById("edit-album-image-button")
	.addEventListener("click", editAlbumImage);
document
	.getElementById("album-image-input")
	.addEventListener("change", updateAlbumImage);

// Function to play the current song
function playCurrentSong(songIndex) {
	currentSongIndex = songIndex;
	audioPlayer.src = URL.createObjectURL(songs[currentSongIndex].file);
	// Remove selected-song class from all song items
	for (let i = 0; i < songList.children.length; i++) {
		songList.children[i].classList.remove("selected-song");
	}
	// Add selected-song class to the currently playing song list
	songList.children[currentSongIndex].classList.add("selected-song");
	audioPlayer.play();
	initializeVisualizer();
	playPauseBtn.innerHTML = '<i class="bx bx-pause"></i>';
	bottomPlayerPlayPauseBtn.innerHTML = '<i class="bx bx-pause"></i>';
	updateSongInfo();
	renderNowPlayingPlaylist();
	bottomPlayerUpdateSongInfo();
	setTimeout(() => {
		getSongImage(songs[currentSongIndex].file);
	}, 100);
	musicPlayerSection.style.display = "block";
	songListSection.style.display = "none";
	bottomPlayerSection.style.display = "none";
	nowPlayingSection.style.display = "none";
	playlistsSection.style.display = "none";
}

// Add event listener to the audio player's "ended" event
audioPlayer.addEventListener("ended", () => {
	// Check if repeat mode is enabled
	if (repeatMode === "one") {
		// repeat the same song
		audioPlayer.play();
	} else if (repeatMode === "all") {
		// Play next song
		playNextSong();
	} else {
		playPauseBtn.innerHTML = '<i class="bx bx-play"></i>';
		bottomPlayerPlayPauseBtn.innerHTML = '<i class="bx bx-play"></i>';
	}
});

// Function to play the next song
function playNextSong() {
	// Check if shuffle mode is enabled
	if (shuffleMode) {
		// Play arandom song from playlist
		const randomIndex = Math.floor(Math.random() * songs.length);
		currentSongIndex = randomIndex;
		playCurrentSong(currentSongIndex);
	} else {
		// Play the next song in the playlist
		// Check if there are more songs in the playlist
		if (currentSongIndex < songs.length - 1) {
			currentSongIndex++;
			playCurrentSong(currentSongIndex);
		} else {
			currentSongIndex = 0;
			playCurrentSong(currentSongIndex);
		}
	}
}

// Function to update the song info
function updateSongInfo() {
	const songName = songs[currentSongIndex].name;
	const lastDotIndex = songName.lastIndexOf(".");
	const songTitle = songName.substring(0, lastDotIndex);
	songTitleElement.textContent = songTitle;
	songArtistElement.textContent = "Unknown";
}

// Play/pause button event listener
playPauseBtn.addEventListener("click", () => {
	if (audioPlayer.paused) {
		audioPlayer.play();
		playPauseBtn.innerHTML = '<i class="bx bx-pause"></i>';
		bottomPlayerPlayPauseBtn.innerHTML = '<i class="bx bx-pause"></i>';
		initializeVisualizer();
	} else {
		audioPlayer.pause();
		playPauseBtn.innerHTML = '<i class="bx bx-play"></i>';
		bottomPlayerPlayPauseBtn.innerHTML = '<i class="bx bx-play"></i>';
	}
});

// Previous button event listener
previousButton.addEventListener("click", () => {
	if (shuffleMode) {
		currentSongIndex = Math.floor(Math.random() * songs.length);
	} else {
		currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
	}
	playCurrentSong(currentSongIndex);
});

// Next button event listener
nextButton.addEventListener("click", () => {
	if (shuffleMode) {
		currentSongIndex = Math.floor(Math.random() * songs.length);
	} else {
		currentSongIndex = (currentSongIndex + 1) % songs.length;
	}
	playCurrentSong(currentSongIndex);
});

// Shuffle button event listener
shuffleButton.addEventListener("click", () => {
	if (!shuffleMode) {
		shuffleButton.innerHTML = '<i class="bx bx-shuffle bx-rotate-90"></i>';
		bottomPlayerShuffleButton.innerHTML =
			'<i class="bx bx-shuffle bx-rotate-90"></i>';
	} else {
		shuffleButton.innerHTML = '<i class="bx bx-shuffle"></i>';
		bottomPlayerShuffleButton.innerHTML = '<i class="bx bx-shuffle"></i>';
	}
	shuffleMode = !shuffleMode;
	shuffleButton.classList.toggle("active", shuffleMode);
	bottomPlayerShuffleButton.classList.toggle("active", shuffleMode);
});

// Repeat button event listener
repeatButton.addEventListener("click", () => {
	if (repeatMode === "none") {
		repeatMode = "one";
		repeatButton.innerHTML = '<i class="bx bx-repeat" style="color:blue;"></i>';
		bottomPlayerRepeatButton.innerHTML =
			'<i class="bx bx-repeat" style="color:blue;"></i>';
	} else if (repeatMode === "one") {
		repeatMode = "all";
		repeatButton.innerHTML =
			'<i class="bx bx-repeat"  style="color:green;"></i>';
		bottomPlayerRepeatButton.innerHTML =
			'<i class="bx bx-repeat"  style="color:green;"></i>';
	} else {
		repeatMode = "none";
		repeatButton.innerHTML = '<i class="bx bx-repeat"  style="color:red;"></i>';
		bottomPlayerRepeatButton.innerHTML =
			'<i class="bx bx-repeat"  style="color:red;"></i>';
	}
});

// Bottom player Function to update the song info
function bottomPlayerUpdateSongInfo() {
	const bottomPlayerSongName = songs[currentSongIndex].name;
	const bottomPlayerLastDotIndex = bottomPlayerSongName.lastIndexOf(".");
	const bottomPlayerSongTitle = bottomPlayerSongName.substring(
		0,
		bottomPlayerLastDotIndex
	);
	bottomPlayerSongTitleElement.textContent = bottomPlayerSongTitle;
	bottomPlayerSongArtistElement.textContent = "Unknown";
}

// Bottom player Play/pause button event listener
bottomPlayerPlayPauseBtn.addEventListener("click", () => {
	if (audioPlayer.paused) {
		audioPlayer.play();
		bottomPlayerPlayPauseBtn.innerHTML = '<i class="bx bx-pause"></i>';
		playPauseBtn.innerHTML = '<i class="bx bx-pause"></i>';
		initializeVisualizer();
	} else {
		audioPlayer.pause();
		bottomPlayerPlayPauseBtn.innerHTML = '<i class="bx bx-play"></i>';
		playPauseBtn.innerHTML = '<i class="bx bx-play"></i>';
	}
});

// Bottom player Previous button event listener
bottomPlayerPreviousButton.addEventListener("click", () => {
	if (shuffleMode) {
		currentSongIndex = Math.floor(Math.random() * songs.length);
	} else {
		currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
	}
	playCurrentSong(currentSongIndex);
});

// Bottom player Next button event listener
bottomPlayerNextButton.addEventListener("click", () => {
	if (shuffleMode) {
		currentSongIndex = Math.floor(Math.random() * songs.length);
	} else {
		currentSongIndex = (currentSongIndex + 1) % songs.length;
	}
	playCurrentSong(currentSongIndex);
});

// Bottom player Shuffle button event listener
bottomPlayerShuffleButton.addEventListener("click", () => {
	if (!shuffleMode) {
		bottomPlayerShuffleButton.innerHTML =
			'<i class="bx bx-shuffle bx-rotate-90"></i>';
		shuffleButton.innerHTML = '<i class="bx bx-shuffle bx-rotate-90"></i>';
	} else {
		bottomPlayerShuffleButton.innerHTML = '<i class="bx bx-shuffle"></i>';
		shuffleButton.innerHTML = '<i class="bx bx-shuffle"></i>';
	}
	shuffleMode = !shuffleMode;
	bottomPlayerShuffleButton.classList.toggle("active", shuffleMode);
	shuffleButton.classList.toggle("active", shuffleMode);
});

// Bottom playerRepeat button event listener
bottomPlayerRepeatButton.addEventListener("click", () => {
	if (repeatMode === "none") {
		repeatMode = "one";
		bottomPlayerRepeatButton.innerHTML =
			'<i class="bx bx-repeat" style="color:blue;"></i>';
		repeatButton.innerHTML = '<i class="bx bx-repeat" style="color:blue;"></i>';
	} else if (repeatMode === "one") {
		repeatMode = "all";
		bottomPlayerRepeatButton.innerHTML =
			'<i class="bx bx-repeat"  style="color:green;"></i>';
		repeatButton.innerHTML =
			'<i class="bx bx-repeat"  style="color:green;"></i>';
	} else {
		repeatMode = "none";
		bottomPlayerRepeatButton.innerHTML =
			'<i class="bx bx-repeat"  style="color:red;"></i>';
		repeatButton.innerHTML = '<i class="bx bx-repeat"  style="color:red;"></i>';
	}
});

// Playlist button event listeners
playListButton.addEventListener("click", () => {
	songListSection.style.display = "block";
	musicPlayerSection.style.display = "none";
	bottomPlayerSection.style.display = "block";
});

// Bottom player details event listeners
const bottomPlayerSection = document.getElementById("bottom-player-section");
document.getElementById("details").addEventListener("click", () => {
	musicPlayerSection.style.display = "block";
	songListSection.style.display = "none";
	bottomPlayerSection.style.display = "none";
	nowPlayingSection.style.display = "none";
	playlistsSection.style.display = "none";
	searchContainer.style.display = "none";
});

// Now playlist and playlists event listeners
document.querySelector(".now-playing-list").addEventListener("click", () => {
	nowPlayingSection.style.display = "block";
	musicPlayerSection.style.display = "none";
	songListSection.style.display = "none";
	bottomPlayerSection.style.display = "block";
	searchContainer.style.display = "none";
});
document.querySelector(".playlists").addEventListener("click", () => {
	playlistsSection.style.display = "block";
	musicPlayerSection.style.display = "none";
	songListSection.style.display = "none";
	bottomPlayerSection.style.display = "block";
	searchContainer.style.display = "none";
});

// Audio player event listeners
audioPlayer.addEventListener("loadedmetadata", () => {
	const durationMinutes = Math.floor(audioPlayer.duration / 60);
	const durationSeconds = Math.floor(audioPlayer.duration % 60);
	durationE1.textContent = `${durationMinutes}: ${
		durationSeconds < 10 ? "0" : ""
	}${durationSeconds}`;
});

audioPlayer.addEventListener("timeupdate", () => {
	const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
	const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
	currentTimeE1.textContent = `${currentMinutes}: ${
		currentSeconds < 10 ? "0" : ""
	}${currentSeconds}`;
	seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

// Seek bar event listener
seekBar.addEventListener("input", () => {
	audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});

// Bottom Audio player event listeners
audioPlayer.addEventListener("loadedmetadata", () => {
	const bottomDurationMinutes = Math.floor(audioPlayer.duration / 60);
	const bottomDurationSeconds = Math.floor(audioPlayer.duration % 60);
	bottomPlayerDurationE1.textContent = `${bottomDurationMinutes}: ${
		bottomDurationSeconds < 10 ? "0" : ""
	}${bottomDurationSeconds}`;
});

audioPlayer.addEventListener("timeupdate", () => {
	const bottomCurrentMinutes = Math.floor(audioPlayer.currentTime / 60);
	const bottomCurrentSeconds = Math.floor(audioPlayer.currentTime % 60);
	bottomPlayerCurrentTimeE1.textContent = `${bottomCurrentMinutes}: ${
		bottomCurrentSeconds < 10 ? "0" : ""
	}${bottomCurrentSeconds}`;
	bottomPlayerSeekBar.value =
		(audioPlayer.currentTime / audioPlayer.duration) * 100;
});

//  Bottom player Seek bar event listener
bottomPlayerSeekBar.addEventListener("input", () => {
	audioPlayer.currentTime =
		(bottomPlayerSeekBar.value / 100) * audioPlayer.duration;
});

/**
 * Initializes the visualizer for the audio player.
 */
function initializeVisualizer() {
	// Check if the audio context has already been created
	if (!audioContext) {
		// Create a new audio context
		audioContext = new (window.AudioContext || window.webkitAudioContext)();

		// Create a new analyser node
		analyser = audioContext.createAnalyser();

		// Set the FFT size for the analyser
		analyser.fftSize = 256;

		// Get the frequency bin count for the analyser
		bufferLength = analyser.frequencyBinCount;

		// Create a new Uint8Array to store the frequency data
		dataArray = new Uint8Array(bufferLength);

		// Create a new media element source node
		const source = audioContext.createMediaElementSource(audioPlayer);

		// Connect the source node to the analyser node
		source.connect(analyser);

		// Connect the analyser node to the destination node
		analyser.connect(audioContext.destination);
	}

	// Start drawing the visualizer
	drawVisualizer();
}

/**
 * Draws the visualizer for the audio player.
 */
function drawVisualizer() {
	// Request the next frame to be drawn
	requestAnimationFrame(drawVisualizer);

	// Get the frequency data from the analyser
	analyser.getByteFrequencyData(dataArray);

	// Clear the canvas for the next frame
	canvasContext.clearRect(
		0,
		0,
		visualizerCanvas.width,
		visualizerCanvas.height
	);

	// Calculate the width of each bar
	const barWidth = (visualizerCanvas.width / bufferLength) * 2; // Reduced frequency of bars

	// Initialize variables for drawing the bars
	let barHeight;
	let x = 0;
	const centerY = visualizerCanvas.height / 2; // Center Y position

	// Define the colors for the bars
	const colors = [
		"rgb(7, 7, 7)",
		// "rgb(227, 27, 0)",
		// "rgb(73, 228, 0)",
		// "rgb(2, 182, 173)",
	];

	// Draw each bar
	for (let i = 0; i < bufferLength; i++) {
		// Calculate the height of the bar
		barHeight = dataArray[i] / 2;

		// Set the fill color for the bar
		canvasContext.fillStyle = colors[i % colors.length];
		canvasContext.shadowColor = 'rgb(255, 81, 226)';
		canvasContext.shadowBlur = 8;
		canvasContext.shadowOffsetX = 6;
		canvasContext.shadowOffsetY = -8;
		// canvasContext.fillText('Visualizer', visualizerCanvas.width / 2, 20)

		// Draw the bar with rounded ends
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

		// Move to the next position
		x += barWidth + 1;
	}
}

//   Create an array to store playlist data:
const playlists = [];

//  Create a function to render playlists:
function renderPlaylists() {
	const playlistList = document.getElementById("playlist-list");
	playlistList.innerHTML = "";
	playlists.forEach((playlist) => {
		const playlistElement = document.createElement("li");
		playlistElement.textContent = playlist.name;
		playlistList.appendChild(playlistElement);
	});
}

//  Create a function to create a new playlist:
function createPlaylist() {
	const playlistName = prompt("Enter playlist name:");
	if (playlistName) {
		const newPlaylist = { name: playlistName, songs: [] };
		playlists.push(newPlaylist);
		renderPlaylists();
	}
}

// Create a function to add songs to a playlist:
function addSongToPlaylist(playlistIndex, song) {
	playlists[playlistIndex].songs.push(song);
}

//   Create a function to render the now playing playlist:
function renderNowPlayingPlaylist() {
	const nowPlayingList = document.getElementById("now-playing-list");
	nowPlayingList.innerHTML = "";
	const currentSong = songs[currentSongIndex];
	const nowPlayingElement = document.createElement("li");
	nowPlayingElement.textContent = currentSong.name;
	nowPlayingList.appendChild(nowPlayingElement);
}

//    Add event listeners to the create playlist button and playlist list items:
document
	.getElementById("create-playlist-btn")
	.addEventListener("click", createPlaylist);
document.getElementById("playlist-list").addEventListener("click", (e) => {
	if (e.target.tagName === "LI") {
		const playlistIndex = Array.prototype.indexOf.call(
			e.target.parentNode.children,
			e.target
		);
		// Handle playlist selection
	}
});

// Add the search code here...
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchInput.addEventListener("input", (e) => {
	const searchTerm = e.target.value.toLowerCase();
	if (searchTerm === "") {
		searchResults.innerHTML = "";
	} else {
		const filteredResults = songs.filter((song) => {
			return song.name.toLowerCase().includes(searchTerm);
		});
		renderSearchResults(filteredResults);
	}
});

function renderSearchResults(results) {
	searchResults.innerHTML = "";
	results.forEach((song) => {
		const listItem = document.createElement("li");
		listItem.textContent = song.name;
		listItem.addEventListener("click", () => {
			const mp3Index = songs.indexOf(song);
			playCurrentSong(mp3Index);
			// playNextSong();
		});
		searchResults.appendChild(listItem);
	});
}

const searchContainer = document.querySelector(".search");
document.getElementById("search-icon").addEventListener("click", () => {
	searchContainer.style.display = "block";
	musicPlayerSection.style.display = "none";
	bottomPlayerSection.style.display = "block";
});
