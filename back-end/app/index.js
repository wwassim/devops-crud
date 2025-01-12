const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const Users = require("./models/users");

const app = express();

app.use(cors());
app.use(express.json());
// GET ALL USERS
app.get("/users", async (req, res) => {
  try {
    const allUsers = await Users.find({});
    if (allUsers) {
      return res.status(200).json(allUsers);
    }
    return res.status(400).json("no data find it !!!");
  } catch (error) {
    console.error("error", error.message);
  }
});

// GET USER DETAIL
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const getUser = await Users.findById(id).select("-lastName").exec();
    if (getUser) {
      return res.status(200).json(getUser);
    }

    return res.status(400).json("no data find it !!!");
  } catch (error) {
    console.error("error", error.message);
  }
});
// CREATE USER
app.post("/users", async (req, res) => {
  console.log("test->>>>>>>>>>>>>>>>>>>wahed");
  try {
    const { email, name, lastName } = req.body;
    const findUserEmail = await Users.findOne({ email: email });
    if (findUserEmail) {
      return res.status(400).json("this email is already used !!!");
    }
    const user = new Users({ email: email, name: name, lastName: lastName });
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error("error", error.message);
  }
});

// UPDATE USER
app.put("/users/:id", async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.name ||
      !req.body.lastName ||
      !req.params.id
    ) {
      return res.status(400).json("check your data please !!!");
    }
    const findUser = await Users.findById(req.params.id);

    if (!findUser) {
      return res.status(400).json("no data fond it !!!");
    }

    const updateUser = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      {
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
      },
      { new: true }
    );
    await findUser.save();
    return res.status(200).json(updateUser);
  } catch (error) {
    console.error("error", error.message);
  }
});
// DELETE USER
app.delete("/users/:id", async (req, res) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(400).json("no data fond it !!!");
    }
    return res.status(200).json("data is deleted");
  } catch (error) {
    console.error("error", error.message);
  }
});

mongoose
  .connect(
    `mongodb+srv://wassim:0000@nodeexpress.mr7l440.mongodb.net/cruddevops?retryWrites=true&w=majority&appName=nodeexpress`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log(" Mongoose is connected"))
  .catch((err) => console.log(err.mesage));
app.listen(5000, () => {
  console.log("server run on port 5000");
});
