import React from 'react';
import { Globe, MoreHorizontal, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

export function MetaAdPreview({
    imageUrl,
    logoUrl,
    advertiser,
    copy,
    websiteUrl,
    headline,
    linkDescription,
    cta,
    spec,
    aspectRatioStyle
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm border w-full max-w-[500px] overflow-hidden">
            {/* Header */}
            <div className="p-3 flex items-start justify-between">
                <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold text-lg">
                                {advertiser.charAt(0) || 'A'}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm text-gray-900 leading-tight">{advertiser || 'Advertiser Name'}</h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                            <span>Sponsored</span>
                            <Globe className="w-3 h-3" />
                        </div>
                    </div>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Primary Text */}
            <div className="px-3 pb-3 text-sm text-gray-900 whitespace-pre-wrap">
                {copy}
            </div>

            {/* Media / Ad Creative */}
            <div className="relative w-full bg-black/5">
                <div
                    className="w-full relative bg-gray-100 flex items-center justify-center overflow-hidden"
                    style={{ ...aspectRatioStyle, backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    {!imageUrl && <span className="text-gray-400 text-sm">Upload Image ({spec.dimensions})</span>}

                    {/* Safe Zones Overlay */}
                    {spec.safeZoneOverlay && (
                        <>
                            <div className="absolute top-0 left-0 right-0 bg-red-500/20 border-b border-red-500/30 pointer-events-none" style={{ height: spec.safeZoneOverlay.top }} />
                            <div className="absolute bottom-0 left-0 right-0 bg-red-500/20 border-t border-red-500/30 pointer-events-none" style={{ height: spec.safeZoneOverlay.bottom }} />
                            <div className="absolute top-0 bottom-0 left-0 bg-red-500/20 border-r border-red-500/30 pointer-events-none" style={{ width: spec.safeZoneOverlay.left }} />
                            <div className="absolute top-0 bottom-0 right-0 bg-red-500/20 border-l border-red-500/30 pointer-events-none" style={{ width: spec.safeZoneOverlay.right }} />
                        </>
                    )}
                </div>
            </div>

            {/* Link Preview Section */}
            <div className="bg-gray-100 p-3 flex items-center justify-between gap-4 border-b border-gray-200">
                <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="text-xs text-gray-600 uppercase truncate mb-0.5">{websiteUrl}</div>
                    <div className="font-bold text-gray-900 text-base leading-tight truncate mb-0.5">{headline}</div>
                    <div className="text-xs text-gray-600 truncate">{linkDescription}</div>
                </div>
                <button className="flex-shrink-0 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-4 py-2 rounded text-sm transition-colors">
                    {cta}
                </button>
            </div>

            {/* Social Actions */}
            <div className="px-2 py-1 flex items-center justify-between text-gray-500">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-md transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="text-sm font-medium">Like</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-md transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Comment</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-md transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Share</span>
                </button>
            </div>
        </div>
    );
}
