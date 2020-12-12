import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();

import postRoutes from "./routes/posts.js";
const app = express();

app.use("/posts", postRoutes); //every route inside of the postRoutes is gonna start with /posts

app.use(bodyParser.json({ limit: "30mb", extended: true })); //limit 30mb because the images sizes
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbftd.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
