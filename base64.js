import fs from "fs";

const encodeImageToBase64 = (filePath) => {
  return fs.readFileSync(filePath, "base64");
};

const decodeBase64ToImage = (base64String, outputPath) => {
  const buffer = Buffer.from(base64String, "base64");
  fs.writeFileSync(outputPath, buffer);
};

export { encodeImageToBase64, decodeBase64ToImage };

