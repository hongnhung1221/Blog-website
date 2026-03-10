const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const keys = require("./config/keys");
require("./servises/passport"); 

const app = express();
const Port = keys.PORT || 5002;

const userRoutes = require("./routes/user.js");
const uploadRoutes = require("./routes/upload.js");
const postRoutes = require("./routes/post.js");

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [keys.BACKEND_URL, keys.FRONTEND_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose.set("strictQuery", false);
mongoose.connect(keys.MONGO_URI);

const store = new MongoDBStore({
  uri: keys.MONGO_URI,
  collection: "mySessions",
});

store.on("error", function (error) {
  console.log("Lỗi Store MongoDB:", error);
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: keys.COOKIE_KEY,
    resave: false,
    saveUninitialized: false, 
    store: store, 
    proxy: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      sameSite: "none", 
      secure: true, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use("/", userRoutes);
app.use("/", uploadRoutes);
app.use("/", postRoutes);

app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});