import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextResponse } from "next/server";

export async function PUT(
    request: any,
    {params}: {params: {
        id: string
    }}
) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extract ID from the URL

    await connectMongoDB();

    try {
        const ride = await RideInfo.findById(id);

        if (!ride) {
            return NextResponse.json({
                message: "No ride found."
            }, {
                status: 404
            });
        };

        if(!ride.isRideReceived) {
            return NextResponse.json({
                message: "Ride must be received before finished!"
            }, {
                status: 400
            })
        };

        const updatedRideFinished = await RideInfo.findByIdAndUpdate(
            id,
            [
                {
                    $set: {
                        isRideFinished: { $not: "$isRideFinished" }
                    }
                }
            ], {
                new: true // update updatedAt
            }
        );

        const message = updatedRideFinished.isRideFinished ? "Ride finished!" : "Ride not finished."

        return NextResponse.json({
            message: message,
            updatedRideFinished
        }, {
            status: 200
        })
    } catch (error) {
        console.error(error);
    }
};
