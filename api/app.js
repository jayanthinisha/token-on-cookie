// App Entry File
// Packages Imported
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const bodyParser = require("body-parser");
// /Packages Imported

// Files Imported
const env = require("./environments/environment");
const userRoutes = require("./routes/userRoutes");
// /Files Imported

const app = express();
app.use(cookieParser())
const corsOptions = {
    credentials: true, 
    origin: 'http://localhost:4200'
  }
app.use(cors(corsOptions));
// support parsing of application/json type post data
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => res.send("Welcome"));
app.use("/user", userRoutes);
// /Routes

const port = process.env.PORT || env.port;

app.listen(port, () => console.log(`Api listening on Port ${port}`));
