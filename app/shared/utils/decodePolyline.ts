// Currently returned result from LocationIQ.com has Geometry
// which contains a polyline string, which encodes an array of coordinates
// needed to draw the traveling line.

// It doesn't return directly a huge array of coordinates as other sites,
// so decoding library is needed.

import polyline from '@mapbox/polyline';

export const decodePolyline = (encodedPolyline: string) => {
    return polyline.decode(encodedPolyline);
};

// Transform [latitude-longitude] to [longitude-latitude], required specifically for locationIQ
export const transformCoordinates = (decodeRoutes: Array<[number, number]>) => {
    return decodeRoutes.map(([latitude, longitude]) => [longitude, latitude]);
};
