const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hi from TRGT Assignment Backend");
});

app.post("/validate", async (req, res) => {
  let { url } = req.body;

  if (!url) return res.json({ valid: false });

  try {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `http://${url}`;
    }

    const response = await axios.get(url);
    if (String(response.status).startsWith("2")) {
      res.json({ valid: true });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.json({ valid: false });
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
