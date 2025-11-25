import React from 'react';

export function GoogleDisplayAdPreview({
    imageUrl,
    logoUrl,
    advertiser,
    headline,
    linkDescription,
    cta,
    spec,
    layoutType = 'medium-rectangle' // 'medium-rectangle', 'mobile-banner', 'native'
}) {
    // Medium Rectangle (300x250)
    if (layoutType === 'medium-rectangle') {
        return (
            <div className="bg-white border border-gray-300 rounded overflow-hidden shadow-sm" style={{ width: '300px', height: '250px' }}>
                {/* Ad Badge */}
                <div className="absolute top-1 right-1 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Ad
                </div>

                {/* Image */}
                <div
                    className="w-full h-[150px] bg-gray-100 bg-cover bg-center relative"
                    style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
                >
                    {!imageUrl && (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                            1200 x 628
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-2 h-[100px] flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-xs text-gray-900 line-clamp-2 leading-tight mb-1">
                            {headline}
                        </h3>
                        <p className="text-[11px] text-gray-600 line-clamp-2">
                            {linkDescription}
                        </p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded text-xs transition-colors w-full">
                        {cta}
                    </button>
                </div>
            </div>
        );
    }

    // Mobile Banner (320x50)
    if (layoutType === 'mobile-banner') {
        return (
            <div className="bg-white border border-gray-300 rounded overflow-hidden shadow-sm flex items-center gap-2 p-2" style={{ width: '320px', height: '50px' }}>
                {/* Logo */}
                <div className="w-8 h-8 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                    {logoUrl ? (
                        <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xs font-bold">
                            {advertiser.charAt(0) || 'A'}
                        </div>
                    )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[11px] text-gray-900 truncate">
                        {headline}
                    </h3>
                    <p className="text-[10px] text-gray-600 truncate">
                        {advertiser}
                    </p>
                </div>

                {/* CTA */}
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2 py-1 rounded text-[10px] transition-colors flex-shrink-0">
                    {cta}
                </button>

                {/* Ad Badge */}
                <div className="absolute top-0.5 right-0.5 bg-green-600 text-white text-[8px] font-bold px-1 py-0.5 rounded">
                    Ad
                </div>
            </div>
        );
    }

    // Native Format (Fluid)
    if (layoutType === 'native') {
        return (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow" style={{ width: '350px' }}>
                <div className="p-3 flex gap-3">
                    {/* Square Image */}
                    <div
                        className="w-24 h-24 bg-gray-100 rounded flex-shrink-0 bg-cover bg-center"
                        style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
                    >
                        {!imageUrl && (
                            <div className="flex items-center justify-center h-full text-gray-400 text-[10px]">
                                1200x1200
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
                            <span className="bg-green-600 text-white font-bold px-1.5 py-0.5 rounded">Ad</span>
                            <span>{advertiser}</span>
                        </div>
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-2 leading-tight mb-1">
                            {headline}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                            {linkDescription}
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded text-xs transition-colors">
                            {cta}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
