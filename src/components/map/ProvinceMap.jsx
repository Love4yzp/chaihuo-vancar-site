// src/components/map/ProvinceMap.jsx
import React from 'react';
import chinaMapPaths from '../china-map-paths.json';

const ProvinceMap = () => {
    return (
        <g
            transform="translate(0, 13.2) scale(0.1292)"
            fill="url(#chinaGradient)"
            stroke="var(--map-stroke)"
            strokeWidth="4"
            strokeOpacity="0.6"
        >
            {chinaMapPaths.map((province) => (
                <path
                    key={province.id}
                    d={province.d}
                    title={province.title}
                    id={province.id}
                    className="transition-colors hover:fill-chaihuo/20 cursor-pointer"
                />
            ))}
        </g>
    );
};

export default ProvinceMap;
