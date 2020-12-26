const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    mongoose.set("debug", function (coll, method, query, doc, options) {
      let set = {
        coll: coll,
        method: method,
        query: query,
        doc: doc,
        options: options,
      };

      console.log({
        dbQuery: set,
      });
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
