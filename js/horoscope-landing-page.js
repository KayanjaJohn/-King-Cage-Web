document.querySelector(".signs").addEventListener("click", () => {
	window.location.href = "/pages/horoscope.html";
});
document.querySelector(".angels").addEventListener("click", () => {
	window.location.href = "/pages/angelNumb.html";
});
document.querySelector(".gallery").addEventListener("click", () => {
	window.location.href = "/pages/gallery.html";
});

// Light, dark and dim theme
document.querySelector(".enter-btn").addEventListener('click', () => {
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
  