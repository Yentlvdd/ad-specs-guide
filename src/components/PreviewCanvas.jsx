import React, { useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

export function PreviewCanvas({ children, platformName, specName, specDimensions, showSafeZones, onToggleSafeZones, hasSafeZones }) {
    const [zoom, setZoom] = useState(100);
    const [downloading, setDownloading] = useState(false);
    const previewRef = useRef(null);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
    const handleFitScreen = () => setZoom(100);

    const handleDownload = async () => {
        if (!previewRef.current) return;

        setDownloading(true);
        const originalZoom = zoom;

        try {
            // Temporarily reset zoom to 100% for clean capture
            setZoom(100);

            // Wait for zoom transition to complete
            await new Promise(resolve => setTimeout(resolve, 250));

            const canvas = await html2canvas(previewRef.current, {
                scale: 3, // 3x resolution for ultra-high quality
                backgroundColor: null,
                logging: false,
                useCORS: true,
                allowTaint: true
            });

            const link = document.createElement('a');
            link.download = `${platformName.replace(/\s+/g, '-')} -${specName.replace(/\s+/g, '-')} -mockup.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            // Restore original zoom
            setZoom(originalZoom);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Download failed. Please try again.');
            setZoom(originalZoom);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="relative w-full h-full flex flex-col">
            {/* Download Button & Safe Zone Toggle - Top Right */}
            <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
                {/* Safe Zone Toggle - Only show if spec has safe zones */}
                {hasSafeZones && (
                    <div className="flex items-center gap-2 bg-white border rounded-lg shadow-lg px-3 py-2">
                        <span className="text-xs font-semibold text-muted-foreground">Safe Zones</span>
                        <button
                            onClick={onToggleSafeZones}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showSafeZones ? 'bg-primary' : 'bg-gray-300'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showSafeZones ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                )}

                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all disabled:opacity-50 font-bold text-base shadow-xl hover:shadow-2xl transform hover:scale-105"
                    title="Download as PNG (High Quality)"
                >
                    <Download className="w-5 h-5" />
                    {downloading ? 'Downloading...' : 'Download PNG'}
                </button>
            </div>

            {/* Zoom Controls - Bottom Right (Compact) */}
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
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <button
                    onClick={handleFitScreen}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                    title="Fit to Screen"
                >
                    <Maximize2 className="w-4 h-4" />
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
