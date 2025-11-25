import React from 'react';
import { Building2 } from 'lucide-react';

export function LinkedInAdPreview({
    imageUrl,
    logoUrl,
    advertiser,
    copy,
    websiteUrl,
    headline,
    cta,
    spec,
    aspectRatioStyle,
    followerCount = '123,456'
}) {
    return (
        <div className="bg-white rounded-lg border border-gray-300 w-full max-w-[550px] overflow-hidden shadow-sm">
            {/* Header */}
            <div className="p-3 flex items-start justify-between">
                <div className="flex gap-2">
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 flex-shrink-0">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Company Logo" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-700 text-white">
                                <Building2 className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900 leading-tight">{advertiser}</h3>
                        <div className="text-xs text-gray-600 mt-0.5">
                            {followerCount} followers
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                            <span>Promoted</span>
                        </div>
                    </div>
                </div>
                <button className="text-gray-500 hover:bg-gray-100 p-1 rounded">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 8a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0zm10 0a1.5 1.5 0 103 0 1.5 1.5 0 00-3 0z" />
                    </svg>
                </button>
            </div>

            {/* Post Text */}
            <div className="px-3 pb-3 text-sm text-gray-900 leading-relaxed">
                {copy.length > 150 ? (
                    <>
                        {copy.substring(0, 150)}...
                        <button className="text-blue-700 font-semibold ml-1">see more</button>
                    </>
                ) : (
                    copy
                )}
            </div>

            {/* Media */}
            <div className="relative w-full bg-gray-100">
                <div
                    className="w-full relative bg-gray-100 flex items-center justify-center"
                    style={{ ...aspectRatioStyle, backgroundImage: imageUrl ? `url(${imageUrl})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    {!imageUrl && (
                        <span className="text-gray-400 text-sm">Upload Image ({spec.dimensions})</span>
                    )}
                </div>
            </div>

            {/* CTA Footer */}
            <div className="bg-gray-50 p-3 flex items-center justify-between gap-3 border-t border-gray-200">
                <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-600 uppercase mb-0.5">{websiteUrl}</div>
                    <div className="font-semibold text-gray-900 text-sm line-clamp-1">{headline}</div>
                </div>
                <button className="flex-shrink-0 border-2 border-blue-700 text-blue-700 font-semibold px-4 py-1.5 rounded-full text-sm hover:bg-blue-50 transition-colors">
                    {cta}
                </button>
            </div>

            {/* Engagement Bar */}
            <div className="px-3 py-2 flex items-center justify-around text-gray-600 border-t border-gray-200">
                <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded transition-colors text-sm font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Like
                </button>
                <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded transition-colors text-sm font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Comment
                </button>
                <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded transition-colors text-sm font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                </button>
            </div>
        </div>
    );
}
