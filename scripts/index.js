const camelCase = require('camelcase');

camelCase.preserveCamelCase();

const checkbox = document.querySelector(input[type="checkbox"]);
const gevoelLink = document.querySelector('body > section:last-of-type > a:last-of-type');

gevoelLink.addEventListener("click", function(event) {
    if (!checkbox.checked) {
        event.preventDefault();
    }
})