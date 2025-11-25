import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export function AdCard({ spec, isSelected, onToggle }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.stopPropagation(); // Prevent toggling selection when clicking copy
        navigator.clipboard.writeText(spec.dimensions);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Calculate aspect ratio for the visual box
    let aspectRatioStyle = {};

    if (spec.ratio && spec.ratio !== 'Custom') {
        const [w, h] = spec.ratio.split(':').map(Number);
        if (!isNaN(w) && !isNaN(h)) {
            aspectRatioStyle = { aspectRatio: `${w} / ${h}` };
        }
    } else {
        const parts = spec.dimensions.split('x').map(s => s.trim()).map(Number);
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            aspectRatioStyle = { aspectRatio: `${parts[0]} / ${parts[1]}` };
        } else {
            aspectRatioStyle = { aspectRatio: '16 / 9' };
        }
    }

    return (
        <div
            onClick={onToggle}
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-xl border transition-all hover:shadow-md cursor-pointer",
                isSelected
                    ? "bg-primary/5 border-primary ring-1 ring-primary"
                    : "bg-card text-card-foreground shadow-sm hover:border-primary/50"
            )}
        >
            {/* Selection Indicator */}
            <div className={cn(
                "absolute top-3 right-3 h-5 w-5 rounded-full border transition-colors flex items-center justify-center z-10",
                isSelected
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30 bg-background group-hover:border-primary/50"
            )}>
                {isSelected && <Check className="h-3 w-3" />}
            </div>

            <div className="p-6 pb-2">
                <h3 className="font-semibold leading-none tracking-tight pr-6">{spec.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{spec.notes}</p>
                {spec.safeZones && (
                    <div className="mt-3 p-2 rounded bg-yellow-100 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-800 text-xs text-yellow-900 dark:text-yellow-100 font-medium">
                        <span className="font-bold block mb-0.5">Safezone Guardrails:</span> {spec.safeZones}
                    </div>
                )}
            </div>

            {/* Visual Representation */}
            <div className="flex-1 p-6 flex items-center justify-center bg-muted/20">
                <div
                    className={cn(
                        "w-full max-w-[180px] rounded-md border-2 shadow-sm transition-all",
                        isSelected
                            ? "border-primary bg-primary/10"
                            : "border-primary/20 bg-primary/5 group-hover:border-primary/50 group-hover:bg-primary/10",
                        "flex items-center justify-center relative overflow-hidden"
                    )}
                    style={aspectRatioStyle}
                >
                    {/* Safe Zone Overlays */}
                    {spec.safeZoneOverlay && (
                        <>
                            {/* Top Unsafe Zone */}
                            <div
                                className="absolute top-0 left-0 right-0 bg-red-500/20 border-b border-red-500/30 flex items-end justify-center"
                                style={{ height: spec.safeZoneOverlay.top }}
                            >
                                <span className="text-[8px] text-red-700 font-medium mb-0.5">Safezone</span>
                            </div>

                            {/* Bottom Unsafe Zone */}
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-red-500/20 border-t border-red-500/30 flex items-start justify-center"
                                style={{ height: spec.safeZoneOverlay.bottom }}
                            >
                                <span className="text-[8px] text-red-700 font-medium mt-0.5">Safezone</span>
                            </div>

                            {/* Left Unsafe Zone */}
                            <div
                                className="absolute top-0 bottom-0 left-0 bg-red-500/20 border-r border-red-500/30"
                                style={{ width: spec.safeZoneOverlay.left }}
                            />

                            {/* Right Unsafe Zone */}
                            <div
                                className="absolute top-0 bottom-0 right-0 bg-red-500/20 border-l border-red-500/30"
                                style={{ width: spec.safeZoneOverlay.right }}
                            />
                        </>
                    )}

                    <span className={cn(
                        "text-xs font-medium z-10 relative",
                        isSelected ? "text-primary" : "text-primary/60"
                    )}>{spec.ratio}</span>
                </div>
            </div>

            <div className="p-6 pt-2 grid gap-2">
                <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
                    <div className="grid gap-0.5">
                        <span className="text-xs font-medium text-muted-foreground">Afmetingen</span>
                        <span className="font-mono text-sm font-bold">{spec.dimensions} px</span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className={cn(
                            "inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            copied
                                ? "border-green-500 bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400"
                                : "border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                        )}
                        title="Kopieer Afmetingen"
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
