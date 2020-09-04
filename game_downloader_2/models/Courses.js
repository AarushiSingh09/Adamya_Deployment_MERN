import { Schema, model } from "mongoose";

const Course = Schema({
    courseId: {
        type:String,
        required:true
    },
    imageUrl: {
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    subDescription: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required:true
    },
    gifts: [String]
});

export default model("course", Course);
