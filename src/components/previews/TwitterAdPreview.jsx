import React from 'react';
import { MessageCircle, Repeat2, Heart, Share, MoreHorizontal, BadgeCheck } from 'lucide-react';

export function TwitterAdPreview({
    imageUrl,
    logoUrl,
    advertiser,
    copy,
    websiteUrl,
    headline,
    linkDescription,
    cta,
    spec,
    aspectRatioStyle,
    darkMode = false,
    verified = false
}) {
    const bgColor = darkMode ? 'bg-black' : 'bg-white';
    const textColor = darkMode ? 'text-white' : 'text-gray-900';
    const mutedColor = darkMode ? 'text-gray-500' : 'text-gray-600';
    const borderColor = darkMode ? 'border-gray-800' : 'border-gray-200';

    return (
        <div className={`${bgColor} rounded-xl border ${borderColor} w-full max-w-[600px] overflow-hidden shadow-sm`}>
            {/* Header */}
            <div className="p-4 flex items-start justify-between">
                <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-bold text-lg">
                                {advertiser.charAt(0) || 'A'}
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-1">
                            <span className={`font-bold ${textColor}`}>{advertiser}</span>
                            {verified && <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500" />}
                        </div>
                        <div className={`${mutedColor} text-sm`}>
                            @{advertiser.toLowerCase().replace(/\s+/g, '')} · <span className="text-blue-500">Promoted</span>
                        </div>
                    </div>
                </div>
                <button className={`${mutedColor} hover:bg-gray-100 dark:hover:bg-gray-900 p-1 rounded-full`}>
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Tweet Text */}
            <div className={`px-4 pb-3 ${textColor} text-[15px] leading-relaxed whitespace-pre-wrap`}>
                {copy}
            </div>

            {/* Media Card */}
            <div className={`border ${borderColor} rounded-2xl overflow-hidden mx-4 mb-3`}>
                <div
                    className="w-full relative bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
                    style={{ ...aspectRatioStyle, backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    {!imageUrl && (
                        <span className={`${mutedColor} text-sm`}>Upload Image ({spec.dimensions})</span>
                    )}
                </div>

                {/* Link Preview Footer */}
                <div className={`p-3 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} border-t ${borderColor}`}>
                    <div className={`${mutedColor} text-xs uppercase mb-1`}>{websiteUrl}</div>
                    <div className={`${textColor} font-semibold text-[15px] mb-1 line-clamp-1`}>{headline}</div>
                    <div className={`${mutedColor} text-sm line-clamp-1`}>{linkDescription}</div>
                </div>
            </div>

            {/* Engagement Footer */}
            <div className={`px-4 py-2 flex items-center justify-between ${mutedColor} border-t ${borderColor}`}>
                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                        <MessageCircle className="w-[18px] h-[18px]" />
                    </div>
                    <span className="text-sm">24</span>
                </button>
                <button className="flex items-center gap-2 hover:text-green-500 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-green-500/10">
                        <Repeat2 className="w-[18px] h-[18px]" />
                    </div>
                    <span className="text-sm">12</span>
                </button>
                <button className="flex items-center gap-2 hover:text-pink-500 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-pink-500/10">
                        <Heart className="w-[18px] h-[18px]" />
                    </div>
                    <span className="text-sm">1.2K</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                        <Share className="w-[18px] h-[18px]" />
                    </div>
                </button>
            </div>
        </div>
    );
}
