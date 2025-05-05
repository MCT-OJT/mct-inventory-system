import { useState } from 'react';

export function GenerateBarcode({ id }) {
    const [assetId, setAssetId] = useState('');
    const [barcodeUrl, setBarcodeUrl] = useState(null);

    const handleGenerate = () => {
        const url = `/barcode/${assetId}`;
        setBarcodeUrl(url); // This triggers the image to display
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = barcodeUrl;
        link.download = `barcode_${assetId}.png`;
        link.click();
    };

    return (
        <div className="p-4">
            <input
                type="text"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Enter Asset ID"
                className="mr-2 rounded border p-2"
            />
            <button
                onClick={handleGenerate}
                className="rounded bg-blue-600 px-4 py-2 text-white"
            >
                Generate Barcode
            </button>

            {barcodeUrl && (
                <div className="mt-4">
                    <img src={barcodeUrl} alt="Barcode" className="mb-2" />
                    <button
                        onClick={handleDownload}
                        className="rounded bg-green-600 px-4 py-2 text-white"
                    >
                        Download
                    </button>
                </div>
            )}
        </div>
    );
}
