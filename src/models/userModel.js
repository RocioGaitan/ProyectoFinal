import mongoose from "mongoose";

const userCollection = "users";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    
    password: {
        type: String,
        require: true
    },
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;