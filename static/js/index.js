// deze code werkt niet :( ?
const playButton = document.getElementById('#play-knop');

// Muziek op play
playButton.addEventListener('click', () => {

  console.log('Knop geklikt');

  if (playButton.textContent === 'play_arrow') {
  playButton.textContent = 'pause';
  } else {
    playButton.textContent = 'play_arrow';
  }
});