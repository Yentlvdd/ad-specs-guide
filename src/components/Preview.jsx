// Preview.jsx – Preview Mode Component
// This component allows the user to upload an image, fill in ad copy fields, and see a live preview
// of the selected ad format with safe‑zone overlays.

import React, { useState } from 'react';
import { ArrowLeft, Globe, MoreHorizontal, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function Preview({ platform, selectedSpecs, onExit }) {
    if (!platform) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <p className="text-muted-foreground">Please select a platform to preview.</p>
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 text-primary hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Overview
                </button>
            </div>
        );
    }

    // For simplicity we preview the first selected spec (or the first spec of the platform if none selected)
    const spec = Array.from(selectedSpecs).map(id =>
        platform.specs.find(s => s.id === id)
    ).find(Boolean) || platform.specs[0];

    const [imageUrl, setImageUrl] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [advertiser, setAdvertiser] = useState('The Bakery');
    const [headline, setHeadline] = useState('Ad title');
    const [copy, setCopy] = useState('Dit is de beschrijving van de advertentie.');
    const [cta, setCta] = useState('Apply now');
    const [websiteUrl, setWebsiteUrl] = useState('LANDINGSPAGINA.BE');
    const [linkDescription, setLinkDescription] = useState('Beschrijving');
    const [copied, setCopied] = useState(false);

    // Handle local file uploads
    const handleFileUpload = (e, setter) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setter(url);
        }
    };

    const handleCopy = () => {
        const text = `*Advertiser:* ${advertiser}\n*Primary Text:* ${copy}\n*Headline:* ${headline}\n*Website:* ${websiteUrl}\n*Description:* ${linkDescription}\n*CTA:* ${cta}`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to {platform.name}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Controls Panel */}
                <div className="lg:col-span-4 space-y-6 bg-card p-6 rounded-xl border shadow-sm h-fit">
                    <div className="flex items-center justify-between border-b pb-2">
                        <h2 className="text-xl font-bold">Ad Content</h2>
                        <button
                            onClick={handleCopy}
                            className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-2 py-1 rounded transition-colors"
                        >
                            {copied ? 'Copied!' : 'Copy Details'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Profile Image</label>
                            <input type="file" accept="image/*" onChange={e => handleFileUpload(e, setLogoUrl)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Ad Media</label>
                            <input type="file" accept="image/*" onChange={e => handleFileUpload(e, setImageUrl)} className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Advertiser Name</label>
                                <input type="text" value={advertiser} onChange={e => setAdvertiser(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm bg-background" placeholder="e.g. Nike" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Primary Text</label>
                                <textarea value={copy} onChange={e => setCopy(e.target.value)} rows={3} className="w-full px-3 py-2 border rounded-md text-sm bg-background resize-none" placeholder="Main ad copy..." />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Website URL</label>
                                <input type="text" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm bg-background" placeholder="WEBSITE.COM" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Headline</label>
                                <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm bg-background" placeholder="Ad Headline" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Link Description</label>
                                <input type="text" value={linkDescription} onChange={e => setLinkDescription(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm bg-background" placeholder="Short description..." />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">CTA Button</label>
                                <select value={cta} onChange={e => setCta(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm bg-background">
                                    <option>Learn More</option>
                                    <option>Shop Now</option>
                                    <option>Sign Up</option>
                                    <option>Download</option>
                                    <option>Contact Us</option>
                                    <option>Apply Now</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Preview Area */}
                <div className="lg:col-span-8 flex flex-col items-center">
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
                                className={cn(
                                    "w-full relative bg-gray-100 flex items-center justify-center overflow-hidden",
                                    imageUrl ? "bg-cover bg-center" : ""
                                )}
                                style={{ ...aspectRatioStyle, backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
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

                    <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            Previewing: <span className="font-medium text-foreground">{spec.name}</span> ({spec.dimensions})
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
