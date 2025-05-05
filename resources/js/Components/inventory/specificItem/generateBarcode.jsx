import { useState } from 'react';

export function GenerateBarcode({ id }) {
    const [assetId, setAssetId] = useState(id);
    const [barcodeUrl, setBarcodeUrl] = useState(null);

    const handleGenerate = () => {
        const url = `/barcode/${assetId}`;
        setBarcodeUrl(url); // This triggers the image to display
    };

    const handleDownload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Load the barcode image
        const barcodeImage = new Image();
        barcodeImage.src = barcodeUrl;

        barcodeImage.onload = () => {
            // Set canvas size based on barcode and text
            const canvasWidth = barcodeImage.width + 20;
            const canvasHeight = barcodeImage.height + 60; // Space for text below the barcode
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Draw the barcode image onto the canvas
            ctx.drawImage(barcodeImage, 10, 10);

            // Set text styles
            ctx.font = '16px Arial';
            ctx.fillStyle = 'black';

            // Draw the asset details (name, model, etc.) below the barcode
            ctx.fillText(`Asset Name: ${'asd'}`, 10, barcodeImage.height + 30);
            ctx.fillText(`Asset Model: ${'asd'}`, 10, barcodeImage.height + 50);

            // Create a downloadable image
            const dataUrl = canvas.toDataURL('image/png');

            // Trigger the download
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `barcode_${assetId}.png`;
            link.click();
        };
    };

    return (
        <div className="max-w-sm rounded-lg border p-4 shadow-lg">
            <h2 className="mb-2 text-xl font-semibold">{'asd'}</h2>
            <p className="mb-2 text-gray-600">Model: {'asd'}</p>

            <input
                type="text"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Enter Asset ID"
                className="mb-4 mr-2 w-full rounded border p-2"
            />
            <button
                onClick={handleGenerate}
                className="w-full rounded bg-blue-600 px-4 py-2 text-white"
            >
                Generate Barcode
            </button>

            {barcodeUrl && (
                <div className="mt-4 text-center">
                    <img
                        src={barcodeUrl}
                        alt="Barcode"
                        className="mx-auto mb-2"
                    />
                    <button
                        onClick={handleDownload}
                        className="mt-2 w-full rounded bg-green-600 px-4 py-2 text-white"
                    >
                        Download Barcode with Details
                    </button>
                </div>
            )}
        </div>
    );
}
