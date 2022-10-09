const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Port = process.env.PORT || 9000;
const app = express();

app.use(morgan("dev"));

app.get("/", (_, res) => {
    res.send("Backend test");
  });

app.listen(Port, () => console.log("Server listening on PORT", Port));