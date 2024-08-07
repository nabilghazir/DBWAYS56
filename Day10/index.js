const express = require("express");
const app = express();

const port = 3002;

app.get("/", home);

function home(req, res) {}
