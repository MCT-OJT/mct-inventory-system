import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ImageDown } from 'lucide-react';

export function GenerateBarcode({ assetId, assetTag }) {
    const { toast } = useToast();

    const handleDownload = async () => {
        try {
            const loadImage = (src) =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';
                    img.onload = () => resolve(img);
                    img.onerror = () =>
                        reject(new Error(`Failed to load ${src}`));
                    img.src = src;
                });

            const [logoImage, barcodeImage] = await Promise.all([
                loadImage('/assets/logo-black.png'),
                loadImage(`/barcode/${assetId}`),
            ]);

            const resolutionMultiplier = 4;
            const logoScale = 0.2 * resolutionMultiplier;
            const barcodeScale = 2 * resolutionMultiplier;

            const canvasWidth =
                Math.max(
                    logoImage.width * logoScale,
                    barcodeImage.width * barcodeScale,
                ) +
                60 * resolutionMultiplier;

            const canvasHeight =
                logoImage.height * logoScale +
                barcodeImage.height * barcodeScale +
                35 * resolutionMultiplier;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            const logoX = (canvasWidth - logoImage.width * logoScale) / 2;
            const logoY = 3 * resolutionMultiplier;

            const barcodeX =
                (canvasWidth - barcodeImage.width * barcodeScale) / 2;
            const barcodeY =
                logoImage.height * logoScale + 4 * resolutionMultiplier;

            const fontSize = 12 * resolutionMultiplier;
            ctx.font = `${fontSize}px Arial`;
            ctx.fillStyle = 'black';

            const textX = (canvasWidth - ctx.measureText(assetTag).width) / 2;
            const textY =
                barcodeY +
                barcodeImage.height * barcodeScale +
                15 * resolutionMultiplier;

            ctx.drawImage(
                logoImage,
                logoX,
                logoY,
                logoImage.width * logoScale,
                logoImage.height * logoScale,
            );
            ctx.drawImage(
                barcodeImage,
                barcodeX,
                barcodeY,
                barcodeImage.width * barcodeScale,
                barcodeImage.height * barcodeScale,
            );
            ctx.fillText(assetTag, textX, textY);

            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `${assetTag}.png`;
            link.click();

            toast({
                title: 'Success',
                description: 'Barcode downloaded!',
                className: 'bg-green-300 text-green-900 border-none',
            });
        } catch (error) {
            toast({
                title: 'Failed',
                description:
                    'Something went wrong while generating the barcode.',
                className: 'bg-red-300 text-red-900 border-none',
            });
        }
    };

    return (
        <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleDownload}
        >
            <ImageDown className="mr-2 h-4 w-4" />
            Generate
        </Button>
    );
}
