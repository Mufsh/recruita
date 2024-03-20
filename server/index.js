const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes/routes");

const app = express();
dotenv.config();

PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
