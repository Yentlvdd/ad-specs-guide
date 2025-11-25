import React from 'react';
import { MoreHorizontal, Share, Download } from 'lucide-react';

export function PinterestAdPreview({
    imageUrl,
    logoUrl,
    advertiser,
    headline,
    linkDescription,
    websiteUrl,
    spec,
    aspectRatioStyle
}) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md w-full max-w-[280px] hover:shadow-xl transition-shadow">
            {/* Pin Image */}
            <div className="relative group">
                <div
                    className="w-full relative bg-gray-100 flex items-center justify-center"
                    style={{ ...aspectRatioStyle, backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    {!imageUrl && (
                        <span className="text-gray-400 text-sm p-8 text-center">Upload Image (1000 x 1500)</span>
                    )}
                </div>

                {/* Hover Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-4 py-2 rounded-full text-sm transition-colors">
                        Save
                    </button>
                </div>

                {/* Top Right Actions */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white hover:bg-gray-100 p-2 rounded-full shadow-md">
                        <MoreHorizontal className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Pin Metadata */}
            <div className="p-3 space-y-2">
                {/* Promoted Label */}
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Brand" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-red-600 text-white text-xs font-bold">
                                {advertiser.charAt(0) || 'A'}
                            </div>
                        )}
                    </div>
                    <span className="text-xs text-gray-600">Promoted by {advertiser}</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">
                    {headline}
                </h3>

                {/* Description */}
                {linkDescription && (
                    <p className="text-gray-600 text-xs line-clamp-2">
                        {linkDescription}
                    </p>
                )}

                {/* Website Link */}
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM5.78 8.75a.75.75 0 000 1.5h4.44a.75.75 0 000-1.5H5.78z" />
                    </svg>
                    <span className="truncate">{websiteUrl.toLowerCase()}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-3 py-2 rounded-full text-xs transition-colors">
                        Visit
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                        <Share className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-700" />
                    </button>
                </div>
            </div>
        </div>
    );
}
