import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { guestName, guestAmount, pickup, drop, pickupDay, pickupDate, pickupTime, distance, estimatedTime, preferredCar } = await request.json();

    await connectMongoDB();
    await RideInfo.create({guestName, guestAmount, pickup, drop, pickupDay, pickupDate, pickupTime, distance, estimatedTime, preferredCar});

    return NextResponse.json(
        {
            message: "drive info sent",
            info: {
                guestName: guestName,
                guestAmount: guestAmount,
                pickup: pickup,
                drop: drop,
                pickupDay: pickupDay,
                pickupDate: pickupDate,
                pickupTime: pickupTime,
                distance: distance,
                estimatedTime: estimatedTime,
                preferredCar: preferredCar
            }
        }, {
            status: 201
        }
    )
};
