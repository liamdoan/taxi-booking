import { NextResponse } from 'next/server';

const locationIqAccessToken = process.env.NEXT_PUBLIC_LOCATIONIQ_ACCESS_TOKEN;
const BASE_URL_1 = 'https://us1.locationiq.com/v1/directions/driving/';
const BASE_URL_2 = '&steps=true&alternatives=true&geometries=polyline&overview=full&';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const coord1 = searchParams.get('pickup');
    const coord2 = searchParams.get('drop');

    const res = await fetch(BASE_URL_1 + coord1 + ';' + coord2 + '?key=' + locationIqAccessToken + BASE_URL_2, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const travelingData = await res.json();

    return NextResponse.json(travelingData);
}

//FULL_URL=https://us1.locationiq.com/v1/directions/driving/24.92263804,60.1698982;24.8802249,60.1598371?key=pk.412882d0eb191824d09bb2414ee84f6a&steps=true&alternatives=true&geometries=polyline&overview=full&

// Specifically for locationIQ, direction API uses [longitude,latitude] order instead of normal order.
// For example, instead of [60.1698982,24.92263804;60.1598371,24.8802249], you would input
// [24.92263804,60.1698982;24.8802249,60.1598371].
