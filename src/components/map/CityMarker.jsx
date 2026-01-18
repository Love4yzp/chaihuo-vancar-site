// src/components/map/CityMarker.jsx
import React from 'react';

const CityMarker = ({ city, onClick, onHover }) => {
    const isCurrent = city.isCurrent;

    return (
        <g
            className="cursor-pointer group"
            onClick={() => onClick(city)}
            onMouseEnter={() => onHover(city)}
            onMouseLeave={() => onHover(null)}
        >
            {/* 核心标记点容器 */}
            <g transform={`translate(${city.x}, ${city.y})`}>
                {/* 脉冲光环 (仅当前城市，多层效果) */}
                {isCurrent && (
                    <>
                        <circle r="1.5" fill="#ff6b35" fillOpacity="0.2" className="animate-premium-pulse" />
                        <circle r="1.5" fill="#ff6b35" fillOpacity="0.15" className="animate-premium-pulse pulse-delay-1" />
                        <circle r="1.5" fill="#ff6b35" fillOpacity="0.1" className="animate-premium-pulse pulse-delay-2" />
                    </>
                )}

                {/* 主标记点 */}
                <circle
                    r={isCurrent ? 1.2 : 0.8}
                    fill={isCurrent ? "#ff6b35" : "#ffaa00"}
                    stroke="white"
                    strokeWidth="0.3"
                    filter="url(#glow)"
                    className="transition-transform group-hover:scale-125"
                />
            </g>

            {/* 标签文字 (精确定位) */}
            <g className="pointer-events-none">
                {/* 城市名称 - 居中紧贴上方 */}
                <text
                    x={city.x}
                    y={city.y + 3}
                    textAnchor="middle"
                    fill="var(--map-text)"
                    fontSize="1.8"
                    fontWeight="600"
                    className="drop-shadow-sm select-none"
                >
                    {city.name}
                </text>
            </g>
        </g>
    );
};

export default CityMarker;
