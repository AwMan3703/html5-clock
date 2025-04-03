function hexToRGB(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return { r: r, g: g, b: b, mainColor: Math.max(r, g, b) === r ? 'r' : Math.max(r, g, b) === g ? 'g' : 'b' };
}
function addLeadingZeroes(value, target_size) {
    // @ts-ignore
    return value.toString().padStart(target_size, '0');
}
