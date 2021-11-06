const express = require("express");
const app = express();

const catRoute = require("./routes/catRoute");
const prodRoute = require("./routes/prodRoute");
const userRoute = require("./routes/userRoute");

const PORT = 3000;
app.use(express.json());

app.use("/category", catRoute);
app.use("/product", prodRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log("listening", PORT));
