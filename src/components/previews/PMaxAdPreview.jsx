import React from 'react';
import { Play, MoreVertical, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

export function PMaxAdPreview({
    imageUrl,
    logoUrl,
    advertiser,
    headline,
    copy,
    cta,
    spec,
    aspectRatioStyle
}) {
    const isVideo = spec.type === 'video';
    const isVertical = spec.ratio === '9:16' || spec.ratio === '4:5';

    // RENDER: VIDEO (YouTube / Shorts Style)
    if (isVideo) {
        if (isVertical) {
            // SHORTS STYLE
            return (
                <div className="relative w-[300px] h-[533px] bg-black text-white overflow-hidden rounded-[2rem] border-4 border-gray-800 shadow-2xl">
                    {/* Video Area */}
                    <div
                        className="absolute inset-0 bg-gray-900 bg-center bg-cover"
                        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
                    >
                        {!imageUrl && (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <Play className="w-12 h-12 opacity-50 mb-2" />
                                <span className="text-xs">Upload Vertical Video</span>
                            </div>
                        )}
                    </div>

                    {/* UI Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-b from-transparent via-transparent to-black/80">
                        {/* Right Side Actions */}
                        <div className="absolute right-2 bottom-20 flex flex-col gap-6 items-center">
                            <div className="flex flex-col items-center gap-1">
                                <div className="p-3 bg-gray-800/60 rounded-full hover:bg-gray-700/60 backdrop-blur cursor-pointer"><ThumbsUp className="w-6 h-6" /></div>
                                <span className="text-xs font-medium">1.2K</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="p-3 bg-gray-800/60 rounded-full hover:bg-gray-700/60 backdrop-blur cursor-pointer"><MessageSquare className="w-6 h-6" /></div>
                                <span className="text-xs font-medium">245</span>
                            </div>
                            <div className="p-3 bg-gray-800/60 rounded-full hover:bg-gray-700/60 backdrop-blur cursor-pointer"><Share2 className="w-6 h-6" /></div>
                            <div className="w-10 h-10 rounded-lg bg-gray-800/60 backdrop-blur overflow-hidden border border-white/20 mt-2">
                                {logoUrl ? <img src={logoUrl} className="w-full h-full object-cover" alt="Brand" /> : <div className="w-full h-full bg-blue-500 flex items-center justify-center text-xs font-bold">{advertiser.charAt(0)}</div>}
                            </div>
                        </div>

                        {/* Bottom Info */}
                        <div className="pr-16 pb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-sm shadow-sm">{advertiser}</span>
                                <span className="bg-yellow-400 text-black text-[10px] font-bold px-1.5 rounded-sm">Ad</span>
                            </div>
                            <p className="text-sm leading-tight line-clamp-2 mb-3 font-medium">{headline}</p>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full w-fit transition-colors shadow-lg">
                                {cta}
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            // IN-STREAM / LANDSCAPE STYLE
            return (
                <div className="flex flex-col w-full max-w-[600px] bg-white rounded-lg overflow-hidden shadow-xl border border-gray-100">
                    {/* Video Player */}
                    <div className="relative w-full aspect-video bg-black group">
                        <div
                            className="absolute inset-0 bg-center bg-cover opacity-80"
                            style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
                        />
                        {!imageUrl && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                                <Play className="w-16 h-16 opacity-50 mb-2" />
                            </div>
                        )}

                        {/* Fake Controls */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                            <div className="h-full w-1/3 bg-red-600" />
                        </div>
                        <div className="absolute bottom-2 left-2 text-white bg-black/60 px-1.5 py-0.5 text-[10px] rounded font-medium">Ad</div>
                        <div className="absolute bottom-2 right-2 text-white bg-black/60 px-1.5 py-0.5 text-[10px] rounded font-medium">0:05</div>

                        {/* Skip Button Simulation */}
                        <div className="absolute bottom-12 right-0 bg-black/80 text-white text-xs px-4 py-2 rounded-l-md border-l border-y border-gray-600 flex items-center gap-2 font-medium">
                            <span className="text-gray-300">Skip in 5s</span>
                        </div>

                        {/* Overlay CTA */}
                        <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3 max-w-[70%] border border-white/10 shadow-lg">
                            <div className="w-10 h-10 rounded bg-white overflow-hidden flex-shrink-0">
                                {logoUrl ? <img src={logoUrl} className="w-full h-full object-cover" alt="Brand" /> : <div className="w-full h-full flex items-center justify-center text-black font-bold">{advertiser.charAt(0)}</div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-white text-xs font-bold truncate">{headline}</div>
                                <div className="text-gray-300 text-[10px] truncate">{advertiser}</div>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded transition-colors">
                                {cta}
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    // RENDER: DISCOVERY / FEED CARD (Images)
    // Used for Discovery, Gmail, YouTube Home Feed
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-full max-w-[375px]">
            {/* Image Area */}
            <div className="relative bg-gray-100 flex items-center justify-center overflow-hidden" style={aspectRatioStyle}>
                {imageUrl ? (
                    <img src={imageUrl} alt="Ad Asset" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="text-gray-400 text-center p-4">
                        <span className="text-xs uppercase font-bold tracking-wider">Image Asset</span>
                        <br />
                        <span className="text-[10px] font-mono">{spec.dimensions}</span>
                    </div>
                )}
                {/* Ad Badge */}
                <div className="absolute top-0 left-0 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-br shadow-sm z-10">
                    Ad
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-100">
                        {logoUrl ? <img src={logoUrl} className="w-full h-full object-cover" alt="Brand" /> : <div className="flex items-center justify-center w-full h-full text-gray-400 font-bold">{advertiser.charAt(0)}</div>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-0.5 line-clamp-2">{headline}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <span className="font-medium text-gray-900 truncate">{advertiser}</span>
                            <span className="text-gray-300">•</span>
                            {/* Random "Sponsored" tag or similar context */}
                            <span>Sponsored</span>
                        </div>
                    </div>
                    <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {copy}
                </p>

                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-medium">Performance Max • Discovery</span>
                    <button className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-xs px-4 py-2 rounded-lg transition-colors">
                        {cta}
                    </button>
                </div>
            </div>
        </div>
    );
}
