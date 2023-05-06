const mongoose = require("mongoose");

const connectWithDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  // mongoose.set("strictQuery", false);
  // mongoose
  //   .connect(process.env.DATABASE_URL, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   })
  //   .then(console.log(`DB connected successfully`))
  //   .catch((err) => {
  //     console.log(`DB connection failed`);
  //     console.log(err);
  //     process.exit(1);
  //   });
};

module.exports = connectWithDB;
