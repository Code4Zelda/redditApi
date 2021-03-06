// export = {};
const express = require("express");
const path = require("path");
const port = 3001;
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + "/dist"));

// send the user to index html page inspite of the url
//@ts-ignore
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen((port) => {
  console.log(`Running on PORT ${port}`);
});
