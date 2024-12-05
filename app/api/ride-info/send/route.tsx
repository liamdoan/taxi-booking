import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const { pickup, drop } = await request.json();

    await connectMongoDB();
    await RideInfo.create({pickup, drop});

    return NextResponse.json(
        {
            message: "drive info sent",
            info: {
                pickup: pickup,
                drop: drop
            }
        }, {
            status: 201
        }
    )
};
