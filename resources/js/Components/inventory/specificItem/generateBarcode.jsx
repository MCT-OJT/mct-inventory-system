import { Button } from '@/components/ui/button';
import { ImageDown } from 'lucide-react';
import { useState } from 'react';

export function GenerateBarcode({ assetId, assetTag }) {
    const [previewSrc, setPreviewSrc] = useState(null);

    const handleDownload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'anonymous'; // In case of CORS issue
                img.onload = () => resolve(img);
                img.onerror = (e) => reject({ src, error: e });
                img.src = src;
            });
        };

        Promise.all([
            loadImage('/assets/logo.png'),
            loadImage(`/barcode/${assetId}`),
        ])
            .then(([logoImage, barcodeImage]) => {
                const logoScale = 0.1; // scale logo to 30%
                const barcodeScale = 2; // scale barcode to 200%

                // Calculate canvas width to fit both logo and barcode, with some padding
                const canvasWidth =
                    Math.max(
                        logoImage.width * logoScale,
                        barcodeImage.width * barcodeScale,
                    ) + 60;

                // Calculate canvas height to fit logo, barcode, and text with padding
                const canvasHeight =
                    logoImage.height * logoScale +
                    barcodeImage.height * barcodeScale +
                    180;

                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                // Fill the canvas with a white background
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);

                // Calculate the positions for centering the logo and barcode
                const logoX = (canvasWidth - logoImage.width * logoScale) / 2;
                const logoY = 3;

                const barcodeX =
                    (canvasWidth - barcodeImage.width * barcodeScale) / 2;
                const barcodeY = logoImage.height * logoScale + 50;

                // Adjust font size in proportion to logo size
                const fontSize = 12 * barcodeScale; // reduce font size based on logo scaling
                ctx.font = `${fontSize}px Arial`;
                ctx.fillStyle = 'black';

                // Calculate the text positions for centering
                const assetName = `${assetTag}`;
                const assetModel = `Asset Model: {'test'}`;

                const assetNameWidth = ctx.measureText(assetName).width;
                const assetModelWidth = ctx.measureText(assetModel).width;

                // Center the text horizontally
                const textX1 = (canvasWidth - assetNameWidth) / 2;
                const textX2 = (canvasWidth - assetModelWidth) / 2;

                const textY1 =
                    logoImage.height * logoScale +
                    barcodeImage.height * barcodeScale +
                    90;
                const textY2 = textY1 + 95;

                // Draw the logo at the calculated center position
                ctx.drawImage(
                    logoImage,
                    logoX,
                    logoY,
                    logoImage.width * logoScale,
                    logoImage.height * logoScale,
                );

                // Draw the barcode at the calculated center position
                ctx.drawImage(
                    barcodeImage,
                    barcodeX,
                    barcodeY,
                    barcodeImage.width * barcodeScale,
                    barcodeImage.height * barcodeScale,
                );

                // Draw the asset name text centered
                ctx.fillText(assetName, textX1, textY1);

                // Draw the asset model text centered
                ctx.fillText(assetModel, textX2, textY2);

                const dataUrl = canvas.toDataURL('image/png');
                setPreviewSrc(dataUrl);
            })
            .catch(({ src, error }) => {
                console.error(`❌ Failed to load image: ${src}`, error);
            });
    };

    const handleSave = () => {
        if (!previewSrc) return;
        const link = document.createElement('a');
        link.href = previewSrc;
        link.download = `${assetTag}.png`;
        link.click();
    };

    return (
        <div className="space-y-4">
            <Button
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={handleDownload}
            >
                <ImageDown className="mr-2 h-4 w-4" />
                Generate
            </Button>

            {previewSrc && (
                <div className="flex flex-col items-start space-y-2">
                    <img
                        src={previewSrc}
                        alt="Barcode Preview"
                        className="max-w-xs border border-gray-300"
                    />
                    <Button
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save Image
                    </Button>
                </div>
            )}
        </div>
    );
}
