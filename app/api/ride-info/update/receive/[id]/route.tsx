import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: { params: { id: string } }) {
        const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    
    await connectMongoDB();

    try {
        const updatedRideReceived = await RideInfo.findByIdAndUpdate(
            id,
            [
                { 
                    $set: { 
                        isRideReceived: { $not: "$isRideReceived" },
                        // isRideFinished: { $cond: {if:{ "$eq": ['$isRideReceived', true] }, then: '$isRideReceived', else: false} } // in question
                    },
                }
            ],
            { new: true } // update updatedAt
        );
        console.log(updatedRideReceived.isRideFinished)

        if(!updatedRideReceived) {
            return NextResponse.json({
                message: "no ride found"
            }, {
                status: 404
            })
        };

        // if isRideReceived = false, isRideFinished will always be false regardless its current state
        if (!updatedRideReceived.isRideReceived) {
            await RideInfo.findByIdAndUpdate(
                id,
                { $set: { isRideFinished: false } },
                { new: true }
            );
        }

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
