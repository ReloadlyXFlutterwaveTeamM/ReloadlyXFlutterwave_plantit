import React, { useRef, useEffect, useState, useContext } from 'react';
import mapboxgl from 'mapbox-gl';

import { contexts } from 'Store';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

const { AuthContext } = contexts;

const LocationList = ({ handleClick }) => {
  const {
    state: { locations },
  } = useContext(AuthContext);

  return (
    <div className='d-flex flex-column p-2 p-md-4 border rounded rounder-3 bg-white'>
      <div className='fw-bold text-center'>You own trees in these locations</div>

      <div className='fw-light text-center small text-primary mb-2'>
        Click to view locations on map
      </div>

      {locations.length ? (
        <div className='list-group list-group-flush locations-list'>
          {locations.map((location) => {
            const { date_actualized, number_of_trees, name, coordinates } = location;
            return (
              <button
                type='button'
                key={`${name}-${date_actualized}`}
                onClick={() => handleClick(coordinates)}
                className='bg-light border-0 list-group-item list-group-item-action rounded rounded-3 my-2'
              >
                <div className='small d-flex align-items-center justify-content-between'>
                  <div className='fw-light'>{name}</div>

                  <div className='d-flex flex-column'>
                    <div className='fw-bold'>{`${number_of_trees} Trees`}</div>

                    <div>{date_actualized}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className='text-center small text-danger locations-list'>
          No locations available, no trees yet planted
        </div>
      )}
    </div>
  );
};

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
          <div className='d-none d-md-flex flex-column ms-1 ms-md-2 mt-1 mt-md-2 border rounded rounder-3 bg-white position-absolute top-0 start-0 location-container'>
            <LocationList handleClick={onLocationClick} />
          </div>
        </div>

        <div className='w-100d-flex d-md-none flex-column border rounded rounder-3 bg-white position-fixed top-100 start-50 translate-middle location-container'>
          <LocationList handleClick={onLocationClick} />
        </div>
      </div>
    </div>
  );
};

export default Locations;
