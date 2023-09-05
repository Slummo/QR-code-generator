const express = require("express");
const path = require("path");
const qr = require("qrcode");

const app = express();
const port = 8888;

app.use(express.static(path.join(__dirname, "public")));

app.get("/qr", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.status(400).send("ERROR 404: Missing 'url' parameter!");
    }

    const qrCode = await qr.toDataURL(url);

    res.send(`<img src="${qrCode}" alt="QR Code"/>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("ERROR 500: Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
