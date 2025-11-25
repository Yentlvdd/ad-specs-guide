import React from 'react';
import { MoreVertical } from 'lucide-react';

export function YouTubeAdPreview({
    imageUrl,
    logoUrl,
    advertiser,
    headline,
    linkDescription,
    spec,
    aspectRatioStyle,
    viewCount = '300K',
    timeAgo = '2 days ago',
    duration = '4:25'
}) {
    return (
        <div className="bg-white w-full max-w-[400px]">
            {/* Thumbnail */}
            <div className="relative group cursor-pointer">
                <div
                    className="w-full relative bg-black flex items-center justify-center rounded-xl overflow-hidden"
                    style={{ ...aspectRatioStyle, backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    {!imageUrl && (
                        <span className="text-gray-500 text-sm">Upload Thumbnail (1280 x 720)</span>
                    )}

                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                        {duration}
                    </div>

                    {/* Ad Badge */}
                    <div className="absolute bottom-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded">
                        Ad
                    </div>
                </div>
            </div>

            {/* Video Info */}
            <div className="flex gap-3 mt-3">
                {/* Channel Avatar */}
                <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                    {logoUrl ? (
                        <img src={logoUrl} alt="Channel" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-red-600 text-white font-bold text-sm">
                            {advertiser.charAt(0) || 'A'}
                        </div>
                    )}
                </div>

                {/* Text Info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight mb-1">
                        {headline}
                    </h3>
                    <div className="text-xs text-gray-600 space-y-0.5">
                        <div>{advertiser}</div>
                        <div>{viewCount} views · {timeAgo}</div>
                    </div>
                    {linkDescription && (
                        <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                            {linkDescription}
                        </p>
                    )}
                </div>

                {/* Menu */}
                <button className="text-gray-600 hover:bg-gray-100 p-1 rounded-full h-fit">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
