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
                        isRideReceived: { $not: "$isRideReceived" },
                        isRideFinished: { $cond: [{$eq: ['$isRideReceived', true]}, '$isRideFinished', false]}
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

// { $cond: [ <condition>, <value_if_true>, <value_if_false> ] }
// { $eq: [<value1>, <value2>] } = equality check of value1 and value2
