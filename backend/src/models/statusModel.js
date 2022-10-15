import mongoose from "mongoose";
const { Schema } = mongoose;
const statusSchema = new Schema({
    title: {
        type: String,
    },
});
export default mongoose.model("Status", statusSchema);
