import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const RideInfoSchema = new Schema(
    {
        guestName: {
            type: String,
            required: true,
        },
        guestAmount: {
            type: String,
            required: true,
        },
        pickup: {
            type: String,
            required: true,
        },
        drop: {
            type: String,
            required: true,
        },
        pickupDay: {
            type: String,
            required: true,
        },
        pickupDate: {
            type: String,
            required: true,
        },
        pickupTime: {
            type: String,
            required: true,
        },
        distance: {
            type: String,
        },
        estimatedTime: {
            type: String,
        },
        preferredCar: {
            type: String,
        },
        isRideReceived: {
            type: Boolean,
            default: false,
        },
        isRideFinished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const RideInfo = mongoose.models.RideInfo || mongoose.model('RideInfo', RideInfoSchema);

export default RideInfo;
