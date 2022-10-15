import mongoose from "mongoose";
const { Schema } = mongoose;
const skillSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
});
export default mongoose.model("Skill", skillSchema);



