
const URLParams = new URLSearchParams(window.location.search);
const url_color = URLParams.get("c");
const url_font = URLParams.get("f");

const timeElement = document.querySelector('#hour');
const secondsElement = document.querySelector('#seconds');
const dateElement = document.querySelector('#date');
const colorPicker = document.querySelector('#color-picker');
const fontPicker = document.querySelector('#font-picker');
const shareButton = document.querySelector('#share-button');

function updateClock() {
    const now = new Date();

    // @ts-ignore
    const currentTime = `${addLeadingZeroes(now.getHours(), 2)}:${addLeadingZeroes(now.getMinutes(), 2)}`;
    // @ts-ignore
    const currentSeconds = `${addLeadingZeroes(now.getSeconds(), 2)}`
    // @ts-ignore
    const currentDate = `${addLeadingZeroes(now.getDate(), 2)} / ${addLeadingZeroes(now.getMonth()+1, 2)} / ${addLeadingZeroes(now.getFullYear(), 4)}`;

    // @ts-ignore
    timeElement.innerText = currentTime;
    // @ts-ignore
    secondsElement.innerText = currentSeconds
    // @ts-ignore
    dateElement.innerText = currentDate;
}

function updateColors(backgroundColor: string) {
    // @ts-ignore
    const rgb = hexToRGB(backgroundColor)
    const isLightColor = ((rgb.r + rgb.g + rgb.b) / 3) > (255 / 2)
    let newColor = `rgb(${255-rgb.r},${255-rgb.g},${255-rgb.b})`

    document.body.style.setProperty("--foreground", newColor);//isLightColor ? 'black' : 'white';
    document.body.style.setProperty("--background", backgroundColor);

    // @ts-ignore
    colorPicker.value = backgroundColor
}

function updateFont(font: string) {
    document.body.style.fontFamily = font
}


// SCRIPT

// @ts-ignore
timeElement.addEventListener('click', _ => { navigator.clipboard.writeText(timeElement.innerText) })
// @ts-ignore
secondsElement.addEventListener('click', _ => { navigator.clipboard.writeText(timeElement.innerText + ':' + secondsElement.innerText)})
// @ts-ignore
dateElement.addEventListener('click', _ => { navigator.clipboard.writeText(dateElement.innerText) })

// @ts-ignore
colorPicker.value = document.body.style.backgroundColor;
// Update background color when a color is picked
colorPicker.addEventListener('change', _ => {
    // @ts-ignore
    updateColors(colorPicker.value)
});

fontPicker.addEventListener('change', _ => {
    // @ts-ignore
    updateFont(fontPicker.value)
})

shareButton.addEventListener('click', _ => {
    const params = new URLSearchParams()
    // @ts-ignore
    params.set('c', colorPicker?.value?.slice(1))
    // @ts-ignore
    params.set('f', fontPicker?.value)
    let url = window.location.href.split('?')[0];
    url = `${url}?${params.toString()}`

    window.navigator.clipboard.writeText(url).then(_ => { alert(`Copied to clipboard (${url})`) })
})

// Initialize
updateColors(url_color ? `#${url_color}` : '#faceaf')
updateFont(url_font || 'sans-serif')

// Update every second
updateClock();
setInterval(updateClock, 1000)