import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

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
