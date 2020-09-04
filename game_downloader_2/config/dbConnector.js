import { connect } from "mongoose";
const config = require("config");
import { ErrorCode } from "../utils/consts";
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("DB Success");
  } catch (err) {
    console.error(err.message);
    //exiting with error (codes in utils/errorCodes)
    process.exit(ErrorCode.DB_CONN_ERR);
  }
};

export default connectDB;
