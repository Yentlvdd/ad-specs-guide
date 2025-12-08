import React from 'react';
import { Play, Volume2, Maximize, Settings } from 'lucide-react';

export function BVODAdPreview({
    imageUrl,
    spec,
    aspectRatioStyle
}) {
    // Determine player style based on ratio
    const isVertical = spec.ratio === '9:16';
    const width = isVertical ? '320px' : '560px'; // Base widths
    const height = isVertical ? '569px' : '315px'; // Base heights

    return (
        <div
            className={`relative bg-gray-950 overflow-hidden shadow-2xl flex flex-col ${isVertical ? 'rounded-[2rem] border-4 border-gray-800' : 'rounded-lg'}`}
            style={{
                // We let the container control size via aspect ratio usually, 
                // but setting a max-width helps keep it realistic on desktop
                maxWidth: '100%',
                width: width,
                height: isVertical ? 'auto' : undefined,
                aspectRatio: spec.ratio.replace(':', '/')
            }}
        >
            {/* Video Content Area */}
            <div
                className="relative flex-1 bg-gray-900 flex items-center justify-center bg-cover bg-center group"
                style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
                    ...aspectRatioStyle
                }}
            >
                {!imageUrl && (
                    <div className="text-gray-500 flex flex-col items-center p-4 text-center">
                        <div className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center mb-3">
                            <Play className="w-5 h-5 ml-1 opacity-50" />
                        </div>
                        <span className="text-xs font-medium text-gray-400">Upload Video Asset</span>
                        <span className="text-[10px] mt-1 text-gray-600 font-mono">
                            {spec.dimensions} | {spec.ratio}
                        </span>
                    </div>
                )}

                {/* Simulated Player UI Overlay (Fade in on hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-gray-600/50 rounded-full mb-4 cursor-pointer group/progress">
                        <div className="h-full bg-primary w-1/3 rounded-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 shadow-sm" />
                        </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                            <button className="hover:text-primary transition-colors">
                                <Play className="w-5 h-5 fill-current" />
                            </button>
                            <div className="flex items-center gap-2 group/vol">
                                <Volume2 className="w-5 h-5" />
                                <div className="w-0 overflow-hidden group-hover/vol:w-16 transition-all duration-300">
                                    <div className="w-14 h-1 bg-white/30 rounded-full ml-2">
                                        <div className="h-full bg-white w-2/3 rounded-full" />
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-medium font-mono">0:05 / 0:15</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="hover:rotate-90 transition-transform duration-300">
                                <Settings className="w-5 h-5" />
                            </button>
                            <button className="hover:scale-110 transition-transform">
                                <Maximize className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* "AD" Badge - Typical for BVOD/Youtube etc */}
                <div className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">
                    AD
                </div>

                {/* DPG Media / Broadcaster Logo Watermark (Simulated) */}
                <div className="absolute top-4 right-4 opacity-50 pointer-events-none">
                    <span className="text-white font-bold tracking-widest text-[10px] uppercase drop-shadow-md">
                        VTM GO
                    </span>
                </div>
            </div>

            {/* Outstream Context (Only show for outstream ID) */}
            {spec.id === 'bvod-outstream' && (
                <div className="bg-white p-4 border-t border-gray-100">
                    <div className="h-2 w-3/4 bg-gray-100 rounded mb-2" />
                    <div className="h-2 w-full bg-gray-100 rounded mb-2" />
                    <div className="h-2 w-5/6 bg-gray-100 rounded" />
                    <p className="text-[10px] text-gray-400 mt-2 italic">
                        *Outstream video plays muted between paragraphs
                    </p>
                </div>
            )}
        </div>
    );
}
