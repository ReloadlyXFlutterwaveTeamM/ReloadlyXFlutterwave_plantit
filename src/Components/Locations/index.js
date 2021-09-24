import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

const LOCATIONS = [
  { name: 'Kaduna', trees: 20, date: '20/02/2021', coordinates: [7.4165, 10.5105] },
  { name: 'Kano', trees: 15, date: '19/03/2019', coordinates: [8.592, 12.0022] },
  { name: 'Zaria', trees: 3, date: '20/02/2021', coordinates: [7.7199, 11.0855] },
  { name: 'Sokoto', trees: 10, date: '20/02/2020', coordinates: [5.2476, 13.0059] },
  { name: 'Lagos', trees: 26, date: '4/07/2020', coordinates: [3.406448, 6.465422] },
];

const Locations = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lat, setLat] = useState(9.082);
  const [lng, setLng] = useState(8.6753);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 9,
    });
  });

  const onLocationClick = (coords) => {
    const [longitude, latitude] = coords;

    if (!map.current) return; // wait for map to initialize

    setLat(latitude);
    setLng(longitude);

    new mapboxgl.Marker({ color: '#4aae8c' }).setLngLat([longitude, latitude]).addTo(map.current);
    map.current.flyTo({
      center: [longitude, latitude],
      essential: true,
    });
  };

  return (
    <div className='container h-100'>
      <div className='d-flex flex-column align-items-center justify-content-center position-relative h-100'>
        <div ref={mapContainer} className='map-container position-relative'>
          <div
            className='d-flex flex-column p-2 p-md-4 ms-1 ms-md-2 mt-1 mt-md-2 border rounded rounder-3 bg-white position-absolute top-0 start-0'
            style={{ zIndex: 100 }}
          >
            <div className='fw-bold text-center'>You own trees in these locations</div>
            <div className='fw-light text-center small text-primary mb-2'>
              Click to view locations on map
            </div>

            <div className='list-group list-group-flush'>
              {LOCATIONS.map((location) => {
                const { name, trees, date, coordinates } = location;
                return (
                  <button
                    type='button'
                    key={`${name}-${date}`}
                    onClick={() => onLocationClick(coordinates)}
                    className='bg-light border-0 list-group-item list-group-item-action rounded rounded-3 my-2'
                  >
                    <div className='small d-flex align-items-center justify-content-between'>
                      <div className='fw-light'>{name}</div>

                      <div className='d-flex flex-column'>
                        <div className='fw-bold'>{`${trees} Trees`}</div>

                        <div>{date}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
