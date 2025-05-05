import { Button } from '@/components/ui/button';
import { ImageDown } from 'lucide-react';
export function GenerateBarcode({ assetId, assetTag }) {
    const handleDownload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
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
                console.log('✅ Both images loaded');

                const canvasWidth =
                    Math.max(logoImage.width, barcodeImage.width) + 20;
                const canvasHeight =
                    logoImage.height + barcodeImage.height + 70;
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                ctx.drawImage(logoImage, 10, 10);
                ctx.drawImage(barcodeImage, 10, logoImage.height + 20);

                ctx.font = '16px Arial';
                ctx.fillStyle = 'black';
                ctx.fillText(
                    `Asset Name: ${assetTag}`,
                    10,
                    logoImage.height + barcodeImage.height + 40,
                );
                ctx.fillText(
                    `Asset Model: ${'test'}`,
                    10,
                    logoImage.height + barcodeImage.height + 60,
                );

                const dataUrl = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = `${assetTag}.png`;
                link.click();
            })
            .catch(({ src, error }) => {
                console.error(`❌ Failed to load image: ${src}`, error);
            });
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
