import React from 'react';
import { ChevronUp } from 'lucide-react';

export function SnapchatAdPreview({
    imageUrl,
    logoUrl,
    advertiser,
    headline,
    cta,
    spec,
    aspectRatioStyle
}) {
    return (
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl" style={{ width: '375px', height: '667px' }}>
            {/* Media Background */}
            <div
                className="absolute inset-0 bg-gray-900 bg-cover bg-center"
                style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
            >
                {!imageUrl && (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                        Upload Image/Video (1080 x 1920)
                    </div>
                )}
            </div>

            {/* Safe Zones Overlay */}
            {spec.safeZoneOverlay && (
                <>
                    <div className="absolute top-0 left-0 right-0 bg-yellow-500/20 border-b-2 border-dashed border-yellow-500/60 pointer-events-none z-40" style={{ height: spec.safeZoneOverlay.top }}>
                        <div className="absolute top-1 left-2 text-yellow-300 text-xs font-bold drop-shadow">SAFE ZONE</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-yellow-500/20 border-t-2 border-dashed border-yellow-500/60 pointer-events-none z-40" style={{ height: spec.safeZoneOverlay.bottom }}>
                        <div className="absolute bottom-1 left-2 text-yellow-300 text-xs font-bold drop-shadow">SAFE ZONE</div>
                    </div>
                </>
            )}

            {/* Top Header Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 z-30">
                <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-700 flex-shrink-0">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-yellow-400 text-black font-bold">
                                {advertiser.charAt(0) || 'A'}
                            </div>
                        )}
                    </div>

                    {/* Brand Name & Headline */}
                    <div className="flex-1">
                        <div className="text-white font-bold text-sm drop-shadow-lg">{advertiser}</div>
                        <div className="text-white text-xs drop-shadow-lg mt-0.5 line-clamp-2">{headline}</div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA "Pill" */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center gap-2 shadow-lg">
                    <span className="text-black font-bold text-sm uppercase">{cta}</span>
                    <div className="animate-bounce">
                        <ChevronUp className="w-5 h-5 text-black" />
                    </div>
                </div>
                <div className="text-white text-xs text-center mt-2 drop-shadow-lg">Swipe up</div>
            </div>
        </div>
    );
}
