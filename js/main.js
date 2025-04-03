// CONSTANTS
var URLParams = new URLSearchParams(window.location.search);
var url_color = URLParams.get("c");
var url_font = URLParams.get("f");
var timeElement = document.querySelector('#hour');
var secondsElement = document.querySelector('#seconds');
var dateElement = document.querySelector('#date');
var colorPicker = document.querySelector('#color-picker');
var fontPicker = document.querySelector('#font-picker');
var shareButton = document.querySelector('#share-button');
// FUNCTIONS
function updateClock() {
    var now = new Date();
    // @ts-ignore
    var currentTime = "".concat(addLeadingZeroes(now.getHours(), 2), ":").concat(addLeadingZeroes(now.getMinutes(), 2));
    // @ts-ignore
    var currentSeconds = "".concat(addLeadingZeroes(now.getSeconds(), 2));
    // @ts-ignore
    var currentDate = "".concat(addLeadingZeroes(now.getDate(), 2), " / ").concat(addLeadingZeroes(now.getMonth() + 1, 2), " / ").concat(addLeadingZeroes(now.getFullYear(), 4));
    // @ts-ignore
    timeElement.innerText = currentTime;
    // @ts-ignore
    secondsElement.innerText = currentSeconds;
    // @ts-ignore
    dateElement.innerText = currentDate;
}
function updateColors(backgroundColor) {
    // @ts-ignore
    var rgb = hexToRGB(backgroundColor);
    var isLightColor = ((rgb.r + rgb.g + rgb.b) / 3) > (255 / 2);
    var newColor = "rgb(".concat(255 - rgb.r, ",").concat(255 - rgb.g, ",").concat(255 - rgb.b, ")");
    document.body.style.setProperty("--foreground", newColor); //isLightColor ? 'black' : 'white';
    document.body.style.setProperty("--background", backgroundColor);
    // @ts-ignore
    colorPicker.value = backgroundColor;
}
function updateFont(font) {
    document.body.style.fontFamily = font;
}
// SCRIPT
// @ts-ignore
timeElement.addEventListener('click', function (_) { navigator.clipboard.writeText(timeElement.innerText); });
// @ts-ignore
secondsElement.addEventListener('click', function (_) { navigator.clipboard.writeText(timeElement.innerText + ':' + secondsElement.innerText); });
// @ts-ignore
dateElement.addEventListener('click', function (_) { navigator.clipboard.writeText(dateElement.innerText); });
// @ts-ignore
colorPicker.value = document.body.style.backgroundColor;
// Update background color when a color is picked
colorPicker.addEventListener('change', function (_) {
    // @ts-ignore
    updateColors(colorPicker.value);
});
fontPicker.addEventListener('change', function (_) {
    // @ts-ignore
    updateFont(fontPicker.value);
});
shareButton.addEventListener('click', function (_) {
    var _a;
    var params = new URLSearchParams();
    // @ts-ignore
    params.set('c', (_a = colorPicker === null || colorPicker === void 0 ? void 0 : colorPicker.value) === null || _a === void 0 ? void 0 : _a.slice(1));
    // @ts-ignore
    params.set('f', fontPicker === null || fontPicker === void 0 ? void 0 : fontPicker.value);
    var url = window.location.href.split('?')[0];
    url = "".concat(url, "?").concat(params.toString());
    window.navigator.clipboard.writeText(url).then(function (_) { alert("Copied to clipboard (".concat(url, ")")); });
});
// Initialize
updateColors(url_color ? "#".concat(url_color) : '#faceaf');
updateFont(url_font || 'sans-serif');
// Update every second
updateClock();
setInterval(updateClock, 1000);
