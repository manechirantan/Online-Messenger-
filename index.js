import express from "express";
const app = express();
let port = 3000;
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.get("/favicon.ico", (req, res) => res.status(204));
import mongoose from "mongoose";
import methodoverride from "method-override";
app.use(methodoverride("_method"));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
import Chat from "./models/chat.js";
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/", async (req, res) => {
  let { form, msg, to } = req.body;
  let newChat = new Chat({
    from: form,
    msg: msg,
    to: to,
    createdAt: new Date(),
  });
  try {
    let chati = await newChat.save();
    console.log(chati);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  let user = await Chat.findOne({ _id: id });
  res.render("chat.ejs", { user });
});

app.put("/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: msg } = req.body;
  let date = new Date();
  let chat = await Chat.findByIdAndUpdate(
    id,
    { msg: msg, updated: date },
    { runValidators: true },
    { new: true },
  );
  chat.save().then((res) => {
    console.log(res);
  });
  res.redirect("/");
});

app.delete("/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect('/')
});

app.listen(port, () => {
  console.log("connected to server easily");
});
