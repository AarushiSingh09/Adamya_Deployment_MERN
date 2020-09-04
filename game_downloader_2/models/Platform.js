import { Schema, model } from "mongoose";

const Platform = Schema({
    authDomains: [{
        type: String,
        required: true
    }]
});

/*
 * TODO: Add relevant middleware here to speed up and simplify processes
 * Also look at relevant virtuals!
 */

export default model("platform", Platform);
