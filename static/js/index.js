// Play knop wordt pauzeknop als erop wordt geklikt
const playButton = document.getElementById("play-knop");

if (playButton) {
	// Er wordt eerst gekeken of er een playknop bestaat op de pagina, zodat er geen error komt
	playButton.addEventListener("click", () => {
		console.log("Knop geklikt");

		if (playButton.textContent === "play_arrow") {
			playButton.textContent = "pause";
		} else {
			playButton.textContent = "play_arrow";
		}
	});
}
