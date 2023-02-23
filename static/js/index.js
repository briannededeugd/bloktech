// const express = require('express');
console.log("Hello World")

const nextButton = document.getElementById('next-button-v');
const formulier = document.getElementById('form-v');

const nextButtonM = document.getElementById('next-button-m');
const formulierM = document.getElementById('form-m');

const nextButtonT = document.getElementById('next-button-t');
const formulierT = document.getElementById('form-t');

nextButton.addEventListener('click', () => {
    formulier.submit();
})

nextButtonM.addEventListener('click', () => {
    formulierM.submit();
})

nextButtonT.addEventListener('click', () => {
    formulierT.submit();
})






// Gebruiker kan alleen door als er tenminste één checkbox geselecteerd is + DIT WERKT NOG NIET
const checkboxes = document.querySelectorAll('input[type=checkbox]');

function updateNextLink() {
  let isChecked = false;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      isChecked = true;
    }
  });
  if (isChecked) {
    nextButton.removeAttribute('disabled');
    nextButtonM.removeAttribute('disabled');
    nextButtonT.removeAttribute('disabled');
  } else {
    nextButton.setAttribute('disabled', true);
    nextButtonM.setAttribute('disabled', true);
    nextButtonT.setAttribute('disabled', true);
  }
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', updateNextLink);
});

updateNextLink();





// deze code werkt niet :( ?
const playButton = document.querySelector('body > section > section:nth-of-type(4)');

// Muziek op play
playButton.addEventListener('click', () => {

  console.log('Knop geklikt');

  if (playButton.textContent === 'play_arrow') {
  playButton.textContent = 'pause';
  } else {
    playButton.textContent = 'play_arrow';
  }
});