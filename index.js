const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// Configuration
const baseUrl =
  "https://www.cosmos.so/wp-content/themes/cosmos/public/images/sequence/";
const imagePrefix = "manifesto";
const imageExtension = ".jpg";
const imageCount = 300;

// Download directory
const downloadDir = path.resolve(__dirname, "downloads");

// Create download directory if it doesn't exist
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(`Downloading ${imageCount} images...`);

  for (let i = 0; i < imageCount; i++) {
    const imageName = `${imagePrefix}${String(i).padStart(
      3,
      "0"
    )}${imageExtension}`;
    const imageUrl = `${baseUrl}${imageName}`;
    const filePath = path.join(downloadDir, imageName);

    console.log(`Downloading: ${imageUrl}`);

    // Fetch the image data
    const viewSource = await page.goto(imageUrl);

    // Save the image data
    fs.writeFileSync(filePath, await viewSource.buffer());
  }

  console.log("All images downloaded successfully!");
  await browser.close();
})();
