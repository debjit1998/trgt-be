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

app.post("/validate", async (req, res) => {
  const { url } = req.body;

  try {
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
