import mongoose from "mongoose";
const { Schema } = mongoose;
const roleSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
});
export default mongoose.model("Role", roleSchema);