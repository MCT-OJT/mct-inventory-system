import { Button } from '@/components/ui/button';
import { ImageDown } from 'lucide-react';
export function GenerateBarcode({ assetId, assetTag }) {
    const handleDownload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Load the barcode image
        const barcodeImage = new Image();
        barcodeImage.src = `/barcode/${assetId}`;

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
            ctx.fillText(
                `Asset Name: ${assetTag}`,
                10,
                barcodeImage.height + 30,
            );
            ctx.fillText(
                `Asset Model: ${'test'}`,
                10,
                barcodeImage.height + 50,
            );

            // Create a downloadable image
            const dataUrl = canvas.toDataURL('image/png');

            // Trigger the download
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${assetTag}.png`;
            link.click();
        };
    };

    return (
        <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleDownload}
        >
            <ImageDown /> Generate
        </Button>
    );
}
