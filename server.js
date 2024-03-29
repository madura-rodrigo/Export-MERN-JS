const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ limit: "50mb", extended: true }));

app.get("/", (req, res) => res.send("API running."));

app.use("/api/auth", require("./routes/api/auth"));

app.use("/api/profile", require("./routes/api/user/index"));

//app.use("/api/profile/seller", require("./routes/api/seller"));

app.use("/api/category", require("./routes/api/category"));

app.use("/api/products", require("./routes/api/product"));

app.use("/api/product-stocks", require("./routes/api/productStock"));

app.use("/static", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.listen(PORT, (err) => {
//     if (err) {
//       console.log(err);
//       process.exit(1);
//     }
//     fs.readdirSync(path.join(__dirname, "routes/api")).map((file) => {
//       require("./routes/api" + file)(app);
//     });
//     console.log(`Server started on port ${PORT}`);
//   });
