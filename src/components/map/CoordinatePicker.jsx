// src/components/map/CoordinatePicker.jsx
import React from 'react';

const CoordinatePicker = ({ coords }) => {
    if (!coords) return null;

    return (
        <g pointerEvents="none">
            <line
                x1="0" y1={coords.y}
                x2="100" y2={coords.y}
                stroke="#ff6b35"
                strokeWidth="0.2"
                strokeDasharray="1,1"
            />
            <line
                x1={coords.x} y1="0"
                x2={coords.x} y2="100"
                stroke="#ff6b35"
                strokeWidth="0.2"
                strokeDasharray="1,1"
            />
            <circle cx={coords.x} cy={coords.y} r="0.5" fill="#ff6b35" />
            <rect
                x={coords.x + 2}
                y={coords.y - 6}
                width="15"
                height="5"
                rx="1"
                fill="white"
                fillOpacity="0.8"
            />
            <text
                x={coords.x + 3}
                y={coords.y - 2.5}
                fontSize="3"
                fill="#ff6b35"
                className="font-mono font-bold"
            >
                {coords.x}, {coords.y}
            </text>
        </g>
    );
};

export default CoordinatePicker;
