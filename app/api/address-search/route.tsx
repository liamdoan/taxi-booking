import { NextResponse } from 'next/server';

const locationIqAccessToken = process.env.NEXT_PUBLIC_LOCATIONIQ_ACCESS_TOKEN;
const BASE_URL = `https://api.locationiq.com/v1/autocomplete?key=${locationIqAccessToken}`;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('q');

    const res = await fetch(BASE_URL + '&q=' + searchText + '&limit=5&dedupe=1', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const searchResult = await res.json();

    return NextResponse.json(searchResult);
}

// FULL_URL="https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${address}&limit=5&dedupe=1"
