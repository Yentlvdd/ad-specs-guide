// Preview.jsx – Unified Ad Mockup Generator
// Platform-specific high-fidelity ad preview with zoom controls and free downloads

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PreviewCanvas } from './PreviewCanvas';
import { MetaAdPreview } from './previews/MetaAdPreview';
import { TikTokAdPreview } from './previews/TikTokAdPreview';
import { TwitterAdPreview } from './previews/TwitterAdPreview';
import { LinkedInAdPreview } from './previews/LinkedInAdPreview';
import { SnapchatAdPreview } from './previews/SnapchatAdPreview';
import { PinterestAdPreview } from './previews/PinterestAdPreview';
import { YouTubeAdPreview } from './previews/YouTubeAdPreview';
import { GoogleDisplayAdPreview } from './previews/GoogleDisplayAdPreview';

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

    // Get the first selected spec or default to first spec
    const spec = Array.from(selectedSpecs).map(id =>
        platform.specs.find(s => s.id === id)
    ).find(Boolean) || platform.specs[0];

    // Common state
    const [imageUrl, setImageUrl] = useState(null);
    const [logoUrl, setLogoUrl] = useState(null);
    const [advertiser, setAdvertiser] = useState('The Bakery');
    const [headline, setHeadline] = useState('Ad title');
    const [copy, setCopy] = useState('Dit is de beschrijving van de advertentie.');
    const [cta, setCta] = useState('Apply now');
    const [websiteUrl, setWebsiteUrl] = useState('LANDINGSPAGINA.BE');
    const [linkDescription, setLinkDescription] = useState('Beschrijving');
    const [copied, setCopied] = useState(false);
    const [showSafeZones, setShowSafeZones] = useState(true);

    // Handle file uploads
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

    // Compute aspect ratio style
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

    // Platform-specific CTA options
    const getCtaOptions = () => {
        switch (platform.id) {
            case 'meta':
            case 'instagram':
                return ['Learn More', 'Shop Now', 'Sign Up', 'Download', 'Apply Now', 'Book Now', 'Contact Us'];
            case 'tiktok':
                return ['Apply Now', 'Book Now', 'Download', 'Install Now', 'Learn More', 'Shop Now', 'Sign Up', 'Watch More'];
            case 'linkedin':
                return ['Apply', 'Download', 'Learn More', 'Sign Up', 'Register', 'Join', 'Attend', 'Request Demo'];
            default:
                return ['Learn More', 'Shop Now', 'Sign Up', 'Download', 'Apply Now'];
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4 px-6 pt-6">
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to {platform.name}
                </button>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 px-6 pb-6 overflow-hidden">
                {/* Controls Panel */}
                <div className="lg:col-span-4 space-y-6 bg-card p-6 rounded-xl border shadow-sm h-fit overflow-y-auto max-h-[calc(100vh-12rem)]">
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
                            <input
                                type="file"
                                accept="image/*"
                                onChange={e => handleFileUpload(e, setLogoUrl)}
                                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Ad Media</label>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={e => handleFileUpload(e, setImageUrl)}
                                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Advertiser Name</label>
                                <input
                                    type="text"
                                    value={advertiser}
                                    onChange={e => setAdvertiser(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                                    placeholder="e.g. Nike"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Primary Text</label>
                                <textarea
                                    value={copy}
                                    onChange={e => setCopy(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-background resize-none"
                                    placeholder="Main ad copy..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Website URL</label>
                                <input
                                    type="text"
                                    value={websiteUrl}
                                    onChange={e => setWebsiteUrl(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                                    placeholder="WEBSITE.COM"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Headline</label>
                                <input
                                    type="text"
                                    value={headline}
                                    onChange={e => setHeadline(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                                    placeholder="Ad Headline"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">Link Description</label>
                                <input
                                    type="text"
                                    value={linkDescription}
                                    onChange={e => setLinkDescription(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                                    placeholder="Short description..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-muted-foreground mb-1.5">CTA Button</label>
                                <select
                                    value={cta}
                                    onChange={e => setCta(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                                >
                                    {getCtaOptions().map(option => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Safe Zone Toggle */}
                            {spec.safeZoneOverlay && (
                                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                                    <label className="text-xs font-semibold uppercase text-muted-foreground">Show Safe Zones</label>
                                    <button
                                        onClick={() => setShowSafeZones(!showSafeZones)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showSafeZones ? 'bg-primary' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showSafeZones ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Live Preview Area with Zoom Controls */}
                <div className="lg:col-span-8 flex flex-col overflow-hidden">
                    <PreviewCanvas
                        platformName={platform.name}
                        specName={spec.name}
                        specDimensions={spec.dimensions}
                    >
                        {(() => {
                            const previewProps = {
                                imageUrl,
                                logoUrl,
                                advertiser,
                                copy,
                                websiteUrl,
                                headline,
                                linkDescription,
                                cta,
                                spec: showSafeZones ? spec : { ...spec, safeZoneOverlay: null },
                                aspectRatioStyle
                            };

                            switch (platform.id) {
                                case 'tiktok':
                                    return <TikTokAdPreview {...previewProps} />;
                                case 'twitter':
                                    return <TwitterAdPreview {...previewProps} />;
                                case 'linkedin':
                                    return <LinkedInAdPreview {...previewProps} />;
                                case 'snapchat':
                                    return <SnapchatAdPreview {...previewProps} />;
                                case 'pinterest':
                                    return <PinterestAdPreview {...previewProps} />;
                                case 'youtube':
                                    return <YouTubeAdPreview {...previewProps} />;
                                case 'google':
                                    return <GoogleDisplayAdPreview {...previewProps} layoutType="medium-rectangle" />;
                                case 'meta':
                                case 'instagram':
                                default:
                                    return <MetaAdPreview {...previewProps} />;
                            }
                        })()}
                    </PreviewCanvas>
                </div>
            </div>
        </div>
    );
}
