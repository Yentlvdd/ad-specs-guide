import React from 'react';
import { Check, Copy, CheckSquare, Square, FileSpreadsheet } from 'lucide-react';
import { cn } from '../lib/utils';

export function Overview({ platforms, selectedSpecs, onToggleSpec, onTogglePlatform }) {
    const [copied, setCopied] = React.useState(false);

    const handleCopyAll = () => {
        // Generate Slack Markdown
        let markdown = "*Digital Ad Specs Overzicht*\n\n";

        Object.values(platforms).forEach(platform => {
            const platformSpecs = platform.specs.filter(spec => selectedSpecs.has(spec.id));

            if (platformSpecs.length > 0) {
                markdown += `*${platform.name}*\n`;
                platformSpecs.forEach(spec => {
                    markdown += `• *${spec.name}*: \`${spec.dimensions}\` (${spec.ratio})\n`;
                    if (spec.safeZones) {
                        markdown += `  _Safezone Guardrails: ${spec.safeZones}_\n`;
                    }
                });
                markdown += "\n";
            }
        });

        if (selectedSpecs.size === 0) {
            markdown += "_Geen plaatsingen geselecteerd._";
        }

        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadCSV = () => {
        const headers = ["Platform", "Plaatsing", "Afmetingen", "Ratio", "Type", "Notities", "Safezone Guardrails", "Best Practices"];
        const rows = [];

        Object.values(platforms).forEach(platform => {
            const platformSpecs = platform.specs.filter(spec => selectedSpecs.has(spec.id));

            if (platformSpecs.length > 0) {
                const bestPractices = platform.bestPractices ? platform.bestPractices.join("; ") : "";

                platformSpecs.forEach(spec => {
                    rows.push([
                        platform.name,
                        spec.name,
                        spec.dimensions,
                        spec.ratio,
                        spec.type,
                        spec.notes,
                        spec.safeZones || "",
                        bestPractices
                    ].map(cell => `"${cell}"`).join(",")); // Quote cells to handle commas
                });
            }
        });

        const csvContent = [headers.join(","), ...rows].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'ad_specs_export.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Overzicht & Selectie</h2>
                    <p className="text-muted-foreground text-lg">Selecteer plaatsingen om een samenvatting te genereren.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownloadCSV}
                        disabled={selectedSpecs.size === 0}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border",
                            "bg-background hover:bg-accent text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                        title="Download CSV"
                    >
                        <FileSpreadsheet className="h-4 w-4" />
                        <span className="hidden sm:inline">CSV</span>
                    </button>
                    <button
                        onClick={handleCopyAll}
                        disabled={selectedSpecs.size === 0}
                        className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                            "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? "Gekopieerd" : "Kopieer voor Slack"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.values(platforms).map((platform) => {
                    const allSelected = platform.specs.every(spec => selectedSpecs.has(spec.id));
                    const someSelected = platform.specs.some(spec => selectedSpecs.has(spec.id));

                    return (
                        <div key={platform.id} className="rounded-xl border bg-card text-card-foreground shadow-sm">
                            <div className="p-4 border-b bg-muted/10 flex items-center justify-between">
                                <h3 className="font-semibold">{platform.name}</h3>
                                <button
                                    onClick={() => onTogglePlatform(platform.id)}
                                    className="text-sm text-primary hover:underline font-medium"
                                >
                                    {allSelected ? "Deselecteer Alles" : "Selecteer Alles"}
                                </button>
                            </div>
                            <div className="p-4 space-y-3">
                                {platform.specs.map((spec) => {
                                    const isSelected = selectedSpecs.has(spec.id);
                                    return (
                                        <div
                                            key={spec.id}
                                            className={cn(
                                                "flex items-start gap-3 p-2 rounded-md transition-colors cursor-pointer hover:bg-accent",
                                                isSelected ? "bg-accent/50" : ""
                                            )}
                                            onClick={() => onToggleSpec(spec.id)}
                                        >
                                            <div className={cn(
                                                "mt-1 h-4 w-4 rounded border border-primary flex items-center justify-center flex-shrink-0",
                                                isSelected ? "bg-primary border-primary" : "bg-transparent"
                                            )}>
                                                {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">{spec.name}</div>
                                                <div className="text-xs text-muted-foreground">{spec.dimensions}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
