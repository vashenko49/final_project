const express = require("express");
const connectDB = require("./common/db");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const getConfig = require("./config/GetConfig");
const cors = require("cors");
const formData = require("express-form-data");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

//connect data base
getConfig("configs-v1")
  .then(() => {
    // connectDB();
    connectDB(process.env.urlDataBase);
    app.use(passport.initialize());
    require("./config/passport")(passport);
    cloudinary.config({
      cloud_name: process.env.cloudinary_cloud_name,
      api_key: process.env.cloudinary_apikey,
      api_secret: process.env.cloudinary_apiSecret
    });
  })
  .catch(err => {
    console.error(err);
  });

app.use(formData.parse());
app.use(bodyParser.json());

// Use Routes
app.use("/api/customers", require("./routes/customers"));
app.use("/api/configs", require("./routes/configs"));
app.use("/api/filters", require("./routes/filters"));
app.use("/api/catalog", require("./routes/catalog"));
app.use("/api/products", require("./routes/products"));
app.use("/api/subscriber", require("./routes/subscribers"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/links", require("./routes/links"));
app.use("/api/shippingmethods", require("./routes/shippingMethod"));
app.use("/api/paymentmethods", require("./routes/paymentMethods"));
app.use("/api/deliveryaddresses", require("./routes/deliveryAddresses"));
app.use("/api/slider", require("./routes/slides"));
app.use("/api/partners", require("./routes/partner"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/favourites", require("./routes/favourites"));

app.use(express.static("../client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (!process.env.NODE_ENV) {
    console.log(`Server start on ${PORT}`);
  }
});
