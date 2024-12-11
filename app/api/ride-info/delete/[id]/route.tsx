import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    await connectMongoDB();
    await RideInfo.findByIdAndDelete(id);

    return NextResponse.json(
        {
            message: "ride info deleted!"
        },
        {
            status: 200
        }
    );
};
