const express = require("express");
const app = express();

const catRoute = require("./routes/catRoute");

const PORT = 3000;
app.use(express.json());

app.use("/category", catRoute);

app.listen(PORT, () => console.log("listening", PORT));
