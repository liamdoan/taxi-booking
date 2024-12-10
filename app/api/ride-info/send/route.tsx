import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const { pickup, drop, pickupDay, pickupDate, pickupTime } = await request.json();

    await connectMongoDB();
    await RideInfo.create({pickup, drop, pickupDay, pickupDate, pickupTime});

    return NextResponse.json(
        {
            message: "drive info sent",
            info: {
                pickup: pickup,
                drop: drop,
                pickupDay: pickupDay,
                pickupDate: pickupDate,
                pickupTime: pickupTime
            }
        }, {
            status: 201
        }
    )
};
