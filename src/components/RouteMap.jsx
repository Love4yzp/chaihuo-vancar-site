// src/components/RouteMap.jsx
// Route Map Component - Modular refactoring with extracted dev tools

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import ProvinceMap from './map/ProvinceMap';
import RouteTrail from './map/RouteTrail';
import CityMarker from './map/CityMarker';
import CoordinatePicker from './map/CoordinatePicker';
import { ROUTE_POINTS, KEY_CITIES } from './map/route-config';
import { useDevTools, IS_DEV } from './map/useDevTools';

export default function RouteMap() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [hoveredCity, setHoveredCity] = useState(null);
    const hoverTimeoutRef = useRef(null);
    const svgRef = useRef(null);

    // Dev tools (only active when IS_DEV is true)
    const devTools = useDevTools(svgRef);

    // Stable hover logic - prevents flickering during rapid transitions
    const handleCityHover = useCallback((city) => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }

        if (city) {
            setHoveredCity(city);
        } else {
            hoverTimeoutRef.current = setTimeout(() => {
                setHoveredCity(null);
            }, 50);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        };
    }, []);

    const displayCity = hoveredCity || selectedCity;
    const tooltipStyle = useMemo(() => {
        if (!displayCity) return { opacity: 0, pointerEvents: 'none' };

        const isInteractive = selectedCity && displayCity.id === selectedCity.id && !hoveredCity;

        return {
            left: `${displayCity.x}%`,
            top: `${displayCity.y}%`,
            transform: `translate(${displayCity.x > 50 ? '-105%' : '5%'}, ${displayCity.y > 50 ? '-105%' : '5%'})`,
            opacity: 1,
            pointerEvents: isInteractive ? 'auto' : 'none'
        };
    }, [displayCity?.id, displayCity?.x, displayCity?.y, selectedCity?.id, hoveredCity?.id]);

    // Determine which points to show for the route trail
    const routePoints = (IS_DEV && devTools.isDrawingMode && devTools.drawingPoints.length > 0) 
        ? devTools.drawingPoints 
        : ROUTE_POINTS;

    return (
        <div className="relative">
            {/* Dev Toolbar (only in dev mode) */}
            {IS_DEV && (
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    <div className="flex gap-2">
                        <button
                            onClick={devTools.toggleDrawingMode}
                            className={`btn btn-sm ${devTools.isDrawingMode ? 'btn-error' : 'btn-accent shadow-lg'}`}
                        >
                            {devTools.isDrawingMode ? '🔴 Stop Drawing' : '🎨 Start Drawing Path'}
                        </button>
                        {devTools.isDrawingMode && (
                            <>
                                <button
                                    onClick={devTools.undoLastPoint}
                                    className="btn btn-sm btn-warning shadow-md"
                                    disabled={devTools.drawingPoints.length === 0}
                                >
                                    ↩️ Undo
                                </button>
                                <button
                                    onClick={devTools.clearAllPoints}
                                    className="btn btn-sm btn-ghost bg-slate-200/50 hover:bg-slate-300 shadow-sm"
                                    disabled={devTools.drawingPoints.length === 0}
                                >
                                    🗑️ Clear
                                </button>
                            </>
                        )}
                    </div>
                    {devTools.isDrawingMode && devTools.drawingPoints.length > 0 && (
                        <button onClick={devTools.copyPointsToClipboard} className="btn btn-sm btn-success shadow-lg">
                            Copy {devTools.drawingPoints.length} points (JSON)
                        </button>
                    )}
                </div>
            )}

            {/* SVG Map Container */}
            <div className="w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl shadow-xl overflow-hidden p-4 md:p-8 relative"
                style={{
                    background: 'linear-gradient(to bottom right, var(--map-bg-from), var(--map-bg-to))'
                }}
            >
                <svg
                    ref={svgRef}
                    viewBox="0 0 100 100"
                    className="w-full h-full cursor-crosshair relative z-0"
                    preserveAspectRatio="xMidYMid meet"
                    onClick={devTools.handleMapClick}
                    onMouseMove={devTools.handleMouseMove}
                    onMouseLeave={devTools.handleMouseLeave}
                >
                    <defs>
                        <linearGradient id="chinaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--map-land-from)" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="var(--map-land-to)" stopOpacity="0.4" />
                        </linearGradient>
                        
                        <linearGradient id="routeGradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#ff6b35" />
                            <stop offset="30%" stopColor="#ffaa00" />
                            <stop offset="60%" stopColor="#aadd00" />
                            <stop offset="100%" stopColor="#88cc00" />
                        </linearGradient>

                        <filter id="glow">
                            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter id="routeGlow">
                            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* 1. Base Map Layer */}
                    <ProvinceMap />

                    {/* 2. Route Trail Layer */}
                    <RouteTrail points={routePoints} />

                    {/* 3. City Markers Layer */}
                    {KEY_CITIES.map(city => (
                        <CityMarker
                            key={city.id}
                            city={city}
                            onClick={(city) => (!IS_DEV || !devTools.isDrawingMode) && setSelectedCity(selectedCity?.id === city.id ? null : city)}
                            onHover={handleCityHover}
                        />
                    ))}

                    {/* 4. Drawing Points (dev mode only) */}
                    {IS_DEV && devTools.isDrawingMode && devTools.drawingPoints.map((pt, i) => (
                        <circle key={i} cx={pt.x} cy={pt.y} r="0.5" fill="#ff6b35" opacity="0.6" />
                    ))}

                    {/* 5. Decorative Text */}
                    <text
                        x={50}
                        y={8}
                        textAnchor="middle"
                        fill="var(--map-text)"
                        fontSize="2.5"
                        fontStyle="italic"
                    >
                        Maker Journey · Across China
                    </text>

                    {/* 6. Coordinate Picker (dev mode only) */}
                    {IS_DEV && <CoordinatePicker coords={devTools.debugCoords} />}
                </svg>

                {/* Floating Info Card - Desktop only */}
                <div 
                    className="absolute z-20 hidden md:block"
                    style={{
                        ...tooltipStyle,
                        transition: 'opacity 200ms ease-out',
                    }}
                >
                    {displayCity && (
                        <div className="w-72 md:w-80 bg-base-100/95 backdrop-blur-md rounded-xl shadow-2xl p-4 border border-base-300 border-l-4 border-l-chaihuo">
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="badge badge-primary badge-sm">{displayCity.date.split(' - ')[0]}</div>
                                        <span className="text-base-content/50 text-xs">→</span>
                                        <div className="badge badge-secondary badge-sm">{displayCity.date.split(' - ')[1]}</div>
                                    </div>
                                    <h3 className="text-lg font-bold text-base-content">{displayCity.name}</h3>
                                    <p className="text-base-content/70 mt-1 text-xs leading-relaxed">
                                        {displayCity.description}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedCity(null)}
                                    className="btn btn-circle btn-xs btn-ghost flex-shrink-0"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Info Card */}
            {selectedCity && (
                <div className="md:hidden mt-4 bg-base-100 rounded-xl shadow-lg p-5 border-l-4 border-chaihuo animate-fade-in">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="badge badge-primary">{selectedCity.date.split(' - ')[0]}</div>
                                <span className="text-base-content/50">→</span>
                                <div className="badge badge-secondary">{selectedCity.date.split(' - ')[1]}</div>
                            </div>
                            <h3 className="text-xl font-bold text-base-content">{selectedCity.name}</h3>
                            <p className="text-base-content/70 mt-2 text-sm leading-relaxed">
                                {selectedCity.description}
                            </p>
                        </div>
                        <button
                            onClick={() => setSelectedCity(null)}
                            className="btn btn-circle btn-sm btn-ghost flex-shrink-0"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}

            {/* Route Statistics */}
            <div className="text-center mt-6 space-y-2">
                <p className="text-2xl font-bold">
                    <span className="text-chaihuo">2026.03.01</span>
                    <span className="text-base-content/40 mx-3">→</span>
                    <span className="text-accent">2026.11.11</span>
                </p>
                <p className="text-base-content/60">
                    From Shenzhen · Across China · Back to Shenzhen
                </p>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-4">
                <button
                    onClick={() => setSelectedCity(KEY_CITIES[0])}
                    className="btn btn-primary btn-outline gap-2"
                >
                    <span>🐴</span>
                    Explore Our Route
                </button>
            </div>

            <style>{`
                @keyframes premium-pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.8); opacity: 0.2; }
                    100% { transform: scale(2.5); opacity: 0; }
                }
                .animate-premium-pulse { 
                    animation: premium-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; 
                    transform-origin: center;
                }
                .pulse-delay-1 { animation-delay: 1s; }
                .pulse-delay-2 { animation-delay: 2s; }

                @keyframes draw { to { stroke-dashoffset: 0; } }
                .animate-fade-in { animation: fadeIn 0.3s ease-out; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
