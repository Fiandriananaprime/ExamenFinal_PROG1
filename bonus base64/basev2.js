const fs = require("fs");

const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function encodeImageToBase64(imagePath) {
    const bytes = fs.readFileSync(imagePath);
    let result = "";

    for (let i = 0; i < bytes.length; i += 3) {
        const b1 = bytes[i];
        const b2 = bytes[i + 1] ?? 0;
        const b3 = bytes[i + 2] ?? 0;

        const index1 = (b1 >> 2);
        const index2 = ((b1 & 0b11) << 4) | (b2 >> 4);
        const index3 = ((b2 & 0b1111) << 2) | (b3 >> 6);
        const index4 = (b3 & 0b111111);

        result += BASE64_CHARS[index1];
        result += BASE64_CHARS[index2];
        result += (bytes[i + 1] !== undefined) ? BASE64_CHARS[index3] : "=";
        result += (bytes[i + 2] !== undefined) ? BASE64_CHARS[index4] : "=";
    }

    return result;
}

function decodeBase64ToImage(base64String, outputPath) {
    const bytes = [];

    for (let i = 0; i < base64String.length; i += 4) {
        const i1 = BASE64_CHARS.indexOf(base64String[i]);
        const i2 = BASE64_CHARS.indexOf(base64String[i + 1]);
        const i3 = BASE64_CHARS.indexOf(base64String[i + 2]);
        const i4 = BASE64_CHARS.indexOf(base64String[i + 3]);

        const b1 = (i1 << 2) | (i2 >> 4);
        const b2 = ((i2 & 0b1111) << 4) | (i3 >> 2);
        const b3 = ((i3 & 0b11) << 6) | i4;

        bytes.push(b1);
        if (base64String[i + 2] !== "=") bytes.push(b2);
        if (base64String[i + 3] !== "=") bytes.push(b3);
    }

    fs.writeFileSync(outputPath, Buffer.from(bytes));
    console.log(`Image sauvegardée : ${outputPath}`);
}

const base64 = encodeImageToBase64("blackhole.png");
console.log(base64);
decodeBase64ToImage(base64, "blackhole_reconstruite1.png");