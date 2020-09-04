import { Schema, model } from "mongoose";


const IdeaSchema = Schema({
  title: {
    type: String,
    required: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  college: {
    type: String,
    required: true
  },
  challenge: {
    type: String,
    required: false
  },
  user: {
    type: String
  },
  validation: {
    type: String
  },
  journey: {
    type: String
  }
});

/*
 * TODO: Add relevant middleware here to speed up and simplify processes
 * Also look at relevant virtuals!
 */

export default model("idea", IdeaSchema);
