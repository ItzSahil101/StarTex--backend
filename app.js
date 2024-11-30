//importing--requring
const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

require("dotenv").config();

//middlewares
const corsOptions = {credentials: true}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//importing or requring routes
const authRoutes = require('./routes/auth');
const userDetRoutes = require('./routes/userDet');
const updateRoutes = require('./routes/update');
const createRoutes = require('./routes/createPost');
const postDataRoutes = require('./routes/getPost');
const userpostRoutes = require('./routes/userpost');

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/userDet", userDetRoutes);
app.use("/api/update", updateRoutes);
app.use("/api/createPost", createRoutes);
app.use("/api/getPosts", postDataRoutes);
app.use("/api/yourpost", userpostRoutes);


//mongoose connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    //start server
    app.listen(process.env.PORT, () => {
      console.log("DB $ Server connected Sucessfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
