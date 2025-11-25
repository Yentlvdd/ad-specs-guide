import React from 'react';
import { cn } from '../lib/utils';
import {
    LayoutGrid,
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    MonitorPlay,
    Music2,
    Pin,
    MessageCircle,
    Twitter,
    Ghost
} from 'lucide-react';

// Map platform IDs to icons
const ICONS = {
    meta: Facebook,
    instagram: Instagram,
    tiktok: Music2, // Lucide doesn't have TikTok, using Music2 as placeholder or custom SVG
    linkedin: Linkedin,
    pinterest: Pin, // Using Pin icon
    youtube: Youtube,
    google: MonitorPlay,
    reddit: MessageCircle,
    twitter: Twitter,
    snapchat: Ghost
};

export function Layout({ platforms, currentPlatformId, onSelectPlatform, onTogglePreview, previewMode, children }) {
    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 border-r bg-muted/10 flex-shrink-0">
                <div className="p-6 border-b">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <LayoutGrid className="h-6 w-6 text-primary" />
                        <span>AdSpecs</span>
                    </div>
                </div>
                <nav className="p-4 space-y-2">
                    <button
                        onClick={() => onSelectPlatform('overview')}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                            currentPlatformId === 'overview'
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                    >
                        <LayoutGrid className="h-4 w-4" />
                        Overzicht
                    </button>

                    <div className="my-2 border-t border-border/50" />

                    {Object.values(platforms).map((platform) => {
                        const Icon = ICONS[platform.id] || LayoutGrid;
                        const isActive = currentPlatformId === platform.id;

                        return (
                            <button
                                key={platform.id}
                                onClick={() => onSelectPlatform(platform.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {platform.name}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen">
                <div className="container max-w-7xl mx-auto p-6 md:p-10">
                    {/* Preview Mode Toggle */}
                    {currentPlatformId !== 'overview' && (
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={onTogglePreview}
                                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
                            >
                                {previewMode ? 'Exit Preview' : 'Preview Mode'}
                            </button>
                        </div>
                    )}
                    {children}
                </div>
            </main>
        </div>
    );
}
