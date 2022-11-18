import mongoose from "mongoose";
const { Schema } = mongoose;
const videoConnectionSchema = new Schema({
    refConnectionId: {
        type: String,
        required: true,
    },
    refConnectionName: {
        type: String
    },
    valConnectionId: {
        type: String,
         
    },
    valConnectionName: {
        type: String,
    },
    valId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    languageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
export default mongoose.model("VideoConnection", videoConnectionSchema);




