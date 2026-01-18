// src/components/map/RouteTrail.jsx
import React from 'react';

const RouteTrail = ({ points }) => {
    if (!points || points.length === 0) return null;

    const routePath = points.map((point, i) =>
        `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
        <path
            d={routePath}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="0.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#routeGlow)"
            className="route-line"
            style={{
                strokeDasharray: '1000',
                strokeDashoffset: '1000',
                animation: 'draw 3s ease-out forwards',
            }}
        />
    );
};

export default RouteTrail;
