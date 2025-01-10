const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://falfoulsabrine1:0000@formation.eihfp.mongodb.net/crud?retryWrites=true&w=majority&appName=Formation`
    );
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
