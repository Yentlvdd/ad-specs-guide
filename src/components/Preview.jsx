// Preview.jsx – Preview Mode Component
// This component allows the user to upload an image, fill in ad copy fields, and see a live preview
// of the selected ad format with safe‑zone overlays.

import React, { useState } from 'react';
import { cn } from '../lib/utils';

export function Preview({ platform, selectedSpecs }) {
    // For simplicity we preview the first selected spec (or the first spec of the platform if none selected)
    const spec = Array.from(selectedSpecs).map(id =>
        platform.specs.find(s => s.id === id)
    ).find(Boolean) || platform.specs[0];

    const [imageUrl, setImageUrl] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [advertiser, setAdvertiser] = useState('');
    const [headline, setHeadline] = useState('');
    const [copy, setCopy] = useState('');
    const [cta, setCta] = useState('');

    // Handle local file uploads (placeholder for Firebase Storage integration)
    const handleFileUpload = (e, setter) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setter(url);
        }
    };

    // Compute aspect‑ratio style for the preview container
    let aspectRatioStyle = {};
    if (spec.ratio && spec.ratio !== 'Custom') {
        const [w, h] = spec.ratio.split(':').map(Number);
        if (!isNaN(w) && !isNaN(h)) {
            aspectRatioStyle = { aspectRatio: `${w} / ${h}` };
        }
    } else if (spec.dimensions) {
        const parts = spec.dimensions.split('x').map(s => Number(s.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            aspectRatioStyle = { aspectRatio: `${parts[0]} / ${parts[1]}` };
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Preview Controls</h2>
                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Background Image</label>
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e, setImageUrl)} className="w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Logo (optional)</label>
                        <input type="file" accept="image/*" onChange={e => handleFileUpload(e, setLogoUrl)} className="w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Advertiser Name</label>
                        <input type="text" value={advertiser} onChange={e => setAdvertiser(e.target.value)} className="w-full border rounded p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Headline</label>
                        <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} className="w-full border rounded p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Ad Copy / Description</label>
                        <textarea value={copy} onChange={e => setCopy(e.target.value)} rows={3} className="w-full border rounded p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">CTA Button Text</label>
                        <input type="text" value={cta} onChange={e => setCta(e.target.value)} className="w-full border rounded p-2" />
                    </div>
                </div>

                {/* Live Preview */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-2">Live Preview – {spec.name}</h2>
                    <div
                        className={cn(
                            "relative w-full max-w-[300px] rounded-md border-2 overflow-hidden bg-muted/20 flex items-center justify-center",
                            imageUrl ? "bg-cover bg-center" : ""
                        )}
                        style={{ ...aspectRatioStyle, backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
                    >
                        {/* Safe‑zone overlays */}
                        {spec.safeZoneOverlay && (
                            <>
                                {/* Top */}
                                <div className="absolute top-0 left-0 right-0 bg-red-500/20 border-b border-red-500/30" style={{ height: spec.safeZoneOverlay.top }} />
                                {/* Bottom */}
                                <div className="absolute bottom-0 left-0 right-0 bg-red-500/20 border-t border-red-500/30" style={{ height: spec.safeZoneOverlay.bottom }} />
                                {/* Left */}
                                <div className="absolute top-0 bottom-0 left-0 bg-red-500/20 border-r border-red-500/30" style={{ width: spec.safeZoneOverlay.left }} />
                                {/* Right */}
                                <div className="absolute top-0 bottom-0 right-0 bg-red-500/20 border-l border-red-500/30" style={{ width: spec.safeZoneOverlay.right }} />
                            </>
                        )}
                        {/* Logo */}
                        {logoUrl && (
                            <img src={logoUrl} alt="logo" className="absolute top-2 left-2 w-12 h-12 object-contain" />
                        )}
                        {/* Text overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-black/30">
                            {advertiser && <div className="text-sm font-medium">{advertiser}</div>}
                            {headline && <div className="text-lg font-bold">{headline}</div>}
                            {copy && <div className="text-sm mt-1">{copy}</div>}
                            {cta && <button className="mt-2 self-start bg-primary text-primary-foreground px-3 py-1 rounded">{cta}</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
