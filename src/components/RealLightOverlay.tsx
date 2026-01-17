
import React, { useEffect, useState } from 'react';

const RealLightOverlay = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Width of one lens
    const lensWidth = 140;
    const lensHeight = 100;
    const bridgeWidth = 30;

    // Calculate positions based on mouse center
    const leftLensCx = mousePosition.x - (lensWidth / 2) - (bridgeWidth / 2);
    const rightLensCx = mousePosition.x + (lensWidth / 2) + (bridgeWidth / 2);
    const lensCy = mousePosition.y;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            pointerEvents: 'none',
            mixBlendMode: 'normal'
        }}>
            <svg width="100%" height="100%">
                <defs>
                    <mask id="sunglasses-mask">
                        {/* White Rect = Visible Overlay (The blinding light) */}
                        <rect x="0" y="0" width="100%" height="100%" fill="white" />

                        {/* Black Shapes = Transparent Holes (The lenses) */}
                        <ellipse cx={leftLensCx} cy={lensCy} rx={lensWidth / 2} ry={lensHeight / 2} fill="black" />
                        <ellipse cx={rightLensCx} cy={lensCy} rx={lensWidth / 2} ry={lensHeight / 2} fill="black" />

                        {/* Bridge (Optional, makes it look more connected) */}
                        <rect
                            x={mousePosition.x - (bridgeWidth / 2)}
                            y={lensCy - 5}
                            width={bridgeWidth}
                            height={10}
                            fill="black"
                        />
                    </mask>
                </defs>

                {/* The Overlay Rect using the Mask */}
                <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="white"
                    mask="url(#sunglasses-mask)"
                />
            </svg>
        </div>
    );
};

export default RealLightOverlay;
