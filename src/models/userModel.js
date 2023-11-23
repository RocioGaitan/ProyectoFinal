import mongoose from "mongoose";
import { createHash } from "../utils/cryptoUtil.js";
const userCollection = "users";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        default: 'user'
    },
});

userSchema.pre('save', function() {
    console.log(this.password);
   this.password = createHash(this.password);
});

export const userModel = mongoose.model(userCollection, userSchema);
