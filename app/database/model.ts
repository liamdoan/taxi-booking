import mongoose from "mongoose";
import { Schema } from "mongoose";

const RideInfoSchema = new Schema(
    {
        pickup: {
            type: String,
            required: true
        },
        drop: {
            type: String,
            required: true
        },
        pickupDay: {
            type: String,
            required: true
        },
        pickupDate: {
            type: String,
            required: true
        },
        pickupTime: {
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
    }, 
    {
        timestamps: true
    }
);

const RideInfo = mongoose.models.RideInfo || mongoose.model('RideInfo', RideInfoSchema);

export default RideInfo;
