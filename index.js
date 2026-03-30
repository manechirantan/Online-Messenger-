import express from "express";
const app = express();
let port = 3000;
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
import mongoose from "mongoose";
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log("connected to database easily lale");
});
