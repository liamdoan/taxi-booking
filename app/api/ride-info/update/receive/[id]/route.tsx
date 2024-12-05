import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: { params: { id: string } }) {
    const id = params.id;
    
    await connectMongoDB();

    try {
        const updatedRideReceived = await RideInfo.findByIdAndUpdate(
            id,
            [
                { 
                    $set: { 
                        isRideReceived: { $not: "$isRideReceived" } 
                    } 
                }
            ],
            { new: true } // update updatedAt
        );

        if(!updatedRideReceived) {
            return NextResponse.json({
                message: "no ride found"
            }, {
                status: 404
            })
        };

        const message = updatedRideReceived.isRideReceived ? 'Ride received!' : 'Ride not received';
    
        return NextResponse.json(
            {
                message: message,
                updatedRideReceived
            }, {
                status: 200
            }
        )
    } catch (error) {
        console.error(error)
    }
};
