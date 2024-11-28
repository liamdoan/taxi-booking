import React from 'react'
import { Source, Layer } from 'react-map-gl/maplibre';

interface MapRouteProps {
    routeData: Array<[number, number]>
}

const MapTravelingRoutes: React.FC<MapRouteProps> = ({routeData}) => {
    return (
        <Source
            type="geojson"
            data={{
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: routeData
                },
                properties: {},
            }}
        >
            <Layer
                type="line"
                paint={{
                    'line-color': 'blue',
                    'line-width': 4
                }}
                layout={{
                    'line-join': 'round',
                    'line-cap': 'round'
                }}
            />
        </Source>
    )
}

export default MapTravelingRoutes
