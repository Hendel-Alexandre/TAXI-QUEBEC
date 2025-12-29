"use client";

import React, { useState } from 'react';
import { SearchBox } from '@mapbox/search-js-react';

interface AddressSearchProps {
  onSelect?: (address: string) => void;
  accessToken: string;
  placeholder?: string;
  defaultValue?: string;
}

const AddressSearch: React.FC<AddressSearchProps> = ({ onSelect, accessToken, placeholder, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || '');

  // Bounding box for Quebec City area: [minLng, minLat, maxLng, maxLat]
  const quebecBbox: [number, number, number, number] = [-71.551, 46.702, -71.108, 46.928];

  return (
    <div className="relative w-full group">
      <div className="mapbox-search-container">
        <SearchBox
          accessToken={accessToken}
          value={value}
          onChange={(val) => setValue(val)}
          onRetrieve={(res) => {
            if (res && res.features && res.features[0]) {
              const address = res.features[0].properties.full_address || res.features[0].properties.name;
              setValue(address);
              if (onSelect) onSelect(address);
            }
          }}
          placeholder={placeholder || "Enter address"}
          options={{
            bbox: quebecBbox,
            proximity: { lng: -71.208, lat: 46.814 },
            countries: ['ca'],
            language: 'fr,en',
            types: 'address,poi'
          }}
          theme={{
            variables: {
              fontFamily: 'inherit',
              unit: '16px',
              borderRadius: '12px',
                colorPrimary: '#3b66d4',
                colorSecondary: '#f3f4f6',
                colorText: '#1a1a1a',
                boxShadow: 'none'
              }
            }}
          />
        </div>
        <style jsx global>{`
          .mapbox-search-container mapbox-search-box {
            width: 100% !important;
          }
          .mapbox-search-container mapbox-search-box::part(input) {
            padding-left: 16px !important;
            height: 52px !important;
            background-color: #f3f4f6 !important;
            border: 2px solid transparent !important;
            border-radius: 12px !important;
            transition: all 0.2s ease !important;
            font-weight: 500 !important;
          }
          .mapbox-search-container mapbox-search-box::part(input):focus {
            background-color: white !important;
            border-color: #3b66d4 !important;
            box-shadow: 0 0 0 4px rgba(59, 102, 212, 0.1) !important;
          }
        .mapbox-search-container mapbox-search-box::part(button-search) {
          display: none !important;
        }
        .mapbox-search-container mapbox-search-box::part(pin-icon) {
          display: none !important;
        }
        .mapbox-search-container mapbox-search-box::part(search-icon) {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default AddressSearch;
