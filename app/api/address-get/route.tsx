import { NextResponse } from "next/server";

const locationIqAccessToken = process.env.NEXT_PUBLIC_LOCATIONIQ_ACCESS_TOKEN;
const BASE_URL=`https://us1.locationiq.com/v1/reverse?key=${locationIqAccessToken}`;

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const latitude = searchParams.get('lat');
    const longitude = searchParams.get('lon');

    const res = await fetch(BASE_URL + '&lat=' + latitude + '&lon=' + longitude + '&format=json&', {
        headers:{
            "Content-Type": "application/json"
        }
    });

    const addressData = await res.json();

    return NextResponse.json(addressData);
}

//FULL_URL=https://us1.locationiq.com/v1/reverse?key=Your_API_Access_Token&lat=51.50344025&lon=-0.12770820958562096&format=json&