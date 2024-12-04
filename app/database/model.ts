import mongoose from "mongoose";
import { Schema } from "mongoose";

const DriveInfoSchema = new Schema({
    pickup: {
        type: String,
        required: true
    },
    drop: {
        type: String,
        required: true
    },
    isRideReceived: {
        type: Boolean,
        default: false
    },
    isRideFinished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const DriveInfo = mongoose.models.DriveInfo || mongoose.model('DriveInfo', DriveInfoSchema);

export default DriveInfo;
