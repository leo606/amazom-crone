const express = require("express");
const app = express();

const catRoute = require("./routes/catRoute");
const prodRoute = require("./routes/prodRoute");
const userRoute = require("./routes/userRoute");
const loginRoute = require("./routes/loginRoute");

const PORT = 3000;
app.use(express.json());

app.use("/category", catRoute);
app.use("/product", prodRoute);
app.use("/user", userRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => console.log("listening", PORT));
