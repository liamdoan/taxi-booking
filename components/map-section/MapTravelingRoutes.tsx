import React from 'react'
import { Source, Layer } from 'react-map-gl/maplibre';

interface MapRouteProps {
    routeCoordinates: Array<[number, number]>
}

const MapTravelingRoutes: React.FC<MapRouteProps> = ({routeCoordinates}) => {
    return (
        <>
            {routeCoordinates.map((route, index) => (
                <Source
                    key={index}
                    type="geojson"
                    data={{
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: route
                        },
                        properties: {},
                    }}
                >
                    <Layer
                        type="line"
                        paint={{
                            'line-color': index === 0 ? '#218cf8' : '#32cd32',
                            'line-width': 4
                        }}
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round'
                        }}
                    />
                </Source>
            ))}
        </>
    )
}

export default MapTravelingRoutes
