import React from 'react';
import { AdCard } from './AdCard';
import { Lightbulb } from 'lucide-react';

export function PlatformView({ platform, selectedSpecs, onToggleSpec }) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{platform.name}</h2>
                <p className="text-muted-foreground text-lg">{platform.description}</p>
            </div>

            {/* Best Practices Section */}
            {platform.bestPractices && (
                <div className="rounded-xl border bg-blue-50/50 dark:bg-blue-950/20 p-6">
                    <div className="flex items-center gap-2 mb-4 text-blue-700 dark:text-blue-400 font-semibold">
                        <Lightbulb className="h-5 w-5" />
                        <h3>Best Practices</h3>
                    </div>
                    <ul className="grid gap-2 sm:grid-cols-2 text-sm text-muted-foreground">
                        {platform.bestPractices.map((practice, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                <span>{practice}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {platform.specs.map((spec) => (
                    <AdCard
                        key={spec.id}
                        spec={spec}
                        isSelected={selectedSpecs.has(spec.id)}
                        onToggle={() => onToggleSpec(spec.id)}
                    />
                ))}
            </div>
        </div>
    );
}
