// src/components/map/useDevTools.js
// Development tools hook for route path drawing and coordinate picking
// Extracted from RouteMap.jsx for better separation of concerns

import { useState, useCallback } from 'react';
import { KEY_CITIES } from './route-config';

// Development mode switch - set to true to enable path drawing tools
export const IS_DEV = false;

/**
 * Custom hook for development-only tools
 * Provides coordinate picking, path drawing, and clipboard export functionality
 * 
 * @param {React.RefObject} svgRef - Reference to the SVG element
 * @returns {Object} Dev tools state and handlers
 */
export function useDevTools(svgRef) {
    // Dev-only state
    const [debugCoords, setDebugCoords] = useState(null);
    const [drawingPoints, setDrawingPoints] = useState([]);
    const [isDrawingMode, setIsDrawingMode] = useState(false);

    // Convert screen coordinates to SVG coordinates
    const screenToSvgCoords = useCallback((clientX, clientY) => {
        if (!svgRef.current) return null;
        const pt = svgRef.current.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const svgP = pt.matrixTransform(svgRef.current.getScreenCTM().inverse());
        return {
            x: Math.round(svgP.x * 10) / 10,
            y: Math.round(svgP.y * 10) / 10
        };
    }, [svgRef]);

    // Handle map click for coordinate picking and path drawing
    const handleMapClick = useCallback((e) => {
        if (!IS_DEV) return;
        
        const coords = screenToSvgCoords(e.clientX, e.clientY);
        if (!coords) return;

        const { x, y } = coords;

        if (isDrawingMode) {
            // Auto-snap to nearby city
            const snapThreshold = 3;
            const snappedCity = KEY_CITIES.find(city => {
                const dist = Math.sqrt(Math.pow(city.x - x, 2) + Math.pow(city.y - y, 2));
                return dist < snapThreshold;
            });

            if (snappedCity) {
                setDrawingPoints(prev => [...prev, {
                    type: 'city',
                    id: snappedCity.id,
                    name: snappedCity.name,
                    x: snappedCity.x,
                    y: snappedCity.y
                }]);
            } else {
                setDrawingPoints(prev => [...prev, { x, y }]);
            }
        } else {
            setDebugCoords({ x, y });
        }
    }, [isDrawingMode, screenToSvgCoords]);

    // Handle mouse move for real-time coordinate display
    const handleMouseMove = useCallback((e) => {
        if (!IS_DEV) return;
        
        const coords = screenToSvgCoords(e.clientX, e.clientY);
        if (coords) {
            setDebugCoords(coords);
        }
    }, [screenToSvgCoords]);

    // Handle mouse leave
    const handleMouseLeave = useCallback(() => {
        if (IS_DEV) {
            setDebugCoords(null);
        }
    }, []);

    // Copy drawing points to clipboard as route-config.js format
    const copyPointsToClipboard = useCallback(() => {
        const formattedPoints = drawingPoints.map(p => {
            if (p.type === 'city') {
                const constName = `${p.id.toUpperCase()}_COORDS`;
                return `    { ...${constName}, name: '${p.name}' },`;
            }
            return `    { x: ${p.x}, y: ${p.y} },`;
        });

        const outputText = `export const ROUTE_POINTS = [\n${formattedPoints.join('\n')}\n];`;

        const tryCopy = (text) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                return navigator.clipboard.writeText(text);
            }
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return Promise.resolve();
            } catch (err) {
                document.body.removeChild(textArea);
                return Promise.reject(err);
            }
        };

        tryCopy(outputText)
            .then(() => alert('Route points code copied to clipboard!\nYou can paste it directly into route-config.js'))
            .catch(err => {
                console.error(err);
                alert('Copy failed. Check console for output.');
            });
    }, [drawingPoints]);

    // Undo last point
    const undoLastPoint = useCallback(() => {
        setDrawingPoints(prev => prev.slice(0, -1));
    }, []);

    // Clear all points
    const clearAllPoints = useCallback(() => {
        setDrawingPoints([]);
    }, []);

    // Toggle drawing mode
    const toggleDrawingMode = useCallback(() => {
        setIsDrawingMode(prev => !prev);
    }, []);

    return {
        // State
        IS_DEV,
        debugCoords,
        drawingPoints,
        isDrawingMode,
        
        // Handlers
        handleMapClick,
        handleMouseMove,
        handleMouseLeave,
        
        // Actions
        copyPointsToClipboard,
        undoLastPoint,
        clearAllPoints,
        toggleDrawingMode,
        setDrawingPoints
    };
}

export default useDevTools;
