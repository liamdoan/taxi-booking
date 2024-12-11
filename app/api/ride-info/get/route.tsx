import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    await connectMongoDB();

    const allRideInfo = await RideInfo.find();
    return NextResponse.json(allRideInfo);
};
