'use client';

import React from 'react';
import Map from 'react-map-gl/maplibre';

const mapTilerApiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const MapLibre = () => {

    
      return (
        <div className='p-5'>
            <p>Map</p>
            <div className='overflow-hidden'>
                <Map
                    initialViewState={{
                        longitude: 24.940700,
                        latitude: 60.170386,
                        zoom: 12
                    }}
                    style={{width: '100%', height: 600}}
                    mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerApiKey}`}
                />
            </div>
        </div>
    );
};
  

export default MapLibre
