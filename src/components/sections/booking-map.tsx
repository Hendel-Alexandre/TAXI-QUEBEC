"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface BookingMapProps {
  pickup?: { lng: number; lat: number };
  dropoff?: { lng: number; lat: number };
  route?: any;
}

const BookingMap: React.FC<BookingMapProps> = ({ pickup, dropoff, route }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const pickupMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const dropoffMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = mapboxToken || '';
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-71.208, 46.814],
      zoom: 12,
      attributionControl: false
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [mapboxToken]);

  // Handle Pickup Marker
  useEffect(() => {
    if (!mapRef.current) return;

    if (pickup) {
      if (!pickupMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'pickup-marker';
        el.innerHTML = `
          <div style="background: white; padding: 8px; border-radius: 50%; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 2px solid #22c55e; margin-bottom: 4px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div style="background: #22c55e; color: white; font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: -0.05em; text-align: center;">Départ</div>
        `;
        
        pickupMarkerRef.current = new mapboxgl.Marker(el)
          .setLngLat([pickup.lng, pickup.lat])
          .addTo(mapRef.current);
      } else {
        pickupMarkerRef.current.setLngLat([pickup.lng, pickup.lat]);
      }

      if (!dropoff) {
        mapRef.current.flyTo({ center: [pickup.lng, pickup.lat], zoom: 15 });
      }
    } else if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
      pickupMarkerRef.current = null;
    }
  }, [pickup, dropoff]);

  // Handle Dropoff Marker
  useEffect(() => {
    if (!mapRef.current) return;

    if (dropoff) {
      if (!dropoffMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'dropoff-marker';
        el.innerHTML = `
          <div style="background: white; padding: 8px; border-radius: 50%; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 2px solid #000000; margin-bottom: 4px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div style="background: #000000; color: white; font-size: 10px; font-weight: 900; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: -0.05em; text-align: center;">Arrivée</div>
        `;

        dropoffMarkerRef.current = new mapboxgl.Marker(el)
          .setLngLat([dropoff.lng, dropoff.lat])
          .addTo(mapRef.current);
      } else {
        dropoffMarkerRef.current.setLngLat([dropoff.lng, dropoff.lat]);
      }
    } else if (dropoffMarkerRef.current) {
      dropoffMarkerRef.current.remove();
      dropoffMarkerRef.current = null;
    }
  }, [dropoff]);

  // Handle Route and Bounds
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (route) {
      if (map.getSource('route')) {
        (map.getSource('route') as mapboxgl.GeoJSONSource).setData(route);
      } else {
        map.addSource('route', {
          type: 'geojson',
          data: route
        });
        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#000000',
            'line-width': 4,
            'line-opacity': 0.8
          }
        });
      }

      if (pickup && dropoff) {
        const bounds = new mapboxgl.LngLatBounds()
          .extend([pickup.lng, pickup.lat])
          .extend([dropoff.lng, dropoff.lat]);
        
        map.fitBounds(bounds, { padding: 100, duration: 2000 });
      }
    } else {
      if (map.getLayer('route')) map.removeLayer('route');
      if (map.getSource('route')) map.removeSource('route');
    }
  }, [route, pickup, dropoff]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default BookingMap;
