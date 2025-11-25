import React from 'react';
import { Heart, MessageCircle, Share, Bookmark, Music } from 'lucide-react';

export function TikTokAdPreview({
    imageUrl,
    logoUrl,
    advertiser,
    copy,
    cta,
    spec,
    aspectRatioStyle,
    likeCount = '10.1M',
    commentCount = '105K',
    shareCount = '280K'
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
                        Upload Video/Image (1080 x 1920)
                    </div>
                )}
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

            {/* Safe Zones Overlay */}
            {spec.safeZoneOverlay && (
                <>
                    <div className="absolute top-0 left-0 right-0 bg-red-500/20 border-b-2 border-red-500/50 pointer-events-none z-40" style={{ height: spec.safeZoneOverlay.top }} />
                    <div className="absolute bottom-0 left-0 right-0 bg-red-500/20 border-t-2 border-red-500/50 pointer-events-none z-40" style={{ height: spec.safeZoneOverlay.bottom }} />
                    <div className="absolute top-0 bottom-0 left-0 bg-red-500/20 border-r-2 border-red-500/50 pointer-events-none z-40" style={{ width: spec.safeZoneOverlay.left }} />
                    <div className="absolute top-0 bottom-0 right-0 bg-red-500/20 border-l-2 border-red-500/50 pointer-events-none z-40" style={{ width: spec.safeZoneOverlay.right }} />
                </>
            )}

            {/* Right Sidebar - Interaction Icons */}
            <div className="absolute right-2 bottom-24 flex flex-col items-center gap-6 z-30">
                {/* Profile Avatar */}
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-700">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-pink-600 text-white font-bold">
                                {advertiser.charAt(0) || 'A'}
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        +
                    </div>
                </div>

                {/* Like */}
                <div className="flex flex-col items-center gap-1">
                    <Heart className="w-8 h-8 text-white fill-white" />
                    <span className="text-white text-xs font-semibold">{likeCount}</span>
                </div>

                {/* Comment */}
                <div className="flex flex-col items-center gap-1">
                    <MessageCircle className="w-8 h-8 text-white" />
                    <span className="text-white text-xs font-semibold">{commentCount}</span>
                </div>

                {/* Share */}
                <div className="flex flex-col items-center gap-1">
                    <Share className="w-7 h-7 text-white" />
                    <span className="text-white text-xs font-semibold">{shareCount}</span>
                </div>
            </div>

            {/* Bottom Left - Info & CTA */}
            <div className="absolute bottom-0 left-0 right-16 p-4 z-30 space-y-3">
                {/* Username */}
                <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-base drop-shadow-lg">@{advertiser.toLowerCase().replace(/\s+/g, '')}</span>
                    <span className="text-white/80 text-xs bg-white/20 px-2 py-0.5 rounded">Sponsored</span>
                </div>

                {/* Caption */}
                <p className="text-white text-sm drop-shadow-lg line-clamp-2">
                    {copy}
                </p>

                {/* CTA Button */}
                <button className="bg-white text-black font-bold px-6 py-2.5 rounded-lg text-sm hover:bg-gray-100 transition-colors shadow-lg">
                    {cta}
                </button>

                {/* Music Ticker */}
                <div className="flex items-center gap-2 text-white text-xs">
                    <Music className="w-3 h-3" />
                    <div className="overflow-hidden">
                        <div className="animate-marquee whitespace-nowrap">
                            Original Sound - {advertiser}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
