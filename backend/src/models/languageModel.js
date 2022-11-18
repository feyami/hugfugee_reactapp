import mongoose from "mongoose";
const { Schema } = mongoose;

const languageSchema = new Schema({
    title: {
        type: String,
    },
    code: {
        type: String,
    },
    flag: {
        type: String,
    },
});
export default mongoose.model("Language", languageSchema);



