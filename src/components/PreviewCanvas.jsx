import React, { useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

export function PreviewCanvas({ children, platformName, specName, specDimensions }) {
    const [zoom, setZoom] = useState(100);
    const [downloading, setDownloading] = useState(false);
    const previewRef = useRef(null);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
    const handleFitScreen = () => setZoom(100);

    const handleDownload = async () => {
        if (!previewRef.current) return;

        setDownloading(true);
        try {
            const canvas = await html2canvas(previewRef.current, {
                scale: 2, // 2x resolution for Retina displays
                backgroundColor: null,
                logging: false,
                useCORS: true
            });

            const link = document.createElement('a');
            link.download = `${platformName}-${specName}-mockup.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col">
            {/* Zoom Controls - Floating Toolbar */}
            <div className="absolute bottom-4 right-4 z-50 flex items-center gap-2 bg-white border rounded-lg shadow-lg p-2">
                <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 25}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Zoom Out"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-medium min-w-[3rem] text-center">{zoom}%</span>
                <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 200}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Zoom In"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>
                <button
                    onClick={handleFitScreen}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Fit to Screen"
                >
                    <Maximize2 className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="p-2 hover:bg-primary/10 rounded transition-colors text-primary disabled:opacity-50"
                    title="Download PNG"
                >
                    <Download className="w-4 h-4" />
                </button>
            </div>

            {/* Scrollable Canvas Area */}
            <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-8">
                <div
                    ref={previewRef}
                    style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'center center',
                        transition: 'transform 0.2s ease-out'
                    }}
                >
                    {children}
                </div>
            </div>

            {/* Info Bar */}
            <div className="border-t bg-white px-4 py-2 text-center">
                <p className="text-sm text-muted-foreground">
                    Previewing: <span className="font-medium text-foreground">{specName}</span> ({specDimensions})
                </p>
            </div>
        </div>
    );
}
