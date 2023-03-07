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

/////////////////////////////
// ICONEN VERANDEREN OP KLIK
/////////////////////////////

/////// VOELEN

// optimistisch
const optimistisch = document.getElementById("optimistisch"); // checkbox
const optimistischImage = document.getElementById("optimistischImage");

if (optimistisch && optimistischImage) {
	optimistisch.addEventListener("change", function () {
		if (this.checked) {
			optimistischImage.src = "./img/voel-optimistisch-select.png";
		} else {
			optimistischImage.src = "./img/voel-optimistisch.png";
		}
	});
}

// energiek
const energiek = document.getElementById("energiek"); // checkbox
const energiekImage = document.getElementById("energiekImage");

if (energiek && energiekImage) {
	energiek.addEventListener("change", function () {
		if (this.checked) {
			energiekImage.src = "./img/voel-energiek-select.png";
		} else {
			energiekImage.src = "./img/voel-energiek.png";
		}
	});
}

// liefdevol
const liefdevol = document.getElementById("liefdevol"); // checkbox
const liefdevolImage = document.getElementById("liefdevolImage");

if (liefdevol && liefdevolImage) {
	liefdevol.addEventListener("change", function () {
		if (this.checked) {
			liefdevolImage.src = "./img/voel-liefdevol-select.png";
		} else {
			liefdevolImage.src = "./img/voel-liefdevol.png";
		}
	});
}

// geïnspireerd
const geinspireerd = document.getElementById("geinspireerd"); // checkbox
const geinspireerdImage = document.getElementById("geinspireerdImage");

if (geinspireerd && geinspireerdImage) {
	geinspireerd.addEventListener("change", function () {
		if (this.checked) {
			geinspireerdImage.src = "./img/voel-geinspireerd-select.png";
		} else {
			geinspireerdImage.src = "./img/voel-geinspireerd.png";
		}
	});
}

// gemotiveerd
const gemotiveerd = document.getElementById("gemotiveerd"); // checkbox
const gemotiveerdImage = document.getElementById("gemotiveerdImage");

if (gemotiveerd && gemotiveerdImage) {
	gemotiveerd.addEventListener("change", function () {
		if (this.checked) {
			gemotiveerdImage.src = "./img/voel-gemotiveerd-select.png";
		} else {
			gemotiveerdImage.src = "./img/voel-gemotiveerd.png";
		}
	});
}

//rustig
const rustig = document.getElementById("rustig"); // checkbox
const rustigImage = document.getElementById("rustigImage");

if (rustig && rustigImage) {
	rustig.addEventListener("change", function () {
		if (this.checked) {
			rustigImage.src = "./img/voel-rustig-select.png";
		} else {
			rustigImage.src = "./img/voel-rustig.png";
		}
	});
}

// neutraal
const neutraal = document.getElementById("neutraal"); // checkbox
const neutraalImage = document.getElementById("neutraalImage");

if (neutraal && neutraalImage) {
	neutraal.addEventListener("change", function () {
		if (this.checked) {
			neutraalImage.src = "./img/voel-neutraal-select.png";
		} else {
			neutraalImage.src = "./img/voel-neutraal.png";
		}
	});
}

// verdrietig
const verdrietig = document.getElementById("verdrietig"); // checkbox
const verdrietigImage = document.getElementById("verdrietigImage");

if (verdrietig && verdrietigImage) {
	verdrietig.addEventListener("change", function () {
		if (this.checked) {
			verdrietigImage.src = "./img/voel-verdrietig-select.png";
		} else {
			verdrietigImage.src = "./img/voel-verdrietig.png";
		}
	});
}

// vermoeid
const vermoeid = document.getElementById("vermoeid"); // checkbox
const vermoeidImage = document.getElementById("vermoeidImage");

if (vermoeid && vermoeidImage) {
	vermoeid.addEventListener("change", function () {
		if (this.checked) {
			vermoeidImage.src = "./img/voel-vermoeid-select.png";
		} else {
			vermoeidImage.src = "./img/voel-vermoeid.png";
		}
	});
}

// gefrustreerd
const gefrustreerd = document.getElementById("gefrustreerd"); // checkbox
const gefrustreerdImage = document.getElementById("gefrustreerdImage");

if (gefrustreerd && gefrustreerdImage) {
	gefrustreerd.addEventListener("change", function () {
		if (this.checked) {
			gefrustreerdImage.src = "./img/voel-gefrustreerd-select.png";
		} else {
			gefrustreerdImage.src = "./img/voel-gefrustreerd.png";
		}
	});
}

// ergerlijk
const ergerlijk = document.getElementById("ergerlijk"); // checkbox
const ergerlijkImage = document.getElementById("ergerlijkImage");

if (ergerlijk && ergerlijkImage) {
	ergerlijk.addEventListener("change", function () {
		if (this.checked) {
			ergerlijkImage.src = "./img/voel-ergerlijk-select.png";
		} else {
			ergerlijkImage.src = "./img/voel-ergerlijk.png";
		}
	});
}

// boos
const boos = document.getElementById("boos"); // checkbox
const boosImage = document.getElementById("boosImage");

if (boos && boosImage) {
	boos.addEventListener("change", function () {
		if (this.checked) {
			boosImage.src = "./img/voel-boos-select.png";
		} else {
			boosImage.src = "./img/voel-boos.png";
		}
	});
}

//////// MUZIEKELEMENT

// beat
const beat = document.getElementById("beat"); // checkbox
const beatImage = document.getElementById("beatImage");

if (beat && beatImage) {
	beat.addEventListener("change", function () {
		if (this.checked) {
			beatImage.src = "./img/element-beat-select.png";
		} else {
			beatImage.src = "./img/element-beat.png";
		}
	});
}

// melodie
const melodie = document.getElementById("melodie"); // checkbox
const melodieImage = document.getElementById("melodieImage");

if (melodie && melodieImage) {
	melodie.addEventListener("change", function () {
		if (this.checked) {
			melodieImage.src = "./img/element-melodie-select.png";
		} else {
			melodieImage.src = "./img/element-melodie.png";
		}
	});
}

// stem artiest
const stemartiest = document.getElementById("vocals"); // checkbox
const stemartiestImage = document.getElementById("stemartiestImage");

if (stemartiest && stemartiestImage) {
	stemartiest.addEventListener("change", function () {
		if (this.checked) {
			stemartiestImage.src = "./img/element-stemartiest-select.png";
		} else {
			stemartiestImage.src = "./img/element-stemartiest.png";
		}
	});
}

// instrumenten
const instrumenten = document.getElementById("instrumenten"); // checkbox
const instrumentenImage = document.getElementById("instrumentenImage");

if (instrumenten && instrumentenImage) {
	instrumenten.addEventListener("change", function () {
		if (this.checked) {
			instrumentenImage.src = "./img/element-instrumenten-select.png";
		} else {
			instrumentenImage.src = "./img/element-instrumenten.png";
		}
	});
}

// backing vocals
const backingvocals = document.getElementById("backingvocals"); // checkbox
const backingvocalsImage = document.getElementById("backingvocalsImage");

if (backingvocals && backingvocalsImage) {
	backingvocals.addEventListener("change", function () {
		if (this.checked) {
			backingvocalsImage.src = "./img/element-backingvocals-select.png";
		} else {
			backingvocalsImage.src = "./img/element-backingvocals.png";
		}
	});
}

// vibe
const vibe = document.getElementById("vibe"); // checkbox
const vibeImage = document.getElementById("vibeImage");

if (vibe && vibeImage) {
	vibe.addEventListener("change", function () {
		if (this.checked) {
			vibeImage.src = "./img/element-vibe-select.png";
		} else {
			vibeImage.src = "./img/element-vibe.png";
		}
	});
}

// TAAL

// nederlands
const nederlands = document.getElementById("nederlands"); // checkbox
const nederlandsImage = document.getElementById("nederlandsImage");

if (nederlands && nederlandsImage) {
	nederlands.addEventListener("change", function () {
		if (this.checked) {
			nederlandsImage.src = "./img/taal-nederlands-select.png";
		} else {
			nederlandsImage.src = "./img/taal-nederlands.png";
		}
	});
}

// engels
const engels = document.getElementById("engels"); // checkbox
const engelsImage = document.getElementById("engelsImage");

if (engels && engelsImage) {
	engels.addEventListener("change", function () {
		if (this.checked) {
			engelsImage.src = "./img/taal-engels-select.png";
		} else {
			engelsImage.src = "./img/taal-engels.png";
		}
	});
}

// koreaans
const koreaans = document.getElementById("koreaans"); // checkbox
const koreaansImage = document.getElementById("koreaansImage");

if (koreaans && koreaansImage) {
	koreaans.addEventListener("change", function () {
		if (this.checked) {
			koreaansImage.src = "./img/taal-koreaans-select.png";
		} else {
			koreaansImage.src = "./img/taal-koreaans.png";
		}
	});
}

// geen voorkeur
const geenvoorkeur = document.getElementById("geenvoorkeur"); // checkbox
const geenvoorkeurImage = document.getElementById("geenvoorkeurImage");

if (geenvoorkeur && geenvoorkeurImage) {
	geenvoorkeur.addEventListener("change", function () {
		if (this.checked) {
			geenvoorkeurImage.src = "./img/taal-geenvoorkeur-select.png";
		} else {
			geenvoorkeurImage.src = "./img/taal-geenvoorkeur.png";
		}
	});
}
