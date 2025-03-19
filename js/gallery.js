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
  
  
  
  
  