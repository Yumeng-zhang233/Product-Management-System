const mongoose = require("mongoose");
const connectionStr =
  "mongodb+srv://Julie:yunxieyi007@cluster0.no92vop.mongodb.net/?retryWrites=true&w=majority";
const connectToMongoose = () => {
  mongoose.connect(connectionStr);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console), "connection error");
  db.on("open", () => {
    console.log("connect to mongodb");
  });
};

module.exports = connectToMongoose;
