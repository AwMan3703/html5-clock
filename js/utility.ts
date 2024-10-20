function hexToRGB(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return { r: r, g: g, b: b, mainColor: Math.max(r, g, b) === r ? 'r' : Math.max(r, g, b) === g ? 'g' : 'b' }
}

function addLeadingZeroes(value: string | number, target_size: number): string {
    // @ts-ignore
    return value.toString().padStart(target_size, '0');
}