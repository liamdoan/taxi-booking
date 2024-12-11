import RideInfo from "@/app/database/model";
import connectMongoDB from "@/app/database/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    if (!id) {
        return NextResponse.json(
            { message: "ID parameter is missing" },
            { status: 400 }
        );
    }

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
