// Get the audio element
const audio = new Audio();

// Get the song info elements
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

// Get the control elements
const prevBtn = document.getElementById("prev-btn");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const stopBtn = document.getElementById("stop-btn");
const nextBtn = document.getElementById("next-btn");

// Get the progress bar element
const progressBar = document.getElementById("progress-bar");

// Get the folder input element
const folderInput = document.getElementById("folder-input");

// Define the songs array
const songs = [];

// Define the current song index
let currentSongIndex = 0;

// Add an event listener to the folder input element
folderInput.addEventListener("change", (e) => {
  // Get the selected folder
  const folder = e.target.files[0].path;

  // Load songs from the selected folder
  loadSongsFromFolder(folder);
});

// Define the load songs from the folder function
function loadSongsFromFolder(folder) {
  // Check if the browser supports the File System API
  if (window.requestFileSystem) {
    // Request access to the File System
    window.requestFileSystem(
      window.TEMPORARY,
      1024 * 1024,
      (fs) => {
        // Get the directory entry for the selected folder
        fs.root.getDirectory(
          folder,
          { create: false },
          (dirEntry) => {
            // Read the directory entries
            dirEntry.createReader().readEntries((entries) => {
              // Loop through the directory entries
              for (let i = 0; i < entries.length; i++) {
                // Check if the entry is a file
                if (entries[i].isFile) {
                  // Get the file entry
                  entries[i].file((file) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      const audioUrl = e.target.result;
                      songs.push({
                        title: file.name,
                        artist: "",
                        src: audioUrl,
                      });
                    };
                    reader.readAsDataURL(file);
                  });                
                }
              }
              // Load the first song
              loadSong(songs[0]);
            });
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  } else {
    console.log("The browser does not support the File System API.");
  }
}

// Define the load song function
function loadSong(song) {
  audio.src = song.src;
  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;
}

// Define the play function
function play() {
  audio.play();
  playBtn.disabled = true;
  pauseBtn.disabled = false;
}

// Define the pause function
function pause() {
  audio.pause();
  playBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Define the stop function
function stop() {
  audio.pause();
  audio.currentTime = 0;
  playBtn.disabled = false;
  pauseBtn.disabled = true;
}

// Define the previous song function
function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(songs[currentSongIndex]);
  play();
}

// Define the next song function
function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  loadSong(songs[currentSongIndex]);
  play();
}

// Define the update progress bar function
function updateProgressBar() {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
}

// Add event listeners to the control elements
prevBtn.addEventListener("click", prevSong);
playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);
stopBtn.addEventListener("click", stop);
nextBtn.addEventListener("click", nextSong);

// Update the progress bar every second
setInterval(updateProgressBar, 1000);

// Add event listener to the audio element to update the progress bar when the song ends
audio.addEventListener("ended", nextSong);
