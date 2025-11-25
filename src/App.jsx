import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { PlatformView } from './components/PlatformView';
import { Overview } from './components/Overview';
import { Preview } from './components/Preview';
import { adSpecs } from './data/adSpecs';

function App() {
    const [currentPlatformId, setCurrentPlatformId] = useState('overview');
    const [selectedSpecs, setSelectedSpecs] = useState(new Set());
    const [previewMode, setPreviewMode] = useState(false);

    const toggleSpec = (specId) => {
        const newSelected = new Set(selectedSpecs);
        if (newSelected.has(specId)) {
            newSelected.delete(specId);
        } else {
            newSelected.add(specId);
        }
        setSelectedSpecs(newSelected);
    };

    const togglePlatform = (platformId) => {
        const platform = adSpecs[platformId];
        const allSelected = platform.specs.every(spec => selectedSpecs.has(spec.id));
        const newSelected = new Set(selectedSpecs);

        if (allSelected) {
            // Deselect all
            platform.specs.forEach(spec => newSelected.delete(spec.id));
        } else {
            // Select all
            platform.specs.forEach(spec => newSelected.add(spec.id));
        }
        setSelectedSpecs(newSelected);
    };

    const currentPlatform = adSpecs[currentPlatformId];

    const handleTogglePreview = () => {
        setPreviewMode(prev => !prev);
    };

    return (
        <Layout
            platforms={adSpecs}
            currentPlatformId={currentPlatformId}
            onSelectPlatform={setCurrentPlatformId}
            onTogglePreview={handleTogglePreview}
            previewMode={previewMode}
        >
            {previewMode ? (
                <Preview
                    platform={currentPlatform}
                    selectedSpecs={selectedSpecs}
                    onExit={handleTogglePreview}
                />
            ) : currentPlatformId === 'overview' ? (
                <Overview
                    platforms={adSpecs}
                    selectedSpecs={selectedSpecs}
                    onToggleSpec={toggleSpec}
                    onTogglePlatform={togglePlatform}
                />
            ) : (
                <PlatformView
                    platform={currentPlatform}
                    selectedSpecs={selectedSpecs}
                    onToggleSpec={toggleSpec}
                />
            )}
        </Layout>
    );
}

export default App;
